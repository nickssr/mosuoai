---
title: "Nobulex：15 岁少年构建的 AI Agent 加密问责层"
description: "15 岁开发者 Arian Gogani 创建了 Nobulex，一个基于密码学的 AI Agent 行为问责系统。通过声明、强制、证明三个原语，让 AI Agent 能够证明自己遵守了规则。"
pubDate: 2026-04-25 16:00:00
tags: ["AI Agent", "安全", "密码学", "开源", "问责"]
heroImage: "/images/posts/nobulex-ai-agent-accountability/cover.webp"
---

AI Agent 有一个根本问题：它们无法证明自己遵守了规则。

你可以设定权限、写约束、加监控，但最终还是要相信 Agent "真的"执行了你期望的操作。Nobulex 的解决方案是用密码学构建一个不可伪造的问责层。

更有意思的是，这个项目的作者是 15 岁的 Arian Gogani。

## 三个原语

Nobulex 的设计非常简洁，只有三个核心操作：

**Declare（声明）**
写下规则：允许什么、禁止什么、要求什么。

**Enforce（强制）**
在执行前检查每个操作，违规的直接拦截。

**Prove（证明）**
生成防篡改的哈希链证明，任何人都能验证。

## 实际演示

```bash
# Agent A 声明契约：允许读取，禁止转账超过 500
Agent A declares covenant: permit read, forbid transfer > 500

# Agent A 执行 5 个操作
✓ read /data/users — allowed
✓ transfer $300 — allowed
✓ read /data/orders — allowed
✗ transfer $600 — BLOCKED by covenant
✓ read /data/config — allowed

# Agent B 验证 Agent A
✓ Step 1: Covenant signature valid
✓ Step 2: Proof signature valid
✓ Step 3: Log integrity verified (5 entries, chain intact)
✓ Step 4: Compliance check passed (0 violations)
Result: Agent B trusts Agent A ✅

# Agent C 提交篡改的证明
✗ Step 3: FAILED — hash chain broken at entry 2
Result: Agent B refuses Agent C ❌
```

## 为什么这很重要？

在企业环境中，AI Agent 的问责是个严肃问题：

- **合规要求**：金融、医疗等行业需要完整的审计轨迹
- **多 Agent 协作**：一个 Agent 需要验证另一个 Agent 的行为
- **争议仲裁**：出问题时需要不可伪造的证据链

Nobulex 提供的是一种"信任但验证"的机制——你不必完全信任 Agent，只需要验证它的密码学证明。

## 项目状态

项目已在 GitHub 开源，测试覆盖率 73.6%。作者在项目简介中写道："AI agents can't prove they followed their own rules. Nobulex fixes that."

## 相关资源

- [GitHub 仓库](https://github.com/arian-gogani/nobulex)
- [最佳实践认证](https://www.bestpractices.dev/projects/12626)
