import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload, type FileUploadFile, type FileUploadProps } from './FileUpload'

// FileUpload is controlled through value/onChange, so the interactive stories own
// the state here and let the remaining args flow through to the docs controls.
function ControlledFileUpload(props: Partial<FileUploadProps>) {
  const [files, setFiles] = useState<FileUploadFile[]>([])
  return <FileUpload {...props} value={files} onChange={setFiles} />
}

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    label: 'Attachments',
  },
  argTypes: {
    onChange: { control: false },
    value: { control: false },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ControlledFileUpload {...args} />,
}

export const ImagesOnly: Story = {
  render: (args) => (
    <ControlledFileUpload
      {...args}
      label="Photos"
      accept="image/*"
      hint="Drop images here or click to browse"
    />
  ),
}

export const WithMaxSize: Story = {
  render: (args) => (
    <ControlledFileUpload {...args} label="Document (max 1 MB)" maxSize={1048576} />
  ),
}

export const WithMaxFiles: Story = {
  render: (args) => (
    <ControlledFileUpload {...args} label="Up to 3 files" maxFiles={3} />
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Attachments',
    disabled: true,
  },
}

export const SingleFile: Story = {
  render: (args) => (
    <ControlledFileUpload
      {...args}
      label="Avatar"
      multiple={false}
      accept="image/*"
    />
  ),
}
