---
title: "Meta 扩展与 AWS 合作：数十万核心 Graviton 芯片驱动 Agentic AI"
description: "Meta 与 AWS 签署协议，将部署数十万核心 AWS Graviton 处理器驱动 Agentic AI 工作负载。Graviton5 芯片专为代码生成、实时推理、多步骤任务编排等 CPU 密集型工作设计，Meta 成为全球最大 Graviton 客户之一。"
pubDate: 2026-04-25
tags: ["Meta", "AWS", "Graviton", "Agentic AI", "芯片"]
category: "news"
heroImage: "/images/posts/meta-aws-graviton-agentic-ai/cover.webp"
---

2026 年 4 月 25 日，Meta 与 AWS 签署重要协议，将大规模部署 AWS Graviton 处理器驱动其下一代 AI 工作负载。这标志着两家公司长期合作关系的重大扩展。

## 核心数据

- **部署规模**：数十万 Graviton 核心，未来可进一步扩展
- **客户地位**：Meta 成为全球最大 Graviton 客户之一
- **技术基础**：基于 Meta 此前在 Amazon Bedrock 上的大规模应用

## 为什么是 Graviton？

Meta 选择了 Graviton 而不是传统 GPU 集群来驱动 Agentic AI 工作负载，这不是偶然的。

传统观念认为 AI 训练必须依赖 GPU，但 Agentic AI 的工作负载分布正在改变这一认知：

- **代码生成**：CPU 密集型，适合 Graviton
- **实时推理**：需要高吞吐量和低延迟
- **多步骤任务编排**：需要协调大量并发请求

Graviton5 芯片规格：
- **192 核心**
- **缓存是上一代的 5 倍**
- **核心间通信延迟降低 33%**

## Agentic AI 的基础设施革命

AWS 副总裁 Nafea Bshara 表示：

> "这不仅仅关乎芯片，而是为客户提供构建 AI 的基础设施基础、数据和推理服务，让 AI 能够理解、预测并高效扩展至数十亿人。"

Meta 基础设施负责人此前提到：

> "随着我们扩展 Meta AI 背后的基础设施，Graviton 使我们能够高效运行各种工作负载，从训读到推理。"

## 行业意义

这个协议反映了 AI 基础设施的三个趋势：

1. **CPU 复兴**：Agentic AI 工作负载对 CPU 的需求正在被重新认识
2. **成本优化**：Graviton 提供比传统方案更好的性价比
3. **垂直整合**：芯片、框架、云服务的一体化设计

## 相关资源

- [AWS Graviton 官网](https://aws.amazon.com/ec2/graviton/)
- [AWS Nitro System](https://aws.amazon.com/ec2/nitro/)
- [Meta AI 官方公告](https://www.aboutamazon.com/news/aws/meta-aws-graviton-ai-partnership)