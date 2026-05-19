<template>
  <div
    class="outlined-cascader"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-cascader
      ref="cascaderRef"
      v-bind="cascaderAttrs"
      class="outlined-cascader__control"
      :model-value="cascaderValue"
      :options="options"
      :props="propsValue"
      :clearable="clearable"
      :placeholder="controlPlaceholder"
      :filterable="filterable"
      :show-all-levels="levels"
      :disabled="disabled"
      :popper-class="popperClass"
      :style="cascaderStyle"
      :aria-invalid="hasError ? 'true' : undefined"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @visible-change="handleVisibleChange"
    />

    <div
      v-if="floatingLabel"
      class="outlined-cascader__label"
      :class="labelClasses"
    >
      <span
        v-if="required"
        class="outlined-cascader__required"
      >*</span>
      <span>{{ floatingLabel }}</span>
    </div>

    <p
      v-if="hasError"
      class="outlined-cascader__error"
    >
      {{ resolvedErrorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type {
  OutlinedCascaderCssValue,
  OutlinedCascaderExpose,
  OutlinedCascaderProps,
  OutlinedCascaderValue
} from './OutlinedCascader.types'

defineOptions({
  name: 'OutlinedCascader',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedCascaderProps>(), {
  value: () => [],
  options: () => [],
  clearable: false,
  propsValue: undefined,
  placeholder: '',
  label: '',
  popperClass: '',
  disabled: false,
  inputHeight: 40,
  isBorder: false,
  filterable: true,
  levels: true,
  marginBottom: 20,
  paddingTop: 20,
  required: false,
  error: false,
  errorMessage: ''
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedCascaderValue): void
  (event: 'update:value', value: OutlinedCascaderValue): void
  (event: 'change', value: OutlinedCascaderValue): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'visible-change', value: boolean): void
}>()

const attrs = useAttrs()
const cascaderRef = ref<any>(null)
const cascaderValue = ref<OutlinedCascaderValue>(normalizeValue(props.value))
const focused = ref(false)
const blurred = ref(false)
const visible = ref(false)

watch(
  () => props.value,
  (value) => {
    cascaderValue.value = normalizeValue(value)
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)

const cascaderAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const containerClasses = computed(() => ({
  'outlined-cascader--bordered': props.isBorder,
  'outlined-cascader--error': hasError.value
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const cascaderStyle = computed(() => ({
  width: '100%',
  height: `${props.inputHeight}px`
}))

const floatingLabel = computed(() => props.label || props.placeholder || '')
const controlPlaceholder = computed(() => addRequiredMark(props.placeholder))
const hasError = computed(() => Boolean(props.error))
const resolvedErrorMessage = computed(() => props.errorMessage || createRequiredMessage(floatingLabel.value))

const hasContent = computed(() => cascaderValue.value.length > 0)

const labelClasses = computed(() => ({
  'outlined-cascader__label--floating': focused.value || hasContent.value,
  'outlined-cascader__label--placeholder': !focused.value && !hasContent.value,
  'outlined-cascader__label--filled': hasContent.value && !focused.value
}))

function handleModelValueUpdate(value: OutlinedCascaderValue) {
  const normalizedValue = normalizeValue(value)
  cascaderValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleChange(value: OutlinedCascaderValue) {
  const normalizedValue = normalizeValue(value)
  cascaderValue.value = normalizedValue
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
    emitModelValue(cascaderValue.value)
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

function emitModelValue(value: OutlinedCascaderValue) {
  emit('input', value)
  emit('update:value', value)
}

function normalizeValue(value: OutlinedCascaderValue | undefined) {
  return Array.isArray(value) ? value : []
}

function toCssValue(value: OutlinedCascaderCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

function addRequiredMark(value: string) {
  if (!props.required || !value || value.startsWith('*')) {
    return value
  }

  return `*${value}`
}

function createRequiredMessage(label: string) {
  return label ? `${label}为必填项` : '该项为必填项'
}

defineExpose<OutlinedCascaderExpose>({
  focus: () => {
    cascaderRef.value?.togglePopperVisible?.(true)
  },
  blur: () => {
    cascaderRef.value?.togglePopperVisible?.(false)
  },
  togglePopperVisible: () => {
    cascaderRef.value?.togglePopperVisible?.()
  },
  clear: () => {
    cascaderValue.value = []
    emitModelValue([])
    emit('change', [])
  },
  getCascaderRef: () => cascaderRef.value
})
</script>

<style scoped>
.outlined-cascader {
  position: relative;
}

.outlined-cascader__label {
  position: absolute;
  left: -2px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 5px;
  border-radius: 2px;
  background-color: #ffffff;
  font-size: 12px;
  line-height: 1;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1);
  pointer-events: none;
}

.outlined-cascader__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-cascader__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-cascader__label--filled {
  color: var(--el-text-color-regular);
}

.outlined-cascader--error {
  --el-input-focus-border-color: var(--el-color-danger);
  --el-input-hover-border-color: var(--el-color-danger);
}

.outlined-cascader__required,
.outlined-cascader--error .outlined-cascader__label,
.outlined-cascader__error {
  color: var(--el-color-danger);
}

.outlined-cascader__error {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.2;
}

:deep(.outlined-cascader__control .el-input) {
  height: 100%;
}

.outlined-cascader--bordered :deep(.el-input__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

.outlined-cascader--bordered :deep(.el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}

.outlined-cascader--error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

.outlined-cascader--error :deep(.el-input.is-focus .el-input__wrapper),
.outlined-cascader--error :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

.outlined-cascader--error.outlined-cascader--bordered :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  border-bottom-color: transparent;
}
</style>
