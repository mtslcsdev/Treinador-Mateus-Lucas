import json
import os
from datetime import datetime

def migrar_backups_supabase():
    """
    Script para migrar dados dos backups JSON para Supabase
    Execute: python migrate_backups.py
    """
    from supabase import create_client
    
    supabase = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_KEY")
    )
    
    backups_dir = "../backups"
    
    for filename in os.listdir(backups_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(backups_dir, filename)
            print(f"Processando {filename}...")
            
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Inserir atletas
            for atleta in data.get('atletas', []):
                # Verificar se já existe
                existing = supabase.table('atletas').select('id').eq('id', atleta['id']).execute()
                
                if not existing.data:
                    # Inserir novo atleta
                    supabase.table('atletas').insert({
                        'id': atleta['id'],
                        'nome': atleta['nome'],
                        'criado_em': datetime.now().isoformat()
                    }).execute()
                
                # Inserir ciclos
                for ciclo in atleta.get('ciclos', []):
                    existing_ciclo = supabase.table('ciclos').select('id').eq('id', ciclo['id']).execute()
                    
                    if not existing_ciclo.data:
                        supabase.table('ciclos').insert({
                            'id': ciclo['id'],
                            'atleta_id': atleta['id'],
                            'nome': ciclo['nome'],
                            'criado_em': datetime.now().isoformat()
                        }).execute()
                    
                    # Inserir semanas e treinos
                    for semana in ciclo.get('semanas', []):
                        for treino in semana.get('treinos', []):
                            supabase.table('treinos').insert({
                                'ciclo_id': ciclo['id'],
                                'semana': semana['semana'],
                                'dia': treino.get('dia'),
                                'fase': treino.get('fase'),
                                'tipo': treino.get('tipo'),
                                'pace': treino.get('pace'),
                                'obs': treino.get('obs'),
                                'criado_em': datetime.now().isoformat()
                            }).execute()
            
            print(f"✓ {filename} migrado com sucesso!")

if __name__ == "__main__":
    migrar_backups_supabase()
