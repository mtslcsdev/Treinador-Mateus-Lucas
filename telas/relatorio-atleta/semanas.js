/* Dados do relatório: atletas, ciclos e semanas prescritas.
   Classic script — define window.RelatorioDados, lido pela lógica do DC.
   Cada treino é uma lista de blocos; distância, pace e janela de tempo
   são calculados a partir do teste de 3km, nunca digitados. */
window.RelatorioDados = {
  treinador: 'Mateus Lucas',
  atletas: [
    {
      nome: 'Allan e Pedro Henrique',
      ciclo: 'Ciclo 21km · Maratona Piauí Crono',
      prova: 'Meia Maratona da PF',
      teste: '05:00',
      semanas: [
        {
          rotulo: '27 de julho a 02 de agosto',
          fase: 'Base · Recuperação',
          notas: 'Semana leve depois do teste de 3km. Nada de forçar: o objetivo é chegar em agosto com a perna descansada. Se o corpo pedir, troque o sábado por 40 min de caminhada.',
          treinos: [
            { dia: 'QUA', data: '30', mes: 'JUL', tipo: 'Regenerativo', zona: 'z1',
              blocos: [{ km: 6, zona: 'z1' }],
              extra: 'Aquecimento 8 min de caminhada · Desaquecimento livre e alongamento leve' },
            { dia: 'SÁB', data: '02', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 10, zona: 'z2' }],
              extra: 'Aquecimento 10 min em Z1 · Desaquecimento 5 min em Z1' }
          ]
        },
        {
          rotulo: '03 a 09 de agosto',
          fase: 'Base · Ordinária',
          notas: 'Semana de retomada de volume depois da recuperação. Nos 800 m, não passe do pace de Z4 nas duas primeiras repetições — o ganho está em terminar as seis no mesmo tempo. O longão de sábado é conversável: se não conseguir falar, reduza.',
          treinos: [
            { dia: 'TER', data: '04', mes: 'AGO', tipo: 'Progressivo', zona: 'z2',
              blocos: [{ km: 8, zona: 'z2' }],
              extra: 'Aquecimento 10 min em Z1 · Desaquecimento 5 min em Z1 e alongamento leve' },
            { dia: 'QUI', data: '06', mes: 'AGO', tipo: 'Intervalado', zona: 'z4',
              blocos: [
                { km: 2, zona: 'z2' },
                { reps: 6, metros: 800, zona: 'z4', intervalo: 120, intervaloTxt: '2min trote' },
                { km: 3, zona: 'z1' }
              ],
              extra: 'Os 2 km em Z2 são o aquecimento; os 3 km em Z1, o desaquecimento.' },
            { dia: 'SÁB', data: '09', mes: 'AGO', tipo: 'Longão', zona: 'z2',
              blocos: [{ km: 16, zona: 'z2' }],
              extra: 'Aquecimento 12 min em Z1 · Desaquecimento 8 min em Z1 e alongamento leve' }
          ]
        },
        {
          rotulo: '10 a 16 de agosto',
          fase: 'Específico · Choque',
          notas: 'Semana mais cheia do ciclo: cinco saídas. O tempo entre os treinos importa mais que o pace — respeite as 48h entre quinta e sábado. Se acordar cansado na sexta, corte a rodagem e não o longão.',
          treinos: [
            { dia: 'SEG', data: '11', mes: 'AGO', tipo: 'Regenerativo', zona: 'z1',
              blocos: [{ km: 6, zona: 'z1' }] },
            { dia: 'TER', data: '12', mes: 'AGO', tipo: 'Ritmado', zona: 'z3',
              blocos: [{ km: 2, zona: 'z2' }, { km: 6, zona: 'z3' }, { km: 2, zona: 'z1' }] },
            { dia: 'QUI', data: '14', mes: 'AGO', tipo: 'Intervalado', zona: 'z5',
              blocos: [
                { km: 2, zona: 'z2' },
                { reps: 10, metros: 400, zona: 'z5', intervalo: 90, intervaloTxt: '1min30 trote' },
                { km: 2, zona: 'z1' }
              ] },
            { dia: 'SEX', data: '15', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 8, zona: 'z2' }] },
            { dia: 'SÁB', data: '16', mes: 'AGO', tipo: 'Longão', zona: 'z2',
              blocos: [{ km: 18, zona: 'z2' }] }
          ]
        },
        {
          rotulo: '17 a 23 de agosto',
          fase: 'Polimento',
          notas: 'Volume cai, intensidade fica. Semana de prova no domingo seguinte: chegue com vontade de correr mais, não com a sensação de ter treinado o suficiente.',
          treinos: [
            { dia: 'TER', data: '18', mes: 'AGO', tipo: 'Ritmado', zona: 'z4',
              blocos: [{ km: 2, zona: 'z2' }, { km: 4, zona: 'z4' }, { km: 2, zona: 'z1' }],
              extra: 'É o último estímulo forte do ciclo. Se o pace de Z4 vier fácil, mantenha — não acelere.' },
            { dia: 'QUI', data: '20', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 8, zona: 'z2' }],
              extra: 'Aquecimento 10 min em Z1 · Desaquecimento 5 min em Z1' },
            { dia: 'SÁB', data: '23', mes: 'AGO', tipo: 'Longão curto', zona: 'z2',
              blocos: [{ km: 12, zona: 'z2' }],
              extra: 'Metade do longão da semana passada. Use o mesmo tênis que vai usar na prova.' }
          ]
        }
      ]
    },
    {
      nome: 'Suzy Fernandes',
      ciclo: 'Ciclo 10km · Base',
      prova: 'Corrida do Trabalhador 10km',
      teste: '05:40',
      semanas: [
        {
          rotulo: '03 a 09 de agosto',
          fase: 'Base · Ordinária',
          notas: 'Três saídas na semana, todas em Z2. A ideia é a perna aprender a rodar solta antes de qualquer intensidade. Caminhar no meio do treino não é problema.',
          treinos: [
            { dia: 'TER', data: '04', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 5, zona: 'z2' }],
              extra: 'Aquecimento 10 min de caminhada · Desaquecimento 5 min de caminhada' },
            { dia: 'QUI', data: '06', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 6, zona: 'z2' }],
              extra: 'Aquecimento 10 min de caminhada · Desaquecimento 5 min de caminhada' },
            { dia: 'SÁB', data: '09', mes: 'AGO', tipo: 'Longão', zona: 'z2',
              blocos: [{ km: 9, zona: 'z2' }],
              extra: 'Aquecimento 12 min em Z1 · Beba água a cada 20 min' }
          ]
        },
        {
          rotulo: '10 a 16 de agosto',
          fase: 'Base · Ordinária',
          notas: 'Primeiro fartlek do ciclo. Os 2 min fortes são em Z4: forte mas controlado, dá pra falar uma frase curta. Se não der, é Z5 e está rápido demais.',
          treinos: [
            { dia: 'TER', data: '11', mes: 'AGO', tipo: 'Fartlek', zona: 'z4',
              blocos: [
                { km: 2, zona: 'z2' },
                { reps: 5, metros: 600, zona: 'z4', intervalo: 180, intervaloTxt: '3min caminhada' },
                { km: 2, zona: 'z1' }
              ],
              extra: 'Os 2 km iniciais em Z2 são o aquecimento; os 2 km finais em Z1, o desaquecimento.' },
            { dia: 'QUI', data: '13', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 6, zona: 'z2' }],
              extra: 'Aquecimento 10 min de caminhada · Desaquecimento 5 min de caminhada' },
            { dia: 'SÁB', data: '16', mes: 'AGO', tipo: 'Longão', zona: 'z2',
              blocos: [{ km: 10, zona: 'z2' }],
              extra: 'Primeiro longão de 10 km. Sem pressa: o objetivo é terminar inteira.' }
          ]
        },
        {
          rotulo: '17 a 23 de agosto',
          fase: 'Específico',
          notas: 'Semana com o pace de prova dentro do longão. Os 3 km em Z3 vêm no fim, com a perna já cansada — é de propósito.',
          treinos: [
            { dia: 'TER', data: '18', mes: 'AGO', tipo: 'Rodagem', zona: 'z2',
              blocos: [{ km: 6, zona: 'z2' }] },
            { dia: 'QUI', data: '20', mes: 'AGO', tipo: 'Intervalado', zona: 'z4',
              blocos: [
                { km: 2, zona: 'z2' },
                { reps: 6, metros: 500, zona: 'z4', intervalo: 150, intervaloTxt: '2min30 trote' },
                { km: 2, zona: 'z1' }
              ] },
            { dia: 'SÁB', data: '23', mes: 'AGO', tipo: 'Longão com ritmo', zona: 'z3',
              blocos: [{ km: 7, zona: 'z2' }, { km: 3, zona: 'z3' }],
              extra: 'Os 3 km finais em Z3 são o pace de prova. Se não vier, termine em Z2.' }
          ]
        }
      ]
    }
  ]
};
