---
title: "Dify 部署教程：Docker 本地搭建 AI Agent 平台"
description: "本文详细介绍如何使用 Docker 在本地部署 Dify 平台，从环境准备到第一个 AI Agent 创建，帮助你快速搭建属于自己的 AI 应用开发平台。"
pubDate: 2026-04-26 10:15:00
tags: ["Dify", "Docker", "AI Agent", "部署", "教程"]
category: "setup"
difficulty: "beginner"
duration: "20分钟"
heroImage: "/images/posts/2026-04-26-dify-docker-deploy/hero.png"
---

## 前言

Dify 是一款开源的 LLM（大型语言模型）应用开发平台，支持快速构建 AI Agent、聊天机器人、RAG 应用等。本文将详细介绍如何通过 Docker 在本地部署 Dify，帮助你快速搭建 AI 应用开发环境。

## 前提条件

在开始之前，请确保你的设备满足以下要求：

- **操作系统**：macOS/Linux/Windows（推荐 Linux 或 macOS）
- **内存**：至少 4GB RAM（推荐 8GB 以上）
- **磁盘空间**：至少 20GB 可用空间
- **Docker**：已安装 Docker 和 Docker Compose

### 检查 Docker 环境

```bash
docker --version
docker-compose --version
```

如果未安装，请参考 [Docker 官方安装文档](https://docs.docker.com/get-docker/)。

## 第一步：克隆 Dify 仓库

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
```

## 第二步：配置环境变量

Dify 提供了默认配置文件，可以直接使用：

```bash
cp .env.example .env
```

如果你的机器配置较低，可以修改 `docker-compose.yaml` 中的资源配置。生产环境建议至少 8GB 内存。

## 第三步：启动服务

执行以下命令启动 Dify：

```bash
docker-compose up -d
```

等待所有服务启动完成：

```bash
docker-compose ps
```

正常情况下，你应该看到类似以下输出：

```
NAME                IMAGE               COMMAND                  SERVICE   CREATED   STATUS
dify-api            langgenius/dify…   "/entrypoint.sh"        api       ...       Up
dify-web            langgenius/dify…   "/entrypoint.sh"        web       ...       Up
dify-db             postgres:15-alpine "docker-entrypoint.s…"   db        ...       Up
dify-redis          redis:7-alpine     "docker-entrypoint.s…"   redis     ...       Up
dify-weaviate       semitechnologies… "PYTHONFAULTHANDLER…"   weaviate  ...       Up
```

## 第四步：访问 Dify 控制台

启动成功后，打开浏览器访问：

```
http://localhost:80
```

首次使用需要设置管理员账号：

1. 输入邮箱和密码
2. 完成注册
3. 进入控制台

## 第五步：创建你的第一个 AI Agent

### 1. 创建应用

点击「创建应用」按钮，选择「Agent」类型：

- **应用名称**：My First Agent
- **应用类型**：Agent

### 2. 选择模型

在设置中选择你使用的 LLM 提供商：

| 提供商 | 模型 | 说明 |
|--------|------|------|
| OpenAI | GPT-4 | 效果最佳，需 API Key |
| Claude | Claude 3 | Anthropic 模型 |
| 本地模型 | Llama2/Others | 通过 Ollama 连接 |

### 3. 配置提示词

```markdown
你是一个专业的技术助手。请用简洁清晰的语言回答用户的问题。
如果遇到不确定的内容，请明确告知用户。
```

### 4. 添加工具（可选）

Dify 支持为 Agent 添加多种工具：

- **Google Search**：实时搜索
- **Wikipedia**：百科查询
- **Python REPL**：执行代码
- **自定义工具**：通过 API 连接

### 5. 测试 Agent

在右侧预览窗口输入问题进行测试：

```
你好，请介绍一下你自己
```

## 常见问题

### Q1：启动失败，提示端口被占用？

检查 80 端口是否被占用：

```bash
# Linux/macOS
lsof -i :80

# Windows
netstat -ano | findstr :80
```

修改 `docker-compose.yaml` 中的端口映射解决。

### Q2：API 调用报 403 错误？

检查 `.env` 文件中的 `CONSOLE_WEB` 配置，确保 `CONSOLE_WEB_URL` 和 `CONSOLE_API_URL` 正确配置。

### Q3：如何连接本地模型？

安装 [Ollama](https://ollama.ai/) 后，在 Dify 中添加 Ollama 提供商：

```bash
# 启动 Ollama
ollama serve

# 拉取模型
ollama pull llama2
```

## 验证与测试

部署完成后，可以通过以下方式验证：

1. **健康检查**：访问 `http://localhost:80/api/health`
2. **创建 Agent**：按上述步骤创建并测试
3. **查看日志**：`docker-compose logs -f`

## 下一步学习

- [Dify 工作流使用指南](/)
- [RAG 应用搭建实战](/)
- [Dify 插件开发](/)

## 总结

通过本文，你已掌握 Dify 的本地部署方法，并创建了第一个 AI Agent。Dify 的低代码特性让 AI 应用开发变得简单，更多高级功能（如工作流、RAG、多模型协作）等待你去探索。
