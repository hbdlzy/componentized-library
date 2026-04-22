# OutlinedTimePicker

`OutlinedTimePicker` 是 `OutlinedForm` 系列里的时间选择控件，用来统一封装浮动标签、时间范围输入、下边框风格和实例方法暴露。

## 适用场景

- 页面里需要选择单个时间点，比如“开始时间”
- 页面里需要选择时间范围，比如“开始时间 - 结束时间”
- 需要统一时间控件的浮动标签样式
- 需要在页面层直接打开、关闭或清空时间选择面板

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedTimePicker, type OutlinedTimePickerExpose } from '@hbdlzy/ui'

const pickerRef = ref<OutlinedTimePickerExpose | null>(null)
const startTime = ref('')
const periodRange = ref<string[]>([])
</script>

<template>
  <OutlinedTimePicker
    ref="pickerRef"
    v-model:value="startTime"
    placeholder="开始时间"
    :is-border="true"
    clearable
  />

  <OutlinedTimePicker
    v-model:value="periodRange"
    label="执行时段"
    :is-range="true"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :is-border="true"
    clearable
  />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| Date \| Array<string \| number \| Date> \| null` | `''` | `v-model:value` 绑定值 |
| `placeholder` | `string` | `''` | 单值模式占位文案，也会作为浮动标签文案 |
| `label` | `string` | `''` | 自定义浮动标签文案，优先级高于 `placeholder` |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `clearable` | `boolean` | `true` | 是否允许清空 |
| `isRange` | `boolean` | `false` | 是否启用时间范围模式 |
| `startPlaceholder` | `string` | `'开始时间'` | 范围模式开始占位文案 |
| `endPlaceholder` | `string` | `'结束时间'` | 范围模式结束占位文案 |
| `rangeSeparator` | `string` | `'-'` | 范围模式中间分隔符 |
| `format` | `string` | `'HH:mm'` | 展示格式 |
| `valueFormat` | `string` | `format` | 提交值格式 |
| `arrowControl` | `boolean` | `false` | 是否使用箭头切换时间 |
| `inputHeight` | `number` | `40` | 输入框高度 |
| `isBorder` | `boolean` | `false` | 是否启用下边框风格 |
| `marginBottom` | `string \| number` | `20` | 外层下边距 |
| `paddingTop` | `string \| number` | `20` | 外层上内边距，用于浮动标签留白 |

## Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `input` | `OutlinedTimePickerValue \| ''` | 输入值变化时触发 |
| `update:value` | `OutlinedTimePickerValue \| ''` | `v-model:value` 同步事件 |
| `change` | `OutlinedTimePickerValue \| ''` | 选项确认变化时触发 |
| `focus` | `FocusEvent` | 聚焦时触发 |
| `blur` | `FocusEvent` | 失焦时触发 |
| `visible-change` | `boolean` | 面板显隐变化时触发 |
| `clear` | 无 | 清空时触发 |

## Expose

| 方法 | 说明 |
| --- | --- |
| `focus()` | 聚焦时间控件 |
| `blur()` | 取消聚焦 |
| `handleOpen()` | 打开时间面板 |
| `handleClose()` | 关闭时间面板 |
| `clear()` | 清空当前值 |
| `getPickerRef()` | 获取内部 `el-time-picker` 实例 |

## 设计约束

- 组件只负责通用时间选择壳子，不直接耦合业务时段规则、起止合法性判断或接口结构
- 更复杂的业务约束，比如“结束时间必须晚于开始时间”，应由页面层或业务组件负责
- 如果后续某个业务强依赖固定时段模板，建议在业务包里再封一层，不要反向污染 `ui-core`
