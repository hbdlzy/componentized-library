<template>
  <div
    class="outlined-input"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-input
      ref="inputRef"
      v-bind="inputAttrs"
      :model-value="inputValue"
      :type="resolvedType"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :max="max"
      :min="min"
      :show-password="showPassword"
      :show-word-limit="showWordLimit"
      :clearable="clearable"
      :style="inputStyle"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @clear="handleClear"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>

      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>

      <template v-if="$slots.suffix || suffixText" #suffix>
        <slot name="suffix">
          <span class="outlined-input__suffix-text">{{ suffixText }}</span>
        </slot>
      </template>
    </el-input>

    <div
      v-if="floatingLabel"
      class="outlined-input__label"
      :class="labelClasses"
    >
      {{ floatingLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type { InputInstance } from 'element-plus'
import type {
  OutlinedInputCssValue,
  OutlinedInputExpose,
  OutlinedInputProps,
  OutlinedInputValue
} from './OutlinedInput.types'

defineOptions({
  name: 'OutlinedInput',
  inheritAttrs: false
})

const DEFAULT_REGEX = /^\d+$/

const props = withDefaults(defineProps<OutlinedInputProps>(), {
  value: '',
  disabled: false,
  placeholder: '',
  label: '',
  typeInput: 'text',
  showPassword: false,
  isNumber: false,
  inputHeight: 40,
  isBorder: false,
  suffixText: '',
  clearable: false,
  showWordLimit: true,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedInputValue | ''): void
  (event: 'update:value', value: OutlinedInputValue | ''): void
  (event: 'warning', value: string): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'change', value: OutlinedInputValue | ''): void
  (event: 'clear'): void
}>()

const attrs = useAttrs()
const inputRef = ref<InputInstance | null>(null)
const inputValue = ref<OutlinedInputValue | ''>(props.value ?? '')
const focused = ref(false)

watch(
  () => props.value,
  (value) => {
    inputValue.value = value ?? ''
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)

const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const resolvedType = computed(() => props.typeInput || 'text')

const hasTextareaAutosize = computed(() => {
  const autosize = inputAttrs.value.autosize
  return autosize !== undefined && autosize !== false
})

const containerClasses = computed(() => ({
  'outlined-input--bordered': props.isBorder,
  'outlined-input--textarea-default': resolvedType.value === 'textarea' && !hasTextareaAutosize.value
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const inputStyle = computed(() => {
  if (resolvedType.value === 'textarea') {
    return undefined
  }

  return {
    height: `${props.inputHeight}px`
  }
})

const floatingLabel = computed(() => props.label || props.placeholder || '')

const hasContent = computed(() => hasFilledValue(inputValue.value))

const labelClasses = computed(() => ({
  'outlined-input__label--floating': focused.value || hasContent.value,
  'outlined-input__label--placeholder': !focused.value && !hasContent.value,
  'outlined-input__label--filled': hasContent.value && !focused.value
}))

function handleModelValueUpdate(value: string | number) {
  const normalizedValue = normalizeValue(value)
  inputValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emitModelValue(inputValue.value)
  emit('blur', event)
}

function handleChange(value: string | number) {
  const normalizedValue = normalizeValue(value)
  inputValue.value = normalizedValue
  emit('change', normalizedValue)
}

function handleClear() {
  emit('clear')
}

function emitModelValue(value: OutlinedInputValue | '') {
  emit('input', value)
  emit('update:value', value)
}

function normalizeValue(value: string | number | null | undefined): OutlinedInputValue | '' {
  const normalizedValue = value ?? ''

  if (!props.isNumber) {
    return normalizedValue
  }

  const nextText = String(normalizedValue)

  if (!nextText) {
    return ''
  }

  const regex = props.regex || DEFAULT_REGEX

  if (!regex.test(nextText)) {
    emit('warning', nextText)
    return ''
  }

  return normalizedValue
}

function hasFilledValue(value: OutlinedInputValue | '') {
  return value !== undefined && value !== null && String(value) !== ''
}

function toCssValue(value: OutlinedInputCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedInputExpose>({
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  },
  clear: () => {
    inputRef.value?.clear()
  },
  select: () => {
    inputRef.value?.select()
  },
  getInputRef: () => inputRef.value
})
</script>

<style scoped>
.outlined-input {
  position: relative;
}

.outlined-input__label {
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

.outlined-input__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-input__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-input__label--filled {
  color: var(--el-text-color-regular);
}

.outlined-input__suffix-text {
  white-space: nowrap;
}

:deep(.outlined-input--bordered .el-input__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-input--bordered .el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}

:deep(.outlined-input--bordered .el-textarea__inner) {
  border-width: 0 0 1px;
  border-radius: 0;
  box-shadow: none;
}

:deep(.outlined-input--bordered .el-textarea__inner:focus) {
  border-bottom-color: var(--el-color-primary);
}

:deep(.outlined-input--textarea-default .el-textarea__inner) {
  min-height: 100px !important;
  max-height: 180px;
}
</style>
