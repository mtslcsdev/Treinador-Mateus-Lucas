function verificarBackup() {
  const avisoDiv = document.getElementById("avisoBackup");
  const diasBackupSpan = document.getElementById("diasBackup");

  if (!dados.ultimoBackup) {
    avisoDiv.style.display = "block";
    diasBackupSpan.textContent = "Nenhum backup foi feito! ⚠️ Seus dados podem ser perdidos.";
  } else {
    const ultimoBackupDate = new Date(dados.ultimoBackup);
    const agora = new Date();
    const diasSemBackup = Math.floor((agora - ultimoBackupDate) / (1000 * 60 * 60 * 24));

    if (diasSemBackup >= 7) {
      avisoDiv.style.display = "block";
      diasBackupSpan.textContent = `Último backup foi há ${diasSemBackup} dias. Faça um backup agora! 💾`;
    } else if (diasSemBackup > 0) {
      avisoDiv.style.display = "block";
      diasBackupSpan.textContent = `Último backup: há ${diasSemBackup} dia(s)`;
    } else {
      avisoDiv.style.display = "none";
    }
  }
}

function exportarBackup() {
  const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  const nomeArquivo = `backup_treinos_${dataAtual}.json`;

  dados.ultimoBackup = new Date().toISOString();

  const jsonString = JSON.stringify(dados, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  salvar();
  verificarBackup();

  showToast(`Backup salvo: ${nomeArquivo}`, 'sucesso');
}

/* ===== SISTEMA DE VERSIONING AUTOMÁTICO ===== */
function fazerBackupAutomaticoSeguranca() {
  try {
    const timestamp = new Date().toISOString();
    const backupKey = `backup_seguranca_${timestamp}`;
    const versoes = [];

    // Buscar últimas 3 versões de backup de segurança
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('backup_seguranca_')) {
        versoes.push(key);
      }
    }

    // Ordenar por data (mais recentes primeiro) e manter apenas as 3 últimas
    versoes.sort().reverse();
    if (versoes.length >= 3) {
      localStorage.removeItem(versoes[2]); // Remove a 3ª versão mais antiga
    }

    // Salvar novo backup de segurança
    try {
      localStorage.setItem(backupKey, JSON.stringify({
        dados: dados,
        timestamp: timestamp,
        versao: '1.0'
      }));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('localStorage cheio. Limpando backups antigos...');
        // Limpar todos os backups automáticos
        const toRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('backup_seguranca_')) {
            toRemove.push(key);
          }
        }
        toRemove.forEach(key => localStorage.removeItem(key));
      }
    }
  } catch (e) {
    console.error('Erro ao criar backup de segurança:', e);
  }
}

function restaurarBackupAutomaticoSeguranca() {
  const versoes = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('backup_seguranca_')) {
      versoes.push(key);
    }
  }

  if (versoes.length === 0) return null;

  versoes.sort().reverse();
  try {
    const backup = JSON.parse(localStorage.getItem(versoes[0]));
    return backup.dados;
  } catch (e) {
    console.error('Erro ao restaurar backup automático:', e);
    return null;
  }
}

function importarBackup() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();

  fileInput.onchange = async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(event) {
      try {
        const conteudoArquivo = JSON.parse(event.target.result);

        // Validar estrutura do backup
        if (!conteudoArquivo.atletas || !Array.isArray(conteudoArquivo.atletas)) {
          showToast('Arquivo inválido! Certifique-se de que é um backup válido.', 'erro');
          return;
        }

        // Validar cada atleta tem estrutura mínima
        const atletasValidos = conteudoArquivo.atletas.every(a =>
          a && a.id && typeof a.nome === 'string' && Array.isArray(a.ciclos)
        );

        if (!atletasValidos) {
          showToast('Backup contém dados corrompidos! Estrutura inválida.', 'erro');
          return;
        }

        // Criar backup de segurança dos dados atuais ANTES de restaurar
        fazerBackupAutomaticoSeguranca();

        const confirmado = await showConfirm(
          'Todos os dados atuais serão <strong>substituídos</strong> pelo backup selecionado.<br>Um backup de segurança foi criado automaticamente.',
          'Restaurar Backup?',
          'atencao'
        );
        if (!confirmado) return;

        dados = conteudoArquivo;
        salvar();
        atletaAtual = null;
        cicloAtual = null;
        document.getElementById("areaCiclos").classList.add("hidden");
        document.getElementById("areaSemanas").classList.add("hidden");
        document.getElementById("tituloAtleta").textContent = "";
        document.getElementById("tituloCiclo").textContent = "";
        document.getElementById("semanas").innerHTML = "";
        renderAtletas();
        carregarZonas();
        showToast('Backup restaurado com sucesso! ✅', 'sucesso');
      } catch (error) {
        showToast('Erro ao ler o arquivo! Use um backup JSON válido.', 'erro');
        console.error(error);
      }
    };

    reader.readAsText(file);
  };
}
