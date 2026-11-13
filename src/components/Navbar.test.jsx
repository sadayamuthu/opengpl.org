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
  it('renders the OpenGPL logo linking home', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'OpenGPL home' })).toHaveAttribute('href', '#/')
  })

  it('links back to the OpenAstra family site', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /An OpenAstra framework/ })).toHaveAttribute('href', 'https://openastra.org')
  })

  it('has a Cite link to the citation on the home page', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Cite' })).toHaveAttribute('href', '#/#cite')
  })

  it('wraps on narrow screens', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation').querySelector('.flex-wrap')).not.toBeNull()
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
