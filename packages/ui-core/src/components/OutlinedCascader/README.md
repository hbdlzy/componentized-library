# OutlinedCascader

`OutlinedCascader` 是 `OutlinedForm` 系列里的级联选择控件，用来统一封装浮动标签、边框风格、级联面板显隐和实例方法暴露。

## 适用场景

- 页面里经常出现区域、组织、站点树这类级联选择
- 需要统一 `el-cascader` 的浮动标签样式
- 需要在页面层直接打开或关闭级联面板
- 需要统一 `props` 映射、`clearable`、`filterable` 等高频配置

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedCascader, type OutlinedCascaderExpose } from '@hbdlzy/ui'

const cascaderRef = ref<OutlinedCascaderExpose | null>(null)
const areaPath = ref<Array<string | number>>([])

const areaOptions = [
  {
    label: '华北',
    value: 'north',
    children: [
      { label: '北京', value: 'beijing' },
      { label: '天津', value: 'tianjin' }
    ]
  }
]
</script>

<template>
  <OutlinedCascader
    ref="cascaderRef"
    v-model:value="areaPath"
    placeholder="所属区域"
    :options="areaOptions"
    :is-border="true"
    clearable
    filterable
  />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Array<string \| number>` | `[]` | `v-model:value` 绑定值 |
| `options` | `Record<string, unknown>[]` | `[]` | 级联选项数据 |
| `clearable` | `boolean` | `false` | 是否允许清空 |
| `propsValue` | `Record<string, unknown>` | `undefined` | 透传给 `el-cascader` 的 `props` |
| `placeholder` | `string` | `''` | 占位文案，也会作为浮动标签文案 |
| `label` | `string` | `''` | 自定义浮动标签文案，优先级高于 `placeholder` |
| `popperClass` | `string` | `''` | 自定义弹层类名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `inputHeight` | `number` | `40` | 输入框高度 |
| `isBorder` | `boolean` | `false` | 是否启用下边框风格 |
| `filterable` | `boolean` | `true` | 是否允许搜索 |
| `levels` | `boolean` | `true` | 是否展示完整级联路径 |
| `marginBottom` | `string \| number` | `20` | 外层下边距 |
| `paddingTop` | `string \| number` | `20` | 外层上内边距，用于浮动标签留白 |

## Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `input` | `Array<string \| number>` | 输入值变化时触发 |
| `update:value` | `Array<string \| number>` | `v-model:value` 同步事件 |
| `change` | `Array<string \| number>` | 选项确认变化时触发 |
| `focus` | `FocusEvent` | 聚焦时触发 |
| `blur` | `FocusEvent` | 失焦时触发 |
| `visible-change` | `boolean` | 级联面板显隐变化时触发 |

## Expose

| 方法 | 说明 |
| --- | --- |
| `focus()` | 打开级联面板 |
| `blur()` | 关闭级联面板 |
| `togglePopperVisible()` | 切换级联面板显隐 |
| `clear()` | 清空当前值 |
| `getCascaderRef()` | 获取内部 `el-cascader` 实例 |

## 设计约束

- 组件只负责通用级联选择壳子和交互状态，不直接耦合区域接口、组织树接口等业务数据源
- 页面层如果需要多选级联、懒加载或复杂回填逻辑，优先先通过 `propsValue` 和插值配置解决
- 如果业务需要固定某种树结构，可以在业务包里再封一层领域组件，而不是反向污染 `ui-core`
