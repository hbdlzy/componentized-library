<template>
  <div
    class="outlined-tree-select"
    :class="[containerClasses, rootClass]"
    :style="[containerStyle, rootStyle]"
  >
    <el-tree-select
      ref="treeSelectRef"
      v-bind="treeSelectAttrs"
      class="outlined-tree-select__control"
      :model-value="treeSelectValue"
      :data="data"
      :props="resolvedTreeProps"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :multiple="multiple"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :check-on-click-node="checkOnClickNode"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :render-after-expand="renderAfterExpand"
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :max-collapse-tags="maxCollapseTags"
      :popper-class="popperClass"
      :node-key="nodeKey"
      :style="treeSelectStyle"
      @update:model-value="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @clear="handleClear"
    >
      <template #empty>
        <slot name="empty" />
      </template>

      <template #header>
        <slot name="header" />
      </template>

      <template #footer>
        <slot name="footer" />
      </template>
    </el-tree-select>

    <div
      v-if="floatingLabel"
      class="outlined-tree-select__label"
      :class="labelClasses"
    >
      {{ floatingLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type {
  OutlinedTreeSelectCssValue,
  OutlinedTreeSelectExpose,
  OutlinedTreeSelectOptionValue,
  OutlinedTreeSelectProps,
  OutlinedTreeSelectValue
} from './OutlinedTreeSelect.types'

defineOptions({
  name: 'OutlinedTreeSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedTreeSelectProps>(), {
  value: undefined,
  data: () => [],
  propsValue: undefined,
  placeholder: '',
  label: '',
  disabled: false,
  clearable: true,
  filterable: true,
  multiple: false,
  showCheckbox: false,
  checkStrictly: false,
  checkOnClickNode: false,
  defaultExpandAll: false,
  expandOnClickNode: false,
  renderAfterExpand: false,
  collapseTags: false,
  collapseTagsTooltip: true,
  maxCollapseTags: 5,
  popperClass: '',
  nodeKey: 'value',
  keyValue: 'value',
  labelValue: 'label',
  childrenValue: 'children',
  disabledValue: 'disabled',
  inputHeight: 40,
  isBorder: false,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedTreeSelectValue | ''): void
  (event: 'update:value', value: OutlinedTreeSelectValue | ''): void
  (event: 'change', value: OutlinedTreeSelectValue | ''): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'visible-change', value: boolean): void
  (event: 'clear'): void
}>()

const attrs = useAttrs()
const treeSelectRef = ref<any>(null)
const treeSelectValue = ref<OutlinedTreeSelectValue | ''>(normalizeTreeSelectValue(props.value, isArrayMode()))
const focused = ref(false)
const blurred = ref(false)
const visible = ref(false)

watch(
  () => [props.value, props.multiple, props.showCheckbox] as const,
  ([value]) => {
    treeSelectValue.value = normalizeTreeSelectValue(value, isArrayMode())
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)

const treeSelectAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const containerClasses = computed(() => ({
  'outlined-tree-select--bordered': props.isBorder
}))

const containerStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const treeSelectStyle = computed(() => ({
  minHeight: `${props.inputHeight}px`,
  height: isArrayMode() ? 'auto' : `${props.inputHeight}px`
}))

const resolvedTreeProps = computed(() => {
  if (props.propsValue) {
    return props.propsValue
  }

  return {
    value: props.keyValue,
    label: props.labelValue,
    children: props.childrenValue,
    disabled: props.disabledValue
  }
})

const floatingLabel = computed(() => props.label || props.placeholder || '')

const hasContent = computed(() => {
  if (isArrayMode()) {
    return Array.isArray(treeSelectValue.value) && treeSelectValue.value.length > 0
  }

  return hasFilledValue(treeSelectValue.value)
})

const labelClasses = computed(() => ({
  'outlined-tree-select__label--floating': focused.value || hasContent.value,
  'outlined-tree-select__label--placeholder': !focused.value && !hasContent.value,
  'outlined-tree-select__label--filled': hasContent.value && !focused.value
}))

function isArrayMode() {
  return props.multiple || props.showCheckbox
}

function handleModelValueUpdate(value: OutlinedTreeSelectValue) {
  const normalizedValue = normalizeTreeSelectValue(value, isArrayMode())
  treeSelectValue.value = normalizedValue
  emitModelValue(normalizedValue)
}

function handleChange(value: OutlinedTreeSelectValue) {
  const normalizedValue = normalizeTreeSelectValue(value, isArrayMode())
  treeSelectValue.value = normalizedValue
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
    emitModelValue(treeSelectValue.value)
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

function emitModelValue(value: OutlinedTreeSelectValue | '') {
  emit('input', value)
  emit('update:value', value)
}

function normalizeTreeSelectValue(
  value: OutlinedTreeSelectValue | undefined,
  arrayMode: boolean
): OutlinedTreeSelectValue | '' {
  if (arrayMode) {
    if (Array.isArray(value)) {
      return value
    }

    if (value === undefined || value === null || value === '') {
      return []
    }

    return [value as OutlinedTreeSelectOptionValue]
  }

  return value ?? ''
}

function hasFilledValue(value: unknown) {
  return value !== undefined && value !== null && String(value) !== ''
}

function toCssValue(value: OutlinedTreeSelectCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedTreeSelectExpose>({
  focus: () => {
    treeSelectRef.value?.focus?.()
  },
  blur: () => {
    treeSelectRef.value?.blur?.()
  },
  clear: () => {
    if (isArrayMode()) {
      treeSelectValue.value = []
      emitModelValue([])
      emit('change', [])
      emit('clear')
      return
    }

    treeSelectValue.value = ''
    emitModelValue('')
    emit('change', '')
    emit('clear')
  },
  getTreeSelectRef: () => treeSelectRef.value
})
</script>

<style scoped>
.outlined-tree-select {
  position: relative;
}

.outlined-tree-select__label {
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

.outlined-tree-select__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-tree-select__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-tree-select__label--filled {
  color: var(--el-text-color-regular);
}

:deep(.outlined-tree-select__control.el-select) {
  width: 100%;
}

:deep(.outlined-tree-select__control .el-select__wrapper) {
  min-height: inherit;
  height: inherit;
}

:deep(.outlined-tree-select__control .el-select__selection) {
  min-height: inherit;
}

:deep(.outlined-tree-select__control .el-select__tags) {
  padding-top: 4px;
}

:deep(.outlined-tree-select--bordered .el-select__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-tree-select--bordered .el-select__wrapper.is-focused) {
  border-bottom-color: var(--el-color-primary);
}
</style>
