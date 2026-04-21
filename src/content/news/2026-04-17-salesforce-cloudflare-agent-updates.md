---
title: 'Salesforce 与 Cloudflare 同步更新 Agent 平台：企业 AI 竞争白热化'
description: 'Salesforce 扩展 Agent Fabric 控制平面，Cloudflare 发布 Project Think，两大平台同步更新 Agent 能力，企业 AI 市场竞争加剧。'
pubDate: 2026-04-17
author: 摩索 AI
tags: ['Salesforce', 'Cloudflare', 'Agent Fabric', 'Project Think']
category: 'news'
heroImage: '/images/news/salesforce-cloudflare-agents.svg'
---

## 核心新闻

**2026 年 4 月 15 日**，同一天内，Salesforce 和 Cloudflare 两家科技巨头同步发布了 AI Agent 平台的重要更新，标志着企业 AI 市场竞争进入白热化阶段。

---

## Salesforce Agent Fabric 更新

### 核心定位

> **Agent Fabric 是一个可信的 Agent 控制平面，用于管理快速演变的多供应商 AI 格局。**

### 新增功能

#### 1. 扩展 Agent 发现

**新增支持平台：**
- Amazon Bedrock
- Microsoft Foundry
- GoDaddy

**MCP 服务器自动发现** - 自动检测和注册兼容的 MCP 服务器

#### 2. Agent Governance (GA)

**正式发布的治理功能：**

| 功能 | 说明 |
|------|------|
| AI Gateway | 统一管理和治理对模型、工具的访问 |
| MCP Bridge | 连接不同 MCP 服务器的桥梁 |
| Trusted Agent Identity | 可信 Agent 身份认证 |
| Mobile Authorization | 高风险操作的移动授权 |

#### 3. Agent Broker (Beta)

**确定性编排** - 确保 Agent 行为可预测：

- 可视化创作画布（6 月发布）
- Salesforce 模型支持（6 月发布）
- 确定性工作流引擎

### 区域扩展

- 🇨🇦 加拿大
- 🇯🇵 日本
- 支持 Runtime Fabric 部署

### 使用数据

> **自 2025 年 9 月发布以来，Agent Fabric 已管理和协调了数千个 Agent 实例**

---

## Cloudflare Project Think

### 核心定位

> **Project Think 是下一代 Agents SDK，提供新的原语来构建更强大的 AI Agent。**

### 新原语

#### 1. Agent Storage
- 持久化 Agent 状态
- 支持长期运行的工作流
- 基于 Cloudflare Durable Objects

#### 2. Agent Orchestration
- 多 Agent 协调
- 工作流管理
- 错误处理和重试

#### 3. Agent Security
- 内置安全边界
- 权限隔离
- 审计日志

### Agents Week 2026

Cloudflare 在"Agents Week"期间发布了一系列 Agent 相关产品：

| 产品 | 说明 |
|------|------|
| **Project Think** | 下一代 Agents SDK |
| **AI Gateway** | AI 请求网关和治理 |
| **Agent Readiness Score** | 网站 Agent 就绪度评分 |
| **AI Code Review** | AI 代码审查工具 |

### 内部实践

Cloudflare 分享了其内部 AI 工程栈：

> "我们在 Cloudflare 平台上构建了自己的内部 AI 工程栈，然后将其作为产品提供给客户。"

**架构特点：**
- 基于 Cloudflare Workers
- 使用 Workers AI 进行推理
- 通过 AI Gateway 管理访问
- 集成 MCP 协议

---

## 行业分析

### 竞争格局

| 厂商 | 产品 | 定位 | 目标用户 |
|------|------|------|----------|
| **Microsoft** | Agent Framework 1.0 | 通用开发框架 | 开发者 |
| **Salesforce** | Agent Fabric | CRM 集成控制平面 | 企业用户 |
| **Cloudflare** | Project Think | 边缘计算 Agent 平台 | 开发者/企业 |
| **Databricks** | Agent Bricks | 数据驱动的 Agent 平台 | 数据团队 |
| **OpenClaw** | Task Brain | 开源 Agent 框架 | 开发者 |

### 关键趋势

#### 1. 控制平面成为焦点

所有厂商都在强调**控制**和**治理**：

- Salesforce: "可信的 Agent 控制平面"
- Microsoft: "Agent Governance Toolkit"
- Databricks: "治理的访问控制"
- OpenClaw: "任务控制平面"

#### 2. 多供应商互操作

**MCP (Model Context Protocol)** 成为共同标准：

- Salesforce: MCP Bridge
- Microsoft: MCP 支持
- Cloudflare: MCP 集成
- Databricks: MCP 连接工具

#### 3. 从实验到生产

所有平台都强调**生产就绪**：

- GA (General Availability) 发布增多
- 治理和合规功能完善
- 企业级支持和服务

---

## 企业采用建议

### 评估维度

| 维度 | 考虑因素 |
|------|----------|
| **现有生态** | 是否已使用 Salesforce/Cloudflare/Microsoft？ |
| **数据位置** | 数据在哪个平台？优先选择该平台 |
| **团队技能** | 团队熟悉哪个技术栈？ |
| **合规要求** | 是否有特定合规需求？ |
| **成本预算** | 各平台定价模式不同 |

### 推荐策略

1. **Salesforce 用户** → 优先评估 Agent Fabric
2. **Cloudflare 用户** → 优先评估 Project Think
3. **数据驱动团队** → 优先评估 Databricks Agent Bricks
4. **微软技术栈** → 优先评估 Microsoft Agent Framework
5. **开源优先** → 优先评估 OpenClaw

---

## 相关链接

- [Salesforce Agent Fabric 公告](https://www.salesforce.com/news/stories/agent-fabric-control-plane-announcement/)
- [Cloudflare Project Think](https://blog.cloudflare.com/project-think/)
- [Agents Week 2026 汇总](https://blog.cloudflare.com/agents-week-2026-recap/)
- [Agent Readiness Score](https://blog.cloudflare.com/agent-readiness-score/)

---

*本文基于 Salesforce 和 Cloudflare 官方博客整理*
*发布时间：2026-04-17*
