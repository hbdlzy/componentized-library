export type OutlinedTimePickerCssValue = string | number

export type OutlinedTimePickerValue =
  | string
  | number
  | Date
  | Array<string | number | Date>
  | null

export interface OutlinedTimePickerProps {
  value?: OutlinedTimePickerValue
  placeholder?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  isRange?: boolean
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  format?: string
  valueFormat?: string
  arrowControl?: boolean
  inputHeight?: number
  isBorder?: boolean
  marginBottom?: OutlinedTimePickerCssValue
  paddingTop?: OutlinedTimePickerCssValue
}

export interface OutlinedTimePickerExpose {
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
  clear: () => void
  getPickerRef: () => unknown | null
}
