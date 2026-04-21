# GitHub Packages 发布说明

## 适用目标

如果你们希望业务项目最终能直接使用下面这种短命令：

```bash
npm install @hbdlzy/ui-core
pnpm add @hbdlzy/ui-core
```

那么当前仓库最适合接入的就是 `GitHub Packages`。

## 当前仓库已完成的配置

- 每个可发布包都已补齐 `publishConfig.registry`
- 每个可发布包都已补齐 `repository`
- 根目录已提供 [.npmrc.example](../.npmrc.example)
- 根目录已提供 GitHub Actions 工作流
- 根目录已提供本地发布脚本

## 前提条件

### 1. GitHub 命名空间要与 scope 对齐

当前包名使用的是：

```text
@hbdlzy/tokens
@hbdlzy/ui-core
@hbdlzy/ui-energy
```

这意味着 GitHub 上最好有一个名为 `hbdlzy` 的账号或组织作为发布命名空间。

### 2. 建议仓库名与当前配置一致

当前仓库默认按下面这个 GitHub 地址配置：

```text
https://github.com/hbdlzy/componentized-library.git
```

如果你的 GitHub 组织名或仓库名不是这个，需要同步修改根目录和各包的 `repository` 字段。

## 本地安装与发布认证

根据 GitHub 官方文档，GitHub Packages 的 npm 注册表认证当前仍使用 `personal access token (classic)`。

推荐权限：

- 安装私有包：`read:packages`
- 发布包：`write:packages`
- 如需删除包版本：`delete:packages`

本地 `.npmrc` 示例：

```ini
@hbdlzy:registry=https://npm.pkg.github.com
always-auth=true
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

## 本地发布

先准备环境变量：

```bash
GITHUB_PACKAGES_TOKEN=<your-personal-access-token-classic>
```

然后执行：

```bash
pnpm publish:github:tokens
pnpm publish:github:ui-core
pnpm publish:github:ui-energy
```

如果这次三个包都要发布，可以直接执行：

```bash
pnpm publish:github:all
```

注意：

- 发布前需要先更新包版本号
- 同一个版本号不能重复发布

## 通过 GitHub Actions 发布

仓库中已提供工作流：

- [publish-github-packages.yml](../.github/workflows/publish-github-packages.yml)

工作流支持手动触发，并可选择：

- 只发布 `@hbdlzy/tokens`
- 只发布 `@hbdlzy/ui-core`
- 只发布 `@hbdlzy/ui-energy`
- 一次发布全部

如果仓库已经在 GitHub 上，并且工作流运行在同一个仓库中，工作流默认使用 `GITHUB_TOKEN` 发布到 GitHub Packages。

## 业务项目安装

业务项目根目录放置 `.npmrc`：

```ini
@hbdlzy:registry=https://npm.pkg.github.com
always-auth=true
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

然后就可以使用短命令：

```bash
npm install @hbdlzy/ui-core
npm install @hbdlzy/tokens
```

或者：

```bash
pnpm add @hbdlzy/ui-core
pnpm add @hbdlzy/tokens
```

## 模板

业务项目接入模板已经准备好：

- [templates/vue-vite-github-packages-consumer](../templates/vue-vite-github-packages-consumer)
