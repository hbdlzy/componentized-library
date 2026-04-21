export type BaseTableCssValue = string | number
export type BaseTableAlign = 'left' | 'center' | 'right'
export type BaseTableColumnKind = 'text' | 'link' | 'actions' | 'image' | 'tag' | 'html' | 'input'
export type BaseTableSortOrder = 'ascending' | 'descending' | null
export type BaseTableSortDirection = string | null

export interface BaseTableOption {
  label: string
  value: string | number | boolean
  tagType?: '' | 'success' | 'warning' | 'info' | 'danger' | 'primary'
  color?: string
}

export interface BaseTableAction<Row = Record<string, any>> {
  label: string
  type: string
  buttonType?: '' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  disabled?: boolean | ((row: Row) => boolean)
  visible?: boolean | ((row: Row) => boolean)
}

export interface BaseTableColumn<Row = Record<string, any>> {
  label: string
  prop?: keyof Row | string
  kind?: BaseTableColumnKind
  type?: string
  width?: BaseTableCssValue
  minWidth?: BaseTableCssValue
  align?: BaseTableAlign
  headerAlign?: BaseTableAlign
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean | 'custom'
  sortField?: string
  showOverflowTooltip?: boolean
  className?: string
  headerClassName?: string
  actions?: BaseTableAction<Row>[]
  clickable?: boolean
  options?: BaseTableOption[]
  optionValueKey?: string
  optionLabelKey?: string
  optionTagTypeKey?: string
  emptyText?: string
  inputType?: string
  imageFit?: '' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  imageWidth?: BaseTableCssValue
  imageHeight?: BaseTableCssValue
  slotName?: string
  headerSlotName?: string
  formatter?: (row: Row, column: BaseTableColumn<Row>) => unknown
  html?: (row: Row, column: BaseTableColumn<Row>) => string
  clickHandler?: (row: Row, column: BaseTableColumn<Row>) => void
  inputHandler?: (value: string, row: Row, column: BaseTableColumn<Row>) => void
}

export interface BaseTablePagination {
  currentPage: number
  pageSize: number
  total: number
  pageSizes: number[]
}

export interface BaseTableRequestParams {
  currentPage: number
  pageSize: number
  [key: string]: unknown
}

export interface BaseTableSortState {
  prop?: string
  order: BaseTableSortOrder
}

export interface BaseTableSortOrderMap {
  ascending: string
  descending: string
}

export interface BaseTableRequestResult<Row = Record<string, any>> {
  records?: Row[]
  list?: Row[]
  items?: Row[]
  total?: number
  data?: {
    records?: Row[]
    list?: Row[]
    items?: Row[]
    total?: number
  }
}

export interface BaseTableNormalizedResult<Row = Record<string, any>> {
  rows?: Row[]
  total?: number
}

export type BaseTableRequestHandler<Row = Record<string, any>> = (
  params: BaseTableRequestParams
) => Promise<BaseTableRequestResult<Row> | Row[]>

export type BaseTableResultAdapter<Row = Record<string, any>> = (
  result: unknown,
  params: BaseTableRequestParams
) => BaseTableNormalizedResult<Row>

export interface BaseTableProps<Row = Record<string, any>> {
  columns: BaseTableColumn<Row>[]
  data?: Row[]
  request?: BaseTableRequestHandler<Row>
  requestParams?: Record<string, unknown>
  resultAdapter?: BaseTableResultAdapter<Row>
  autoLoad?: boolean
  reloadOnParamsChange?: boolean
  reloadOnSortChange?: boolean
  rowKey?: string
  height?: BaseTableCssValue
  border?: boolean
  stripe?: boolean
  showToolbar?: boolean
  showPagination?: boolean
  hasSelection?: boolean
  hasIndex?: boolean
  indexLabel?: string
  indexWidth?: BaseTableCssValue
  selectionWidth?: BaseTableCssValue
  rowSelectable?: (row: Row, index: number) => boolean
  pagination?: Partial<BaseTablePagination>
  currentPageKey?: string
  pageSizeKey?: string
  defaultSort?: BaseTableSortState
  sortFieldKey?: string
  sortOrderKey?: string
  sortOrderMap?: BaseTableSortOrderMap
  sortMapper?: (payload: BaseTableSortPayload<Row>) => Record<string, unknown> | void
  emptyText?: string
  loadingText?: string
}

export interface BaseTableSortPayload<Row = Record<string, any>> {
  column: BaseTableColumn<Row> | undefined
  prop?: string
  order: BaseTableSortOrder
  field?: string
  direction: BaseTableSortDirection
}

export interface BaseTableRowActionPayload<Row = Record<string, any>> {
  row: Row
  action: BaseTableAction<Row>
  column: BaseTableColumn<Row>
}

export interface BaseTableCellPayload<Row = Record<string, any>> {
  row: Row
  column: BaseTableColumn<Row>
  value: unknown
}

export interface BaseTableLoadedPayload<Row = Record<string, any>> {
  rows: Row[]
  total: number
  params: BaseTableRequestParams
}

export interface BaseTableExpose<Row = Record<string, any>> {
  load: (data?: Row[]) => Promise<void>
  refresh: () => Promise<void>
  setData: (data: Row[]) => void
  resetPage: () => Promise<void>
  clearSelection: () => void
  toggleRowSelection: (row: Row, selected?: boolean) => void
  getSelectionRows: () => Row[]
  getRows: () => Row[]
}
