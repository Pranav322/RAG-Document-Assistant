# LLM Interview Assistant

A full-stack application that helps with interview preparation using LLM (Large Language Model) technology. The application provides an interactive interface for users to practice interviews and get AI-powered feedback.

## Features

- Interactive interview practice sessions
- AI-powered feedback and suggestions
- PDF document processing for interview preparation
- User authentication and session management
- Real-time chat interface
- Comprehensive interview analytics

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios for API calls

### Backend
- FastAPI
- Python
- FAISS for vector similarity search
- Google Generative AI
- JWT Authentication
- SQLite Database

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip

## Project Structure

```
RAG-Document-Assistant/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── backend/           # FastAPI backend application
│   ├── app/          # Application code
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── requirements.txt # Backend dependencies
└── README.md         # Project documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create a virtual environment:
   ```powershell
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\activate
   ```

4. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with the following variables:
   ```
  
   GOOGLE_API_KEY=your_google_api_key
   ```

6. Run the backend server:
   ```powershell
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```powershell
   npm run dev
   ```

## API Documentation

The backend API documentation is available at `http://localhost:8000/docs` when the server is running.

## Environment Variables

### Backend (.env)

- `GOOGLE_API_KEY`: API key for Google Generative AI

### Frontend (.env)
- `VITE_API_URL`: URL of the backend API

