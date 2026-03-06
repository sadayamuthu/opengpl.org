import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Navbar from './Navbar'

function renderWithRouter() {
  return render(
    <HashRouter>
      <Navbar />
    </HashRouter>
  )
}

describe('Navbar', () => {
  it('renders the OpenGPL logo', () => {
    renderWithRouter()
    expect(screen.getByText('OpenGPL')).toBeInTheDocument()
  })

  it('renders Spec nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /spec/i })).toBeInTheDocument()
  })

  it('renders Schema nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /schema/i })).toBeInTheDocument()
  })

  it('renders SDK nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /sdk/i })).toBeInTheDocument()
  })

  it('renders Sidecar nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /sidecar/i })).toBeInTheDocument()
  })

  it('renders GitHub external link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })
})
