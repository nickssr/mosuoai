---
title: 'Databricks 发布 Agent Bricks：企业级 AI Agent 统一平台'
description: 'Databricks 推出 Agent Bricks 平台，统一数据、模型和治理，让企业能够构建、部署和管理可控的 AI Agent。'
pubDate: 2026-04-18
author: 摩索 AI
tags: ['Databricks', 'Agent Bricks', '企业平台', 'AI 治理']
category: 'news'
heroImage: '/images/news/default-cover.svg'
---

## 核心新闻

**2026 年 4 月 14 日**，Databricks 正式发布 **Agent Bricks** 平台，这是一个企业级 AI Agent 平台，用于构建、部署和管理可控的 AI Agent。该平台统一了数据、模型和治理，解决了企业采用 AI Agent 的核心痛点。

---

## 核心挑战

Databricks 指出：

> **问题不在于构建 Agent，而在于用真实的上下文、权限和控制来运行它们。**

企业面临的主要挑战：

1. **数据孤岛** - Agent 无法访问企业数据
2. **权限管理** - 难以控制 Agent 的操作权限
3. **治理合规** - 需要满足审计和合规要求
4. **模型选择** - 需要在多个模型之间切换
5. **成本控制** - Token 成本难以预测和控制

---

## Agent Bricks 解决方案

### 1. 多 AI 和 Agent 编排

#### Custom Agents (GA)
- 构建和部署 Agent 应用
- 支持任何模型或框架
- 完整生命周期管理

#### Supervisor Agent (GA)
- 协调多个 Agent 和工具
- 定义任务后自动协调执行
- 跨模型和工具的统一管理

#### Web Search in Foundation Model API
- 实时网络搜索能力
- 为 Agent 回答提供最新信息
- 原生集成，无需额外配置

### 2. 治理与访问控制

#### AI Gateway
- 统一管理对模型、编码 Agent 和 MCP 工具的访问
- 细粒度权限控制
- 使用量监控和成本追踪

#### Agent Mode in Genie Spaces
- 从单次问答转向多步推理
- 基于企业数据的深度分析
- 支持复杂业务流程

#### CLEARS Framework for Agent Quality
通过 MLflow 评估 Agent 质量：

| 维度 | 说明 |
|------|------|
| **C**orrectness | 答案准确性 |
| **L**atency | 响应延迟 |
| **E**xecution | 执行效率 |
| **A**dherence | 遵循指令程度 |
| **R**eliability | 可靠性 |
| **S**afety | 安全性 |

### 3. 文档智能 (GA)
- 理解企业文档内容
- 自动提取关键信息
- 支持多种文档格式

---

## 实际应用场景

### 场景 1：营销异常检测

> 营销团队使用 Agent Bricks 构建了一个监控 Agent，能够在广告预算浪费之前检测并解决营销活动中的异常。

**效果：**
- 实时监测广告投放
- 自动识别异常模式
- 在预算浪费前发出警报

### 场景 2：客户服务自动化

> 客服团队部署了多个专业 Agent，分别处理不同类型的问题，由 Supervisor Agent 协调。

**效果：**
- 响应时间缩短 60%
- 客户满意度提升 25%
- 人工客服工作量减少 40%

### 场景 3：数据分析报告生成

> 数据团队使用 Agent Bricks 构建了一个数据分析 Agent，能够自动生成业务报告。

**效果：**
- 报告生成时间从 3 天缩短到 3 小时
- 数据准确性提升
- 分析师可以专注于深度分析

---

## 与竞品对比

| 功能 | Databricks Agent Bricks | Microsoft Agent Framework | OpenClaw |
|------|------------------------|--------------------------|----------|
| 数据集成 | ✅ 深度集成 | ⚠️ 需要配置 | ⚠️ 需要配置 |
| 多模型支持 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| 治理框架 | ✅ 完整 | ✅ 完整 | ⚠️ 基础 |
| 成本监控 | ✅ 内置 | ⚠️ 需要配置 | ❌ 无 |
| 企业集成 | ✅ 深度 | ✅ 深度 | ⚠️ 基础 |
| 开源程度 | ⚠️ 部分开源 | ✅ 完全开源 | ✅ 完全开源 |

---

## 可用性

**今天发布的功能：**

- ✅ Document Intelligence (GA)
- ✅ Custom Agents (GA)
- ✅ Supervisor Agent (GA)
- ✅ AI Gateway
- ✅ CLEARS Framework

**即将发布：**

- 🔄 Agent Broker (Beta) - 确定性编排
- 🔄 可视化创作画布 - 拖拽式 Agent 设计
- 🔄 Salesforce 模型支持 - 深度集成

---

## 行业意义

Databricks Agent Bricks 的发布标志着：

1. **企业级 AI Agent 平台成熟** - 从工具到平台
2. **数据 +AI 深度融合** - 发挥数据资产价值
3. **治理先行** - 安全和合规是前提

---

## 相关链接

- [Databricks 官方博客](https://www.databricks.com/blog/agent-bricks-governed-enterprise-agent-platform)
- [Agent Bricks 文档](https://docs.databricks.com/agent-bricks)
- [CLEARS Framework 详解](https://docs.databricks.com/agent-bricks/clears-framework)
- [AI Gateway 配置指南](https://docs.databricks.com/ai-gateway)

---

*本文基于 Databricks 官方博客和产品文档整理*
*发布时间：2026-04-18*
