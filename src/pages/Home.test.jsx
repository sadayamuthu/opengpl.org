import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
}

describe('Home — Hero', () => {
  it('renders version badge', () => {
    renderHome()
    expect(screen.getAllByText(/v0\.1/i).length).toBeGreaterThan(0)
  })

  it('renders hero headline', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The policy language for AI systems.')
  })

  it('renders Read the Spec CTA linking to /spec', () => {
    renderHome()
    expect(screen.getByRole('link', { name: /read the spec/i })).toHaveAttribute(
      'href',
      '/spec'
    )
  })

  it('renders Get the Schema CTA linking to /schema', () => {
    renderHome()
    expect(screen.getByRole('link', { name: /get the schema/i })).toHaveAttribute(
      'href',
      '/schema'
    )
  })

  it('renders sample policy code block', () => {
    renderHome()
    expect(screen.getByText(/restrict-pii-output/i)).toBeInTheDocument()
  })
})

describe('Home — Why OpenGPL', () => {
  it('renders Why OpenGPL section heading', () => {
    renderHome()
    expect(screen.getByText(/Why OpenGPL/i)).toBeInTheDocument()
  })

  it('renders the three why cards', () => {
    renderHome()
    expect(screen.getByText(/Existing tools weren't built for this/i)).toBeInTheDocument()
    expect(screen.getByText(/LLM-native primitives/i)).toBeInTheDocument()
    expect(screen.getByText(/Compliance evidence at runtime/i)).toBeInTheDocument()
  })
})

describe('Home — Control Gates', () => {
  it('renders control gates section heading', () => {
    renderHome()
    expect(screen.getByText(/One policy file\. Four control gates\./i)).toBeInTheDocument()
  })

  it('renders all four control gate cards', () => {
    renderHome()
    expect(screen.getByText('Input Gate')).toBeInTheDocument()
    expect(screen.getByText('Model Gate')).toBeInTheDocument()
    expect(screen.getByText('Output Gate')).toBeInTheDocument()
    expect(screen.getByText('Audit Gate')).toBeInTheDocument()
  })
})

describe('Home — Compliance', () => {
  it('renders compliance section heading', () => {
    renderHome()
    expect(screen.getByText(/Built for regulated environments/i)).toBeInTheDocument()
  })

  it('renders all five compliance badges', () => {
    renderHome()
    expect(screen.getByText('NIST AI RMF')).toBeInTheDocument()
    expect(screen.getByText('FedRAMP')).toBeInTheDocument()
    expect(screen.getByText('HIPAA')).toBeInTheDocument()
    expect(screen.getByText('EU AI Act')).toBeInTheDocument()
    expect(screen.getByText('SOC 2')).toBeInTheDocument()
  })
})

