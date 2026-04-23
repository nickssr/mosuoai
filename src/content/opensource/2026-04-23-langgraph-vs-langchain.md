---
title: 'LangGraph vs LangChain：Agent 开发范式之争'
description: '深度对比 LangGraph 和 LangChain 两大 Agent 框架的架构设计、适用场景和开发体验，帮你选择最适合的工具。'
pubDate: 2026-04-23
author: MosuoAI
tags: ['LangGraph', 'LangChain', 'Agent框架', '开源框架']
heroImage: '/og-default.svg'
---

## 背景

LangChain 和 LangGraph 都是目前最流行的 AI Agent 开发框架，但它们代表了两种不同的开发范式。

## LangChain：链式思维

LangChain 的核心思想是将 Agent 的行为抽象为"链"（Chain），通过预定义的流程来组织 Agent 的行为。

### 优势
- 上手简单，文档丰富
- 内置大量集成（LLM、向量库、工具等）
- 适合标准化的 Agent 场景

### 局限
- 流程固定，复杂场景需要大量 workaround
- 状态管理困难
- 调试体验不佳

## LangGraph：图式思维

LangGraph 将 Agent 的行为抽象为"图"（Graph），通过节点和边来定义 Agent 的执行流程。

### 优势
- 灵活的状态机模型
- 天然支持循环和条件分支
- 内置持久化和时间旅行（Time Travel）
- 更适合复杂的多 Agent 协作场景

### 局限
- 学习曲线较陡
- 文档相对较少
- 生态不如 LangChain 成熟

## 如何选择

| 场景 | 推荐框架 |
|------|---------|
| 简单问答/聊天 | LangChain |
| 标准化工作流 | LangChain |
| 复杂多步骤推理 | LangGraph |
| 多 Agent 协作 | LangGraph |
| 需要状态持久化 | LangGraph |

## 总结

LangChain 适合快速原型开发，LangGraph 适合生产级复杂应用。两者并非互斥，可以结合使用。
