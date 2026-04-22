<template>
  <div
    class="outlined-date-time-picker"
    :class="[rootClass]"
    :style="rootStyle"
  >
    <div
      class="outlined-date-time-picker__field"
      :class="fieldClasses"
      :style="fieldStyle"
    >
      <el-date-picker
        ref="datePickerRef"
        class="outlined-date-time-picker__control"
        :model-value="dateValue"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled-date="resolvedDisabledDate"
        :style="controlStyle"
        @update:model-value="handleDateUpdate"
        @focus="handleFocus('date')"
        @blur="handleBlur('date', $event)"
        @change="handleDateChange"
        @visible-change="handleVisibleChange('date', $event)"
      />

      <div
        v-if="floatingLabel"
        class="outlined-date-time-picker__label"
        :class="dateLabelClasses"
      >
        {{ floatingLabel }}
      </div>
    </div>

    <span class="outlined-date-time-picker__separator">{{ separatorText }}</span>

    <div
      class="outlined-date-time-picker__field"
      :class="fieldClasses"
      :style="fieldStyle"
    >
      <el-time-picker
        ref="timePickerRef"
        class="outlined-date-time-picker__control"
        :model-value="timeValue"
        format="HH:mm"
        value-format="HH:mm"
        :placeholder="timePlaceholder"
        :clearable="clearable"
        :disabled="!dateValue"
        :disabled-hours="resolvedDisabledHours"
        :disabled-minutes="resolvedDisabledMinutes"
        :style="controlStyle"
        @update:model-value="handleTimeUpdate"
        @focus="handleFocus('time')"
        @blur="handleBlur('time', $event)"
        @change="handleTimeChange"
        @visible-change="handleVisibleChange('time', $event)"
      />

      <div
        class="outlined-date-time-picker__label"
        :class="timeLabelClasses"
      >
        {{ timePlaceholder }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import dayjs from 'dayjs'
import type {
  OutlinedDateTimePickerCssValue,
  OutlinedDateTimePickerDisabledDate,
  OutlinedDateTimePickerExpose,
  OutlinedDateTimePickerProps,
  OutlinedDateTimePickerValue
} from './OutlinedDateTimePicker.types'

defineOptions({
  name: 'OutlinedDateTimePicker',
  inheritAttrs: false
})

const props = withDefaults(defineProps<OutlinedDateTimePickerProps>(), {
  value: '',
  placeholder: '',
  label: '',
  inputHeight: 40,
  isBorder: false,
  disabledDate: undefined,
  separatorText: '-',
  timePlaceholder: '时间',
  clearable: false,
  marginBottom: 20,
  paddingTop: 20
})

const emit = defineEmits<{
  (event: 'input', value: OutlinedDateTimePickerValue): void
  (event: 'update:value', value: OutlinedDateTimePickerValue): void
  (event: 'change', value: OutlinedDateTimePickerValue): void
  (event: 'focus', payload: { field: 'date' | 'time'; event: FocusEvent }): void
  (event: 'blur', payload: { field: 'date' | 'time'; event: FocusEvent }): void
  (event: 'visible-change', payload: { field: 'date' | 'time'; visible: boolean }): void
}>()

const attrs = useAttrs()
const datePickerRef = ref<any>(null)
const timePickerRef = ref<any>(null)
const dateValue = ref<string | null>(null)
const timeValue = ref<string | null>(null)
const dateFocused = ref(false)
const timeFocused = ref(false)
const dateBlurred = ref(false)
const timeBlurred = ref(false)
const dateVisible = ref(false)
const timeVisible = ref(false)

watch(
  () => props.value,
  (value) => {
    syncFromValue(value)
  },
  { immediate: true }
)

const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)
const floatingLabel = computed(() => props.label || props.placeholder || '')

const fieldClasses = computed(() => ({
  'outlined-date-time-picker__field--bordered': props.isBorder
}))

const fieldStyle = computed(() => ({
  marginBottom: toCssValue(props.marginBottom),
  paddingTop: toCssValue(props.paddingTop)
}))

const controlStyle = computed(() => ({
  height: `${props.inputHeight}px`
}))

const resolvedDisabledDate = computed(() => createDisabledDateHandler(props.disabledDate))

const resolvedDisabledHours = computed(() => {
  if (!shouldLimitCurrentTime()) {
    return undefined
  }

  return () => {
    const hours = new Date().getHours()
    return Array.from({ length: hours }, (_, index) => index)
  }
})

const resolvedDisabledMinutes = computed(() => {
  if (!shouldLimitCurrentTime()) {
    return undefined
  }

  return () => {
    const minutes = new Date().getMinutes()
    return Array.from({ length: minutes }, (_, index) => index)
  }
})

const dateLabelClasses = computed(() => ({
  'outlined-date-time-picker__label--floating': dateFocused.value || Boolean(dateValue.value),
  'outlined-date-time-picker__label--placeholder': !dateFocused.value && !dateValue.value,
  'outlined-date-time-picker__label--filled': Boolean(dateValue.value) && !dateFocused.value
}))

const timeLabelClasses = computed(() => ({
  'outlined-date-time-picker__label--floating': timeFocused.value || Boolean(timeValue.value),
  'outlined-date-time-picker__label--placeholder': !timeFocused.value && !timeValue.value,
  'outlined-date-time-picker__label--filled': Boolean(timeValue.value) && !timeFocused.value
}))

function syncFromValue(value: OutlinedDateTimePickerValue) {
  if (!value) {
    dateValue.value = null
    timeValue.value = null
    return
  }

  const [datePart, timePart] = value.split(' ')
  dateValue.value = datePart || null
  timeValue.value = timePart || null
}

function handleDateUpdate(value: string | null) {
  dateValue.value = value || null
}

function handleTimeUpdate(value: string | null) {
  timeValue.value = value || null
}

function handleDateChange() {
  if (dateValue.value && !timeValue.value) {
    timeValue.value = dayjs().format('HH:mm')
  }

  emitCombinedValue()
}

function handleTimeChange() {
  emitCombinedValue()
}

function handleFocus(field: 'date' | 'time') {
  return (event: FocusEvent) => {
    if (field === 'date') {
      dateBlurred.value = false
      dateFocused.value = true
    } else {
      timeBlurred.value = false
      timeFocused.value = true
    }

    emit('focus', { field, event })
  }
}

function handleBlur(field: 'date' | 'time', event: FocusEvent) {
  if (field === 'date') {
    dateBlurred.value = true

    if (!dateVisible.value) {
      dateFocused.value = false
      emitCombinedValue()
    }
  } else {
    timeBlurred.value = true

    if (!timeVisible.value) {
      timeFocused.value = false
      emitCombinedValue()
    }
  }

  emit('blur', { field, event })
}

function handleVisibleChange(field: 'date' | 'time', visible: boolean) {
  if (field === 'date') {
    dateVisible.value = visible

    if (!visible && dateBlurred.value) {
      dateFocused.value = false
    }
  } else {
    timeVisible.value = visible

    if (!visible && timeBlurred.value) {
      timeFocused.value = false
    }
  }

  emit('visible-change', { field, visible })
}

function emitCombinedValue() {
  const value = dateValue.value && timeValue.value ? `${dateValue.value} ${timeValue.value}` : ''
  emit('input', value)
  emit('update:value', value)
  emit('change', value)
}

function createDisabledDateHandler(disabledDate: OutlinedDateTimePickerDisabledDate | undefined) {
  if (!disabledDate) {
    return undefined
  }

  if (typeof disabledDate === 'function') {
    return disabledDate
  }

  const boundary = normalizeBoundary(disabledDate)
  return (value: Date) => value.getTime() < boundary - 86400000
}

function normalizeBoundary(value: Exclude<OutlinedDateTimePickerDisabledDate, (date: Date) => boolean>) {
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
  return Boolean(props.disabledDate) && dateValue.value === dayjs().format('YYYY-MM-DD')
}

function toCssValue(value: OutlinedDateTimePickerCssValue | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

defineExpose<OutlinedDateTimePickerExpose>({
  focusDate: () => {
    datePickerRef.value?.focus?.()
  },
  focusTime: () => {
    timePickerRef.value?.focus?.()
  },
  blurDate: () => {
    datePickerRef.value?.blur?.()
  },
  blurTime: () => {
    timePickerRef.value?.blur?.()
  },
  openDatePanel: () => {
    datePickerRef.value?.handleOpen?.()
  },
  openTimePanel: () => {
    timePickerRef.value?.handleOpen?.()
  },
  getDatePickerRef: () => datePickerRef.value,
  getTimePickerRef: () => timePickerRef.value
})
</script>

<style scoped>
.outlined-date-time-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}

.outlined-date-time-picker__field {
  position: relative;
  flex: 1;
}

.outlined-date-time-picker__separator {
  flex: 0 0 auto;
  color: var(--el-text-color-regular);
}

.outlined-date-time-picker__label {
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

.outlined-date-time-picker__label--floating {
  top: 18px;
  z-index: 1;
  opacity: 1;
  transform: translate(14px, -6px) scale(1);
  color: var(--el-color-primary);
}

.outlined-date-time-picker__label--placeholder {
  top: 50%;
  left: 1px;
  z-index: -1;
  opacity: 0;
  transform: translate(14px, 6px) scale(1);
}

.outlined-date-time-picker__label--filled {
  color: var(--el-text-color-regular);
}

:deep(.outlined-date-time-picker__control.el-date-editor) {
  width: 100%;
}

:deep(.outlined-date-time-picker__control .el-input__wrapper) {
  position: relative;
  min-height: inherit;
  height: inherit;
}

:deep(.outlined-date-time-picker__control .el-input__prefix) {
  position: absolute;
  right: 0;
}

:deep(.outlined-date-time-picker__control .el-input__suffix) {
  position: absolute;
  right: 30px;
}

:deep(.outlined-date-time-picker__field--bordered .el-input__wrapper) {
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
}

:deep(.outlined-date-time-picker__field--bordered .el-input__wrapper.is-focus) {
  border-bottom-color: var(--el-color-primary);
}
</style>
