/**
 * Calcula zonas de treinamento baseado em incrementos de 20 segundos
 * Z4 = pace do teste (3km)
 * Z5 = Z4 - 20s
 * Z3 = Z4 + 20s
 * Z2 = Z3 + 20s
 * Z1 = Z2 + 20s
 * Cada zona também tem um range de 20s para cima
 */
function calcularZonas(paceSegundos) {
  if (!paceSegundos || paceSegundos <= 0) {
    return null;
  }

  const INCREMENTO = 20; // 20 segundos entre zonas

  // Z4 é o pace do teste
  const z4Min = paceSegundos;
  const z4Max = paceSegundos + INCREMENTO;

  // Z5 é mais rápido (- 20s)
  const z5Min = paceSegundos - INCREMENTO;
  const z5Max = paceSegundos;

  // Z3 é mais lento (+ 20s)
  const z3Min = paceSegundos + INCREMENTO;
  const z3Max = paceSegundos + (INCREMENTO * 2);

  // Z2 é ainda mais lento (+ 40s)
  const z2Min = paceSegundos + (INCREMENTO * 2);
  const z2Max = paceSegundos + (INCREMENTO * 3);

  // Z1 é o mais lento (+ 60s)
  const z1Min = paceSegundos + (INCREMENTO * 3);
  const z1Max = paceSegundos + (INCREMENTO * 4);

  const zonas = {
    Z1: {
      min: z1Min,
      max: z1Max,
      minFormatado: formatarPace(z1Min),
      maxFormatado: formatarPace(z1Max),
      paceSegundos: z1Min,
      paceFormatado: `${formatarPace(z1Min)} a ${formatarPace(z1Max)}`,
      velocidadeKmh: `${calcularVelocidadeKmh(z1Max).toFixed(2)} a ${calcularVelocidadeKmh(z1Min).toFixed(2)} km/h`
    },
    Z2: {
      min: z2Min,
      max: z2Max,
      minFormatado: formatarPace(z2Min),
      maxFormatado: formatarPace(z2Max),
      paceSegundos: z2Min,
      paceFormatado: `${formatarPace(z2Min)} a ${formatarPace(z2Max)}`,
      velocidadeKmh: `${calcularVelocidadeKmh(z2Max).toFixed(2)} a ${calcularVelocidadeKmh(z2Min).toFixed(2)} km/h`
    },
    Z3: {
      min: z3Min,
      max: z3Max,
      minFormatado: formatarPace(z3Min),
      maxFormatado: formatarPace(z3Max),
      paceSegundos: z3Min,
      paceFormatado: `${formatarPace(z3Min)} a ${formatarPace(z3Max)}`,
      velocidadeKmh: `${calcularVelocidadeKmh(z3Max).toFixed(2)} a ${calcularVelocidadeKmh(z3Min).toFixed(2)} km/h`
    },
    Z4: {
      min: z4Min,
      max: z4Max,
      minFormatado: formatarPace(z4Min),
      maxFormatado: formatarPace(z4Max),
      paceSegundos: z4Min,
      paceFormatado: `${formatarPace(z4Min)} a ${formatarPace(z4Max)}`,
      velocidadeKmh: `${calcularVelocidadeKmh(z4Max).toFixed(2)} a ${calcularVelocidadeKmh(z4Min).toFixed(2)} km/h`
    },
    Z5: {
      min: z5Min,
      max: z5Max,
      minFormatado: formatarPace(z5Min),
      maxFormatado: formatarPace(z5Max),
      paceSegundos: z5Min,
      paceFormatado: `${formatarPace(z5Min)} a ${formatarPace(z5Max)}`,
      velocidadeKmh: `${calcularVelocidadeKmh(z5Max).toFixed(2)} a ${calcularVelocidadeKmh(z5Min).toFixed(2)} km/h`
    }
  };

  return zonas;
}

/**
 * Formata segundos para formato HH:MM:SS/km
 * @param {number} segundos - Segundos para formatar
 * @returns {string} Formato HH:MM:SS/km
 */
function formatarPace(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const secs = segundos % 60;

  const padStart = (num) => String(num).padStart(2, '0');

  if (horas > 0) {
    return `${padStart(horas)}:${padStart(minutos)}:${padStart(secs)}/km`;
  } else {
    return `${padStart(minutos)}:${padStart(secs)}/km`;
  }
}

/**
 * Calcula velocidade em km/h a partir de pace em segundos
 * @param {number} paceSegundos - Pace em segundos por km
 * @returns {number} Velocidade em km/h (2 casas decimais)
 */
function calcularVelocidadeKmh(paceSegundos) {
  if (paceSegundos <= 0) return 0;
  return parseFloat((3600 / paceSegundos).toFixed(2));
}

/**
 * Gera descrição textual de um treino para exibição ao aluno
 * @param {Object} treino - Objeto do treino com propriedades: tipo, zona, blocos
 * @param {Object} zonas - Zonas calculadas pelo calcularZonas()
 * @returns {string} Descrição formatada do treino
 */
function gerarDescricaoTreino(treino, zonas) {
  let descricao = "";

  if (!treino || !treino.tipo) {
    return "Treino sem tipo especificado";
  }

  // Mapeamento de tipos de treino e descrições
  const descricoesTipos = {
    recuperacao: {
      descricao: "Treino de Recuperação",
      zona: "Z1-Z2",
      objetivo: "Recuperação ativa, manter frequência cardíaca baixa"
    },
    fundo: {
      descricao: "Corrida em Fundo",
      zona: "Z2-Z3",
      objetivo: "Desenvolvimento aeróbio, conversível"
    },
    progressivo: {
      descricao: "Corrida Progressiva",
      zona: "Z2 → Z3 → Z4",
      objetivo: "Progressão gradual de intensidade"
    },
    ritmo: {
      descricao: "Treino de Ritmo (Limiar)",
      zona: "Z4",
      objetivo: "Melhorar limiar anaeróbio"
    },
    intervalado: {
      descricao: "Treino Intervalado",
      zona: "Z4-Z5",
      objetivo: "Desenvolvimento de potência aeróbia"
    },
    repeticoes: {
      descricao: "Treino de Repetições",
      zona: "Z5",
      objetivo: "Desenvolvimento de velocidade máxima"
    },
    fartlek: {
      descricao: "Fartlek (Brincadeira da Velocidade)",
      zona: "Z2-Z5",
      objetivo: "Variação de ritmo em ambiente natural"
    },
    trt: {
      descricao: "TRT - Teste de Ritmo Total",
      zona: "Z1-Z5",
      objetivo: "Teste completo de ritmo com variação de intensidades"
    }
  };

  const tipoLower = treino.tipo.toLowerCase();
  const infoTipo = descricoesTipos[tipoLower] || {
    descricao: treino.tipo,
    zona: "Zona não definida",
    objetivo: "Vide observações"
  };

  descricao += `🏃 ${infoTipo.descricao}\n`;
  descricao += `📊 Zona(s): ${infoTipo.zona}\n`;
  descricao += `🎯 Objetivo: ${infoTipo.objetivo}\n`;

  // Se houver blocos/repetições, detalhá-los
  if (treino.blocos && Array.isArray(treino.blocos) && treino.blocos.length > 0) {
    descricao += `\n📋 Estrutura do Treino:\n`;

    treino.blocos.forEach((bloco, idx) => {
      descricao += `  ${idx + 1}. ${bloco.descricao || `Bloco ${idx + 1}`}\n`;

      if (bloco.distancia) {
        descricao += `     - Distância: ${bloco.distancia}km\n`;
      }

      if (bloco.repeticoes) {
        descricao += `     - Repetições: ${bloco.repeticoes}x\n`;
      }

      if (bloco.intervalo) {
        descricao += `     - Intervalo/Recuperação: ${bloco.intervalo}\n`;
      }

      if (bloco.pace) {
        descricao += `     - Pace: ${bloco.pace}\n`;
      }
    });
  }

  // Adicionar observações
  if (treino.obs) {
    descricao += `\n📝 Observações: ${treino.obs}`;
  }

  return descricao;
}

/**
 * Gera resumo completo do treino com todas as informações
 * @param {Object} treino - Objeto do treino
 * @param {Object} zonas - Zonas calculadas
 * @returns {Object} Resumo com tipo, modalidade, distância total e descrição
 */
function gerarResumaTreino(treino, zonas) {
  if (!treino) {
    return null;
  }

  const distanciaTotal = treino.blocos ? calcularDistanciaTotalTreino(treino.blocos) : 0;
  const descricao = gerarDescricaoTreino(treino, zonas);

  return {
    tipo: treino.tipo || "Não especificado",
    modalidade: treino.modalidade || "Corrida",
    distanciaTotal: distanciaTotal,
    distanciaFormatada: `${distanciaTotal}km`,
    descricao: descricao,
    zona: treino.zona || "Z2",
    duracao: treino.duracao || null,
    pace: treino.pace || null,
    observacoes: treino.obs || null,
    timestamp: new Date().toISOString()
  };
}

/**
 * Converte formato MM:SS para segundos
 */
function converterPaceParaSegundos(paceFormatado) {
  if (!paceFormatado) return null;
  const pace = paceFormatado.trim();

  // Aceita MM:SS (ex: 5:00 ou 05:00)
  if (!/^\d{1,2}:\d{2}$/.test(pace)) return null;

  const partes = pace.split(':');
  const minutos = parseInt(partes[0], 10);
  const segundos = parseInt(partes[1], 10);

  if (segundos >= 60) return null; // segundos inválidos
  if (minutos <= 0 && segundos <= 0) return null;

  return minutos * 60 + segundos;
}

/**
 * Calcula e exibe as zonas de treino na interface
 */
let calculandoZonas = false; // Flag para evitar race conditions

function validarPaceInput(input) {
  const val = input.value.trim();
  if (!val) { input.classList.remove('input-invalido'); return; }
  const valido = /^\d{1,2}:\d{0,2}$/.test(val) || /^\d{1,2}$/.test(val);
  input.classList.toggle('input-invalido', !valido);
}

function calcularEExibirZonas() {
  // Evitar race condition: se já está calculando, não execute novamente
  if (calculandoZonas) {
    showToast("Cálculo em progresso, aguarde...", 'info');
    return;
  }

  if (!atletaAtual) {
    showToast("Selecione um atleta primeiro!", 'aviso');
    return;
  }

  const inputPace = document.getElementById("paceTeste5km").value.trim();

  if (!inputPace) {
    showToast("Digite o pace do teste de 3km!", 'aviso');
    document.getElementById("paceTeste5km").classList.add('input-invalido');
    return;
  }

  const paceSegundos = converterPaceParaSegundos(inputPace);

  if (!paceSegundos || paceSegundos <= 0) {
    showToast("Formato inválido! Use MM:SS (ex: 05:00)", 'erro');
    document.getElementById("paceTeste5km").classList.add('input-invalido');
    return;
  }

  document.getElementById("paceTeste5km").classList.remove('input-invalido');

  // Marcar como calculando para evitar race condition
  calculandoZonas = true;
  const btnCalcular = document.querySelector('.btn-calcular-zona');
  if (btnCalcular) btnCalcular.disabled = true;

  try {
    zonasCalculadas = calcularZonas(paceSegundos);

    if (!zonasCalculadas) {
      showToast("Erro ao calcular as zonas!", 'erro');
      return;
    }

    // Salvar no atleta atual
    if (!atletaAtual.teste3km) atletaAtual.teste3km = {};
    atletaAtual.teste3km.paceTeste3km = inputPace;
    atletaAtual.teste3km.paceSegundos = paceSegundos;
    atletaAtual.teste3km.zonas = zonasCalculadas;
    atletaAtual.teste3km.dataCalculo = new Date().toISOString();

    // Salvar no histórico do atleta com limite de 20 entradas
    if (!atletaAtual.historicoPaces) atletaAtual.historicoPaces = [];
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const jaExiste = atletaAtual.historicoPaces[0]?.data === dataHoje && atletaAtual.historicoPaces[0]?.pace === inputPace;

    let itemAdicionado = false;
    if (!jaExiste) {
      atletaAtual.historicoPaces.unshift({ data: dataHoje, pace: inputPace, paceSegundos });
      itemAdicionado = true;
      // Manter apenas as últimas 20 entradas
      while (atletaAtual.historicoPaces.length > 20) {
        atletaAtual.historicoPaces.pop();
      }
    }

    try {
      salvar();
    } catch (e) {
      // Se salvar falhar, reverter a adição para evitar inconsistência de estado
      if (itemAdicionado && atletaAtual.historicoPaces.length > 0) {
        atletaAtual.historicoPaces.shift();
      }
      throw e;
    }

    // Exibir as zonas na interface
    exibirZonasNaInterface();
    renderHistoricoPaces();

    showToast("Zonas calculadas com sucesso!", 'sucesso');
  } finally {
    // Sempre liberar o botão, mesmo em caso de erro
    calculandoZonas = false;
    if (btnCalcular) btnCalcular.disabled = false;
  }
}

/**
 * Exibe as zonas na interface visual
 */
function exibirZonasNaInterface() {
  const container = document.getElementById("containerZonas");
  if (!container || !zonasCalculadas) return;

  container.innerHTML = "";

  const zonaInfo = {
    Z1: { nome: "Recuperação",    emoji: "🟢" },
    Z2: { nome: "Leve / Fundo",   emoji: "🔵" },
    Z3: { nome: "Aeróbio",        emoji: "🟡" },
    Z4: { nome: "Limiar",         emoji: "🟠" },
    Z5: { nome: "Máxima",         emoji: "🔴" }
  };

  // Ordem invertida para mostrar de Z5 para Z1 (mais rápido para mais lento)
  ['Z5', 'Z4', 'Z3', 'Z2', 'Z1'].forEach(zona => {
    const d = zonasCalculadas[zona];
    if (!d) return;
    const info = zonaInfo[zona] || { nome: zona, emoji: "⚡" };
    const card = document.createElement("div");
    card.className = `zona-card ${zona.toLowerCase()}`;

    card.innerHTML = `
      <div class="zona-nome">${info.emoji} ${zona}</div>
      <div class="zona-pace">${d.paceFormatado}</div>
      <div class="zona-info">
        <small><strong>${info.nome}</strong></small>
        <small>${d.velocidadeKmh}</small>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Carrega zonas do atleta atual
 */
function carregarZonas() {
  if (!atletaAtual) {
    document.getElementById("containerZonas").innerHTML = '';
    document.getElementById("paceTeste5km").value = '';
    renderHistoricoPaces();
    return;
  }

  if (atletaAtual.teste3km && atletaAtual.teste3km.zonas) {
    zonasCalculadas = atletaAtual.teste3km.zonas;
    document.getElementById("paceTeste5km").value = atletaAtual.teste3km.paceTeste3km || '';
    exibirZonasNaInterface();
  } else {
    document.getElementById("containerZonas").innerHTML = '';
    document.getElementById("paceTeste5km").value = '';
  }
  renderHistoricoPaces();
}

function renderHistoricoPaces() {
  const container = document.getElementById('historicoPaces');
  if (!container || !atletaAtual) { if (container) container.innerHTML = ''; return; }

  const historico = atletaAtual.historicoPaces || [];
  if (historico.length === 0) { container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="historico-paces">
      <div class="historico-paces-titulo">📈 Histórico de Testes (3km) — ${atletaAtual.nome}</div>
      <div class="historico-paces-list">
        ${historico.map((entry, i) => `
          <div class="historico-pace-item${i === 0 ? ' atual' : ''}">
            <span class="historico-pace-date">${entry.data}</span>
            <span class="historico-pace-value">⏱ ${entry.pace}/km</span>
            ${i === 0 ? '<span class="historico-pace-badge">Atual</span>' : ''}
            <button class="btn-historico-del" onclick="deletarHistoricoPace(${i})" title="Remover">✕</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function deletarHistoricoPace(index) {
  if (!atletaAtual) return;

  atletaAtual.historicoPaces.splice(index, 1);
  salvar();
  renderHistoricoPaces();

  if (index === 0) {
    if (atletaAtual.historicoPaces.length > 0) {
      const atual = atletaAtual.historicoPaces[0];
      zonasCalculadas = calcularZonas(atual.paceSegundos);
      atletaAtual.teste3km = {
        paceTeste3km: atual.pace,
        paceSegundos: atual.paceSegundos,
        zonas: zonasCalculadas,
        dataCalculo: new Date().toISOString()
      };
      document.getElementById("paceTeste5km").value = atual.pace;
      exibirZonasNaInterface();
      salvar();
    } else {
      atletaAtual.teste3km = null;
      zonasCalculadas = null;
      document.getElementById("paceTeste5km").value = '';
      document.getElementById("containerZonas").innerHTML = '';
      salvar();
    }
  }
}
