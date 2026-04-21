# npmjs 发布说明

## 适用目标

如果你们希望业务项目真正做到下面这种最短安装方式：

```bash
npm install @hbdlzy/ui
```

那么当前仓库最适合接入的就是 `npmjs.com`。

## 当前仓库已完成的配置

- 三个可发布包都已切换到 `registry.npmjs.org`
- 三个可发布包都已切换为 `public` 发布
- 已提供统一入口包 `@hbdlzy/ui`
- 根目录已提供 [.npmrc.example](../.npmrc.example)
- 根目录已提供 npmjs 本地发布脚本
- 根目录已提供 npmjs 业务项目模板

## 前提条件

### 1. npm 用户名与 scope 对齐

当前包名使用的是：

```text
@hbdlzy/tokens
@hbdlzy/ui-core
@hbdlzy/ui-energy
@hbdlzy/ui
```

这要求你当前 npm 账号或组织确实拥有 `hbdlzy` 这个 scope。

### 2. 同一个版本号不能重复发布

当前版本是 `0.1.0`。

如果曾经成功发布过同名同版本包，后续再次发布会失败，这时需要先修改版本号。

## 本地发布认证

推荐方式有两种：

### 方式一：npm login

```bash
npm login
```

### 方式二：使用 token

根目录 `.npmrc` 可参考：

```ini
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

## 本地发布

先准备环境变量：

```bash
NPM_TOKEN=<your-npm-access-token>
```

然后执行：

```bash
pnpm publish:npm:tokens
pnpm publish:npm:ui-core
pnpm publish:npm:ui-energy
pnpm publish:npm:ui
```

如果这次三个包都要发布，可以直接执行：

```bash
pnpm publish:npm:all
```

## 业务项目安装

发布成功后，业务项目可直接安装：

```bash
npm install @hbdlzy/ui
```

如果你们仍然希望分包安装，也可以：

```bash
npm install @hbdlzy/tokens
npm install @hbdlzy/ui-core
npm install @hbdlzy/ui-energy
```

## Jenkins

如果包已经是公开包，Jenkins 直接 `npm install` 或 `pnpm install` 即可，不再依赖私有 registry token。

## 模板

业务项目接入模板已经准备好：

- [templates/vue-vite-npmjs-consumer](../templates/vue-vite-npmjs-consumer)
