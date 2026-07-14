import type { App, Component, Plugin } from 'vue'
import { installRipple } from './ripple'
import BaseCard from './components/BaseCard'
import BaseTable from './components/BaseTable'
import BaseEChart from './components/BaseEChart'
import BaseExportButton from './components/BaseExportButton'
import SvgIcon from './components/SvgIcon'
import OutlinedInput from './components/OutlinedInput'
import OutlinedSelect from './components/OutlinedSelect'
import OutlinedDatePicker from './components/OutlinedDatePicker'
import OutlinedDateTimePicker from './components/OutlinedDateTimePicker'
import OutlinedTimePicker from './components/OutlinedTimePicker'
import OutlinedCascader from './components/OutlinedCascader'
import OutlinedTreeSelect from './components/OutlinedTreeSelect'

installRipple()

const componentEntries: Array<[string, Component]> = [
  ['BaseCard', BaseCard],
  ['BaseTable', BaseTable],
  ['BaseEChart', BaseEChart],
  ['BaseExportButton', BaseExportButton],
  ['SvgIcon', SvgIcon],
  ['OutlinedInput', OutlinedInput],
  ['OutlinedSelect', OutlinedSelect],
  ['OutlinedDatePicker', OutlinedDatePicker],
  ['OutlinedDateTimePicker', OutlinedDateTimePicker],
  ['OutlinedTimePicker', OutlinedTimePicker],
  ['OutlinedCascader', OutlinedCascader],
  ['OutlinedTreeSelect', OutlinedTreeSelect]
]

export const uiCoreComponents = componentEntries.map(([name, component]) => ({
  name,
  component
}))

export function installUiCore(app: App) {
  componentEntries.forEach(([name, component]) => {
    app.component(name, component)
  })

  installRipple(app)
}

export const HbdlUICore: Plugin = {
  install: installUiCore
}

export default HbdlUICore

declare module 'vue' {
  export interface GlobalComponents {
    BaseCard: typeof BaseCard
    BaseTable: typeof BaseTable
    BaseEChart: typeof BaseEChart
    BaseExportButton: typeof BaseExportButton
    SvgIcon: typeof SvgIcon
    OutlinedInput: typeof OutlinedInput
    OutlinedSelect: typeof OutlinedSelect
    OutlinedDatePicker: typeof OutlinedDatePicker
    OutlinedDateTimePicker: typeof OutlinedDateTimePicker
    OutlinedTimePicker: typeof OutlinedTimePicker
    OutlinedCascader: typeof OutlinedCascader
    OutlinedTreeSelect: typeof OutlinedTreeSelect
  }
}

export { echarts } from './echarts'
export type {
  EChartInitOptions,
  EChartInstance,
  EChartLoadingOptions,
  EChartOption,
  EChartResizeOptions,
  EChartSetOptionOptions
} from './echarts'
export { BaseCard }
export * from './components/BaseCard'
export { BaseTable }
export * from './components/BaseTable'
export { BaseEChart }
export * from './components/BaseEChart'
export { BaseExportButton }
export * from './components/BaseExportButton'
export { SvgIcon }
export * from './components/SvgIcon'
export { OutlinedInput }
export * from './components/OutlinedInput'
export { OutlinedSelect }
export * from './components/OutlinedSelect'
export { OutlinedDatePicker }
export * from './components/OutlinedDatePicker'
export { OutlinedDateTimePicker }
export * from './components/OutlinedDateTimePicker'
export { OutlinedTimePicker }
export * from './components/OutlinedTimePicker'
export { OutlinedCascader }
export * from './components/OutlinedCascader'
export { OutlinedTreeSelect }
export * from './components/OutlinedTreeSelect'
export { exportExcel } from './excel/exportExcel'
export type { ExcelCellValue, ExcelExportColumn, ExcelExportOptions } from './excel/exportExcel'
export { Ripple, installRipple, uninstallRipple } from './ripple'
export type { RipplePlugin, RippleTeardown } from './ripple'
