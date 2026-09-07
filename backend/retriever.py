import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

class Retriever:
    def __init__(self, kb_dir=None):
        if kb_dir is None:
            kb_dir = os.path.join(os.path.dirname(__file__), "kb")
            
        index_path = os.path.join(kb_dir, "index.faiss")
        chunks_path = os.path.join(kb_dir, "chunks.pkl")
        
        if not os.path.exists(index_path) or not os.path.exists(chunks_path):
            raise FileNotFoundError("Index or chunks file not found. Please run embed_index.py first.")
            
        print("Loading FAISS index and chunks...")
        self.index = faiss.read_index(index_path)
        with open(chunks_path, "rb") as f:
            self.chunks = pickle.load(f)
            
        print("Loading sentence-transformers model 'all-MiniLM-L6-v2'...")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
    def retrieve(self, query: str, k: int = 4):
        # Encode and normalize the query
        query_embedding = self.model.encode([query], convert_to_numpy=True, normalize_embeddings=True)
        
        # Search the index
        scores, indices = self.index.search(query_embedding, k)
        
        results = []
        for j, idx in enumerate(indices[0]):
            if idx == -1:
                continue
            chunk = self.chunks[idx]
            result = {
                "score": float(scores[0][j]),
                "text": chunk["text"],
                "source_file": chunk["source_file"],
                "metadata": chunk["metadata"]
            }
            results.append(result)
            
        return results

# Create a global singleton instance to load index/model once at import time
_retriever_instance = None

def retrieve(query: str, k: int = 4):
    global _retriever_instance
    if _retriever_instance is None:
        _retriever_instance = Retriever()
    return _retriever_instance.retrieve(query, k)

if __name__ == "__main__":
    # Simple test
    query = "What did you do at Aidx Solutions?"
    print(f"Query: {query}")
    results = retrieve(query, k=2)
    for i, res in enumerate(results):
        print(f"\nResult {i+1} (Score: {res['score']:.4f}):\n{res['text']}")
