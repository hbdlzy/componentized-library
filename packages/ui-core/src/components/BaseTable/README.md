# BaseTable

`BaseTable` 用来统一封装项目里高频出现的表格壳子、分页栏、远程请求、操作列、图片列、标签列和常见表格暴露方法，避免页面层重复写同一套表格基础代码。

## 解决的问题

- 页面层不再重复封装 `el-table + el-pagination`
- 同时支持本地数据模式和远程请求模式
- 统一收敛勾选列、索引列、操作列、图片列、标签列、输入列
- 支持列配置驱动和插槽扩展，既能快用，也能保留复杂场景灵活性
- 提供 `load`、`refresh`、`setData`、`clearSelection` 等常用暴露方法

## 适用场景

- 列表页、管理页、日志页、明细页
- 需要统一分页和表格风格的页面
- 同一项目里会重复出现的通用管理表格
- 页面层希望把请求逻辑和列配置分开维护

## 不适用场景

- 高度强业务定制的复杂表格编辑器
- 需要虚拟滚动、大数据量渲染专项优化的场景
- 完全脱离 Element Plus Table 行为的表格交互

## 基础用法

### 本地数据模式

```vue
<template>
  <BaseTable
    :columns="columns"
    :data="rows"
    :show-toolbar="false"
    :show-pagination="false"
    border
    height="100%"
  />
</template>

<script setup lang="ts">
import { BaseTable, type BaseTableColumn } from '@hbdlzy/ui-core'

interface RowItem {
  id: number
  name: string
  status: string
}

const columns: BaseTableColumn<RowItem>[] = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '状态',
    prop: 'status',
    kind: 'tag',
    options: [
      { label: '启用', value: 'enabled', tagType: 'success' },
      { label: '停用', value: 'disabled', tagType: 'info' }
    ]
  }
]

const rows: RowItem[] = [
  { id: 1, name: '策略 A', status: 'enabled' },
  { id: 2, name: '策略 B', status: 'disabled' }
]
</script>
```

### 远程请求模式

`BaseTable` 不直接接 `listUrl`，而是统一改成 `request` 回调。这样组件本身不依赖任何业务接口封装。

```vue
<template>
  <BaseTable
    ref="tableRef"
    :columns="columns"
    :request="requestTableData"
    :request-params="filters"
    :has-index="true"
    border
    @row-action="handleRowAction"
  >
    <template #toolbar>
      <el-form inline>
        <el-form-item label="名称">
          <el-input v-model="filters.keyword" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tableRef?.resetPage()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable, type BaseTableColumn, type BaseTableExpose } from '@hbdlzy/ui-core'

interface RowItem {
  id: number
  name: string
  status: string
}

const tableRef = ref<BaseTableExpose<RowItem> | null>(null)

const filters = ref({
  keyword: ''
})

const columns: BaseTableColumn<RowItem>[] = [
  {
    label: '名称',
    prop: 'name',
    kind: 'link'
  },
  {
    label: '状态',
    prop: 'status'
  },
  {
    label: '操作',
    prop: 'action',
    kind: 'actions',
    width: 180,
    fixed: 'right',
    actions: [
      { label: '编辑', type: 'edit' },
      { label: '删除', type: 'delete', buttonType: 'danger' }
    ]
  }
]

const requestTableData = async (params: Record<string, unknown>) => {
  const res = await fetch('/api/demo/list', {
    method: 'POST',
    body: JSON.stringify(params)
  }).then((response) => response.json())

  return {
    records: res.data.records,
    total: res.data.total
  }
}

const handleRowAction = ({ row, action }: { row: RowItem; action: { type: string } }) => {
  if (action.type === 'edit') {
    console.log('edit', row)
  }
}
</script>
```

### 请求结果适配

如果接口返回结构不是常见的 `records/list/items + total`，可以直接传 `resultAdapter` 做结果归一化。

```vue
<script setup lang="ts">
import { BaseTable } from '@hbdlzy/ui-core'

const resultAdapter = (result: any) => {
  return {
    rows: result?.payload?.rows || [],
    total: Number(result?.payload?.count || 0)
  }
}
</script>

<template>
  <BaseTable
    :columns="columns"
    :request="requestTableData"
    :result-adapter="resultAdapter"
  />
</template>
```

这样无论接口原始返回是：

```ts
{
  payload: {
    rows: [],
    count: 36
  }
}
```

还是别的结构，页面层都可以自己决定如何映射成：

```ts
{
  rows: [],
  total: 36
}
```

### 远程排序和参数映射

如果接口需要排序字段和排序方向，可以直接用内置映射能力。

```vue
<script setup lang="ts">
import { BaseTable, type BaseTableColumn } from '@hbdlzy/ui-core'

interface RowItem {
  id: number
  name: string
  createdAt: string
}

const columns: BaseTableColumn<RowItem>[] = [
  {
    label: '名称',
    prop: 'name',
    sortable: true
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    sortField: 'created_time',
    sortable: true
  }
]
</script>

<template>
  <BaseTable
    :columns="columns"
    :request="requestTableData"
    :default-sort="{ prop: 'createdAt', order: 'descending' }"
    sort-field-key="orderBy"
    sort-order-key="orderDirection"
  />
</template>
```

上面这个配置会把请求参数自动映射成：

```ts
{
  pageNum: 1,
  pageSize: 20,
  orderBy: 'created_time',
  orderDirection: 'desc'
}
```

如果接口参数更特殊，可以直接传 `sortMapper` 自定义：

```ts
const sortMapper = (payload: { field?: string; direction: string | null }) => {
  if (!payload.field || !payload.direction) {
    return {}
  }

  return {
    sortList: [
      {
        property: payload.field,
        direction: payload.direction === 'asc'
      }
    ]
  }
}
```

## 列插槽

如果某一列需要完全自定义渲染，优先使用命名插槽。

- 默认列插槽名：`cell-${prop}`
- 默认表头插槽名：`header-${prop}`

```vue
<template>
  <BaseTable :columns="columns" :data="rows" :show-toolbar="false" :show-pagination="false">
    <template #cell-status="{ row }">
      <el-switch :model-value="row.status === 'enabled'" />
    </template>
  </BaseTable>
</template>
```

## Props

- `columns`: 列配置数组
- `data`: 本地数据源
- `request`: 远程请求回调
- `requestParams`: 请求附加参数
- `resultAdapter`: 请求结果适配器，用于把接口原始返回映射成 `{ rows, total }`
- `autoLoad`: 有 `request` 时是否挂载后自动请求
- `reloadOnParamsChange`: `requestParams` 改变时是否自动重载
- `rowKey`: 行主键，默认 `id`
- `height`: 表格高度
- `border`: 是否显示边框
- `stripe`: 是否显示斑马纹
- `showToolbar`: 是否显示顶部工具栏容器
- `showPagination`: 是否显示分页
- `hasSelection`: 是否显示多选列
- `hasIndex`: 是否显示序号列
- `pagination`: 分页配置，支持 `currentPage`、`pageSize`、`total`、`pageSizes`
- `currentPageKey`: 远程请求时页码字段名，默认 `pageNum`
- `pageSizeKey`: 远程请求时每页条数字段名，默认 `pageSize`
- `defaultSort`: 默认排序状态
- `reloadOnSortChange`: 排序变化时是否自动重载远程数据
- `sortFieldKey`: 排序字段请求参数名，默认 `sortField`
- `sortOrderKey`: 排序方向请求参数名，默认 `sortOrder`
- `sortOrderMap`: 排序方向值映射，默认 `{ ascending: 'asc', descending: 'desc' }`
- `sortMapper`: 自定义排序参数映射器，优先级高于 `sortFieldKey/sortOrderKey`
- `emptyText`: 空状态文案

## Column 能力

列配置里当前支持这些高频模式：

- 默认文本列
- `kind: 'link'`
  点击型文本列
- `kind: 'actions'`
  操作列，配合 `actions`
- `kind: 'image'`
  图片列
- `kind: 'tag'`
  标签映射列，配合 `options`
- `kind: 'html'`
  HTML 内容列
- `kind: 'input'`
  行内输入列

常用字段：

- `label`
- `prop`
- `width`
- `minWidth`
- `align`
- `fixed`
- `sortable`
- `sortField`
- `showOverflowTooltip`
- `actions`
- `options`
- `formatter`
- `clickHandler`
- `inputHandler`
- `slotName`
- `headerSlotName`

## Events

- `selection-change`: 勾选行变化
- `sort-change`: 排序变化
  返回 `prop`、`order`、`field`、`direction`
- `row-action`: 点击操作列按钮
- `cell-click`: 点击链接型单元格
- `cell-input`: 行内输入变化
- `page-change`: 页码变化
- `size-change`: 每页条数变化
- `update:pagination`: 分页状态变化
- `loaded`: 远程数据加载完成
- `request-error`: 远程请求失败

## Expose

- `load(data?)`: 传数组时直接灌入本地数据，不传时走远程请求
- `refresh()`: 按当前分页和参数重新请求
- `setData(data)`: 直接替换当前表格数据
- `resetPage()`: 页码重置到第一页并重新加载
- `clearSelection()`: 清空勾选
- `toggleRowSelection(row, selected?)`: 手动切换某一行勾选状态
- `getSelectionRows()`: 获取当前勾选行
- `getRows()`: 获取当前表格行数据

## 从旧 TableComponent 迁移的建议

- 把旧的 `listUrl`、`paramsData` 改成 `request + requestParams`
- 如果旧接口返回结构不统一，优先通过 `resultAdapter` 适配，不要改公共组件内部解析逻辑
- 把旧的 `sortKey`、`sortList` 映射逻辑改成 `sortField`、`sortFieldKey`、`sortOrderKey` 或 `sortMapper`
- 把旧的 `@handleAction` 改成 `@row-action`
- 把旧的顶部筛选表单内容移动到 `toolbar` 插槽
- 业务字典渲染优先用 `kind: 'tag' + options`
- 如果某列逻辑太特殊，优先用 `cell-${prop}` 插槽，不要继续把业务逻辑塞回公共组件

## 推荐约定

- 页面层负责请求参数和接口编排，`BaseTable` 只负责通用表格能力
- 默认优先使用列配置驱动，只有复杂单元格才用插槽
- 通用操作列尽量统一成 `row-action`
- 复杂筛选表单不要内置到表格组件里，统一通过 `toolbar` 插槽扩展
