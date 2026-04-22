<template>
  <div class="base-table">
    <div v-if="shouldRenderToolbar" class="base-table__toolbar">
      <div class="base-table__toolbar-left">
        <slot name="toolbar"></slot>
      </div>
      <div v-if="showPagination" class="base-table__toolbar-right">
        <el-pagination
          small
          background
          layout="total, prev, pager, next, sizes, jumper"
          :total="paginationState.total"
          :current-page="paginationState.currentPage"
          :page-size="paginationState.pageSize"
          :page-sizes="paginationState.pageSizes"
          :pager-count="5"
          :popper-append-to-body="false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="rows"
      :row-key="rowKey"
      :height="normalizedHeight"
      :border="border"
      :stripe="stripe"
      :default-sort="normalizedDefaultSort"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <template #empty>
        <el-empty :description="emptyText"></el-empty>
      </template>

      <el-table-column
        v-if="hasSelection"
        type="selection"
        :width="selectionWidth"
        align="center"
        :selectable="rowSelectable"
      />

      <el-table-column
        v-if="hasIndex"
        type="index"
        :label="indexLabel"
        :width="indexWidth"
        fixed="left"
        align="center"
      />

      <el-table-column
        v-for="column in columns"
        :key="getColumnKey(column)"
        :prop="getColumnProp(column)"
        :label="column.label"
        :type="column.type || undefined"
        :width="toCssValue(column.width)"
        :min-width="toCssValue(column.minWidth)"
        :fixed="column.fixed"
        :align="column.align || 'left'"
        :header-align="column.headerAlign || column.align || 'left'"
        :sortable="resolveColumnSortable(column)"
        :show-overflow-tooltip="column.showOverflowTooltip !== false"
        :class-name="column.className"
        :label-class-name="column.headerClassName"
      >
        <template v-if="hasHeaderSlot(column)" #header="headerScope">
          <slot :name="resolveHeaderSlotName(column)" v-bind="headerScope" :column-config="column"></slot>
        </template>

        <template v-else-if="shouldRenderBuiltInHeader(column)" #header>
          <div class="base-table__header">
            <span class="base-table__header-label">{{ column.label }}</span>

            <div class="base-table__header-actions">
              <el-dropdown
                :ref="bindHeaderSearchDropdown(column)"
                class="base-table__header-dropdown"
                trigger="click"
                :hide-on-click="false"
                placement="bottom"
                popper-class="base-table__header-search-dropdown"
              >
                <button
                  class="base-table__header-icon"
                  :class="{ 'is-active': hasHeaderSearchValue(column) }"
                  type="button"
                >
                  <span class="base-table__header-icon-mark" aria-hidden="true"></span>
                </button>

                <template #dropdown>
                  <el-dropdown-menu class="base-table__header-search-menu">
                    <div
                      class="base-table__header-search-panel"
                      :style="{ width: toCssValue(getHeaderSearchWidth(column)) || '280px' }"
                      @click.stop
                    >
                      <el-input
                        :model-value="getHeaderSearchValue(column)"
                        :placeholder="getHeaderSearchPlaceholder(column)"
                        clearable
                        @update:model-value="updateHeaderSearchValue(column, $event)"
                        @keyup.enter="handleHeaderSearch(column)"
                      />

                      <div class="base-table__header-search-footer">
                        <el-button link type="primary" @click="handleHeaderSearch(column)">
                          {{ getHeaderSearchSearchText(column) }}
                        </el-button>
                        <el-button link @click="handleHeaderSearchReset(column)">
                          {{ getHeaderSearchResetText(column) }}
                        </el-button>
                      </div>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>

        <template #default="scope">
          <slot
            v-if="hasCellSlot(column)"
            :name="resolveCellSlotName(column)"
            :row="scope.row"
            :column-config="column"
            :column-index="scope.$index"
            :value="getCellValue(scope.row, column)"
          ></slot>

          <template v-else>
            <div
              v-if="isActionColumn(column)"
              class="base-table__actions"
            >
              <el-button
                v-for="action in getVisibleActions(column, scope.row)"
                :key="`${action.type}-${action.label}`"
                link
                :type="action.buttonType || (action.type === 'delete' ? 'danger' : 'primary')"
                :disabled="isActionDisabled(action, scope.row)"
                @click="handleRowAction(scope.row, action, column)"
              >
                {{ action.label }}
              </el-button>
            </div>

            <el-image
              v-else-if="column.kind === 'image'"
              class="base-table__image"
              :style="getImageStyle(column)"
              :src="toImageSrc(getCellValue(scope.row, column))"
              :preview-src-list="getPreviewSrcList(scope.row, column)"
              :fit="column.imageFit || 'cover'"
            />

            <div v-else-if="column.kind === 'tag'" class="base-table__tags">
              <template v-if="getMatchedOptions(scope.row, column).length">
                <el-tag
                  v-for="option in getMatchedOptions(scope.row, column)"
                  :key="String(option.value)"
                  :type="option.tagType || 'info'"
                  :style="option.color ? { color: option.color, borderColor: `${option.color}33`, backgroundColor: `${option.color}1a` } : undefined"
                  size="small"
                >
                  {{ option.label }}
                </el-tag>
              </template>
              <span v-else>{{ resolveEmptyText(column) }}</span>
            </div>

            <div v-else-if="column.kind === 'html'" v-html="getHtmlContent(scope.row, column)"></div>

            <el-input
              v-else-if="column.kind === 'input'"
              :model-value="toDisplayValue(getCellValue(scope.row, column), '')"
              :type="column.inputType || 'text'"
              @update:model-value="handleInputChange($event, scope.row, column)"
            />

            <button
              v-else-if="isLinkColumn(column)"
              class="base-table__link"
              type="button"
              @click="handleCellClick(scope.row, column)"
            >
              {{ formatCellDisplay(scope.row, column) }}
            </button>

            <div v-else class="base-table__text">
              {{ formatCellDisplay(scope.row, column) }}
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'
import type { TableInstance } from 'element-plus'
import type {
  BaseTableAction,
  BaseTableCellPayload,
  BaseTableColumn,
  BaseTableCssValue,
  BaseTableExpose,
  BaseTableHeaderSearchConfig,
  BaseTableLoadedPayload,
  BaseTableOption,
  BaseTablePagination,
  BaseTableProps,
  BaseTableRequestParams,
  BaseTableRowActionPayload,
  BaseTableSortDirection,
  BaseTableSortOrder,
  BaseTableSortPayload
} from './BaseTable.types'

defineOptions({
  name: 'BaseTable'
})

type BaseTableRow = Record<string, any>

const props = withDefaults(defineProps<BaseTableProps>(), {
  data: () => [],
  requestParams: () => ({}),
  autoLoad: true,
  reloadOnParamsChange: true,
  reloadOnSortChange: true,
  rowKey: 'id',
  height: '100%',
  border: false,
  stripe: false,
  showToolbar: true,
  showPagination: true,
  hasSelection: false,
  hasIndex: false,
  indexLabel: '序号',
  indexWidth: 60,
  selectionWidth: 50,
  pagination: () => ({}),
  currentPageKey: 'pageNum',
  pageSizeKey: 'pageSize',
  defaultSort: () => ({
    prop: undefined,
    order: null
  }),
  sortFieldKey: 'sortField',
  sortOrderKey: 'sortOrder',
  sortOrderMap: () => ({
    ascending: 'asc',
    descending: 'desc'
  }),
  emptyText: '暂无数据',
  loadingText: '加载中...'
})

const emit = defineEmits<{
  (event: 'selection-change', rows: BaseTableRow[]): void
  (event: 'sort-change', payload: BaseTableSortPayload): void
  (event: 'row-action', payload: BaseTableRowActionPayload): void
  (event: 'cell-click', payload: BaseTableCellPayload): void
  (event: 'cell-input', payload: BaseTableCellPayload): void
  (event: 'page-change', currentPage: number): void
  (event: 'size-change', pageSize: number): void
  (event: 'update:pagination', pagination: BaseTablePagination): void
  (event: 'loaded', payload: BaseTableLoadedPayload): void
  (event: 'request-error', error: unknown): void
}>()

const slots = useSlots()
const tableRef = ref<TableInstance>()
const loading = ref(false)
const sourceRows = ref<BaseTableRow[]>(normalizeRows(props.data))
const rows = ref<BaseTableRow[]>(normalizeRows(props.data))
const selectionRows = ref<BaseTableRow[]>([])
const headerSearchValues = reactive<Record<string, string>>({})
const headerSearchDropdownRefs = ref<Record<string, { handleClose?: () => void }>>({})
const sortState = reactive({
  prop: props.defaultSort?.prop,
  order: props.defaultSort?.order || null
})
const paginationState = reactive<BaseTablePagination>({
  currentPage: 1,
  pageSize: 20,
  total: 0,
  pageSizes: [10, 20, 50, 100]
})

syncPagination(props.pagination)

const normalizedHeight = computed(() => toCssValue(props.height))
const shouldRenderToolbar = computed(() => props.showToolbar && (Boolean(slots.toolbar) || props.showPagination))
const normalizedDefaultSort = computed(() => {
  if (!sortState.prop || !sortState.order) {
    return undefined
  }

  return {
    prop: sortState.prop,
    order: sortState.order
  }
})

watch(
  () => props.data,
  (value) => {
    if (!props.request) {
      setData(value || [])
    }
  },
  { deep: true }
)

watch(
  () => props.pagination,
  (value) => {
    syncPagination(value)
  },
  { deep: true }
)

watch(
  () => props.requestParams,
  () => {
    if (props.request && props.reloadOnParamsChange && props.autoLoad) {
      paginationState.currentPage = 1
      void load()
    }
  },
  { deep: true }
)

watch(
  () => props.defaultSort,
  (value) => {
    sortState.prop = value?.prop
    sortState.order = value?.order || null
  },
  { deep: true }
)

onMounted(() => {
  if (props.request && props.autoLoad) {
    void load()
    return
  }

  if (!props.request) {
    setData(props.data || [])
  }
})

function syncPagination(value?: Partial<BaseTablePagination>) {
  const nextPageSizes = value?.pageSizes

  paginationState.currentPage = Number(value?.currentPage || paginationState.currentPage || 1)
  paginationState.pageSize = Number(value?.pageSize || paginationState.pageSize || 20)
  paginationState.total = Number(value?.total || value?.total === 0 ? value.total : paginationState.total || rows.value.length)
  paginationState.pageSizes = Array.isArray(nextPageSizes) && nextPageSizes.length
    ? [...nextPageSizes]
    : [...(paginationState.pageSizes.length ? paginationState.pageSizes : [10, 20, 50, 100])]
}

function emitPagination() {
  emit('update:pagination', {
    currentPage: paginationState.currentPage,
    pageSize: paginationState.pageSize,
    total: paginationState.total,
    pageSizes: [...paginationState.pageSizes]
  })
}

async function load(data?: BaseTableRow[]) {
  if (Array.isArray(data)) {
    setData(data)
    return
  }

  if (!props.request) {
    applyLocalRows()
    return
  }

  loading.value = true
  const requestParams = buildRequestParams()

  try {
    const result = await props.request(requestParams)
    const normalized = normalizeRequestResult(result, requestParams)
    rows.value = normalized.rows
    paginationState.total = normalized.total
    emitPagination()
    emit('loaded', {
      rows: [...rows.value],
      total: paginationState.total,
      params: requestParams
    })
  } catch (error) {
    rows.value = []
    paginationState.total = 0
    emitPagination()
    emit('request-error', error)
  } finally {
    loading.value = false
  }
}

async function refresh() {
  if (!props.request) {
    applyLocalRows()
    return
  }

  await load()
}

async function resetPage() {
  paginationState.currentPage = 1
  emitPagination()
  await load()
}

function setData(data: BaseTableRow[]) {
  sourceRows.value = normalizeRows(data)
  applyLocalRows()
}

function clearSelection() {
  tableRef.value?.clearSelection()
  selectionRows.value = []
}

function toggleRowSelection(row: BaseTableRow, selected?: boolean) {
  tableRef.value?.toggleRowSelection(row, selected)
}

function getSelectionRows() {
  return [...selectionRows.value]
}

function getRows() {
  return [...rows.value]
}

function handleSelectionChange(value: BaseTableRow[]) {
  selectionRows.value = value
  emit('selection-change', value)
}

function handleSortChange(payload: { prop?: string; order: BaseTableSortOrder }) {
  const column = props.columns.find((item) => String(item.prop || '') === String(payload.prop || ''))

  sortState.prop = payload.prop
  sortState.order = payload.order

  const sortPayload = buildSortPayload(column, payload.prop, payload.order)

  emit('sort-change', sortPayload)

  if (props.request && props.reloadOnSortChange) {
    paginationState.currentPage = 1
    emitPagination()
    void load()
  }
}

function handleCurrentChange(value: number) {
  paginationState.currentPage = value
  emitPagination()
  emit('page-change', value)
  if (props.request) {
    void load()
  }
}

function handleSizeChange(value: number) {
  paginationState.pageSize = value
  paginationState.currentPage = 1
  emitPagination()
  emit('size-change', value)
  if (props.request) {
    void load()
  }
}

function handleRowAction(row: BaseTableRow, action: BaseTableAction<BaseTableRow>, column: BaseTableColumn<BaseTableRow>) {
  emit('row-action', {
    row,
    action,
    column
  })
}

function handleCellClick(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  column.clickHandler?.(row, column)
  emit('cell-click', {
    row,
    column,
    value: getCellValue(row, column)
  })
}

function handleInputChange(value: string, row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  if (!column.prop) {
    return
  }

  row[column.prop] = value
  column.inputHandler?.(value, row, column)
  emit('cell-input', {
    row,
    column,
    value
  })
}

function shouldRenderBuiltInHeader(column: BaseTableColumn<BaseTableRow>) {
  return hasHeaderSearch(column)
}

function hasHeaderSearch(column: BaseTableColumn<BaseTableRow>) {
  return Boolean(getHeaderSearchConfig(column))
}

function getHeaderSearchConfig(column: BaseTableColumn<BaseTableRow>): BaseTableHeaderSearchConfig | null {
  if (!column.headerSearch) {
    return null
  }

  if (column.headerSearch === true) {
    return {}
  }

  return column.headerSearch
}

function getHeaderSearchStateKey(column: BaseTableColumn<BaseTableRow>) {
  return resolveHeaderSearchParamKey(column) || getColumnProp(column) || getColumnKey(column)
}

function setHeaderSearchDropdownRef(
  instance: { handleClose?: () => void } | null,
  column: BaseTableColumn<BaseTableRow>
) {
  const stateKey = getHeaderSearchStateKey(column)

  if (!instance) {
    delete headerSearchDropdownRefs.value[stateKey]
    return
  }

  headerSearchDropdownRefs.value[stateKey] = instance
}

function bindHeaderSearchDropdown(column: BaseTableColumn<BaseTableRow>) {
  return (instance: { handleClose?: () => void } | null) => {
    setHeaderSearchDropdownRef(instance, column)
  }
}

function resolveHeaderSearchParamKey(column: BaseTableColumn<BaseTableRow>) {
  const config = getHeaderSearchConfig(column)
  const legacyParamKey = (column as Record<string, any>).otherProps

  return config?.paramKey || legacyParamKey || getColumnProp(column) || ''
}

function getHeaderSearchValue(column: BaseTableColumn<BaseTableRow>) {
  return headerSearchValues[getHeaderSearchStateKey(column)] || ''
}

function hasHeaderSearchValue(column: BaseTableColumn<BaseTableRow>) {
  return Boolean(getHeaderSearchValue(column).trim())
}

function updateHeaderSearchValue(column: BaseTableColumn<BaseTableRow>, value: string) {
  headerSearchValues[getHeaderSearchStateKey(column)] = normalizeHeaderSearchValue(value)
}

function getHeaderSearchPlaceholder(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.placeholder || '请输入搜索内容'
}

function getHeaderSearchWidth(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.width || 280
}

function getHeaderSearchSearchText(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.searchText || '搜索'
}

function getHeaderSearchResetText(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.resetText || '重置'
}

async function handleHeaderSearch(column: BaseTableColumn<BaseTableRow>) {
  closeHeaderSearch(column)
  paginationState.currentPage = 1
  emitPagination()

  if (props.request) {
    await load()
    return
  }

  applyLocalRows()
}

async function handleHeaderSearchReset(column: BaseTableColumn<BaseTableRow>) {
  updateHeaderSearchValue(column, '')
  closeHeaderSearch(column)
  paginationState.currentPage = 1
  emitPagination()

  if (props.request) {
    await load()
    return
  }

  applyLocalRows()
}

function closeHeaderSearch(column: BaseTableColumn<BaseTableRow>) {
  headerSearchDropdownRefs.value[getHeaderSearchStateKey(column)]?.handleClose?.()
}

function buildHeaderSearchParams() {
  return props.columns.reduce<Record<string, unknown>>((result, column) => {
    if (!hasHeaderSearch(column)) {
      return result
    }

    const paramKey = resolveHeaderSearchParamKey(column)
    const value = getHeaderSearchValue(column).trim()

    if (!paramKey || !value) {
      return result
    }

    result[paramKey] = value
    return result
  }, {})
}

function applyLocalRows() {
  const filteredRows = filterLocalRows(sourceRows.value)
  rows.value = filteredRows
  paginationState.total = filteredRows.length
  emitPagination()
}

function filterLocalRows(data: BaseTableRow[]) {
  const activeColumns = props.columns
    .filter((column) => hasHeaderSearch(column) && hasHeaderSearchValue(column))
    .map((column) => ({
      column,
      keyword: getHeaderSearchValue(column).trim().toLowerCase()
    }))

  if (!activeColumns.length) {
    return normalizeRows(data)
  }

  return normalizeRows(data).filter((row) => {
    return activeColumns.every(({ column, keyword }) => {
      const columnProp = getColumnProp(column)
      if (!columnProp) {
        return true
      }

      const value = getCellValue(row, column)
      return toSearchableText(value).includes(keyword)
    })
  })
}

function normalizeHeaderSearchValue(value: unknown) {
  if (value === undefined || value === null) {
    return ''
  }

  return String(value)
}

function toSearchableText(value: unknown): string {
  if (value === undefined || value === null) {
    return ''
  }

  if (Array.isArray(value)) {
    return value.map((item) => toSearchableText(item)).join(' ').toLowerCase()
  }

  return String(value).toLowerCase()
}

function buildRequestParams(): BaseTableRequestParams {
  const params: BaseTableRequestParams = {
    ...props.requestParams,
    currentPage: paginationState.currentPage,
    pageSize: paginationState.pageSize,
    [props.currentPageKey]: paginationState.currentPage,
    [props.pageSizeKey]: paginationState.pageSize
  }

  const currentColumn = props.columns.find((item) => String(item.prop || '') === String(sortState.prop || ''))
  const sortPayload = buildSortPayload(currentColumn, sortState.prop, sortState.order)
  const headerSearchParams = buildHeaderSearchParams()
  const sortParams = buildSortParams(sortPayload)

  return {
    ...params,
    ...headerSearchParams,
    ...sortParams
  }
}

function normalizeRequestResult(result: unknown, requestParams: BaseTableRequestParams) {
  if (props.resultAdapter) {
    const adaptedResult = props.resultAdapter(result, requestParams)
    const adaptedRows = normalizeRows(adaptedResult?.rows)

    return {
      rows: adaptedRows,
      total: Number(adaptedResult?.total ?? adaptedRows.length)
    }
  }

  if (Array.isArray(result)) {
    return {
      rows: normalizeRows(result),
      total: result.length
    }
  }

  const payload = (result || {}) as Record<string, any>
  const container = payload.data && typeof payload.data === 'object' ? payload.data : payload
  const list = container.records || container.list || container.items || []
  const normalizedRows = normalizeRows(list)

  return {
    rows: normalizedRows,
    total: Number(container.total ?? normalizedRows.length)
  }
}

function normalizeRows(data?: BaseTableRow[]) {
  return Array.isArray(data) ? [...data] : []
}

function getColumnKey(column: BaseTableColumn<BaseTableRow>) {
  return String(column.prop || column.label)
}

function getColumnProp(column: BaseTableColumn<BaseTableRow>) {
  return column.prop ? String(column.prop) : undefined
}

function getCellValue(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  if (!column.prop) {
    return undefined
  }

  return row[column.prop]
}

function formatCellDisplay(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  if (column.formatter) {
    const formatted = column.formatter(row, column)
    return toDisplayValue(formatted, resolveEmptyText(column))
  }

  return toDisplayValue(getCellValue(row, column), resolveEmptyText(column))
}

function getHtmlContent(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  if (column.html) {
    return column.html(row, column)
  }

  const value = getCellValue(row, column)
  return value === undefined || value === null ? '' : String(value)
}

function isActionColumn(column: BaseTableColumn<BaseTableRow>) {
  return column.kind === 'actions' || Boolean(column.actions?.length)
}

function isLinkColumn(column: BaseTableColumn<BaseTableRow>) {
  return column.kind === 'link' || Boolean(column.clickable)
}

function getVisibleActions(column: BaseTableColumn<BaseTableRow>, row: BaseTableRow) {
  return (column.actions || []).filter((action) => {
    if (typeof action.visible === 'function') {
      return action.visible(row)
    }

    return action.visible !== false
  })
}

function isActionDisabled(action: BaseTableAction<BaseTableRow>, row: BaseTableRow) {
  if (typeof action.disabled === 'function') {
    return action.disabled(row)
  }

  return Boolean(action.disabled)
}

function resolveCellSlotName(column: BaseTableColumn<BaseTableRow>) {
  return column.slotName || (column.prop ? `cell-${String(column.prop)}` : '')
}

function resolveHeaderSlotName(column: BaseTableColumn<BaseTableRow>) {
  return column.headerSlotName || (column.prop ? `header-${String(column.prop)}` : '')
}

function hasCellSlot(column: BaseTableColumn<BaseTableRow>) {
  const slotName = resolveCellSlotName(column)
  return Boolean(slotName && slots[slotName])
}

function hasHeaderSlot(column: BaseTableColumn<BaseTableRow>) {
  const slotName = resolveHeaderSlotName(column)
  return Boolean(slotName && slots[slotName])
}

function getMatchedOptions(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  const value = getCellValue(row, column)
  const values = Array.isArray(value) ? value : [value]
  const valueKey = column.optionValueKey || 'value'
  const labelKey = column.optionLabelKey || 'label'
  const tagTypeKey = column.optionTagTypeKey || 'tagType'

  return values
    .filter((item) => item !== undefined && item !== null && item !== '')
    .map((item) => {
      const matched = (column.options || []).find((option) => (option as Record<string, any>)[valueKey] === item)
      if (!matched) {
        return {
          label: String(item),
          value: item,
          tagType: 'info'
        } as BaseTableOption
      }

      return {
        label: String((matched as Record<string, any>)[labelKey]),
        value: (matched as Record<string, any>)[valueKey],
        tagType: (matched as Record<string, any>)[tagTypeKey],
        color: (matched as Record<string, any>).color
      } as BaseTableOption
    })
}

function getImageStyle(column: BaseTableColumn<BaseTableRow>) {
  return {
    width: toCssValue(column.imageWidth || 50),
    height: toCssValue(column.imageHeight || 50)
  }
}

function toImageSrc(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'url' in (value as Record<string, any>)) {
    return String((value as Record<string, any>).url || '')
  }

  return ''
}

function getPreviewSrcList(row: BaseTableRow, column: BaseTableColumn<BaseTableRow>) {
  const src = toImageSrc(getCellValue(row, column))
  return src ? [src] : []
}

function resolveEmptyText(column: BaseTableColumn<BaseTableRow>) {
  return column.emptyText || '--'
}

function resolveColumnSortable(column: BaseTableColumn<BaseTableRow>) {
  if (!props.request) {
    return column.sortable || false
  }

  if (column.sortable === true) {
    return 'custom'
  }

  return column.sortable || false
}

function buildSortPayload(
  column: BaseTableColumn<BaseTableRow> | undefined,
  prop?: string,
  order: BaseTableSortOrder = null
): BaseTableSortPayload<BaseTableRow> {
  return {
    column,
    prop,
    order,
    field: resolveSortField(column, prop),
    direction: resolveSortDirection(order)
  }
}

function buildSortParams(payload: BaseTableSortPayload<BaseTableRow>) {
  if (!payload.field || !payload.direction) {
    return {}
  }

  const mappedParams = props.sortMapper?.(payload)
  if (mappedParams && typeof mappedParams === 'object') {
    return mappedParams
  }

  return {
    [props.sortFieldKey]: payload.field,
    [props.sortOrderKey]: payload.direction
  }
}

function resolveSortField(column: BaseTableColumn<BaseTableRow> | undefined, prop?: string) {
  return column?.sortField || prop
}

function resolveSortDirection(order: BaseTableSortOrder): BaseTableSortDirection {
  if (order === 'ascending') {
    return props.sortOrderMap.ascending as BaseTableSortDirection
  }

  if (order === 'descending') {
    return props.sortOrderMap.descending as BaseTableSortDirection
  }

  return null
}

function toDisplayValue(value: unknown, emptyText = '--') {
  if (value === 0) {
    return '0'
  }

  if (value === undefined || value === null || value === '') {
    return emptyText
  }

  return String(value)
}

function toCssValue(value?: BaseTableCssValue) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return typeof value === 'number' ? `${value}px` : value
}

function findHeaderSearchColumn(key: string) {
  return props.columns.find((column) => {
    return getHeaderSearchStateKey(column) === key || getColumnProp(column) === key
  })
}

async function setHeaderSearchValue(key: string, value: string, shouldReload = true) {
  const matchedColumn = findHeaderSearchColumn(key)
  const stateKey = matchedColumn ? getHeaderSearchStateKey(matchedColumn) : key

  headerSearchValues[stateKey] = normalizeHeaderSearchValue(value)

  if (!shouldReload) {
    return
  }

  if (matchedColumn) {
    await handleHeaderSearch(matchedColumn)
    return
  }

  paginationState.currentPage = 1
  emitPagination()
  if (props.request) {
    await load()
    return
  }

  applyLocalRows()
}

async function resetHeaderSearch(key?: string) {
  if (key) {
    const matchedColumn = findHeaderSearchColumn(key)
    if (matchedColumn) {
      await handleHeaderSearchReset(matchedColumn)
      return
    }

    delete headerSearchValues[key]
  } else {
    Object.keys(headerSearchValues).forEach((stateKey) => {
      delete headerSearchValues[stateKey]
    })
    Object.keys(headerSearchDropdownRefs.value).forEach((stateKey) => {
      headerSearchDropdownRefs.value[stateKey]?.handleClose?.()
    })
  }

  paginationState.currentPage = 1
  emitPagination()

  if (props.request) {
    await load()
    return
  }

  applyLocalRows()
}

function getHeaderSearchValues() {
  return { ...headerSearchValues }
}

defineExpose<BaseTableExpose>({
  load,
  refresh,
  setData,
  resetPage,
  setHeaderSearchValue,
  resetHeaderSearch,
  getHeaderSearchValues,
  clearSelection,
  toggleRowSelection,
  getSelectionRows,
  getRows
})
</script>

<style scoped>
.base-table {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.base-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  min-height: 32px;
  flex-wrap: wrap;
}

.base-table__toolbar-left {
  flex: 1 1 auto;
  min-width: 0;
}

.base-table__toolbar-right {
  flex: 0 1 auto;
}

.base-table__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.base-table__header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.base-table__header-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;
}

.base-table__header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.base-table__header-icon:hover,
.base-table__header-icon.is-active {
  color: var(--el-color-primary);
  background: rgba(64, 158, 255, 0.12);
}

.base-table__header-icon-mark {
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.base-table__header-icon-mark::after {
  content: '';
  position: absolute;
  right: -6px;
  bottom: -4px;
  width: 7px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transform: rotate(45deg);
  transform-origin: center;
}

.base-table__header-dropdown {
  display: inline-flex;
  align-items: center;
}

.base-table__header-search-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
}

:deep(.base-table__header-search-menu) {
  padding: 0;
}

:deep(.base-table__header-search-dropdown) {
  padding: 0;
  border-radius: 12px;
}

.base-table__header-search-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.base-table__link {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--el-color-primary);
  cursor: pointer;
}

.base-table__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-table__tags {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.base-table__image {
  border-radius: 4px;
  overflow: hidden;
}
</style>
