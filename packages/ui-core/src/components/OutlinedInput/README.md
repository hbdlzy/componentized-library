# OutlinedInput

`OutlinedInput` 用来统一项目里带浮动标签样式的输入框，避免页面层重复写输入框高度、标签悬浮、数值校验和实例方法暴露逻辑。

## 解决的问题

- 统一浮动标签输入框样式
- 统一 `v-model:value`、`input`、`update:value` 事件约定
- 统一数值校验和非法输入警告
- 自动透传 `autosize`、`resize`、`rows` 等 `el-input` 原生属性
- 通过组件实例直接调用 `focus`、`blur`、`clear`、`select`

## 适用场景

- 页面需要和现有 `OutlinedSelect / OutlinedDatePicker` 保持一致视觉语言
- 表单页有大量重复的带悬浮标题输入框
- 页面只想传业务字段和少量配置，不想重复写输入框壳子
- 需要兼容旧项目大量 `v-model:value` 的写法

## 不适用场景

- 页面需要完全自定义输入框 DOM 结构
- 只是普通输入框，没有浮动标签需求
- 需要强业务联动校验且不适合在基础组件里收敛

## 基础用法

```vue
<template>
  <OutlinedInput
    v-model:value="form.stationName"
    placeholder="电站名称"
    :is-border="true"
    :input-height="40"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedInput } from '@hbdlzy/ui-core'

const form = reactive({
  stationName: ''
})
</script>
```

## 数值校验示例

```vue
<template>
  <OutlinedInput
    v-model:value="form.capacity"
    placeholder="计划充电量"
    type-input="number"
    :is-number="true"
    :regex="/^(0|[1-9]\\d*)(\\.\\d+)?$/"
    @warning="handleWarning"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { OutlinedInput } from '@hbdlzy/ui-core'

const form = reactive({
  capacity: ''
})

const handleWarning = (value: string) => {
  ElMessage.warning(`输入值不合法：${value}`)
}
</script>
```

## Textarea 示例

```vue
<template>
  <OutlinedInput
    v-model:value="remark"
    placeholder="备注"
    type-input="textarea"
    :is-border="true"
    :autosize="{ minRows: 4, maxRows: 4 }"
    resize="none"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedInput } from '@hbdlzy/ui-core'

const remark = ref('')
</script>
```

## Props

- `value`: 当前输入值，推荐通过 `v-model:value` 使用
- `placeholder`: 输入框占位文案，同时默认作为浮动标签文案
- `label`: 自定义浮动标签文案，未传时回退到 `placeholder`
- `disabled`: 是否禁用
- `regex`: 数值校验正则，仅在 `isNumber` 为 `true` 时生效
- `maxlength`: 最大输入长度
- `max`: 最大值，透传给底层输入框
- `min`: 最小值，透传给底层输入框
- `typeInput`: 输入框类型，默认 `text`
- `showPassword`: 是否显示密码切换按钮
- `isNumber`: 是否启用数值校验模式
- `inputHeight`: 非 textarea 模式下的输入框高度，默认 `40`
- `isBorder`: 是否启用底部边框样式
- `suffixText`: 默认后缀文案
- `clearable`: 是否可清空
- `showWordLimit`: 是否显示字数统计，默认 `true`
- `marginBottom`: 外层容器底部间距，默认 `20`
- `paddingTop`: 外层容器顶部留白，默认 `20`

## Events

- `input`: 输入变化时触发
- `update:value`: `v-model:value` 对应更新事件
- `warning`: 数值校验失败时触发，返回非法输入值
- `focus`: 聚焦时触发
- `blur`: 失焦时触发
- `change`: 值确认变化时触发
- `clear`: 点击清空按钮时触发

## Slots

- `prefix`: 输入框前缀插槽
- `suffix`: 输入框后缀插槽，优先级高于 `suffixText`
- `prepend`: 前置内容插槽
- `append`: 后置内容插槽

## Expose

- `focus`: 手动聚焦输入框
- `blur`: 手动失焦输入框
- `clear`: 手动清空输入框
- `select`: 选中当前输入内容
- `getInputRef`: 获取底层 `el-input` 实例

## 透传规则

- 未被组件显式声明的属性，会自动透传给内部 `el-input`
- 适合继续传 `autosize`、`resize`、`rows`、`readonly` 等 Element Plus 原生能力

## 推荐约定

- 新页面优先使用 `v-model:value`
- 需要浮动标签输入框时优先复用 `OutlinedInput`
- 数值输入优先使用 `isNumber + regex` 收敛基础校验，不要在页面层重复写相同逻辑
