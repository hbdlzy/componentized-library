<template>
  <div
    class="outlined-date-picker"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-date-picker
      ref="pickerRef"
      v-bind="pickerAttrs"
      class="outlined-date-picker__control"
      :model-value="pickerValue"
      :type="typeDate"
      :format="format"
      :value-format="resolvedValueFormat"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="pickerStyle"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @visible-change="handleVisibleChange"
    />

    <div
      v-if="floatingLabel"
      class="outlined-date-picker__label"
      :class="labelClasses"
    >
      {{ floatingLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type {
  OutlinedDatePickerCssValue,
  OutlinedDatePickerDisabledDate,
  OutlinedDatePickerExpose,
  OutlinedDatePickerProps,
  OutlinedDatePickerValue
} from './OutlinedDatePicker.types'

defineOptions({
  name: 'OutlinedDatePicker',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedDatePickerProps>(), {
  value: '',
  placeholder: '',
  label: '',
  disabled: false,
  timeValue: false,
  typeDate: 'date',
  format: 'YYYY-MM-DD',
  valueFormat: '',
  showPassword: false,
  multiple: false,
  inputHeight: 40,
  isBorder: false,
  disabledDate: undefined,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedDatePickerValue | ''): void
  (event: 'update:value', value: OutlinedDatePickerValue | ''): void
  (event: 'change', value: OutlinedDatePickerValue | ''): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'visible-change', value: boolean): void
}>()

const attrs = useAttrs()
const pickerRef = ref<any>(null)
const pickerValue = ref<OutlinedDatePickerValue | ''>(props.value ?? '')
const focused = ref(false)
const blurred = ref(false)
const visible = ref(false)

watch(
  () => props.value,
  (value) => {
    pickerValue.value = value ?? ''
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)

const resolvedValueFormat = computed(() => props.valueFormat || props.format)

const resolvedDisabledDate = computed(() => createDisabledDateHandler(props.disabledDate))

const resolvedDefaultTime = computed(() => {
  if (attrs.defaultTime !== undefined) {
    return attrs.defaultTime
  }

  if ((attrs as Record<string, unknown>)['default-time'] !== undefined) {
    return (attrs as Record<string, unknown>)['default-time']
  }

  return props.timeValue ? new Date().setHours(0, 0, 0, 0) : new Date()
})

const resolvedDisabledHours = computed(() => {
  if (attrs.disabledHours !== undefined) {
    return attrs.disabledHours
  }

  if ((attrs as Record<string, unknown>)['disabled-hours'] !== undefined) {
    return (attrs as Record<string, unknown>)['disabled-hours']
  }

  if (!shouldLimitCurrentTime()) {
    return undefined
  }

  return () => {
    const hours = new Date().getHours()
    return Array.from({ length: hours }, (_, index) => index)
  }
})

const resolvedDisabledMinutes = computed(() => {
  if (attrs.disabledMinutes !== undefined) {
    return attrs.disabledMinutes
  }

  if ((attrs as Record<string, unknown>)['disabled-minutes'] !== undefined) {
    return (attrs as Record<string, unknown>)['disabled-minutes']
  }

  if (!shouldLimitCurrentTime()) {
    return undefined
  }

  return () => {
    const minutes = new Date().getMinutes()
    return Array.from({ length: minutes }, (_, index) => index)
  }
})

const pickerAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs

  return {
    ...rest,
    defaultTime: resolvedDefaultTime.value,
    disabledDate: resolvedDisabledDate.value,
    disabledHours: resolvedDisabledHours.value,
    disabledMinutes: resolvedDisabledMinutes.value
  }
})

const containerClasses = computed(() => ({
  'outlined-date-picker--bordered': props.isBorder
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const pickerStyle = computed(() => ({
  height: `${props.inputHeight}px`
}))

const floatingLabel = computed(() => props.label || props.placeholder || '')

const hasContent = computed(() => hasFilledValue(pickerValue.value))

const labelClasses = computed(() => ({
  'outlined-date-picker__label--floating': focused.value || hasContent.value,
  'outlined-date-picker__label--placeholder': !focused.value && !hasContent.value,
  'outlined-date-picker__label--filled': hasContent.value && !focused.value
}))

function handleModelValueUpdate(value: OutlinedDatePickerValue) {
  const normalizedValue = normalizeValue(value)
  pickerValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleChange(value: OutlinedDatePickerValue) {
  const normalizedValue = normalizeValue(value)
  pickerValue.value = normalizedValue
  emit('change', normalizedValue)
}

function handleFocus(event: FocusEvent) {
  blurred.value = false
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  blurred.value = true

  if (!visible.value) {
    focused.value = false
    emitModelValue(pickerValue.value)
  }

  emit('blur', event)
}

function handleVisibleChange(nextVisible: boolean) {
  visible.value = nextVisible

  if (!nextVisible && blurred.value) {
    focused.value = false
  }

  emit('visible-change', nextVisible)
}

function emitModelValue(value: OutlinedDatePickerValue | '') {
  emit('input', value)
  emit('update:value', value)
}

function normalizeValue(value: OutlinedDatePickerValue | undefined) {
  return value ?? ''
}

function createDisabledDateHandler(disabledDate: OutlinedDatePickerDisabledDate | undefined) {
  if (!disabledDate) {
    return undefined
  }

  if (typeof disabledDate === 'function') {
    return disabledDate
  }

  const boundary = normalizeBoundary(disabledDate)

  return (value: Date) => value.getTime() < boundary - 86400000
}

function normalizeBoundary(value: Exclude<OutlinedDatePickerDisabledDate, ((date: Date) => boolean)>) {
  if (value === 'nowDate') {
    return Date.now()
  }

  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === 'number') {
    return value
  }

  return new Date(value).getTime()
}

function shouldLimitCurrentTime() {
  return Boolean(props.disabledDate) && props.typeDate.toLowerCase().includes('time')
}

function hasFilledValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== undefined && value !== null && String(value) !== ''
}

function toCssValue(value: OutlinedDatePickerCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedDatePickerExpose>({
  focus: () => {
    pickerRef.value?.focus?.()
  },
  blur: () => {
    pickerRef.value?.blur?.()
  },
  handleOpen: () => {
    pickerRef.value?.handleOpen?.()
  },
  handleClose: () => {
    pickerRef.value?.handleClose?.()
  },
  getPickerRef: () => pickerRef.value
})
</script>

<style scoped>
.outlined-date-picker {
  position: relative;
}

.outlined-date-picker__label {
  position: absolute;
  left: -2px;
  padding: 2px 5px;
  border-radius: 2px;
  background-color: #ffffff;
  font-size: 12px;
  line-height: 1;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1);
  pointer-events: none;
}

.outlined-date-picker__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-date-picker__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-date-picker__label--filled {
  color: var(--el-text-color-regular);
}

:deep(.outlined-date-picker__control.el-date-editor) {
  width: 100%;
}

:deep(.outlined-date-picker__control .el-input__wrapper) {
  position: relative;
  min-height: inherit;
  height: inherit;
}

:deep(.outlined-date-picker__control .el-input__prefix) {
  position: absolute;
  right: 0;
}

:deep(.outlined-date-picker__control .el-input__suffix) {
  position: absolute;
  right: 30px;
}

:deep(.outlined-date-picker--bordered .el-input__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-date-picker--bordered .el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}
</style>
