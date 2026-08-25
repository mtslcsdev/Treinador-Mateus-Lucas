/* ===== RELATÓRIO PDF PROFISSIONAL ===== */

class ProfessionalReport {
  /**
   * Gerar PDF do ciclo
   */
  static async generateCyclePDF(athleteId, cycleId) {
    try {
      // Carregar html2pdf se necessário
      if (typeof html2pdf === 'undefined') {
        await this.loadHtml2Pdf();
      }

      const storage = getStorageEngine();
      const athlete = await storage.getAthlete(athleteId);
      const cycle = await storage.getCycle(athleteId, cycleId);

      if (!athlete || !cycle) {
        throw new Error('Atleta ou ciclo não encontrado');
      }

      // Calcular estatísticas
      const totalKm = cycle.semanas?.reduce((acc, w) =>
        acc + (w.treinos?.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0) || 0), 0
      ) || 0;

      const totalTreinos = cycle.semanas?.reduce((acc, w) =>
        acc + (w.treinos?.length || 0), 0
      ) || 0;

      // Criar HTML do PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #1a56db;
              padding-bottom: 1.5rem;
              margin-bottom: 2rem;
            }
            .header h1 {
              color: #1a56db;
              margin: 0 0 0.5rem 0;
              font-size: 28px;
            }
            .header p {
              color: #666;
              margin: 0;
              font-size: 12px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 2rem;
              margin-bottom: 2rem;
            }
            .info-box {
              background: #f0f4f8;
              padding: 1rem;
              border-radius: 8px;
              border-left: 4px solid #1a56db;
            }
            .info-label {
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              font-weight: bold;
              margin-bottom: 0.25rem;
            }
            .info-value {
              font-size: 18px;
              font-weight: bold;
              color: #1a56db;
            }
            .section-title {
              color: #1a56db;
              border-bottom: 2px solid #1a56db;
              padding-bottom: 0.5rem;
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-size: 16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1.5rem;
            }
            th {
              background: #1a56db;
              color: white;
              padding: 0.75rem;
              text-align: left;
              font-size: 12px;
              font-weight: bold;
            }
            td {
              padding: 0.75rem;
              border-bottom: 1px solid #e0e0e0;
              font-size: 12px;
            }
            tr:nth-child(even) {
              background: #f9f9f9;
            }
            .zone-badge {
              display: inline-block;
              padding: 0.25rem 0.75rem;
              border-radius: 4px;
              font-weight: bold;
              font-size: 11px;
              color: white;
            }
            .z1 { background: #16a34a; }
            .z2 { background: #0891b2; }
            .z3 { background: #ca8a04; }
            .z4 { background: #ea580c; }
            .z5 { background: #dc2626; }
            .footer {
              margin-top: 3rem;
              padding-top: 1rem;
              border-top: 1px solid #ccc;
              text-align: center;
              font-size: 10px;
              color: #999;
            }
            .page-break {
              page-break-after: always;
              margin-bottom: 2rem;
            }
          </style>
        </head>
        <body>
          <!-- CAPA -->
          <div class="header">
            <h1>PLANO DE TREINO</h1>
            <p>${cycle.nome}</p>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <div class="info-label">Atleta</div>
              <div class="info-value">${athlete.nome}</div>
            </div>
            <div class="info-box">
              <div class="info-label">Período</div>
              <div class="info-value">${cycle.semanas?.length || 0} semanas</div>
            </div>
            <div class="info-box">
              <div class="info-label">Quilometragem Total</div>
              <div class="info-value">${totalKm.toFixed(1)} km</div>
            </div>
            <div class="info-box">
              <div class="info-label">Número de Treinos</div>
              <div class="info-value">${totalTreinos}</div>
            </div>
          </div>

          ${cycle.prova?.data ? `
            <div class="info-box" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-left-color: #f59e0b; grid-column: 1/-1;">
              <div class="info-label" style="color: #92400e;">🎯 Prova Alvo</div>
              <div class="info-value" style="color: #92400e;">${cycle.prova.data}</div>
            </div>
          ` : ''}

          <!-- DETALHES DOS TREINOS -->
          <div class="page-break">
            <div class="section-title">Estrutura de Treinos</div>

            ${cycle.semanas?.map((semana, idx) => `
              <h3 style="color: #333; margin: 1.5rem 0 0.75rem 0; font-size: 14px;">
                Semana ${semana.semana || idx + 1}: ${semana.nome}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Tipo</th>
                    <th>Distância</th>
                    <th>Zona</th>
                    <th>Observações</th>
                  </tr>
                </thead>
                <tbody>
                  ${semana.treinos?.map((treino, tidx) => `
                    <tr>
                      <td>${tidx + 1}</td>
                      <td>${treino.tipo || '—'}</td>
                      <td>${treino.km || '—'} km</td>
                      <td>
                        ${treino.zona ? `
                          <span class="zone-badge ${treino.zona.toLowerCase().replace(' ', '')}">${treino.zona}</span>
                        ` : '—'}
                      </td>
                      <td>${treino.obs || '—'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `).join('')}
          </div>

          <!-- ZONAS DE TREINO -->
          <div class="section-title">Zonas de Treino</div>
          <table>
            <thead>
              <tr>
                <th>Zona</th>
                <th>Descrição</th>
                <th>Pace (min/km)</th>
                <th>Objetivo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="zone-badge z1">Z1</span></td>
                <td>Recuperação</td>
                <td>Acima de Z2 + 20s</td>
                <td>Recuperação ativa, adaptação</td>
              </tr>
              <tr>
                <td><span class="zone-badge z2">Z2</span></td>
                <td>Fundo (Aeróbio Fácil)</td>
                <td>Z1 - 20s</td>
                <td>Base aeróbia, resistência</td>
              </tr>
              <tr>
                <td><span class="zone-badge z3">Z3</span></td>
                <td>Limite</td>
                <td>Z1 + 20s</td>
                <td>Resistência específica</td>
              </tr>
              <tr>
                <td><span class="zone-badge z4">Z4</span></td>
                <td>Ritmo</td>
                <td>Pace do teste 3km</td>
                <td>Trabalho de velocidade</td>
              </tr>
              <tr>
                <td><span class="zone-badge z5">Z5</span></td>
                <td>Velocidade</td>
                <td>Abaixo de Z4 - 20s</td>
                <td>Potência, capacidade anaeróbia</td>
              </tr>
            </tbody>
          </table>

          <!-- RECOMENDAÇÕES -->
          <div class="section-title">Recomendações</div>
          <ul style="font-size: 12px; line-height: 1.8;">
            <li>Respeite as zonas de treino estabelecidas</li>
            <li>Faça um aquecimento de 5-10 minutos antes de cada treino</li>
            <li>Finalize com alongamento de 5-10 minutos</li>
            <li>Mantenha uma hidratação adequada durante os treinos</li>
            <li>Registre seu feedback após cada sessão</li>
            <li>Durma adequadamente (7-9 horas) para otimizar a recuperação</li>
          </ul>

          <div class="footer">
            <p>Gerado em ${new Date().toLocaleDateString('pt-BR')} • Plataforma de Treino Mateus Lucas</p>
          </div>
        </body>
        </html>
      `;

      // Configurar opções do PDF
      const options = {
        margin: [10, 10, 10, 10],
        filename: `Ciclo_${athlete.nome.replace(/\s+/g, '_')}_${cycle.nome.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      };

      // Gerar PDF
      html2pdf().set(options).from(htmlContent).save();
      showToast('✅ Relatório PDF gerado com sucesso!', 'sucesso');

    } catch (e) {
      console.error('Erro ao gerar PDF:', e);
      showToast(`Erro ao gerar PDF: ${e.message}`, 'erro');
    }
  }

  /**
   * Carregar html2pdf via CDN
   */
  static loadHtml2Pdf() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = resolve;
      script.onerror = () => {
        console.error('Erro ao carregar html2pdf');
        reject(new Error('html2pdf não carregou'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Exportar ciclo para CSV
   */
  static async exportToCSV(athleteId, cycleId) {
    try {
      const storage = getStorageEngine();
      const athlete = await storage.getAthlete(athleteId);
      const cycle = await storage.getCycle(athleteId, cycleId);

      if (!athlete || !cycle) throw new Error('Dados não encontrados');

      let csv = 'PLANO DE TREINO\\n\\n';
      csv += `Atleta,${athlete.nome}\\n`;
      csv += `Ciclo,${cycle.nome}\\n`;
      csv += `Data Criação,${cycle.created_at}\\n\\n`;

      csv += 'Semana,Dia,Tipo,Km,Zona,Observações\\n';

      cycle.semanas?.forEach((semana, idx) => {
        semana.treinos?.forEach((treino, tidx) => {
          csv += `${semana.semana || idx + 1},${tidx + 1},${treino.tipo || ''},${treino.km || ''},${treino.zona || ''},${treino.obs || ''}\\n`;
        });
      });

      // Download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Ciclo_${athlete.nome}_${cycle.nome}.csv`;
      link.click();

      showToast('✅ Relatório CSV exportado!', 'sucesso');
    } catch (e) {
      showToast(`Erro ao exportar: ${e.message}`, 'erro');
    }
  }
}
