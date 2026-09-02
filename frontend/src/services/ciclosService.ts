import { Ciclo } from '../types'

export async function carregarCiclos(supabase: any, atletaId: string): Promise<Ciclo[]> {
  const { data, error } = await supabase
    .from('ciclos')
    .select('*')
    .eq('atleta_id', atletaId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []).map((item: any) => ({
    id: item.id,
    atletaId: item.atleta_id,
    nome: item.nome,
    prova: item.prova,
    semanas: item.semanas || [],
    isTemplate: item.is_template,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at)
  }))
}

export async function criarCiclo(
  supabase: any,
  atletaId: string,
  ciclo: Omit<Ciclo, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Ciclo> {
  const { data, error } = await supabase
    .from('ciclos')
    .insert({
      atleta_id: atletaId,
      nome: ciclo.nome,
      prova: ciclo.prova,
      semanas: ciclo.semanas,
      is_template: false
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    atletaId: data.atleta_id,
    nome: data.nome,
    prova: data.prova,
    semanas: data.semanas || [],
    isTemplate: data.is_template,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}

export async function atualizarCiclo(
  supabase: any,
  cicloId: string,
  updates: Partial<Ciclo>
): Promise<void> {
  const { error } = await supabase
    .from('ciclos')
    .update({
      nome: updates.nome,
      prova: updates.prova,
      semanas: updates.semanas,
      updated_at: new Date().toISOString()
    })
    .eq('id', cicloId)

  if (error) throw error
}

export async function removerCiclo(supabase: any, cicloId: string): Promise<void> {
  const { error } = await supabase
    .from('ciclos')
    .delete()
    .eq('id', cicloId)

  if (error) throw error
}

export async function duplicarCiclo(
  supabase: any,
  cicloOriginal: Ciclo
): Promise<Ciclo> {
  const { data, error } = await supabase
    .from('ciclos')
    .insert({
      atleta_id: cicloOriginal.atletaId,
      nome: `${cicloOriginal.nome} (Cópia)`,
      prova: cicloOriginal.prova,
      semanas: cicloOriginal.semanas,
      is_template: false
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    atletaId: data.atleta_id,
    nome: data.nome,
    prova: data.prova,
    semanas: data.semanas || [],
    isTemplate: data.is_template,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}

export async function salvarComoTemplate(
  supabase: any,
  cicloId: string,
  cicloOriginal: Ciclo,
  nomeTemplate?: string
): Promise<Ciclo> {
  const { data, error } = await supabase
    .from('ciclos')
    .insert({
      atleta_id: cicloOriginal.atletaId,
      nome: nomeTemplate || `Template: ${cicloOriginal.nome}`,
      prova: cicloOriginal.prova,
      semanas: cicloOriginal.semanas,
      is_template: true
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    atletaId: data.atleta_id,
    nome: data.nome,
    prova: data.prova,
    semanas: data.semanas || [],
    isTemplate: data.is_template,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}
