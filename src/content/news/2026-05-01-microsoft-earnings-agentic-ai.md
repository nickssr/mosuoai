---
title: "微软最新财报解读：Agentic AI 从「没成」到「成了」的三件事"
description: "微软 CEO Nadella 在财报电话会议上坦承「直到开始 work 了才 work」，这句话背后是 GitHub Copilot 转向按量计费、Agent Mode 成为默认模式、以及 Bing 首次突破 10 亿月活三重里程碑。"
pubDate: 2026-05-01 07:00:00
tags: ["Microsoft", "AI Agent", "财报", "GitHub Copilot", "Bing"]
category: "news"
heroImage: "/images/posts/2026-05-01-microsoft-earnings-agentic-ai/hero.svg"
---

## 前言

微软 CEO Satya Nadella 在最新季度财报电话会议上说了一句可能被广泛引用的话：「它直到开始 work 了才 work，而这是因为模型出现了。」（It sort of didn't work until it started working, and that's just because the model showed up.）

这句话的语境是 Excel 中的 Agent Mode——一个让 AI 与用户协同创建和编辑 Excel 工作簿的功能。这句话的坦诚程度在大型科技公司 CEO 中相当罕见，也从侧面说明 Agentic AI 的落地路径并非一帆风顺。理解这段话背后的三件具体事件，比引用金句更有价值。

## 第一件事：GitHub Copilot 转向按量计费

从 6 月 1 日起，GitHub Copilot 将从订阅制改为**按使用量计费**模式。这是微软 AI 商业化的关键转向。

此前 Copilot 采用固定月费模式——企业支付固定费用，开发者无限制使用。对于浅度用户（月均使用不足一定量），这实际上是一种补贴；对于重度用户，固定费用反而是省钱的选择。按量计费意味着：

- **轻度用户成本下降**：按实际 token 消耗付费
- **重度用户成本上升**：无上限使用可能带来账单激增
- **微软的收入模型更健康**：使用量与收入成正比

Nadella 强调，这一转变背后是 Copilot Credit 消耗量「几乎每个季度翻倍」——按量计费让微软能更公平地向高使用量用户收费。企业 CTO 需要注意：这一变化将显著影响 AI 开发工具的预算结构。

## 第二件事：Bing 首次突破 10 亿月活

成立 17 年的微软 Bing 搜索服务，在本季度首次达到 **10 亿月活用户**。这一数字背后的驱动力值得关注：

Nadella 将 Bing 增长归功于 AI 能力的整合——尤其是 Copilot（ 原 Bing Chat）的推出。但 10 亿月活对于搜索市场来说究竟意味着什么，需要客观看待：

- Google 搜索月活约 30-40 亿，Bing 仍有较大差距
- 但在某些市场（尤其是企业市场），Bing 的份额在上升
- Bing 的 AI 摘要（AI Overview）功能提升了用户留存

对 AI Agent 开发者而言，Bing 的流量增长说明一个趋势：**搜索作为信息获取入口，正在被 AI 对话式交互分流**。这对于构建 AI Agent 的数据源设计有直接影响——如何让 Agent 可靠地获取实时信息，Bing 正在成为一个被越来越多开发者考虑的数据通道。

## 第三件事：90% 财富 500 强已用低代码工具构建 Agent

Nadella 透露一个关键数字：目前**近 90% 的财富 500 强企业**已使用微软的低代码/无代码工具构建了自有 Agent。

这不是小规模试点，而是生产级部署。这一数字的置信区间需要考虑微软的市场推广能力，但它反映了一个重要趋势：**Agent 构建的门槛正在快速下降**。

主流 Agent 构建方式正在从「API + 代码」向「拖拽配置 + 策略定义」迁移。低代码 Agent 平台的崛起，使得业务人员（而非纯工程师）也能参与 Agent 设计。这对 AI Agent 开发者的影响是：纯粹的技术壁垒在降低，垂直行业知识和工作流理解正在成为新的差异化来源。

## 从「没 work」到「work 了」：Nadella 的话揭示了什么

Nadella 所说的「Agent Mode 之前没 work」，背后涉及的是 AI Agent 领域一个核心挑战：**跨步骤任务执行的可信赖性**。

Excel Agent 的任务复杂度远超单次问答——它需要理解：用户想做什么数据结构 → 识别现有数据 → 生成新内容 → 保持格式一致 → 处理用户可能的修改。这种多轮协作在模型能力不足时，会产生累积误差，导致结果不可用。

「模型出现了」（the model showed up）指的是微软认为当前模型的推理能力已跨过这个门槛。Nadella 的逻辑是：不是 Excel Agent 的产品设计变了，而是底层模型的计划与执行能力提升了。

这与我们在多个场景中观察到的趋势一致：**Agentic AI 的可用性，本质上由模型推理能力决定**，而非 Agent 框架本身的成熟度。

## 我们的判断

三件事中，**GitHub Copilot 按量计费**对开发者影响最直接——从本月起，AI 编程工具的成本模型将发生根本性变化，建议开发者重新评估个人/企业的 Copilot 使用密度与成本关系。**Bing 10 亿月活**是一个市场信号，但不影响开发决策。**Agent 构建普及化**是中长期趋势，意味着 AI Agent 开发者的竞争力将越来越取决于行业 Know-how，而非纯技术能力。
