export type OutlinedCascaderCssValue = string | number

export type OutlinedCascaderValue = Array<string | number>

export interface OutlinedCascaderProps {
  value?: OutlinedCascaderValue
  options?: Record<string, unknown>[]
  clearable?: boolean
  propsValue?: Record<string, unknown>
  placeholder?: string
  label?: string
  popperClass?: string
  disabled?: boolean
  inputHeight?: number
  isBorder?: boolean
  filterable?: boolean
  levels?: boolean
  marginBottom?: OutlinedCascaderCssValue
  paddingTop?: OutlinedCascaderCssValue
}

export interface OutlinedCascaderExpose {
  focus: () => void
  blur: () => void
  togglePopperVisible: () => void
  clear: () => void
  getCascaderRef: () => unknown | null
}
