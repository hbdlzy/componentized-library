import * as echarts from 'echarts'
import type {
  ECharts,
  EChartsInitOpts,
  EChartsOption,
  ResizeOpts,
  SetOptionOpts
} from 'echarts'

export type EChartInstance = ECharts
export type EChartOption = EChartsOption
export type EChartInitOptions = EChartsInitOpts
export type EChartLoadingOptions = Parameters<ECharts['showLoading']>[1]
export type EChartResizeOptions = ResizeOpts
export type EChartSetOptionOptions = SetOptionOpts

export { echarts }
