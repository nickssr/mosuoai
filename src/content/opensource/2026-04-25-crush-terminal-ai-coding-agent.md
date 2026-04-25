---
title: "Crush：终端里的 AI 编程搭档，Charmbracelet 出品"
description: "Charmbracelet 发布开源 AI 编程 Agent Crush，支持多模型切换、LSP 增强、MCP 扩展。支持 macOS/Linux/Windows/FreeBSD，个人使用完全免费。"
pubDate: 2026-04-25
tags: ["AI编程", "开源", "终端", "Charmbracelet", "Crush"]
heroImage: "/images/posts/crush-terminal-ai-coding-agent/cover.webp"
---

## 前言

Charmbracelet，这个打造了 Bubbletea、Glow、Gum 等终端工具的团队，在 2025 年 7 月发布了 **Crush** —— 一个终端 AI 编程 Agent。367 颗星，支持 15+ LLM 提供商，支持 LSP 和 MCP。

## 项目概览

**基本信息**：

- **仓库**：https://github.com/charmbracelet/crush
- **Stars**：367（截至 2026-04-25）
- **开源协议**：MIT
- **语言**：Go
- **发布时间**：2025-07-30

**核心定位**：

> Your new coding bestie, now available in your favourite terminal.

终端里的编程搭档，无缝接入你的工具、代码与工作流，全面兼容主流 LLM 模型。

## 核心功能

### 1. 多模型支持

Crush 支持超过 15 个 LLM 提供商：

**主流提供商**：

- Anthropic (Claude)
- OpenAI (GPT-4)
- Google Gemini
- Groq
- OpenRouter
- Vercel AI Gateway

**订阅制服务**：

- Synthetic
- GLM Coding Plan
- Kimi Code
- MiniMax Coding Plan

**云服务**：

- Amazon Bedrock (Claude)
- Azure OpenAI
- Google Cloud VertexAI

**灵活切换**：

Crush 支持**会话内切换模型**，同时保留上下文：

```text
> 使用 Claude Opus 4 分析代码
> 切换到 Gemini 2.5 Pro 生成测试
> 切换到 GPT-4o 写文档
```

### 2. LSP 增强

Crush 使用 LSP（Language Server Protocol）获取代码上下文：

**支持的语言服务器**：

```json
{
  "lsp": {
    "go": { "command": "gopls", "enabled": true },
    "nix": { "command": "nil", "enabled": true },
    "python": { "command": "pyright", "enabled": true },
    "typescript": { "command": "tsserver", "enabled": true }
  }
}
```

**LSP 提供的上下文**：

- 类型信息
- 定义跳转
- 引用查找
- 自动补全

**效果**：Crush 能更准确地理解代码结构，而不是简单的文本匹配。

### 3. 会话管理

Crush 支持多会话并行：

**特性**：

- 每个项目独立的会话
- 会话内保留上下文
- 可以在会话间切换

**配置**：

```json
{
  "options": {
    "context_paths": ["/etc/nixos/configuration.nix"],
    "tui": { "compact_mode": true }
  }
}
```

### 4. MCP 扩展

Crush 支持 MCP (Model Context Protocol) 扩展：

**支持的 MCP 类型**：

- HTTP MCP
- Stdio MCP
- SSE MCP

**扩展能力**：

- 自定义工具
- 外部 API 集成
- 数据库访问

### 5. 跨平台支持

Crush 支持几乎所有主流平台：

**操作系统**：

- macOS
- Linux
- Windows (PowerShell + WSL)
- Android
- FreeBSD
- OpenBSD
- NetBSD

**安装方式**：

```bash
# macOS/Linux - Homebrew
brew install charmbracelet/tap/crush

# NPM
npm install -g @charmland/crush

# Arch Linux
yay -S crush-bin

# Nix
nix run github:numtide/nix-ai-tools#crush

# Windows - Winget
winget install charmbracelet.crush

# Windows - Scoop
scoop bucket add charm https://github.com/charmbracelet/scoop-bucket.git
scoop install crush

# Go
go install github.com/charmbracelet/crush@latest
```

## 快速开始

### 1. 获取 API Key

选择一个提供商获取 API Key：

| 提供商 | 环境变量 | 获取方式 |
|--------|---------|---------|
| Anthropic | `ANTHROPIC_API_KEY` | [Anthropic Console](https://console.anthropic.com/) |
| OpenAI | `OPENAI_API_KEY` | [OpenAI Platform](https://platform.openai.com/) |
| Google Gemini | `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/) |
| Groq | `GROQ_API_KEY` | [Groq Console](https://console.groq.com/) |

### 2. 启动 Crush

```bash
# 设置环境变量
export ANTHROPIC_API_KEY=sk-ant-...

# 启动
crush
```

首次启动会提示选择模型和配置。

### 3. 基本使用

```text
> 分析这个函数的性能瓶颈
> 为这个模块写单元测试
> 重构这段代码，提高可读性
```

## 与其他工具对比

| 工具 | 平台 | 多模型 | LSP | MCP | 开源 |
|------|------|--------|-----|-----|------|
| **Crush** | 终端 | ✅ 15+ | ✅ | ✅ | ✅ MIT |
| Claude Code | 终端 | ❌ 仅 Claude | ❌ | ✅ | ❌ |
| OpenCode | 终端 | ✅ 多个 | ❌ | ✅ | ✅ Apache 2.0 |
| Cursor | IDE | ✅ 多个 | ✅ 内置 | ❌ | ❌ |
| GitHub Copilot | IDE | ❌ 仅 OpenAI | ✅ 内置 | ❌ | ❌ |

**Crush 的独特优势**：

- **终端原生**：适合服务器、SSH 环境
- **Charm 生态**：成熟的终端 UI 组件
- **工业级**：支持 25k+ 应用的基础设施

## Charm 生态

Crush 基于 Charmbracelet 的成熟生态：

**核心库**：

- **Bubbletea**：终端 UI 框架（25k stars）
- **Lipgloss**：样式库
- **Bubbles**：UI 组件库
- **Gum**：Shell 脚本 UI

**终端工具**：

- **Glow**：Markdown 渲染
- **Gum**：交互式 Shell 脚本
- **Mods**：AI 集成
- **Huh**：表单库

**生态优势**：

- 经过大规模生产验证
- 活跃的社区
- 持续的维护更新

## 配置详解

### 配置文件优先级

```text
1. .crush.json       # 项目本地
2. crush.json        # 项目根目录
3. ~/.config/crush/crush.json  # 全局
```

### 配置示例

```json
{
  "providers": {
    "openai": {
      "id": "openai",
      "name": "OpenAI",
      "base_url": "https://api.openai.com/v1",
      "type": "openai",
      "api_key": "sk-fake123456789abcdef...",
      "models": [
        { "id": "gpt-4", "name": "GPT-4" },
        { "id": "gpt-4o", "name": "GPT-4o" }
      ]
    }
  },
  "lsp": {
    "go": { "command": "gopls", "enabled": true },
    "python": { "command": "pyright", "enabled": true }
  },
  "options": {
    "context_paths": ["./src"],
    "tui": { "compact_mode": true },
    "debug": false
  }
}
```

## 实际使用场景

### 场景 1：服务器环境开发

```bash
# SSH 到服务器
ssh user@server

# 启动 Crush
crush

> 分析日志文件 /var/log/app.log
> 找出错误原因并提供修复建议
```

### 场景 2：快速原型开发

```text
> 创建一个简单的 HTTP 服务器
> 添加健康检查端点
> 写一个 Dockerfile
```

### 场景 3：代码审查

```text
> 审查 src/auth.py，检查安全问题
> 对比两种实现方式的性能差异
```

## 注意事项

### 1. Token 消耗

AI 编程 Agent 的 Token 消耗通常比聊天高数倍：

- 代码上下文较长
- LSP 信息增加上下文
- 多轮对话累积

建议：使用有 Token 限制的订阅制服务，避免意外高额账单。

### 2. 配置复杂度

多模型、LSP、MCP 的配置需要一定学习成本：

- 理解 LSP 工作原理
- 配置正确的环境变量
- 调试 MCP 连接问题

### 3. 终端环境限制

终端环境下：

- 无法显示图片
- 无法渲染复杂 UI
- 依赖终端性能

## 社区与支持

**官方资源**：

- [GitHub 仓库](https://github.com/charmbracelet/crush)
- [Discord 社区](https://charm.land/discord)
- [Slack 社区](https://charm.land/slack)

**模型列表**：

Crush 的默认模型列表由 [Catwalk](https://github.com/charmbracelet/catwalk) 维护，社区可以贡献新的模型配置。

## 相关阅读

- [Crush GitHub 仓库](https://github.com/charmbracelet/crush)
- [Charmbracelet 官网](https://charm.sh/)
- [Catwalk 模型列表](https://github.com/charmbracelet/catwalk)

---

**更新时间**：2026-04-25 02:45
**来源**：GitHub、Charmbracelet 官网
