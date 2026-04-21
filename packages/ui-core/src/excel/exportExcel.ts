import * as XLSX from 'xlsx'

export type ExcelCellValue = string | number | boolean | null | undefined | Date

export interface ExcelExportColumn<Row = Record<string, any>> {
  label: string
  key?: string
  width?: number
  formatter?: (row: Row, rowIndex: number, column: ExcelExportColumn<Row>) => ExcelCellValue
  children?: Array<ExcelExportColumn<Row>>
}

export interface ExcelExportOptions<Row = Record<string, any>> {
  fileName: string
  sheetName?: string
  columns: Array<ExcelExportColumn<Row>>
  data: Array<Row>
  autoWidth?: boolean
  defaultColumnWidth?: number
}

const DEFAULT_SHEET_NAME = 'Sheet1'
const DEFAULT_COLUMN_WIDTH = 16

function getLeafCount<Row>(column: ExcelExportColumn<Row>): number {
  if (!column.children?.length) {
    return 1
  }

  return column.children.reduce((count, child) => count + getLeafCount(child), 0)
}

function getMaxDepth<Row>(columns: Array<ExcelExportColumn<Row>>, depth = 1): number {
  return columns.reduce((maxDepth, column) => {
    if (!column.children?.length) {
      return Math.max(maxDepth, depth)
    }

    return Math.max(maxDepth, getMaxDepth(column.children, depth + 1))
  }, depth)
}

function getDisplayLength(value: ExcelCellValue): number {
  const text = `${value ?? ''}`

  return Array.from(text).reduce((length, char) => {
    return length + (char.charCodeAt(0) > 255 ? 2 : 1)
  }, 0)
}

function getValueByPath(source: Record<string, any>, path?: string): ExcelCellValue {
  if (!path) {
    return ''
  }

  return path.split('.').reduce<any>((current, key) => {
    if (current === null || current === undefined) {
      return undefined
    }

    return current[key]
  }, source)
}

function getCellValue<Row>(row: Row, rowIndex: number, column: ExcelExportColumn<Row>): ExcelCellValue {
  if (typeof column.formatter === 'function') {
    return column.formatter(row, rowIndex, column)
  }

  return getValueByPath(row as Record<string, any>, column.key)
}

function buildHeaderMatrix<Row>(columns: Array<ExcelExportColumn<Row>>) {
  const maxDepth = getMaxDepth(columns)
  const totalLeafCount = columns.reduce((count, column) => count + getLeafCount(column), 0)
  const headerRows = Array.from({ length: maxDepth }, () => Array.from({ length: totalLeafCount }).fill(''))
  const merges: XLSX.Range[] = []
  const leafColumns: Array<ExcelExportColumn<Row>> = []

  let currentColumnIndex = 0

  const fillHeaders = (column: ExcelExportColumn<Row>, depth: number) => {
    const startColumnIndex = currentColumnIndex
    const leafCount = getLeafCount(column)

    headerRows[depth][startColumnIndex] = column.label

    if (column.children?.length) {
      column.children.forEach(child => fillHeaders(child, depth + 1))

      if (leafCount > 1) {
        merges.push({
          s: { r: depth, c: startColumnIndex },
          e: { r: depth, c: startColumnIndex + leafCount - 1 }
        })
      }

      return
    }

    leafColumns.push(column)
    currentColumnIndex += 1

    if (depth < maxDepth - 1) {
      merges.push({
        s: { r: depth, c: startColumnIndex },
        e: { r: maxDepth - 1, c: startColumnIndex }
      })
    }
  }

  columns.forEach(column => fillHeaders(column, 0))

  return {
    headerRows,
    leafColumns,
    merges
  }
}

function buildColumnWidths<Row>(
  leafColumns: Array<ExcelExportColumn<Row>>,
  dataRows: Array<Array<ExcelCellValue>>,
  defaultColumnWidth: number,
  autoWidth: boolean
) {
  return leafColumns.map((column, columnIndex) => {
    const headerWidth = getDisplayLength(column.label)
    const dataWidth = dataRows.reduce((maxWidth, row) => {
      return Math.max(maxWidth, getDisplayLength(row[columnIndex]))
    }, 0)

    const targetWidth =
      column.width ?? (autoWidth ? Math.max(defaultColumnWidth, headerWidth, dataWidth) : defaultColumnWidth)

    return { wch: targetWidth }
  })
}

function normalizeFileName(fileName: string) {
  return fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`
}

export function exportExcel<Row = Record<string, any>>(options: ExcelExportOptions<Row>) {
  const {
    fileName,
    sheetName = DEFAULT_SHEET_NAME,
    data,
    autoWidth = true,
    defaultColumnWidth = DEFAULT_COLUMN_WIDTH
  } = options
  const columns = options.columns.filter(column => !!column)

  if (!columns.length) {
    throw new Error('Excel export columns can not be empty.')
  }

  const { headerRows, leafColumns, merges } = buildHeaderMatrix(columns)
  const dataRows = data.map((row, rowIndex) => leafColumns.map(column => getCellValue(row, rowIndex, column)))

  const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows])
  worksheet['!merges'] = merges
  worksheet['!cols'] = buildColumnWidths(leafColumns, dataRows, defaultColumnWidth, autoWidth)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  XLSX.writeFile(workbook, normalizeFileName(fileName))
}

export default exportExcel
