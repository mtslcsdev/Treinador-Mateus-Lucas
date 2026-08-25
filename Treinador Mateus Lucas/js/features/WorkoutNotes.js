/* ===== WORKOUT ANNOTATIONS - ANOTAÇÕES POR TREINO ===== */

class WorkoutNotes {
  static STORAGE_KEY = 'workout_notes_v1';

  /**
   * Add or update note for a workout
   */
  static addNote(athleteId, cycleId, weekIdx, workoutIdx, note, timestamp = new Date()) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);

      if (!cycle || !cycle.semanas[weekIdx] || !cycle.semanas[weekIdx].treinos[workoutIdx]) {
        throw new Error('Workout not found');
      }

      const workout = cycle.semanas[weekIdx].treinos[workoutIdx];
      const noteKey = this._getNoteKey(athleteId, cycleId, weekIdx, workoutIdx);
      const notes = this._getNotes();

      notes[noteKey] = {
        athleteId,
        cycleId,
        weekIdx,
        workoutIdx,
        text: note,
        timestamp: timestamp.toISOString(),
        updatedAt: new Date().toISOString(),
        workoutInfo: {
          tipo: workout.tipo,
          km: workout.km,
          zona: workout.zona
        }
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));

      // Update main data for quick access
      if (!workout.notes_history) workout.notes_history = [];
      workout.notes_history.push({
        text: note,
        timestamp: timestamp.toISOString()
      });
      if (workout.notes_history.length > 10) {
        workout.notes_history.shift(); // Keep last 10
      }
      workout.last_note = note;
      workout.last_note_time = new Date().toISOString();

      storage.saveData({ atletas: athlete });
      return true;
    } catch (e) {
      console.error('Error adding note:', e);
      throw e;
    }
  }

  /**
   * Get note for a workout
   */
  static getNote(athleteId, cycleId, weekIdx, workoutIdx) {
    const key = this._getNoteKey(athleteId, cycleId, weekIdx, workoutIdx);
    const notes = this._getNotes();
    return notes[key] || null;
  }

  /**
   * Get all notes for athlete
   */
  static getAthleteNotes(athleteId) {
    const notes = this._getNotes();
    return Object.values(notes).filter(n => n.athleteId === athleteId);
  }

  /**
   * Get all notes for cycle
   */
  static getCycleNotes(athleteId, cycleId) {
    const notes = this._getNotes();
    return Object.values(notes).filter(n => n.athleteId === athleteId && n.cycleId === cycleId);
  }

  /**
   * Delete note
   */
  static deleteNote(athleteId, cycleId, weekIdx, workoutIdx) {
    const key = this._getNoteKey(athleteId, cycleId, weekIdx, workoutIdx);
    const notes = this._getNotes();
    delete notes[key];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));

    // Remove from main data
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);
      if (cycle && cycle.semanas[weekIdx] && cycle.semanas[weekIdx].treinos[workoutIdx]) {
        const workout = cycle.semanas[weekIdx].treinos[workoutIdx];
        delete workout.last_note;
        delete workout.last_note_time;
        storage.saveData({ atletas: athlete });
      }
    } catch (e) {
      console.warn('Could not update main data:', e);
    }
  }

  /**
   * Get note history for workout
   */
  static getNoteHistory(athleteId, cycleId, weekIdx, workoutIdx) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);

      if (cycle && cycle.semanas[weekIdx] && cycle.semanas[weekIdx].treinos[workoutIdx]) {
        const workout = cycle.semanas[weekIdx].treinos[workoutIdx];
        return workout.notes_history || [];
      }
      return [];
    } catch (e) {
      console.error('Error getting note history:', e);
      return [];
    }
  }

  /**
   * Export notes as markdown
   */
  static exportNotesMarkdown(athleteId, cycleId) {
    const notes = this.getCycleNotes(athleteId, cycleId);

    let markdown = `# Anotações do Ciclo\n\n`;
    markdown += `**Atleta**: ID ${athleteId}\n`;
    markdown += `**Ciclo**: ID ${cycleId}\n\n`;

    notes.forEach(note => {
      const date = new Date(note.timestamp).toLocaleDateString('pt-BR');
      markdown += `## Semana ${note.weekIdx + 1} - Treino ${note.workoutIdx + 1}\n\n`;
      markdown += `**Tipo**: ${note.workoutInfo.tipo}\n`;
      markdown += `**Distância**: ${note.workoutInfo.km} km\n`;
      markdown += `**Zona**: ${note.workoutInfo.zona}\n`;
      markdown += `**Data**: ${date}\n\n`;
      markdown += `> ${note.text}\n\n`;
    });

    return markdown;
  }

  /**
   * Render notes panel for a workout
   */
  static async renderNotesPanel(containerId, athleteId, cycleId, weekIdx, workoutIdx) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} not found`);

      const note = this.getNote(athleteId, cycleId, weekIdx, workoutIdx);
      const history = this.getNoteHistory(athleteId, cycleId, weekIdx, workoutIdx);

      const html = `
        <div class="notes-panel">
          <div class="notes-header">
            <h4>📝 Anotações do Treino</h4>
            <span class="notes-count">${history.length} atualizações</span>
          </div>

          <div class="notes-form">
            <textarea
              id="noteInput_${weekIdx}_${workoutIdx}"
              placeholder="Adicione observações: como se sentiu, dificuldades, progressos..."
              class="notes-textarea"
              maxlength="500"
            >${note?.text || ''}</textarea>
            <small class="char-count">
              <span id="charCount_${weekIdx}_${workoutIdx}">${(note?.text || '').length}</span>/500
            </small>
            <div class="notes-actions">
              <button class="btn-note-save" onclick="WorkoutNotes.saveNoteFromUI('${athleteId}', '${cycleId}', ${weekIdx}, ${workoutIdx})">
                💾 Salvar Anotação
              </button>
              ${note ? `<button class="btn-note-delete" onclick="WorkoutNotes.deleteNote('${athleteId}', '${cycleId}', ${weekIdx}, ${workoutIdx}); location.reload();">🗑️ Deletar</button>` : ''}
            </div>
          </div>

          ${history.length > 0 ? `
            <div class="notes-history">
              <h5>Histórico</h5>
              <div class="history-list">
                ${history.map((h, idx) => {
                  const date = new Date(h.timestamp).toLocaleDateString('pt-BR');
                  return `
                    <div class="history-item">
                      <div class="history-meta">${date} • ${idx + 1} atualização</div>
                      <p class="history-text">${h.text}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

      container.innerHTML = html;

      // Add character counter
      const textarea = document.getElementById(`noteInput_${weekIdx}_${workoutIdx}`);
      if (textarea) {
        textarea.addEventListener('input', () => {
          document.getElementById(`charCount_${weekIdx}_${workoutIdx}`).textContent = textarea.value.length;
        });
      }
    } catch (e) {
      console.error('Error rendering notes panel:', e);
      throw e;
    }
  }

  /**
   * Save note from UI textarea
   */
  static saveNoteFromUI(athleteId, cycleId, weekIdx, workoutIdx) {
    try {
      const textarea = document.getElementById(`noteInput_${weekIdx}_${workoutIdx}`);
      if (!textarea) throw new Error('Textarea not found');

      const note = textarea.value.trim();
      if (!note) {
        showToast('Por favor, adicione uma anotação', 'aviso');
        return;
      }

      this.addNote(athleteId, cycleId, weekIdx, workoutIdx, note);
      showToast('✅ Anotação salva com sucesso!', 'sucesso');
    } catch (e) {
      showToast(`Erro ao salvar: ${e.message}`, 'erro');
      console.error(e);
    }
  }

  /**
   * Render note indicator for workout card
   */
  static renderNoteIndicator(athleteId, cycleId, weekIdx, workoutIdx) {
    const note = this.getNote(athleteId, cycleId, weekIdx, workoutIdx);
    if (!note) return '';

    return `
      <div class="note-indicator" title="Tem anotação">
        <span class="note-icon">📝</span>
        <span class="note-preview">${note.text.substring(0, 30)}...</span>
      </div>
    `;
  }

  /* ===== PRIVATE HELPERS ===== */

  static _getNotes() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  static _getNoteKey(athleteId, cycleId, weekIdx, workoutIdx) {
    return `${athleteId}_${cycleId}_${weekIdx}_${workoutIdx}`;
  }
}
