# Component Authoring Guide

这个文档用于规范后续新增公共组件时的文档、清单和校验流程。

## 目标

- 新增组件时结构一致
- README 可供人直接阅读
- manifest 可供 AI 直接建立组件清单
- 新组件落地后可以快速进入统一入口 `@hbdlzy/ui`

## 推荐流程

1. 在对应包下创建组件目录
2. 复制模板文件
3. 完成组件实现
4. 按模板补 README
5. 在包级 manifest 中登记组件
6. 如果需要统一对外暴露，再更新 `@hbdlzy/ui`
7. 执行构建验证

## 当前模板

- README 模板：[templates/component-authoring/README.template.md](../templates/component-authoring/README.template.md)
- manifest 条目模板：[templates/component-authoring/component-manifest-item.template.json](../templates/component-authoring/component-manifest-item.template.json)
- 新增组件检查清单：[templates/component-authoring/component-checklist.md](../templates/component-authoring/component-checklist.md)

## 新增组件时至少要改的地方

以 `ui-core` 组件为例：

1. 新增组件目录
例如：`packages/ui-core/src/components/YourComponent`

2. 新增组件文档
例如：`packages/ui-core/src/components/YourComponent/README.md`

3. 更新包级导出
例如：`packages/ui-core/src/index.ts`

4. 更新包级 manifest
例如：`packages/ui-core/components.manifest.json`

5. 如果希望业务项目统一从 `@hbdlzy/ui` 导入，还要更新：
- `packages/ui/src/index.ts`
- `packages/ui/package.manifest.json`
- `packages/ui/README.md`

## 命名建议

- 基础组件统一使用 `Base` 前缀
- 业务域组件统一使用领域前缀，例如 `Energy`
- README 文件名统一为 `README.md`
- manifest 中 `name`、`importName`、目录名尽量保持一致

## 文档要求

每个公共组件至少要写清楚：

- 解决的问题
- 适用场景
- 不适用场景
- 基础用法
- Props
- Events
- Expose 或工具导出能力
- 使用约束

## AI 清单要求

每个组件的 manifest 条目至少要包含：

- `name`
- `category`
- `entry`
- `importName`
- `docs`
- `description`
- `props`
- `emits`

## 验证要求

新增组件后至少执行：

```bash
pnpm packages:build
```

如果改了统一入口包，也建议再检查：

```bash
pnpm --filter @hbdlzy/ui build
```
