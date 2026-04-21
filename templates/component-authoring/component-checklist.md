# Component Checklist

新增一个公共组件后，请按这个清单自检。

## 目录与实现

- 已创建组件目录
- 已创建组件源码文件
- 已创建 `index.ts`
- 已补齐必要类型文件

## 文档

- 已基于 `README.template.md` 生成组件 README
- README 已写清解决的问题
- README 已写清适用场景和不适用场景
- README 已包含基础示例
- README 已补 Props / Events / Expose

## AI 清单

- 已在包级 manifest 中新增组件条目
- `name`、`importName`、目录名一致
- `docs` 路径可直接定位到 README
- `description` 可让 AI 快速判断组件适用性

## 导出

- 已更新包级 `src/index.ts`
- 如果需要统一从 `@hbdlzy/ui` 导入，已更新：
- `packages/ui/src/index.ts`
- `packages/ui/package.manifest.json`
- `packages/ui/README.md`

## 验证

- 已执行 `pnpm packages:build`
- 如果涉及统一入口包，已确认 `@hbdlzy/ui` 可正常导出
- 新组件没有重复已有公共能力
