import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? files(join(dir, e.name)) : e.name.endsWith('.jsx') ? [join(dir, e.name)] : [])

describe('research-lab theme', () => {
  it('leaves no dark-theme classes in any component', () => {
    const offenders = files('src').filter((f) => /accent-cyan|accent-blue|bg-space|bg-surface|border-subtle|text-text-|glow-/.test(readFileSync(f, 'utf8')))
    expect(offenders).toEqual([])
  })
})
