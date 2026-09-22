import { afterEach, describe, expect, it } from 'vitest'
import { COLORS, colorFor, readColor, rowStyles } from '../src/colors.ts'
import { createColorStore } from '../src/store.ts'

afterEach(() => localStorage.clear())

describe('workspace color persistence and styles', () => {
  it('saves separate choices, restores after reload, and resets one workspace', () => {
    const first = createColorStore().create()
    first.actions.setColor('production', 'red')
    first.actions.setColor('staging', 'blue')
    const second = createColorStore().create()
    expect(second.getSnapshot().colors).toEqual({ production: 'red', staging: 'blue' })
    second.actions.setColor('production', undefined)
    expect(createColorStore().create().getSnapshot().colors).toEqual({ staging: 'blue' })
  })

  it('never accepts persisted CSS, inherited properties, or unknown colors', () => {
    expect(COLORS.every(color => readColor(color) === color)).toBe(true)
    expect(readColor('url(https://example.com)')).toBeUndefined()
    expect(colorFor({ production: 'rebeccapurple' }, 'production')).toBeUndefined()
    expect(colorFor(Object.create({ production: 'red' }), 'production')).toBeUndefined()
    expect(colorFor(null, 'production')).toBeUndefined()
    expect(colorFor({}, 'constructor')).toBeUndefined()
  })

  it('styles only live workspace rows and escapes selector syntax in IDs', () => {
    const id = 'a"]{}body{display:none}/*'
    const css = rowStyles({ [id]: 'purple', deleted: 'red' }, [id, 'uncolored'])
    const style = document.createElement('style')
    style.textContent = css
    document.head.append(style)
    const row = document.createElement('div')
    row.dataset.rowKey = `workspace:${id}`
    document.body.append(row)
    const rules = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
    expect(rules).toHaveLength(2)
    expect(row.matches(rules[0]!.selectorText)).toBe(true)
    expect(document.body.matches(rules[0]!.selectorText)).toBe(false)
    expect(css).not.toContain('--dsh-wc-red')
    expect(rowStyles({ a: 'invalid' }, ['a'])).toBe('')
    style.remove(); row.remove()
  })
})
