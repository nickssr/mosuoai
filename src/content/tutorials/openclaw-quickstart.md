---
title: 'OpenClaw 快速入门 - 30 分钟搭建你的第一个 AI Agent'
description: '从零开始，使用 OpenClaw 搭建一个可以对话的 AI Agent。'
pubDate: 2026-04-20
heroImage: '/images/openclaw-quickstart.jpg'
tags: ['OpenClaw', '入门', 'AI Agent', '教程']
category: 'setup'
difficulty: 'beginner'
duration: '30 分钟'
---

## 前置要求

- Node.js 18+
- npm 或 pnpm
- 一个 IM 平台账号（推荐飞书）

## 步骤 1: 安装 OpenClaw

```bash
# 全局安装
npm install -g openclaw

# 验证安装
openclaw --version
```

## 步骤 2: 初始化项目

```bash
# 创建新项目
openclaw init my-first-agent
cd my-first-agent

# 安装依赖
npm install
```

## 步骤 3: 配置 IM 平台

### 飞书配置

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业应用
3. 获取 App ID 和 App Secret
4. 配置机器人权限

编辑 `.env` 文件：

```bash
IM_PLATFORM=feishu
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
```

## 步骤 4: 创建第一个 Skill

创建 `skills/hello/SKILL.md`：

```markdown
## 触发条件

当用户说"你好"、"hi"、"hello"时

## 响应

回复："你好！我是你的 AI 助手，有什么可以帮你的？"
```

## 步骤 5: 启动 Agent

```bash
openclaw gateway start
```

## 测试

在飞书中给你的机器人发送"你好"，应该收到回复。

---

## 下一步

- [配置记忆系统](/tutorials/memory-system)
- [开发自定义 Skill](/tutorials/skill-dev-basics)
- [部署到生产环境](/tutorials/deployment)
