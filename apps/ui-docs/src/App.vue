<template>
  <main class="docs-home">
    <section class="hero">
      <p class="hero__eyebrow">Company Shared UI</p>
      <h1>公共组件 Demo 工作台</h1>
      <p class="hero__desc">
        这个站点用来集中演示当前已经沉淀到组件库里的基础组件，包含可直接运行的交互示例、参数映射示例和常见组合方式。
      </p>
      <div class="hero__actions">
        <span class="hero__chip">统一安装入口：@hbdlzy/ui</span>
        <span class="hero__chip">当前核心组件：{{ uiCoreComponentCount }} 个</span>
        <span class="hero__chip">文档包：{{ packages.length }} 个</span>
      </div>
    </section>

    <section class="overview-grid">
      <article v-for="pkg in packages" :key="pkg.name" class="overview-card">
        <p class="overview-card__label">Workspace Package</p>
        <h2>{{ pkg.name }}</h2>
        <p class="overview-card__path">{{ pkg.path }}</p>
        <p class="overview-card__desc">文档：{{ pkg.docs }}</p>
        <p class="overview-card__desc">Manifest：{{ pkg.manifest }}</p>
      </article>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseCard</p>
          <h2>统一卡片容器</h2>
        </div>
        <p class="section-heading__desc">演示标题区、右侧信息区、插槽区和内置导出触发行为。</p>
      </div>

      <div class="two-column-grid">
        <BaseCard
          title="今日运行总览"
          meta-text="2026-04-21 14:30"
          show-export
          export-text="导出概览"
          marker-color="#1d63ff"
          :export-payload="{ scene: 'overview-card' }"
          @export="handleCardExport"
        >
          <template #header-right>
            <el-tag type="success">实时</el-tag>
          </template>

          <template #tip>
            <p class="mini-tip">适合包裹统计块、图表块和信息卡片。</p>
          </template>

          <div class="metric-grid">
            <div v-for="item in cardMetrics" :key="item.label" class="metric-tile">
              <p class="metric-tile__label">{{ item.label }}</p>
              <p class="metric-tile__value">{{ item.value }}</p>
            </div>
          </div>
        </BaseCard>

        <BaseCard
          title="市场趋势切换"
          meta-text="支持标题区扩展"
          marker-color="#10b981"
          border-color="rgba(16, 185, 129, 0.28)"
          background-color="#fcfffd"
          :header-gap="20"
        >
          <template #title>
            <el-radio-group v-model="activeCardRange" size="small">
              <el-radio-button label="日内" />
              <el-radio-button label="周内" />
              <el-radio-button label="月内" />
            </el-radio-group>
          </template>

          <template #header-right>
            <el-button text @click="showActionMessage('BaseCard 右侧插槽触发')">刷新</el-button>
          </template>

          <p class="demo-paragraph">
            当前选择：{{ activeCardRange }}。这个示例用来说明 `BaseCard` 可以同时承载标题、标题插槽和右侧操作区，不需要页面层重复写头部结构。
          </p>
        </BaseCard>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseEChart</p>
          <h2>统一图表封装</h2>
        </div>
        <p class="section-heading__desc">演示 option 驱动渲染、实例暴露方法和统一导出的 echarts 工具。</p>
      </div>

      <div class="showcase-card">
        <div class="showcase-toolbar">
          <div class="showcase-toolbar__group">
            <el-button type="primary" plain @click="randomizeChartData">刷新数据</el-button>
            <el-button plain @click="resizeChart">触发 resize</el-button>
            <el-button plain @click="hideChartTip">隐藏 tooltip</el-button>
          </div>
          <p class="showcase-toolbar__note">图表渐变色通过统一导出的 `echarts.graphic.LinearGradient` 生成。</p>
        </div>

        <div class="chart-stage">
          <BaseEChart ref="chartRef" :option="chartOption" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseExportButton</p>
          <h2>统一导出按钮</h2>
        </div>
        <p class="section-heading__desc">演示前端 Excel 导出和后端 blob 下载两种常见导出模式。</p>
      </div>

      <div class="showcase-card">
        <div class="export-actions">
          <BaseExportButton :excel-options="excelOptions" />
          <BaseExportButton
            plain
            label="导出文本示例"
            file-name="docs-demo.txt"
            :request-handler="createMockExportRequest"
          />
        </div>
        <p class="showcase-toolbar__note">
          左侧按钮使用前端 Excel 导出，右侧按钮模拟接口返回 blob 文件下载。
        </p>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseTable</p>
          <h2>统一表格封装</h2>
        </div>
        <p class="section-heading__desc">
          演示工具栏插槽、远程请求、默认排序、请求参数映射、请求结果适配和操作列回调。
        </p>
      </div>

      <div class="showcase-card">
        <div class="table-stage">
          <BaseTable
            ref="tableRef"
            :columns="tableColumns"
            :request="requestTableData"
            :request-params="tableFilters"
            :result-adapter="tableResultAdapter"
            :reload-on-params-change="false"
            :default-sort="{ prop: 'createdAt', order: 'descending' }"
            sort-field-key="orderBy"
            sort-order-key="orderDirection"
            :has-index="true"
            border
            @row-action="handleTableAction"
            @loaded="handleTableLoaded"
          >
            <template #toolbar>
              <div class="table-toolbar">
                <el-form inline>
                  <el-form-item label="名称">
                    <el-input v-model="tableFilters.keyword" placeholder="请输入名称" clearable />
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select v-model="tableFilters.status" placeholder="全部状态" clearable style="width: 140px">
                      <el-option
                        v-for="option in statusOptions"
                        :key="String(option.value)"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="tableRef?.resetPage()">查询</el-button>
                    <el-button @click="resetTableFilters">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </BaseTable>
        </div>

        <div class="request-debug-grid">
          <article class="debug-card">
            <h3>最近一次请求参数</h3>
            <pre>{{ lastRequestParams }}</pre>
          </article>
          <article class="debug-card">
            <h3>最近一次加载摘要</h3>
            <pre>{{ lastLoadedSummary }}</pre>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  BaseCard,
  BaseEChart,
  BaseExportButton,
  BaseTable,
  echarts,
  type BaseEChartExpose,
  type BaseTableColumn,
  type BaseTableExpose,
  type BaseTableOption,
  type EChartOption,
  type ExcelExportColumn
} from '@hbdlzy/ui-core'
import libraryManifest from '../../../library.manifest.json'
import uiCoreManifest from '../../../packages/ui-core/components.manifest.json'

interface DemoExportRow {
  name: string
  department: string
  createdAt: string
}

interface DemoTableRow {
  id: number
  name: string
  owner: string
  status: 'enabled' | 'disabled' | 'draft'
  capacity: number
  createdAt: string
  cover: string
}

interface DemoTableFilters {
  keyword: string
  status: '' | DemoTableRow['status']
}

const packages = libraryManifest.workspace.packages
const uiCoreComponentCount = uiCoreManifest.components.length

const cardMetrics = [
  { label: '站点数量', value: '18' },
  { label: '运行中策略', value: '42' },
  { label: '今日告警', value: '6' },
  { label: '平均收益率', value: '12.8%' }
]

const activeCardRange = ref('日内')

const columns: Array<ExcelExportColumn<DemoExportRow>> = [
  { label: '姓名', key: 'name', width: 16 },
  { label: '部门', key: 'department', width: 18 },
  { label: '创建时间', key: 'createdAt', width: 22 }
]

const excelOptions = {
  fileName: '文档站导出示例',
  sheetName: '导出示例',
  columns,
  data: [
    { name: '张三', department: '调度中心', createdAt: '2026-04-21 09:30:00' },
    { name: '李四', department: '运营中心', createdAt: '2026-04-21 10:15:00' }
  ]
}

const chartRef = ref<BaseEChartExpose | null>(null)
const chartSeries = ref([32, 41, 38, 52, 49, 61, 58])

const chartOption = computed<EChartOption>(() => ({
  color: ['#1d63ff'],
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top: 32,
    left: 36,
    right: 20,
    bottom: 28
  },
  xAxis: {
    type: 'category',
    data: ['01', '02', '03', '04', '05', '06', '07']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: chartSeries.value,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(29, 99, 255, 0.34)' },
          { offset: 1, color: 'rgba(29, 99, 255, 0.04)' }
        ])
      }
    }
  ]
}))

const statusOptions: BaseTableOption[] = [
  { label: '启用', value: 'enabled', tagType: 'success' },
  { label: '停用', value: 'disabled', tagType: 'info' },
  { label: '草稿', value: 'draft', tagType: 'warning' }
]

const tableRef = ref<BaseTableExpose<DemoTableRow> | null>(null)
const tableFilters = reactive<DemoTableFilters>({
  keyword: '',
  status: ''
})

const lastRequestParams = ref('{}')
const lastLoadedSummary = ref('{}')

const tableColumns: BaseTableColumn<DemoTableRow>[] = [
  {
    label: '名称',
    prop: 'name',
    kind: 'link',
    minWidth: 180,
    clickHandler: (row) => {
      ElMessage.info(`点击了 ${row.name}`)
    }
  },
  {
    label: '负责人',
    prop: 'owner',
    minWidth: 120
  },
  {
    label: '状态',
    prop: 'status',
    kind: 'tag',
    minWidth: 120,
    options: statusOptions
  },
  {
    label: '容量(MWh)',
    prop: 'capacity',
    align: 'right',
    sortable: true,
    sortField: 'capacity_mwh',
    minWidth: 130
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    sortable: true,
    sortField: 'created_time',
    minWidth: 180
  },
  {
    label: '封面',
    prop: 'cover',
    kind: 'image',
    width: 100,
    imageWidth: 56,
    imageHeight: 56,
    align: 'center'
  },
  {
    label: '操作',
    prop: 'action',
    kind: 'actions',
    width: 180,
    fixed: 'right',
    actions: [
      { label: '查看', type: 'view' },
      { label: '停用', type: 'disable', visible: (row) => row.status === 'enabled', buttonType: 'warning' },
      { label: '删除', type: 'delete', buttonType: 'danger', disabled: (row) => row.status === 'draft' }
    ]
  }
]

const allTableRows: DemoTableRow[] = [
  createTableRow(1, '华北调峰策略', '张三', 'enabled', 168, '2026-04-21 08:30:00', '#1d63ff'),
  createTableRow(2, '华东市场复盘', '李四', 'disabled', 132, '2026-04-20 17:30:00', '#10b981'),
  createTableRow(3, '调频收益分析', '王五', 'draft', 96, '2026-04-19 10:30:00', '#f97316'),
  createTableRow(4, '站端实时巡检', '赵六', 'enabled', 124, '2026-04-18 11:15:00', '#7c3aed'),
  createTableRow(5, '运行日报看板', '陈晨', 'enabled', 188, '2026-04-17 09:05:00', '#ef4444'),
  createTableRow(6, '储能策略联动', '孙敏', 'disabled', 86, '2026-04-16 14:45:00', '#0ea5e9'),
  createTableRow(7, '现货结算汇总', '周舟', 'enabled', 212, '2026-04-15 15:20:00', '#06b6d4'),
  createTableRow(8, '负荷预测分析', '钱进', 'draft', 118, '2026-04-14 12:35:00', '#84cc16'),
  createTableRow(9, '告警统计报表', '吴迪', 'enabled', 106, '2026-04-13 16:10:00', '#e11d48'),
  createTableRow(10, '策略收益回放', '郑源', 'disabled', 154, '2026-04-12 08:20:00', '#2563eb'),
  createTableRow(11, '机组运行档案', '许宁', 'enabled', 144, '2026-04-11 09:55:00', '#059669'),
  createTableRow(12, '电价波动分析', '何峰', 'draft', 76, '2026-04-10 13:40:00', '#d97706')
]

const createMockExportRequest = async () => {
  return {
    data: new Blob(
      ['BaseExportButton docs demo.\n', 'This file is generated by the docs app.\n'],
      { type: 'text/plain;charset=utf-8' }
    ),
    headers: {}
  }
}

const requestTableData = async (params: Record<string, unknown>) => {
  lastRequestParams.value = JSON.stringify(params, null, 2)

  await wait(180)

  const keyword = String(params.keyword || '').trim().toLowerCase()
  const status = String(params.status || '')
  const currentPage = Number(params.currentPage || params.pageNum || 1)
  const pageSize = Number(params.pageSize || 20)
  const orderBy = String(params.orderBy || '')
  const orderDirection = String(params.orderDirection || '')

  let filteredRows = allTableRows.filter((row) => {
    const matchKeyword = !keyword || row.name.toLowerCase().includes(keyword) || row.owner.toLowerCase().includes(keyword)
    const matchStatus = !status || row.status === status
    return matchKeyword && matchStatus
  })

  if (orderBy && orderDirection) {
    filteredRows = [...filteredRows].sort((left, right) => {
      const leftValue = getSortValue(left, orderBy)
      const rightValue = getSortValue(right, orderBy)

      if (leftValue === rightValue) {
        return 0
      }

      const result = leftValue > rightValue ? 1 : -1
      return orderDirection === 'desc' ? result * -1 : result
    })
  }

  const start = (currentPage - 1) * pageSize
  const pagedRows = filteredRows.slice(start, start + pageSize)

  return {
    payload: {
      rows: pagedRows,
      count: filteredRows.length
    }
  }
}

const tableResultAdapter = (result: any) => {
  return {
    rows: result?.payload?.rows || [],
    total: Number(result?.payload?.count || 0)
  }
}

const handleTableAction = ({ row, action }: { row: DemoTableRow; action: { type: string } }) => {
  ElMessage.info(`触发 ${action.type}：${row.name}`)
}

const handleTableLoaded = (payload: { rows: DemoTableRow[]; total: number; params: Record<string, unknown> }) => {
  lastLoadedSummary.value = JSON.stringify(
    {
      currentRows: payload.rows.length,
      total: payload.total,
      firstRow: payload.rows[0]?.name || null,
      sortField: payload.params.orderBy || null,
      sortOrder: payload.params.orderDirection || null
    },
    null,
    2
  )
}

const resetTableFilters = () => {
  tableFilters.keyword = ''
  tableFilters.status = ''
  void tableRef.value?.resetPage()
}

const handleCardExport = (payload?: unknown) => {
  ElMessage.success(`BaseCard 导出触发：${JSON.stringify(payload)}`)
}

const showActionMessage = (message: string) => {
  ElMessage.info(message)
}

const randomizeChartData = () => {
  chartSeries.value = chartSeries.value.map(() => 24 + Math.round(Math.random() * 46))
}

const resizeChart = () => {
  chartRef.value?.resize()
  ElMessage.success('已调用 BaseEChart.resize()')
}

const hideChartTip = () => {
  chartRef.value?.dispatchAction({ type: 'hideTip' })
  ElMessage.info('已调用 dispatchAction({ type: "hideTip" })')
}

function createTableRow(
  id: number,
  name: string,
  owner: string,
  status: DemoTableRow['status'],
  capacity: number,
  createdAt: string,
  color: string
): DemoTableRow {
  return {
    id,
    name,
    owner,
    status,
    capacity,
    createdAt,
    cover: createSvgCover(name, color)
  }
}

function createSvgCover(label: string, color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="18" fill="${color}" />
      <text x="50%" y="54%" text-anchor="middle" fill="#ffffff" font-size="24" font-family="Arial">${label.slice(0, 2)}</text>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function getSortValue(row: DemoTableRow, field: string) {
  if (field === 'created_time') {
    return new Date(row.createdAt).getTime()
  }

  if (field === 'capacity_mwh') {
    return row.capacity
  }

  return String((row as Record<string, unknown>)[field] || '')
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
</script>

<style scoped>
.docs-home {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(circle at top left, rgba(29, 99, 255, 0.16), transparent 28%),
    radial-gradient(circle at right center, rgba(16, 185, 129, 0.12), transparent 24%),
    linear-gradient(180deg, #f5f8ff 0%, #ffffff 100%);
  color: var(--company-color-text-main);
}

.hero {
  max-width: 900px;
  margin-bottom: 28px;
}

.hero__eyebrow {
  margin: 0 0 8px;
  color: var(--company-color-primary);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0 0 12px;
  font-size: 40px;
  line-height: 1.15;
}

.hero__desc {
  margin: 0;
  max-width: 760px;
  color: var(--company-color-text-secondary);
  line-height: 1.8;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.hero__chip {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(29, 99, 255, 0.12);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
  color: var(--company-color-text-secondary);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.overview-card,
.showcase-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(8px);
}

.overview-card {
  padding: 20px;
}

.overview-card__label {
  margin: 0 0 10px;
  color: var(--company-color-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.overview-card h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.overview-card__path,
.overview-card__desc {
  margin: 0 0 8px;
  color: var(--company-color-text-secondary);
  line-height: 1.7;
  word-break: break-all;
}

.demo-section {
  margin-bottom: 28px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.section-heading__eyebrow {
  margin: 0 0 6px;
  color: var(--company-color-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.section-heading h2 {
  margin: 0;
  font-size: 28px;
}

.section-heading__desc {
  margin: 0;
  max-width: 580px;
  color: var(--company-color-text-secondary);
  line-height: 1.7;
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.metric-tile {
  padding: 14px 16px;
  border-radius: 14px;
  background: #f4f7ff;
}

.metric-tile__label {
  margin: 0 0 8px;
  color: var(--company-color-text-secondary);
  font-size: 13px;
}

.metric-tile__value {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.mini-tip,
.demo-paragraph,
.showcase-toolbar__note {
  margin: 0;
  color: var(--company-color-text-secondary);
  line-height: 1.7;
}

.showcase-card {
  padding: 20px;
}

.showcase-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.showcase-toolbar__group,
.export-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.chart-stage {
  height: 360px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(29, 99, 255, 0.06) 0%, rgba(29, 99, 255, 0.01) 100%);
  padding: 12px;
}

.table-stage {
  height: 420px;
  margin-bottom: 16px;
}

.table-toolbar {
  width: 100%;
}

.request-debug-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.debug-card {
  padding: 16px;
  border-radius: 14px;
  background: #0f172a;
  color: #e2e8f0;
}

.debug-card h3 {
  margin: 0 0 12px;
  font-size: 16px;
}

.debug-card pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.7;
  font-size: 13px;
  font-family: Consolas, 'Courier New', monospace;
}

@media (max-width: 960px) {
  .docs-home {
    padding: 20px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .two-column-grid,
  .request-debug-grid {
    grid-template-columns: 1fr;
  }

  .chart-stage,
  .table-stage {
    height: auto;
    min-height: 320px;
  }
}
</style>
