import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders copyright with OpenAstra attribution', () => {
    render(<Footer />)
    expect(screen.getByText(/OpenAstra/i)).toBeInTheDocument()
  })

  it('renders CC BY 4.0 license notice', () => {
    render(<Footer />)
    expect(screen.getByText(/CC BY 4\.0/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })

  it('renders openastra.org link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /openastra/i })).toHaveAttribute('href', 'https://openastra.org')
  })
})
