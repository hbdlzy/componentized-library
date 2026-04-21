export type BaseCardCssValue = string | number

export interface BaseCardDefaultExportPayload {
  title?: string
  metaText?: string
}

export interface BaseCardProps {
  title?: string
  metaText?: string
  showHeader?: boolean
  showRight?: boolean
  showTitleMarker?: boolean
  showExport?: boolean
  exportText?: string
  exportDisabled?: boolean
  exportPayload?: unknown
  padding?: BaseCardCssValue
  radius?: BaseCardCssValue
  borderColor?: string
  backgroundColor?: string
  shadowColor?: string
  headerGap?: BaseCardCssValue
  headerMarginBottom?: BaseCardCssValue
  leftGap?: BaseCardCssValue
  rightGap?: BaseCardCssValue
  titleColor?: string
  titleSize?: BaseCardCssValue
  titleWeight?: string | number
  markerColor?: string
  markerWidth?: BaseCardCssValue
  markerHeight?: BaseCardCssValue
  markerRadius?: BaseCardCssValue
  markerGap?: BaseCardCssValue
  metaColor?: string
  metaSize?: BaseCardCssValue
  exportColor?: string
}
