---
title: "Anthropic Project Deal：AI Agent 自主谈判的时代来了"
description: "Anthropic 推出 Project Deal，让 AI Agent 代表员工在分类市场上自主进行买卖谈判。69 名员工参与实验，Agent 成功完成大量交易，部分参与者表示愿意付费使用这类谈判代理服务。"
pubDate: 2026-04-27 08:52:00
tags: ["Anthropic", "AI Agent", "Claude", "谈判", "Project Deal"]
category: "news"
heroImage: "/images/posts/2026-04-27-anthropic-project-deal/hero.png"
---

## 前言

AI Agent 能帮你买咖啡、订机票，但如果让它**全权代表你去做一笔商业交易**，它能做到吗？Anthropic 用 Project Deal 给出了答案。

Anthropic 近日公布了 Project Deal 实验：在旧金山办公室内创建一个分类市场（Craigslist 风格的交易平台），所有买卖谈判全部由 AI Agent 自主完成，人类只设定目标和预算。实验结果令人振奋，也令人深思。

## 实验设计：AI 代替人类做买卖

Anthropic 召集了 69 名员工，每人分配 100 美元「预算」（以礼品卡形式在实验后兑现），参与者可买卖任意物品。

**工作流程如下：**

1. **信息采集**：Claude 以面试形式与每位参与者交流，了解其想要出售的物品、期望价格、想买的商品、预算上限，以及对 Agent 的谈判风格偏好
2. **个性化 Agent**：根据访谈结果，为每位参与者定制专属 Agent 的系统提示词（System Prompt）
3. **自主谈判**：买卖双方 Agent 自行在市场上配对、谈判、达成交易
4. **执行交付**：实验结束后，人类参与者真实履行 Agent 达成的交易

Anthropic 表示：「我们想知道：AI Agent 距离真正代表人类在市场上交易还有多远？不同 AI Agent 之间能否自主谈判并达成令双方满意的结果？」

## 结果：Agent 表现超出预期

实验进行了一周，结果显示：

- **大量交易成功达成**：买卖双方 Agent 完成了预期的商品交换
- **参与者愿意付费**：部分员工表示，如果这类服务面向市场，他们愿意付费让自己的 Agent 代表其进行谈判
- **Agent 间的博弈**：不同能力的模型在谈判中展现出差异，更强的模型往往能获得更有利的结果

Anthropic 总结道：「虽然这是一个仅有自选择参与者的试点实验，但我们相信，Agent 对 Agent 的商业交易很快会在现实世界中出现，并产生真正的影响。」

## 对法律和商业领域的启示

Artificial Lawyer 创始人 Richard Tromans 指出，这一实验对商业法律领域具有深远意义：

当前，AI 在法律行业的应用主要停留在**合同审查**阶段——帮助律师审阅、分析条款。但 Project Deal 指向的下一步是：**两方的 AI Agent 直接谈判并生成合同**，人类律师只在复杂情况下介入。

这意味着未来的 B2B 交易可能是这样的场景：

1. 公司 A 的采购 Agent 与公司 B 的销售 Agent 自主对接
2. 双方 Agent 依据预设的 playbook 和底线进行谈判
3. 谈判结果直接生成合同草案
4. 律师只在关键节点审核把关

## 技术挑战与局限

当然，AI Agent 自主谈判目前仍有障碍：

- **需要双方同时部署 Agent**：单方面部署 Agent 无法形成真正的自动化交易
- **边界界定问题**：Agent 何时该停止谈判、如何定义「谈成了」需要清晰的人为设定
- **准确性风险**：Agent 可能陷入无限循环的谈判，或在细节上犯错

## 对开发者意味着什么

Project Deal 背后的技术架构值得关注：

- **自定义 System Prompt**：为 Agent 注入个人偏好和谈判风格
- **多 Agent 协作**：多个 Agent 在同一市场环境中自主交互
- **结构化输出**：最终生成可执行的交易结果

对于 AI Agent 开发者而言，这种「Agent 对 Agent」的交互模式代表了下一个重要的产品方向——**自主交易 Agent（Autonomous Deal Agents）**。

**相关阅读：**
- [传 OpenAI 正打造 AI Agent 手机：用 AI 替代所有 App](/news/2026-04-27-openai-ai-agent-phone)
