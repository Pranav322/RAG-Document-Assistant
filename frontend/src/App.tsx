import { useState } from 'react'
import DocumentUpload from './components/DocumentUpload'
import QuestionAnswer from './components/QuestionAnswer'

function App() {
  const [hasDocuments, setHasDocuments] = useState(false)

  const handleDocumentUpload = (success: boolean) => {
    setHasDocuments(success)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">RAG System</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h2>
              <DocumentUpload onUploadSuccess={handleDocumentUpload} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Ask Questions</h2>
              <QuestionAnswer isEnabled={hasDocuments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
