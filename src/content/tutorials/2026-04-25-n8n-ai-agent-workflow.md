---
title: "n8n AI Agent 实战教程：从零搭建自动化工作流"
description: "手把手教你用 n8n 搭建 AI Agent 工作流，实现智能客服分流、自动化研究等场景。涵盖触发器、AI Agent 节点、Chat Model、Memory、Tools 五大核心组件，附带完整代码示例。"
pubDate: 2026-04-25
tags: ["n8n", "AI Agent", "工作流", "自动化", "教程"]
category: "setup"
difficulty: "beginner"
duration: "30分钟"
heroImage: "/og-default.svg"
---

## 前言

n8n 是一个开源的工作流自动化平台，支持 400+ 集成。2026 年，n8n 推出了 AI Agent 功能，让工作流从"固定规则"升级为"智能决策"。

本教程将带你从零搭建一个 AI Agent 工作流，实现智能客服分流功能。

## 前提条件

**环境准备**：

- n8n 实例（云版或自托管）
- LLM API Key（Gemini / Claude / OpenAI）
- 基础 n8n 操作经验

**获取 Gemini API Key**：

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 点击侧边栏 "Get API Key"
3. 复制 API Key

## AI Agent 与普通工作流的区别

### 普通工作流：固定规则

```
如果邮件包含"退款" → 发送模板 A
如果邮件包含"发票" → 发送模板 B
```

**问题**：每个分支都需要预先定义，无法处理意外情况。

### AI Agent：智能决策

```
读取消息 → 理解问题 → 检查客户历史 → 决定回复/查询/升级
```

**优势**：根据上下文动态决策，无需预定义所有规则。

**适用场景**：

- 客服分流（回答/升级/记录）
- 研究任务（查询 API、总结发现）
- CRM 数据增强
- 内容审核与修订

## AI Agent 的四大核心组件

每个 n8n AI Agent 都由四个部分组成：

### 1. 触发器（Trigger）

启动 Agent 的方式：

- **Chat Trigger**：对话式 Agent（推荐新手）
- **Webhook**：集成外部系统
- **Scheduled Trigger**：定时任务
- **Form Submission**：表单提交

### 2. AI Agent 节点

Agent 的"大脑"，负责：

- 接收输入
- 调用 LLM
- 决策使用哪个工具
- 循环执行直到完成任务

### 3. 子节点（Sub-nodes）

连接到 AI Agent 节点的三个类型：

- **Chat Model**：LLM（Gemini / Claude / GPT）
- **Memory**：上下文记忆
- **Tools**：Agent 能力（API 调用、数据库查询等）

### 4. 输出（Output）

结果去向：

- 聊天界面回复
- Slack 消息
- Google Sheets 行追加
- 任意 n8n 集成

## 实战：搭建客服分流 Agent

### 场景

一个 SaaS 产品的客服 Agent：

- 回答常见问题（密码重置、账单基础）
- 无法回答时升级到人工
- 简洁、不废话

### 步骤 1：添加 Chat Trigger

1. 创建新工作流
2. 添加 **Chat Trigger** 节点
3. 这个节点会生成一个聊天界面 URL，方便测试

### 步骤 2：添加 AI Agent 节点

1. 点击 Chat Trigger 后的 + 按钮
2. 搜索 "AI Agent" 并添加
3. 连接到触发器

### 步骤 3：配置 System Message

在 AI Agent 节点中，最重要的字段是 **System Message**：

```text
You are a support agent for a SaaS product. Your job is to:

1. Answer common questions directly if you can (password resets, billing basics, plan information)
2. If the issue requires account-specific information you don't have, let the user know you're escalating to the team
3. Always be concise. Don't pad responses with unnecessary filler.
4. If the user seems frustrated, acknowledge it briefly before answering.

You do NOT have access to account data unless a tool provides it. Don't make up information.
```

**关键点**：

- 明确职责范围
- 告诉 Agent 它**不知道**什么（防止幻觉）
- 定义行为风格

### 步骤 4：连接 Chat Model

1. 悬停在 AI Agent 节点底部
2. 点击 **Chat Model** 连接器
3. 添加 **Gemini** 或 **Claude** 节点
4. 输入 API Key

### 步骤 5：测试 Agent

在 Chat Trigger 生成的聊天界面中发送测试消息：

```text
用户：我忘记密码了
Agent：您可以点击登录页面的"忘记密码"链接，系统会发送重置邮件到您的注册邮箱。
```

```text
用户：我想查看我的账单历史
Agent：我无法访问您的账户信息。我已将您的问题升级到客服团队，他们会通过邮件联系您。
```

## Memory：让 Agent 记住上下文

### 为什么需要 Memory

没有 Memory 的 Agent：

```text
用户：我叫张三
Agent：你好张三！

用户：我叫什么？
Agent：抱歉，我不知道您的名字。
```

### Simple Memory 的问题

n8n 默认提供 Simple Memory，但**不适合生产环境**：

- 所有对话历史存储在一个字符串中
- 随着对话增长，Token 消耗指数级上升
- 可能导致 LLM 调用失败

### 生产级 Memory 方案

**方案 1：窗口化 Memory**

只保留最近 N 条消息：

```text
保留最近 10 条消息
旧消息自动丢弃
```

**方案 2：摘要 Memory**

定期总结历史：

```text
[摘要] 用户是张三，正在询问账单问题，已尝试密码重置...
```

## 2026 年新特性：大多数教程还没跟上

### 1. 动态工具切换

根据业务逻辑动态启用/禁用工具：

```text
if user_authenticated:
  enable_account_tools()
else:
  enable_public_tools()
```

### 2. Agent 状态观察

外部监控 Agent 状态，实现：

- 中断执行
- 动态调整工具
- 多 Agent 协作

### 3. 结构化输出

要求 Agent 输出 JSON 格式：

```json
{
  "action": "escalate",
  "reason": "Account-specific data required",
  "priority": "high"
}
```

## 进阶：添加工具

### 示例：知识库搜索工具

1. 添加 **Tool** 节点到 AI Agent
2. 配置为 HTTP Request 工具
3. 连接到你的知识库 API

Agent 会自动决定何时调用工具：

```text
用户：你们的定价是什么？
Agent：[调用知识库工具] [返回定价信息]
```

## 常见问题

### Q1：Agent 一直重复相同的回答？

**原因**：System Message 不够清晰。

**解决**：在 System Message 中明确：

```text
If you've already answered a question, don't repeat yourself.
```

### Q2：Agent 幻觉严重？

**原因**：没有告诉 Agent 它不知道什么。

**解决**：在 System Message 中明确限制：

```text
You do NOT have access to:
- Account balances
- User passwords
- Payment history
```

### Q3：Token 消耗过高？

**原因**：Memory 没有优化。

**解决**：

- 使用窗口化 Memory
- 定期清理旧消息
- 考虑摘要 Memory

### Q4：响应速度慢？

**原因**：Tool 调用过多。

**解决**：

- 合并多个工具调用
- 使用缓存
- 选择更快的 LLM

## 最佳实践

### 1. System Message 要具体

```text
❌ 你是一个有帮助的助手
✅ 你是 SaaS 产品的客服 Agent，负责回答密码重置、账单问题
```

### 2. 明确限制

```text
❌ 不要撒谎
✅ 你无法访问账户数据，如果用户询问账户信息，告知他们会升级到人工客服
```

### 3. 测试边界情况

测试以下场景：

- 用户说"我不知道"
- 用户问超出范围的问题
- 用户连续提问相同问题

## 相关阅读

- [n8n 官方文档](https://docs.n8n.io/)
- [n8n AI Agent 官方教程](https://theowllogic.com/n8n-ai-agent-workflow)

---

**更新时间**：2026-04-25 02:35
**来源**：n8n 官方文档、The Owl Logic 教程
