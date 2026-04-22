# BaseTable

`BaseTable` 用来统一封装项目里高频出现的表格壳子、分页栏、远程请求、排序参数映射、结果适配、表头列搜索和常见列渲染能力，避免页面层重复写同一套 `el-table + el-pagination` 基础代码。

## 解决的问题

- 页面层不再重复封装表格容器、分页和加载逻辑
- 同时支持本地数据模式和远程请求模式
- 统一收敛勾选列、序号列、操作列、图片列、标签列、输入列
- 支持列配置驱动和命名插槽扩展
- 提供 `load`、`refresh`、`setData`、`resetPage` 等常用方法
- 支持旧 `TableComponent.vue` 里常见的表头列搜索能力

## 适用场景

- 列表页、管理页、日志页、明细页
- 需要统一分页和表格风格的页面
- 同一项目里会重复出现的通用管理表格
- 希望把请求逻辑和列配置拆开维护的页面

## 不适用场景

- 高度强业务定制的复杂表格编辑器
- 需要虚拟滚动或超大数据量专门优化的场景
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

## 请求结果适配

如果接口返回结构不是常见的 `records/list/items + total`，可以直接传 `resultAdapter` 做归一化。

```ts
const resultAdapter = (result: any) => {
  return {
    rows: result?.payload?.rows || [],
    total: Number(result?.payload?.count || 0)
  }
}
```

## 远程排序和参数映射

如果接口需要排序字段和排序方向，可以直接使用内置映射能力。

```vue
<BaseTable
  :columns="columns"
  :request="requestTableData"
  :default-sort="{ prop: 'createdAt', order: 'descending' }"
  sort-field-key="orderBy"
  sort-order-key="orderDirection"
/>
```

请求参数会自动映射成：

```ts
{
  pageNum: 1,
  pageSize: 20,
  orderBy: 'created_time',
  orderDirection: 'desc'
}
```

如果接口参数结构更特殊，可以改用 `sortMapper`。

## 表头列搜索

`BaseTable` 现在支持列头搜索能力，用法和旧 `TableComponent.vue` 里的 `isSearch` 很接近，但配置方式更收敛。

### 基础写法

```ts
const columns = [
  {
    label: '联系人',
    prop: 'owner',
    headerSearch: true
  }
]
```

开启后，这一列的表头会出现搜索图标，点击后会弹出输入框，并提供“搜索 / 重置”操作。

### 高级写法

```ts
const columns = [
  {
    label: '联系人',
    prop: 'owner',
    headerSearch: {
      paramKey: 'contactName',
      placeholder: '请输入搜索内容',
      width: 280,
      searchText: '搜索',
      resetText: '重置'
    }
  }
]
```

### 行为说明

- 远程模式下，列头搜索值会自动合并到 `request(params)` 的参数里
- 触发搜索或重置时，会自动把页码重置到第一页
- 如果配置了 `paramKey`，请求参数会优先使用它
- 如果没有配置 `paramKey`，默认使用当前列的 `prop`
- 本地数据模式下，列头搜索会对当前 `data` 做简单文本包含过滤
- 多个开启搜索的列会按“同时满足”处理

示例请求参数：

```ts
{
  currentPage: 1,
  pageSize: 20,
  owner: '张三'
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
- `resultAdapter`: 请求结果适配器，用于把原始结果映射成 `{ rows, total }`
- `autoLoad`: 有 `request` 时是否挂载后自动请求
- `reloadOnParamsChange`: `requestParams` 改变时是否自动重载
- `reloadOnSortChange`: 排序变化时是否自动重载远程数据
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
- `sortFieldKey`: 排序字段请求参数名，默认 `sortField`
- `sortOrderKey`: 排序方向请求参数名，默认 `sortOrder`
- `sortOrderMap`: 排序方向值映射，默认 `{ ascending: 'asc', descending: 'desc' }`
- `sortMapper`: 自定义排序参数映射器，优先级高于 `sortFieldKey/sortOrderKey`
- `emptyText`: 空状态文案

## Column 能力

列配置当前支持这些高频模式：

- 默认文本列
- `kind: 'link'`
- `kind: 'actions'`
- `kind: 'image'`
- `kind: 'tag'`
- `kind: 'html'`
- `kind: 'input'`

常用字段：

- `label`
- `prop`
- `width`
- `minWidth`
- `align`
- `fixed`
- `sortable`
- `sortField`
- `headerSearch`
- `showOverflowTooltip`
- `actions`
- `options`
- `formatter`
- `clickHandler`
- `inputHandler`
- `slotName`
- `headerSlotName`

## Events

- `selection-change`
- `sort-change`
- `row-action`
- `cell-click`
- `cell-input`
- `page-change`
- `size-change`
- `update:pagination`
- `loaded`
- `request-error`

## Expose

- `load(data?)`
- `refresh()`
- `setData(data)`
- `resetPage()`
- `setHeaderSearchValue(key, value, shouldReload?)`
- `resetHeaderSearch(key?)`
- `getHeaderSearchValues()`
- `clearSelection()`
- `toggleRowSelection(row, selected?)`
- `getSelectionRows()`
- `getRows()`

示例：

```ts
tableRef.value?.setHeaderSearchValue('owner', '张三')
tableRef.value?.resetHeaderSearch()
```

## 从旧 TableComponent 迁移的建议

- 把旧的 `listUrl`、`paramsData` 改成 `request + requestParams`
- 如果旧接口返回结构不统一，优先通过 `resultAdapter` 适配
- 把旧的 `sortKey`、`sortList` 映射逻辑改成 `sortField`、`sortFieldKey`、`sortOrderKey` 或 `sortMapper`
- 把旧的 `@handleAction` 改成 `@row-action`
- 把旧的顶部筛选表单迁移到 `toolbar` 插槽
- 把旧的 `isSearch` 迁移成 `headerSearch`
- 业务字典渲染优先使用 `kind: 'tag' + options`
- 列渲染逻辑过于特殊时，优先使用 `cell-${prop}` 插槽

## 推荐约定

- 页面层负责请求参数和接口编排，`BaseTable` 只负责通用表格能力
- 默认优先使用列配置驱动，只有复杂单元格才使用插槽
- 通用操作列尽量统一收敛到 `row-action`
- 复杂筛选表单不要内置到表格组件里，统一通过 `toolbar` 扩展
