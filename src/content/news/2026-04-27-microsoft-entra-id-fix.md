---
title: "Microsoft Entra ID 修复 Agent ID 权限漏洞：影响所有 AI Agent 部署"
description: "安全公司 Silverfort 发现 Microsoft Entra ID 中针对 AI Agent 的「Agent ID Administrator」角色存在权限边界漏洞，攻击者可借此提升至租户级权限。Microsoft 已完成云端修复，企业需关注本地权限审计。"
pubDate: 2026-04-27 23:00:00
tags: ["Microsoft", "安全", "Entra ID", "AI Agent", "身份管理"]
category: "news"
heroImage: "/images/posts/2026-04-27-microsoft-entra-id-fix/hero.jpg"
---

安全公司 Silverfort 近期披露了一个存在于 Microsoft Entra ID 中的权限漏洞，该漏洞与 Microsoft 力推的 **AI Agent 身份管理平台**直接相关。攻击者利用「Agent ID Administrator」角色的边界模糊，可将权限提升至租户级别，潜在导致企业环境被完全接管。Microsoft 已确认并在所有云环境中完成修复。

## 漏洞是如何产生的

「Agent ID Administrator」是 Microsoft 为 AI Agent 分配的专用角色，属于其 **Agent Identity Platform** 的一部分。该角色本应仅能操作 AI Agent 相关的对象（如蓝图、Agent 身份），但实际作用域未能正确限制在 Agent 范围内。

Silverfort 研究人员在博客中指出：「修复前，Agent ID Administrator 角色允许将所有权分配给超出 Agent 身份的 Service Principal，实际上赋予了类似于 Application Administrator 的能力——但完全没有针对 Agent 使用场景进行作用域限制。」

Service Principal 是应用程序在 Entra ID 中的身份原语。由于 Agent 身份在架构上依赖 Service Principal 构建，「Agent 对象」与「非 Agent 对象」之间的边界未被正确定义，导致角色持有者可以将任意 Service Principal 的所有权转移给自己。

## 权限提升的攻击路径

攻击者获取 Agent ID Administrator 角色后，可以：

1. 接管企业内任意 Service Principal
2. 在这些 Service Principal 上附加凭据
3. 以应用程序身份进行身份验证
4. 操纵企业内部的应用间通信

值得注意的是，同类操作对 Application Object（应用程序对象）是被阻止的，表明这一缺陷是 Service Principal 层特有的问题，而非更广泛的身份模型漏洞。

## 企业需要做什么

Microsoft 表示已在云端完成修复，阻止 Agent ID Administrator 角色修改非 Agent 的 Service Principal。但企业仍需注意：

- **审计现有权限分配**：检查是否已为相关用户分配 Agent ID Administrator 角色
- **遵循最小权限原则**：避免给 Agent 分配超出其实际需求的权限范围
- **关注 Agent 身份管理**：随着 AI Agent 部署规模扩大，身份治理将成为企业安全的核心议题

## 对 AI Agent 部署的影响

随着 AI Agent 在企业环境中承担越来越多的自动化任务，身份与权限管理的重要性急剧上升。此事件也给 Agent 开发者带来警示：**在设计多 Agent 协作系统时，需要从架构层面考虑身份隔离和权限边界**，而非依赖平台层面的默认配置。

AI Agent 的安全风险已经从理论讨论变为实际的运维挑战，企业在推进 Agent 落地时，需要将身份安全纳入核心架构设计。