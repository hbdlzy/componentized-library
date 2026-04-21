# BaseCard

`BaseCard` 用来统一封装项目里反复出现的卡片容器、标题区、右侧信息区和导出触发区，避免页面层重复写相同的布局和样式代码。

## 解决的问题

- 页面只传标题和内容就能得到统一卡片样式
- 内聚边框、背景、圆角、阴影，不再依赖业务项目里的全局 `.border-card`
- 标题左侧竖杠、标题颜色、右侧信息、导出按钮都可以直接配置
- 左右两侧都支持插槽扩展，复杂场景不用回退到重复写结构

## 适用场景

- 看板类页面里的统计卡片、图表卡片、列表卡片
- 需要统一标题区布局和风格的容器组件
- 标题右侧要放时间、按钮、筛选器、单选框的场景
- 希望把“卡片壳子”从业务组件里抽出来统一复用

## 不适用场景

- 页面需要完全脱离统一卡片风格
- 整个容器结构与标题区布局都要做高度定制
- 只是简单边框盒子，不需要标题区、插槽区和统一视觉规范

## 基础用法

```vue
<template>
  <BaseCard title="今日收益趋势">
    <div style="height: 320px">这里放图表或其他内容</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { BaseCard } from '@hbdlzy/ui-core'
</script>
```

## 带右侧信息和导出按钮

```vue
<template>
  <BaseCard
    title="收益数据"
    meta-text="2026-04-21 10:30"
    show-export
    :export-payload="{ url: '/report/export' }"
    @export="handleExport"
  >
    <div>内容区域</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { BaseCard } from '@hbdlzy/ui-core'

const handleExport = (payload?: unknown) => {
  console.log('export payload', payload)
}
</script>
```

## 标题区扩展

`title` 插槽会出现在左侧标题后面，适合放筛选器、单选框、标签等内容。`header-right` 插槽会出现在右侧信息区里，适合放按钮或自定义操作。

```vue
<template>
  <BaseCard title="市场信息" meta-text="实时更新">
    <template #title>
      <el-radio-group v-model="tabValue">
        <el-radio-button label="日内" />
        <el-radio-button label="周内" />
      </el-radio-group>
    </template>

    <template #header-right>
      <el-button text>刷新</el-button>
    </template>

    <template #tip>
      <div style="text-align: right; color: #808080">单位：万元</div>
    </template>

    <div>内容区域</div>
  </BaseCard>
</template>
```

## 配置样式

```vue
<BaseCard
  title="自定义样式"
  marker-color="#23c343"
  marker-height="20px"
  title-color="#ffffff"
  border-color="rgba(35, 195, 67, 0.35)"
  background-color="rgba(5, 18, 35, 0.9)"
  :padding="24"
>
  <div>内容区域</div>
</BaseCard>
```

## Props

- `title`: 标题文本
- `metaText`: 右侧信息文本，常用于时间、更新时间、单位等
- `showHeader`: 是否显示标题区
- `showRight`: 是否显示右侧容器
- `showTitleMarker`: 是否显示标题左侧竖杠
- `showExport`: 是否显示内置导出按钮
- `exportText`: 导出按钮文案，默认 `导出`
- `exportDisabled`: 是否禁用导出按钮
- `exportPayload`: 点击导出时回传的自定义载荷
- `padding`: 卡片内边距
- `radius`: 卡片圆角
- `borderColor`: 卡片边框颜色
- `backgroundColor`: 卡片背景色
- `shadowColor`: 卡片阴影颜色
- `headerGap`: 标题区左右块之间的间距
- `headerMarginBottom`: 标题区和内容区之间的间距
- `leftGap`: 左侧标题块和扩展插槽之间的间距
- `rightGap`: 右侧内容之间的间距
- `titleColor`: 标题颜色
- `titleSize`: 标题字号
- `titleWeight`: 标题字重
- `markerColor`: 标题左侧竖杠颜色
- `markerWidth`: 标题左侧竖杠宽度
- `markerHeight`: 标题左侧竖杠高度
- `markerRadius`: 标题左侧竖杠圆角
- `markerGap`: 标题左侧竖杠和标题的间距
- `metaColor`: 右侧信息文字颜色
- `metaSize`: 右侧信息文字字号
- `exportColor`: 导出按钮颜色

## Slots

- 默认插槽：卡片主体内容
- `title`: 左侧标题后的扩展区域
- `title-label`: 自定义标题内容，会替代默认标题文本
- `header-right`: 右侧操作区扩展
- `tip`: 内容区顶部提示信息

## Events

- `export`: 点击内置导出按钮时触发

如果未传 `exportPayload`，默认会返回：

```ts
{
  title?: string
  metaText?: string
}
```

## 推荐约定

- 页面层优先把统计块、图表块、列表块统一包在 `BaseCard` 里
- 只要不是强业务容器，就尽量不要在页面层重复写卡片壳子
- 简单场景直接用 `title + 默认插槽`
- 需要扩展时优先使用 `title` 和 `header-right` 插槽，而不是复制组件结构
