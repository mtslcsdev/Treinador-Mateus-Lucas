/* ===== TIMELINE DE ANOTAÇÕES ===== */

class NotesTimeline {
  /**
   * Obter todas as anotações de um ciclo com timeline
   */
  static getCycleNotesTimeline(athleteId, cycleId) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);

      if (!cycle) throw new Error('Ciclo não encontrado');

      const timeline = [];

      // Percorrer semanas e treinos
      cycle.semanas.forEach((week, weekIdx) => {
        week.treinos?.forEach((workout, workoutIdx) => {
          // Buscar anotações deste treino
          const noteKey = `${athleteId}_${cycleId}_${weekIdx}_${workoutIdx}`;
          const notesData = this._getNotes();
          const note = notesData[noteKey];

          if (note && note.text) {
            timeline.push({
              weekIdx,
              workoutIdx,
              weekNum: week.semana || (weekIdx + 1),
              weekName: week.nome,
              workout: {
                tipo: workout.tipo,
                km: workout.km,
                zona: workout.zona
              },
              note: note.text,
              timestamp: new Date(note.timestamp),
              updatedAt: note.updatedAt,
              history: workout.notes_history || []
            });
          }
        });
      });

      // Ordenar por data (mais recentes primeiro)
      return timeline.sort((a, b) => b.timestamp - a.timestamp);
    } catch (e) {
      console.error('Erro ao obter timeline:', e);
      return [];
    }
  }

  /**
   * Renderizar timeline visual
   */
  static async renderTimeline(containerId, athleteId, cycleId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} não encontrado`);

      const timeline = this.getCycleNotesTimeline(athleteId, cycleId);

      if (timeline.length === 0) {
        container.innerHTML = '<div class="timeline-empty">📝 Nenhuma anotação ainda.</div>';
        return;
      }

      const html = `
        <div class="timeline-container">
          <div class="timeline-header">
            <h3>📅 Timeline de Anotações</h3>
            <span class="timeline-count">${timeline.length} anotações</span>
          </div>

          <div class="timeline-list">
            ${timeline.map((item, idx) => `
              <div class="timeline-item">
                <!-- Conectar linha -->
                ${idx < timeline.length - 1 ? '<div class="timeline-line"></div>' : ''}

                <!-- Marcador -->
                <div class="timeline-marker"></div>

                <!-- Conteúdo -->
                <div class="timeline-content">
                  <div class="timeline-meta">
                    <span class="week-badge">Semana ${item.weekNum}</span>
                    <span class="workout-type">${item.workout.tipo}</span>
                    <span class="timeline-date">${this._formatDate(item.timestamp)}</span>
                  </div>

                  <div class="timeline-note">
                    <p class="note-text">${item.note}</p>
                  </div>

                  <div class="timeline-workout-info">
                    <span class="info-item">📍 ${item.weekName}</span>
                    <span class="info-item">🏃 ${item.workout.km}km</span>
                    <span class="info-item">⚡ ${item.workout.zona}</span>
                  </div>

                  ${item.history.length > 1 ? `
                    <div class="timeline-history">
                      <small>📝 ${item.history.length} versões</small>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Erro ao renderizar timeline:', e);
      throw e;
    }
  }

  /**
   * Renderizar resumo estatístico de anotações
   */
  static async renderSummary(containerId, athleteId, cycleId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} não encontrado`);

      const timeline = this.getCycleNotesTimeline(athleteId, cycleId);

      // Análise de conteúdo
      const analysis = {
        total: timeline.length,
        thisWeek: timeline.filter(t => {
          const days = (Date.now() - t.timestamp) / (1000 * 60 * 60 * 24);
          return days < 7;
        }).length,
        keywords: this._extractKeywords(timeline.map(t => t.note))
      };

      const html = `
        <div class="notes-summary">
          <div class="summary-stats">
            <div class="summary-stat">
              <span class="label">Total Anotações</span>
              <span class="value">${analysis.total}</span>
            </div>
            <div class="summary-stat">
              <span class="label">Esta Semana</span>
              <span class="value">${analysis.thisWeek}</span>
            </div>
          </div>

          ${analysis.keywords.length > 0 ? `
            <div class="summary-keywords">
              <h4>Tópicos frequentes:</h4>
              <div class="keywords-list">
                ${analysis.keywords.slice(0, 5).map(kw => `
                  <span class="keyword-badge">${kw.word} (${kw.count}x)</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Erro ao renderizar sumário:', e);
      throw e;
    }
  }

  /**
   * Extrair palavras-chave das anotações
   */
  static _extractKeywords(notes) {
    const keywords = {};
    const stopWords = ['o', 'a', 'de', 'para', 'com', 'em', 'por', 'um', 'uma', 'e', 'é'];

    notes.forEach(note => {
      const words = note.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      words.forEach(word => {
        if (!stopWords.includes(word)) {
          keywords[word] = (keywords[word] || 0) + 1;
        }
      });
    });

    return Object.entries(keywords)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Formatar data
   */
  static _formatDate(date) {
    const d = new Date(date);
    const today = new Date();
    const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));

    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    if (diff < 7) return `${diff}d atrás`;

    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  /**
   * Obter notas do localStorage
   */
  static _getNotes() {
    try {
      const stored = localStorage.getItem(WorkoutNotes.STORAGE_KEY || 'workout_notes_v1');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }
}
