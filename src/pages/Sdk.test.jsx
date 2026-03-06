import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Sdk from './Sdk'

function renderSdk() {
  return render(<HashRouter><Sdk /></HashRouter>)
}

test('renders SDK page heading', () => {
  renderSdk()
  expect(screen.getByText(/OpenGPL Python SDK/i)).toBeInTheDocument()
})

test('renders install command', () => {
  renderSdk()
  expect(screen.getByText(/pip install opengpl-sdk/i)).toBeInTheDocument()
})

test('renders quickstart section', () => {
  renderSdk()
  expect(screen.getByText(/Quickstart/i)).toBeInTheDocument()
  expect(screen.getByText(/PolicyEngine/i)).toBeInTheDocument()
})

test('renders CLI commands', () => {
  renderSdk()
  expect(screen.getByText(/opengpl validate/i)).toBeInTheDocument()
  expect(screen.getByText(/opengpl eval/i)).toBeInTheDocument()
  expect(screen.getByText(/opengpl audit/i)).toBeInTheDocument()
})

test('renders PyPI CTA with correct href', () => {
  renderSdk()
  const link = screen.getByRole('link', { name: /View on PyPI/i })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', 'https://pypi.org/project/opengpl-sdk')
})
