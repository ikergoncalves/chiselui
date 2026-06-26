import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FileUpload, type FileUploadFile } from './FileUpload'
import { checkA11y } from '../../../tests/a11y'

// jsdom doesn't implement the object-URL APIs, so any image preview would throw.
// Stub them so preview creation and cleanup are exercised without blowing up.
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:mock-url')
  URL.revokeObjectURL = vi.fn()
})

// jsdom derives File.size from the blob parts, so I override it explicitly to
// drive the maxSize branch from a tiny payload.
function createFile(name: string, type = 'text/plain', size = 100): File {
  const file = new File(['x'], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

function getInput(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector('input[type="file"]')
  if (!input) throw new Error('file input not found')
  return input as HTMLInputElement
}

describe('FileUpload', () => {
  it('renders the drop zone', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument()
  })

  it('renders the label when provided', () => {
    render(<FileUpload label="Attachments" />)
    expect(screen.getByText('Attachments')).toBeInTheDocument()
  })

  it('opens the file picker when the drop zone is clicked', () => {
    const { container } = render(<FileUpload />)
    const clickSpy = vi.spyOn(getInput(container), 'click')

    fireEvent.click(screen.getByRole('button', { name: 'Upload files' }))

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('opens the file picker when Enter is pressed on the drop zone', () => {
    const { container } = render(<FileUpload />)
    const clickSpy = vi.spyOn(getInput(container), 'click')

    fireEvent.keyDown(screen.getByRole('button', { name: 'Upload files' }), {
      key: 'Enter',
    })

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('adds a selected file to the list', () => {
    const { container } = render(<FileUpload />)
    fireEvent.change(getInput(container), {
      target: { files: [createFile('report.pdf', 'application/pdf')] },
    })

    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('shows the file name in the list', () => {
    const { container } = render(<FileUpload />)
    fireEvent.change(getInput(container), {
      target: { files: [createFile('report.pdf', 'application/pdf')] },
    })

    expect(screen.getByText('report.pdf')).toBeInTheDocument()
  })

  it('removes a file when its X button is clicked', () => {
    const { container } = render(<FileUpload />)
    fireEvent.change(getInput(container), {
      target: { files: [createFile('report.pdf', 'application/pdf')] },
    })
    expect(screen.getByText('report.pdf')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Remove report.pdf' }))

    expect(screen.queryByText('report.pdf')).not.toBeInTheDocument()
  })

  it('rejects a file larger than maxSize', () => {
    const onChange = vi.fn()
    const { container } = render(<FileUpload maxSize={1024} onChange={onChange} />)

    fireEvent.change(getInput(container), {
      target: { files: [createFile('big.bin', 'application/octet-stream', 2048)] },
    })

    expect(screen.getByRole('alert')).toHaveTextContent('File too large')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects maxFiles and discards the excess', () => {
    const onChange = vi.fn()
    const { container } = render(<FileUpload maxFiles={2} onChange={onChange} />)

    fireEvent.change(getInput(container), {
      target: {
        files: [createFile('a.txt'), createFile('b.txt'), createFile('c.txt')],
      },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]?.[0]).toHaveLength(2)
  })

  it('calls onChange with the updated list', () => {
    const onChange = vi.fn()
    const { container } = render(<FileUpload onChange={onChange} />)

    fireEvent.change(getInput(container), {
      target: { files: [createFile('a.txt')] },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    const next = onChange.mock.calls[0]?.[0]
    expect(next).toHaveLength(1)
    expect(next?.[0]?.file.name).toBe('a.txt')
  })

  it('has an aria-label on the drop zone', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button', { name: 'Upload files' })).toHaveAttribute(
      'aria-label',
      'Upload files',
    )
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container, unmount } = render(<FileUpload label="Attachments" />)
      await checkA11y(container)
      unmount()

      // A populated list must also be clean (remove buttons, names, error).
      const file: FileUploadFile = {
        id: '1',
        file: createFile('doc.pdf', 'application/pdf'),
      }
      const { container: populated } = render(
        <FileUpload label="Attachments" value={[file]} error="Something went wrong" />,
      )
      await checkA11y(populated)
    })
  })
})
