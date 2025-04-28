from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
import shutil
import os
from ..services.document_processor import DocumentProcessor
from ..services.gemini_service import GeminiService

router = APIRouter()

# Initialize services
doc_processor = DocumentProcessor()
gemini_service = GeminiService()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    try:
        # Create temp directory if it doesn't exist
        os.makedirs("temp", exist_ok=True)
        
        file_path = f"temp/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process document based on file type
        if file.filename.lower().endswith('.pdf'):
            chunks = doc_processor.process_pdf(file_path)
        elif file.filename.lower().endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
            chunks = doc_processor.process_text(text)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Add documents to index
        doc_processor.add_documents(chunks)
        
        # Clean up
        os.remove(file_path)
        
        return {"message": "Document processed successfully", "chunks": len(chunks)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask")
async def ask_question(question: str = Form(...)):
    """Ask a question about the uploaded documents"""
    try:
        # Search for relevant context
        context = doc_processor.search(question)
        
        if not context:
            return {"answer": "No relevant context found. Please upload some documents first."}
        
        # Generate answer using Gemini
        answer = gemini_service.generate_answer(question, context)
        
        return {
            "answer": answer,
            "context": context
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 