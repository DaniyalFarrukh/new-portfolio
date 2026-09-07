import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from kb.loader import load_all_chunks

def build_index():
    print("Loading chunks from Knowledge Base...")
    kb_dir = os.path.join(os.path.dirname(__file__), "kb")
    chunks = load_all_chunks(kb_dir)
    
    if not chunks:
        print("No chunks found. Ensure your JSON files in kb/ are populated.")
        return

    print(f"Loaded {len(chunks)} chunks.")
    
    print("Loading sentence-transformers model 'all-MiniLM-L6-v2'...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    print("Generating embeddings...")
    texts = [chunk['text'] for chunk in chunks]
    # Encode and normalize to enable cosine similarity via inner product (IndexFlatIP)
    embeddings = model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)
    
    dimension = embeddings.shape[1]
    print(f"Embedding dimension: {dimension}")
    
    print("Building FAISS IndexFlatIP...")
    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings)
    
    print("Saving index and chunks mapping...")
    index_path = os.path.join(kb_dir, "index.faiss")
    chunks_path = os.path.join(kb_dir, "chunks.pkl")
    
    faiss.write_index(index, index_path)
    with open(chunks_path, "wb") as f:
        pickle.dump(chunks, f)
        
    print(f"Index successfully saved to {index_path}")
    print(f"Chunks successfully saved to {chunks_path}")

if __name__ == "__main__":
    build_index()
