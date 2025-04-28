from typing import List, Dict
import os
from pypdf import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class DocumentProcessor:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.documents = []
        self.document_vectors = None

    def process_pdf(self, file_path: str) -> List[str]:
        """Extract text from PDF and split into chunks"""
        chunks = []
        with open(file_path, 'rb') as file:
            pdf = PdfReader(file)
            for page in pdf.pages:
                text = page.extract_text()
                # Simple chunking by paragraphs - can be improved
                paragraphs = text.split('\n\n')
                chunks.extend([p.strip() for p in paragraphs if p.strip()])
        return chunks

    def process_text(self, text: str) -> List[str]:
        """Split text into chunks"""
        # Simple chunking by paragraphs - can be improved
        chunks = text.split('\n\n')
        return [chunk.strip() for chunk in chunks if chunk.strip()]

    def add_documents(self, chunks: List[str]):
        """Add document chunks to the index"""
        if not chunks:
            return
        
        self.documents.extend(chunks)
        # Create or update document vectors
        self.document_vectors = self.vectorizer.fit_transform(self.documents)

    def search(self, query: str, k: int = 5) -> List[Dict[str, any]]:
        """Search for relevant documents"""
        if not self.documents:
            return []
            
        # Transform query
        query_vector = self.vectorizer.transform([query])
        
        # Calculate similarities
        similarities = cosine_similarity(query_vector, self.document_vectors)[0]
        
        # Get top k results
        top_k_indices = np.argsort(similarities)[-k:][::-1]
        
        results = []
        for idx in top_k_indices:
            results.append({
                'content': self.documents[idx],
                'score': float(similarities[idx])
            })
        
        return results 