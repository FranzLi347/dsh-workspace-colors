/** Named workspace colors, independent of Session activity and ordering. */
export const COLORS = ['red', 'orange', 'green', 'blue', 'purple', 'pink'] as const
export type WorkspaceColor = typeof COLORS[number]

/** Validate a color read from browser persistence. */
export function readColor(value: unknown): WorkspaceColor | undefined {
  return typeof value === 'string' && COLORS.some(color => color === value)
    ? value as WorkspaceColor : undefined
}

/** Read an own workspace entry without accepting arbitrary persisted CSS. */
export function colorFor(colors: unknown, id: string): WorkspaceColor | undefined {
  if (colors === null || typeof colors !== 'object' || !Object.hasOwn(colors, id)) return undefined
  return readColor(Reflect.get(colors, id))
}

/** Quote an identity as a CSS string without interpreting selector syntax. */
function cssString(value: string): string {
  return '"' + Array.from(value, char => `\\${char.codePointAt(0)!.toString(16)} `).join('') + '"'
}

/** Generate styles only for currently registered workspaces. */
export function rowStyles(colors: unknown, workspaceIds: readonly string[]): string {
  return workspaceIds.flatMap(id => {
    const color = colorFor(colors, id)
    if (color === undefined) return []
    const row = `[data-row-key=${cssString(`workspace:${id}`)}]`
    return [
      `${row}{box-shadow:inset 3px 0 var(--dsh-wc-${color});}`,
      `${row}>span:first-of-type{color:var(--dsh-wc-${color});}`,
    ]
  }).join('\n')
}
