export type OutlinedTreeSelectCssValue = string | number

export type OutlinedTreeSelectOptionValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | null

export type OutlinedTreeSelectValue = OutlinedTreeSelectOptionValue | OutlinedTreeSelectOptionValue[]

export interface OutlinedTreeSelectNode {
  label?: string
  value?: OutlinedTreeSelectOptionValue
  children?: OutlinedTreeSelectNode[]
  disabled?: boolean
  [key: string]: unknown
}

export interface OutlinedTreeSelectProps {
  value?: OutlinedTreeSelectValue
  data?: OutlinedTreeSelectNode[]
  propsValue?: Record<string, unknown>
  placeholder?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  showCheckbox?: boolean
  checkStrictly?: boolean
  checkOnClickNode?: boolean
  defaultExpandAll?: boolean
  expandOnClickNode?: boolean
  renderAfterExpand?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  maxCollapseTags?: number
  popperClass?: string
  nodeKey?: string
  keyValue?: string
  labelValue?: string
  childrenValue?: string
  disabledValue?: string
  inputHeight?: number
  isBorder?: boolean
  marginBottom?: OutlinedTreeSelectCssValue
  paddingTop?: OutlinedTreeSelectCssValue
}

export interface OutlinedTreeSelectExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  getTreeSelectRef: () => unknown | null
}
