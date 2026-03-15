# AI Token Tools

一个面向 AI 开发者的免费工具网站，提供常用的 AI 开发辅助工具。

## 技术栈

- **Next.js 14** (App Router)
- **TypeScript**
- **React**
- **TailwindCSS**
- **SEO 友好**
- **Cloudflare Pages 部署就绪**

## 项目结构

```
ai-token-tools/
├── app/
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 首页
│   ├── globals.css             # 全局样式
│   ├── tools/
│   │   ├── page.tsx            # 工具列表页
│   │   ├── token-calculator/   # Token 计算器
│   │   ├── token-cost-calculator/  # Token 成本计算器
│   │   ├── tokenizer-viewer/   # Tokenizer 可视化
│   │   ├── prompt-formatter/   # Prompt 格式化工具
│   │   ├── prompt-diff/        # Prompt 对比工具
│   │   ├── model-price-comparison/  # 模型价格对比
│   │   └── context-length-checker/  # 上下文长度检查器
├── components/
│   ├── Header.tsx              # 页头组件
│   ├── Footer.tsx              # 页脚组件
│   ├── ToolCard.tsx            # 工具卡片组件
│   ├── ToolLayout.tsx          # 工具页面布局
│   ├── TokenInput.tsx          # Token 输入组件
│   └── TokenResult.tsx         # Token 结果展示组件
├── lib/
│   ├── tokenizer.ts            # Token 计算逻辑
│   ├── costCalculator.ts       # 成本计算逻辑
│   └── utils.ts                # 通用工具函数
├── data/
│   └── models.json             # AI 模型数据
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## 功能列表

### 1. Token Calculator
- 路径：`/tools/token-calculator`
- 功能：估算文本的 Token 数量
- 支持中英文混合计算

### 2. Token Cost Calculator
- 路径：`/tools/token-cost-calculator`
- 功能：根据 Token 数量和模型计算 API 调用成本
- 支持多个 AI 提供商的模型

### 3. Tokenizer Viewer
- 路径：`/tools/tokenizer-viewer`
- 功能：可视化展示文本如何被切分成 Token
- 支持字符级和高亮显示

### 4. Prompt Formatter
- 路径：`/tools/prompt-formatter`
- 功能：格式化 Prompt，支持 system/user/assistant 结构
- 支持 XML 和 JSON 输出格式

### 5. Prompt Diff Tool
- 路径：`/tools/prompt-diff`
- 功能：比较两个 Prompt 的差异
- 高亮显示添加、删除的内容

### 6. AI Model Price Comparison
- 路径：`/tools/model-price-comparison`
- 功能：展示各 AI 模型的价格对比
- 包含 OpenAI、Anthropic、Google 等主流模型

### 7. Context Length Checker
- 路径：`/tools/context-length-checker`
- 功能：检测 Prompt 是否超过模型上下文限制
- 可视化展示各模型的兼容性

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 启动生产服务器
npm start
```

## 部署到 Cloudflare Pages

1. 在 Cloudflare Dashboard 创建新 Pages 项目
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 添加环境变量（如需要）
5. 部署

## SEO 优化

每个工具页面都包含：
- Meta title 和 description
- 语义化 HTML 结构（h1, h2, h3）
- 详细的工具说明
- FAQ 部分（利于 Google AdSense）
- Open Graph 标签
- 响应式设计

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License
