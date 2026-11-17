// =========================================================================
// Geometrías 3D de los glifos del núcleo holográfico.
//
// Convención: coordenadas con el eje Y hacia ARRIBA (como en un plano
// cartesiano). El renderizador invierte Y al proyectar al canvas.
//
// Cada figura se construye como un sólido biselado: el contorno real (arista
// afilada, z = 0) más una cara frontal y una trasera ligeramente hundidas
// (z = ±profundidad), unidas por aristas. Así la figura conserva su silueta y
// se lee como un objeto con volumen al girar.
// =========================================================================

export type WireframeShapeId = 'shuriken' | 'compass' | 'assassin' | 'om';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/** 0 = estructura (silueta y cara trasera) · 1 = acento (cara frontal) · 2 = arista de profundidad */
export type EdgeKind = 0 | 1 | 2;

export interface GeometryData {
  id: WireframeShapeId;
  name: string;
  kanji: string;
  vertices: Point3D[];
  edges: [number, number][];
  edgeKinds: EdgeKind[];
  tipIndices: Set<number>;
  apexIndices: Set<number>;
  rotationMode: 'spinZ' | 'upright';
}

interface P2 {
  x: number;
  y: number;
}

// -------------------------------------------------------------------------
// Utilidades 2D
// -------------------------------------------------------------------------

const norm = (p: P2): P2 => {
  const l = Math.hypot(p.x, p.y) || 1;
  return { x: p.x / l, y: p.y / l };
};

const signedArea = (poly: P2[]): number => {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p.x * q.y - q.x * p.y;
  }
  return a / 2;
};

/** Desplaza un polígono cerrado hacia su interior (d > 0) o exterior (d < 0) con inglete limitado. */
function offsetPolygon(poly: P2[], d: number): P2[] {
  const ccw = signedArea(poly) > 0;
  const n = poly.length;
  return poly.map((cur, i) => {
    const prev = poly[(i - 1 + n) % n];
    const next = poly[(i + 1) % n];
    const e1 = norm({ x: cur.x - prev.x, y: cur.y - prev.y });
    const e2 = norm({ x: next.x - cur.x, y: next.y - cur.y });
    const n1 = ccw ? { x: -e1.y, y: e1.x } : { x: e1.y, y: -e1.x };
    const n2 = ccw ? { x: -e2.y, y: e2.x } : { x: e2.y, y: -e2.x };
    let m = { x: n1.x + n2.x, y: n1.y + n2.y };
    if (Math.hypot(m.x, m.y) < 1e-3) m = n1;
    m = norm(m);
    const cos = Math.max(0.4, m.x * n1.x + m.y * n1.y);
    const len = Math.min(Math.abs(d) * 2.2, Math.abs(d) / cos) * Math.sign(d);
    return { x: cur.x + m.x * len, y: cur.y + m.y * len };
  });
}

/** Curva Catmull-Rom que pasa por todos los puntos de control. */
function spline(ctrl: P2[], sub = 4): P2[] {
  const out: P2[] = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[Math.max(0, i - 1)];
    const p1 = ctrl[i];
    const p2 = ctrl[i + 1];
    const p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
    for (let t = 0; t < sub; t++) {
      const u = t / sub;
      const u2 = u * u;
      const u3 = u2 * u;
      const f = (a: number, b: number, c: number, e: number) =>
        0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - e) * u2 + (-a + 3 * b - 3 * c + e) * u3);
      out.push({ x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) });
    }
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}

/** Convierte un trazo (línea central) en el contorno cerrado de una pincelada con extremos afilados. */
function strokeOutline(path: P2[], width: number, taper = 0.3): P2[] {
  const n = path.length;
  const left: P2[] = [];
  const right: P2[] = [];
  for (let i = 0; i < n; i++) {
    const a = path[Math.max(0, i - 1)];
    const b = path[Math.min(n - 1, i + 1)];
    const t = norm({ x: b.x - a.x, y: b.y - a.y });
    const nrm = { x: -t.y, y: t.x };
    // Grosor de pincel: fino en las puntas, pleno en el centro
    const s = i / (n - 1);
    const k = taper + (1 - taper) * Math.pow(Math.sin(Math.PI * s), 0.5);
    const w = (width / 2) * k;
    left.push({ x: path[i].x + nrm.x * w, y: path[i].y + nrm.y * w });
    right.push({ x: path[i].x - nrm.x * w, y: path[i].y - nrm.y * w });
  }
  return [...left, ...right.reverse()];
}

const circle = (cx: number, cy: number, r: number, segs: number, start = 0): P2[] =>
  Array.from({ length: segs }, (_, i) => {
    const a = start + (i / segs) * Math.PI * 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });

// -------------------------------------------------------------------------
// Constructor de sólidos
// -------------------------------------------------------------------------

class Builder {
  vertices: Point3D[] = [];
  edges: [number, number][] = [];
  edgeKinds: EdgeKind[] = [];
  tipIndices = new Set<number>();
  apexIndices = new Set<number>();

  edge(a: number, b: number, kind: EdgeKind = 0) {
    this.edges.push([a, b]);
    this.edgeKinds.push(kind);
  }

  loop(start: number, count: number, kind: EdgeKind) {
    for (let i = 0; i < count; i++) this.edge(start + i, start + ((i + 1) % count), kind);
  }

  /**
   * Sólido biselado a partir de un contorno cerrado.
   * Devuelve los índices de inicio de: silueta (z0), cara frontal y cara trasera.
   */
  bevel(
    outline: P2[],
    opts: { inset: number; depth: number; z0?: number; strutEvery?: number; strutAt?: number[] }
  ) {
    const { inset, depth, z0 = 0, strutEvery = 1, strutAt } = opts;
    const face = offsetPolygon(outline, inset);
    const n = outline.length;

    const rim = this.vertices.length;
    outline.forEach((p) => this.vertices.push({ x: p.x, y: p.y, z: z0 }));
    const front = this.vertices.length;
    face.forEach((p) => this.vertices.push({ x: p.x, y: p.y, z: z0 + depth }));
    const back = this.vertices.length;
    face.forEach((p) => this.vertices.push({ x: p.x, y: p.y, z: z0 - depth }));

    // Orden pensado para el trazado animado: primero la silueta, luego las caras
    this.loop(rim, n, 0);
    this.loop(front, n, 1);
    this.loop(back, n, 0);
    const marcas = strutAt ? new Set(strutAt) : null;
    for (let i = 0; i < n; i++) {
      if (marcas ? marcas.has(i) : i % strutEvery === 0) {
        this.edge(rim + i, front + i, 2);
        this.edge(rim + i, back + i, 2);
      }
    }
    return { rim, front, back, n };
  }

  build(id: WireframeShapeId, name: string, kanji: string, rotationMode: GeometryData['rotationMode']): GeometryData {
    return {
      id,
      name,
      kanji,
      vertices: this.vertices,
      edges: this.edges,
      edgeKinds: this.edgeKinds,
      tipIndices: this.tipIndices,
      apexIndices: this.apexIndices,
      rotationMode,
    };
  }
}

// =========================================================================
// 1. SHURIKEN — estrella de cuatro puntas con filos biselados y ojo central
// =========================================================================
function createShurikenGeometry(): GeometryData {
  const b = new Builder();
  const deg = Math.PI / 180;
  const outline: P2[] = [];
  const tipPos: number[] = [];

  for (let k = 0; k < 4; k++) {
    const a = k * 90 * deg + 90 * deg; // primera punta hacia arriba
    const at = (ang: number, r: number) => ({ x: Math.cos(a + ang * deg) * r, y: Math.sin(a + ang * deg) * r });
    tipPos.push(outline.length);
    outline.push(at(0, 78)); // punta
    // Filo de ataque cóncavo (ligero giro de molinete) hasta el valle
    outline.push(at(10, 44));
    outline.push(at(24, 30));
    outline.push(at(45, 21)); // valle entre puntas
    outline.push(at(68, 31));
    outline.push(at(81, 46));
  }

  const body = b.bevel(outline, { inset: 7, depth: 7, strutAt: [...tipPos, ...tipPos.map((t) => t + 3)] });
  tipPos.forEach((t) => b.tipIndices.add(body.rim + t));

  // Lomo de cada hoja: del ojo a la punta por ambas caras (da la sección de diamante)
  const eye = circle(0, 0, 9, 8, Math.PI / 2);
  const hole = b.bevel(eye, { inset: -2.5, depth: 5, strutEvery: 2 });
  for (let k = 0; k < 4; k++) {
    b.edge(hole.front + k * 2, body.front + tipPos[k], 1);
    b.edge(hole.back + k * 2, body.back + tipPos[k], 0);
  }
  for (let i = 0; i < eye.length; i++) b.apexIndices.add(hole.front + i);

  return b.build('shuriken', '3D CYBER-SHURIKEN', '忍', 'spinZ');
}

// =========================================================================
// 2. ESCUADRA Y COMPÁS — compás con cabeza arriba, escuadra con vértice abajo
// =========================================================================
function createCompassGeometry(): GeometryData {
  const b = new Builder();
  const s2 = Math.SQRT1_2;

  // Escuadra: «L» con el ángulo recto hacia abajo y los brazos a 45°
  const C = { x: 0, y: -74 };
  const L = 100;
  const W = 12;
  const tipR = { x: C.x + s2 * L, y: C.y + s2 * L };
  const tipL = { x: C.x - s2 * L, y: C.y + s2 * L };
  const square: P2[] = [
    C,
    tipR,
    { x: tipR.x - s2 * W, y: tipR.y + s2 * W },
    { x: 0, y: C.y + W * Math.SQRT2 },
    { x: tipL.x + s2 * W, y: tipL.y + s2 * W },
    tipL,
  ];
  const sq = b.bevel(square, { inset: 3, depth: 4 });
  b.tipIndices.add(sq.rim + 0);
  b.tipIndices.add(sq.rim + 1);
  b.tipIndices.add(sq.rim + 5);

  // Graduaciones grabadas en la cara frontal de la escuadra
  for (const dir of [1, -1]) {
    for (let k = 1; k <= 6; k++) {
      const d = 12 + k * 12;
      const p = { x: C.x + dir * s2 * d, y: C.y + s2 * d };
      const inward = { x: -dir * s2, y: s2 };
      const len = k % 3 === 0 ? 6 : 3.5;
      const i0 = b.vertices.length;
      b.vertices.push({ x: p.x + inward.x * 2.5, y: p.y + inward.y * 2.5, z: 4 });
      b.vertices.push({ x: p.x + inward.x * (2.5 + len), y: p.y + inward.y * (2.5 + len), z: 4 });
      b.edge(i0, i0 + 1, 1);
    }
  }

  // Compás: por delante de la escuadra (z = 9) para que el cruce se lea en 3D
  const zc = 9;
  const H = { x: 0, y: 62 };
  const head = b.bevel(circle(H.x, H.y, 10, 12, Math.PI / 2), { inset: 3, depth: 3, z0: zc, strutEvery: 3 });
  b.apexIndices.add(head.front);
  b.apexIndices.add(head.rim);
  // Perno de la bisagra
  const pin = b.vertices.length;
  b.vertices.push({ x: H.x, y: H.y, z: zc + 6 }, { x: H.x, y: H.y, z: zc - 6 });
  b.edge(pin, pin + 1, 2);
  b.apexIndices.add(pin);

  for (const dir of [-1, 1]) {
    const T = { x: dir * 56, y: -40 }; // puntas sobresalen de los brazos de la escuadra
    const d = norm({ x: T.x - H.x, y: T.y - H.y });
    const n = { x: -d.y, y: d.x };
    const len = Math.hypot(T.x - H.x, T.y - H.y);
    const at = (t: number, w: number) => ({ x: H.x + d.x * len * t + n.x * w, y: H.y + d.y * len * t + n.y * w });
    const leg: P2[] = [at(0.06, 6.5), at(0.78, 4.2), T, at(0.78, -4.2), at(0.06, -6.5)];
    const legSolid = b.bevel(leg, { inset: 2, depth: 3, z0: zc });
    b.tipIndices.add(legSolid.rim + 2);
  }

  return b.build('compass', 'ESCUADRA & COMPÁS', '規', 'upright');
}

// =========================================================================
// 3. INSIGNIA DEL CREDO — «A» encapuchada con arco hueco y hojas inferiores
// =========================================================================
function createAssassinGeometry(): GeometryData {
  const b = new Builder();

  // Mitad derecha, de la punta superior al ápice del arco interior (Y hacia arriba)
  const outerR = spline(
    [
      { x: 0, y: 84 },
      { x: 16, y: 70 },
      { x: 30, y: 56 },
      { x: 42, y: 44 }, // hombro ancho
    ],
    2
  );
  const notchR = [{ x: 31, y: 34 }]; // muesca lateral (pico hacia dentro)
  const flankR = spline(
    [
      { x: 44, y: 28 },
      { x: 58, y: 10 },
      { x: 67, y: -14 },
      { x: 70, y: -38 },
      { x: 64, y: -58 },
      { x: 52, y: -76 }, // punta de la hoja
    ],
    3
  );
  const archR = spline(
    [
      { x: 44, y: -64 },
      { x: 40, y: -44 },
      { x: 31, y: -20 },
      { x: 18, y: 2 },
      { x: 0, y: 20 }, // ápice del arco (hueco de la capucha)
    ],
    3
  );

  const right = [...outerR, ...notchR, ...flankR, ...archR];
  // Contorno completo: derecha de arriba al arco, luego la izquierda en espejo de regreso
  const leftMirror = right
    .slice(1, -1)
    .reverse()
    .map((p) => ({ x: -p.x, y: p.y }));
  const outline = [...right, ...leftMirror];

  const idxOf = (p: P2) => outline.findIndex((q) => Math.abs(q.x - p.x) < 0.01 && Math.abs(q.y - p.y) < 0.01);
  const top = 0;
  const archApex = right.length - 1;
  const tipRight = idxOf({ x: 52, y: -76 });
  const tipLeft = idxOf({ x: -52, y: -76 });
  const shoulderR = idxOf({ x: 42, y: 44 });
  const shoulderL = idxOf({ x: -42, y: 44 });
  const notchRi = idxOf(notchR[0]);
  const notchLi = idxOf({ x: -31, y: 34 });

  const solid = b.bevel(outline, {
    inset: 6,
    depth: 8,
    strutAt: [top, archApex, tipRight, tipLeft, shoulderR, shoulderL, notchRi, notchLi].filter((i) => i >= 0),
  });

  // Lomo central frontal y trasero: de la punta al ápice del arco
  const ridge = b.vertices.length;
  b.vertices.push({ x: 0, y: 54, z: 14 }, { x: 0, y: 54, z: -14 });
  b.edge(solid.front + top, ridge, 1);
  b.edge(ridge, solid.front + archApex, 1);
  b.edge(solid.back + top, ridge + 1, 0);
  b.edge(ridge + 1, solid.back + archApex, 0);
  if (shoulderR >= 0) b.edge(ridge, solid.front + shoulderR, 1);
  if (shoulderL >= 0) b.edge(ridge, solid.front + shoulderL, 1);

  b.apexIndices.add(solid.rim + top);
  b.apexIndices.add(solid.rim + archApex);
  b.apexIndices.add(ridge);
  if (tipRight >= 0) b.tipIndices.add(solid.rim + tipRight);
  if (tipLeft >= 0) b.tipIndices.add(solid.rim + tipLeft);

  return b.build('assassin', 'CREDO DE ASESINOS', '影', 'upright');
}

// =========================================================================
// 4. ॐ (OM) — trazo caligráfico devanagari con chandra y bindu
// =========================================================================
function createOmGeometry(): GeometryData {
  const b = new Builder();
  const depth = 3.5;
  const inset = 1.6;

  const pincelada = (ctrl: P2[], width: number, sub = 5) => {
    const outline = strokeOutline(spline(ctrl, sub), width);
    const s = b.bevel(outline, { inset, depth, strutEvery: 6 });
    b.tipIndices.add(s.rim);
    b.tipIndices.add(s.rim + Math.floor(s.n / 2) - 1);
    return s;
  };

  // Cuerpo en forma de «3»: arco superior pequeño…
  pincelada(
    [
      { x: -46, y: 34 },
      { x: -34, y: 46 },
      { x: -16, y: 48 },
      { x: -4, y: 38 },
      { x: -8, y: 24 },
      { x: -24, y: 16 },
    ],
    10
  );
  // …y arco inferior amplio que regresa con un pequeño gancho
  pincelada(
    [
      { x: -24, y: 16 },
      { x: -2, y: 10 },
      { x: 10, y: -8 },
      { x: 6, y: -32 },
      { x: -14, y: -48 },
      { x: -36, y: -46 },
      { x: -50, y: -32 },
      { x: -46, y: -20 },
    ],
    12
  );
  // Cola: nace en la cintura del «3», sube a la derecha y se enrosca hacia abajo
  pincelada(
    [
      { x: -2, y: 14 },
      { x: 16, y: 24 },
      { x: 36, y: 22 },
      { x: 50, y: 6 },
      { x: 50, y: -18 },
      { x: 40, y: -32 },
      { x: 28, y: -28 },
    ],
    10
  );
  // Chandra: media luna abierta hacia arriba
  const moon = b.vertices.length;
  pincelada(
    [
      { x: 8, y: 52 },
      { x: 18, y: 42 },
      { x: 32, y: 39 },
      { x: 46, y: 44 },
      { x: 54, y: 54 },
    ],
    7,
    4
  );
  b.apexIndices.add(moon);

  // Bindu: esfera de alambre (tres círculos ortogonales)
  const c = { x: 31, y: 66 };
  const r = 6.5;
  const seg = 10;
  const start = b.vertices.length;
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    b.vertices.push({ x: c.x + Math.cos(a) * r, y: c.y + Math.sin(a) * r, z: 0 });
  }
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    b.vertices.push({ x: c.x, y: c.y + Math.sin(a) * r, z: Math.cos(a) * r });
  }
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    b.vertices.push({ x: c.x + Math.cos(a) * r, y: c.y, z: Math.sin(a) * r });
  }
  b.loop(start, seg, 1);
  b.loop(start + seg, seg, 0);
  b.loop(start + seg * 2, seg, 2);
  b.apexIndices.add(start + Math.round(seg / 4)); // polo superior

  return b.build('om', 'GLIFO SAGRADO // ॐ', '魂', 'upright');
}

export const GEOMETRIES: Record<WireframeShapeId, () => GeometryData> = {
  shuriken: createShurikenGeometry,
  compass: createCompassGeometry,
  assassin: createAssassinGeometry,
  om: createOmGeometry,
};

export const SHAPE_ORDER: WireframeShapeId[] = ['shuriken', 'compass', 'assassin', 'om'];
