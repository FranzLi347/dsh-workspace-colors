import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Modal, IconFolderCloseRegular } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-workspace/client'
import type { createColorStore } from './store.ts'
import { COLORS, colorFor, rowStyles } from './colors.ts'
import styles from './styles.css?inline'

export type ColorPanelProps = PropsRuntime<'sidebar.footer.action'>
  & PropsLocale<'workspaceColors'> & PropsStore<ReturnType<typeof createColorStore>>

/** Additive footer control and modal; React removes all color styles on unload. */
export function ColorPanel({ useWorkspaces, useStore, actions, t }: ColorPanelProps) {
  const [open, setOpen] = useState(false)
  const snapshot = useWorkspaces(state => state)
  const colors = useStore(state => state.colors)
  return <>
    <style>{styles + '\n' + rowStyles(colors, snapshot.items.map(workspace => workspace.workspaceId))}</style>
    <button type="button" className="dsh-wc-trigger" title={t('title')} aria-label={t('title')}
      aria-haspopup="dialog" onClick={() => setOpen(true)}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.3 1.3 0 0 1 .7-2.3H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="10" r="1.5" fill="currentColor"/><circle cx="11" cy="7" r="1.5" fill="currentColor"/><circle cx="16" cy="9" r="1.5" fill="currentColor"/>
      </svg>
    </button>
    <Modal open={open} onClose={() => setOpen(false)} title={t('title')} closeLabel={t('close')}
      description={t('description')} contentClassName="dsh-wc-content">
      {snapshot.items.length === 0 && <p>{t(snapshot.phase === 'ready' ? 'empty' : 'loading')}</p>}
      {snapshot.items.map(workspace => {
        const color = colorFor(colors, workspace.workspaceId)
        const title = t('current', { color: t(color ?? 'default') })
        return <fieldset className="dsh-wc-workspace" key={workspace.workspaceId}>
          <legend title={workspace.path}><IconFolderCloseRegular size={16}/>{workspace.title}</legend>
          <p className="dsh-wc-path" title={workspace.path}>{workspace.path}</p>
          <div className="dsh-wc-choices" role="group" aria-label={title}>
            {[undefined, ...COLORS].map(choice => <button type="button" key={choice ?? 'default'}
              className="dsh-wc-choice" aria-pressed={choice === color}
              aria-label={t('choice', { name: workspace.title, color: t(choice ?? 'default') })}
              title={t(choice ?? 'default')} onClick={() => actions.setColor(workspace.workspaceId, choice)}>
              <span className="dsh-wc-swatch" aria-hidden="true"
                style={{ '--dsh-wc-swatch': choice === undefined ? 'transparent' : `var(--dsh-wc-${choice})` } as CSSProperties}>
                {choice === color ? '✓' : choice === undefined ? '∅' : ''}
              </span>
              {t(choice ?? 'default')}
            </button>)}
          </div>
        </fieldset>
      })}
    </Modal>
  </>
}
