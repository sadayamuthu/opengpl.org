import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Footer from './Footer'

function renderWithRouter(ui) {
  return render(<HashRouter>{ui}</HashRouter>)
}

describe('Footer', () => {
  it('renders copyright with OpenAstra attribution', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(/OpenAstra/i)).toBeInTheDocument()
  })

  it('renders CC BY 4.0 license notice', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(/CC BY 4\.0/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })

  it('renders openastra.org link', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /openastra/i })).toHaveAttribute('href', 'https://openastra.org')
  })

  it('renders Spec link navigating to /spec', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /^spec$/i })).toHaveAttribute('href', '#/spec')
  })

  it('renders Schema link navigating to /schema', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /^schema$/i })).toHaveAttribute('href', '#/schema')
  })

  it('renders SDK link navigating to /sdk', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /^sdk$/i })).toHaveAttribute('href', '#/sdk')
  })

  it('renders Sidecar link navigating to /sidecar', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /^sidecar$/i })).toHaveAttribute('href', '#/sidecar')
  })
})
