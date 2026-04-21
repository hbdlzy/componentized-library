<template>
  <div class="base-card" :style="cardStyles">
    <div v-if="shouldRenderHeader" class="base-card__header">
      <div class="base-card__header-left">
        <div v-if="hasTitleBlock" class="base-card__title-wrap">
          <span v-if="showTitleMarker" class="base-card__title-marker"></span>
          <slot v-if="$slots['title-label']" name="title-label"></slot>
          <h4 v-else class="base-card__title">{{ title }}</h4>
        </div>
        <slot name="title"></slot>
      </div>

      <div v-if="hasRightSection" class="base-card__header-right">
        <slot name="header-right"></slot>
        <span v-if="metaText" class="base-card__meta">{{ metaText }}</span>
        <button
          v-if="showExport"
          class="base-card__export"
          type="button"
          :disabled="exportDisabled"
          @click="handleExport"
        >
          {{ exportText }}
        </button>
      </div>
    </div>

    <div class="base-card__body">
      <div v-if="$slots.tip" class="base-card__tip">
        <slot name="tip"></slot>
      </div>
      <div class="base-card__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { BaseCardCssValue, BaseCardDefaultExportPayload, BaseCardProps } from './BaseCard.types'

defineOptions({
  name: 'BaseCard'
})

const props = withDefaults(defineProps<BaseCardProps>(), {
  title: '',
  metaText: '',
  showHeader: true,
  showRight: true,
  showTitleMarker: true,
  showExport: false,
  exportText: '导出',
  exportDisabled: false,
  padding: 20,
  radius: 8,
  borderColor: 'var(--border-color)',
  backgroundColor: 'var(--border-bg-color)',
  shadowColor: 'var(--border-projection)',
  headerGap: 16,
  headerMarginBottom: 20,
  leftGap: 16,
  rightGap: 16,
  titleColor: 'var(--el-text-color-primary)',
  titleSize: 18,
  titleWeight: 500,
  markerColor: 'var(--el-color-primary)',
  markerWidth: 4,
  markerHeight: 24,
  markerRadius: '0 4px 4px 0',
  markerGap: 10,
  metaColor: '#808080',
  metaSize: 16,
  exportColor: 'var(--el-color-primary)'
})

const emit = defineEmits<{
  (event: 'export', payload?: unknown): void
}>()

const slots = useSlots()

const hasTitleBlock = computed(() => Boolean(props.title) || Boolean(slots['title-label']))
const hasTitleExtra = computed(() => Boolean(slots.title))
const hasRightExtra = computed(() => Boolean(slots['header-right']))

const hasRightSection = computed(
  () => props.showRight && (hasRightExtra.value || Boolean(props.metaText) || props.showExport)
)

const shouldRenderHeader = computed(
  () => props.showHeader && (hasTitleBlock.value || hasTitleExtra.value || hasRightSection.value)
)

const defaultExportPayload = computed<BaseCardDefaultExportPayload>(() => ({
  title: props.title || undefined,
  metaText: props.metaText || undefined
}))

const cardStyles = computed<Record<string, string | undefined>>(() => ({
  '--base-card-padding': toCssValue(props.padding),
  '--base-card-radius': toCssValue(props.radius),
  '--base-card-border-color': props.borderColor,
  '--base-card-background-color': props.backgroundColor,
  '--base-card-shadow-color': props.shadowColor,
  '--base-card-header-gap': toCssValue(props.headerGap),
  '--base-card-header-margin-bottom': toCssValue(props.headerMarginBottom),
  '--base-card-left-gap': toCssValue(props.leftGap),
  '--base-card-right-gap': toCssValue(props.rightGap),
  '--base-card-title-color': props.titleColor,
  '--base-card-title-size': toCssValue(props.titleSize),
  '--base-card-title-weight': toTextValue(props.titleWeight),
  '--base-card-marker-color': props.markerColor,
  '--base-card-marker-width': toCssValue(props.markerWidth),
  '--base-card-marker-height': toCssValue(props.markerHeight),
  '--base-card-marker-radius': toCssValue(props.markerRadius),
  '--base-card-marker-gap': toCssValue(props.markerGap),
  '--base-card-meta-color': props.metaColor,
  '--base-card-meta-size': toCssValue(props.metaSize),
  '--base-card-export-color': props.exportColor
}))

const handleExport = () => {
  emit('export', props.exportPayload === undefined ? defaultExportPayload.value : props.exportPayload)
}

function toCssValue(value?: BaseCardCssValue, unit = 'px') {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return typeof value === 'number' ? `${value}${unit}` : value
}

function toTextValue(value?: string | number) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return String(value)
}
</script>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: var(--base-card-padding);
  border: 1px solid var(--base-card-border-color);
  background: var(--base-card-background-color);
  box-shadow: 0 0 2px 0 var(--base-card-shadow-color);
  border-radius: var(--base-card-radius);
}

.base-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--base-card-header-gap);
  margin-bottom: var(--base-card-header-margin-bottom);
  min-height: 24px;
  flex-wrap: wrap;
}

.base-card__header-left,
.base-card__header-right {
  display: flex;
  align-items: center;
  min-width: 0;
  flex-wrap: wrap;
}

.base-card__header-left {
  flex: 1 1 auto;
  gap: var(--base-card-left-gap);
}

.base-card__header-right {
  flex: 0 1 auto;
  justify-content: flex-end;
  gap: var(--base-card-right-gap);
}

.base-card__title-wrap {
  display: flex;
  align-items: center;
  min-width: 0;
}

.base-card__title-marker {
  width: var(--base-card-marker-width);
  height: var(--base-card-marker-height);
  background: var(--base-card-marker-color);
  border-radius: var(--base-card-marker-radius);
  margin-right: var(--base-card-marker-gap);
  flex: 0 0 auto;
}

.base-card__title {
  margin: 0;
  min-width: 0;
  color: var(--base-card-title-color);
  font-size: var(--base-card-title-size);
  font-weight: var(--base-card-title-weight);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-card__meta {
  color: var(--base-card-meta-color);
  font-size: var(--base-card-meta-size);
  line-height: 1.4;
}

.base-card__export {
  border: none;
  background: transparent;
  padding: 0;
  color: var(--base-card-export-color);
  cursor: pointer;
  font-size: var(--base-card-meta-size);
  line-height: 1.4;
}

.base-card__export:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-card__body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
}

.base-card__tip {
  flex: 0 0 auto;
}

.base-card__content {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
