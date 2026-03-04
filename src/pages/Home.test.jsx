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
