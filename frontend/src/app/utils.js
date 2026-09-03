// Zone table calculation
function zoneTable(test) {
  if (!test) return null;
  const parts = test.split(':').map(Number);
  if (parts.length !== 2) return null;
  const m = parts[0];
  const s = parts[1];
  const t = m * 60 + s;
  return {
    Z5: { min: t - 20, max: t },
    Z4: { min: t, max: t + 20 },
    Z3: { min: t + 20, max: t + 40 },
    Z2: { min: t + 40, max: t + 60 },
    Z1: { min: t + 60, max: t + 80 }
  };
}

function fmtPace(s) {
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function fmtSpeed(s) {
  return (3600 / s).toFixed(2);
}

function hms(seconds) {
  if (seconds < 3600) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  const h = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// Workout estimation
function blockEstimate(block, zones) {
  if (!block || !zones) return null;
  const { repeticoes = 1, distancia = 0, zona = 'Z4', duracao = 0 } = block;
  const z = zones[zona];
  if (!z) return null;

  let km = 0;
  let minTxt = '0:00';
  let maxTxt = '0:00';

  if (distancia > 0) {
    km = distancia * repeticoes;
    const minSecs = km * z.min;
    const maxSecs = km * z.max;
    minTxt = hms(minSecs);
    maxTxt = hms(maxSecs);
    return { km, min: minSecs, max: maxSecs, minTxt, maxTxt, paceMin: fmtPace(z.min), paceMax: fmtPace(z.max) };
  } else if (duracao > 0) {
    km = (duracao * 60) / ((z.min + z.max) / 2) / 1000;
    minTxt = hms(duracao * 60);
    maxTxt = hms(duracao * 60);
    return { km, min: duracao * 60, max: duracao * 60, minTxt, maxTxt, paceMin: fmtPace(z.min), paceMax: fmtPace(z.max) };
  }
  return null;
}

function estimate(blocos, zones) {
  if (!blocos || !zones) return { dist: 0, min: 0, max: 0, minTxt: '0:00', maxTxt: '0:00' };
  let totalDist = 0;
  let totalMin = 0;
  let totalMax = 0;

  blocos.forEach(block => {
    const est = blockEstimate(block, zones);
    if (est) {
      totalDist += est.km;
      totalMin += est.min;
      totalMax += est.max;
    }
  });

  return {
    dist: totalDist.toFixed(1),
    min: totalMin,
    max: totalMax,
    minTxt: hms(totalMin),
    maxTxt: hms(totalMax)
  };
}

// Workout quick add parsing
function parseWorkout(text, zones) {
  if (!text || !zones) return null;

  const parsed = {
    tipo: null,
    fase: 'Base',
    blocos: [],
    dist: 0,
    minTxt: '0:00',
    maxTxt: '0:00',
    resumo: ''
  };

  // Extract phase
  if (/base/i.test(text)) parsed.fase = 'Base';
  if (/especifico|específico/i.test(text)) parsed.fase = 'Específico';
  if (/polimento/i.test(text)) parsed.fase = 'Polimento';

  // Extract type
  const typeMap = {
    'leve|regenerativo|reg': 'leve',
    'fartlek': 'fartlek',
    'progressivo|prog': 'progressivo',
    'intervalado|int|tiros': 'intervalado',
    'repeticoes|repetições|rep': 'repeticoes',
    'bloco|blocos': 'bloco',
    'longao|longão|long': 'longao',
    'ritmado|ritmo': 'ritmado',
    'trt': 'trt'
  };

  for (const [pattern, type] of Object.entries(typeMap)) {
    if (new RegExp(pattern, 'i').test(text)) {
      parsed.tipo = type;
      break;
    }
  }

  // Extract repetitions: 6x800
  const repMatch = text.match(/(\d+)\s*x\s*(\d+(?:[.,]\d+)?)\s*(km|k|m|min)?/g);
  if (repMatch) {
    repMatch.forEach(rep => {
      const m = rep.match(/(\d+)\s*x\s*(\d+(?:[.,]\d+)?)\s*(km|k|m|min)?/);
      if (m) {
        const reps = parseInt(m[1]);
        let dist = parseFloat(m[2].replace(',', '.'));
        const unit = m[3];

        if (!unit || unit === 'm') dist = dist / 1000;
        if (unit === 'min') dist = (dist * 0.167);

        parsed.blocos.push({
          repeticoes: reps,
          distancia: dist,
          zona: 'Z4'
        });
      }
    });
  }

  // Extract single distance: 8k
  if (!repMatch) {
    const distMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(km|k)\b/);
    if (distMatch) {
      let dist = parseFloat(distMatch[1].replace(',', '.'));
      parsed.blocos.push({
        repeticoes: 1,
        distancia: dist,
        zona: 'Z2'
      });
    }
  }

  // Extract duration: 40min
  if (!parsed.blocos.length) {
    const durationMatch = text.match(/(\d+)\s*min\b/);
    if (durationMatch) {
      const mins = parseInt(durationMatch[1]);
      parsed.blocos.push({
        repeticoes: 1,
        distancia: 0,
        duracao: mins,
        zona: 'Z1'
      });
    }
  }

  // Extract zone
  const zoneMatch = text.match(/\bz([1-5])\b/i);
  if (zoneMatch && parsed.blocos.length > 0) {
    parsed.blocos.forEach(b => b.zona = 'Z' + zoneMatch[1]);
  }

  // Extract interval
  const intMatch = text.match(/int(?:ervalo)?\s*([0-9]+\s*(?:min|s|')?(?:\s*\w+)?)/);
  if (intMatch && parsed.blocos.length > 0) {
    parsed.blocos[0].intervalo = intMatch[1].trim();
  }

  // Infer type if not found
  if (!parsed.tipo) {
    const repCount = parsed.blocos.filter(b => b.repeticoes > 1).length;
    if (repCount > 0 && parsed.blocos[0]?.repeticoes >= 8) {
      parsed.tipo = 'repeticoes';
    } else if (parsed.blocos.length === 1) {
      const zone = parsed.blocos[0].zona || 'Z2';
      const zoneTypeMap = { Z1: 'leve', Z2: 'longao', Z3: 'progressivo', Z4: 'ritmado', Z5: 'intervalado' };
      parsed.tipo = zoneTypeMap[zone];
    } else {
      parsed.tipo = 'intervalado';
    }
  }

  // Estimate
  if (parsed.blocos.length > 0) {
    const est = estimate(parsed.blocos, zones);
    parsed.dist = est.dist;
    parsed.minTxt = est.minTxt;
    parsed.maxTxt = est.maxTxt;

    parsed.resumo = parsed.blocos.map(b => {
      if (b.distancia > 0) {
        return `${b.repeticoes}x${(b.distancia * 1000).toFixed(0)}m ${b.zona}`;
      } else if (b.duracao > 0) {
        return `${b.duracao}min ${b.zona}`;
      }
      return '';
    }).filter(Boolean).join(' + ');
  }

  return parsed.blocos.length > 0 ? parsed : null;
}

Object.assign(window, {
  zoneTable,
  fmtPace,
  fmtSpeed,
  hms,
  estimate,
  blockEstimate,
  parseWorkout
});
