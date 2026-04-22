export type OutlinedSelectCssValue = string | number

export type OutlinedSelectOptionValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | null

export type OutlinedSelectValue = OutlinedSelectOptionValue | OutlinedSelectOptionValue[]

export interface OutlinedSelectOption {
  label?: string
  value?: OutlinedSelectOptionValue
  disabled?: boolean
  [key: string]: unknown
}

export interface OutlinedSelectProps {
  value?: OutlinedSelectValue
  options?: OutlinedSelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
  typeInput?: string
  showPassword?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  filterable?: boolean
  clearable?: boolean
  multiple?: boolean
  inputHeight?: number
  isBorder?: boolean
  keyValue?: string
  labelValue?: string
  noCheck?: boolean
  maxCollapseTags?: number
  marginBottom?: OutlinedSelectCssValue
  paddingTop?: OutlinedSelectCssValue
}

export interface OutlinedSelectExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  toggleMenu: () => void
  getSelectRef: () => unknown | null
}
