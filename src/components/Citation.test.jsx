import { render, screen, fireEvent, act } from '@testing-library/react'
import Citation from './Citation'
import { citationText, bibtex } from '../data/cite'

const mockClipboard = () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  return writeText
}

describe('Citation', () => {
  const original = navigator.clipboard
  afterEach(() => Object.defineProperty(navigator, 'clipboard', { value: original, configurable: true }))

  it('formats the APA citation and BibTeX', () => {
    expect(citationText()).toBe('Sadayamuthu, K. (2026). OpenGPL: Governance Policy Language (v0.2.0) [Software]. Zenodo. https://doi.org/10.5281/zenodo.23844061')
    expect(bibtex().startsWith('@software{sadayamuthu2026opengpl,')).toBe(true)
    expect(bibtex()).toContain('doi = {10.5281/zenodo.23844061}')
  })

  it('links the DOI through doi.org', () => {
    render(<Citation />)
    expect(screen.getByRole('link', { name: 'https://doi.org/10.5281/zenodo.23844061' })).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.23844061')
  })

  it('copies the citation and BibTeX', async () => {
    const writeText = mockClipboard()
    render(<Citation />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy citation for OpenGPL' })) })
    expect(writeText).toHaveBeenCalledWith(citationText())
    expect(screen.getByRole('status')).toHaveTextContent('Citation copied')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy BibTeX for OpenGPL' })) })
    expect(writeText).toHaveBeenCalledWith(bibtex())
  })

  it('reveals and selects the text when the clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    render(<Citation />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy BibTeX for OpenGPL' })) })
    const box = screen.getByRole('textbox', { name: 'BibTeX' })
    expect(box).toHaveValue(bibtex())
    expect(box.selectionEnd - box.selectionStart).toBe(bibtex().length)
  })
})
