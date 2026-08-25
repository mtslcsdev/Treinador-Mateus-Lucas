/* ================= RELATORIO.JS - Relatório PDF Ciclo ===== */

function exportarCicloPDF() {
  if (!cicloAtual) return;

  carregarHtml2Pdf(() => {
    const conteudo = gerarHTMLRelatorioCiclo();
    const element = document.createElement('div');
    element.innerHTML = conteudo;
    element.style.display = 'none';
    document.body.appendChild(element);

    showPDFLoading(true);

    const opt = {
      margin: [15, 15, 15, 15],
      filename: `${sanitizeHTML(atletaAtual.nome)}_${sanitizeHTML(cicloAtual.nome)}_Relatório.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        showPDFLoading(false);
        document.body.removeChild(element);
        showToast('PDF do ciclo gerado com sucesso!', 'sucesso');
      })
      .catch(() => {
        showPDFLoading(false);
        if (document.body.contains(element)) document.body.removeChild(element);
        showToast('Erro ao gerar o PDF.', 'erro');
      });
  });
}

function gerarHTMLRelatorioCiclo() {
  const stats = calcularStatsCiclo();
  const dataGeracao = new Date().toLocaleDateString('pt-BR');

  let html = `
    <div style="font-family:Arial,sans-serif; width:100%; padding:20px;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#1a56db,#1e3a8a); color:white; padding:20px 24px; border-radius:8px; margin-bottom:24px;">
        <div style="font-size:11px; opacity:0.8; margin-bottom:4px; text-transform:uppercase; letter-spacing:1px;">Treinador Mateus Lucas</div>
        <div style="font-size:22px; font-weight:800; margin-bottom:2px;">${sanitizeHTML(atletaAtual.nome)}</div>
        <div style="font-size:14px; opacity:0.9; margin-bottom:16px;">${sanitizeHTML(cicloAtual.nome)}</div>
        <div style="font-size:11px; opacity:0.7;">📅 Relatório gerado em ${dataGeracao}</div>
      </div>

      <!-- Estatísticas do Ciclo -->
      <div style="margin-bottom:24px;">
        <div style="font-size:14px; font-weight:700; color:#1a56db; margin-bottom:12px; border-bottom:2px solid #bfdbfe; padding-bottom:8px;">📊 RESUMO DO CICLO</div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:12px;">
          <div style="background:#f0fdf4; padding:12px; border-radius:6px; border-left:3px solid #16a34a;">
            <div style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Semanas</div>
            <div style="font-size:18px; font-weight:800; color:#1a56db;">${cicloAtual.semanas.length}</div>
          </div>
          <div style="background:#eff6ff; padding:12px; border-radius:6px; border-left:3px solid #0891b2;">
            <div style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Treinos</div>
            <div style="font-size:18px; font-weight:800; color:#1a56db;">${stats.treinos.total}</div>
          </div>
          <div style="background:#fefce8; padding:12px; border-radius:6px; border-left:3px solid #ca8a04;">
            <div style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Volume</div>
            <div style="font-size:18px; font-weight:800; color:#1a56db;">${stats.totalKm.toFixed(1)}<span style="font-size:12px;"> km</span></div>
          </div>
          <div style="background:#fef2f2; padding:12px; border-radius:6px; border-left:3px solid #dc2626;">
            <div style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700; margin-bottom:4px;">Média/Semana</div>
            <div style="font-size:18px; font-weight:800; color:#1a56db;">${stats.mediaKmSemana.toFixed(1)}<span style="font-size:12px;"> km</span></div>
          </div>
        </div>
      </div>

      <!-- Distribuição de Fases -->
      <div style="margin-bottom:24px;">
        <div style="font-size:14px; font-weight:700; color:#1a56db; margin-bottom:12px; border-bottom:2px solid #bfdbfe; padding-bottom:8px;">🎯 DISTRIBUIÇÃO DE FASES</div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
          <div style="background:#dcfce7; padding:12px; border-radius:6px;">
            <div style="font-size:11px; color:#15803d; font-weight:700; margin-bottom:4px;">BASE</div>
            <div style="font-size:18px; font-weight:800; color:#15803d;">${stats.treinos.base}</div>
            <div style="font-size:11px; color:#64748b; margin-top:4px;">${stats.treinos.total > 0 ? ((stats.treinos.base / stats.treinos.total) * 100).toFixed(0) : 0}% do ciclo</div>
          </div>
          <div style="background:#fef9c3; padding:12px; border-radius:6px;">
            <div style="font-size:11px; color:#92400e; font-weight:700; margin-bottom:4px;">ESPECÍFICO</div>
            <div style="font-size:18px; font-weight:800; color:#92400e;">${stats.treinos.especifico}</div>
            <div style="font-size:11px; color:#64748b; margin-top:4px;">${stats.treinos.total > 0 ? ((stats.treinos.especifico / stats.treinos.total) * 100).toFixed(0) : 0}% do ciclo</div>
          </div>
          <div style="background:#fee2e2; padding:12px; border-radius:6px;">
            <div style="font-size:11px; color:#991b1b; font-weight:700; margin-bottom:4px;">POLIMENTO</div>
            <div style="font-size:18px; font-weight:800; color:#991b1b;">${stats.treinos.polimento}</div>
            <div style="font-size:11px; color:#64748b; margin-top:4px;">${stats.treinos.total > 0 ? ((stats.treinos.polimento / stats.treinos.total) * 100).toFixed(0) : 0}% do ciclo</div>
          </div>
        </div>
      </div>
  `;

  // Prova Alvo
  if (cicloAtual.prova?.nome) {
    html += `
      <div style="margin-bottom:24px;">
        <div style="font-size:14px; font-weight:700; color:#1a56db; margin-bottom:12px; border-bottom:2px solid #bfdbfe; padding-bottom:8px;">🏁 PROVA ALVO</div>
        <div style="background:#fef3c7; border-left:4px solid #ca8a04; padding:14px; border-radius:6px;">
          <div style="font-size:14px; font-weight:700; color:#92400e; margin-bottom:4px;">${sanitizeHTML(cicloAtual.prova.nome)}</div>
          <div style="font-size:12px; color:#65550e;">
            ${cicloAtual.prova.distancia ? `Distância: ${sanitizeHTML(cicloAtual.prova.distancia)}` : ''}
            ${cicloAtual.prova.data ? `<br>Data: ${new Date(cicloAtual.prova.data + 'T00:00:00').toLocaleDateString('pt-BR')}` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Detalhes por Semana
  html += `
    <div style="margin-bottom:24px;">
      <div style="font-size:14px; font-weight:700; color:#1a56db; margin-bottom:12px; border-bottom:2px solid #bfdbfe; padding-bottom:8px;">📋 SEMANAS E TREINOS</div>
  `;

  cicloAtual.semanas.forEach((semana, sIdx) => {
    const semanaKm = (semana.treinos || []).reduce((sum, t) => {
      const kmM = parseFloat(t.km) || 0;
      const kmB = (t.blocos && t.blocos.length) ? calcularDistanciaTotalTreino(t.blocos) : 0;
      return sum + (kmM || kmB);
    }, 0);

    html += `
      <div style="page-break-inside:avoid; margin-bottom:16px; background:#f8fafc; padding:12px; border-radius:6px; border-left:4px solid #0891b2;">
        <div style="font-size:13px; font-weight:700; color:#1a56db; margin-bottom:8px;">
          Semana ${semana.semana}${semana.nome ? ' — ' + semana.nome : ''}
        </div>
        ${semana.treinos && semana.treinos.length > 0 ? `
          <div style="font-size:11px; color:#64748b; margin-bottom:8px;">
            ${semana.treinos.length} treino${semana.treinos.length !== 1 ? 's' : ''} · ${semanaKm.toFixed(1)} km
          </div>
        ` : '<div style="font-size:11px; color:#94a3b8; font-style:italic;">Nenhum treino cadastrado</div>'}
        ${(semana.treinos || []).map(t => `
          <div style="font-size:11px; color:#334155; margin-top:6px; padding:6px; background:white; border-radius:4px;">
            <strong>${sanitizeHTML(t.tipo || 'Treino sem tipo')}</strong>
            ${t.dia ? ` · ${new Date(t.dia + 'T00:00:00').toLocaleDateString('pt-BR')}` : ''}
            ${t.km || (t.blocos?.length ? ' · ' + calcularDistanciaTotalTreino(t.blocos).toFixed(1) + ' km' : '')}
            ${t.especificacao ? `<br>Especificação: ${t.especificacao.substring(0, 100)}...` : ''}
          </div>
        `).join('')}
      </div>
    `;
  });

  html += `
    </div>
    </div>
  `;

  return html;
}
