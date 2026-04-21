# BaseExportButton

`BaseExportButton` 是一个基础导出按钮组件，用来统一项目里的导出入口。

它支持两类场景：

- 纯前端 Excel 导出
- 调接口返回 blob 文件下载

## 使用方式

```vue
<script setup lang="ts">
import { BaseExportButton } from '@hbdlzy/ui-core'
</script>

<template>
  <BaseExportButton :excel-options="excelOptions" />
</template>
```

## 约束

- `excelOptions` 和 `requestHandler` 二选一
- 组件只负责触发导出，不负责业务数据查询
