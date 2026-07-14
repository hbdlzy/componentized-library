# SvgIcon

`SvgIcon` 用来展示 SVG symbol sprite 或外链 SVG，兼容旧项目里 `<svg-icon icon-class="xxx" class-name="xxx" />` 的写法。

## 解决的问题

- 统一 SVG 图标展示入口
- 支持 `#icon-xxx` 形式的 symbol 引用
- 支持 http、data、blob 等外链 SVG 通过 mask 渲染为 `currentColor`
- 自动去掉 `iconClass` 首尾空格，兼容旧模板里误带空格的图标名

## 基础用法

```vue
<template>
  <SvgIcon
    icon-class="filter"
    class-name="table-search-icon"
  />
</template>

<script setup lang="ts">
import { SvgIcon } from '@hbdlzy/ui-core'
</script>
```

上面的写法会渲染 `<use href="#icon-filter" />`。页面或项目需要自行通过 SVG sprite 注入 `symbol id="icon-filter"`。

## 外链 SVG

```vue
<template>
  <SvgIcon
    :icon-class="externalSvgUrl"
    class-name="status-icon"
  />
</template>
```

外链模式会使用 CSS mask 渲染，图标颜色继承父级 `color`。

## Props

- `iconClass`: 图标名或外链 SVG 地址，必填
- `className`: 追加到根节点的类名
- `prefix`: symbol 前缀，默认 `icon`，最终引用为 `#${prefix}-${iconClass}`
- `ariaLabel`: 无障碍标签，未传时图标默认 `aria-hidden="true"`

## 推荐约定

- symbol sprite 的 id 统一使用 `icon-xxx`
- 需要调色时通过父级或 `className` 设置 `color`
- 业务项目如果已经有 `svg-sprite-loader` 或 Vite SVG sprite 插件，可继续复用原有注入方式

## AI 使用指引

AI 在生成图标展示时，如果项目已使用 `@hbdlzy/ui`，应优先使用 `SvgIcon`，不要重复写一套 `svg use` 或外链 SVG mask 组件。

推荐优先从统一入口导入：

```ts
import { SvgIcon } from '@hbdlzy/ui'
```

如果当前只安装了核心包，也可以从 `@hbdlzy/ui-core` 导入。

AI 生成代码时按下面顺序判断：

1. 图标来自 symbol sprite 时，传 `icon-class="xxx"`，默认会引用 `#icon-xxx`
2. 图标前缀不是 `icon` 时，传 `prefix`
3. 图标来自 http、data、blob 等外链时，直接把地址传给 `iconClass`
4. 需要控制大小和颜色时，使用 `className` 或父级 CSS
5. 作为有语义图标时传 `ariaLabel`，纯装饰图标可不传

AI 不应该做这些事：

- 不要在业务页面重复写 `<svg><use /></svg>` 壳子
- 不要为了外链 SVG 再手写 CSS mask 逻辑
- 不要在 `iconClass` 中拼 `#icon-`，组件会根据 `prefix` 自动生成
- 不要把图标颜色写死在组件内，优先通过 CSS `color` 控制

生成代码前建议同时读取：

- `packages/ui-core/components.manifest.json`
- `packages/ui-core/src/components/SvgIcon/SvgIcon.types.ts`
- 本 README 的 `Props / 推荐约定` 部分
