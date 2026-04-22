<template>
  <div
    class="outlined-time-picker"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-time-picker
      ref="pickerRef"
      v-bind="pickerAttrs"
      class="outlined-time-picker__control"
      :model-value="pickerValue"
      :is-range="isRange"
      :format="format"
      :value-format="resolvedValueFormat"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :range-separator="rangeSeparator"
      :disabled="disabled"
      :clearable="clearable"
      :arrow-control="arrowControl"
      :style="pickerStyle"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @clear="handleClear"
    />

    <div
      v-if="floatingLabel"
      class="outlined-time-picker__label"
      :class="labelClasses"
    >
      {{ floatingLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type {
  OutlinedTimePickerCssValue,
  OutlinedTimePickerExpose,
  OutlinedTimePickerProps,
  OutlinedTimePickerValue
} from './OutlinedTimePicker.types'

defineOptions({
  name: 'OutlinedTimePicker',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedTimePickerProps>(), {
  value: '',
  placeholder: '',
  label: '',
  disabled: false,
  clearable: true,
  isRange: false,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  rangeSeparator: '-',
  format: 'HH:mm',
  valueFormat: '',
  arrowControl: false,
  inputHeight: 40,
  isBorder: false,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedTimePickerValue | ''): void
  (event: 'update:value', value: OutlinedTimePickerValue | ''): void
  (event: 'change', value: OutlinedTimePickerValue | ''): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'visible-change', value: boolean): void
  (event: 'clear'): void
}>()

const attrs = useAttrs()
const pickerRef = ref<any>(null)
const pickerValue = ref<OutlinedTimePickerValue | ''>(normalizeValue(props.value, props.isRange))
const focused = ref(false)
const blurred = ref(false)
const visible = ref(false)

watch(
  () => [props.value, props.isRange] as const,
  ([value, isRange]) => {
    pickerValue.value = normalizeValue(value, isRange)
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)
const resolvedValueFormat = computed(() => props.valueFormat || props.format)

const pickerAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const containerClasses = computed(() => ({
  'outlined-time-picker--bordered': props.isBorder
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const pickerStyle = computed(() => ({
  height: `${props.inputHeight}px`
}))

const floatingLabel = computed(() => props.label || props.placeholder || '')

const hasContent = computed(() => {
  if (Array.isArray(pickerValue.value)) {
    return pickerValue.value.length > 0
  }

  return hasFilledValue(pickerValue.value)
})

const labelClasses = computed(() => ({
  'outlined-time-picker__label--floating': focused.value || hasContent.value,
  'outlined-time-picker__label--placeholder': !focused.value && !hasContent.value,
  'outlined-time-picker__label--filled': hasContent.value && !focused.value
}))

function handleModelValueUpdate(value: OutlinedTimePickerValue) {
  const normalizedValue = normalizeValue(value, props.isRange)
  pickerValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleChange(value: OutlinedTimePickerValue) {
  const normalizedValue = normalizeValue(value, props.isRange)
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

function handleClear() {
  emit('clear')
}

function emitModelValue(value: OutlinedTimePickerValue | '') {
  emit('input', value)
  emit('update:value', value)
}

function normalizeValue(value: OutlinedTimePickerValue | undefined, isRange: boolean) {
  if (isRange) {
    if (Array.isArray(value)) {
      return value
    }

    if (value === undefined || value === null || value === '') {
      return []
    }

    return [value]
  }

  return value ?? ''
}

function hasFilledValue(value: unknown) {
  return value !== undefined && value !== null && String(value) !== ''
}

function toCssValue(value: OutlinedTimePickerCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedTimePickerExpose>({
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
  clear: () => {
    const emptyValue = props.isRange ? [] : ''
    pickerValue.value = emptyValue
    emitModelValue(emptyValue)
    emit('change', emptyValue)
    emit('clear')
  },
  getPickerRef: () => pickerRef.value
})
</script>

<style scoped>
.outlined-time-picker {
  position: relative;
}

.outlined-time-picker__label {
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

.outlined-time-picker__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-time-picker__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-time-picker__label--filled {
  color: var(--el-text-color-regular);
}

:deep(.outlined-time-picker__control.el-date-editor) {
  width: 100%;
}

:deep(.outlined-time-picker__control .el-input__wrapper) {
  position: relative;
  min-height: inherit;
  height: inherit;
}

:deep(.outlined-time-picker__control .el-input__prefix) {
  position: absolute;
  right: 0;
}

:deep(.outlined-time-picker__control .el-input__suffix) {
  position: absolute;
  right: 30px;
}

:deep(.outlined-time-picker--bordered .el-input__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-time-picker--bordered .el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}
</style>
