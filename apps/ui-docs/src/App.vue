<template>
  <main class="docs-home">
    <svg class="svg-demo-sprite" aria-hidden="true">
      <symbol id="icon-filter" viewBox="0 0 24 24">
        <path d="M4 5.75C4 5.34 4.34 5 4.75 5h14.5a.75.75 0 0 1 .55 1.26l-5.55 6.02v5.1a.75.75 0 0 1-.36.64l-3.3 2a.75.75 0 0 1-1.14-.64v-7.1L4.2 6.26A.75.75 0 0 1 4 5.75Z" />
      </symbol>
      <symbol id="icon-f_2" viewBox="0 0 24 24">
        <path d="M10.5 5.75a4.75 4.75 0 1 1-1.12 9.36l-3.5 3.5a1 1 0 0 1-1.42-1.42l3.5-3.5a4.75 4.75 0 0 1 2.54-7.94Zm0 2a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm5.2 8.54 3.84 3.84a1 1 0 1 1-1.42 1.42l-3.84-3.84a1 1 0 0 1 1.42-1.42Z" />
      </symbol>
    </svg>

    <section class="hero">
      <p class="hero__eyebrow">Company Shared UI</p>
      <h1>公共组件 Demo 工作台</h1>
      <p class="hero__desc">
        这里集中展示当前已经沉淀到组件库里的基础组件、表单控件和工具能力，方便在接入新项目时直接查看推荐用法。
      </p>
      <div class="hero__actions">
        <span class="hero__chip">统一安装入口：@hbdlzy/ui</span>
        <span class="hero__chip">当前 ui-core 组件：{{ uiCoreComponentCount }} 个</span>
        <span class="hero__chip">工作区包：{{ packages.length }} 个</span>
      </div>
    </section>

    <section class="overview-grid">
      <article
        v-for="pkg in packages"
        :key="pkg.name"
        class="overview-card"
      >
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
          <p class="section-heading__eyebrow">Ripple</p>
          <h2>全局点击涟漪</h2>
        </div>
        <p class="section-heading__desc">
          文档站通过 `@hbdlzy/ui` 主入口自动启用，业务项目全局引入后按钮会获得统一点击反馈。
        </p>
      </div>

      <div class="showcase-card">
        <div class="ripple-demo-grid">
          <article class="ripple-demo-item">
            <h3>Element Plus 按钮</h3>
            <p>适用于 `el-button`、radio button 和 checkbox button。</p>
            <div class="ripple-demo-actions">
              <el-button type="primary">
                主要操作
              </el-button>
              <el-button plain>
                次要操作
              </el-button>
            </div>
          </article>

          <article class="ripple-demo-item">
            <h3>原生按钮</h3>
            <p>适用于原生 `button` 和带 `role="button"` 的类按钮元素。</p>
            <div class="ripple-demo-actions">
              <button
                type="button"
                class="native-ripple-button"
              >
                原生按钮
              </button>
              <span
                role="button"
                tabindex="0"
                class="role-ripple-button"
              >
                类按钮
              </span>
            </div>
          </article>

          <article class="ripple-demo-item">
            <h3>局部控制</h3>
            <p>支持局部关闭，也可以用 CSS 变量调整涟漪颜色。</p>
            <div class="ripple-demo-actions">
              <el-button data-hbdl-ripple="false">
                关闭涟漪
              </el-button>
              <el-button class="custom-ripple-button">
                自定义颜色
              </el-button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">SvgIcon</p>
          <h2>SVG 图标展示</h2>
        </div>
        <p class="section-heading__desc">
          兼容 symbol sprite 和外链 SVG，旧项目的 `icon-class`、`class-name` 写法可以直接迁移。
        </p>
      </div>

      <div class="showcase-card">
        <div class="svg-demo-grid">
          <article class="svg-demo-item">
            <div class="svg-demo-item__icon">
              <SvgIcon
                icon-class="filter"
                class-name="svg-demo-icon"
                aria-label="筛选"
              />
            </div>
            <div>
              <h3>筛选图标</h3>
              <p>#icon-filter</p>
            </div>
          </article>

          <article class="svg-demo-item">
            <div class="svg-demo-item__icon svg-demo-item__icon--green">
              <SvgIcon
                icon-class="f_2 "
                class-name="svg-demo-icon"
                aria-label="搜索"
              />
            </div>
            <div>
              <h3>搜索图标</h3>
              <p>#icon-f_2</p>
            </div>
          </article>

          <article class="svg-demo-item">
            <div class="svg-demo-item__icon svg-demo-item__icon--orange">
              <SvgIcon
                :icon-class="externalSvgIcon"
                class-name="svg-demo-icon"
                aria-label="外链图标"
              />
            </div>
            <div>
              <h3>外链图标</h3>
              <p>mask currentColor</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseCard</p>
          <h2>统一卡片容器</h2>
        </div>
        <p class="section-heading__desc">
          演示标题区、右侧信息区、提示区和导出触发区，页面层不需要再重复写统一头部结构。
        </p>
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
            <el-tag type="success">
              实时
            </el-tag>
          </template>

          <template #tip>
            <p class="mini-tip">适合包裹统计块、图表块和详情信息卡片。</p>
          </template>

          <div class="metric-grid">
            <div
              v-for="item in cardMetrics"
              :key="item.label"
              class="metric-tile"
            >
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
            <el-radio-group
              v-model="activeCardRange"
              size="small"
            >
              <el-radio-button label="日内" />
              <el-radio-button label="周内" />
              <el-radio-button label="月内" />
            </el-radio-group>
          </template>

          <template #header-right>
            <el-button
              text
              @click="showActionMessage('BaseCard 右侧插槽触发')"
            >
              刷新
            </el-button>
          </template>

          <p class="demo-paragraph">
            当前选择：{{ activeCardRange }}。这个示例用来说明 `BaseCard`
            可以同时承载标题、标题插槽和右侧操作区，不需要页面层重复包一层卡片头部。
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
        <p class="section-heading__desc">
          演示 option 驱动渲染、实例方法暴露和统一导出的 echarts 工具。
        </p>
      </div>

      <div class="showcase-card">
        <div class="showcase-toolbar">
          <div class="showcase-toolbar__group">
            <el-button
              type="primary"
              plain
              @click="randomizeChartData"
            >
              刷新数据
            </el-button>
            <el-button
              plain
              @click="resizeChart"
            >
              触发 resize
            </el-button>
            <el-button
              plain
              @click="hideChartTip"
            >
              隐藏 tooltip
            </el-button>
          </div>
          <p class="showcase-toolbar__note">
            图表渐变色通过统一导出的 `echarts.graphic.LinearGradient` 生成。
          </p>
        </div>

        <div class="chart-stage">
          <BaseEChart
            ref="chartRef"
            :option="chartOption"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseExportButton</p>
          <h2>统一导出按钮</h2>
        </div>
        <p class="section-heading__desc">
          演示前端 Excel 导出和后端 blob 下载两种常见模式。
        </p>
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
          左侧按钮走前端 Excel 导出，右侧按钮模拟接口返回 blob 文件下载。
        </p>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">OutlinedForm</p>
          <h2>统一浮动标签表单控件</h2>
        </div>
        <p class="section-heading__desc">
          演示 `OutlinedInput`、`OutlinedSelect`、`OutlinedDatePicker`、`OutlinedDateTimePicker`、
          `OutlinedTimePicker`、`OutlinedCascader` 和 `OutlinedTreeSelect` 的统一风格、属性透传和实例方法暴露。
        </p>
      </div>

      <div class="showcase-card">
        <div class="outlined-form-grid">
          <div class="outlined-demo-panel">
            <OutlinedInput
              ref="outlinedInputRef"
              v-model:value="outlinedForm.stationName"
              placeholder="电站名称"
              :is-border="true"
              :input-height="40"
              required
              :error="isOutlinedFieldError('stationName')"
              :error-message="getOutlinedFieldError('stationName')"
              clearable
            />

            <OutlinedSelect
              ref="outlinedSelectRef"
              v-model:value="outlinedForm.strategyMode"
              placeholder="参与方式"
              :is-border="true"
              :input-height="40"
              :options="outlinedSelectOptions"
              required
              :error="isOutlinedFieldError('strategyMode')"
              :error-message="getOutlinedFieldError('strategyMode')"
            />

            <OutlinedDatePicker
              ref="outlinedDatePickerRef"
              v-model:value="outlinedForm.effectDate"
              placeholder="开始生效日期"
              :is-border="true"
              :input-height="40"
              type-date="date"
              :disabled-date="'nowDate'"
              required
              :error="isOutlinedFieldError('effectDate')"
              :error-message="getOutlinedFieldError('effectDate')"
            />

            <OutlinedDateTimePicker
              ref="outlinedDateTimePickerRef"
              v-model:value="outlinedForm.startAt"
              placeholder="开始执行日期"
              time-placeholder="执行时间"
              :is-border="true"
              :input-height="40"
              :disabled-date="'nowDate'"
              required
              :error="isOutlinedFieldError('startAt')"
              :error-message="getOutlinedFieldError('startAt')"
              clearable
            />

            <OutlinedTimePicker
              ref="outlinedTimePickerRef"
              v-model:value="outlinedForm.executeRange"
              label="执行时段"
              :is-range="true"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :is-border="true"
              :input-height="40"
              required
              :error="isOutlinedFieldError('executeRange')"
              :error-message="getOutlinedFieldError('executeRange')"
              clearable
            />

            <OutlinedCascader
              ref="outlinedCascaderRef"
              v-model:value="outlinedForm.areaPath"
              placeholder="所属区域"
              :is-border="true"
              :input-height="40"
              :options="outlinedCascaderOptions"
              :props-value="outlinedCascaderProps"
              required
              :error="isOutlinedFieldError('areaPath')"
              :error-message="getOutlinedFieldError('areaPath')"
              clearable
              filterable
            />

            <OutlinedTreeSelect
              ref="outlinedTreeSelectRef"
              v-model:value="outlinedForm.parentNodeId"
              placeholder="选择父节点"
              :data="outlinedTreeSelectData"
              :props-value="outlinedTreeSelectProps"
              :check-strictly="true"
              :is-border="true"
              :input-height="40"
              required
              :error="isOutlinedFieldError('parentNodeId')"
              :error-message="getOutlinedFieldError('parentNodeId')"
              clearable
              filterable
            />

            <OutlinedInput
              v-model:value="outlinedForm.remark"
              placeholder="备注"
              type-input="textarea"
              :is-border="true"
              :autosize="{ minRows: 4, maxRows: 4 }"
              resize="none"
              maxlength="120"
            />

            <div class="showcase-toolbar__group">
              <el-button
                type="primary"
                @click="saveOutlinedForm"
              >
                保存配置
              </el-button>
              <el-button
                type="primary"
                plain
                @click="focusOutlinedInput"
              >
                聚焦输入框
              </el-button>
              <el-button
                plain
                @click="toggleOutlinedSelect"
              >
                展开参与方式
              </el-button>
              <el-button
                plain
                @click="openOutlinedDatePicker"
              >
                打开日期面板
              </el-button>
              <el-button
                plain
                @click="openOutlinedDateTimePicker"
              >
                打开时间面板
              </el-button>
              <el-button
                plain
                @click="openOutlinedTimePicker"
              >
                打开时段面板
              </el-button>
              <el-button
                plain
                @click="toggleOutlinedCascader"
              >
                切换级联面板
              </el-button>
              <el-button
                plain
                @click="focusOutlinedTreeSelect"
              >
                聚焦树选择
              </el-button>
            </div>
          </div>

          <div class="debug-card">
            <h3>当前表单状态</h3>
            <pre>{{ outlinedDebug }}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">BaseTable</p>
          <h2>统一表格封装</h2>
        </div>
        <p class="section-heading__desc">
          演示工具栏插槽、远程请求、默认排序、请求参数映射、结果适配和操作列回调。
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
            :has-selection="true"
            :has-index="true"
            border
            @selection-change="handleTableSelectionChange"
            @row-action="handleTableAction"
            @loaded="handleTableLoaded"
          >
            <template #toolbar>
              <div class="table-toolbar">
                <el-form inline>
                  <el-form-item label="名称">
                    <el-input
                      v-model="tableFilters.keyword"
                      placeholder="请输入名称"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select
                      v-model="tableFilters.status"
                      placeholder="全部状态"
                      clearable
                      style="width: 140px"
                    >
                      <el-option
                        v-for="option in statusOptions"
                        :key="String(option.value)"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="reloadTable"
                    >
                      查询
                    </el-button>
                    <el-button @click="resetTableFilters">
                      重置
                    </el-button>
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
  SvgIcon,
  OutlinedCascader,
  OutlinedDatePicker,
  OutlinedDateTimePicker,
  OutlinedTimePicker,
  OutlinedInput,
  OutlinedSelect,
  OutlinedTreeSelect,
  echarts,
  type BaseEChartExpose,
  type BaseTableColumn,
  type BaseTableExpose,
  type BaseTableOption,
  type EChartOption,
  type ExcelExportColumn,
  type OutlinedCascaderExpose,
  type OutlinedDatePickerExpose,
  type OutlinedDateTimePickerExpose,
  type OutlinedTimePickerExpose,
  type OutlinedInputExpose,
  type OutlinedSelectExpose,
  type OutlinedTreeSelectExpose
} from '@hbdlzy/ui'
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
  regionPath: string[]
  categories: string[]
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
const externalSvgIcon = createSvgIconUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 3.5 19.36 8v8L12 20.5 4.64 16V8L12 3.5Zm0 2.34L6.64 9.1v5.8L12 18.16l5.36-3.26V9.1L12 5.84Zm0 3.16a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
  </svg>
`)

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

const outlinedInputRef = ref<OutlinedInputExpose | null>(null)
const outlinedSelectRef = ref<OutlinedSelectExpose | null>(null)
const outlinedDatePickerRef = ref<OutlinedDatePickerExpose | null>(null)
const outlinedDateTimePickerRef = ref<OutlinedDateTimePickerExpose | null>(null)
const outlinedTimePickerRef = ref<OutlinedTimePickerExpose | null>(null)
const outlinedCascaderRef = ref<OutlinedCascaderExpose | null>(null)
const outlinedTreeSelectRef = ref<OutlinedTreeSelectExpose | null>(null)

const outlinedForm = reactive({
  stationName: '华北储能一号站',
  strategyMode: 'spot',
  effectDate: '2026-04-22',
  startAt: '2026-04-22 09:00',
  executeRange: ['09:00', '18:00'],
  areaPath: ['north', 'beijing', 'chaoyang'],
  parentNodeId: 'beijing',
  remark: '这个示例演示 OutlinedForm 系列的统一浮动标签风格、属性透传和实例方法暴露。'
})

type OutlinedRequiredFieldKey =
  | 'stationName'
  | 'strategyMode'
  | 'effectDate'
  | 'startAt'
  | 'executeRange'
  | 'areaPath'
  | 'parentNodeId'

const outlinedFormSubmitted = ref(false)

const outlinedRequiredFields: Array<{ key: OutlinedRequiredFieldKey; label: string }> = [
  { key: 'stationName', label: '电站名称' },
  { key: 'strategyMode', label: '参与方式' },
  { key: 'effectDate', label: '开始生效日期' },
  { key: 'startAt', label: '开始执行日期' },
  { key: 'executeRange', label: '执行时段' },
  { key: 'areaPath', label: '所属区域' },
  { key: 'parentNodeId', label: '选择父节点' }
]

const outlinedFormErrors = computed<Partial<Record<OutlinedRequiredFieldKey, string>>>(() => {
  if (!outlinedFormSubmitted.value) {
    return {}
  }

  return outlinedRequiredFields.reduce<Partial<Record<OutlinedRequiredFieldKey, string>>>((errors, field) => {
    if (!hasOutlinedFormValue(outlinedForm[field.key])) {
      errors[field.key] = `${field.label}为必填项`
    }

    return errors
  }, {})
})

const outlinedSelectOptions = [
  { label: '现货', value: 'spot' },
  { label: '调频', value: 'fm' },
  { label: '备用', value: 'reserve' }
]

const outlinedCascaderOptions = [
  {
    label: '华北',
    value: 'north',
    children: [
      {
        label: '北京',
        value: 'beijing',
        children: [
          { label: '朝阳站', value: 'chaoyang' },
          { label: '通州站', value: 'tongzhou' }
        ]
      },
      {
        label: '天津',
        value: 'tianjin',
        children: [
          { label: '滨海站', value: 'binhai' }
        ]
      }
    ]
  },
  {
    label: '华东',
    value: 'east',
    children: [
      {
        label: '上海',
        value: 'shanghai',
        children: [
          { label: '临港站', value: 'lingang' }
        ]
      }
    ]
  }
]

const outlinedCascaderProps = {
  value: 'value',
  label: 'label',
  children: 'children'
}

const outlinedTreeSelectData = [
  {
    id: 'north',
    name: '华北',
    children: [
      { id: 'beijing', name: '北京节点' },
      { id: 'tianjin', name: '天津节点' }
    ]
  },
  {
    id: 'east',
    name: '华东',
    children: [
      { id: 'shanghai', name: '上海节点' },
      { id: 'hangzhou', name: '杭州节点' }
    ]
  }
]

const outlinedTreeSelectProps = {
  value: 'id',
  label: 'name',
  children: 'children'
}

const outlinedDebug = computed(() =>
  JSON.stringify(
    {
      stationName: outlinedForm.stationName,
      strategyMode: outlinedForm.strategyMode,
      effectDate: outlinedForm.effectDate,
      startAt: outlinedForm.startAt,
      executeRange: outlinedForm.executeRange,
      areaPath: outlinedForm.areaPath,
      parentNodeId: outlinedForm.parentNodeId,
      remark: outlinedForm.remark
    },
    null,
    2
  )
)

const statusOptions: BaseTableOption[] = [
  { label: '启用', value: 'enabled', tagType: 'success' },
  { label: '停用', value: 'disabled', tagType: 'info' },
  { label: '草稿', value: 'draft', tagType: 'warning' }
]

const regionOptions: BaseTableOption[] = [
  {
    label: '华北',
    value: 'north',
    children: [
      {
        label: '北京',
        value: 'beijing',
        children: [
          { label: '朝阳区', value: 'chaoyang' },
          { label: '通州区', value: 'tongzhou' }
        ]
      },
      {
        label: '天津',
        value: 'tianjin',
        children: [
          { label: '滨海新区', value: 'binhai' }
        ]
      }
    ]
  },
  {
    label: '华东',
    value: 'east',
    children: [
      {
        label: '上海',
        value: 'shanghai',
        children: [
          { label: '临港新区', value: 'lingang' },
          { label: '浦东新区', value: 'pudong' }
        ]
      },
      {
        label: '浙江',
        value: 'zhejiang',
        children: [
          { label: '杭州', value: 'hangzhou' },
          { label: '宁波', value: 'ningbo' }
        ]
      }
    ]
  }
]

const categoryOptions: BaseTableOption[] = [
  { label: '市场资讯', value: 'market', tagType: 'primary' },
  { label: '运行日报', value: 'operation', tagType: 'success' },
  { label: '收益分析', value: 'revenue', tagType: 'warning' },
  { label: '设备巡检', value: 'inspection', tagType: 'info' }
]

const regionLabelMap = flattenOptionLabelMap(regionOptions)

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
    minWidth: 140,
    align: 'center',
    headerSearch: {
      placeholder: '请输入搜索内容'
    }
  },
  {
    label: '状态',
    prop: 'status',
    kind: 'tag',
    minWidth: 120,
    options: statusOptions,
    headerSearch: {
      type: 'select',
      placeholder: '请选择状态',
      options: statusOptions,
      width: 220,
      filterable: true,
      searchText: '筛选'
    }
  },
  {
    label: '所在区域',
    prop: 'regionPath',
    minWidth: 190,
    formatter: (row) => row.regionPath.map((item) => regionLabelMap[item] || item).join(' / '),
    headerSearch: {
      type: 'cascader',
      placeholder: '请选择区域',
      options: regionOptions,
      width: 420,
      searchText: '筛选'
    }
  },
  {
    label: '资讯分类',
    prop: 'categories',
    kind: 'tag',
    minWidth: 190,
    options: categoryOptions,
    headerSearch: {
      type: 'select',
      multiple: true,
      placeholder: '请选择分类',
      options: categoryOptions,
      width: 280,
      filterable: true,
      searchText: '筛选'
    }
  },
  {
    label: '容量(MWh)',
    prop: 'capacity',
    align: 'center',
    sortable: true,
    sortField: 'capacity_mwh',
    minWidth: 130
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    sortable: true,
    sortField: 'created_time',
    minWidth: 180,
    headerSearch: {
      type: 'datetimerange',
      paramKey: 'createdAtRange',
      startPlaceholder: '开始',
      endPlaceholder: '结束',
      searchText: '筛选'
    }
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
  createTableRow(1, '华北调峰策略', '张三', 'enabled', ['north', 'beijing', 'chaoyang'], ['market', 'operation'], 168, '2026-04-21 08:30:00', '#1d63ff'),
  createTableRow(2, '华东市场复盘', '李四', 'disabled', ['east', 'shanghai', 'lingang'], ['market', 'revenue'], 132, '2026-04-20 17:30:00', '#10b981'),
  createTableRow(3, '调频收益分析', '王五', 'draft', ['north', 'tianjin', 'binhai'], ['revenue'], 96, '2026-04-19 10:30:00', '#f97316'),
  createTableRow(4, '站端实时巡检', '赵六', 'enabled', ['east', 'zhejiang', 'hangzhou'], ['inspection', 'operation'], 124, '2026-04-18 11:15:00', '#7c3aed'),
  createTableRow(5, '运行日报看板', '陈晨', 'enabled', ['north', 'beijing', 'tongzhou'], ['operation'], 188, '2026-04-17 09:05:00', '#ef4444'),
  createTableRow(6, '储能策略联动', '孙敏', 'disabled', ['east', 'zhejiang', 'ningbo'], ['market', 'inspection'], 86, '2026-04-16 14:45:00', '#0ea5e9'),
  createTableRow(7, '现货结算汇总', '周航', 'enabled', ['east', 'shanghai', 'pudong'], ['market', 'revenue'], 212, '2026-04-15 15:20:00', '#06b6d4'),
  createTableRow(8, '负荷预测分析', '钱进', 'draft', ['north', 'beijing', 'chaoyang'], ['operation', 'inspection'], 118, '2026-04-14 12:35:00', '#84cc16')
]

const createMockExportRequest = async () => ({
  data: new Blob(
    ['BaseExportButton docs demo.\n', 'This file is generated by the docs app.\n'],
    { type: 'text/plain;charset=utf-8' }
  ),
  headers: {}
})

const requestTableData = async (params: Record<string, unknown>) => {
  lastRequestParams.value = JSON.stringify(params, null, 2)

  await wait(180)

  const keyword = String(params.keyword || '').trim().toLowerCase()
  const status = String(params.status || '')
  const ownerKeyword = String(params.owner || '').trim().toLowerCase()
  const regionPath = Array.isArray(params.regionPath) ? params.regionPath.map((item) => String(item)) : []
  const categories = Array.isArray(params.categories) ? params.categories.map((item) => String(item)) : []
  const createdAtRange = Array.isArray(params.createdAtRange) ? params.createdAtRange.map((item) => String(item)) : []
  const currentPage = Number(params.currentPage || params.pageNum || 1)
  const pageSize = Number(params.pageSize || 20)
  const orderBy = String(params.orderBy || '')
  const orderDirection = String(params.orderDirection || '')

  let filteredRows = allTableRows.filter((row) => {
    const matchKeyword = !keyword || row.name.toLowerCase().includes(keyword) || row.owner.toLowerCase().includes(keyword)
    const matchStatus = !status || row.status === status
    const matchOwner = !ownerKeyword || row.owner.toLowerCase().includes(ownerKeyword)
    const matchRegion = !regionPath.length || regionPath.every((item, index) => row.regionPath[index] === item)
    const matchCategories = !categories.length || categories.every((item) => row.categories.includes(item))
    const matchCreatedAt = !createdAtRange.length ||
      (row.createdAt >= String(createdAtRange[0] || '') && row.createdAt <= String(createdAtRange[1] || ''))
    return matchKeyword && matchStatus && matchOwner && matchRegion && matchCategories && matchCreatedAt
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

const tableResultAdapter = (result: any) => ({
  rows: result?.payload?.rows || [],
  total: Number(result?.payload?.count || 0)
})

const handleTableAction = ({ row, action }: { row: DemoTableRow; action: { type: string } }) => {
  ElMessage.info(`触发 ${action.type}：${row.name}`)
}

const handleTableSelectionChange = (rows: DemoTableRow[]) => {
  lastLoadedSummary.value = JSON.stringify(
    {
      selectedRows: rows.length,
      selectedNames: rows.map((row) => row.name)
    },
    null,
    2
  )
}

const handleTableLoaded = (payload: { rows: DemoTableRow[]; total: number; params: Record<string, unknown> }) => {
  lastLoadedSummary.value = JSON.stringify(
    {
      currentRows: payload.rows.length,
      total: payload.total,
      firstRow: payload.rows[0]?.name || null,
      regionPath: payload.params.regionPath || null,
      categories: payload.params.categories || null,
      sortField: payload.params.orderBy || null,
      sortOrder: payload.params.orderDirection || null
    },
    null,
    2
  )
}

const reloadTable = () => {
  void tableRef.value?.resetPage()
}

const resetTableFilters = () => {
  tableFilters.keyword = ''
  tableFilters.status = ''
  void tableRef.value?.resetHeaderSearch()
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

const saveOutlinedForm = () => {
  outlinedFormSubmitted.value = true

  if (Object.keys(outlinedFormErrors.value).length > 0) {
    ElMessage.error('请完善必填项')
    return
  }

  ElMessage.success('保存成功')
}

const isOutlinedFieldError = (key: OutlinedRequiredFieldKey) => Boolean(outlinedFormErrors.value[key])

const getOutlinedFieldError = (key: OutlinedRequiredFieldKey) => outlinedFormErrors.value[key] || ''

function hasOutlinedFormValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== undefined && value !== null && String(value).trim() !== ''
}

const focusOutlinedInput = () => {
  outlinedInputRef.value?.focus()
}

const toggleOutlinedSelect = () => {
  outlinedSelectRef.value?.toggleMenu()
}

const openOutlinedDatePicker = () => {
  outlinedDatePickerRef.value?.handleOpen()
}

const openOutlinedDateTimePicker = () => {
  outlinedDateTimePickerRef.value?.openTimePanel()
}

const openOutlinedTimePicker = () => {
  outlinedTimePickerRef.value?.handleOpen()
}

const toggleOutlinedCascader = () => {
  outlinedCascaderRef.value?.togglePopperVisible()
}

const focusOutlinedTreeSelect = () => {
  outlinedTreeSelectRef.value?.focus()
}

function createTableRow(
  id: number,
  name: string,
  owner: string,
  status: DemoTableRow['status'],
  regionPath: string[],
  categories: string[],
  capacity: number,
  createdAt: string,
  color: string
): DemoTableRow {
  return {
    id,
    name,
    owner,
    status,
    regionPath,
    categories,
    capacity,
    createdAt,
    cover: createSvgCover(name, color)
  }
}

function flattenOptionLabelMap(options: BaseTableOption[]) {
  return options.reduce<Record<string, string>>((result, option) => {
    result[String(option.value)] = option.label

    if (option.children?.length) {
      Object.assign(result, flattenOptionLabelMap(option.children))
    }

    return result
  }, {})
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

function createSvgIconUrl(svg: string) {
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
  align-items: flex-end;
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

.two-column-grid,
.request-debug-grid,
.outlined-form-grid {
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

.svg-demo-sprite {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-demo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.svg-demo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  background: #f8fbff;
}

.svg-demo-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  color: #1d63ff;
  background: rgba(29, 99, 255, 0.1);
}

.svg-demo-item__icon--green {
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
}

.svg-demo-item__icon--orange {
  color: #ea580c;
  background: rgba(234, 88, 12, 0.1);
}

.svg-demo-icon {
  font-size: 22px;
}

.svg-demo-item h3 {
  margin: 0 0 6px;
  font-size: 16px;
}

.svg-demo-item p {
  margin: 0;
  color: var(--company-color-text-secondary);
  line-height: 1.6;
  word-break: break-all;
}

.ripple-demo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.ripple-demo-item {
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  background: #f8fbff;
}

.ripple-demo-item h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.ripple-demo-item p {
  margin: 0 0 14px;
  color: var(--company-color-text-secondary);
  line-height: 1.7;
}

.ripple-demo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.native-ripple-button,
.role-ripple-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(29, 99, 255, 0.24);
  border-radius: 4px;
  background: #ffffff;
  color: var(--company-color-primary);
  font: inherit;
  cursor: pointer;
}

.role-ripple-button {
  background: #eff6ff;
}

.custom-ripple-button {
  --hbdl-ripple-color: #f97316;
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

.outlined-demo-panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border-radius: 14px;
  background: #f8fbff;
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
  .request-debug-grid,
  .outlined-form-grid,
  .ripple-demo-grid,
  .svg-demo-grid {
    grid-template-columns: 1fr;
  }

  .chart-stage,
  .table-stage {
    height: auto;
    min-height: 320px;
  }
}
</style>
