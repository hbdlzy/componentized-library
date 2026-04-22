export type OutlinedDateTimePickerCssValue = string | number

export type OutlinedDateTimePickerValue = string

export type OutlinedDateTimePickerDisabledDate =
  | string
  | number
  | Date
  | ((date: Date) => boolean)

export interface OutlinedDateTimePickerProps {
  value?: OutlinedDateTimePickerValue
  placeholder?: string
  label?: string
  inputHeight?: number
  isBorder?: boolean
  disabledDate?: OutlinedDateTimePickerDisabledDate
  separatorText?: string
  timePlaceholder?: string
  clearable?: boolean
  marginBottom?: OutlinedDateTimePickerCssValue
  paddingTop?: OutlinedDateTimePickerCssValue
}

export interface OutlinedDateTimePickerExpose {
  focusDate: () => void
  focusTime: () => void
  blurDate: () => void
  blurTime: () => void
  openDatePanel: () => void
  openTimePanel: () => void
  getDatePickerRef: () => unknown | null
  getTimePickerRef: () => unknown | null
}
