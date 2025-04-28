import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface DocumentUploadProps {
  onUploadSuccess: (success: boolean) => void
}

const DocumentUpload = ({ onUploadSuccess }: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])

      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Upload failed')
      }

      const data = await response.json()
      onUploadSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      onUploadSuccess(false)
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    multiple: false
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50'}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the file here</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag and drop a PDF or TXT file here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">Only PDF and TXT files are supported</p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

export default DocumentUpload 