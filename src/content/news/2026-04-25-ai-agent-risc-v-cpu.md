---
title: "AI Agent 设计 RISC-V CPU：Verkor.io 实现全流程自动化"
description: "Verkor.io 的代理式 AI 系统从 219 字规格说明出发，自动完成了 RISC-V CPU 的设计与实现，输出可直接用于流片的 GDSII 文件。VerCore CPU 主频 1.5 GHz，性能相当于 2011 年笔记本处理器。"
pubDate: 2026-04-25 14:56:00
tags: ["AI Agent", "RISC-V", "芯片设计", "自动化"]
category: "news"
heroImage: "/images/posts/ai-agent-risc-v-cpu/cover.webp"
---

AI Agent 正在突破芯片设计的最后堡垒。

2026 年 4 月，AI 芯片设计初创公司 Verkor.io 宣布了一项里程碑：其代理式 AI 系统 Design Conductor 从零开始设计了一款完整的 RISC-V CPU 核心，名为 VerCore。这款 CPU 主频达到 1.5 GHz，性能相当于 2011 年的笔记本处理器。

更重要的是，整个设计过程几乎完全自动化——从一个 219 字的规格说明到可直接用于流片的 GDSII 文件。

## 从片段到全局：AI Agent 的设计哲学

这不是 AI 第一次参与芯片设计。2020 年，研究人员微调 GPT-2 设计逻辑电路片段；2023 年，GPT-4 辅助设计了一款 8 位处理器；2024 年，各种大模型已经能设计和测试基础功能芯片。

但 Verkor.io 的做法不同。

"我们学到的是，更好的方法是让 AI Agent 解决整个问题，而不是只做局部优化。"Verkor.io 联合创始人 Suresh Krishna 表示。

## Design Conductor：AI Agent 的"脚手架"

Design Conductor 本身不是 AI 模型，而是一个"脚手架"（harness）——它强迫 AI Agent 按照结构化步骤工作，就像人类芯片架构师团队的工作流程：设计、实现、测试、验证。

系统会管理子 Agent 和相关文件数据库，能够仅凭初始提示词（论文中已公开）自主工作，输出标准的 GDSII 文件，可直接导入现有 EDA 软件。

## 意味着什么？

对于芯片设计行业，这意味着：

- **降低门槛**：中小团队可能不再需要庞大的设计团队
- **加速迭代**：从规格到流片的时间可能大幅缩短
- **标准化输出**：AI 生成的设计遵循工业标准格式

当然，VerCore 的性能还停留在 2011 年水平，距离现代高性能 CPU 还有差距。但这只是开始——代理式 AI 在芯片设计领域的潜力才刚刚展现。

## 相关资源

- [Design Conductor 论文](https://arxiv.org/pdf/2603.08716)
- [IEEE Spectrum 报道](https://spectrum.ieee.org/ai-chip-design)
- [Verkor.io 官网](https://verkor.io/)
