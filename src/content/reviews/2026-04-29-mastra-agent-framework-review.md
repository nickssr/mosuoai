---
title: "Mastra 评测：TypeScript 原生的 AI Agent 框架香不香？"
description: "Mastra 是由 Gatsby.js 核心团队打造的 TypeScript AI Agent 框架，2026年1月发布 1.0，GitHub 22K 星，YC 融资 1300 万美元。本文实测 + 评价：它解决了什么问题，什么场景下会踩坑，以及相比 LangGraph/Vercel AI SDK 的真实差异。"
pubDate: 2026-04-29 13:25:00
tags: ["Mastra", "TypeScript", "AI Agent", "框架评测", "YC", "RAG"]
category: "reviews"
rating: 4
pros:
  - "TypeScript 原生，API 设计对 JS 开发者友好"
  - "内置 RAG、Memory、Evals，开箱即用"
  - "YC W25 最高融资，团队工程能力有背书"
  - "与 Vercel AI SDK 深度集成，Web 场景无缝"
cons:
  - "2026年1月才发 1.0，生产案例积累时间短"
  - "生态插件数量不如 LangGraph 丰富"
  - "Defer/延迟执行等高级特性文档不全"
  - "中文社区资料少，踩坑只能看英文文档"
verdict: "TypeScript 团队的优先选择。Web 应用场景下 Mastra 比直接用 LangChain+Python 少写 50% 代码。但如果你需要复杂的图编排、对抗性并发控制、或已经在用 LangGraph，不要为了追新换框架。"
heroImage: "/images/posts/2026-04-29-mastra-agent-framework-review/hero.png"
---

## 前言

2026年1月，Mastra 发布 1.0 版本，宣布完成 1300 万美元种子轮融资，资方名单包括 Y Combinator、Google AI Fund (Gradient Ventures)、Paul Graham、Guillermo Rauch (Vercel CEO)、Amjad Masad (Replit CEO)。

这个团队的上一款产品是 Gatsby.js——JavaScript 生态里最流行的静态站点生成框架之一。他们在 2024 年卖掉 Gatsby 后，重新组队，赌的是一件事：**TypeScript 开发者需要一个原生的生产级 AI Agent 框架，而不是从 Python 框架移植过来。**

这个赌注对不对？我花了三天研究它的源码、文档和生产案例，给出我的判断。

## 评测维度

本文从以下角度评估 Mastra：

| 维度 | 权重 | 说明 |
|------|------|------|
| **易用性** | 25% | 上手速度、API 设计、文档质量 |
| **功能完整度** | 25% | Agent、Workflow、RAG、Memory、Evals |
| **生产就绪度** | 20% | 稳定性、监控、错误处理 |
| **生态扩展** | 15% | MCP 支持、第三方集成、社区活跃度 |
| **场景适配度** | 15% | 什么场景强，什么场景弱 |

## 第一维：易用性

**结论：TypeScript 团队友好，但对习惯 Python 的人有学习曲线。**

Mastra 的 API 设计很「函数式」——用 Zod 定义工具 schema，用 `agent.generate()` 和 `agent.stream()` 处理响应，用 `workflow.step()` 定义步骤。这个模式对有 React/Vercel 背景的开发者来说是直觉的。

但如果你习惯 CrewAI 的 `from_langchain` 那种声明式 agent 定义方式，Mastra 需要适应一下。

```typescript
// Mastra 的 Agent 定义方式
const agent = new Agent({
  name: "research-assistant",
  model: gemini("gemini-2.0-flash"),
  instructions: "你是一个研究助手，擅长信息检索和总结",
  tools: [weatherTool, searchTool],
});

// 调用方式
const result = await agent.generate("帮我查一下北京今天的天气");
```

对比 CrewAI 的写法：

```python
# CrewAI 的 Agent 定义方式
researcher = Agent(
    role="Researcher",
    goal="Find latest AI news",
    backstory="You are a research expert",
    tools=[search_tool, browse_tool]
)
```

Mastra 的问题在于：**文档太简略**。很多高级 API 没有完整示例，需要读源码才能理解。比如延迟执行（Defer）和流式工具调用，文档只有一句话，实际用的时候需要去 GitHub Issues 找答案。

## 第二维：功能完整度

**结论：覆盖完整，主要模块没有明显短板。**

Mastra 1.0 的六大核心模块：

### Agents（自主任务执行）

```typescript
// 带工具调用的 Agent
const agent = new Agent({
  model: openai("gpt-4o"),
  tools: {
    search: tool({
      description: "Search the web",
      schema: z.object({ query: z.string() }),
      execute: async ({ query }) => {
        return await searchWeb(query);
      }
    })
  }
});
```

支持 `.generate()` 同步和 `.stream()` 流式两种调用方式。工具 approval 流程（MCP 风格的 human-in-the-loop）需要自己实现，没有 LangGraph 的 Checkpointer 那么成熟。

### Workflows（确定性多步骤编排）

这是 Mastra 和 Vercel AI SDK 拉开差距的地方。CrewAI 用 code-first 的 role-based 模式，Mastra 用声明式的 step 模式：

```typescript
const workflow = new Workflow({
  name: "content-pipeline",
  trigger: { schema: z.object({ topic: z.string() }) },
});

workflow
  .step(researchStep)
  .step(writeStep)
  .step(reviewStep)
  .then(publishStep);

workflow.commit();
```

支持条件分支、并行执行、循环，以及**人工审批节点**（`human_review`）。但文档里对并发控制（同一个 workflow 同时触发两次会怎样）没有明确说明，这是我担心的点。

### RAG（检索增强生成）

```typescript
const rag = new RAG({
  vectorStore: new QdrantStore({ url: "http://localhost:6333" }),
  embedder: embed("embed-english-v3"),
});

await rag.index({
  documents: [{ id: "1", text: "Mastra 是 TypeScript AI 框架" }],
});

// 检索
const results = await rag.retrieve({ query: "什么是 Mastra？" });
```

支持 Pinecone、Qdrant、ChromaDB、pgvector 等主流向量数据库。Pipeline 设计比 LangChain 的 `VectorStoreIndex` 更灵活，但 chunking 策略只有基础选项，高级策略（sentence-splitting、semantic chunking）需要自己扩展。

### Memory（持久化记忆）

这是 Mastra 最有特色的模块之一。四层记忆：

| 层次 | 内容 | 触发时机 |
|------|------|----------|
| 对话历史 | 原始消息列表 | 每次对话 |
| 语义召回 | 通过 embeddings 检索相关历史 | Agent 自行判断 |
| 工作记忆 | 结构化的事实和偏好 | Agent 自行写入 |
| 观测记忆 | 压缩后的对话摘要 | 自动定时 |

这个设计比 LangGraph 的单纯 `Memory` 变量更系统。但工作记忆和观测记忆的边界需要自己摸索，文档没有说清楚「什么时候该用哪个」。

### Evals（质量评估）

```typescript
const eval = new Evals();

const result = await eval.run({
  task: "评估 agent 回答是否相关",
  agent: myAgent,
  dataset: testCases,
  metrics: ["relevance", "faithfulness", "toxicity"]
});
```

支持 model-graded（让模型打分）、rule-based（正则匹配）、statistical（BLEU/ROUGE）三种评估方式。测试驱动开发（TDD）场景下很有用，但内置的 metrics 有限，需要自己写 evaluator。

## 第三维：生产就绪度

**结论：核心稳定，运维工具尚在建设。**

Mastra 的核心包 `@mastra/core` 是 Apache 2.0 许可，生产可用。Replit 和 WorkOS 已经在生产环境跑着，团队规模 26 人，融资 1300 万美元，短期内没有倒闭风险。

**监控方面**：Mastra 集成 OpenTelemetry，但没有内置的 dashboard，需要自己接 Grafana 或 Datadog。这比 LangSmith（LangGraph 的商业观测平台）差一个档次。

**错误处理**：Workflow 的 step 失败有 retry 机制，但没有 LangGraph 那样的 `interrupt` 和 `checkpoint` 来恢复中断状态。如果你需要中途保存进度，需要自己实现。

**高并发**：文档没有说明并发限制。考虑到 v1.0 的发布时间，建议在生产环境先做压测再上线。

## 第四维：生态扩展

**结论：MCP 支持是强项，TypeScript 生态天然优势。**

MCP 支持是 Mastra 的核心卖点之一——它既能**消费** MCP 工具（接入外部服务），也能**暴露**自己的工具给外部 MCP 客户端（Cursor、VS Code、Claude Desktop）。

```typescript
// 暴露 Mastra 工具为 MCP 服务器
const server = new MCPServer({
  tools: [myTool1, myTool2],
});
```

这个设计对 TypeScript 开发者很有吸引力——你写的工具可以同时给 AI Agent 用和给人类开发者用。

对比其他框架：

| 框架 | MCP 消费 | MCP 暴露 |
|------|---------|---------|
| **Mastra** | ✅ 原生 | ✅ 原生 |
| LangGraph | ✅ adapter | ✅ adapter |
| CrewAI | ✅ v1.10 原生 | ❌ 需 adapter |
| Vercel AI SDK | ✅ 原生 | ❌ 不支持 |

## 第五维：场景适配度

**结论：Web 应用 + TypeScript 团队 = 首选。复杂图编排 = 不适合。**

### 适合 Mastra 的场景

**1. TypeScript/Web 技术栈的 AI 应用团队**
Vercel AI SDK 团队（Next.js/React 生态）做 AI 功能，Mastra 提供了更完整的 Agent 抽象。两者可以无缝叠加。

**2. 需要快速出原型**
内置 RAG、Memory、Evals，不用从零搭组件。官方宣传「从想法到生产」不是营销话术，对于中间复杂度的场景确实如此。

**3. 已有 Vercel/Next.js 基础设施**
Mastra 和 Vercel AI SDK 都是 Vercek 生態，部署到 Vercel 或 Cloudflare Workers 的体验最好。

**4. 需要给人类开发者暴露 AI 工具**
MCP 双向支持是独特优势，其他框架没有这个能力。

### 不适合 Mastra 的场景

**1. 复杂的多 Agent 图编排**
LangGraph 的图模型更成熟，并发控制、checkpoint、interrupt 都更完善。Mastra 的 Workflow 适合线性流程，复杂 DAG（有向无环图）场景下不如 LangGraph。

**2. Python 优先的团队**
虽然 Mastra 有 Python SDK 的计划，但目前只有 TypeScript。如果你队里没有 TypeScript 工程师，上手成本高于 Python 框架。

**3. 需要强一致性的金融/医疗场景**
Mastra v1.0 生产案例时间短，没有经过金融/医疗场景的严格验证。LangGraph 有 Klarna（85M 用户）的背书，Mastra 目前没有同等量级的案例。

**4. 追求丰富插件生态**
LangGraph 的插件市场更成熟，Mastra 的插件数量还在增长中。如果你需要大量第三方集成，Mastra 可能会让你失望。

## 横向对比：Mastra vs 同类

| 维度 | Mastra | Vercel AI SDK | LangGraph | CrewAI |
|------|--------|--------------|-----------|--------|
| 语言 | TypeScript | TypeScript | Python/JS | Python |
| 上手难度 | 中 | 低 | 高 | 低 |
| RAG 内置 | ✅ | ❌ | ❌ | ❌ |
| Memory 内置 | ✅ 四层 | ❌ | 基础 | 基础 |
| Evals 内置 | ✅ | ❌ | ❌ | ❌ |
| Workflow | 声明式 | ❌ | 图模型 | Role-based |
| MCP 双向 | ✅ | ✅ 消费 | adapter | ✅ 消费 |
| 生产案例 | 早期 | 多 | 丰富 | 丰富 |
| 文档完整度 | 中 | 高 | 高 | 高 |

## 结论与选型建议

**Mastra 解决了什么问题**：TypeScript 开发者终于有了一个「不用从 Python 移植过来」的生产级 AI Agent 框架。它内置的 RAG、Memory、Evals 模块让中小型 AI 应用可以直接用，不需要从零搭组件。

**Mastra 没解决的问题**：复杂图编排、生产级观测、金融场景验证。这些是 LangGraph 的领地。

**我的最终评价**：

如果你正在用 TypeScript/Next.js 构建 AI 应用，Mastra 是目前最好的选择——比从 LangChain 移植的方案更原生，比自己从 Vercel AI SDK 搭 Agent 层更完整。

如果你需要复杂的 Agent 协作、状态持久化、生产级监控，LangGraph 的护城河依然稳固。Mastra 1.0 是好的开始，但需要时间来证明自己。

**值得期待**：Mastra 的 v1.1 路线图里提到了 Defer（延迟执行）和更好的并发控制。如果这两个做实，Mastra 的适用场景会显著扩大。

---

**相关阅读**：
- [15大AI Agent框架横评：编排模式与选型决策树](/reviews/2026-04-28-agent-framework-comparison)
- [Hermes Agent 安装配置指南：从零搭建自改进 AI Agent](/tutorials/2026-04-26-hermes-agent-install-guide)
- [GitHub](https://github.com/mastra-ai/mastra)