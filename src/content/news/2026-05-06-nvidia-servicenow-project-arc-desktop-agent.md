---
title: "Nvidia与ServiceNow联合发布Project Arc：企业级桌面AI Agent"
description: "在Knowledge 2026大会上，ServiceNow与Nvidia联合推出Project Arc——一款基于NVIDIA OpenShell安全运行时的企业自主桌面Agent，托管在员工桌面上，可自主完成复杂工作任务，并受ServiceNow AI Control Tower统一治理。"
pubDate: 2026-05-06 23:10:08
tags: ["Nvidia", "ServiceNow", "Project Arc", "桌面AI Agent", "企业AI", "OpenShell"]
category: "news"
heroImage: "/og-default.svg"
---

OpenClaw让桌面AI Agent在个人用户中流行，而企业版终于来了。

## Project Arc是什么

在5月5日举行的Knowledge 2026大会上，ServiceNow与Nvidia联合发布了**Project Arc**，这是一款企业级自主桌面Agent，核心特点：

- **桌面本地运行**：部署在员工桌面上，而非云端，可直接访问用户本地的文件、应用和工具
- **NVIDIA OpenShell安全运行时**：由Nvidia提供底层安全保护
- **ServiceNow AI Control Tower治理**：所有Agent行为受企业统一管控

该产品与OpenClaw的定位相似，但面向企业场景，强调安全性和合规性。

## 为什么要做桌面Agent

云端AI Agent有一个天然限制：无法直接访问用户本地内容。桌面Agent的优势在于**对用户工作环境有完整访问权限**，可以操作本地文件、使用桌面应用程序、访问局域网资源。

ServiceNow认为，在企业环境中，AI Agent需要「看到」员工的完整数字工作空间——包括本地文档、浏览器标签页、内部系统——才能真正替代人工操作繁琐的工作流程。

## 技术架构解析

Project Arc的技术栈分为三层：

**第一层：NVIDIA OpenShell运行时**
OpenShell是Nvidia为企业AI Agent推出的安全执行环境，提供应用隔离、权限控制和操作审计能力。Project Arc中所有Agent执行动作都在OpenShell容器内完成，防止越权操作。

**第二层：ServiceNow AI Control Tower**
这是ServiceNow的企业AI治理平台，负责策略下发、权限审批和操作记录。AI Control Tower此前已内置于ServiceNow平台，本次升级后将治理能力延伸到了桌面Agent层。

**第三层：桌面Agent执行层**
运行在员工桌面上的轻量Agent进程，负责接收指令、调用本地工具、执行任务。

## 我们怎么看

Project Arc的意义在于将OpenClaw的「桌面Agent」理念企业化了。云端Agent的优势是集中管理、易于监控，但企业用户在安全合规和数据主权上有严格要求——这正是Project Arc要解决的问题。

NVIDIA OpenShell与ServiceNow Control Tower的组合，解决了两个核心问题：**运行时安全**和**运营治理**。这是目前市场上其他桌面Agent方案所缺乏的。

**我们的判断**：对于已经在使用ServiceNow平台的企业，Project Arc是最值得评估的桌面AI Agent方案。它不需要改变现有的IT治理架构，可以直接嵌入现有的Control Tower体系。如果你关心企业AI Agent的安全合规路径，这条新闻值得关注。
