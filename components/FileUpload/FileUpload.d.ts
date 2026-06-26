export interface FileUploadFile {
    /** Stable id generated internally so list rendering / removal is keyed safely. */
    id: string;
    /** The underlying native File. */
    file: File;
    /** Object URL for image previews; absent for non-image files. */
    preview?: string;
}
export interface FileUploadProps {
    /** Controlled list of selected files. */
    value?: FileUploadFile[];
    /** Fired with the next list whenever files are added or removed. */
    onChange?: (files: FileUploadFile[]) => void;
    /** Same syntax as `input[accept]`, e.g. `'image/*'` or `'.pdf,.doc'`. */
    accept?: string;
    /** Allow selecting more than one file. @default true */
    multiple?: boolean;
    /** Maximum size, in bytes, accepted per file. */
    maxSize?: number;
    /** Maximum number of files kept; extras are discarded. */
    maxFiles?: number;
    /** Block all interaction and grey the zone out. */
    disabled?: boolean;
    /** Label rendered above the drop zone. */
    label?: string;
    /** Text shown inside the drop zone. @default 'Drag files here or click to browse' */
    hint?: string;
    /** External error message shown below the zone. */
    error?: string;
    /** Base id; internal ids (input, error) derive from it. */
    id?: string;
}
/**
 * FileUpload — a drag-and-drop drop zone with image previews and a file list.
 *
 * Works controlled (`value` + `onChange`) or uncontrolled (internal state). Image
 * files get an object-URL preview that is revoked on removal and on unmount, so
 * the component never leaks blob URLs. Zero runtime dependencies.
 */
export declare function FileUpload({ value, onChange, accept, multiple, maxSize, maxFiles, disabled, label, hint, error, id: idProp, }: FileUploadProps): import("react").JSX.Element;
export declare namespace FileUpload {
    var displayName: string;
}
