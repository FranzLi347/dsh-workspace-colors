import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import { ColorPanel } from './ColorPanel.tsx'
import { createColorStore } from './store.ts'
import { en, zh, type ColorKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap { workspaceColors: ColorKey }
}

export const inject = ['slots', 'locale', 'workspaces']

/** Register one footer contribution for each sidebar declaration lifetime. */
export function apply(ctx: Context): void {
  ctx.effect(() => ctx.locale.register('workspaceColors', { en, zh }), 'workspace-colors: locale')
  const store = createColorStore()
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action', id: 'workspace-colors', order: 300,
    locale: 'workspaceColors', store,
  }, ColorPanel))
}
