import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the OpenGPL wordmark linking to the top', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: 'OpenGPL' })).toHaveAttribute('href', '#top')
  })

  it('links back to the OpenAstra family site', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /An OpenAstra framework/ })).toHaveAttribute('href', 'https://openastra.org')
  })

  it.each([
    ['Why', '#why'],
    ['Planes', '#planes'],
    ['Schema', '#schema'],
    ['Ecosystem', '#ecosystem'],
    ['Cite', '#cite'],
  ])('renders the %s anchor', (name, href) => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })

  it('renders GitHub external link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })

  it('wraps on narrow screens', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation').querySelector('.flex-wrap')).not.toBeNull()
  })
})
