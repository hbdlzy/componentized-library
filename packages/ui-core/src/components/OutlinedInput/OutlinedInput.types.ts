export type OutlinedInputValue = string | number

export type OutlinedInputCssValue = string | number

export interface OutlinedInputProps {
  value?: OutlinedInputValue
  disabled?: boolean
  regex?: RegExp
  placeholder?: string
  label?: string
  maxlength?: string | number
  max?: string | number
  min?: string | number
  typeInput?: string
  showPassword?: boolean
  isNumber?: boolean
  inputHeight?: number
  isBorder?: boolean
  suffixText?: string
  clearable?: boolean
  showWordLimit?: boolean
  marginBottom?: OutlinedInputCssValue
  paddingTop?: OutlinedInputCssValue
}

export interface OutlinedInputExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  select: () => void
  getInputRef: () => unknown | null
}
