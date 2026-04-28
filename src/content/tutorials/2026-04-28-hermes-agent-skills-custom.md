---
title: "Hermes Agent 技能自定义：打造专属工作流的实战指南"
description: "Hermes Agent 的 Skills 系统是其最强大的扩展机制。本文介绍如何从零创建自定义技能、接入 Skills Hub 共享，以及利用自改进机制让技能越用越精准。"
pubDate: 2026-04-28 14:30:00
tags: ["Hermes Agent", "Skills", "自定义技能", "Nous Research", "AI Agent"]
category: "skill-dev"
difficulty: "intermediate"
duration: "20分钟"
heroImage: "/images/posts/2026-04-28-hermes-agent-skills-custom/hero.png"
---

## 前言

上篇文章介绍了 Hermes Agent 的安装和首测。如果你已经跑起来，下一步最该研究的就是 **Skills 系统**。

这是 Hermes 区别于其他 Agent 的核心特性——它不是一个固定能力的工具，而是一个能**自己学会新技能**的系统。

本文不讲理论，直接动手：创建一个真实可用的自定义技能，理解自改进机制，并搞清楚什么时候该用 Skills Hub 里的共享技能，什么时候该自己写。

![Hermes Skills 系统架构](/images/posts/2026-04-28-hermes-agent-skills-custom/hero.png)

## 理解 Hermes Skills 的设计思路

大多数 AI 助手的能力是固定的——它能做什么在你开始用它之前就已经决定了。你没法轻易加一个专门处理你们团队代码评审的工作流，也没法加一个针对你们业务术语的优化提示词。

Hermes 的解决方式是把**「技能」变成一等公民**。技能本质上是一段结构化的 Markdown 文件，包含：

- 触发条件（什么情况下调用这个技能）
- 执行步骤（按什么顺序做什么）
- 示例（输入什么、期望输出什么）
- 模板（输出格式）

当 Hermes 发现你反复做某件事，它会自动把这件事封装成技能。下次再做同样的事，它会直接调用技能而不是重新推理。

**这才是「越用越聪明」的技术本质。**

## 第一步：了解 Skills 目录结构

Hermes 的技能文件存在三个目录：

```bash
~/.hermes/skills/
├── installed/   # 从 Skills Hub 安装的共享技能
├── custom/      # 你自己创建的技能
└── learned/     # Hermes 从使用中自动生成的技能
```

刚安装完只有内置技能。随着使用，`learned/` 目录会逐渐多起来。

查看当前所有技能：

```bash
hermes skills list --all
```

按类别搜索：

```bash
hermes skills search --category coding
hermes skills search "debugging"
```

## 第二步：浏览并安装 Skills Hub 共享技能

在 agentskills.io 有一个社区驱动的技能市场。在动手写自己的技能之前，先看看社区有没有现成可用的。

常见的技能类别：

| 类别 | 示例技能 |
|------|---------|
| Coding | pytest-runner, code-reviewer, refactor-assistant |
| Research | paper-summarizer, citation-manager, hypothesis-generator |
| Automation | daily-report, backup-manager, alert-handler |
| Communication | email-drafter, slack-notifier, meeting-summarizer |

安装一个共享技能：

```bash
hermes skills install @nous/research-summarizer
```

更新已安装的技能：

```bash
hermes skills update @nous/research-summarizer
```

发布自己的技能（需要账号）：

```bash
hermes skills publish local:my-utility --name "my-tool"
```

## 第三步：创建你的第一个自定义技能

实战场景：你们团队每次代码评审后需要生成一份简报，包含本次评审的问题列表、修复状态和后续行动项。我们来把这个流程做成技能。

### 启动创建向导

```bash
hermes skills create
```

或者直接手动创建文件：

```bash
nano ~/.hermes/skills/custom/code-review-summary.md
```

### 技能文件的结构

每个技能文件由三部分组成：元数据（frontmatter）、执行步骤（procedure）、示例（examples）和模板（template）。

**完整示例：**

```markdown
---
name: "code-review-summary"
description: "生成代码评审简报，包含问题列表、修复状态和后续行动"
triggers:
  - "code review summary"
  - "评审简报"
  - "/review-summary"
  - "生成评审报告"
---

## Procedure

1. 调用 Git 获取本次评审涉及的 commit 列表
2. 解析评审工具（如 ESLint、SonarQube）的输出结果
3. 按严重程度（critical/major/minor）对问题分类
4. 检索相关的 ticket 系统获取修复状态
5. 汇总为结构化简报

## Examples

Input: "生成代码评审简报，最近 7 天的评审"
Output:
## 代码评审简报 - {date}

### 问题统计
- Critical: 2（均已修复）
- Major: 8（6已修复，2进行中）
- Minor: 15（待处理）

### 待修复问题
1. [AUTH-123] 权限验证逻辑存在条件竞争
2. [API-456] 响应体未做脱敏处理

### 后续行动
- @张三 负责 AUTH-123，截止日期 2026-05-01
- @李四 负责 API-456，联系安全团队确认脱敏规范

## Template

# {project_name} 代码评审简报 - {date}

## 问题统计
{issue_stats}

## 待修复问题
{pending_issues}

## 后续行动
{action_items}

## 评审质量趋势
{trend_chart}
```

### 技能命名规范

| 前缀 | 含义 | 示例 |
|------|------|------|
| `@username/` | 共享技能（需发布到 Hub） | `@nous/daily-report` |
| `local:` | 个人本地技能 | `local:my-review` |
| `learned:` | 自动生成的技能 | `learned:debug-loop` |

**触发词设计原则**：
- 好触发词：`"code review for"`、`"/report"`、`"summarize this paper"`
- 坏触发词：`"review"`（太模糊）、`"help"`（冲突系统命令）、`"do it"`（太泛）

### 测试技能

创建完成后，让 Hermes 识别它：

```bash
hermes skills list --all
```

触发测试：

```bash
hermes
# 输入：生成评审简报
```

如果结果不符合预期，直接告诉它哪里要改：

```
不对，需要加入每个问题的优先级标签
```

Hermes 会自动更新技能的 procedure。

## 自改进机制：技能是怎么变聪明的

这是 Hermes 最有趣的部分，也是最容易误解的部分。

**它不是让模型变聪明，而是让技能的执行路径变精准。**

具体机制：

```
用户触发技能
    ↓
Hermes 加载技能 procedure
    ↓
执行步骤，产生结果
    ↓
用户给出反馈（显式或隐式）
    ↓
Hermes 记录执行结果到记忆层
    ↓
分析成功/失败模式
    ↓
更新技能的 procedure（下次执行更准）
```

举个例子：一个初始的代码评审技能 procedure 可能是：

```
1. 获取评审文件列表
2. 生成评审意见
3. 输出简报
```

执行 10 次之后，如果每次「获取评审文件列表」这一步经常漏掉某些文件，Hermes 会自动把它改成：

```
1. 用 git diff 获取所有变更文件（包括未暂存的）
2. 过滤第三方库文件
3. 按文件类型分组（新增/修改/删除）
4. 生成评审意见
5. 输出简报
```

**这个过程完全自动发生，不需要你干预。**

你唯一需要做的：给它足够多的执行次数。技能越新，自改进空间越大。

## 高级用法：技能组合

当你有多个技能之后，可以设计触发链。

比如：`local:fetch-pr` 负责拉取 PR 信息 → 触发 `local:code-review` 做评审 → 触发 `local:summary-generator` 生成简报。

Hermes 会自动识别技能间的依赖关系，按顺序调用。

查看技能冲突（两个技能用了相似的触发词）：

```bash
hermes skills conflicts
```

禁用冲突的技能：

```bash
hermes skills disable local:old-skill
```

## 常见问题

**Q：技能创建后不触发，是什么原因？**

触发词太接近已有技能，导致优先级冲突。先运行 `hermes skills conflicts` 排查，然后用更独特的触发词。

**Q：技能执行结果质量下降怎么办？**

在对话中直接给出修正反馈，比如：「第二个步骤漏了检查权限，应该先验证调用者身份」。Hermes 会把这个反馈记录并更新到技能 procedure 里。

**Q：该用 Skills Hub 的共享技能还是自己写？**

能用共享技能就别自己写——共享技能往往经过多次迭代优化。自己写的场景主要是：团队内部流程、外部系统对接、专有领域知识。

**Q：learned/ 目录的技能可以编辑吗？**

可以但不建议。learned/ 是 Hermes 自动生成的，直接修改可能与它的推理逻辑冲突。如果效果不好，给它反馈让它自己调整。

**Q：技能文件能同步到另一台机器吗？**

可以。把 `~/.hermes/skills/custom/` 目录同步过去即可。installed/ 需要在新机器上重新安装（依赖 Hub）。learned/ 不建议同步——它包含机器特定的使用模式。

## 总结

Hermes 的 Skills 系统本质上是一套**结构化的知识封装机制**。

- **触发词**定义了什么情况下调用这个技能
- **Procedure** 定义了具体的执行步骤
- **Examples** 提供了输出质量的参照
- **自改进**让执行路径在每次使用后自动优化

对于团队场景，建议先梳理日常工作里重复性最高的三件事，把它们做成技能。日常使用中让 Hermes 自己发现重复模式并生成 learned/ 技能，三个月后你会发现一个完全属于你们团队的工作流系统。

---

**相关阅读**：
- [Hermes Agent 安装配置指南：从零搭建自改进 AI Agent](/tutorials/2026-04-26-hermes-agent-install-guide)
- [15大AI Agent框架横评：编排模式与选型决策树](/reviews/2026-04-28-agent-framework-comparison)
- [Nous Research GitHub](https://github.com/NousResearch/hermes-agent)