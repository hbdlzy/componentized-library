# OutlinedDateTimePicker

`OutlinedDateTimePicker` 是 `OutlinedForm` 系列里的日期时间组合控件，用来统一封装“先选日期，再补时间”的输入壳子、浮动标签、禁用日期规则和实例方法暴露。

## 适用场景

- 页面里经常出现“日期 + 时间”成对输入，但不想每次都重复写两个控件的布局和状态联动
- 需要统一日期时间输入框的浮动标签风格
- 需要基于当前日期限制时间可选范围
- 需要在页面层直接调用日期面板或时间面板的打开方法

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedDateTimePicker, type OutlinedDateTimePickerExpose } from '@hbdlzy/ui'

const pickerRef = ref<OutlinedDateTimePickerExpose | null>(null)
const executeAt = ref('')

const openDatePanel = () => {
  pickerRef.value?.openDatePanel()
}
</script>

<template>
  <OutlinedDateTimePicker
    ref="pickerRef"
    v-model:value="executeAt"
    placeholder="执行日期"
    time-placeholder="执行时间"
    :is-border="true"
    :disabled-date="'nowDate'"
    clearable
  />

  <el-button @click="openDatePanel">
    打开日期面板
  </el-button>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | `v-model:value` 绑定值，格式为 `YYYY-MM-DD HH:mm` |
| `placeholder` | `string` | `''` | 日期部分占位文案，也会作为浮动标签主文案 |
| `label` | `string` | `''` | 自定义浮动标签文案，优先级高于 `placeholder` |
| `inputHeight` | `number` | `40` | 输入框高度 |
| `isBorder` | `boolean` | `false` | 是否启用下边框风格 |
| `disabledDate` | `string \| number \| Date \| ((date: Date) => boolean)` | `undefined` | 日期禁用规则，支持 `nowDate` |
| `separatorText` | `string` | `'-'` | 日期和时间之间的分隔文案 |
| `timePlaceholder` | `string` | `'时间'` | 时间部分占位文案 |
| `clearable` | `boolean` | `false` | 是否允许清空 |
| `marginBottom` | `string \| number` | `20` | 外层下边距 |
| `paddingTop` | `string \| number` | `20` | 外层上内边距，用于浮动标签留白 |

## Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `input` | `string` | 输入值变化时触发 |
| `update:value` | `string` | `v-model:value` 同步事件 |
| `change` | `string` | 日期或时间确认变化后触发 |
| `focus` | `{ field: 'date' \| 'time'; event: FocusEvent }` | 某一侧输入聚焦时触发 |
| `blur` | `{ field: 'date' \| 'time'; event: FocusEvent }` | 某一侧输入失焦时触发 |
| `visible-change` | `{ field: 'date' \| 'time'; visible: boolean }` | 日期面板或时间面板开关变化时触发 |

## Expose

| 方法 | 说明 |
| --- | --- |
| `focusDate()` | 聚焦日期输入 |
| `focusTime()` | 聚焦时间输入 |
| `blurDate()` | 取消日期输入聚焦 |
| `blurTime()` | 取消时间输入聚焦 |
| `openDatePanel()` | 打开日期面板 |
| `openTimePanel()` | 打开时间面板 |
| `getDatePickerRef()` | 获取内部 `el-date-picker` 实例 |
| `getTimePickerRef()` | 获取内部 `el-time-picker` 实例 |

## 设计约束

- 组件内部只处理输入壳子、标签浮层、日期禁用和时间联动，不直接耦合接口、表单校验器或业务规则
- 如果只选了日期但没有选时间，组件会在日期确认时自动补一个当前 `HH:mm`
- 页面层如果需要更复杂的日期时间协议，建议继续在外层包业务组件，不要把业务判断塞回 `ui-core`
