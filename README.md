# Company UI Library

这是一个独立于业务项目之外的前端公共组件库仓库，适合放到 Gitee 作为公司内部共享源码仓库。

## 仓库目标

- 使用 `pnpm workspace` 管理多包
- 将公共能力拆成 `@hbdlzy/tokens`、`@hbdlzy/ui-core`、`@hbdlzy/ui-energy`
- 同时提供给人看的文档和给 AI 读取的 manifest
- 支持多个业务项目通过 `pnpm` 统一接入公共包

## 目录结构

```text
company-ui-library/
  apps/
    ui-docs/
  packages/
    tokens/
    ui-core/
    ui-energy/
  docs/
  library.manifest.json
```

## 快速开始

```bash
pnpm install
pnpm build
pnpm docs:dev
```

## 推荐的分发方式

当前仓库支持两种分发模式：

- `GitHub Packages`
  适合希望使用短命令安装的团队，例如 `npm install @hbdlzy/ui-core`
- `Gitee Git + pnpm path`
  适合当前不想引入 npm 兼容仓库时先快速落地

如果你们希望让业务项目用最短命令安装，推荐优先使用 GitHub Packages。详细说明见：

- [GitHub Packages 发布说明](./docs/publish-with-github-packages.md)
- [GitHub Packages 业务项目模板](./templates/vue-vite-github-packages-consumer)

## 仅使用 Gitee 时怎么安装

普通 Gitee Git 仓库本身不是 npm registry，所以不能直接把下面这种命令当成“只靠 Gitee 就能成功”的默认方案：

```bash
pnpm add @hbdlzy/ui-core
```

如果当前阶段只想依赖 Gitee 源码仓库，也可以直接通过 Git 子目录安装：

```bash
pnpm add "git+ssh://git@gitee.com:hai_long_wang/componentized-library.git#path:/packages/tokens"
pnpm add "git+ssh://git@gitee.com:hai_long_wang/componentized-library.git#path:/packages/ui-core"
```

这样做的优点是马上可用，不需要额外部署私有 registry；代价是版本管理、缓存策略和团队统一升级体验不如 npm registry 模式顺手。

## 推荐的团队接入方式

不建议团队成员每次都手敲很长的 `pnpm add` 命令，推荐直接复用这里的模板：

- 模板目录：[templates/vue-vite-gitee-consumer](./templates/vue-vite-gitee-consumer)
- 模板文件：[package.json](./templates/vue-vite-gitee-consumer/package.json)

做法是把模板里的公共依赖合并到业务项目自己的 `package.json`，然后直接执行：

```bash
pnpm install
```

## 推荐演进路线

1. 当前阶段：源码放在 Gitee，通过 Git 依赖安装和维护。
2. 推荐阶段：同步到 GitHub，使用 GitHub Packages 发布并安装。
3. 后续阶段：如果公司开通更适合内部治理的 npm 兼容仓库，再平滑迁移。

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
