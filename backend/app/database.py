from supabase import create_client, Client
import os

def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    
    if not url or not key:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set")
    
    return create_client(url, key)

# Singleton instance
_client = None

def init_supabase():
    global _client
    if _client is None:
        _client = get_supabase_client()
    return _client

def get_db():
    return init_supabase()
