# OutlinedSelect

`OutlinedSelect` 用来统一项目里带浮动标签样式的下拉选择框，避免页面层重复写下拉框高度、标签悬浮、值映射和焦点控制逻辑。

## 解决的问题

- 统一浮动标签下拉框样式
- 统一 `v-model:value`、`input`、`update:value` 和 `change` 事件约定
- 统一 `options / keyValue / labelValue` 配置式下拉渲染
- 自动处理弹层展开时的焦点态和浮动标签状态
- 通过组件实例直接调用 `focus`、`blur`、`clear`、`toggleMenu`

## 适用场景

- 页面需要和 `OutlinedInput / OutlinedDatePicker` 保持一致视觉语言
- 表单页里有大量重复的基础下拉框
- 希望页面只传 `options` 和映射字段，不想再重复写 `el-option`
- 需要兼容旧项目里 `key-value / label-value / noCheck` 这类写法

## 不适用场景

- 页面需要完全自定义选择器结构
- 单页中需要强业务联动的复杂远程搜索选择器
- 不是浮动标签风格的下拉框

## 基础用法

```vue
<template>
  <OutlinedSelect
    v-model:value="form.mode"
    placeholder="参与方式"
    :is-border="true"
    :options="modeOptions"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedSelect } from '@hbdlzy/ui-core'

const form = reactive({
  mode: ''
})

const modeOptions = [
  { label: '现货', value: 'spot' },
  { label: '调频', value: 'fm' }
]
</script>
```

## 自定义字段映射示例

```vue
<template>
  <OutlinedSelect
    v-model:value="form.nodeName"
    placeholder="所属节点"
    :options="nodeOptions"
    key-value="nodeName"
    label-value="nodeName"
    :is-border="true"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OutlinedSelect } from '@hbdlzy/ui-core'

const form = reactive({
  nodeName: ''
})

const nodeOptions = [
  { nodeName: '华北节点' },
  { nodeName: '华东节点' }
]
</script>
```

## 多选示例

```vue
<template>
  <OutlinedSelect
    v-model:value="selectedTags"
    placeholder="标签"
    :options="tagOptions"
    multiple
    collapse-tags
    :is-border="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedSelect } from '@hbdlzy/ui-core'

const selectedTags = ref<string[]>([])

const tagOptions = [
  { label: '削峰填谷', value: 'peak' },
  { label: '调频服务', value: 'fm' },
  { label: '收益分析', value: 'income' }
]
</script>
```

## Props

- `value`: 当前值，推荐通过 `v-model:value` 使用
- `options`: 配置式选项列表，默认 `[]`
- `placeholder`: 占位文案，同时默认作为浮动标签文案
- `label`: 自定义浮动标签文案，未传时回退到 `placeholder`
- `disabled`: 是否禁用
- `collapseTags`: 多选时是否折叠标签
- `collapseTagsTooltip`: 折叠标签时是否显示 tooltip
- `filterable`: 是否可搜索，默认 `true`
- `clearable`: 是否可清空，默认 `true`
- `multiple`: 是否多选
- `inputHeight`: 控件高度基准，默认 `40`
- `isBorder`: 是否启用底部边框样式
- `keyValue`: 选项值字段名，默认 `value`
- `labelValue`: 选项显示字段名，默认 `label`
- `noCheck`: 是否只根据焦点控制浮动标签
- `maxCollapseTags`: 折叠标签时最大显示数量，默认 `5`
- `marginBottom`: 外层容器底部间距，默认 `20`
- `paddingTop`: 外层容器顶部留白，默认 `20`

## Events

- `input`: 值变化时触发
- `update:value`: `v-model:value` 对应更新事件
- `change`: 用户确认变更时触发
- `focus`: 聚焦时触发
- `blur`: 失焦时触发
- `visible-change`: 下拉面板展开状态变化时触发
- `clear`: 点击清空按钮时触发

## Slots

- `default`: 完全自定义选项内容
- `empty`: 空状态插槽
- `header`: 下拉头部插槽
- `footer`: 下拉底部插槽
- `tag`: 多选标签插槽

## Expose

- `focus`: 手动聚焦选择器
- `blur`: 手动失焦选择器
- `clear`: 手动清空当前值
- `toggleMenu`: 手动展开或关闭下拉面板
- `getSelectRef`: 获取底层 `el-select` 实例

## 透传规则

- 未被组件显式声明的属性，会自动透传给内部 `el-select`
- 适合继续传 `teleported`、`remote`、`remote-method`、`reserve-keyword` 等 Element Plus 原生能力

## 推荐约定

- 新页面优先使用 `v-model:value`
- 常规下拉优先传 `options`
- 只有需要复杂远程搜索或强定制选项时，才考虑使用 `default` 插槽完全接管
