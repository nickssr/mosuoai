---
title: "Hermes Agent 安装配置指南：开源自改进 AI Agent 快速上手"
description: "Hermes Agent 是 Nous Research 推出的开源 AI Agent，主打自改进记忆和自动化学工具集。本文详细介绍在 Linux/macOS/WSL2 上的安装、配置和首测流程，帮你 10 分钟搭建属于自己的 AI Agent。"
pubDate: 2026-04-26 15:20:00
tags: ["Hermes Agent", "Nous Research", "AI Agent", "开源", "自改进"]
category: "setup"
difficulty: "beginner"
duration: "15分钟"
heroImage: "/images/posts/2026-04-26-hermes-agent-install-guide/hero.png"
---

## 前言

Hermes Agent 是由开源 AI 实验室 Nous Research 推出的 AI Agent 项目，2026 年 4 月发布 v0.9.0 版本（代号「everywhere release」），在 GitHub 已获得 **117,179 星**（截至 2026 年 4 月 26 日），一跃成为 AI Agent 领域最热门开源项目之一。

它的核心卖点是：**第一个自带 harness（工具链）的 AI Agent**。传统 Agent 需要你手动配置 CLAUDE.md、记忆系统、工作流，而 Hermes 把这些全部自动化，让 AI Agent 真正做到「越用越聪明」。

![Hermes Agent 安装界面](/images/posts/2026-04-26-hermes-agent-install-guide/install-screen.png)

本文基于官方文档和实操经验，介绍从零安装到首测的完整流程。

## 核心特性一览

| 特性 | 说明 |
|------|------|
| GitHub 星标 | **117,179**（持续增长中） |
| 工具数量 | 40+ 内置工具 |
| 消息平台 | 12+（Telegram、Discord、Slack、WhatsApp 等） |
| MCP 支持 | 可连接 6,000+ Model Context Protocol 应用 |
| 记忆层 | 三层记忆（会话/持久/技能）+ Honcho 用户建模 |
| 自改进 | 任务后自动反思循环 |
| 并发限制 | 最多 3 个子 Agent |
| 最低成本 | ~$5/月 VPS 可运行 |
| 许可证 | MIT，完全开源 |

## 第一步：安装 Hermes Agent

### 环境要求

Hermes 支持以下平台：

- **Linux**（主流发行版）
- **macOS**
- **WSL2**（Windows 子系统）
- **Android/Termux**

> ⚠️ Windows 原生不支持，需先安装 WSL2。

### 一键安装

Linux/macOS/WSL2 执行：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装程序会自动检测并安装所有依赖项：

- `uv`（快速 Python 包管理器）
- Python 3.11
- Node.js v22（浏览器自动化和 WhatsApp 桥接用）
- ripgrep（快速文件搜索）
- ffmpeg（TTS 音频格式转换）

安装完成后，重新加载 shell：

```bash
source ~/.bashrc  # 或 source ~/.zshrc
```

### 验证安装

```bash
hermes doctor
```

运行正常后会显示环境检查结果，告诉你哪些组件已就绪。

![Hermes Agent TUI 界面](/images/posts/2026-04-26-hermes-agent-install-guide/tui-screen.png)

## 第二步：选择模型提供商

模型提供商的选择是安装后最关键的步骤。使用以下命令进入交互式配置：

```bash
hermes model
```

推荐的默认选择：

| 场景 | 推荐方案 |
|------|---------|
| 最省事 | Nous Portal 或 OpenRouter |
| 已有 Claude/Codex 账号 | Anthropic 或 OpenAI Codex |
| 本地/私有推理 | Ollama 或自定义 OpenAI 兼容端点 |
| 多提供商路由 | OpenRouter |
| 自建 GPU 服务器 | vLLM、SGLang、LiteLLM |

> 📌 **最低上下文要求**：Hermes Agent 需要至少 64K tokens 上下文的模型。多数托管模型（Claude、GPT、Gemini、Qwen、DeepSeek）都满足要求。本地模型请确保 context window ≥ 64K。

### 配置 API Key

```bash
hermes config set OPENROUTER_API_KEY your_key_here
```

配置存储位置：
- 密钥和 Token → `~/.hermes/.env`
- 非机密配置 → `~/.hermes/config.yaml`

## 第三步：首次对话验证

启动 CLI：

```bash
hermes
```

或使用更现代的 TUI 界面（推荐）：

```bash
hermes --tui
```

首次测试建议使用具体可验证的 prompt：

```
总结这个代码库，用 5 个要点说明主要功能，并指出主入口文件在哪里。
```

### 验证成功的标准

- ✅ 启动 Banner 显示所选模型和提供商
- ✅ Hermes 正常回复，无报错
- ✅ 可以调用工具（如终端、文件读取、网页搜索）
- ✅ 多轮对话正常延续

### 验证会话恢复

```bash
hermes --continue  # 或简写：hermes -c
```

## 第四步：核心功能一览

### 终端工具

在 TUI 中输入：

```
我的磁盘使用情况如何？显示最大的 5 个目录。
```

### 斜杠命令

输入 `/` 可看到所有可用命令：

| 命令 | 功能 |
|------|------|
| `/help` | 显示所有命令 |
| `/tools` | 列出可用工具 |
| `/model` | 切换模型 |
| `/personality pirate` | 切换人格 |
| `/save` | 保存会话 |

### 中断 Agent

如果 Agent 执行时间过长，直接输入新消息并回车即可中断当前任务。

## 第五步：连接消息平台（可选）

```bash
hermes gateway setup
```

支持的平台包括 Telegram、Discord、Slack、WhatsApp、Signal、iMessage、WeChat、Email、Home Assistant 等。

## 自改进机制详解

Hermes 最独特的特性是其**五阶段自改进循环**：

![自改进飞轮示意图](/images/posts/2026-04-26-hermes-agent-install-guide/self-improve-flywheel.png)

**具体流程：**

1. **记忆筛选**：判断本次对话中哪些内容值得保留
2. **创建技能**：如果这是重复模式，自动提取为可复用技能文件
3. **优化技能**：如果已有技能执行失败，自动更新
4. **FTS5 检索**：通过全文搜索按需召回历史
5. **用户建模**：Honcho 模块从行为模式推断用户特征

以写 Python 爬虫为例：

- **第一次**：生成可用但风格不一定符合你习惯的脚本
- **第十次**：它知道你偏好 httpx 而非 requests，知道你的变量命名习惯，知道你的错误处理风格

## 安全配置：沙盒隔离

生产环境建议用 Docker 隔离运行：

```bash
hermes config set terminal.backend docker  # Docker 隔离
hermes config set terminal.backend ssh     # 远程服务器
```

## 常见问题排查

| 问题 | 解决方案 |
|------|---------|
| `hermes: command not found` | 重新加载 shell（`source ~/.bashrc`），或检查 PATH |
| API key 未设置 | 运行 `hermes model` 配置，或 `hermes config set OPENROUTER_API_KEY your_key` |
| 更新后配置丢失 | 运行 `hermes config check` 然后 `hermes config migrate` |

运行诊断：

```bash
hermes doctor
```

## 总结

Hermes Agent 将原本需要手动配置数月的 Agent 工具链，压缩成了「一行命令 + 一次配置」。它的自改进机制让 AI 不再是每次都从头开始的工具，而是真正能记住你、适应你的伙伴。

GitHub 117,179 星的数据证明了社区对它的认可。如果你也在找 OpenClaw 的替代品，或想体验「会成长的 AI Agent」，Hermes 值得一试。

---

**相关阅读**：
- [Hermes Agent 评测：自改进能否超越 OpenClaw？](/reviews/hermes-agent-self-improving)
- [OpenClaw vs Hermes Agent：持久化 AI Agent 深度对比](/reviews/openclaw-vs-hermes-agent)
- [Nous Research GitHub](https://github.com/NousResearch/hermes-agent)
