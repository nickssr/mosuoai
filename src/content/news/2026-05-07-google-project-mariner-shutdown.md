---
title: "Google 关闭 Project Mariner：浏览器 AI Agent 实验宣告终结"
description: "Google 于 2026 年 5 月 4 日正式关闭 Project Mariner，这一曾被寄予厚望的浏览器自动化 AI Agent 项目在运行一年半后谢幕，其核心技术已转移至 Gemini Agent 和 AI Mode。"
pubDate: 2026-05-07 07:00:00
tags: ["Google", "AI Agent", "Project Mariner", "Gemini", "浏览器自动化"]
category: "news"
heroImage: "/images/posts/2026-05-07-google-project-mariner-shutdown/hero.webp"
---

## 事件回顾

Google 已正式关闭 Project Mariner（项目落地页现显示："Thank you for using Project Mariner. It was shut down on May 4th, 2026 and its technology voyaged to other Google products."）。

Project Mariner 首次亮相于 2024 年 12 月，是 Google 展示 AI Agent 能力的旗舰实验项目。它定位为「浏览器中的 AI 助手」，能够代表用户在网页上完成多步骤任务，包括：

- 搜索并预订酒店
- 清理邮箱中的订阅邮件
- 研究航班价格并完成比价
- 批量完成最多 10 个任务

Google 后续将 Project Mariner 的核心能力整合进了两个产品：

1. **Gemini Agent**（面向普通用户的 AI 个人助理）：可代为归档邮件、预订酒店等
2. **AI Mode**（AI 驱动的新一代搜索）：集成 Agent 能力，支持多步骤信息任务

2026 年初，Google 还展示过一项名为 **Auto-Browse** 的 Chrome 内置功能，能在浏览器中自动执行多步骤研究任务（如自动查找航班价格），被外界视为对 OpenAI Operator、Perplexity Comet 以及 OpenClaw 等竞品的直接回应。

## 为什么关闭？

Project Mariner 的关闭并非失败，而是能力迁移。这背后的逻辑值得思考：

**实验产品完成使命后退出舞台**。经过一年半的迭代，Mariner 验证的核心能力（浏览器任务自动化、多步推理）已经被更成熟的产品承接。继续维护一个独立实验项目，反而增加产品线复杂度。

**为 Google I/O 2026 让路**。Google I/O 2026 将于 5 月 19 日揭幕，有传言称 Google 将在会上发布新一代 AI Agent 功能。关闭旧实验项目，有助于在大会前清理产品线，为新功能腾出注意力。

**浏览器 Agent 的竞争格局已变**。当 OpenAI Operator、OpenClaw 等产品已经将浏览器自动化做成消费级功能时，Google 继续维护一个实验性网页工具的战略价值下降。

## Agent 能力迁移路径分析

Project Mariner 的关闭揭示了当前 AI Agent 产品演进的一个典型模式：**实验验证 → 能力整合 → 独立项目下线**。

```
实验阶段 (Project Mariner)
    ↓ 验证了核心能力可行
能力整合 (Gemini Agent + AI Mode)
    ↓ 产品成熟，独立项目退出
项目关闭 (Mariner 官网下线)
```

这一路径对 AI Agent 开发者有重要参考：浏览器自动化 Agent 作为独立产品的窗口期正在关闭，能力集成到已有平台级产品中才是更现实的商业路径。

## 对开发者的影响

如果你曾在 Google AI Studio 或 Labs 中使用过 Project Mariner，需要注意：

- 已创建的任务链（Task Chains）将无法继续运行
- Google 建议将自动化流程迁移至 Gemini Agent 或通过 Gemini API 重新构建
- Chrome 的 Auto-Browse 功能目前仍在，但不确定未来是否会调整

对于构建类似能力的开发者，Project Mariner 的关闭说明：**基于 Chromium 的浏览器自动化 Agent 已经是一个被大厂验证过的场景，后续竞争门槛会快速提高**。

## 我们的判断

这个消息对以下两类人最有参考价值：

**第一，正在构建浏览器 Agent 产品的团队**。Mariner 的关闭路径（实验 → 能力整合 → 项目下线）说明，独立浏览器 Agent 产品的护城河较低，差异化应向上迁移到垂直场景或工作流编排层，而非与平台级产品正面竞争。

**第二，关注 Google AI 产品线演进的决策者**。Google I/O 2026 前夕关闭 Mariner，预示着 Google 的 Agent 战略正在从「多产品并行」向「重点产品聚焦」转变，新发布值得重点关注。
