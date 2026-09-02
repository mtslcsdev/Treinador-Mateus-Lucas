import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Treino, Bloco } from '../../types'
import '../components.css'

interface TreinoDrawerProps {
  treino: Treino
  isOpen: boolean
  onClose: () => void
  onSave: (treino: Treino) => void
  loading?: boolean
}

const TIPOS_TREINO = [
  'Corrida Leve',
  'Fartlek',
  'Progressivo',
  'Intervalado',
  'Repetições',
  'Bloco',
  'Longão',
  'Rodagem',
  'Ritmado',
  'TRT'
]

const FASES = ['Base', 'Específico', 'Polimento']

const ZONAS = [
  'Z1 - Corrida Leve',
  'Z2 - Corrida Leve/Moderada',
  'Z3 - Corrida Moderada',
  'Z4 - Corrida Moderada/Intensa',
  'Z5 - Corrida Intensa'
]

const MODALIDADES = ['Corrida', 'Musculação', 'Flexibilidade', 'Natação']

export default function TreinoDrawer({
  treino: initialTreino,
  isOpen,
  onClose,
  onSave,
  loading
}: TreinoDrawerProps) {
  const [treino, setTreino] = useState<Treino>(initialTreino)
  const [novoBloco, setNovoBloco] = useState<Partial<Bloco>>({})
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (field: keyof Treino, value: any) => {
    setTreino({ ...treino, [field]: value })
  }

  const handleFeedbackChange = (field: 'sensacao' | 'obs', value: string) => {
    setTreino({
      ...treino,
      feedback: { ...treino.feedback, [field]: value }
    })
  }

  const handleAdicionarBloco = () => {
    if (!novoBloco.tempo || !novoBloco.pace || !novoBloco.km) {
      setErrors(['Preencha todos os campos do bloco'])
      return
    }

    setTreino({
      ...treino,
      blocos: [...treino.blocos, novoBloco as Bloco]
    })
    setNovoBloco({})
  }

  const handleRemoverBloco = (index: number) => {
    setTreino({
      ...treino,
      blocos: treino.blocos.filter((_, i) => i !== index)
    })
  }

  const handleSave = () => {
    const validacao = validarTreino(treino)
    if (!validacao.valido) {
      setErrors(validacao.avisos)
      return
    }
    onSave(treino)
    onClose()
  }

  const validarTreino = (t: Treino) => {
    const avisos: string[] = []

    if (!t.dia) avisos.push('Data é obrigatória')
    if (!t.tipo) avisos.push('Tipo é obrigatório')
    if (!t.fase) avisos.push('Fase é obrigatória')
    if (!t.pace) avisos.push('Zona/Pace é obrigatória')
    if (t.km <= 0) avisos.push('KM deve ser maior que 0')

    if (t.tipo === 'Intervalado' && t.blocos.length === 0) {
      avisos.push('Treino intervalado precisa ter blocos')
    }

    return { valido: avisos.length === 0, avisos }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="treino-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#0f3a7d' }}>✏️ Editar Treino</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>Preencha os detalhes do treino</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {errors.length > 0 && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12px' }}>
              {errors.map((e, i) => <div key={i}>⚠️ {e}</div>)}
            </div>
          )}

          {/* Dados Básicos */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f3a7d', textTransform: 'uppercase', marginBottom: '12px' }}>
              📋 Informações Básicas
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Data do Treino
              </label>
              <input
                type="date"
                value={treino.dia}
                onChange={(e) => handleInputChange('dia', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Fase
                </label>
                <select
                  value={treino.fase}
                  onChange={(e) => handleInputChange('fase', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <option value="">Selecione</option>
                  {FASES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Tipo
                </label>
                <select
                  value={treino.tipo}
                  onChange={(e) => handleInputChange('tipo', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <option value="">Selecione</option>
                  {TIPOS_TREINO.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Zona/Pace
                </label>
                <select
                  value={treino.pace}
                  onChange={(e) => handleInputChange('pace', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <option value="">Selecione</option>
                  {ZONAS.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  KM
                </label>
                <input
                  type="number"
                  value={treino.km}
                  onChange={(e) => handleInputChange('km', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Modalidade
              </label>
              <select
                value={treino.modalidade}
                onChange={(e) => handleInputChange('modalidade', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              >
                {MODALIDADES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Observações */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f3a7d', textTransform: 'uppercase', marginBottom: '12px' }}>
              📝 Observações
            </h3>
            <textarea
              value={treino.obs || ''}
              onChange={(e) => handleInputChange('obs', e.target.value)}
              placeholder="Notas sobre o treino..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                minHeight: '80px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Blocos */}
          {treino.tipo === 'Intervalado' && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f3a7d', textTransform: 'uppercase', marginBottom: '12px' }}>
                ⚡ Blocos de Treino
              </h3>

              {treino.blocos.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  {treino.blocos.map((bloco, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <div style={{ fontSize: '12px' }}>
                        <strong>{bloco.tempo}</strong> • {bloco.pace} • {bloco.km} km
                      </div>
                      <button
                        onClick={() => handleRemoverBloco(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#dc2626'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '8px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>
                    Tempo
                  </label>
                  <input
                    type="text"
                    value={novoBloco.tempo || ''}
                    onChange={(e) => setNovoBloco({ ...novoBloco, tempo: e.target.value })}
                    placeholder="5min"
                    style={{
                      width: '100%',
                      padding: '6px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>
                    Pace
                  </label>
                  <select
                    value={novoBloco.pace || ''}
                    onChange={(e) => setNovoBloco({ ...novoBloco, pace: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '6px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    <option value="">Z</option>
                    <option value="Z1">Z1</option>
                    <option value="Z2">Z2</option>
                    <option value="Z3">Z3</option>
                    <option value="Z4">Z4</option>
                    <option value="Z5">Z5</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>
                    KM
                  </label>
                  <input
                    type="number"
                    value={novoBloco.km || ''}
                    onChange={(e) => setNovoBloco({ ...novoBloco, km: parseFloat(e.target.value) || 0 })}
                    step="0.1"
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '6px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                </div>

                <button
                  onClick={handleAdicionarBloco}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f3a7d', textTransform: 'uppercase', marginBottom: '12px' }}>
              😊 Feedback Pós-Treino
            </h3>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Sensação
              </label>
              <input
                type="text"
                value={treino.feedback.sensacao || ''}
                onChange={(e) => handleFeedbackChange('sensacao', e.target.value)}
                placeholder="Ex: Leve, Normal, Pesado"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Observações
              </label>
              <textarea
                value={treino.feedback.obs || ''}
                onChange={(e) => handleFeedbackChange('obs', e.target.value)}
                placeholder="Como se sentiu?"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  minHeight: '60px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px',
              background: loading ? '#b3d9ff' : '#0f3a7d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            {loading ? 'Salvando...' : 'Salvar Treino'}
          </button>
        </div>
      </div>
    </div>
  )
}
