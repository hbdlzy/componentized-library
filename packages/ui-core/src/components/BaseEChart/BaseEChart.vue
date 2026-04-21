<template>
  <div ref="containerRef" class="base-echart">
    <div ref="chartRef" class="base-echart__inner"></div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { echarts } from '../../echarts'
import type {
  EChartInitOptions,
  EChartInstance,
  EChartLoadingOptions,
  EChartOption,
  EChartResizeOptions,
  EChartSetOptionOptions
} from '../../echarts'
import type { BaseEChartExpose, BaseEChartProps } from './BaseEChart.types'

const props = withDefaults(defineProps<BaseEChartProps>(), {
  option: () => ({}),
  initOptions: () => ({ renderer: 'canvas' } as EChartInitOptions),
  setOptionOptions: () => ({ notMerge: false, lazyUpdate: true } as EChartSetOptionOptions),
  loading: false,
  autoResize: true,
  useDefaultColors: true,
  colorStorageKey: 'echartsColor',
  defaultColors: () => [],
  group: undefined
})

const emit = defineEmits<{
  (event: 'ready', chart: EChartInstance): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef<EChartInstance | null>(null)

let resizeObserver: ResizeObserver | null = null
let resizeFrameId: number | null = null
let pendingResizeOptions: EChartResizeOptions | undefined

const cancelResizeFrame = () => {
  if (resizeFrameId !== null) {
    cancelAnimationFrame(resizeFrameId)
    resizeFrameId = null
  }
}

const getDefaultColors = () => {
  if (!props.useDefaultColors || typeof window === 'undefined') {
    return props.defaultColors
  }

  try {
    const raw = window.sessionStorage.getItem(props.colorStorageKey)
    const colors = raw ? (JSON.parse(raw) as string[]) : []
    return colors.length > 0 ? colors : props.defaultColors
  } catch {
    return props.defaultColors
  }
}

const normalizeOption = (option: EChartOption = {}) => {
  if (option.color) {
    return option
  }

  const colors = getDefaultColors()
  if (!colors || colors.length === 0) {
    return option
  }

  return {
    ...option,
    color: colors
  }
}

const createChart = () => {
  if (!chartRef.value) {
    return null
  }

  const existingChart = echarts.getInstanceByDom(chartRef.value)
  existingChart?.dispose()

  const instance = echarts.init(chartRef.value, props.theme, props.initOptions)
  if (props.group) {
    instance.group = props.group
  }

  chartInstance.value = instance
  emit('ready', instance)
  return instance
}

const getInstance = () => chartInstance.value

const ensureChart = () => chartInstance.value ?? createChart()

const setOption = (
  option: EChartOption,
  setOptionOptions: boolean | EChartSetOptionOptions = props.setOptionOptions
) => {
  const chart = ensureChart()
  if (!chart) {
    return null
  }

  const nextOption = normalizeOption(option)
  if (typeof setOptionOptions === 'boolean') {
    chart.setOption(nextOption, setOptionOptions)
  } else {
    chart.setOption(nextOption, setOptionOptions)
  }

  return chart
}

const showLoading = (type = 'default', loadingOptions?: EChartLoadingOptions) => {
  const chart = ensureChart()
  if (!chart) {
    return
  }

  chart.showLoading(type, loadingOptions)
}

const hideLoading = () => {
  chartInstance.value?.hideLoading()
}

const syncLoading = () => {
  if (props.loading) {
    showLoading('default', props.loadingOptions)
    return
  }

  hideLoading()
}

const resize = (resizeOptions?: EChartResizeOptions) => {
  pendingResizeOptions = resizeOptions
  cancelResizeFrame()

  resizeFrameId = requestAnimationFrame(() => {
    chartInstance.value?.resize(pendingResizeOptions)
    pendingResizeOptions = undefined
    resizeFrameId = null
  })
}

const handleWindowResize = () => {
  resize()
}

const stopAutoResize = () => {
  resizeObserver?.disconnect()
  resizeObserver = null
  window.removeEventListener('resize', handleWindowResize)
}

const startAutoResize = () => {
  stopAutoResize()

  if (!props.autoResize || !containerRef.value) {
    return
  }

  resizeObserver = new ResizeObserver(() => {
    resize()
  })
  resizeObserver.observe(containerRef.value)
  window.addEventListener('resize', handleWindowResize)
}

const clear = () => {
  chartInstance.value?.clear()
}

const disposeChart = () => {
  chartInstance.value?.dispose()
  chartInstance.value = null
}

const dispose = () => {
  disposeChart()
}

const dispatchAction = (payload: Record<string, unknown>) => {
  chartInstance.value?.dispatchAction(payload as never)
}

const on = (eventName: string, handler: (...args: any[]) => void, context?: unknown) => {
  const chart = ensureChart()
  chart?.on(eventName, handler, context)
}

const off = (eventName?: string, handler?: (...args: any[]) => void) => {
  if (!chartInstance.value) {
    return
  }

  if (!eventName) {
    chartInstance.value.off()
    return
  }

  if (handler) {
    chartInstance.value.off(eventName, handler)
    return
  }

  chartInstance.value.off(eventName)
}

const reinitChart = async () => {
  disposeChart()
  await nextTick()
  createChart()
  setOption(props.option)
  syncLoading()
  resize()
}

watch(
  () => props.option,
  option => {
    setOption(option)
  },
  { deep: true }
)

watch(
  () => props.loading,
  () => {
    syncLoading()
  }
)

watch(
  () => props.loadingOptions,
  () => {
    if (props.loading) {
      syncLoading()
    }
  },
  { deep: true }
)

watch(
  () => props.group,
  group => {
    if (!chartInstance.value) {
      return
    }

    chartInstance.value.group = group ?? ''
  }
)

watch(
  () => props.autoResize,
  async enabled => {
    stopAutoResize()
    if (enabled) {
      await nextTick()
      startAutoResize()
      resize()
    }
  }
)

watch(
  () => props.theme,
  () => {
    reinitChart()
  },
  { deep: true }
)

watch(
  () => props.initOptions,
  () => {
    reinitChart()
  },
  { deep: true }
)

onMounted(async () => {
  await nextTick()
  createChart()
  setOption(props.option)
  syncLoading()
  startAutoResize()
  resize()
})

onUnmounted(() => {
  stopAutoResize()
  cancelResizeFrame()
  disposeChart()
})

defineExpose<BaseEChartExpose>({
  getInstance,
  setOption,
  resize,
  dispatchAction,
  showLoading,
  hideLoading,
  clear,
  dispose,
  on,
  off
})
</script>

<style scoped>
.base-echart,
.base-echart__inner {
  width: 100%;
  height: 100%;
}
</style>
