import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home — Hero', () => {
  it('renders version badge', () => {
    render(<Home />)
    expect(screen.getByText(/v0\.1/i)).toBeInTheDocument()
  })

  it('renders hero headline', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The policy language for AI systems.')
  })

  it('renders Read the Spec CTA linking to GitHub', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /read the spec/i })).toHaveAttribute(
      'href',
      'https://github.com/sadayamuthu/opengpl'
    )
  })

  it('renders Get the Schema CTA linking to schema file', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /get the schema/i })).toHaveAttribute(
      'href',
      'https://opengpl.org/schema/v0.1/schema.json'
    )
  })

  it('renders sample policy code block', () => {
    render(<Home />)
    expect(screen.getByText(/restrict-pii-output/i)).toBeInTheDocument()
  })
})

describe('Home — Why OpenGPL', () => {
  it('renders Why OpenGPL section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Why OpenGPL/i)).toBeInTheDocument()
  })

  it('renders the three why cards', () => {
    render(<Home />)
    expect(screen.getByText(/Existing tools weren't built for this/i)).toBeInTheDocument()
    expect(screen.getByText(/LLM-native primitives/i)).toBeInTheDocument()
    expect(screen.getByText(/Compliance evidence at runtime/i)).toBeInTheDocument()
  })
})

describe('Home — Control Planes', () => {
  it('renders control planes section heading', () => {
    render(<Home />)
    expect(screen.getByText(/One policy file\. Four planes of control\./i)).toBeInTheDocument()
  })

  it('renders all four control plane cards', () => {
    render(<Home />)
    expect(screen.getByText('Input Controls')).toBeInTheDocument()
    expect(screen.getByText('Model Controls')).toBeInTheDocument()
    expect(screen.getByText('Output Controls')).toBeInTheDocument()
    expect(screen.getByText('Audit Controls')).toBeInTheDocument()
  })
})

describe('Home — Compliance', () => {
  it('renders compliance section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Built for regulated environments/i)).toBeInTheDocument()
  })

  it('renders all five compliance badges', () => {
    render(<Home />)
    expect(screen.getByText('NIST AI RMF')).toBeInTheDocument()
    expect(screen.getByText('FedRAMP')).toBeInTheDocument()
    expect(screen.getByText('HIPAA')).toBeInTheDocument()
    expect(screen.getByText('EU AI Act')).toBeInTheDocument()
    expect(screen.getByText('SOC 2')).toBeInTheDocument()
  })
})
