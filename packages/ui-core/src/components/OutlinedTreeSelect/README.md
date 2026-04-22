# OutlinedTreeSelect

`OutlinedTreeSelect` 是 `OutlinedForm` 系列里的树形下拉选择控件，用来统一封装浮动标签、树节点字段映射、树面板显隐和常用树选择参数。

## 适用场景

- 页面里需要在下拉框中选择组织树、区域树、节点树
- 需要统一 `el-tree-select` 的浮动标签样式
- 需要兼容自定义节点字段，比如 `id`、`name`、`children`
- 需要直接在页面层调用聚焦、清空等实例方法

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { OutlinedTreeSelect, type OutlinedTreeSelectExpose } from '@hbdlzy/ui'

const treeSelectRef = ref<OutlinedTreeSelectExpose | null>(null)
const parentId = ref('')

const treeData = [
  {
    id: 'north',
    name: '华北',
    children: [
      { id: 'beijing', name: '北京节点' },
      { id: 'tianjin', name: '天津节点' }
    ]
  }
]
</script>

<template>
  <OutlinedTreeSelect
    ref="treeSelectRef"
    v-model:value="parentId"
    placeholder="选择父节点"
    :data="treeData"
    :props-value="{ value: 'id', label: 'name', children: 'children' }"
    :check-strictly="true"
    :is-border="true"
    clearable
    filterable
  />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean \| object \| Array<...>` | `undefined` | `v-model:value` 绑定值 |
| `data` | `OutlinedTreeSelectNode[]` | `[]` | 树节点数据 |
| `propsValue` | `Record<string, unknown>` | `undefined` | 透传给 `el-tree-select` 的 `props` |
| `placeholder` | `string` | `''` | 占位文案，也会作为浮动标签文案 |
| `label` | `string` | `''` | 自定义浮动标签文案，优先级高于 `placeholder` |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `clearable` | `boolean` | `true` | 是否允许清空 |
| `filterable` | `boolean` | `true` | 是否允许搜索 |
| `multiple` | `boolean` | `false` | 是否多选 |
| `showCheckbox` | `boolean` | `false` | 是否显示树节点勾选框 |
| `checkStrictly` | `boolean` | `false` | 是否取消父子节点关联 |
| `checkOnClickNode` | `boolean` | `false` | 是否点击节点内容时选中 |
| `defaultExpandAll` | `boolean` | `false` | 是否默认展开所有节点 |
| `expandOnClickNode` | `boolean` | `false` | 是否点击节点展开树 |
| `renderAfterExpand` | `boolean` | `false` | 是否在展开后再渲染子节点 |
| `collapseTags` | `boolean` | `false` | 多选时是否折叠 tag |
| `collapseTagsTooltip` | `boolean` | `true` | 折叠 tag 时是否显示 tooltip |
| `maxCollapseTags` | `number` | `5` | 最多展示多少个折叠 tag |
| `popperClass` | `string` | `''` | 自定义弹层类名 |
| `nodeKey` | `string` | `'value'` | 树节点唯一标识字段 |
| `keyValue` | `string` | `'value'` | 默认值字段名 |
| `labelValue` | `string` | `'label'` | 默认标签字段名 |
| `childrenValue` | `string` | `'children'` | 默认子节点字段名 |
| `disabledValue` | `string` | `'disabled'` | 默认禁用字段名 |
| `inputHeight` | `number` | `40` | 输入框高度 |
| `isBorder` | `boolean` | `false` | 是否启用下边框风格 |
| `marginBottom` | `string \| number` | `20` | 外层下边距 |
| `paddingTop` | `string \| number` | `20` | 外层上内边距，用于浮动标签留白 |

## Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `input` | `OutlinedTreeSelectValue \| ''` | 输入值变化时触发 |
| `update:value` | `OutlinedTreeSelectValue \| ''` | `v-model:value` 同步事件 |
| `change` | `OutlinedTreeSelectValue \| ''` | 选项确认变化时触发 |
| `focus` | `FocusEvent` | 聚焦时触发 |
| `blur` | `FocusEvent` | 失焦时触发 |
| `visible-change` | `boolean` | 面板显隐变化时触发 |
| `clear` | 无 | 清空时触发 |

## Expose

| 方法 | 说明 |
| --- | --- |
| `focus()` | 聚焦树选择控件 |
| `blur()` | 取消聚焦 |
| `clear()` | 清空当前值 |
| `getTreeSelectRef()` | 获取内部 `el-tree-select` 实例 |

## 设计约束

- 组件只处理通用树选择壳子和交互状态，不直接耦合组织树接口、区域树接口等业务数据源
- 如果业务已经有固定的树字段协议，优先传 `propsValue`，不要在页面层二次转一份树数据
- 如果后续要支持领域级树选择行为，比如自动拼接父路径、限定层级，只建议在业务包里再封一层
