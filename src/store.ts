import { defineStore } from '@deepseek-ai/dsh-client-store'
import type { WorkspaceColor } from './colors.ts'

/** Color choices are local to this browser origin; workspace IDs survive rename. */
export function createColorStore() {
  return defineStore({
    init: () => ({ colors: {} as Record<string, WorkspaceColor> }),
    persist: 'dsh.workspace-colors.v1',
    actions: {
      setColor: (draft, id: string, color: WorkspaceColor | undefined) => {
        if (!draft.colors || typeof draft.colors !== 'object' || Array.isArray(draft.colors)) draft.colors = {}
        draft.colors = Object.fromEntries([
          ...Object.entries(draft.colors).filter(([key]) => key !== id),
          ...(color === undefined ? [] : [[id, color] as const]),
        ])
      },
    },
  })
}
