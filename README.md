# Company UI Library

这是一个独立于业务项目之外的前端公共组件库仓库，适合放到 Gitee 或 GitHub 作为公司内部共享源码仓库。

## 仓库目标

- 使用 `pnpm workspace` 管理多包
- 将公共能力拆成 `@hbdlzy/tokens`、`@hbdlzy/ui-core`、`@hbdlzy/ui-energy`
- 同时提供给人看的文档和给 AI 读取的 manifest
- 支持多个业务项目通过 `pnpm` 或 `npm` 统一接入公共包

## 目录结构

```text
company-ui-library/
  apps/
    ui-docs/
  packages/
    tokens/
    ui-core/
    ui-energy/
    ui/
  docs/
  templates/
  library.manifest.json
```

## 快速开始

```bash
pnpm install
pnpm build
pnpm docs:dev
```

## 文档入口

- 组件总汇总：[docs/component-catalog.md](./docs/component-catalog.md)
- AI 读取说明：[docs/ai-consumption-guide.md](./docs/ai-consumption-guide.md)
- 组件编写规范：[docs/component-authoring-guide.md](./docs/component-authoring-guide.md)
- 新项目 AGENTS 模板：[templates/new-project-ai-consumer/AGENTS.md](./templates/new-project-ai-consumer/AGENTS.md)
- 组件作者模板目录：[templates/component-authoring](./templates/component-authoring)
- 安装入口包说明：[packages/ui/README.md](./packages/ui/README.md)
- 安装入口包 AI 指引：[packages/ui/AI-USAGE.md](./packages/ui/AI-USAGE.md)

## AI 使用指令

在新项目中，可以直接对 AI 使用这句固定指令：

```text
本项目使用 @hbdlzy/ui 组件库。开始实现前，请先读取 node_modules/@hbdlzy/ui/AI-USAGE.md，并按其中规则建立组件清单。后续优先复用已有公共组件和工具，新增页面默认从 @hbdlzy/ui 导入。
```

## 推荐安装方式

推荐业务项目优先安装统一入口包：

```bash
npm install @hbdlzy/ui
```

推荐导入方式：

```ts
import { BaseTable, BaseCard, BaseEChart, BaseExportButton, companyTokens, echarts } from '@hbdlzy/ui'
```

## 推荐的分发方式

当前仓库支持三种分发模式：

- `npmjs.com`
  当前推荐方案，适合希望业务项目真正使用短命令安装的团队
- `GitHub Packages`
  适合希望继续走 GitHub 私有或组织包分发的团队
- `Gitee Git + pnpm path`
  适合当前不想引入包仓库时先快速落地

如果你们希望让业务项目安装时不再配置 `.npmrc` 和 token，推荐优先使用 `npmjs.com`。详细说明见：

- [npmjs 发布说明](./docs/publish-with-npmjs.md)
- [npmjs 业务项目模板](./templates/vue-vite-npmjs-consumer)

## 构建命令

```bash
pnpm packages:build
pnpm docs:build
```

## GitHub Packages 本地发布命令

```bash
pnpm publish:github:tokens
pnpm publish:github:ui-core
pnpm publish:github:ui-energy
pnpm publish:github:all
```

## npmjs 本地发布命令

```bash
pnpm publish:npm:tokens
pnpm publish:npm:ui-core
pnpm publish:npm:ui-energy
pnpm publish:npm:ui
pnpm publish:npm:all
```
