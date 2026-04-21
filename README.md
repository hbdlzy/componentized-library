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

## 推荐演进路线

1. 当前阶段：源码放在 Gitee，通过 Git 依赖安装和维护。
2. 后续阶段：如果公司开通 Gitee 制品库或其他 npm 兼容仓库，再切换为 `pnpm add @hbdlzy/ui-core` 这种包名安装模式。

## 构建命令

```bash
pnpm packages:build
pnpm docs:build
```
