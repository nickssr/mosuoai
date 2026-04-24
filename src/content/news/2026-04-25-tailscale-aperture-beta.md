---
title: "Tailscale 发布 Aperture beta：AI Agent 时代的成本与安全控制工具"
description: "Tailscale 发布 Aperture beta，为 AI Agent 提供跨 provider 的统一配额管理、PII 护栏和审计日志。个人和小团队免费使用，解决 Agent 高 Token 消耗带来的成本失控和数据安全风险。"
pubDate: 2026-04-25
tags: ["AI Agent", "成本控制", "Tailscale", "Aperture", "安全工具"]
category: "news"
heroImage: "/og-default.svg"
---

## 前言

AI Agent 的 Token 消耗正在"吃掉"企业的 AI 预算。2026 年 4 月 24 日，Tailscale 发布 Aperture beta，这是一个专为 AI Agent 时代设计的成本控制与安全工具。核心亮点：**个人和小团队免费使用**。

## 背景：Agent 终结了 AI 的"包月时代"

Tailscale 在官方博客中指出，过去几周出现了两大定价变化：

1. **第三方 Agent 失去包月计划访问权**
2. **企业开始为所有 Token 支付 API 费率**

原因很简单：**Agent 的 Token 消耗量是普通聊天的数十倍**。

> "Claude Code、Codex、OpenCode、OpenClaw 等 Agent 使用的 Token 数量，比任务型聊天高出几个数量级。包月计划中，轻度聊天用户的费用补贴了重度 Agent 工作负载，这种模式无法持续。"

## 核心功能：三大能力应对 Agent 挑战

### 1. 跨 Provider 统一配额

**问题**：工程师希望使用多个模型 provider，但成本难以控制。

**解决方案**：Aperture 提供统一配额池，可跨 provider、模型、身份、设备使用。

**核心特性：**
- 设置用户、群组、Agent 的预算
- 支持单个 Agent 运行的独立预算
- 跨 Claude、OpenAI、Anthropic 等多个 provider
- 防止意外高额账单

**场景示例**：

- 关键任务使用最先进的模型（如 Claude Opus 4）
- 常规任务使用便宜 80% 的开源模型
- 预算用尽时自动停止，避免意外超支

### 2. 数据安全护栏

**问题**：Agent 24/7 运行，敏感数据可能泄露。

**解决方案**：Pre-LLM-call hook 系统，在请求发送到 LLM 前进行处理。

**核心能力：**
- 检测并移除 PII（个人身份信息）
- 阻止特定工具调用
- 自定义过滤规则

### 3. 隐私与审计

**问题**：如何平衡可见性与数据隐私？

**解决方案**：两层新控制

**日志保留设置**：

- 可将请求/响应日志保留时间降至零（不写入 Aperture）
- 仍支持 S3 兼容导出

**管理员审计日志**：

- 管理员查看其他用户的日志时，访问记录会被保存
- 其他管理员可通过 API 或 Web UI 审查访问历史

## 定价：个人和小团队免费

Aperture beta 的定价策略：

- **Personal 计划**：完全免费
- **个人使用**：免费
- **小团队**：免费
- **大型团队**：联系销售

这是一个非常友好的定价策略，个人开发者和小团队可以零成本使用。

## 对开发者的意义

### 1. 解决 Agent 成本失控

AI Agent 的 Token 消耗是当前最大的成本痛点。Aperture 提供：

- 跨 provider 的统一视图
- 实时预算控制
- 防止意外超支

### 2. 满足企业安全合规

企业部署 AI Agent 的核心障碍是安全和合规。Aperture 提供：

- PII 脱敏
- 审计日志
- 数据保留控制

### 3. 简化多 Provider 管理

开发者不再需要在多个 provider 之间手动管理预算，Aperture 提供统一入口。

## 与其他工具对比

| 工具 | 定位 | 成本控制 | 安全功能 | 定价 |
|------|------|---------|---------|------|
| **Aperture** | AI Agent 网关 | ✅ 统一配额 | ✅ PII 护栏 | 个人免费 |
| **LangSmith** | LLM 可观测性 | ❌ | ❌ | 按用量付费 |
| **Helicone** | LLM 监控 | ❌ | ❌ | 免费层有限 |
| **Portkey** | AI 网关 | ✅ | ✅ | 按用量付费 |

## 使用场景

### 场景 1：个人开发者

- 使用 Claude Code、OpenCode 等 Agent
- 需要控制月度成本
- 防止意外高额账单

### 场景 2：小团队

- 多个开发者使用不同 Agent
- 需要团队级预算管理
- 需要审计日志

### 场景 3：企业

- 大规模部署 AI Agent
- 严格的安全合规要求
- 需要细粒度权限控制

## 快速开始

1. 注册 Tailscale Personal 计划
2. 配置 Aperture 作为 LLM 代理
3. 设置预算和护栏规则
4. 开始使用

```bash
# 示例：通过 Aperture 调用 LLM
export OPENAI_API_BASE=https://aperture.tailscale.com/v1
# Agent 会自动通过 Aperture 路由请求
```

## 挑战与限制

### 1. 需要改变现有工作流

开发者需要将 Agent 的 LLM 调用指向 Aperture，这需要一定的配置工作。

### 2. 依赖 Tailscale 网络

Aperture 基于 Tailscale 的网络基础设施，需要部署 Tailscale。

### 3. 大型团队需联系销售

大型团队的定价需要单独洽谈，可能不够透明。

## 行业影响

### 1. AI Agent 网关成为刚需

随着 Agent 普及，成本控制和安全工具将成为基础设施的一部分。

### 2. 定价模式转变

从"包月"到"按用量"的转变，催生了 Aperture 这类工具。

### 3. 开源 vs 商业

Aperture 的个人免费策略，可能推动其他厂商调整定价。

## 相关阅读

- [Aperture 官方博客](https://tailscale.com/blog/aperture-public-beta)
- [Tailscale 官网](https://tailscale.com)

---

**更新时间**：2026-04-25 02:25
**来源**：Tailscale 官方博客、Hacker News
