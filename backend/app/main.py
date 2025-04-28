from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
from dotenv import load_dotenv
import os
from app.api.endpoints import router

# Load environment variables
load_dotenv()

# Initialize Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI(
    title="RAG System API",
    description="A Retrieval-Augmented Generation system using FAISS and Gemini API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to RAG System API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 