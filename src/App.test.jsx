import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App'

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>)

describe('routes', () => {
  it.each([
    ['/', 'The policy language for AI systems.'],
    ['/spec', 'The OpenGPL Specification'],
    ['/schema', 'OpenGPL JSON Schema'],
    ['/sdk', 'OpenGPL Python SDK'],
    ['/sidecar', 'OpenGPL Docker Sidecar'],
    ['/nope', 'The policy language for AI systems.'],
  ])('%s renders %s', (path, h1) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(h1)
  })

  it('scrolls to #cite when linked from another page', () => {
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    renderAt('/#cite')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
