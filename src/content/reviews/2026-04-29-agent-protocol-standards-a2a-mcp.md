---
title: "从 ACP 到 A2A：AI Agent 通信协议正在吞噬框架战争"
description: "MCP 已有 200+ 实现，A2A 获得 Linux Foundation 支持，ACP 正在退出历史。协议层的收敛正在改变游戏：选框架变成了选协议立场，而这场赌局的后果会在 2027 年显现。"
pubDate: 2026-04-29 13:00:00
tags: ["AI Agent", "A2A协议", "MCP", "ACP", "协议标准", "Anthropic", "Google", "Microsoft"]
category: "reviews"
rating: 5
pros:
  - "从协议演化角度分析，而非功能罗列"
  - "覆盖 ACP→A2A 的历史迁移逻辑"
  - "给出明确的选型判断，不回避立场"
  - "MCP/A2A 分层清晰，读者可落地执行"
cons:
  - "A2A 协议本身仍较新，生产案例有限"
  - "多框架并行支持协议的状态在快速变化"
verdict: "不要再问「用哪个框架」了，先问「站在哪个协议上」。如果你的工作流需要跨系统通信，A2A 是未来的握手层；如果你的 agent 需要调用工具，MCP 已经是事实标准。2026 年押注协议层的正确性，远高于押注任何单个框架。"
heroImage: "/og-default.svg"
---

## 前言

过去两年，AI Agent 框架战争的叙事一直是这样的：「LangGraph vs CrewAI vs AutoGen，谁会赢」。

这个问题的答案正在变得无关紧要。

原因是：**框架层面的竞争正在被协议层面的收敛反向吞噬**。当 MCP 成为所有主流框架的标配，当 A2A 让不同框架构建的 agent 可以互相发现和通信，框架本身的差异就退居第二位了——重要的是你选的那个框架站在什么协议上。

这不是预测，这是正在发生的事实。

## 协议层正在发生什么

### MCP：工具调用的事实标准

MCP（Model Context Protocol）由 Anthropic 在 2024 年底推出，最初被视为 Anthropic 的生态锁定工具。但到了 2026 年，MCP 的采用已经突破了平台边界：

- **200+ MCP 服务器**实现了生产级工具集成（Slack、GitHub、Notion、Salesforce、Playwright……）
- **CrewAI v1.10**、**Vercel AI SDK v6**、**Mastra**、**Microsoft Agent Framework** 均已实现原生 MCP 支持
- **Google ADK** 通过官方 adapter 支持 MCP
- 社区 adapter 让 LangGraph、AutoGen、OpenAI Agents SDK 也能接入 MCP 生态

MCP 解决的是「让 agent 调用工具」这个问题。它的价值在于：**一次实现，处处运行**。你写一个 MCP 服务器，任何支持 MCP 的 agent 都能调用它。

这意味着什么？**工具层不再是差异化竞争点**。你能调用的工具集合，在支持 MCP 的框架之间几乎是等价的。

### A2A：agent 之间的握手协议

如果说 MCP 是「agent 与工具之间的 USB-C」，那么 A2A（Agent-to-Agent Protocol）就是「agent 之间的 TCP/IP」。

A2A 由 Google 主导，在 2025 年将 ACP（Anthropic Agent Communication Protocol）纳入麾下后，确立了以 Linux Foundation 为治理主体的开放协议方向。目前已有 **50+ 合作伙伴**接入，包括 Salesforce、ServiceNow 等企业软件巨头。

A2A 解决的是「agent 与 agent 之间的通信」这个问题。具体包括：

- **Agent Discovery**：通过 Agent Card 自动发现对方的能力，不需要硬编码调用地址
- **任务传递**：在一个 agent 无法独立完成复杂任务时，将子任务委托给另一个 agent
- **状态同步**：委托方和执行方之间保持上下文传递

A2A 的关键意义在于：**它让跨框架的 agent 协作成为可能**。一个用 LangGraph 构建的金融分析 agent，可以调用一个用 CrewAI 构建的舆情监控 agent——只要两者都实现了 A2A。

### ACP 的退场

ACP（Agent Communication Protocol）曾是 Anthropic 推进的 agent 间通信协议，但在 2025 年与 Google 的 A2A 合并后，ACP 作为独立协议已基本退出历史舞台。对于仍在使用 ACP 的旧项目，迁移到 A2A 是 2026 年的必选项，而非可选项。

## 为什么协议收敛会重塑框架格局

### 框架的护城河正在从功能转向协议立场

在过去，框架的竞争力来自：
- 编排模式的灵活性（graph-based vs role-based vs handoff）
- 内置工具的丰富程度
- 观测和调试能力
- 团队的学习曲线

但当 MCP 让工具层等价化、A2A 让跨框架通信成为现实，框架的差异化就收缩到一个问题：**你对协议的支持是原生的还是 adapter 的？**

原生支持意味着：
- 协议更新时你第一时间获得支持
- 配置更少，连接更稳定
- 与同协议生态的互操作性更好

Adapter 支持意味着：
- 你能用，但不稳定
- 配置复杂，边界情况多
- 协议演进时你需要等社区更新

### 编排模式正在去重要性

有一个反直觉的结论：**在未来两年，编排模式（graph vs role vs handoff）的重要性会下降**。原因是：

当 agent 之间的通信协议标准化之后，**编排逻辑可以跨框架迁移**。CrewAI 的 role-based crew 可以通过 A2A 调用 LangGraph 的 stateful workflow，反之亦然。你不再需要为了一个特定的编排模式选择特定的框架。

这意味着：**框架选择将从「我能做什么」转向「我站在哪个协议生态里」**。

## 我的判断：现在应该怎么押注

### 判断一：MCP 是必选项，不是加分项

如果你现在选的框架还不支持 MCP，原生支持时间表在 2026 年 Q3 之后，我建议换一个框架。MCP 已经过了「要不要支持」的讨论阶段，现在是「怎么支持最好」的阶段。

### 判断二：A2A 是长期赌注，短期不要 All-in

A2A 的生产案例目前集中在 Google 生态内的合作伙伴。对于中小团队，在 2026 年把 A2A 作为架构设计的参考原则是对的，但不要因为 A2A 就强行迁移到 Google ADK——除非你本来就在 GCP 上。

### 判断三：协议层比框架层更值得投入学习时间

如果你在 2026 年花了 100 小时学习 CrewAI 的 role-based 编排，这项技能的半衰期可能是 18 个月。但如果同样的时间用来理解 MCP 的工作原理和 A2A 的设计哲学，你的知识可以在任何框架之间迁移。

### 判断四：不要押注单一协议

协议层仍然在演化。Anthropic 的 Compute Layer、OpenAI 的工具调用协议、各云厂商的私有协议，都还在争夺影响力。在这场标准化战争结束之前（可能是 2027-2028 年），保持对多个协议的适配能力，比赌单一协议更明智。

**实操建议**：选择框架时，优先看「这个框架是否在协议层面保持开放」，而不是「这个框架的编排模式是否最先进」。

## 结论

框架战争还没结束，但它正在被协议战争重新定义。

MCP 已经赢了工具层。A2A 正在赢通信层。ACP 已退场。这三个事实拼在一起，指向同一个结论：**在 2026 年选框架，本质上是在选协议立场**。

你选的那个框架支持的协议，将决定你的 agent 在未来两年能不能跟整个生态互联互通。这个判断的价值，远高于纠结 graph-based 和 role-based 的优劣。

下一步：检查你当前的框架对 MCP 和 A2A 的支持状态。如果还需要手动 adapter，这本身就是答案。