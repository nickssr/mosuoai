---
title: '记忆系统配置指南 - 让 AI 记住上下文'
description: '详解 OpenClaw 记忆系统的配置和使用方法。'
pubDate: 2026-04-20
tags: ['OpenClaw', '记忆系统', '配置']
category: 'memory'
difficulty: 'intermediate'
duration: '45 分钟'
---

## 记忆系统概述

OpenClaw 的记忆系统分为三层：

1. **长期记忆** - 持久化存储
2. **会话记忆** - 单次对话上下文
3. **工作记忆** - 临时数据

## 配置长期记忆

### 1. 创建 MEMORY.md

在项目根目录创建 `MEMORY.md`：

```markdown
# 用户信息

- 姓名：老李
- 角色：AI Agent 开发者
- 时区：Asia/Shanghai

# 项目背景

- 项目名称：MosuoAI
- 技术栈：Astro, TypeScript
- 目标：分享 AI Agent 开发经验
```

### 2. 配置存储后端

```yaml
# config.yaml
memory:
  type: file  # 或 'vector', 'database'
  path: ./memory
  max_entries: 1000
```

## 会话记忆

会话记忆自动管理，无需配置。

## 工作记忆

在 Skill 中使用：

```javascript
// 设置工作记忆
memory.set('current_task', 'processing user request');

// 读取工作记忆
const task = memory.get('current_task');
```

---

## 最佳实践

### 1. 定期清理

```bash
# 清理过期记忆
openclaw memory cleanup --older-than 30d
```

### 2. 分类存储

```
memory/
├── user/
├── project/
└── session/
```

### 3. 敏感数据处理

- 不要存储密码、密钥
- 使用加密存储敏感信息

---

## 故障排查

### 问题：记忆丢失

检查：
1. 存储路径权限
2. 磁盘空间
3. 配置文件格式

---

## 参考资源

- [记忆系统 API 文档](https://docs.openclaw.ai/memory-api)
- [向量数据库配置](https://docs.openclaw.ai/vector-db)
