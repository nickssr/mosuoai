---
title: "Hermes Agent 网关部署与 MCP 集成：打造 24/7 永不眠的 AI 助手"
description: "Hermes Agent v2026.3 引入了 System Gateway Service 模式，支持 systemd 部署实现真正的后台运行。本文详细介绍 systemd 级别部署、MCP Server 模式接入外部工具、以及 WeChat/飞书等国内平台的集成方法。"
pubDate: 2026-05-07 15:45:00
tags: ["Hermes Agent", "Nous Research", "systemd", "MCP", "部署", "WeChat", "飞书"]
category: "skill-dev"
difficulty: "intermediate"
duration: "30分钟"
heroImage: "/images/posts/2026-05-07-hermes-agent-gateway-mcp-deploy/hero.png"
---

## 前言

Hermes Agent 相比其他 AI Agent 框架最大的差异化，不是它的模型支持数量，而是**持久化和网关架构**。v2026.3 之后，Hermes 支持以 systemd 服务运行在系统级别，开机自启、不依赖登录会话、真正做到 24/7 后台运行。

这篇文章解决三个实际问题：

1. 如何把 Hermes Agent 部署为 systemd 系统服务
2. 如何通过 MCP 模式将 Hermes 接入更广泛的工具生态
3. 如何接入微信/飞书等国内平台（Hermes 的隐藏优势）

已有前两篇基础（[安装指南](/tutorials/2026-04-26-hermes-agent-install-guide/)、[技能自定义](/tutorials/2026-04-28-hermes-agent-skills-custom/)），本篇聚焦生产级部署和扩展集成。

---

## 前提条件

- Hermes Agent 已安装（参考[安装指南](/tutorials/2026-04-26-hermes-agent-install-guide/)）
- Linux 系统（本文使用 Ubuntu 22.04）
- systemd（大多数主流 Linux 发行版自带）
- 目标平台账号（微信测试号、飞书自建应用等）

---

## 第一步：理解 Gateway 架构

Hermes Agent 有两层概念需要分清：

**User Level（用户级）**：运行在当前用户会话里，登录退出就消失。适合本地开发体验。

**System Level（系统级）**：通过 systemd 部署为系统服务，开机自启，独立于任何用户会话运行。适合生产环境。

Gateway 是 Hermes 的消息汇聚层——它接收来自 Telegram、Discord、微信等平台的消息，转发给 Agent 处理，再把回复送回对应平台。

```
用户 ──→ Telegram/Discord/微信 ──→ Hermes Gateway ──→ Hermes Agent ──→ LLM
                                                              ↓
                                                     MCP Server（外部工具）
```

---

## 第二步：安装为 Systemd 系统服务

### 方式一：交互式安装（推荐新手）

```bash
hermes setup
```

运行后会有安装向导询问：

- **安装范围**：选择 `system`（系统级）而非 `user`（用户级）
- **LLM Provider**：选 ` Nous Portal` 或 `OpenRouter`
- **平台连接**：按需选择（不跳过，这步配置很关键）

安装向导会自动生成 systemd unit 文件并启用服务。

### 方式二：手动配置 systemd

如果你是进阶用户，想要完全掌控配置，按以下步骤手动操作。

#### 创建 service 文件

```bash
sudo nano /etc/systemd/system/hermes-agent.service
```

写入以下内容：

```ini title="/etc/systemd/system/hermes-agent.service"
[Unit]
Description=Hermes Agent - AI Assistant Gateway
After=network.target

[Service]
Type=simple
User=hermes
Group=hermes
WorkingDirectory=/home/hermes
ExecStart=/home/hermes/.local/bin/hermes gateway start
Restart=always
RestartSec=10
Environment="HERMES_ENV=production"
Environment="PATH=/usr/local/bin:/usr/bin:/home/hermes/.local/bin"

[Install]
WantedBy=multi-user.target
```

#### 创建专用用户（安全最佳实践）

```bash
# 创建专用用户（无登录 shell）
sudo useradd -r -s /usr/sbin/nologin hermes

# 给 Hermes 安装目录 ownership
sudo chown -R hermes:hermes /home/hermes
```

#### 启用并启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable hermes-agent
sudo systemctl start hermes-agent

# 验证状态
sudo systemctl status hermes-agent
```

正常情况下会看到 `active (running)`。

#### 查看日志

```bash
# 实时查看日志
sudo journalctl -u hermes-agent -f

# 查看最近 200 行
sudo journalctl -u hermes-agent -n 200
```

---

## 第三步：配置 Reasoning 热重载

Hermes v2026.3 引入了 Reasoning 热重载功能——修改推理设置不需要重启 Gateway，改完立即生效。

```bash
# 进入 Gateway CLI
hermes

# 查看当前推理配置
/reasoning

# 修改并发推理深度（不需要停服务）
/reasoning depth 8

# 修改思考模型
/reasoning model claude
```

也可以直接在配置文件中修改：

```bash
nano ~/.hermes/config.yaml
```

```yaml title="~/.hermes/config.yaml"
reasoning:
  model: "claude-sonnet-4-20250501"
  depth: 6
  hot_reload: true
```

改完后在 Gateway 中执行 `/reload`，无需重启 systemd 服务。

---

## 第四步：接入 MCP Server

Hermes Agent 内置 MCP 客户端，可以作为 MCP Host 接入任何标准 MCP Server。这让它能够突破内置工具集的限制，接入 LangChain 工具生态、Notion API、GitHub 等外部服务。

### 基本配置

编辑 `~/.hermes/config.yaml`：

```yaml title="~/.hermes/config.yaml"
mcp:
  servers:
    # 官方 Everything MCP Server（新手体验用）
    everything:
      command: npx
      args: ["-y", "@modelcontextprotocol/server-everything"]
    
    # 自定义 MCP Server（需要先构建）
    my-tools:
      command: "/home/hermes/my-mcp-server/.venv/bin/python"
      args: ["/home/hermes/my-mcp-server/server.py"]
      env:
        MY_API_KEY: "${MY_API_KEY}"
```

### 使用 mcp-proxy 桥接 SSE MCP Server

如果你的 MCP Server 以 HTTP SSE 方式运行（比如用 FastMCP 启动的服务），用 mcp-proxy 桥接：

```bash
# 启动 MCP Server（SSE 模式）
mcp-proxy --sse-port 8080 -- python /path/to/server.py

# Hermes 端配置
```

```yaml title="~/.hermes/config.yaml"
mcp:
  servers:
    my-http-mcp:
      url: "http://localhost:8080/sse"
      transport: "sse"
```

### MCP 工具过滤（安全建议）

MCP Server 往往暴露大量工具，全量接入有风险。用 `filter` 字段按需引入：

```yaml title="~/.hermes/config.yaml"
mcp:
  servers:
    github:
      command: npx
      args: ["-y", "@modelcontextprotocol/server-github"]
      filter:
        # 只允许这些工具
        allowed:
          - "github_search_repositories"
          - "github_get_repo"
```

---

## 第五步：接入微信（测试号）

微信对个人开发者不友好，但通过微信测试号可以完成接入体验。

### 获取测试号凭证

1. 访问 [微信公众平台测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)
2. 扫码登录后获取 `appID` 和 `appsecret`
3. 配置服务器地址（需公网 HTTPS URL）

### 配置 Hermes

```yaml title="~/.hermes/config.yaml"
messaging:
  platforms:
    wechat:
      enabled: true
      app_id: "wx_your_app_id_here"
      app_secret: "wx_your_app_secret_here"
      webhook_path: "/wechat/webhook"
      # 处理超时（秒）
      timeout: 30
```

### 解决微信端口限制

微信要求 webhook 必须走 80 或 443 端口，且必须是公网可访问的 HTTPS 地址。本地开发可以用 ngrok 转发：

```bash
# 安装 ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com ngrok main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# 注册 ngrok（需要去 ngrok.com 免费注册）
ngrok config add-authtoken YOUR_TOKEN

# 转发本地 8080 端口到公网 HTTPS
ngrok http 8080 --domain=your-registered-domain.ngrok-free.app
```

生产环境建议用 Cloudflare Tunnel 或 frp 替代 ngrok。

---

## 第六步：接入飞书

飞书比微信接入简单得多，支持自建应用模式，无需审核。

### 创建飞书自建应用

1. 进入 [飞书开放平台](https://open.feishu.cn/app) → 创建应用
2. 在「凭证与基础信息」中获取 `App ID` 和 `App Secret`
3. 添加「机器人」能力
4. 配置权限：读取消息、发送消息等
5. 发布应用（企业自建应用无需审核）

### 配置 Hermes

```yaml title="~/.hermes/config.yaml"
messaging:
  platforms:
    feishu:
      enabled: true
      app_id: "cli_xxxxxxxxxxxxx"
      app_secret: "xxxxxxxxxxxxxxxxxxxxxxxx"
      # 机器人名称（显示在飞书对话中）
      bot_name: "Hermes"
      # 是否启用 @ 机器人触发
      require_at: true
```

### 获取订阅权限

飞书要求消息订阅必须配置事件订阅 URL。Hermes Gateway 会自动处理验证请求，你只需要在飞书开放平台的「事件订阅」里填入：

```
https://your-domain.com/feishu/events
```

---

## 第七步：Web UI 管理面板（新增功能）

Hermes v2026.3 引入了 `hermes web` 命令，启动一个本地 Web 管理界面，可以可视化查看和修改配置。

### 启动 Web UI

```bash
hermes web --port 3000 --host 0.0.0.0
```

启动后访问 `http://your-server:3000`，可以看到：

| 页面 | 内容 |
|------|------|
| **Status** | Agent 版本、运行状态、Gateway 状态 |
| **Config** | Schema 驱动的配置编辑器，支持导入/导出/重置 |
| **API Keys** | 各平台密钥（已脱敏显示） |
| **Sessions** | 当前活跃会话列表 |
| **Skills** | 已注册的技能文件管理 |
| **Cron** | 定时任务管理 |
| **Logs** | 日志查看器 |

**注意**：Web UI 默认只监听 localhost，生产环境建议用 nginx 反向代理并配置 HTTPS + Basic Auth。

```nginx title="/etc/nginx/sites-available/hermes-web"
server {
    listen 443 ssl;
    server_name hermes.your-domain.com;

    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 常见问题

**Q1：systemd 服务启动失败，日志显示 `User hermes not found`**

创建用户时用了 `--shell /usr/sbin/nologin`，但可能 `hermes` 命令路径不在该用户的环境变量里。检查 `ExecStart` 使用绝对路径：

```bash
which hermes  # 获取绝对路径
```

同时确认 `WorkingDirectory` 和 `ExecStart` 路径正确。

**Q2：MCP Server 连接成功但工具不出现**

Hermes 对 MCP 工具名做了前缀处理，在对话中引用时要加上 `mcp__` 前缀，例如 `mcp__github__github_search_repositories`。也可以在配置中设置 `alias` 简化调用。

**Q3：微信测试号无法接收消息**

检查 ngrok 是否正常运行（免费版每次重启 URL 变化），确保飞书开放平台的「服务器地址」与当前 ngrok URL 一致。

**Q4：Web UI 暴露在内网，有安全风险**

Web UI 有两层保护：本地监听 + nginx Basic Auth。建议同时在 `hermes web` 加 `--no-open` 参数防止浏览器自动弹出，并在 nginx 层配置 Basic Auth 或 IP 白联。

---

## 下一步

Gateway 部署完成后，你的 Hermes Agent 就成了一个真正的 24/7 AI 助手——不依赖你的电脑，不依赖你的登录会话。接下来推荐：

- 配置 Cron 定时任务让它自动发日报、监控服务器
- 接入向量数据库增强记忆能力
- 通过 MCP 接入 GitHub Actions 实现自动化 Code Review

相关阅读：

- [Hermes Agent 安装指南：从零搭建你的第一个 AI 助手](/tutorials/2026-04-26-hermes-agent-install-guide/)
- [Hermes Agent 技能自定义：打造专属工作流](/tutorials/2026-04-28-hermes-agent-skills-custom/)
- [Hermes Agent 官方文档 - Gateway](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)
