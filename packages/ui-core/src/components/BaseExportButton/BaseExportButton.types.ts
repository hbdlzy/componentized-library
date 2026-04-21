import type { ExcelExportOptions } from '../../excel/exportExcel'

export interface ExportResponseHeaders {
  [key: string]: string | undefined
}

export interface ExportResponseLike {
  data: Blob | BlobPart | ArrayBuffer
  headers?: ExportResponseHeaders
}

export type ExportRequestHandler = () => Promise<ExportResponseLike>

export type ExportMode = 'excel' | 'request' | 'none' | 'invalid'

export type ExportBeforeHandler = () => boolean | void | Promise<boolean | void>

export interface ExportSuccessPayload {
  mode: Exclude<ExportMode, 'none' | 'invalid'>
  fileName?: string
}

export interface BaseExportExcelConfig<Row = Record<string, any>> {
  excelOptions: ExcelExportOptions<Row>
}

export interface BaseExportRequestConfig {
  requestHandler: ExportRequestHandler
}
