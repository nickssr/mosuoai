---
title: "Python MCP Server 开发指南：从零构建自定义工具服务"
description: "Model Context Protocol（MCP）是 Anthropic 推出的开放标准，让 AI 助手能够调用外部工具。本文详细介绍如何使用 Python 和 FastMCP 从零构建一个生产级的 MCP Server，包含工具注册、API 集成、Dify 接入和 Cursor 集成的完整实战流程。"
pubDate: 2026-05-07 14:45:00
tags: ["MCP", "Python", "FastMCP", "Dify", "Cursor", "AI Agent", "工具开发"]
category: "skill-dev"
difficulty: "intermediate"
duration: "25分钟"
heroImage: "/images/posts/2026-05-07-python-mcp-server-develop-guide/hero.png"
---

## 前言

MCP（Model Context Protocol）是 Anthropic 推出的开放标准，旨在让 AI 助手能够以一种标准化的方式调用外部工具和访问外部数据源。它的设计理念类似于 USB 协议——不同的 AI 应用（Claude、Cursor）通过同一个协议标准连接 MCP Server，而 MCP Server 再连接到具体的工具或数据。

本文不聊概念，直接动手。我们会使用 Python + FastMCP 从零构建一个生产级的 MCP Server，包含以下几个实战环节：

- 工具注册与调试
- 接入外部 API（以 HTTP 调用为例）
- 将 Dify 应用发布为 MCP Server
- 在 Cursor 中调用 MCP 工具

阅读本文的前提：你会写 Python，了解基础的类型注解和异步编程概念。

---

## 第一步：安装 MCP Python SDK

MCP 官方提供两个 Python 框架：

- **mcp**（官方 SDK）：基础实现，功能完整，适合需要完整控制的场景
- **FastMCP**：基于 mcp 的高级封装，API 更简洁，开发体验更好

我们使用 FastMCP，因为它能大幅减少样板代码。

```bash
# 创建项目目录
mkdir my-mcp-server && cd my-mcp-server

# 创建虚拟环境
python3 -m venv .venv
source .venv/bin/activate  # Windows 用户：.venv\Scripts\activate

# 安装 FastMCP（含 CLI 工具）
pip install "fastmcp[cli]" httpx

# 验证安装
mcp --version
```

安装完成后，你会得到两个核心组件：`fastmcp` 服务器框架和一个 `mcp dev` 调试工具。

---

## 第二步：构建第一个 MCP 工具

FastMCP 的核心用法非常简单：创建一个 `FastMCP` 实例，用 `@mcp.tool()` 装饰器注册函数即可。

```python title="server.py"
from fastmcp import FastMCP

# 创建 MCP Server 实例
mcp = FastMCP("my-tools")


@mcp.tool()
def get_system_info() -> str:
    """返回系统基本信息。

    返回当前操作系统的名称、版本以及 Python 运行时版本。
    """
    import platform
    return (
        f"OS: {platform.system()} {platform.release()}\n"
        f"Python: {platform.python_version()}\n"
        f"架构: {platform.machine()}"
    )


@mcp.tool()
def count_files(directory: str, extension: str = "") -> str:
    """统计指定目录下的文件数量。

    Args:
        directory: 要扫描的目录路径
        extension: 可选，按文件扩展名过滤（如 .py、.json）
    """
    from pathlib import Path

    path = Path(directory).expanduser()
    if not path.is_dir():
        return f"错误：{directory} 不是有效目录"

    if extension:
        files = list(path.rglob(f"*{extension}"))
    else:
        files = [f for f in path.rglob("*") if f.is_file()]

    return f"在 {directory} 中找到 {len(files)} 个文件" + (
        f"（扩展名 {extension}）" if extension else ""
    )


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

几个关键点：

- **函数名即工具名**：`get_system_info` 注册后，在 AI 端显示为 `mcp__my-tools__get_system_info`
- **类型注解必须完整**：MCP 根据类型注解生成 JSON Schema，AI 靠这个决定传什么参数
- **docstring 即工具描述**：AI 通过这个描述判断什么时候该调用它，所以要写得和给同事讲解一样清晰
- **返回值用字符串**：工具永远不抛异常——异常会直接杀死 Server 进程，导致所有工具断连

---

## 第三步：添加异步外部 API 调用

大多数实用的 MCP Server 需要与外部服务通信。下面我们添加一个异步 HTTP 工具，用 `httpx` 发起请求：

```python title="server.py"
import httpx
from fastmcp import FastMCP

mcp = FastMCP("my-tools")


@mcp.tool()
async def check_website(url: str) -> str:
    """检查网站可访问性并返回状态信息。

    Args:
        url: 完整的网站地址（必须包含 https:// 或 http://）
    """
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(url)
            return (
                f"状态码: {response.status_code}\n"
                f"响应时间: {response.elapsed.total_seconds():.2f}秒\n"
                f"Content-Type: {response.headers.get('content-type', '未知')}"
            )
        except httpx.RequestError as e:
            return f"请求失败 {url}：{str(e)}"


@mcp.tool()
async def translate_text(text: str, target_lang: str = "en") -> str:
    """调用翻译 API 将文本翻译为目标语言。

    Args:
        text: 要翻译的文本
        target_lang: 目标语言代码（如 en、ja、zh）
    """
    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            # 此处使用免费翻译接口作为示例
            response = await client.post(
                "https://api.mymemory.translated.net/get",
                params={"q": text, "langpair": f"|{target_lang}"},
            )
            data = response.json()
            if data.get("responseStatus") == 200:
                return data["responseData"]["translatedText"]
            return f"翻译失败：{data.get('responseDetails', '未知错误')}"
        except Exception as e:
            return f"翻译请求异常：{str(e)}"


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

异步工具和同步工具在注册方式上完全一致——`async def` 写上，`httpx.AsyncClient` 用上，FastMCP 会自动处理事件循环。

---

## 第四步：本地调试 MCP 工具

**永远不要直接在 AI 对话里调试 MCP Server。** MCP 提供了一个本地调试工具 `mcp dev`，打开一个 Web 界面让你逐个调用工具、检查输入输出和 JSON Schema。

```bash
mcp dev server.py
```

运行后会打开一个本地 Web 界面（通常在 `http://localhost:5173`），你可以：

- 查看每个工具的名称、描述、参数 Schema
- 输入参数并逐个调用，观察返回结果
- 检查是否有报错

调试通过后，再把 Server 连接到 AI 工具。

---

## 第五步：连接到 Cursor

Cursor 通过 `mcp.json` 配置文件管理 MCP Server。将 Server 接入 Cursor 后，你就可以在 Cursor 的 AI 对话中直接调用这些工具。

### 方式一：使用 SSE 传输（推荐用于 HTTP Server）

如果你的 MCP Server 是长期运行的服务，用 SSE 传输更稳定：

```bash
# 安装 mcp-proxy，用于将 stdio 转换为 SSE/HTTP
pip install mcp-proxy

# 启动代理，将 stdio MCP Server 转为 HTTP SSE 端点
mcp-proxy --sse-port 8080 -- python /path/to/server.py
```

然后在项目的 `.cursor/mcp.json` 中添加：

```json title=".cursor/mcp.json"
{
  "mcpServers": {
    "my-tools": {
      "url": "http://localhost:8080/sse"
    }
  }
}
```

### 方式二：直接 stdio 连接

如果 Server 不需要长期运行（每次调用后退出），也可以用 stdio 方式：

```json title=".cursor/mcp.json"
{
  "mcpServers": {
    "my-tools": {
      "command": "/path/to/my-mcp-server/.venv/bin/python",
      "args": ["/path/to/my-mcp-server/server.py"]
    }
  }
}
```

配置完成后，重启 Cursor（完全关闭再打开），在 AI 输入框中输入 `/` 应该能看到 `my-tools` 下的工具列表。

---

## 第六步：将 Dify 应用发布为 MCP Server

Dify v1.x 支持将发布后的应用直接暴露为 MCP Server，供 Claude Desktop、Cursor 等工具调用。这是一个更"懒人"的方案，适合不想自己写 Python 的人群。

### 在 Dify 中开启 MCP Server

1. 进入 Dify 任意应用的「发布」页面
2. 找到 MCP Server 配置模块（默认关闭）
3. 开启后，Dify 会生成一个唯一的 MCP Server 地址（类似 `https://api.dify.ai/mcp/srv-xxx`）

<Danger>
这个 URL 包含认证凭证，类似于 API Key。泄露后任何人可以直接调用你的 Dify 应用。发现泄露后，立即在 Dify 中点击「重新生成」按钮吊销旧地址。
</Danger>

### 在 Cursor 中接入 Dify MCP

拿到 Dify 的 MCP Server URL 后，直接写入 `.cursor/mcp.json`：

```json title=".cursor/mcp.json"
{
  "mcpServers": {
    "my-dify-app": {
      "url": "https://api.dify.ai/mcp/srv-xxxxxxxxxxxx"
    }
  }
}
```

重启 Cursor，你就能在 AI 对话中直接调用 Dify 应用定义的工具了。

---

## 常见问题

**Q1：工具调用时返回空结果，但代码逻辑没问题**

检查是否有 `print()` 语句——MCP 通过 stdout 传输 JSON-RPC 协议，**任何 print() 输出都会破坏协议**，导致连接崩溃。用 `logging` 模块输出到 stderr：

```python
import logging
import sys

logging.basicConfig(stream=sys.stderr, level=logging.INFO)
```

**Q2：httpx 请求总是超时**

给 `httpx.AsyncClient` 显式设置 `timeout=` 参数，默认为 5 秒。外部 API 调用建议设 `timeout=15.0`。

**Q3：Cursor 连接后看不到工具**

先确认 Server 是否正常运行（用 `mcp dev` 测试），再确认 `.cursor/mcp.json` 路径是否在项目根目录，且 JSON 格式正确（注意逗号和引号）。

**Q4：Dify MCP Server URL 过期或失效**

Dify 的 MCP Server URL 不会自动过期，但可以手动重新生成。重新生成后旧的 URL 立即失效，需同步更新所有客户端配置。

---

## 下一步

恭喜你完成了第一个自定义 MCP Server。如果想继续深入，推荐以下方向：

- 在 Server 中接入向量数据库（如 ChromaDB），让 AI 拥有长期记忆
- 用 MCP 的 **Resources** 机制提供 AI 可读取的上下文数据
- 研究 MCP 的 **Prompts** 机制，定义可复用的提示模板

相关阅读：

- [Dify 部署教程：Docker 本地搭建 AI Agent 平台](/tutorials/2026-04-26-dify-docker-deploy/)
- [Dify MCP Server 官方文档](https://docs.dify.ai/en/use-dify/publish/publish-mcp)
- [FastMCP 官方仓库](https://github.com/jlowin/fastmcp)
