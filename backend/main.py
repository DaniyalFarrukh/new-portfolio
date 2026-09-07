from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from rag_chain import generate_answer

app = FastAPI(title="Daniyal Portfolio RAG API", version="1.0")

# 1. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://updated-portfolio-smoky-chi.vercel.app",
        "*" # Asterisk added for easier Hugging Face cross-origin testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Simple In-Memory Rate Limiting
# Stores { "ip_address": [timestamp1, timestamp2, ...] }
RATE_LIMIT = 10 # max requests
RATE_WINDOW = 60 # per minute (60 seconds)
ip_requests = {}

def check_rate_limit(ip: str):
    now = time.time()
    if ip not in ip_requests:
        ip_requests[ip] = []
    
    # Filter out timestamps older than our window
    ip_requests[ip] = [ts for ts in ip_requests[ip] if now - ts < RATE_WINDOW]
    
    if len(ip_requests[ip]) >= RATE_LIMIT:
        return False
        
    ip_requests[ip].append(now)
    return True

# 3. Pydantic Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str

# 4. Endpoints
@app.get("/health")
def health_check():
    return {"status": "healthy", "uptime": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: Request, body: ChatRequest):
    # Apply Rate Limiting
    client_ip = request.client.host if request.client else "unknown"
    if not check_rate_limit(client_ip):
        # Graceful fallback instead of 500
        return ChatResponse(response="I'm receiving too many requests right now. Please wait a minute and try again.")
        
    try:
        # Convert Pydantic history models to standard dicts
        history_dicts = [{"role": m.role, "content": m.content} for m in body.history] if body.history else []
        
        # Generate Answer
        answer = generate_answer(user_query=body.message, chat_history=history_dicts)
        return ChatResponse(response=answer)
        
    except Exception as e:
        # Graceful error handling
        print(f"Chat error: {e}")
        return ChatResponse(response="I'm sorry, my AI backend is currently experiencing technical difficulties. Please feel free to reach out to me via email or LinkedIn instead!")
