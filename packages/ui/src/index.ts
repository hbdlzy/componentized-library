import type { App, Plugin } from 'vue'
import '@hbdlzy/tokens'
import HbdlUICore from '@hbdlzy/ui-core'

export { companyTokens } from '@hbdlzy/tokens'
export { default as defaultCompanyTokens } from '@hbdlzy/tokens'
export * from '@hbdlzy/ui-core'
export * from '@hbdlzy/ui-energy'

export const uiPackageName = '@hbdlzy/ui'

export function install(app: App) {
  app.use(HbdlUICore)
}

export const HbdlUI: Plugin = {
  install
}

export default HbdlUI
