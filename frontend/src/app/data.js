window.KIT2 = {
  atletas: [
    {
      id: '1',
      nome: 'Allan',
      aderencia: 78,
      teste: '05:00',
      trend: [22, 28, 31, 18, 0, 26, 34, 24],
      proximo: 'Ter 04/08 · Progressivo 8 km',
      ciclos: [
        {
          id: 'c1',
          nome: 'Ciclo Base 1',
          semanas: 4,
          treinos: 12,
          template: false,
          prova: null
        }
      ]
    },
    {
      id: '2',
      nome: 'Pedro Henrique',
      aderencia: 78,
      teste: '05:00',
      trend: [20, 25, 28, 22, 0, 24, 30, 26],
      proximo: 'Qua 05/08 · Fartlek 6 km',
      ciclos: [
        {
          id: 'c2',
          nome: 'Ciclo Base 1',
          semanas: 4,
          treinos: 11,
          template: false,
          prova: null
        }
      ]
    },
    {
      id: '3',
      nome: 'Jessyka Carvalho',
      aderencia: 92,
      teste: '05:40',
      trend: [28, 32, 35, 30, 0, 31, 36, 33],
      proximo: 'Qui 06/08 · Longão 14 km',
      ciclos: [
        {
          id: 'c3',
          nome: 'Ciclo Base 1',
          semanas: 4,
          treinos: 14,
          template: false,
          prova: null
        }
      ]
    },
    {
      id: '4',
      nome: 'Suzy',
      aderencia: 45,
      teste: '06:10',
      trend: [12, 14, 15, 10, 0, 12, 16, 13],
      proximo: 'Ter 04/08 · Leve 5 km',
      ciclos: [
        {
          id: 'c4',
          nome: 'Ciclo Recuperação',
          semanas: 2,
          treinos: 5,
          template: false,
          prova: null
        }
      ]
    },
    {
      id: '5',
      nome: 'Amanda Sousa',
      aderencia: 86,
      teste: '04:50',
      trend: [25, 28, 31, 26, 0, 29, 33, 28],
      proximo: 'Sex 08/08 · Ritmado 10 km',
      ciclos: [
        {
          id: 'c5',
          nome: 'Ciclo Base 1',
          semanas: 4,
          treinos: 13,
          template: false,
          prova: null
        }
      ]
    },
    {
      id: '6',
      nome: 'Eugênio Gabriel',
      aderencia: 61,
      teste: '05:25',
      trend: [18, 21, 24, 19, 0, 22, 26, 21],
      proximo: 'Seg 03/08 · Intervalado 8 km',
      ciclos: [
        {
          id: 'c6',
          nome: 'Ciclo Base 1',
          semanas: 4,
          treinos: 10,
          template: false,
          prova: null
        }
      ]
    }
  ],

  biblioteca: [
    {
      nome: '6x800m no limiar',
      tipo: 'intervalado',
      dist: 9.8,
      usos: 14,
      blocos: [
        { repeticoes: 1, distancia: 2, zona: 'Z2', intervalo: '' },
        { repeticoes: 6, distancia: 0.8, zona: 'Z4', intervalo: '2min trote' },
        { repeticoes: 1, distancia: 3, zona: 'Z1', intervalo: '' }
      ]
    },
    {
      nome: 'Progressivo 8km',
      tipo: 'progressivo',
      dist: 8,
      usos: 8,
      blocos: [
        { repeticoes: 1, distancia: 2, zona: 'Z2', intervalo: '' },
        { repeticoes: 1, distancia: 3, zona: 'Z3', intervalo: '' },
        { repeticoes: 1, distancia: 3, zona: 'Z4', intervalo: '' }
      ]
    },
    {
      nome: 'Fartlek 6km',
      tipo: 'fartlek',
      dist: 6,
      usos: 5,
      blocos: [
        { repeticoes: 1, distancia: 1, zona: 'Z2', intervalo: '' },
        { repeticoes: 5, distancia: 0.8, zona: 'Z3', intervalo: '1min Z1' },
        { repeticoes: 1, distancia: 1, zona: 'Z1', intervalo: '' }
      ]
    }
  ],

  semanas: [
    {
      id: 's1',
      nome: 'Semana 1',
      sub: 'Ordinária · Base',
      treinos: [
        {
          weekday: 'TER',
          day: '04',
          month: 'AGO',
          tipo: 'progressivo',
          fase: 'Base',
          status: 'feito',
          desc: '1. Correr por 8km — Intensidade Z2',
          dist: 8,
          tempo: '53:20 a 56:00',
          feedback: 'normal',
          exec: { dist: '8,003 km', tempo: '00:42:21', pace: '05:18/km', fc: '155 bpm', cad: '176 rpm' }
        }
      ]
    },
    {
      id: 's2',
      nome: 'Semana 2',
      sub: 'Ordinária · Base',
      treinos: [
        {
          weekday: 'SEG',
          day: '03',
          month: 'AGO',
          tipo: 'leve',
          fase: 'Base',
          status: 'prescrito',
          desc: '1. Aquecimento 2km\n2. 8x400m no Z4\n3. Desaquecimento 1km',
          dist: 6.2,
          tempo: '42:30 a 45:00',
          feedback: null
        }
      ]
    },
    {
      id: 's3',
      nome: 'Semana 3',
      sub: 'Ordinária · Base',
      treinos: []
    },
    {
      id: 's4',
      nome: 'Semana 4',
      sub: 'Ordinária · Base',
      treinos: []
    }
  ],

  grade: [
    {
      id: 'g1',
      nome: 'Semana 1',
      sub: 'Ordinária · Base',
      fase: 'Base',
      dias: {
        seg: [],
        ter: [{ tipo: 'progressivo', dist: 8, zona: 'Z2', resumo: '8km Z2' }],
        qua: [],
        qui: [],
        sex: [],
        sab: [{ tipo: 'longao', dist: 14, zona: 'Z2', resumo: '14km Z2' }],
        dom: []
      }
    },
    {
      id: 'g2',
      nome: 'Semana 2',
      sub: 'Ordinária · Base',
      fase: 'Base',
      dias: {
        seg: [{ tipo: 'intervalado', dist: 6.2, zona: 'Z4', resumo: '8x400m Z4' }],
        ter: [],
        qua: [{ tipo: 'leve', dist: 5, zona: 'Z1', resumo: '5km Z1' }],
        qui: [],
        sex: [{ tipo: 'fartlek', dist: 6, zona: 'Z3', resumo: 'Fartlek 6km' }],
        sab: [{ tipo: 'longao', dist: 16, zona: 'Z2', resumo: '16km Z2' }],
        dom: []
      }
    },
    {
      id: 'g3',
      nome: 'Semana 3',
      sub: 'Ordinária · Base',
      fase: 'Base',
      dias: {
        seg: [],
        ter: [],
        qua: [],
        qui: [],
        sex: [],
        sab: [],
        dom: []
      }
    },
    {
      id: 'g4',
      nome: 'Semana 4',
      sub: 'Ordinária · Base',
      fase: 'Base',
      dias: {
        seg: [],
        ter: [],
        qua: [],
        qui: [],
        sex: [],
        sab: [],
        dom: []
      }
    }
  ],

  volume: [
    { label: 'S1', value: 33.8 },
    { label: 'S2', value: 43 },
    { label: 'S3', value: 0 },
    { label: 'S4', value: 0 }
  ]
};

Object.assign(window, { KIT2 });
