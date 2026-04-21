import type {
  EChartInitOptions,
  EChartInstance,
  EChartLoadingOptions,
  EChartOption,
  EChartResizeOptions,
  EChartSetOptionOptions
} from '../../echarts'

export interface BaseEChartProps {
  option?: EChartOption
  theme?: string | Record<string, unknown>
  initOptions?: EChartInitOptions
  setOptionOptions?: boolean | EChartSetOptionOptions
  loading?: boolean
  loadingOptions?: EChartLoadingOptions
  autoResize?: boolean
  useDefaultColors?: boolean
  colorStorageKey?: string
  defaultColors?: string[]
  group?: string
}

export interface BaseEChartExpose {
  getInstance: () => EChartInstance | null
  setOption: (option: EChartOption, setOptionOptions?: boolean | EChartSetOptionOptions) => EChartInstance | null
  resize: (resizeOptions?: EChartResizeOptions) => void
  dispatchAction: (payload: Record<string, unknown>) => void
  showLoading: (type?: string, loadingOptions?: EChartLoadingOptions) => void
  hideLoading: () => void
  clear: () => void
  dispose: () => void
  on: (eventName: string, handler: (...args: any[]) => void, context?: unknown) => void
  off: (eventName?: string, handler?: (...args: any[]) => void) => void
}
