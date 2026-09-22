import { useSyncExternalStore } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ColorPanel } from '../src/ColorPanel.tsx'
import { createColorStore } from '../src/store.ts'
import { zh, en } from '../src/locales.ts'
import type { ColorPanelProps } from '../src/ColorPanel.tsx'

afterEach(() => { cleanup(); localStorage.clear() })

function renderPanel(dictionary = en) {
  const store = createColorStore().create()
  const snapshot = { items: [
    { workspaceId: 'production', title: 'Production', path: '/srv/prod' },
    { workspaceId: 'staging', title: 'Staging', path: '/srv/stage' },
  ], phase: 'ready' }
  const props = {
    wide: true,
    useWorkspaces: (selector: (value: typeof snapshot) => unknown) => selector(snapshot),
    useStore: (selector: (value: ReturnType<typeof store.getSnapshot>) => unknown) =>
      selector(useSyncExternalStore(store.subscribe, store.getSnapshot)),
    actions: store.actions,
    t: (key: keyof typeof en, params: Record<string, string> = {}) =>
      dictionary[key].replace(/\{(\w+)\}/g, (_, name: string) => params[name] ?? name),
  } as ColorPanelProps
  return { ...render(<ColorPanel {...props}/>), store }
}

describe('color settings panel', () => {
  it('changes only the selected workspace, survives remount, and removes styles on unload', () => {
    let view = renderPanel()
    fireEvent.click(screen.getByRole('button', { name: 'Workspace colors' }))
    fireEvent.click(screen.getByRole('button', { name: 'Production: Red' }))
    expect(screen.getByRole('button', { name: 'Production: Red' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: 'Staging: Default' }).getAttribute('aria-pressed')).toBe('true')
    expect(view.store.getSnapshot().colors).toEqual({ production: 'red' })
    expect(document.querySelector('style')!.textContent).toContain('box-shadow:inset 3px 0 var(--dsh-wc-red)')
    view.unmount()
    expect(document.querySelector('style')).toBeNull()
    view = renderPanel()
    fireEvent.click(screen.getByRole('button', { name: 'Workspace colors' }))
    expect(screen.getByRole('button', { name: 'Production: Red' }).getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Production: Default' }))
    expect(view.store.getSnapshot().colors).toEqual({})
    expect(document.querySelector('style')!.textContent).not.toContain('box-shadow:inset 3px 0')
  })

  it('uses Chinese text and closes on Escape', () => {
    renderPanel(zh)
    fireEvent.click(screen.getByRole('button', { name: '工作区颜色' }))
    expect(screen.getByRole('dialog', { name: '工作区颜色' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Production：蓝色' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
