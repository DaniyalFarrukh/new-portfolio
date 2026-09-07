import os
import json
from groq import Groq
from retriever import retrieve

# Load baseline profile context once
def load_baseline_profile():
    kb_dir = os.path.join(os.path.dirname(__file__), "kb")
    profile_path = os.path.join(kb_dir, "profile.json")
    try:
        with open(profile_path, 'r', encoding='utf-8') as f:
            profile_data = json.load(f)
            # Convert to a readable text format for the LLM
            text = (f"Name: {profile_data.get('name')}\n"
                    f"Title: {profile_data.get('title')}\n"
                    f"Location: {profile_data.get('location')}\n"
                    f"Summary: {profile_data.get('summary')}\n"
                    f"Email: {profile_data.get('email')}\n"
                    f"LinkedIn: {profile_data.get('linkedin_url')}\n"
                    f"GitHub: {profile_data.get('github_url')}\n"
                    f"Portfolio: {profile_data.get('portfolio_url')}\n"
                    f"Availability: {profile_data.get('availability')}")
            return text
    except Exception as e:
        print(f"Warning: Could not load profile.json: {e}")
        return ""

BASELINE_PROFILE = load_baseline_profile()

def build_system_prompt(retrieved_context: str) -> str:
    return f"""You are Daniyal Farrukh's personal portfolio AI assistant. 
Your primary goal is to answer questions about Daniyal's background, projects, experience, and tech stack.

CRITICAL RULES:
1. You must ONLY use the information provided in the Context below.
2. DO NOT hallucinate, invent, or assume any details, dates, projects, or tech stacks that are not explicitly stated in the Context.
3. If the user asks a question and the answer is not in the Context, politely inform them that you don't have that information and suggest they contact Daniyal directly via email or LinkedIn.
4. Speak in the first person as if you are representing Daniyal's portfolio (e.g., "I am Daniyal's assistant", "Daniyal built...", "His experience includes..."). Do not pretend to BE Daniyal.
5. Keep your answers concise, professional, and helpful.
6. If the user explicitly asks to schedule a meeting, set up a call, talk to Daniyal, or hire him, you MUST include the exact phrase `[ACTION: OPEN_CALENDLY]` anywhere in your response.

--- CONTEXT ---

[Daniyal's Baseline Profile]
{BASELINE_PROFILE}

[Retrieved Relevant Details]
{retrieved_context}
"""

def generate_answer(user_query: str, chat_history: list = None) -> str:
    if chat_history is None:
        chat_history = []
        
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return "Error: GROQ_API_KEY environment variable is not set on the backend."
        
    client = Groq(api_key=api_key)
    
    # 1. Retrieve top 4 chunks
    retrieved_chunks = retrieve(user_query, k=4)
    
    # Format retrieved context
    retrieved_text = "\n\n".join([f"- {chunk['text']}" for chunk in retrieved_chunks])
    
    # 2. Build system prompt
    system_prompt = build_system_prompt(retrieved_text)
    
    # 3. Construct messages array
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history
    for msg in chat_history:
        # Expecting msg to have "role" and "content"
        if msg.get("role") in ["user", "assistant"]:
            messages.append({"role": msg["role"], "content": msg["content"]})
            
    # Add current query
    messages.append({"role": "user", "content": user_query})
    
    # 4. Call Groq API
    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="qwen/qwen3.8-27b",
            temperature=0.3, # Low temperature for more factual responses
            max_tokens=512,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"I'm sorry, I encountered an error connecting to my brain. Please try again later. ({str(e)})"

if __name__ == "__main__":
    # Simple test (requires GROQ_API_KEY in env)
    import sys
    if not os.getenv("GROQ_API_KEY"):
        print("Set GROQ_API_KEY to test.")
        sys.exit(0)
        
    query = "What is the Contextual RAG System?"
    print(f"User: {query}")
    print(f"Assistant: {generate_answer(query)}")
