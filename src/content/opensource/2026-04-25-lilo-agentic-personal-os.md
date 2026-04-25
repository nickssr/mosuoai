---
title: "Lilo：自托管智能个人 OS，让 Agent 管理你的数字生活"
description: "Lilo 是一个自托管的智能个人操作系统，集成应用、记忆、文件和 Agent。支持桌面、移动端、WhatsApp、Telegram、Email 多渠道接入，让 AI Agent 全方位管理你的数字生活。"
pubDate: 2026-04-25
tags: ["AI Agent", "个人 OS", "自托管", "开源"]
heroImage: "/og-default.svg"
---

你的数字生活分散在无数应用里：待办事项、文件、聊天记录、日程……能不能有一个 Agent 统一管理？

Lilo 的答案是：可以，而且要自托管。

## 一体化工作空间

Lilo 把"你的应用、你的记忆、你的文件、你的 Agent"整合到一个工作空间：

**应用按需生成**
预装了一组基础应用（桌面启动器、待办、卡路里追踪、计算器、写字板、扫雷），你可以让 Agent 构建更多应用。所有应用都具备完整的 Agent 能力。

**完整文件系统**
在工作空间中存储文件，支持 Markdown、代码、图片、PDF 的内联预览——你和 Agent 都能访问。

**多渠道接入**
桌面、移动端、WhatsApp、Telegram、Email，Agent 在所有渠道回复并保持每个联系人的持久聊天。

**记忆系统**
记住关于你、你的任务、你的工作的细节。

## Agent 能力

Lilo 的 Agent 不只是聊天助手：

- **构建应用**：让 Agent 创建新的工作空间应用
- **自定义 OS**：调整界面、工作流程
- **记忆事项**：跨会话持久化信息
- **处理待办**：使用工作空间中的所有资源

工具集成包括：Replicate（图像生成）、Firecrawl（网页搜索抓取）、Browserbase（无头浏览器自动化）、文件操作、Shell 执行、网络请求。

## 技术栈

- **前后端**：Node.js 20+、pnpm 10+
- **模型**：支持 GPT 5.4（OpenAI）和 Claude Opus 4.7（Anthropic），可在对话中切换
- **云同步**：可选 Git 远程同步，整个工作空间（应用、数据、记忆）版本化且跨设备可移植
- **安全**：一个环境变量锁定整个 Web 应用和所有后端 API

## 为什么自托管？

Lilo 的核心理念是"你的应用、你的记忆、你的文件"——强调所有权。自托管意味着：

- 数据在你自己的服务器上
- 可以自定义和扩展
- 不依赖第三方服务（可选）
- Git 版本控制，随时迁移

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/abi/lilo.git
cd lilo

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 API 密钥

# 启动
pnpm dev
```

## 相关资源

- [GitHub 仓库](https://github.com/abi/lilo)
- [Discord 社区](https://discord.gg/RAKmnS2G)
