import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Schema from './Schema'

function renderSchema() {
  return render(<HashRouter><Schema /></HashRouter>)
}

test('renders schema page heading', () => {
  renderSchema()
  expect(screen.getByText(/OpenGPL JSON Schema/i)).toBeInTheDocument()
})

test('renders schema URL', () => {
  renderSchema()
  expect(screen.getByText(/schema\.json/i)).toBeInTheDocument()
})

test('renders VS Code integration section', () => {
  renderSchema()
  expect(screen.getByText(/yaml\.schemas/i)).toBeInTheDocument()
})

test('renders schema field reference', () => {
  renderSchema()
  expect(screen.getByText('policy')).toBeInTheDocument()
  expect(screen.getByText('effect')).toBeInTheDocument()
  expect(screen.getByText('when')).toBeInTheDocument()
})

test('renders download CTA with correct href', () => {
  renderSchema()
  const link = screen.getByRole('link', { name: /Download Schema/i })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', 'https://opengpl.org/schema/v0.1/schema.json')
})
