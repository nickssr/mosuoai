---
title: 'Microsoft Agent Framework 1.0 正式发布：多 Agent 协作迎来生产级框架'
description: '微软发布 Agent Framework 1.0 正式版，统一 Semantic Kernel 和 AutoGen，支持多模型、多 Agent 编排，企业级 AI 开发迎来新标准。'
pubDate: 2026-04-20
author: 摩索 AI
tags: ['Microsoft', 'Agent Framework', '多 Agent', '开源框架']
category: 'product'
heroImage: '/images/news/microsoft-agent-framework.svg'
---

## 核心新闻

**2026 年 4 月 3 日**，微软正式发布 **Microsoft Agent Framework 1.0**，这是一个生产级的开源 SDK，用于构建、编排和部署 AI Agent。该框架同时支持 .NET 和 Python，提供稳定的 API 和长期支持承诺。

---

## 关键特性

### 1. 统一两大框架

Microsoft Agent Framework 1.0 统一了微软之前的两个 AI 开发框架：

- **Semantic Kernel** - 企业级 AI 开发框架
- **AutoGen** - 多 Agent 协作实验框架

现在开发者只需学习一个框架，即可构建从单 Agent 到多 Agent 协作的各类应用。

### 2. 多模型支持

框架支持来自多个提供商的模型：

- Azure OpenAI
- OpenAI GPT 系列
- Anthropic Claude
- 其他 MCP 兼容模型

### 3. 多 Agent 编排模式

支持多种编排模式：

- **顺序执行** - Agent 按顺序完成任务
- **并发执行** - 多个 Agent 并行工作
- **任务移交** - Agent 之间传递任务
- **群聊模式** - 多个 Agent 协作讨论
- **分层管理** - 主管 Agent 协调多个子 Agent

### 4. 协议支持

- **MCP (Model Context Protocol)** - Agent 可动态发现和调用外部工具
- **A2A (Agent2Agent Protocol)** - 支持不同 Agent 之间的互操作

---

## 企业级功能

### 治理与安全

微软同时发布了 **Agent Governance Toolkit**，包含：

- 权限控制和审计日志
- 高风险操作的人工审批
- 异常行为检测和拦截
- 合规性检查

### 迁移指南

对于现有用户：

- **Semantic Kernel 用户** - 提供详细迁移指南
- **AutoGen 用户** - 兼容层支持平滑迁移
- **GitHub Copilot** - 集成迁移助手自动生成迁移计划

---

## 行业影响

根据 Gartner 最新报告：

> **42% 的企业计划在 2026 年部署 AI Agent**

Microsoft Agent Framework 1.0 的发布标志着：

1. **企业级 AI 开发标准化** - 统一的框架和 API
2. **从实验到生产** - 稳定的生产级支持
3. **多供应商互操作** - 支持不同模型和 Agent 之间的协作

---

## 开发者反馈

> "Engineering around agents now matters more than raw AI model power."
> 
> 工程化能力比单纯的模型性能更重要。

对于企业而言，这意味着：

- 治理、安全和集成框架是价值所在
- 不仅仅是模型能力的竞争
- 需要专业的工程化支持

---

## 快速开始

```python
# 5 行代码创建第一个 Agent
from microsoft.agent import Agent

agent = Agent(name="Assistant")
result = await agent.run("帮我分析这份数据")
print(result)
```

---

## 相关链接

- [Microsoft Agent Framework 官方文档](https://devblogs.microsoft.com/agent-framework/)
- [GitHub 仓库](https://github.com/microsoft/agent-framework)
- [Semantic Kernel 迁移指南](https://aka.ms/sk-migration)
- [AutoGen 迁移指南](https://aka.ms/autogen-migration)
- [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit)

---

*本文基于 Microsoft 官方博客和行业媒体报道整理*
*发布时间：2026-04-20*
