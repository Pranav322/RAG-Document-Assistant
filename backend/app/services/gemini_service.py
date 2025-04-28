import google.generativeai as genai
from typing import List, Dict

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_answer(self, question: str, context: List[Dict[str, any]]) -> str:
        """Generate an answer using Gemini API based on the question and context"""
        
        # Prepare the prompt with context
        context_text = "\n".join([doc['content'] for doc in context])
        
        prompt = f"""Based on the following context, please answer the question. 
        If the answer cannot be found in the context, please say so.

        Context:
        {context_text}

        Question: {question}

        Answer:"""

        # Generate response
        response = self.model.generate_content(prompt)
        
        return response.text

    def generate_embeddings(self, text: str) -> List[float]:
        """Generate embeddings for text using Gemini API"""
        # Note: Currently using sentence-transformers instead as Gemini doesn't provide direct embedding API
        # This is a placeholder for when Gemini adds embedding support
        raise NotImplementedError("Gemini API currently doesn't support embeddings. Using sentence-transformers instead.") 