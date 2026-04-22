---
title: 'OpenAI 发布 Agents SDK 重大更新：原生沙盒执行与模型原生框架'
description: 'OpenAI 推出 Agents SDK 重大更新，引入模型原生框架、原生沙盒执行、可配置内存等新能力，让开发者更轻松构建生产级 AI Agent。'
pubDate: 2026-04-22
author: MosuoAI
tags: ['OpenAI', 'AI Agent', 'Agents SDK', '开发工具']
category: 'news'
heroImage: '/og-default.svg'
---

## 核心更新

OpenAI 于 4 月 15 日发布 **Agents SDK 重大更新**，引入了一系列新能力，旨在帮助开发者更轻松地构建生产级 AI Agent。

这次更新的核心理念是：**开发者不仅需要最好的模型，还需要支持 Agent 检查文件、运行命令、编写代码并在多个步骤中持续工作的系统。**

## 新功能一览

### 1. 模型原生框架（Model-Native Harness）

新的 Agent Harness 专为处理文档、文件和系统的 Agent 设计：

- **可配置内存**：支持长时运行任务的上下文管理
- **沙盒感知编排**：安全地协调 Agent 执行环境
- **Codex 风格文件系统工具**：文件读写、代码编辑等
- **标准化集成**：支持 MCP、Skills、AGENTS.md 等新兴 Agent 原语

### 2. 原生沙盒执行

Agent 需要一个安全的工作空间来执行任务。SDK 现在原生支持沙盒执行：

- **开箱即用**：无需自己搭建执行环境
- **多平台支持**：Blaxel、Cloudflare、Daytona、E2B、Modal、Runloop、Vercel
- **存储集成**：AWS S3、Google Cloud Storage、Azure Blob Storage、Cloudflare R2

### 3. Manifest 抽象

新的 Manifest 抽象让 Agent 的工作空间可跨沙盒提供商移植：

```yaml
# 示例：定义 Agent 工作空间
mount:
  - local: ./data
    target: /workspace/data
output_dir: /workspace/output
storage:
  - provider: s3
    bucket: my-agent-data
```

## 为什么重要

在此之前，开发者面临三难选择：

1. **模型无关框架**：灵活但无法充分利用前沿模型能力
2. **模型提供商 SDK**：贴近模型但缺乏足够的执行框架可见性
3. **托管 Agent API**：简化部署但限制了 Agent 运行位置和数据访问方式

OpenAI 的新 SDK 试图解决这一困境，提供一个**即用又灵活**的框架，让开发者专注于领域特定逻辑。

## 实际案例

Oscar Health 使用新 SDK 自动化了临床记录工作流程：

> "更新的 Agents SDK 让我们能够可靠地自动化关键的临床记录工作流程。关键区别不仅在于提取正确的元数据，还在于正确理解长而复杂的记录中每次就诊的边界。" — Rachael Burns, Oscar Health Staff Engineer

## 开发者如何使用

SDK 目前已在 Python 中提供，TypeScript 支持计划在未来发布：

```python
from openai import OpenAI

client = OpenAI()

# 创建带有沙盒的 Agent
agent = client.agents.create(
    model="gpt-4o",
    instructions="分析数据并生成报告",
    tools=["shell", "apply_patch"],
    sandbox={
        "provider": "e2b",
        "manifest": {
            "mount": [{"local": "./data", "target": "/data"}]
        }
    }
)
```

## 展望

OpenAI 表示将继续扩展 Agents SDK 的能力，包括：

- 代码模式（Code Mode）
- 子 Agent（Subagents）
- 更多沙盒提供商支持
- TypeScript 支持

这次更新标志着 AI Agent 从实验阶段向基础设施演进的重要一步。

---

**参考来源**：[OpenAI 官方博客](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
