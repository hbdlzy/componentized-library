<template>
  <div class="base-table">
    <svg class="base-table__svg-sprite" aria-hidden="true" focusable="false">
      <symbol :id="`${baseTableIconPrefix}-search`" viewBox="0 0 17.814 14.035">
        <path fill="currentColor" d="M172.218,201.2a5.254,5.254,0,1,0-1.057.786l2.85,3.721a.659.659,0,0,0,1.047-.8l-2.841-3.709Zm-7.7-3.8a4.056,4.056,0,1,1,4.055,4.044,4.054,4.054,0,0,1-4.055-4.044Zm-2.554-3.968h-3.954a.657.657,0,1,1,0-1.313h3.952a.657.657,0,1,1,0,1.313Zm-.159,8.751h-3.8a.656.656,0,1,1,0-1.312h3.793a.656.656,0,1,1,0,1.312Zm-.78-3.958h-3.016a.659.659,0,1,1,0-1.319h3.015a.659.659,0,1,1,0,1.319Zm4.246,7.929h-7.261a.659.659,0,0,1,0-1.319h7.261a.659.659,0,1,1,0,1.319Z" transform="translate(-157.354 -192.113)" />
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-search-y`" viewBox="0 0 17.814 14.035">
        <path fill="#0938f7" d="M172.218,201.2a5.254,5.254,0,1,0-1.057.786l2.85,3.721a.659.659,0,0,0,1.047-.8l-2.841-3.709Zm-7.7-3.8a4.056,4.056,0,1,1,4.055,4.044,4.054,4.054,0,0,1-4.055-4.044Zm-2.554-3.968h-3.954a.657.657,0,1,1,0-1.313h3.952a.657.657,0,1,1,0,1.313Zm-.159,8.751h-3.8a.656.656,0,1,1,0-1.312h3.793a.656.656,0,1,1,0,1.312Zm-.78-3.958h-3.016a.659.659,0,1,1,0-1.319h3.015a.659.659,0,1,1,0,1.319Zm4.246,7.929h-7.261a.659.659,0,0,1,0-1.319h7.261a.659.659,0,1,1,0,1.319Z" transform="translate(-157.354 -192.113)" />
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-select`" viewBox="0 0 16.04 12.653">
        <path fill="currentColor" d="M0,12.653V11.248H11.792v1.406ZM9.328,4.429H16.04l-3.356,3.8ZM0,7.029V5.624H7.823V7.029ZM0,1.406V0H14.5V1.406Z" />
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-select-y`" viewBox="0 0 16.04 12.653">
        <path fill="#0938f7" d="M0,12.653V11.248H11.792v1.406ZM9.328,4.429H16.04l-3.356,3.8ZM0,7.029V5.624H7.823V7.029ZM0,1.406V0H14.5V1.406Z" />
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-sort-none`" viewBox="0 0 15.351 16.031">
        <g transform="translate(-1299.19 -185.182)">
          <path fill="currentColor" d="M100.721,140.352l-3.679,3.679-3.679-3.679h2.944v-8.831h1.472v8.831h2.944Z" transform="translate(1213.82 57.182)" />
          <path fill="currentColor" d="M92.692,131.679H89.749v8.831H88.277v-8.831H85.333L89.013,128l3.679,3.679Z" transform="translate(1213.856 57.182)" />
        </g>
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-sort-up`" viewBox="0 0 15.351 16.031">
        <g transform="translate(-1299.19 -185.182)">
          <path fill="#8c8c8c" d="M100.721,140.352l-3.679,3.679-3.679-3.679h2.944v-8.831h1.472v8.831h2.944Z" transform="translate(1213.82 57.182)" />
          <path fill="#0938f7" d="M92.692,131.679H89.749v8.831H88.277v-8.831H85.333L89.013,128l3.679,3.679Z" transform="translate(1213.856 57.182)" />
        </g>
      </symbol>
      <symbol :id="`${baseTableIconPrefix}-sort-down`" viewBox="0 0 15.351 16.031">
        <g transform="translate(-1299.19 -185.182)">
          <path fill="#0938f7" d="M100.721,140.352l-3.679,3.679-3.679-3.679h2.944v-8.831h1.472v8.831h2.944Z" transform="translate(1213.82 57.182)" />
          <path fill="#8c8c8c" d="M92.692,131.679H89.749v8.831H88.277v-8.831H85.333L89.013,128l3.679,3.679Z" transform="translate(1213.856 57.182)" />
        </g>
      </symbol>
    </svg>

    <div v-if="shouldRenderToolbar" class="base-table__toolbar">
      <div class="base-table__toolbar-left">
        <slot name="toolbar"></slot>
      </div>
      <div v-if="shouldRenderTopPagination" class="base-table__toolbar-right">
        <el-config-provider :locale="zhCn">
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
        </el-config-provider>
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
      @select="handleSelectionChange"
      @select-all="handleSelectionChange"
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
        fixed="left"
        align="center"
        :selectable="resolveRowSelectable"
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
          <div
            class="base-table__header"
            :class="[
              `base-table__header--${resolveHeaderContentAlign(column)}`,
              {
                'base-table__header--has-actions': hasHeaderSearch(column),
                'base-table__header--has-sort': isHeaderSortable(column)
              }
            ]"
          >
            <span class="base-table__header-main">
              <span class="base-table__header-label">{{ column.label }}</span>
              <span
                v-if="isHeaderSortable(column)"
                class="base-table__header-sort"
                :class="{ 'is-active': isHeaderSortActive(column) }"
                aria-hidden="true"
              >
                <SvgIcon
                  :prefix="baseTableIconPrefix"
                  :icon-class="getHeaderSortIconName(column)"
                  class-name="base-table__header-sort-icon"
                />
              </span>
            </span>

            <div v-if="hasHeaderSearch(column)" class="base-table__header-actions">
              <button
                :ref="bindHeaderSearchTrigger(column)"
                class="base-table__header-icon"
                :data-base-table-id="baseTableIconPrefix"
                :class="{ 'is-active': hasHeaderSearchValue(column) }"
                type="button"
                @click.stop="toggleHeaderSearch(column)"
              >
                <SvgIcon
                  :prefix="baseTableIconPrefix"
                  :icon-class="getHeaderSearchIconName(column)"
                  class-name="base-table__header-search-icon"
                />
              </button>

              <teleport to="body">
                <div
                  v-if="isHeaderSearchVisible(column)"
                  :ref="bindHeaderSearchPanel(column)"
                  :key="getHeaderSearchStateKey(column)"
                  class="base-table__header-search-panel"
                  :data-base-table-id="baseTableIconPrefix"
                  :style="getHeaderSearchPanelStyle(column)"
                  @click.stop
                  @mousedown.stop
                >
                  <div
                    v-if="isHeaderSearchSelect(column)"
                    class="base-table__header-select"
                  >
                    <el-select
                      class="base-table__header-el-select"
                      :model-value="getHeaderSearchSelectModelValue(column)"
                      :placeholder="getHeaderSearchPlaceholder(column)"
                      :multiple="isHeaderSearchMultiple(column)"
                      :filterable="isHeaderSearchFilterable(column)"
                      :clearable="isHeaderSearchClearable(column)"
                      :collapse-tags="isHeaderSearchMultiple(column)"
                      :collapse-tags-tooltip="isHeaderSearchMultiple(column)"
                      :teleported="false"
                      @update:model-value="handleHeaderSearchSelectModelValue(column, $event)"
                      @clear="handleHeaderSearchSelectEmpty(column)"
                    >
                      <el-option
                        v-for="option in getHeaderSearchOptions(column)"
                        :key="String(getHeaderSearchOptionValue(option, column))"
                        :label="getHeaderSearchOptionLabel(option, column)"
                        :value="getHeaderSearchOptionValue(option, column)"
                        :disabled="isHeaderSearchOptionDisabled(option, column)"
                      />
                    </el-select>
                  </div>

                  <div
                    v-else-if="isHeaderSearchCascader(column)"
                    class="base-table__header-cascader"
                  >
                    <button
                      class="base-table__header-select-trigger"
                      type="button"
                      @click="toggleHeaderSearchSelect(column)"
                    >
                      <span
                        class="base-table__header-select-text"
                        :class="{ 'is-placeholder': !hasHeaderSearchValue(column) }"
                      >
                        {{ getHeaderSearchCascaderLabel(column) }}
                      </span>
                      <span
                        class="base-table__header-select-arrow"
                        :class="{ 'is-open': isHeaderSearchSelectOpen(column) }"
                        aria-hidden="true"
                      ></span>
                    </button>

                    <div
                      v-if="isHeaderSearchSelectOpen(column)"
                      class="base-table__header-cascader-panel"
                    >
                      <div
                        v-for="(levelOptions, levelIndex) in getHeaderSearchCascaderColumns(column)"
                        :key="levelIndex"
                        class="base-table__header-cascader-menu"
                      >
                        <button
                          v-for="option in levelOptions"
                          :key="`${levelIndex}-${String(getHeaderSearchOptionValue(option, column))}`"
                          class="base-table__header-cascader-option"
                          :class="{
                            'is-active': isHeaderSearchCascaderOptionActive(column, option, levelIndex),
                            'is-selected': isHeaderSearchCascaderOptionSelected(column, option, levelIndex)
                          }"
                          type="button"
                          :disabled="isHeaderSearchOptionDisabled(option, column)"
                          @click="handleHeaderSearchCascaderOption(column, option, levelIndex)"
                        >
                          <span class="base-table__header-cascader-label">
                            {{ getHeaderSearchOptionLabel(option, column) }}
                          </span>
                          <span
                            v-if="hasHeaderSearchOptionChildren(option, column)"
                            class="base-table__header-cascader-arrow"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <el-date-picker
                    v-else-if="isHeaderSearchDatePicker(column)"
                    class="base-table__header-picker"
                    :model-value="getHeaderSearchPickerValue(column)"
                    :type="getHeaderSearchPickerType(column)"
                    :placeholder="getHeaderSearchPlaceholder(column)"
                    :start-placeholder="getHeaderSearchStartPlaceholder(column)"
                    :end-placeholder="getHeaderSearchEndPlaceholder(column)"
                    :range-separator="getHeaderSearchRangeSeparator(column)"
                    :format="getHeaderSearchDateFormat(column)"
                    :value-format="getHeaderSearchDateValueFormat(column)"
                    :clearable="isHeaderSearchClearable(column)"
                    :teleported="false"
                    @update:model-value="handleHeaderSearchPickerValue(column, $event)"
                  />

                  <el-time-picker
                    v-else-if="isHeaderSearchTimePicker(column)"
                    class="base-table__header-picker"
                    :model-value="getHeaderSearchPickerValue(column)"
                    :is-range="isHeaderSearchRange(column)"
                    :placeholder="getHeaderSearchPlaceholder(column)"
                    :start-placeholder="getHeaderSearchStartPlaceholder(column)"
                    :end-placeholder="getHeaderSearchEndPlaceholder(column)"
                    :range-separator="getHeaderSearchRangeSeparator(column)"
                    :format="getHeaderSearchTimeFormat(column)"
                    :value-format="getHeaderSearchTimeValueFormat(column)"
                    :clearable="isHeaderSearchClearable(column)"
                    :teleported="false"
                    @update:model-value="handleHeaderSearchPickerValue(column, $event)"
                  />

                  <input
                    v-else
                    class="base-table__header-search-input"
                    type="text"
                    :value="getHeaderSearchInputValue(column)"
                    :placeholder="getHeaderSearchPlaceholder(column)"
                    @input="handleHeaderSearchInput(column, $event)"
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
              </teleport>
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

    <div v-if="shouldRenderBottomPagination" class="base-table__pagination base-table__pagination--bottom">
      <el-config-provider :locale="zhCn">
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
      </el-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, useSlots, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { TableInstance } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SvgIcon from '../SvgIcon'
import type {
  BaseTableAction,
  BaseTableAlign,
  BaseTableCellPayload,
  BaseTableColumn,
  BaseTableCssValue,
  BaseTableExpose,
  BaseTableHeaderSearchConfig,
  BaseTableHeaderSearchPrimitiveValue,
  BaseTableHeaderSearchValue,
  BaseTableLoadedPayload,
  BaseTableOption,
  BaseTablePagination,
  BaseTablePaginationPosition,
  BaseTableProps,
  BaseTableRequestParams,
  BaseTableRowActionPayload,
  BaseTableSortDirection,
  BaseTableSortOrder,
  BaseTableSortPayload
} from './BaseTable.types'

let baseTableIconSeed = 0

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
  paginationPosition: 'top-right' as BaseTablePaginationPosition,
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
const headerSearchValues = reactive<Record<string, BaseTableHeaderSearchValue>>({})
const headerSearchVisible = reactive<Record<string, boolean>>({})
const headerSearchSelectOpen = reactive<Record<string, boolean>>({})
const headerSearchCascaderActivePaths = reactive<Record<string, BaseTableHeaderSearchPrimitiveValue[]>>({})
const headerSearchTriggerRects = reactive<Record<string, DOMRect>>({})
const headerSearchTriggerRefs = ref<Record<string, HTMLElement>>({})
const headerSearchPanelRefs = ref<Record<string, HTMLElement>>({})
const headerSearchPositionTick = ref(0)
const baseTableIconPrefix = `base-table-icon-${++baseTableIconSeed}`
let headerSearchPositionFrame = 0
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
const shouldRenderTopPagination = computed(() => props.showPagination && props.paginationPosition === 'top-right')
const shouldRenderBottomPagination = computed(() => props.showPagination && props.paginationPosition === 'bottom-right')
const shouldRenderToolbar = computed(() => props.showToolbar && (Boolean(slots.toolbar) || shouldRenderTopPagination.value))
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
  document.addEventListener('click', handleDocumentClick, true)
  window.addEventListener('scroll', scheduleHeaderSearchPositionUpdate, true)
  window.addEventListener('resize', scheduleHeaderSearchPositionUpdate)

  if (props.request && props.autoLoad) {
    void load()
    return
  }

  if (!props.request) {
    setData(props.data || [])
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick, true)
  window.removeEventListener('scroll', scheduleHeaderSearchPositionUpdate, true)
  window.removeEventListener('resize', scheduleHeaderSearchPositionUpdate)

  if (headerSearchPositionFrame) {
    window.cancelAnimationFrame(headerSearchPositionFrame)
    headerSearchPositionFrame = 0
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

function resolveRowSelectable(row: BaseTableRow, index: number) {
  return props.rowSelectable ? props.rowSelectable(row, index) : true
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

function resolveHeaderContentAlign(column: BaseTableColumn<BaseTableRow>): BaseTableAlign {
  return column.headerAlign || column.align || 'left'
}

function shouldRenderBuiltInHeader(column: BaseTableColumn<BaseTableRow>) {
  return hasHeaderSearch(column) || isHeaderSortable(column)
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

function resolveHeaderSearchParamKey(column: BaseTableColumn<BaseTableRow>) {
  const config = getHeaderSearchConfig(column)
  const legacyParamKey = (column as Record<string, any>).otherProps

  return config?.paramKey || legacyParamKey || getColumnProp(column) || ''
}

function setHeaderSearchTriggerRef(
  instance: Element | ComponentPublicInstance | null,
  column: BaseTableColumn<BaseTableRow>
) {
  const stateKey = getHeaderSearchStateKey(column)

  if (!(instance instanceof HTMLElement)) {
    delete headerSearchTriggerRefs.value[stateKey]
    return
  }

  headerSearchTriggerRefs.value[stateKey] = instance
}

function bindHeaderSearchTrigger(column: BaseTableColumn<BaseTableRow>) {
  return (instance: Element | ComponentPublicInstance | null) => {
    setHeaderSearchTriggerRef(instance, column)
  }
}

function setHeaderSearchPanelRef(
  instance: Element | ComponentPublicInstance | null,
  column: BaseTableColumn<BaseTableRow>
) {
  const stateKey = getHeaderSearchStateKey(column)

  if (!(instance instanceof HTMLElement)) {
    delete headerSearchPanelRefs.value[stateKey]
    return
  }

  headerSearchPanelRefs.value[stateKey] = instance
}

function bindHeaderSearchPanel(column: BaseTableColumn<BaseTableRow>) {
  return (instance: Element | ComponentPublicInstance | null) => {
    setHeaderSearchPanelRef(instance, column)
  }
}

function isHeaderSearchVisible(column: BaseTableColumn<BaseTableRow>) {
  return Boolean(headerSearchVisible[getHeaderSearchStateKey(column)])
}

function toggleHeaderSearch(column: BaseTableColumn<BaseTableRow>) {
  const stateKey = getHeaderSearchStateKey(column)
  const nextVisible = !headerSearchVisible[stateKey]

  if (nextVisible) {
    closeAllHeaderSearch()
    updateHeaderSearchTriggerRect(column)
    syncHeaderSearchCascaderActivePath(column)
    scheduleHeaderSearchPositionUpdate()
  }

  headerSearchVisible[stateKey] = nextVisible
  headerSearchSelectOpen[stateKey] = false
}

function closeAllHeaderSearch() {
  Object.keys(headerSearchVisible).forEach((key) => {
    headerSearchVisible[key] = false
    headerSearchSelectOpen[key] = false
  })
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target

  if (target instanceof Element) {
    if (
      target.closest(`[data-base-table-id="${baseTableIconPrefix}"].base-table__header-search-panel`) ||
      target.closest(`[data-base-table-id="${baseTableIconPrefix}"].base-table__header-icon`)
    ) {
      return
    }
  }

  closeAllHeaderSearch()
}

function updateHeaderSearchTriggerRect(column: BaseTableColumn<BaseTableRow>) {
  const stateKey = getHeaderSearchStateKey(column)
  const rect = headerSearchTriggerRefs.value[stateKey]?.getBoundingClientRect()

  if (rect) {
    headerSearchTriggerRects[stateKey] = rect
  }
}

function updateVisibleHeaderSearchPosition() {
  props.columns.forEach((column) => {
    if (hasHeaderSearch(column) && isHeaderSearchVisible(column)) {
      updateHeaderSearchTriggerRect(column)
    }
  })
}

function scheduleHeaderSearchPositionUpdate() {
  if (headerSearchPositionFrame) {
    return
  }

  headerSearchPositionFrame = window.requestAnimationFrame(() => {
    headerSearchPositionFrame = 0
    headerSearchPositionTick.value += 1
    updateVisibleHeaderSearchPosition()
  })
}

function getHeaderSearchPanelStyle(column: BaseTableColumn<BaseTableRow>) {
  headerSearchPositionTick.value
  const stateKey = getHeaderSearchStateKey(column)
  const triggerRect = headerSearchTriggerRects[stateKey]
  const panelWidth = getHeaderSearchPanelWidth(column)
  const style = {
    width: panelWidth.width,
    minWidth: panelWidth.minWidth,
    maxWidth: panelWidth.maxWidth
  }

  if (!triggerRect) {
    return style
  }

  const maxLeft = Math.max(8, window.innerWidth - panelWidth.positionWidth - 8)
  const left = Math.min(maxLeft, Math.max(8, triggerRect.right - panelWidth.positionWidth))
  const top = triggerRect.bottom + 8

  return {
    ...style,
    left: `${left}px`,
    top: `${top}px`
  }
}

function getHeaderSearchPanelWidth(column: BaseTableColumn<BaseTableRow>) {
  const rawWidth = getHeaderSearchWidth(column)
  const viewportMaxWidth = Math.max(220, window.innerWidth - 16)
  const renderedWidth = getRenderedHeaderSearchPanelWidth(column)

  if (rawWidth === 'auto') {
    const positionWidth = Math.min(renderedWidth || getHeaderSearchAutoWidth(column), viewportMaxWidth)
    return {
      width: 'max-content',
      minWidth: '280px',
      maxWidth: `${viewportMaxWidth}px`,
      positionWidth
    }
  }

  const width = toCssValue(rawWidth) || '280px'
  const positionWidth = Math.min(Number.parseFloat(String(rawWidth)) || 280, viewportMaxWidth)

  return {
    width,
    minWidth: width,
    maxWidth: `${viewportMaxWidth}px`,
    positionWidth
  }
}

function getRenderedHeaderSearchPanelWidth(column: BaseTableColumn<BaseTableRow>) {
  const stateKey = getHeaderSearchStateKey(column)
  const panelElement = headerSearchPanelRefs.value[stateKey]
  return panelElement ? panelElement.getBoundingClientRect().width : 0
}

function getHeaderSearchAutoWidth(column: BaseTableColumn<BaseTableRow>) {
  if (isHeaderSearchRange(column)) {
    const type = getHeaderSearchConfig(column)?.type
    return type === 'daterange' || type === 'timerange' ? 420 : 560
  }

  return 280
}

function getHeaderSearchValue(column: BaseTableColumn<BaseTableRow>): BaseTableHeaderSearchValue {
  const stateKey = getHeaderSearchStateKey(column)
  const value = headerSearchValues[stateKey]

  if (value !== undefined) {
    return value
  }

  return getHeaderSearchEmptyValue(column)
}

function getHeaderSearchInputValue(column: BaseTableColumn<BaseTableRow>) {
  const value = getHeaderSearchValue(column)
  return Array.isArray(value) ? value.join(' ') : String(value)
}

function hasHeaderSearchValue(column: BaseTableColumn<BaseTableRow>) {
  return isHeaderSearchValueFilled(getHeaderSearchValue(column))
}

function updateHeaderSearchValue(column: BaseTableColumn<BaseTableRow>, value: unknown) {
  headerSearchValues[getHeaderSearchStateKey(column)] = normalizeHeaderSearchValue(column, value)
}

function handleHeaderSearchInput(column: BaseTableColumn<BaseTableRow>, event: Event) {
  updateHeaderSearchValue(column, (event.target as HTMLInputElement | null)?.value || '')
}

function isHeaderSearchSelect(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.type === 'select'
}

function isHeaderSearchCascader(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.type === 'cascader'
}

function isHeaderSearchDatePicker(column: BaseTableColumn<BaseTableRow>) {
  const type = getHeaderSearchConfig(column)?.type
  return type === 'date' || type === 'daterange' || type === 'datetime' || type === 'datetimerange'
}

function isHeaderSearchTimePicker(column: BaseTableColumn<BaseTableRow>) {
  const type = getHeaderSearchConfig(column)?.type
  return type === 'time' || type === 'timerange'
}

function isHeaderSearchPicker(column: BaseTableColumn<BaseTableRow>) {
  return isHeaderSearchDatePicker(column) || isHeaderSearchTimePicker(column)
}

function isHeaderSearchRange(column: BaseTableColumn<BaseTableRow>) {
  const type = getHeaderSearchConfig(column)?.type
  return type === 'daterange' || type === 'datetimerange' || type === 'timerange'
}

function isHeaderSearchChoice(column: BaseTableColumn<BaseTableRow>) {
  return isHeaderSearchSelect(column) || isHeaderSearchCascader(column)
}

function isHeaderSearchMultiple(column: BaseTableColumn<BaseTableRow>) {
  return isHeaderSearchSelect(column) && getHeaderSearchConfig(column)?.multiple === true
}

function isHeaderSearchClearable(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.clearable !== false
}

function isHeaderSearchFilterable(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.filterable === true
}

function getHeaderSearchIconName(column: BaseTableColumn<BaseTableRow>) {
  const iconName = isHeaderSearchChoice(column) ? 'select' : 'search'
  return hasHeaderSearchValue(column) ? `${iconName}-y` : iconName
}

function isHeaderSortable(column: BaseTableColumn<BaseTableRow>) {
  return Boolean(resolveColumnSortable(column))
}

function isHeaderSortActive(column: BaseTableColumn<BaseTableRow>) {
  return String(sortState.prop || '') === String(getColumnProp(column) || '') && Boolean(sortState.order)
}

function getHeaderSortIconName(column: BaseTableColumn<BaseTableRow>) {
  if (!isHeaderSortActive(column)) {
    return 'sort-none'
  }

  return sortState.order === 'ascending' ? 'sort-up' : 'sort-down'
}

function isHeaderSearchSelectOpen(column: BaseTableColumn<BaseTableRow>) {
  return Boolean(headerSearchSelectOpen[getHeaderSearchStateKey(column)])
}

function toggleHeaderSearchSelect(column: BaseTableColumn<BaseTableRow>) {
  const stateKey = getHeaderSearchStateKey(column)
  const nextOpen = !headerSearchSelectOpen[stateKey]

  if (nextOpen) {
    syncHeaderSearchCascaderActivePath(column)
  }

  headerSearchSelectOpen[stateKey] = nextOpen
}

function getHeaderSearchPlaceholder(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.placeholder || (isHeaderSearchChoice(column) ? '请选择' : '请输入搜索内容')
}

function getHeaderSearchStartPlaceholder(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.startPlaceholder || '开始时间'
}

function getHeaderSearchEndPlaceholder(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.endPlaceholder || '结束时间'
}

function getHeaderSearchRangeSeparator(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.rangeSeparator || '至'
}

function getHeaderSearchPickerType(column: BaseTableColumn<BaseTableRow>) {
  const type = getHeaderSearchConfig(column)?.type

  if (type === 'datetime' || type === 'datetimerange') {
    return type
  }

  return type === 'daterange' ? 'daterange' : 'date'
}

function getHeaderSearchDateFormat(column: BaseTableColumn<BaseTableRow>) {
  const config = getHeaderSearchConfig(column)

  if (config?.format) {
    return config.format
  }

  return getHeaderSearchConfig(column)?.type === 'datetime' || getHeaderSearchConfig(column)?.type === 'datetimerange'
    ? 'YYYY-MM-DD HH:mm:ss'
    : 'YYYY-MM-DD'
}

function getHeaderSearchDateValueFormat(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.valueFormat || getHeaderSearchDateFormat(column)
}

function getHeaderSearchTimeFormat(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.format || 'HH:mm:ss'
}

function getHeaderSearchTimeValueFormat(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.valueFormat || getHeaderSearchTimeFormat(column)
}

function getHeaderSearchWidth(column: BaseTableColumn<BaseTableRow>) {
  const configuredWidth = getHeaderSearchConfig(column)?.width

  if (configuredWidth !== undefined && configuredWidth !== null && configuredWidth !== '') {
    return configuredWidth
  }

  return isHeaderSearchRange(column) ? 'auto' : 280
}

function getHeaderSearchSearchText(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.searchText || '搜索'
}

function getHeaderSearchResetText(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.resetText || '重置'
}

function getHeaderSearchOptions(column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchConfig(column)?.options || column.options || []
}

function getHeaderSearchOptionValue(option: BaseTableOption, column: BaseTableColumn<BaseTableRow>) {
  const valueKey = getHeaderSearchConfig(column)?.optionValueKey || column.optionValueKey || 'value'
  return normalizeHeaderSearchPrimitiveValue((option as Record<string, any>)[valueKey])
}

function getHeaderSearchOptionLabel(option: BaseTableOption, column: BaseTableColumn<BaseTableRow>) {
  const labelKey = getHeaderSearchConfig(column)?.optionLabelKey || column.optionLabelKey || 'label'
  const label = (option as Record<string, any>)[labelKey]
  return label === undefined || label === null ? '' : String(label)
}

function isHeaderSearchOptionDisabled(option: BaseTableOption, column: BaseTableColumn<BaseTableRow>) {
  const disabledKey = getHeaderSearchConfig(column)?.optionDisabledKey || 'disabled'
  return Boolean((option as Record<string, any>)[disabledKey])
}

function getHeaderSearchOptionChildren(option: BaseTableOption, column: BaseTableColumn<BaseTableRow>) {
  const childrenKey = getHeaderSearchConfig(column)?.optionChildrenKey || 'children'
  const children = (option as Record<string, any>)[childrenKey]
  return Array.isArray(children) ? children as BaseTableOption[] : []
}

function hasHeaderSearchOptionChildren(option: BaseTableOption, column: BaseTableColumn<BaseTableRow>) {
  return getHeaderSearchOptionChildren(option, column).length > 0
}

function getHeaderSearchSelectLabel(column: BaseTableColumn<BaseTableRow>) {
  const selectedLabels = getHeaderSearchSelectedLabels(column)

  if (!selectedLabels.length) {
    return getHeaderSearchPlaceholder(column)
  }

  return selectedLabels.join('、')
}

function getHeaderSearchSelectedLabels(column: BaseTableColumn<BaseTableRow>) {
  const selectedValues = toComparableValues(getHeaderSearchValue(column))

  return selectedValues.map((selectedValue) => {
    const matchedOption = getHeaderSearchOptions(column).find((option) => {
      return String(getHeaderSearchOptionValue(option, column)) === selectedValue
    })

    return matchedOption ? getHeaderSearchOptionLabel(matchedOption, column) : selectedValue
  })
}

function getHeaderSearchSelectModelValue(column: BaseTableColumn<BaseTableRow>) {
  const value = getHeaderSearchValue(column)

  if (isHeaderSearchMultiple(column)) {
    return Array.isArray(value) ? value : []
  }

  return Array.isArray(value) ? value[0] ?? '' : value
}

function handleHeaderSearchSelectEmpty(column: BaseTableColumn<BaseTableRow>) {
  updateHeaderSearchValue(column, getHeaderSearchEmptyValue(column))
  headerSearchSelectOpen[getHeaderSearchStateKey(column)] = false
}

function handleHeaderSearchSelectModelValue(column: BaseTableColumn<BaseTableRow>, value: unknown) {
  updateHeaderSearchValue(column, value)
}

function getHeaderSearchPickerValue(column: BaseTableColumn<BaseTableRow>) {
  const value = getHeaderSearchValue(column)
  return Array.isArray(value) ? [...value] : value
}

function handleHeaderSearchPickerValue(column: BaseTableColumn<BaseTableRow>, value: unknown) {
  updateHeaderSearchValue(column, value)
}

function getHeaderSearchCascaderValue(column: BaseTableColumn<BaseTableRow>) {
  return normalizeHeaderSearchPathValue(getHeaderSearchValue(column))
}

function syncHeaderSearchCascaderActivePath(column: BaseTableColumn<BaseTableRow>) {
  if (!isHeaderSearchCascader(column)) {
    return
  }

  const stateKey = getHeaderSearchStateKey(column)
  headerSearchCascaderActivePaths[stateKey] = getHeaderSearchCascaderValue(column)
}

function getHeaderSearchCascaderActivePath(column: BaseTableColumn<BaseTableRow>) {
  const stateKey = getHeaderSearchStateKey(column)
  const activePath = headerSearchCascaderActivePaths[stateKey]

  if (activePath) {
    return activePath
  }

  return getHeaderSearchCascaderValue(column)
}

function getHeaderSearchCascaderColumns(column: BaseTableColumn<BaseTableRow>) {
  const columns: BaseTableOption[][] = []
  let levelOptions = getHeaderSearchOptions(column)
  const activePath = getHeaderSearchCascaderActivePath(column)
  let levelIndex = 0

  while (levelOptions.length) {
    columns.push(levelOptions)

    const activeValue = activePath[levelIndex]
    const activeOption = levelOptions.find((option) => {
      return String(getHeaderSearchOptionValue(option, column)) === String(activeValue)
    })

    if (!activeOption) {
      break
    }

    levelOptions = getHeaderSearchOptionChildren(activeOption, column)
    levelIndex += 1
  }

  return columns
}

function getHeaderSearchCascaderLabel(column: BaseTableColumn<BaseTableRow>) {
  const path = getHeaderSearchCascaderValue(column)

  if (!path.length) {
    return getHeaderSearchPlaceholder(column)
  }

  return getHeaderSearchCascaderPathLabels(column, path).join(' / ')
}

function getHeaderSearchCascaderPathLabels(
  column: BaseTableColumn<BaseTableRow>,
  path = getHeaderSearchCascaderValue(column)
) {
  const labels: string[] = []
  let levelOptions = getHeaderSearchOptions(column)

  path.forEach((value) => {
    const matchedOption = levelOptions.find((option) => {
      return String(getHeaderSearchOptionValue(option, column)) === String(value)
    })

    if (!matchedOption) {
      labels.push(String(value))
      levelOptions = []
      return
    }

    labels.push(getHeaderSearchOptionLabel(matchedOption, column))
    levelOptions = getHeaderSearchOptionChildren(matchedOption, column)
  })

  return labels
}

function isHeaderSearchCascaderOptionActive(
  column: BaseTableColumn<BaseTableRow>,
  option: BaseTableOption,
  levelIndex: number
) {
  const activePath = getHeaderSearchCascaderActivePath(column)
  return String(activePath[levelIndex]) === String(getHeaderSearchOptionValue(option, column))
}

function isHeaderSearchCascaderOptionSelected(
  column: BaseTableColumn<BaseTableRow>,
  option: BaseTableOption,
  levelIndex: number
) {
  const selectedPath = getHeaderSearchCascaderValue(column)
  return String(selectedPath[levelIndex]) === String(getHeaderSearchOptionValue(option, column))
}

function handleHeaderSearchCascaderOption(
  column: BaseTableColumn<BaseTableRow>,
  option: BaseTableOption,
  levelIndex: number
) {
  const stateKey = getHeaderSearchStateKey(column)
  const optionValue = getHeaderSearchOptionValue(option, column)
  const nextPath = [
    ...getHeaderSearchCascaderActivePath(column).slice(0, levelIndex),
    optionValue
  ]

  headerSearchCascaderActivePaths[stateKey] = nextPath

  if (!hasHeaderSearchOptionChildren(option, column)) {
    updateHeaderSearchValue(column, nextPath)
  }
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
  updateHeaderSearchValue(column, getHeaderSearchEmptyValue(column))
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
  const stateKey = getHeaderSearchStateKey(column)
  headerSearchVisible[stateKey] = false
  headerSearchSelectOpen[stateKey] = false
}

function buildHeaderSearchParams() {
  return props.columns.reduce<Record<string, unknown>>((result, column) => {
    if (!hasHeaderSearch(column)) {
      return result
    }

    const paramKey = resolveHeaderSearchParamKey(column)
    const value = getHeaderSearchValue(column)

    if (!paramKey || !isHeaderSearchValueFilled(value)) {
      return result
    }

    result[paramKey] = normalizeHeaderSearchRequestValue(column, value)
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
      value: getHeaderSearchValue(column)
    }))

  if (!activeColumns.length) {
    return normalizeRows(data)
  }

  return normalizeRows(data).filter((row) => {
    return activeColumns.every(({ column, value: searchValue }) => {
      const columnProp = getColumnProp(column)
      if (!columnProp) {
        return true
      }

      const value = getCellValue(row, column)
      if (isHeaderSearchSelect(column)) {
        return matchesHeaderSearchSelectValue(value, searchValue)
      }

      if (isHeaderSearchCascader(column)) {
        return matchesHeaderSearchCascaderValue(value, searchValue)
      }

      if (isHeaderSearchPicker(column)) {
        return matchesHeaderSearchPickerValue(value, searchValue, column)
      }

      return toSearchableText(value).includes(toHeaderSearchKeyword(searchValue))
    })
  })
}

function getHeaderSearchEmptyValue(column: BaseTableColumn<BaseTableRow>): BaseTableHeaderSearchValue {
  return isHeaderSearchMultiple(column) || isHeaderSearchCascader(column) || isHeaderSearchRange(column) ? [] : ''
}

function normalizeHeaderSearchValue(
  column: BaseTableColumn<BaseTableRow>,
  value: unknown
): BaseTableHeaderSearchValue {
  if (isHeaderSearchCascader(column)) {
    return normalizeHeaderSearchPathValue(value)
  }

  if (isHeaderSearchPicker(column)) {
    if (isHeaderSearchRange(column)) {
      return normalizeHeaderSearchPathValue(value)
    }

    if (value === undefined || value === null) {
      return ''
    }

    return normalizeHeaderSearchPrimitiveValue(value)
  }

  if (!isHeaderSearchSelect(column)) {
    if (value === undefined || value === null) {
      return ''
    }

    return String(value)
  }

  if (isHeaderSearchMultiple(column)) {
    const values = Array.isArray(value) ? value : [value]
    return values
      .filter((item) => isHeaderSearchValueFilled(item))
      .map((item) => normalizeHeaderSearchPrimitiveValue(item))
  }

  if (Array.isArray(value)) {
    const firstFilledValue = value.find((item) => isHeaderSearchValueFilled(item))
    return firstFilledValue === undefined ? '' : normalizeHeaderSearchPrimitiveValue(firstFilledValue)
  }

  if (value === undefined || value === null) {
    return ''
  }

  return normalizeHeaderSearchPrimitiveValue(value)
}

function normalizeHeaderSearchPrimitiveValue(value: unknown): BaseTableHeaderSearchPrimitiveValue {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  return String(value ?? '')
}

function normalizeHeaderSearchPathValue(value: unknown): BaseTableHeaderSearchPrimitiveValue[] {
  const values = Array.isArray(value) ? value : [value]

  return values
    .filter((item) => !Array.isArray(item) && isHeaderSearchValueFilled(item))
    .map((item) => normalizeHeaderSearchPrimitiveValue(item))
}

function normalizeHeaderSearchRequestValue(
  column: BaseTableColumn<BaseTableRow>,
  value: BaseTableHeaderSearchValue
) {
  if (Array.isArray(value)) {
    return [...value]
  }

  if (isHeaderSearchSelect(column)) {
    return value
  }

  return String(value).trim()
}

function isHeaderSearchValueFilled(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => isHeaderSearchValueFilled(item))
  }

  return value !== undefined && value !== null && String(value).trim() !== ''
}

function toHeaderSearchKeyword(value: BaseTableHeaderSearchValue) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).join(' ').toLowerCase()
  }

  return String(value).trim().toLowerCase()
}

function matchesHeaderSearchSelectValue(rowValue: unknown, searchValue: BaseTableHeaderSearchValue) {
  const selectedValues = toComparableValues(searchValue)

  if (!selectedValues.length) {
    return true
  }

  const rowValues = toComparableValues(rowValue)
  return rowValues.some((item) => selectedValues.includes(item))
}

function matchesHeaderSearchCascaderValue(rowValue: unknown, searchValue: BaseTableHeaderSearchValue) {
  const selectedPath = normalizeHeaderSearchPathValue(searchValue)

  if (!selectedPath.length) {
    return true
  }

  const rowPath = normalizeHeaderSearchPathValue(rowValue)

  if (!rowPath.length) {
    return false
  }

  return selectedPath.every((item, index) => String(rowPath[index]) === String(item))
}

function matchesHeaderSearchPickerValue(
  rowValue: unknown,
  searchValue: BaseTableHeaderSearchValue,
  column: BaseTableColumn<BaseTableRow>
) {
  if (isHeaderSearchRange(column)) {
    const selectedRange = normalizeHeaderSearchPathValue(searchValue)

    if (!selectedRange.length) {
      return true
    }

    const rowTime = toComparableTime(rowValue)
    const startTime = toComparableTime(selectedRange[0])
    const endTime = toComparableTime(selectedRange[1])

    if (rowTime === null) {
      return false
    }

    return (startTime === null || rowTime >= startTime) && (endTime === null || rowTime <= endTime)
  }

  return String(rowValue || '') === String(searchValue || '')
}

function toComparableTime(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (value instanceof Date) {
    return value.getTime()
  }

  const normalizedValue = String(value).trim()
  const parsedValue = Date.parse(normalizedValue)

  if (!Number.isNaN(parsedValue)) {
    return parsedValue
  }

  const today = new Date().toISOString().slice(0, 10)
  const parsedTime = Date.parse(`${today} ${normalizedValue}`)
  return Number.isNaN(parsedTime) ? null : parsedTime
}

function toComparableValues(value: unknown) {
  const values = Array.isArray(value) ? value : [value]
  return values
    .filter((item) => isHeaderSearchValueFilled(item))
    .map((item) => String(item))
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

async function setHeaderSearchValue(key: string, value: BaseTableHeaderSearchValue, shouldReload = true) {
  const matchedColumn = findHeaderSearchColumn(key)
  const stateKey = matchedColumn ? getHeaderSearchStateKey(matchedColumn) : key

  headerSearchValues[stateKey] = matchedColumn
    ? normalizeHeaderSearchValue(matchedColumn, value)
    : value

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
    Object.keys(headerSearchVisible).forEach((stateKey) => {
      headerSearchVisible[stateKey] = false
    })
    Object.keys(headerSearchSelectOpen).forEach((stateKey) => {
      headerSearchSelectOpen[stateKey] = false
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

.base-table__svg-sprite {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
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

.base-table__pagination {
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
}

.base-table__pagination--bottom {
  margin-top: 16px;
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

.base-table__header--center.base-table__header--has-actions::before {
  content: '';
  display: block;
  width: 24px;
  flex: 0 0 24px;
}

.base-table__header--center {
  justify-content: center;
}

.base-table__header--right {
  justify-content: flex-end;
}

.base-table__header-main {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.base-table__header-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header--left .base-table__header-main {
  flex: 1 1 auto;
}

.base-table__header--center .base-table__header-main,
.base-table__header--right .base-table__header-main {
  flex: 0 1 auto;
}

.base-table__header-sort {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  color: #8c8c8c;
}

.base-table__header-sort.is-active {
  color: #0938f7;
}

.base-table__header-sort-icon {
  width: 15.351px;
  height: 16.031px;
  font-size: 16px;
  vertical-align: middle;
}

.base-table__header-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.base-table__header--left .base-table__header-actions {
  margin-left: auto;
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

.base-table__header-search-icon {
  width: 17.814px;
  height: 14.035px;
  font-size: 16px;
  vertical-align: middle;
}

.base-table :deep(.el-table__cell.is-sortable .caret-wrapper) {
  display: none;
}

.base-table__header-search-panel {
  position: fixed;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: var(--el-popover-padding, 12px);
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-popover-border-radius, 4px);
  background: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
  box-sizing: border-box;
}

.base-table__header-search-input {
  width: 100%;
  height: 32px;
  padding: 1px 11px;
  border: none;
  border-radius: var(--el-border-radius-base);
  outline: none;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color-blank);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  box-sizing: border-box;
  font-size: var(--el-font-size-base);
  line-height: 30px;
  transition: box-shadow var(--el-transition-duration);
}

.base-table__header-search-input:hover {
  box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
}

.base-table__header-search-input:focus {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.base-table__header-search-input::placeholder {
  color: var(--el-text-color-placeholder);
}

.base-table__header-select,
.base-table__header-cascader {
  position: relative;
  width: 100%;
}

.base-table__header-el-select {
  width: 100%;
}

.base-table__header-el-select :deep(.el-select__wrapper) {
  min-height: 32px;
}

.base-table__header-picker {
  width: 100%;
}

.base-table__header-picker :deep(.el-input__wrapper),
.base-table__header-picker :deep(.el-range-editor.el-input__wrapper) {
  width: 100%;
  min-height: 32px;
  box-sizing: border-box;
}

.base-table__header-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 32px;
  padding: 4px 11px;
  border: none;
  border-radius: var(--el-border-radius-base);
  outline: none;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color-blank);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  box-sizing: border-box;
  cursor: pointer;
  font-size: var(--el-font-size-base);
  line-height: 24px;
  text-align: left;
  transition: box-shadow var(--el-transition-duration);
}

.base-table__header-select-trigger:hover,
.base-table__header-select-trigger:focus {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.base-table__header-select-text {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header-select-text.is-placeholder {
  color: var(--el-text-color-placeholder);
}

.base-table__header-select-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
}

.base-table__header-select-tag {
  display: inline-flex;
  align-items: center;
  max-width: 92px;
  min-height: 22px;
  padding: 0 6px;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
  box-sizing: border-box;
  font-size: 12px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header-select-tag--count {
  flex: 0 0 auto;
  color: var(--el-color-primary);
}

.base-table__header-select-arrow {
  width: 8px;
  height: 8px;
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  color: var(--el-text-color-placeholder);
  transform: rotate(45deg);
  transition: transform var(--el-transition-duration);
  flex: 0 0 auto;
}

.base-table__header-select-arrow.is-open {
  transform: rotate(225deg);
}

.base-table__header-select-options {
  max-height: 180px;
  margin-top: 6px;
  padding: 4px 0;
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  background: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
  overflow-y: auto;
}

.base-table__header-select-option {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 0 12px;
  border: none;
  color: var(--el-text-color-regular);
  background: transparent;
  cursor: pointer;
  font-size: var(--el-font-size-base);
  line-height: 32px;
  text-align: left;
}

.base-table__header-select-option-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header-select-option:hover {
  background: var(--el-fill-color-light);
}

.base-table__header-select-option.is-selected {
  color: var(--el-color-primary);
  font-weight: 700;
}

.base-table__header-select-option:disabled {
  color: var(--el-text-color-placeholder);
  cursor: not-allowed;
}

.base-table__header-cascader-panel {
  display: flex;
  max-width: calc(100vw - 24px);
  min-height: 180px;
  max-height: 260px;
  margin-top: 6px;
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  background: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
  overflow: auto;
}

.base-table__header-cascader-menu {
  min-width: 132px;
  padding: 4px 0;
  border-right: 1px solid var(--el-border-color-lighter);
  box-sizing: border-box;
}

.base-table__header-cascader-menu:last-child {
  border-right: none;
}

.base-table__header-cascader-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 32px;
  padding: 0 10px 0 12px;
  border: none;
  color: var(--el-text-color-regular);
  background: transparent;
  cursor: pointer;
  font-size: var(--el-font-size-base);
  line-height: 32px;
  text-align: left;
}

.base-table__header-cascader-option:hover,
.base-table__header-cascader-option.is-active {
  background: var(--el-fill-color-light);
}

.base-table__header-cascader-option.is-selected {
  color: var(--el-color-primary);
  font-weight: 700;
}

.base-table__header-cascader-option:disabled {
  color: var(--el-text-color-placeholder);
  cursor: not-allowed;
}

.base-table__header-cascader-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-table__header-cascader-arrow {
  width: 7px;
  height: 7px;
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  color: var(--el-text-color-placeholder);
  transform: rotate(-45deg);
  flex: 0 0 auto;
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
