import {
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import './FileUpload.css'

export interface FileUploadFile {
  /** Stable id generated internally so list rendering / removal is keyed safely. */
  id: string
  /** The underlying native File. */
  file: File
  /** Object URL for image previews; absent for non-image files. */
  preview?: string
}

export interface FileUploadProps {
  /** Controlled list of selected files. */
  value?: FileUploadFile[]
  /** Fired with the next list whenever files are added or removed. */
  onChange?: (files: FileUploadFile[]) => void
  /** Same syntax as `input[accept]`, e.g. `'image/*'` or `'.pdf,.doc'`. */
  accept?: string
  /** Allow selecting more than one file. @default true */
  multiple?: boolean
  /** Maximum size, in bytes, accepted per file. */
  maxSize?: number
  /** Maximum number of files kept; extras are discarded. */
  maxFiles?: number
  /** Block all interaction and grey the zone out. */
  disabled?: boolean
  /** Label rendered above the drop zone. */
  label?: string
  /** Text shown inside the drop zone. @default 'Drag files here or click to browse' */
  hint?: string
  /** External error message shown below the zone. */
  error?: string
  /** Base id; internal ids (input, error) derive from it. */
  id?: string
}

// crypto.randomUUID isn't available everywhere (older Safari, some test envs), so
// I fall back to a cheap random token. Ids are only used as React keys here, not
// for anything security-sensitive, so the fallback's weaker entropy is fine.
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

// Human-readable byte count: "890 B", "345 KB", "1.2 MB". I trim a trailing ".0"
// so whole numbers don't read as "345.0 KB".
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`

  const units = ['KB', 'MB', 'GB', 'TB']
  let size = bytes / 1024
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  const rounded = Math.round(size * 10) / 10
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
  return `${text} ${units[unitIndex]}`
}

// Mirror the browser's input[accept] matching: each comma-separated token is an
// extension ('.pdf'), a wildcard MIME ('image/*') or an exact MIME ('image/png').
function isAccepted(file: File, accept: string): boolean {
  const tokens = accept
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true

  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()

  return tokens.some((token) => {
    if (token.startsWith('.')) return fileName.endsWith(token)
    if (token.endsWith('/*')) return fileType.startsWith(token.slice(0, -1))
    return fileType === token
  })
}

// Generic document glyph used when a file has no image preview.
function FileIcon() {
  return (
    <svg
      className="chs-file-upload__file-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    </svg>
  )
}

// Cloud-with-arrow glyph for the empty drop zone.
function UploadIcon() {
  return (
    <svg
      className="chs-file-upload__icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 13v8" />
      <path d="m8 17 4-4 4 4" />
      <path d="M20 16.7A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.2" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="chs-file-upload__remove-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

const DEFAULT_HINT = 'Drag files here or click to browse'

/**
 * FileUpload — a drag-and-drop drop zone with image previews and a file list.
 *
 * Works controlled (`value` + `onChange`) or uncontrolled (internal state). Image
 * files get an object-URL preview that is revoked on removal and on unmount, so
 * the component never leaks blob URLs. Zero runtime dependencies.
 */
export function FileUpload({
  value,
  onChange,
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  disabled = false,
  label,
  hint,
  error,
  id: idProp,
}: FileUploadProps) {
  const reactId = useId()
  const baseId = idProp ?? reactId
  const inputId = `${baseId}-input`
  const errorId = `${baseId}-error`

  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [internalFiles, setInternalFiles] = useState<FileUploadFile[]>([])
  // Inline feedback for a rejected drop/selection (too big, wrong type).
  const [validationError, setValidationError] = useState<string | null>(null)

  // Track every object URL we mint so the unmount cleanup can revoke them all,
  // even the ones a controlled parent might drop from `value` without telling us.
  const createdUrls = useRef<Set<string>>(new Set())

  const isControlled = value !== undefined
  const files = isControlled ? value : internalFiles

  useEffect(() => {
    const urls = createdUrls.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
      urls.clear()
    }
  }, [])

  const revoke = (url: string | undefined) => {
    if (url) {
      URL.revokeObjectURL(url)
      createdUrls.current.delete(url)
    }
  }

  const makeFile = (file: File): FileUploadFile => {
    let preview: string | undefined
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file)
      createdUrls.current.add(preview)
    }
    return { id: generateId(), file, preview }
  }

  const commit = (next: FileUploadFile[]) => {
    if (!isControlled) setInternalFiles(next)
    onChange?.(next)
  }

  const processFiles = (incoming: FileList | File[]) => {
    if (disabled) return

    // Single-file mode replaces the current selection, so existing files don't
    // count toward the cap; multiple mode appends until maxFiles is reached.
    const baseCount = multiple ? files.length : 0
    const limit = multiple ? maxFiles : 1

    const accepted: FileUploadFile[] = []
    let rejection: string | null = null

    for (const file of Array.from(incoming)) {
      if (limit !== undefined && baseCount + accepted.length >= limit) break
      if (accept && !isAccepted(file, accept)) {
        rejection = 'File type not accepted'
        continue
      }
      if (maxSize !== undefined && file.size > maxSize) {
        rejection = 'File too large'
        continue
      }
      accepted.push(makeFile(file))
    }

    setValidationError(rejection)

    // Nothing valid landed — keep the current list (a rejected file shouldn't
    // wipe an existing single-file selection) and just surface the error.
    if (accepted.length === 0) return

    if (multiple) {
      commit([...files, ...accepted])
    } else {
      files.forEach((existing) => revoke(existing.preview))
      commit(accepted)
    }
  }

  const removeFile = (id: string) => {
    const target = files.find((entry) => entry.id === id)
    revoke(target?.preview)
    commit(files.filter((entry) => entry.id !== id))
  }

  const openPicker = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) processFiles(event.target.files)
    // Reset so selecting the same file again still fires a change event.
    event.target.value = ''
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPicker()
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (disabled) return
    setIsDragOver(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    if (event.dataTransfer?.files) processFiles(event.dataTransfer.files)
  }

  const displayError = validationError ?? error

  const dropzoneClassNames = [
    'chs-file-upload__dropzone',
    isDragOver && 'chs-file-upload__dropzone--dragover',
    disabled && 'chs-file-upload__dropzone--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  const rootClassNames = ['chs-file-upload', displayError && 'chs-file-upload--error']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassNames}>
      {label && (
        <label htmlFor={inputId} className="chs-file-upload__label">
          {label}
        </label>
      )}

      {/* Sibling of the drop zone, not a child: keeping the interactive input out
          of the role="button" avoids a nested-interactive a11y violation, and
          stops the synthetic click it fires from bubbling back into openPicker.
          Hidden via display:none — not focusable, out of the a11y tree, yet still
          clickable programmatically so the drop zone is the single control. */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="chs-file-upload__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <div
        className={dropzoneClassNames}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        aria-disabled={disabled || undefined}
        aria-describedby={displayError ? errorId : undefined}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon />
        <span className="chs-file-upload__hint">{hint ?? DEFAULT_HINT}</span>
      </div>

      {displayError && (
        <p id={errorId} className="chs-file-upload__error" role="alert">
          {displayError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="chs-file-upload__list">
          {files.map((entry) => (
            <li key={entry.id} className="chs-file-upload__item">
              <span className="chs-file-upload__thumb">
                {entry.preview ? (
                  <img
                    src={entry.preview}
                    alt=""
                    className="chs-file-upload__preview"
                  />
                ) : (
                  <FileIcon />
                )}
              </span>

              <span className="chs-file-upload__meta">
                <span className="chs-file-upload__name" title={entry.file.name}>
                  {entry.file.name}
                </span>
                <span className="chs-file-upload__size">
                  {formatSize(entry.file.size)}
                </span>
              </span>

              <button
                type="button"
                className="chs-file-upload__remove"
                aria-label={`Remove ${entry.file.name}`}
                onClick={() => removeFile(entry.id)}
                disabled={disabled}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

FileUpload.displayName = 'FileUpload'
