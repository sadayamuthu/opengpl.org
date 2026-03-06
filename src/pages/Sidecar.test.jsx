import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Sidecar from './Sidecar'

function renderSidecar() {
  return render(<HashRouter><Sidecar /></HashRouter>)
}

test('renders sidecar page heading', () => {
  renderSidecar()
  expect(screen.getByText(/OpenGPL Docker Sidecar/i)).toBeInTheDocument()
})

test('renders docker run command', () => {
  renderSidecar()
  expect(screen.getByText(/docker run/i)).toBeInTheDocument()
})

test('renders endpoint reference', () => {
  renderSidecar()
  expect(screen.getByText(/\/check\/input/i)).toBeInTheDocument()
  expect(screen.getByText(/\/check\/output/i)).toBeInTheDocument()
  expect(screen.getByText(/\/health/i)).toBeInTheDocument()
})

test('renders policy caching note', () => {
  renderSidecar()
  expect(screen.getByText(/caches loaded policies/i)).toBeInTheDocument()
})

test('renders GitHub CTA with correct href', () => {
  renderSidecar()
  const links = screen.getAllByRole('link', { name: /GitHub/i })
  expect(links.length).toBeGreaterThan(0)
  expect(links[0]).toHaveAttribute('href', expect.stringContaining('github.com/sadayamuthu/opengpl'))
})
