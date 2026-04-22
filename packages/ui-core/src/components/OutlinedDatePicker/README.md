# OutlinedDatePicker

`OutlinedDatePicker` 用来统一项目里带浮动标签样式的日期选择器，避免页面层重复写日期控件高度、标签悬浮、日期禁用和焦点控制逻辑。

## 解决的问题

- 统一浮动标签日期选择器样式
- 统一 `v-model:value`、`input`、`update:value` 和 `change` 事件约定
- 统一 `typeDate / format / valueFormat / disabledDate` 配置方式
- 自动处理弹层展开时的焦点态和浮动标签状态
- 通过组件实例直接调用 `focus`、`blur`、`handleOpen`、`handleClose`

## 适用场景

- 页面需要和 `OutlinedInput / OutlinedSelect` 保持一致视觉语言
- 表单页中有大量基础日期或日期时间选择器
- 希望页面只传日期类型和格式配置，不再重复封装统一壳子
- 需要兼容旧项目里的 `disabledDate="nowDate"` 这类写法

## 不适用场景

- 需要复杂日期区间联动逻辑并完全接管弹层行为
- 不是浮动标签风格的时间控件
- 页面需要不同于 Element Plus 的日期引擎或交互模式

## 基础用法

```vue
<template>
  <OutlinedDatePicker
    v-model:value="form.effectDate"
    placeholder="开始生效日期"
    :is-border="true"
    :input-height="40"
    type-date="date"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedDatePicker } from '@hbdlzy/ui-core'

const form = reactive({
  effectDate: ''
})
</script>
```

## 日期时间示例

```vue
<template>
  <OutlinedDatePicker
    v-model:value="form.effectiveTime"
    placeholder="上传收益数据开始生效时间"
    :is-border="true"
    type-date="datetime"
    format="YYYY-MM-DD HH:mm:ss"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedDatePicker } from '@hbdlzy/ui-core'

const form = reactive({
  effectiveTime: ''
})
</script>
```

## 禁用日期示例

```vue
<template>
  <OutlinedDatePicker
    v-model:value="form.effectDate"
    placeholder="开始生效日期"
    type-date="date"
    :disabled-date="'nowDate'"
    :is-border="true"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedDatePicker } from '@hbdlzy/ui-core'

const form = reactive({
  effectDate: ''
})
</script>
```

## Props

- `value`: 当前值，推荐通过 `v-model:value` 使用
- `placeholder`: 占位文案，同时默认作为浮动标签文案
- `label`: 自定义浮动标签文案，未传时回退到 `placeholder`
- `disabled`: 是否禁用
- `timeValue`: 是否按带时间场景处理默认时间
- `typeDate`: 日期控件类型，默认 `date`
- `format`: 展示格式，默认 `YYYY-MM-DD`
- `valueFormat`: 值格式，默认回退到 `format`
- `inputHeight`: 控件高度，默认 `40`
- `isBorder`: 是否启用底部边框样式
- `disabledDate`: 日期禁用规则，支持 `nowDate`、日期字符串、时间戳、`Date` 或函数
- `marginBottom`: 外层容器底部间距，默认 `20`
- `paddingTop`: 外层容器顶部留白，默认 `20`

## Events

- `input`: 值变化时触发
- `update:value`: `v-model:value` 对应更新事件
- `change`: 用户确认变更时触发
- `focus`: 聚焦时触发
- `blur`: 失焦时触发
- `visible-change`: 面板展开状态变化时触发

## Expose

- `focus`: 手动聚焦日期控件
- `blur`: 手动失焦日期控件
- `handleOpen`: 手动打开日期面板
- `handleClose`: 手动关闭日期面板
- `getPickerRef`: 获取底层 `el-date-picker` 实例

## 透传规则

- 未被组件显式声明的属性，会自动透传给内部 `el-date-picker`
- 适合继续传 `clearable`、`editable`、`default-time`、`shortcuts`、`unlink-panels` 等 Element Plus 原生能力

## 推荐约定

- 普通日期和日期时间选择器优先使用 `OutlinedDatePicker`
- 默认通过 `typeDate + format` 收敛常见场景
- 自定义日期禁用规则优先使用 `disabledDate`，不要在页面层重复封装相同逻辑
