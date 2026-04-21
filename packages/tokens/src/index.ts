import './theme.css'

export const companyTokens = {
  color: {
    primary: 'var(--company-color-primary)',
    primaryHover: 'var(--company-color-primary-hover)',
    success: 'var(--company-color-success)',
    warning: 'var(--company-color-warning)',
    danger: 'var(--company-color-danger)',
    textMain: 'var(--company-color-text-main)',
    textSecondary: 'var(--company-color-text-secondary)',
    border: 'var(--company-color-border)',
    surface: 'var(--company-color-surface)',
    surfaceMuted: 'var(--company-color-surface-muted)'
  },
  radius: {
    sm: 'var(--company-radius-sm)',
    md: 'var(--company-radius-md)',
    lg: 'var(--company-radius-lg)'
  },
  space: {
    2: 'var(--company-space-2)',
    3: 'var(--company-space-3)',
    4: 'var(--company-space-4)',
    5: 'var(--company-space-5)',
    6: 'var(--company-space-6)'
  },
  shadow: {
    card: 'var(--company-shadow-card)'
  }
} as const

export default companyTokens
