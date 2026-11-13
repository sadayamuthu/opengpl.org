import { render, screen, within } from '@testing-library/react'
import Home from './Home'

describe('Home — Hero', () => {
  it('renders version badge', () => {
    render(<Home />)
    expect(screen.getAllByText(/v0\.1/i).length).toBeGreaterThan(0)
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

  it('renders ISO 42001 alongside the other badges', () => {
    render(<Home />)
    expect(screen.getByText('ISO 42001')).toBeInTheDocument()
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

describe('Home — Schema Quick-Start', () => {
  it('renders schema section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Use it today/i)).toBeInTheDocument()
  })

  it('renders VS Code settings snippet', () => {
    render(<Home />)
    expect(screen.getByText(/yaml\.schemas/i)).toBeInTheDocument()
  })

  it('renders Download Schema CTA', () => {
    render(<Home />)
    const links = screen.getAllByRole('link', { name: /download schema/i })
    expect(links.length).toBeGreaterThan(0)
  })
})

describe('Home — anchors', () => {
  it.each(['spec', 'why', 'planes', 'schema', 'ecosystem', 'cite'])('has a #%s section', (id) => {
    const { container } = render(<Home />)
    expect(container.querySelector(`#${id}`)).not.toBeNull()
  })
})

describe('Home — Ecosystem', () => {
  it('links the SDK on PyPI and the sidecar on GHCR', () => {
    const { container } = render(<Home />)
    const eco = within(container.querySelector('#ecosystem'))
    expect(eco.getByRole('link', { name: /opengpl-sdk/ })).toHaveAttribute('href', 'https://pypi.org/project/opengpl-sdk/')
    expect(eco.getByRole('link', { name: /sidecar/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl/pkgs/container/opengpl%2Fsidecar')
    expect(eco.getByText('pip install opengpl-sdk')).toBeInTheDocument()
  })
})

describe('Home — Cite', () => {
  it('shows the Zenodo DOI', () => {
    const { container } = render(<Home />)
    expect(within(container.querySelector('#cite')).getByRole('link', { name: 'https://doi.org/10.5281/zenodo.23844061' })).toBeInTheDocument()
  })
})

describe('Home — Planes flow', () => {
  it('draws the request flow from prompt to response', () => {
    const { container } = render(<Home />)
    const planes = within(container.querySelector('#planes'))
    expect(planes.getByText('prompt')).toBeInTheDocument()
    expect(planes.getByText('response')).toBeInTheDocument()
  })
})
