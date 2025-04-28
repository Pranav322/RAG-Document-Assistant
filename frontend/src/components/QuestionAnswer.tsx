import { useState } from 'react'

interface QuestionAnswerProps {
  isEnabled: boolean
}

interface AnswerResponse {
  answer: string
  context: Array<{
    content: string
    score: number
  }>
}

const QuestionAnswer = ({ isEnabled }: QuestionAnswerProps) => {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<AnswerResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !isEnabled) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('question', question)

      const response = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to get answer')
      }

      const data = await response.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={!isEnabled || loading}
            placeholder={isEnabled ? "Ask your question here..." : "Please upload documents first"}
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!isEnabled || loading || !question.trim()}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting Answer...' : 'Ask Question'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900 mb-2">Answer:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{response.answer}</p>
          </div>

          {response.context.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Relevant Context:</h3>
              <div className="space-y-2">
                {response.context.map((ctx, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <p className="text-gray-700">{ctx.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Relevance Score: {(1 - ctx.score).toFixed(4)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionAnswer 