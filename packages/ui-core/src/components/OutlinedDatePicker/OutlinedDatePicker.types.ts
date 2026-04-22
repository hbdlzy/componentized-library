export type OutlinedDatePickerCssValue = string | number

export type OutlinedDatePickerValue =
  | string
  | number
  | Date
  | Array<string | number | Date>
  | null

export type OutlinedDatePickerDisabledDate =
  | string
  | number
  | Date
  | ((date: Date) => boolean)

export interface OutlinedDatePickerProps {
  value?: OutlinedDatePickerValue
  placeholder?: string
  label?: string
  disabled?: boolean
  timeValue?: boolean
  typeDate?: string
  format?: string
  valueFormat?: string
  showPassword?: boolean
  multiple?: boolean
  inputHeight?: number
  isBorder?: boolean
  disabledDate?: OutlinedDatePickerDisabledDate
  marginBottom?: OutlinedDatePickerCssValue
  paddingTop?: OutlinedDatePickerCssValue
}

export interface OutlinedDatePickerExpose {
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
  getPickerRef: () => unknown | null
}
