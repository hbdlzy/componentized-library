import { saveAs } from 'file-saver'
import type { ExportResponseHeaders, ExportResponseLike } from './BaseExportButton.types'

const DEFAULT_EXPORT_FILE_NAME = 'export-file'

function getHeaderValue(headers: ExportResponseHeaders | undefined, headerName: string) {
  if (!headers) {
    return ''
  }

  const targetHeaderName = headerName.toLowerCase()
  const matchedHeaderKey = Object.keys(headers).find(key => key.toLowerCase() === targetHeaderName)

  return matchedHeaderKey ? headers[matchedHeaderKey] ?? '' : ''
}

export function extractFileNameFromDisposition(contentDisposition?: string) {
  if (!contentDisposition) {
    return ''
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)

  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1].replace(/["']/g, ''))
  }

  const basicMatch = contentDisposition.match(/filename="?([^";]+)"?/i)

  if (basicMatch?.[1]) {
    return decodeURIComponent(basicMatch[1].replace(/["']/g, ''))
  }

  return ''
}

export function normalizeExportFileName(fileName?: string) {
  const normalizedFileName = `${fileName ?? ''}`.trim()

  return normalizedFileName || DEFAULT_EXPORT_FILE_NAME
}

function toBlob(payload: ExportResponseLike['data']) {
  return payload instanceof Blob ? payload : new Blob([payload])
}

export function downloadExportResponse(response: ExportResponseLike, fallbackFileName = '') {
  const contentDisposition = getHeaderValue(response.headers, 'content-disposition')
  const fileName = normalizeExportFileName(extractFileNameFromDisposition(contentDisposition) || fallbackFileName)

  saveAs(toBlob(response.data), fileName)

  return fileName
}
