import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the OpenGPL logo', () => {
    render(<Navbar />)
    expect(screen.getByText('OpenGPL')).toBeInTheDocument()
  })

  it('renders Spec anchor link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /spec/i })).toHaveAttribute('href', '#spec')
  })

  it('renders Schema anchor link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /schema/i })).toHaveAttribute('href', '#schema')
  })

  it('renders GitHub external link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })
})
