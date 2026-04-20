# MosuoAI 主题需求规格说明书

**项目路径：** `/root/.openclaw/workspace-coder/projects/mosuoai/`
**Astro 版本：** v6.1.8（按 v6 API 实现）
**部署：** Cloudflare Pages

---

## 一、设计系统

### 1.1 色彩系统（CSS 变量）

在 `src/styles/variables.css` 中定义：

```css
:root {
  /* 背景色 */
  --color-bg-primary: #0a0e14;
  --color-bg-secondary: #111827;
  --color-bg-tertiary: #1f2937;
  --color-bg-glass: rgba(17, 24, 39, 0.8);
  
  /* 文字色 */
  --color-text-primary: #f9fafb;
  --color-text-secondary: #9ca3af;
  --color-text-muted: #6b7280;
  
  /* 边框 */
  --color-border: #374151;
  --color-border-light: #4b5563;
  
  /* 品牌主色 - 科技青色 */
  --color-primary: #00d4e0;
  --color-primary-dark: #00b4c0;
  --color-primary-glow: rgba(0, 212, 224, 0.3);
  
  /* 强调色 - 紫罗兰 */
  --color-accent: #8b5cf6;
  --color-accent-glow: rgba(139, 92, 246, 0.3);
  
  /* 功能色 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* 字体 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --font-serif: 'Georgia', 'Times New Roman', serif;
  
  /* 间距 (4px 倍数) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-glow-primary: 0 0 20px var(--color-primary-glow);
  --shadow-glow-accent: 0 0 20px var(--color-accent-glow);
  
  /* 过渡 */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}

/* 响应式断点 */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */
```

### 1.2 字体引入

通过 Google Fonts 引入：
- Inter (400, 500, 600, 700)
- JetBrains Mono (400, 500)

---

## 二、全局布局

### 2.1 BaseLayout.astro

位置：`src/layouts/BaseLayout.astro`

功能：
- 接收 title, description, image, article props
- 包含 HTML 结构、SEO 组件、Header、Footer
- main 最大宽度 1280px，水平居中

### 2.2 Header.astro

位置：`src/components/Header.astro`

需求：
- 玻璃拟态效果（半透明 + backdrop-filter blur）
- sticky 定位
- Logo（🤖 + MosuoAI 文字）
- 导航：教程、评测、案例、资源
- 移动端汉堡菜单

### 2.3 Footer.astro

位置：`src/components/Footer.astro`

内容：
- 版权信息
- 关于、RSS、Sitemap 链接

---

## 三、Content Collections

位置：`src/content.config.ts`

Schema 字段：
- title (string, required)
- description (string, required)
- pubDate (Date, required)
- updatedDate (Date, optional)
- heroImage (string, optional)
- tags (string[], optional)
- category (enum: tutorial|review|case-study|news)
- difficulty (enum: beginner|intermediate|advanced)
- draft (boolean, default false)
- noindex (boolean, default false)

---

## 四、首页

位置：`src/pages/index.astro`

结构：
1. Hero 区（站点名 + 价值主张）
2. Bento 网格文章列表
   - 最新文章大卡片（跨列）
   - 其余小卡片
3. 侧边栏（作者卡片、热门文章、标签云）

---

## 五、文章详情页

位置：`src/pages/posts/[...slug].astro`

结构：
1. 文章头部（标题、元数据、特色图）
2. 目录（TOC，桌面端固定右侧）
3. 正文排版
4. 标签、上一篇/下一篇、相关文章

---

## 六、交互组件

### 6.1 代码高亮

使用 Expressive Code 或 Shiki，支持：
- 文件名/语言显示
- 复制按钮
- 横向滚动
- 行高亮
- 行号

### 6.2 Terminal.astro

模拟终端样式：
- 黑色背景
- 等宽字体
- macOS 三色圆点

### 6.3 Callout 组件

四种类型：Info, Warning, Success, Error

---

## 七、SEO 与性能

### 7.1 SEO.astro

输出：
- 基础 meta 标签
- Open Graph
- Twitter Card
- JSON-LD 结构化数据

### 7.2 Sitemap 与 RSS

- /sitemap.xml
- /rss.xml

---

## 八、路由结构

| 路由 | 功能 |
|------|------|
| / | 首页 |
| /posts/[slug] | 文章详情 |
| /tags/[tag] | 标签聚合 |
| /about | 关于页 |
| /rss.xml | RSS Feed |
| /sitemap.xml | 站点地图 |

---

## 九、功能预留

- 评论区域：`<div id="comments">`
- 搜索框：Header 预留位置
- 主题切换：按钮预留（data-theme 切换）

---

## 实现顺序

1. **Phase 1**: 设计系统（variables.css + 字体）
2. **Phase 2**: 全局布局（BaseLayout + Header + Footer + SEO）
3. **Phase 3**: Content Collections 配置
4. **Phase 4**: 首页（Hero + Bento 网格）
5. **Phase 5**: 文章详情页
6. **Phase 6**: 交互组件（代码高亮、Terminal、Callout）
7. **Phase 7**: SEO 优化（sitemap + rss）
8. **Phase 8**: 功能预留

---

**注意：所有代码按 Astro v6 API 实现！**
