# Gitee 与 pnpm 使用说明

## 结论

普通 Gitee 代码仓库适合托管源码，但它本身不是标准 npm registry。

这意味着：

```bash
pnpm add @hbdlzy/ui-core
```

这种“按包名安装”的方式，通常需要一个 npm 兼容的制品仓库来解析包名和版本。

## 如果当前只使用 Gitee

你们现在完全可以只用 Gitee 先落地这套组件库，安装方式改为 Git 依赖即可。

### 安装 `tokens`

```bash
pnpm add "git+ssh://git@gitee.com:hai_long_wang/componentized-library.git#path:/packages/tokens"
```

### 安装 `ui-core`

```bash
pnpm add "git+ssh://git@gitee.com:hai_long_wang/componentized-library.git#path:/packages/ui-core"
```

### 安装 `ui-energy`

```bash
pnpm add "git+ssh://git@gitee.com:hai_long_wang/componentized-library.git#path:/packages/ui-energy"
```

## 使用方式

安装完成后，业务项目中仍然按包名导入：

```ts
import '@hbdlzy/tokens'
import { BaseExportButton } from '@hbdlzy/ui-core'
```

## 什么时候需要 npm 仓库

当你们希望获得下面这些体验时，再引入 npm 兼容仓库更合适：

- 直接执行 `pnpm add @hbdlzy/ui-core`
- 明确的 semver 版本管理
- 更顺手的缓存和锁版本策略
- 更规范的发布流程

## 可选的后续升级

如果后续开通 Gitee 的制品库能力，或者接入其他私有 npm 仓库，可以把当前 monorepo 直接升级为标准包发布模式，而不需要推倒重来。
