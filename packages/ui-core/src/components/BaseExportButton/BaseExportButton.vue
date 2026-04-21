<template>
  <el-button
    class="base-export-button"
    :type="type"
    :size="size"
    :plain="plain"
    :link="link"
    :text="text"
    :disabled="isDisabled"
    :loading="loading"
    @click="handleExport"
  >
    <slot>{{ label }}</slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { ElMessage } from 'element-plus'
import { exportExcel, type ExcelExportOptions } from '../../excel/exportExcel'
import { downloadExportResponse, normalizeExportFileName } from './BaseExportButton.utils'
import type {
  ExportBeforeHandler,
  ExportMode,
  ExportRequestHandler,
  ExportSuccessPayload
} from './BaseExportButton.types'

const props = defineProps({
  label: {
    type: String,
    default: '导出'
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | ''>,
    default: 'primary'
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  plain: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: ''
  },
  excelOptions: Object as PropType<ExcelExportOptions<Record<string, any>>>,
  requestHandler: Function as PropType<ExportRequestHandler>,
  beforeExport: Function as PropType<ExportBeforeHandler>,
  successMessage: {
    type: String,
    default: '导出成功'
  },
  errorMessage: {
    type: String,
    default: '导出失败，请稍后重试'
  },
  autoMessage: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
  (event: 'start'): void
  (event: 'success', payload: ExportSuccessPayload): void
  (event: 'error', error: unknown): void
}>()

const loading = ref(false)

const exportMode = computed<ExportMode>(() => {
  if (props.excelOptions && props.requestHandler) {
    return 'invalid'
  }

  if (props.excelOptions) {
    return 'excel'
  }

  if (props.requestHandler) {
    return 'request'
  }

  return 'none'
})

const isDisabled = computed(() => props.disabled || loading.value || exportMode.value === 'none')

async function runBeforeExport() {
  if (!props.beforeExport) {
    return true
  }

  const result = await props.beforeExport()
  return result !== false
}

async function handleExport() {
  if (loading.value || props.disabled) {
    return
  }

  if (exportMode.value === 'none') {
    ElMessage.warning('请先配置导出逻辑')
    return
  }

  if (exportMode.value === 'invalid') {
    const conflictError = new Error('BaseExportButton 不能同时接收 excelOptions 和 requestHandler')
    emit('error', conflictError)
    ElMessage.error(conflictError.message)
    return
  }

  const canContinue = await runBeforeExport()

  if (!canContinue) {
    return
  }

  loading.value = true
  emit('start')

  try {
    if (exportMode.value === 'excel' && props.excelOptions) {
      exportExcel(props.excelOptions)

      if (props.autoMessage) {
        ElMessage.success(props.successMessage)
      }

      emit('success', {
        mode: 'excel',
        fileName: normalizeExportFileName(props.excelOptions.fileName)
      })

      return
    }

    if (exportMode.value === 'request' && props.requestHandler) {
      const response = await props.requestHandler()
      const fileName = downloadExportResponse(response, props.fileName)

      if (props.autoMessage) {
        ElMessage.success(props.successMessage)
      }

      emit('success', {
        mode: 'request',
        fileName
      })
    }
  } catch (error) {
    console.error(error)

    if (props.autoMessage) {
      ElMessage.error(props.errorMessage)
    }

    emit('error', error)
  } finally {
    loading.value = false
  }
}
</script>
