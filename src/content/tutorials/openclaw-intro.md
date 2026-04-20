---
title: 'OpenClaw 入门：什么是 OpenClaw？'
description: '了解 OpenClaw 是什么，它能做什么，以及如何开始使用这个强大的 AI Agent 框架。'
pubDate: 2026-04-20
author: 老李
tags: ['OpenClaw', '入门', 'AI Agent']
order: 100
---

## OpenClaw 是什么？

OpenClaw 是一个**AI Agent 框架**，让你能够创建、部署和管理自己的 AI 助手。

简单来说，它就像一个"操作系统"，你的 AI Agent 是运行在上面的"应用程序"。

---

## 核心能力

### 1. 多平台消息处理

OpenClaw 可以连接到各种 IM 平台：

- 飞书（Feishu/Lark）
- 微信（WeChat）
- Telegram
- Discord
- Slack
- 钉钉
- ...

**一个 Agent，多平台运行**，不用为每个平台单独开发。

---

### 2. 工具系统（Skills）

OpenClaw 的 **Skill 系统** 让 Agent 能够：

- 读取/写入文件
- 执行 shell 命令
- 调用外部 API
- 访问数据库
- 控制浏览器
- 管理日程/任务
- ...

你可以把任何功能封装成 Skill，Agent 就能调用。

---

### 3. 记忆系统

Agent 可以记住：

- **长期记忆**（MEMORY.md）- 用户信息、项目背景、关键决策
- **会话记忆**（memory/）- 每次对话的记录
- **自我改进记忆** - 从错误中学习，不断优化

---

### 4. 主动性（Proactivity）

Agent 不是被动等待指令，而是可以：

- 主动提醒（比如：该打胰岛素了）
- 主动跟进任务
- 主动检查项目状态
- 主动提出建议

---

## 典型应用场景

### 场景 1：个人助理

```
- 管理日程、提醒事项
- 记录会议纪要
- 整理待办清单
- 提醒吃药、打针（比如老李的胰岛素）
```

### 场景 2：项目管理

```
- 跟踪项目进度
- 自动汇报状态
- 整理文档
- 代码审查辅助
```

### 场景 3：客服/运营

```
- 自动回复常见问题
- 收集用户反馈
- 数据分析报告
```

### 场景 4：开发助手

```
- 代码生成
- Bug 排查
- 文档编写
- 测试用例生成
```

---

## 快速开始

### 前置要求

- Node.js 18+
- npm 或 pnpm
- 一个 IM 平台账号（推荐飞书）

### 安装

```bash
# 全局安装
npm install -g openclaw

# 验证安装
openclaw --version
```

### 初始化

```bash
# 创建工作区
openclaw init my-agent
cd my-agent

# 启动
openclaw gateway start
```

### 配置飞书

1. 去飞书开放平台创建应用
2. 获取 App ID 和 App Secret
3. 配置机器人权限
4. 在 OpenClaw 配置中填入凭证

---

## 第一个 Skill

创建一个简单的 Skill，让 Agent 能回复"你好"：

```markdown
# skills/hello/SKILL.md

## 触发条件
当用户说"你好"、"hi"、"hello"时

## 响应
回复："你好！我是你的 AI 助手，有什么可以帮你的？"
```

---

## 下一步

- [OpenClaw 安装配置详解](/tutorials/openclaw-install)
- [Skill 开发入门](/tutorials/skill-dev-basics)
- [记忆系统配置](/tutorials/memory-system)

---

## 有问题？

- 官方文档：https://docs.openclaw.ai
- Discord 社区：https://discord.com/invite/clawd
- GitHub：https://github.com/openclaw/openclaw
