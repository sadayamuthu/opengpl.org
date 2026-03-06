import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Spec from './Spec'

function renderSpec() {
  return render(<HashRouter><Spec /></HashRouter>)
}

test('renders spec page heading', () => {
  renderSpec()
  expect(screen.getByText(/The OpenGPL Specification/i)).toBeInTheDocument()
})

test('renders four control gates', () => {
  renderSpec()
  expect(screen.getByText('Input Gate')).toBeInTheDocument()
  expect(screen.getByText('Model Gate')).toBeInTheDocument()
  expect(screen.getByText('Output Gate')).toBeInTheDocument()
  expect(screen.getByText('Audit Gate')).toBeInTheDocument()
})

test('renders compliance frameworks', () => {
  renderSpec()
  expect(screen.getByText('NIST AI RMF')).toBeInTheDocument()
  expect(screen.getByText('FedRAMP')).toBeInTheDocument()
  expect(screen.getByText('HIPAA')).toBeInTheDocument()
  expect(screen.getByText('EU AI Act')).toBeInTheDocument()
  expect(screen.getByText('SOC 2')).toBeInTheDocument()
})

test('renders policy syntax section', () => {
  renderSpec()
  expect(screen.getByText(/Policy syntax/i)).toBeInTheDocument()
})

test('renders github CTA with correct href', () => {
  renderSpec()
  const link = screen.getByRole('link', { name: /View on GitHub/i })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
})
