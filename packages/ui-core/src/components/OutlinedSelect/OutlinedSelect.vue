<template>
  <div
    class="outlined-select"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-select
      ref="selectRef"
      v-bind="selectAttrs"
      class="outlined-select__control"
      :model-value="selectValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="multiple"
      :filterable="filterable"
      :clearable="clearable"
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :max-collapse-tags="maxCollapseTags"
      :style="selectStyle"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @clear="handleClear"
    >
      <slot v-if="hasCustomOptionsSlot" />

      <template v-else>
        <el-option
          v-for="(item, index) in options"
          :key="createOptionKey(item, index)"
          :label="resolveOptionLabel(item)"
          :value="resolveOptionValue(item)"
          :disabled="Boolean(item.disabled)"
        />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>

      <template #header>
        <slot name="header" />
      </template>

      <template #footer>
        <slot name="footer" />
      </template>

      <template #tag="slotProps">
        <slot
          name="tag"
          v-bind="slotProps"
        />
      </template>
    </el-select>

    <div
      v-if="floatingLabel"
      class="outlined-select__label"
      :class="labelClasses"
    >
      {{ floatingLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
import type {
  OutlinedSelectCssValue,
  OutlinedSelectExpose,
  OutlinedSelectOption,
  OutlinedSelectOptionValue,
  OutlinedSelectProps,
  OutlinedSelectValue
} from './OutlinedSelect.types'

defineOptions({
  name: 'OutlinedSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedSelectProps>(), {
  value: undefined,
  options: () => [],
  placeholder: '',
  label: '',
  disabled: false,
  typeInput: '',
  showPassword: false,
  collapseTags: false,
  collapseTagsTooltip: true,
  filterable: true,
  clearable: true,
  multiple: false,
  inputHeight: 40,
  isBorder: false,
  keyValue: 'value',
  labelValue: 'label',
  noCheck: false,
  maxCollapseTags: 5,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedSelectValue | ''): void
  (event: 'update:value', value: OutlinedSelectValue | ''): void
  (event: 'change', value: OutlinedSelectValue | ''): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'visible-change', value: boolean): void
  (event: 'clear'): void
}>()

const attrs = useAttrs()
const slots = useSlots()
const selectRef = ref<any>(null)
const selectValue = ref<OutlinedSelectValue | ''>(normalizeSelectValue(props.value, props.multiple))
const focused = ref(false)
const blurred = ref(false)
const visible = ref(false)

watch(
  () => [props.value, props.multiple] as const,
  ([value, multiple]) => {
    selectValue.value = normalizeSelectValue(value, multiple)
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)

const selectAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const containerClasses = computed(() => ({
  'outlined-select--bordered': props.isBorder
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const selectStyle = computed(() => ({
  minHeight: `${props.inputHeight}px`,
  height: props.multiple ? 'auto' : `${props.inputHeight}px`
}))

const floatingLabel = computed(() => props.label || props.placeholder || '')
const hasCustomOptionsSlot = computed(() => Boolean(slots.default))

const hasContent = computed(() => {
  if (props.multiple) {
    return Array.isArray(selectValue.value) && selectValue.value.length > 0
  }

  return hasFilledValue(selectValue.value)
})

const shouldFloat = computed(() => (props.noCheck ? focused.value : focused.value || hasContent.value))

const labelClasses = computed(() => ({
  'outlined-select__label--floating': shouldFloat.value,
  'outlined-select__label--placeholder': !shouldFloat.value,
  'outlined-select__label--filled': !props.noCheck && hasContent.value && !focused.value
}))

function handleModelValueUpdate(value: OutlinedSelectValue) {
  const normalizedValue = normalizeSelectValue(value, props.multiple)
  selectValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleChange(value: OutlinedSelectValue) {
  const normalizedValue = normalizeSelectValue(value, props.multiple)
  selectValue.value = normalizedValue
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
    emitModelValue(selectValue.value)
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

function emitModelValue(value: OutlinedSelectValue | '') {
  emit('input', value)
  emit('update:value', value)
}

function normalizeSelectValue(value: OutlinedSelectValue | undefined, multiple: boolean): OutlinedSelectValue | '' {
  if (multiple) {
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

function resolveOptionLabel(option: OutlinedSelectOption) {
  const label = option[props.labelValue]
  return label === undefined || label === null ? '' : String(label)
}

function resolveOptionValue(option: OutlinedSelectOption): OutlinedSelectOptionValue {
  return (option[props.keyValue] as OutlinedSelectOptionValue) ?? null
}

function createOptionKey(option: OutlinedSelectOption, index: number) {
  const value = resolveOptionValue(option)
  return `${index}-${typeof value === 'object' ? JSON.stringify(value) : String(value)}`
}

function hasFilledValue(value: unknown) {
  return value !== undefined && value !== null && String(value) !== ''
}

function toCssValue(value: OutlinedSelectCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedSelectExpose>({
  focus: () => {
    selectRef.value?.focus?.()
  },
  blur: () => {
    selectRef.value?.blur?.()
  },
  clear: () => {
    selectRef.value?.blur?.()

    if (props.multiple) {
      selectValue.value = []
      emitModelValue([])
      emit('change', [])
      emit('clear')
      return
    }

    selectValue.value = ''
    emitModelValue('')
    emit('change', '')
    emit('clear')
  },
  toggleMenu: () => {
    selectRef.value?.toggleMenu?.()
  },
  getSelectRef: () => selectRef.value
})
</script>

<style scoped>
.outlined-select {
  position: relative;
}

.outlined-select__label {
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

.outlined-select__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-select__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-select__label--filled {
  color: var(--el-text-color-regular);
}

:deep(.outlined-select__control.el-select) {
  width: 100%;
}

:deep(.outlined-select__control .el-select__wrapper) {
  min-height: inherit;
  height: inherit;
}

:deep(.outlined-select__control .el-select__tags) {
  padding-top: 4px;
}

:deep(.outlined-select__control .el-select__selection) {
  min-height: inherit;
}

:deep(.outlined-select--bordered .el-select__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-select--bordered .el-select__wrapper.is-focused) {
  border-bottom-color: var(--el-color-primary);
}
</style>
