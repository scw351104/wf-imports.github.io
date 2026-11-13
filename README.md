# WF Imports · 官网

极简单页静态站。无构建、无外链、无外部字体，双击 HTML 即可打开。

## 文件

```
index.html                        当前版本 · v1 版式（无衬线海报风）+ 两处首屏调整
assets/wf-imports-logo.png        页面唯一使用的图片（白底，靠 mix-blend-mode:multiply 融进纸色）
assets/reels.png                  产品实拍，当前未使用，也不参与部署
robots.txt                        搜索引擎规则
edgeone.json                      EdgeOne 构建与响应头配置
.github/workflows/deploy-edgeone.yml  手动触发的 EdgeOne 部署（可选，见「部署」）
v1.html / v2.html                 历史版本，已在 .gitignore 中排除，不进仓库
```

## 部署

站点是纯静态的，没有任何构建步骤。EdgeOne 上有两条路，选一条即可。

### 方式 A：EdgeOne 控制台连接 GitHub（推荐，push 即部署）

1. 把仓库推到 GitHub（`main` 分支）。
2. EdgeOne 控制台 → Makers → 新建项目 → 导入 Git 仓库 → 选这个仓库。
3. 框架预设选 **Other / 静态站点**，构建命令与安装命令都留空，输出目录填 `dist`（与 `edgeone.json` 一致，控制台会自动读取该文件）。
4. 部署完成后每次 push 到 `main` 都会自动重新构建发布。

### 方式 B：GitHub Actions 手动部署

仓库里的 `.github/workflows/deploy-edgeone.yml` 是**手动触发**的（`workflow_dispatch`），不会随 push 自动跑，避免和方式 A 重复部署。

- 需要仓库 Secret `EDGEONE_API_TOKEN`（EdgeOne 控制台生成），可选 Variable `EDGEONE_PROJECT`（项目名，默认 `wf-imports`）。
- 只适用于 EdgeOne 中「直接上传」类型的项目；Git 集成项目请用方式 A。
- 在 Actions 页面点 Run workflow，可选 `production` / `preview`。

### 部署内容

`edgeone.json` 的 `buildCommand` 只把 `index.html`、`robots.txt`、`assets/wf-imports-logo.png` 复制进 `dist/`，其余文件（README、历史版本、未使用的图片、`.workbuddy-ai`）不会上线。

`/assets/*` 设了一年强缓存，`index.html` 不缓存，改版后刷新即生效。

## 铁律

**页面正文 = `C:\Users\Chuwei\Desktop\网站.docx` 的正文，逐字一致，共 17 条（205 个词）。**

除首屏右上角那四个导航链接外，不新增任何文案：没有按钮、章节编号、页码、数据统计、页脚、说明文字、表单、跑马灯、装饰图形、图片。文档里的 `Page 1.` ~ `Page 4` 是分页标记，不显示。

**例外一**（2026-11-13 用户明确指定）：首屏右上角导航 `WF Imports` / `Our Service` / `About Us` / `Contact Us`，分别锚到 `#top` / `#service` / `#about` / `#contact`。

**例外二**（2026-11-13 17:31 用户指定）：About 第二段替换为用户提供的新版本，标题 `About US` 改为 `About Us`。当前该段为：

> Our mission is to act as your trusted procurement partner based in Canada, handling end-to-end overseas buying on your behalf. Beyond simple supplier sourcing, we manage full procurement execution for you.

原文拼写保持原样，未经确认不要改：`Bult to Your Specs`、`M2H0A9`。

## 首屏顶栏

```
[logo 124px]                    WF Imports   Our Service   About Us   Contact Us
```

- 结构：`.topbar` 是 flex 两端对齐，左边 `.brand`（logo 同时也是回顶部的链接），右边 `.nav`。
- 导航 13px / `--ink-2`，hover 变铜色并出现 1px 下划线；不设固定定位，滚动时随首屏一起走。
- 锚点：`.s1#top`、`.s2#service`、`.s3#about`、`.s4#contact`；`html{ scroll-behavior:smooth }` 已有，跳转自带平滑滚动。
- 窄屏：`≤560px` logo 84px、导航 11.5px；`≤400px` logo 72px、导航 11px，保证一行放得下。

## 版式：四屏，一屏一页

四个 `section` 对应文档四页：

| # | 类名 | 版式手法 |
| --- | --- | --- |
| 01 | `.s1` | 满屏海报：顶栏（logo 124px + 右上四个导航）→ 痛点句 52px / 行高 1.16 → `Here is your solution.` 52px 铜色，**左对齐**，与痛点句同左轴 |
| 02 | `.s2` | 巨数字：`2M` 154px，单位 `ft` 缩到 0.4em 落在同一基线；7 条资质做单列规格表，细线通栏 |
| 03 | `.s3` | 编辑式双栏：`About Us` 缩成 16px 小标签贴左（滚动吸顶），正文 3 段，首段放大做引文 |
| 04 | `.s4` | 深色收尾：`Contact Us.` 白字 + 地址 + 50px 铜色邮箱 |

### 相对 v1 的改动（仅首屏两处）

| 项 | v1 | 现在 |
| --- | --- | --- |
| `.answer` 对齐 | 右下角，右对齐（与痛点句形成对角） | **左下角，左对齐**，与痛点句同一条左轴 |
| `.answer` 字号 | 38px | **52px**（与痛点句同号，靠铜色区分主次） |
| `.brand img` 宽 | 74px | **`clamp(96px, 8.4vw, 124px)`** |

其余（配色、字号、间距、动效）与 v1 完全一致。

## 动效

- **入场**：首屏元素依次淡入上移（`--i` 控制，70ms 一档）。
- **滚动**：区块进入视口时淡入上移，只播一次（`IntersectionObserver`，`threshold .15`）。
- **规格表**：7 行逐条错开，像打印出来的表格。
- **视差**：首屏文字随页面滚动上移 56px（CSS `animation-timeline: scroll()`，Chrome 支持，其他浏览器自动忽略）。
- **降级**：JS 未执行时 `.js` 类不会挂上，所有内容直接可见；`prefers-reduced-motion` 下全部动画关闭。

## 常见改动位置

| 想改什么 | 改哪里 |
| --- | --- |
| 全站配色 | `:root`：`--paper` / `--ink` / `--ink-2` / `--copper` / `--copper-lit` / `--rule` / `--night` |
| 内容最大宽度 | `.wrap` 的 `max-width`（1280px） |
| 导航项与锚点 | `.nav` 里四个 `<a>`；目标区块的 `id`（`#top` / `#service` / `#about` / `#contact`） |
| 导航字号 | `.nav a` 的 `font-size`（13px）与 `.nav` 的 `gap` |
| 首屏痛点句 | `.poster`（clamp 24→52px）；超过 56px 影响阅读 |
| 铜色那句 | `.answer`（clamp 26→52px）；**与 `.poster` 同号是有意的**，再大就会盖过痛点句 |
| logo 大小 | `.brand img` 的 `width`（clamp 96→124px） |
| 巨数字 | `.num`（clamp 64→154px）；单位大小改 `.unit` 的 `font-size`（0.4em） |
| 规格表 | `.specs li` 的字号与 `padding` |
| About 引文段 | `.prose p:first-child` |
| 邮箱 | `.mail`；收件地址搜 `info@wf-imports.com` |
| 动效快慢 | `.rise` / `.fade` 的 `transition` 时长与 `calc(var(--i) * 70ms)` 的档位 |
| 视差幅度 | `@keyframes hero-drift` 的 `translateY`（-56px） |
| 加 / 改文案 | **先改 docx，再同步页面**；不要只在页面里加 |

## 设计约束

- 单列阅读轴，最大宽度 1280px，靠字号、字重、留白、极细横线建立层级。
- 铜色 `#A8572C` 只出现在 logo、`Here is your solution.`、About 上方那条 26px 短线、深色块里的邮箱。
- 单位永远小于数值（`ft` = 0.4 × `2M`），这是排版常识，不要拉平。
- 无图片、无图标、无渐变、无阴影。
- 响应式：`≤820px` About 双栏塌成单列并取消吸顶；`≤560px` 首屏高度降到 84svh、痛点句取消宽度限制。
