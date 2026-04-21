# BaseExportButton

`BaseExportButton` 用来统一项目中的导出入口，避免每个页面重复写按钮状态、导出前校验、成功失败提示和文件下载逻辑。

## 解决的问题

- 统一前端 Excel 导出按钮交互
- 统一后端 `blob` 文件下载按钮交互
- 自动处理 loading 状态
- 自动处理成功和失败消息提示
- 将导出前校验、导出成功回调收敛成统一接口

## 适用场景

- 页面需要导出表格数据为 Excel
- 页面需要调用后端接口导出文件
- 希望多个项目中的导出按钮交互保持一致

## 不适用场景

- 页面需要复杂的导出配置弹窗
- 导出前需要强业务表单流程编排
- 不是按钮触发型的导出入口

## 支持模式

- `excelOptions`: 纯前端 Excel 导出
- `requestHandler`: 调接口获取 `blob` 或二进制响应后下载

这两个模式二选一，不能同时传。

## 基础用法

```vue
<template>
  <BaseExportButton :excel-options="excelOptions" />
</template>

<script setup lang="ts">
import { BaseExportButton, type ExcelExportOptions } from '@hbdlzy/ui-core'

interface UserRow {
  name: string
  department: string
}

const excelOptions: ExcelExportOptions<UserRow> = {
  fileName: '用户列表',
  columns: [
    { label: '姓名', key: 'name' },
    { label: '部门', key: 'department' }
  ],
  data: [
    { name: '张三', department: '运维' },
    { name: '李四', department: '调度' }
  ]
}
</script>
```

## 后端导出示例

```vue
<template>
  <BaseExportButton
    file-name="运行报表.xlsx"
    :request-handler="requestHandler"
    :before-export="beforeExport"
  />
</template>

<script setup lang="ts">
import { BaseExportButton } from '@hbdlzy/ui-core'

const beforeExport = async () => {
  return true
}

const requestHandler = async () => {
  const response = await api.exportReport()

  return {
    data: response.data,
    headers: response.headers
  }
}
</script>
```

## Props

- `label`: 按钮文案，默认 `导出`
- `type`: Element Plus 按钮类型，默认 `primary`
- `size`: 按钮尺寸，默认 `default`
- `plain`: 是否朴素按钮
- `link`: 是否链接按钮
- `text`: 是否文字按钮
- `disabled`: 是否禁用
- `fileName`: 后端下载时的兜底文件名
- `excelOptions`: 前端 Excel 导出配置
- `requestHandler`: 后端导出请求函数
- `beforeExport`: 导出前钩子，返回 `false` 时中断导出
- `successMessage`: 成功提示文案
- `errorMessage`: 失败提示文案
- `autoMessage`: 是否自动弹出成功失败提示

## Events

- `start`: 点击并通过校验后开始导出
- `success`: 导出成功，返回 `{ mode, fileName }`
- `error`: 导出失败

## 约束

- `excelOptions` 和 `requestHandler` 二选一
- 组件只负责触发导出，不负责业务数据查询
- 如果使用前端导出，建议优先复用 `exportExcel`

## 相关能力

- 工具函数：`@hbdlzy/ui-core` 中的 `exportExcel`
