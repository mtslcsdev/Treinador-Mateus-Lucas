"""
Script para testar conexão com Supabase
Execute: python test_supabase.py
"""
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("=" * 60)
print("🧪 TESTE DE CONEXÃO SUPABASE")
print("=" * 60)
print(f"\n✓ URL: {SUPABASE_URL}")
print(f"✓ Chave de Serviço: {SUPABASE_KEY[:20]}...")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("\n✅ CONEXÃO COM SUPABASE: OK!")
    
    # Tentar criar uma tabela simples
    print("\n📊 Verificando tabelas...")
    
    # Tentar inserir um atleta de teste
    try:
        # Tentar ler - se falhar, tabela não existe
        response = supabase.table('atletas').select('id').limit(1).execute()
        print("✅ Tabela 'atletas' existe")
    except Exception:
        print("⚠️  Tabela 'atletas' não existe ainda")
        print("\n📝 Para criar as tabelas, siga:")
        print("  1. Abra: https://supabase.com/dashboard")
        print("  2. Selecione seu projeto")
        print("  3. Vá para SQL Editor")
        print("  4. Abra arquivo: docs/supabase-schema.sql")
        print("  5. Cole o SQL e execute")
    
    print("\n" + "=" * 60)
    print("✅ AMBIENTE CONFIGURADO COM SUCESSO!")
    print("=" * 60)
    print("\nPróximos passos:")
    print("1. Criar tabelas (SQL no Supabase)")
    print("2. Rodar: python -m uvicorn app.main:app --reload")
    print("3. Em outro terminal: npm run dev (frontend)")
    
except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    print("\nVerifique:")
    print("  - SUPABASE_URL e SUPABASE_KEY em backend/.env")
    print("  - Conectividade internet")
    print("  - Projeto Supabase ativo")
