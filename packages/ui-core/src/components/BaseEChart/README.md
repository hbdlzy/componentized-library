# BaseEChart

`BaseEChart` 用来统一封装项目里重复出现的 ECharts 初始化、更新、尺寸监听和实例销毁逻辑。

## 解决的问题

- 页面只传 `option` 就能渲染图表
- 自动处理 `init`、`setOption`、`resize`、`dispose`
- 容器尺寸变化时自动 `resize`
- 不传 `color` 时自动读取 `sessionStorage.echartsColor`
- 需要手动控制时，可以直接通过组件实例调用 ECharts 方法

## 适用场景

- 大部分常规图表页面
- 希望页面层只维护 `option`
- 需要统一收敛图表的生命周期代码
- 需要在页面层偶尔调用 `resize`、`dispatchAction`、`showLoading`

## 不适用场景

- 需要完全接管图表 DOM 生命周期
- 需要自定义复杂容器交互且不适合组件封装
- 单个页面里要做强定制图表引擎适配

## 基础用法

父容器必须有明确高度。

```vue
<template>
  <div style="height: 320px">
    <BaseEChart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { BaseEChart, echarts, type EChartOption } from '@hbdlzy/ui-core'

const option: EChartOption = {
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['01', '02', '03']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [12, 18, 15],
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(24, 144, 255, 0.35)' },
          { offset: 1, color: 'rgba(24, 144, 255, 0)' }
        ])
      }
    }
  ]
}
</script>
```

## 直接调用实例方法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BaseEChart, type BaseEChartExpose } from '@hbdlzy/ui-core'

const chartRef = ref<BaseEChartExpose | null>(null)

const refreshChart = () => {
  chartRef.value?.resize()
  chartRef.value?.dispatchAction({
    type: 'hideTip'
  })
}
</script>

<template>
  <BaseEChart ref="chartRef" :option="option" />
</template>
```

## 直接调用 echarts 原生能力

```ts
import { echarts } from '@hbdlzy/ui-core'

const gradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#2f88ff' },
  { offset: 1, color: 'rgba(47, 136, 255, 0)' }
])
```

## Props

- `option`: 图表配置，直接透传给 `setOption`
- `theme`: ECharts 主题
- `initOptions`: `echarts.init` 的第三个参数
- `setOptionOptions`: `setOption` 的第二个参数
- `loading`: 是否显示 loading
- `loadingOptions`: loading 配置
- `autoResize`: 是否自动监听尺寸变化并执行 `resize`
- `useDefaultColors`: 当 `option.color` 未传时，是否自动读取默认配色
- `colorStorageKey`: 默认配色的 `sessionStorage` key，默认 `echartsColor`
- `defaultColors`: 默认配色兜底值
- `group`: 图表联动分组

## Events

- `ready`: 图表实例初始化完成时触发，返回 ECharts 实例

## Expose

- `getInstance`: 获取当前 ECharts 实例
- `setOption`: 手动设置 option
- `resize`: 手动触发 resize
- `dispatchAction`: 调用原生 `dispatchAction`
- `showLoading`: 显示 loading
- `hideLoading`: 隐藏 loading
- `clear`: 清空图表
- `dispose`: 销毁图表实例
- `on`: 绑定 ECharts 事件
- `off`: 解绑 ECharts 事件

## 推荐约定

- 页面层只维护 `option`，不要重复写 `echarts.init`
- 默认走 `BaseEChart + option`，只有确实需要时再通过 `ref` 调暴露方法
- 渐变色、图形工具优先从 `@hbdlzy/ui-core` 导出的 `echarts` 使用
