import { Atleta } from '../types'

export async function carregarAtletas(supabase: any, userId: string): Promise<Atleta[]> {
  const { data, error } = await supabase
    .from('atletas')
    .select('*')
    .eq('user_id', userId)
    .order('nome')

  if (error) throw error

  return (data || []).map((item: any) => ({
    id: item.id,
    nome: item.nome,
    email: item.email,
    notas: item.notas,
    historicoPaces: item.historicoPaces || [],
    aderencia: item.aderencia,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at)
  }))
}

export async function criarAtleta(
  supabase: any,
  userId: string,
  nome: string
): Promise<Atleta> {
  const { data, error } = await supabase
    .from('atletas')
    .insert({
      user_id: userId,
      nome,
      historicoPaces: [],
      aderencia: 0
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    nome: data.nome,
    email: data.email,
    notas: data.notas,
    historicoPaces: data.historicoPaces || [],
    aderencia: data.aderencia,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}

export async function atualizarAtleta(
  supabase: any,
  atletaId: string,
  updates: Partial<Atleta>
): Promise<void> {
  const { error } = await supabase
    .from('atletas')
    .update({
      nome: updates.nome,
      email: updates.email,
      notas: updates.notas,
      aderencia: updates.aderencia,
      historicoPaces: updates.historicoPaces,
      updated_at: new Date().toISOString()
    })
    .eq('id', atletaId)

  if (error) throw error
}

export async function removerAtleta(supabase: any, atletaId: string): Promise<void> {
  const { error } = await supabase
    .from('atletas')
    .delete()
    .eq('id', atletaId)

  if (error) throw error
}

export async function carregarAtleta(supabase: any, atletaId: string): Promise<Atleta> {
  const { data, error } = await supabase
    .from('atletas')
    .select('*')
    .eq('id', atletaId)
    .single()

  if (error) throw error

  return {
    id: data.id,
    nome: data.nome,
    email: data.email,
    notas: data.notas,
    historicoPaces: data.historicoPaces || [],
    aderencia: data.aderencia,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}
