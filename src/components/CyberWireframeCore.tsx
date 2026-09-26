import React, { useEffect, useRef, useState } from 'react';
import { cyberAudio } from '../utils/cyberAudio';
import gsap from 'gsap';

export type WireframeShapeId = 'shuriken' | 'compass' | 'assassin' | 'om';

interface WireframeCoreProps {
  accentColor?: 'cyan' | 'amber' | 'crimson';
  onCoreClick?: () => void;
  syncPercent?: number;
  size?: number;
  label?: string;
  isSpinningFast?: boolean;
  theme?: 'light' | 'dark';
  initialShape?: WireframeShapeId;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface GeometryData {
  id: WireframeShapeId;
  name: string;
  kanji: string;
  vertices: Point3D[];
  edges: [number, number][];
  tipIndices: Set<number>;
  apexIndices: Set<number>;
}

// =========================================================================
// 1. SHURIKEN GEOMETRY (4-POINT BEVELED NINJA STAR)
// =========================================================================
function createShurikenGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  const numPoints = 4;
  const rTip = 72;
  const rValley = 24;
  const rHole = 12;
  const bevelZ = 14;

  // 0..7: Perimeter vertices
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? rTip : rValley;
    if (i % 2 === 0) tipIndices.add(i);
    vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, z: 0 });
  }
  for (let i = 0; i < 8; i++) {
    edges.push([i, (i + 1) % 8]);
  }

  // 8: Top Apex, 9: Bottom Apex
  apexIndices.add(8);
  apexIndices.add(9);
  vertices.push({ x: 0, y: 0, z: bevelZ });
  vertices.push({ x: 0, y: 0, z: -bevelZ });

  for (let i = 0; i < 8; i++) {
    edges.push([8, i]);
    edges.push([9, i]);
  }

  // 10..17: Top hole ring, 18..25: Bottom hole ring
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    vertices.push({ x: Math.cos(angle) * rHole, y: Math.sin(angle) * rHole, z: 4 });
  }
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    vertices.push({ x: Math.cos(angle) * rHole, y: Math.sin(angle) * rHole, z: -4 });
  }
  for (let i = 0; i < 8; i++) {
    edges.push([10 + i, 10 + ((i + 1) % 8)]);
    edges.push([18 + i, 18 + ((i + 1) % 8)]);
    edges.push([10 + i, 18 + i]);
  }

  return { id: 'shuriken', name: '3D CYBER-SHURIKEN', kanji: '忍', vertices, edges, tipIndices, apexIndices };
}

// =========================================================================
// 2. ESCUADRA & COMPÁS GEOMETRY (SACRED GEOMETRY BUILDER)
// =========================================================================
function createCompassGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  // Compás: Hinge joint top at (0, 48)
  const hingeIndex = vertices.length;
  apexIndices.add(hingeIndex);
  apexIndices.add(hingeIndex + 1);
  vertices.push({ x: 0, y: 48, z: 7 });
  vertices.push({ x: 0, y: 48, z: -7 });
  edges.push([hingeIndex, hingeIndex + 1]);

  // Hinge circular ring (6 points)
  const ringStart = vertices.length;
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    vertices.push({ x: Math.cos(a) * 8, y: 48 + Math.sin(a) * 8, z: 0 });
  }
  for (let i = 0; i < 6; i++) {
    edges.push([ringStart + i, ringStart + ((i + 1) % 6)]);
    edges.push([hingeIndex, ringStart + i]);
    edges.push([hingeIndex + 1, ringStart + i]);
  }

  // Compás Left Leg -> (-48, -52), Right Leg -> (48, -52)
  const leftLegStart = vertices.length;
  tipIndices.add(leftLegStart);
  tipIndices.add(leftLegStart + 1);
  vertices.push({ x: -48, y: -52, z: 2 });
  vertices.push({ x: -48, y: -52, z: -2 });
  vertices.push({ x: -38, y: -48, z: 4 });
  vertices.push({ x: -38, y: -48, z: -4 });

  edges.push([hingeIndex, leftLegStart + 2]);
  edges.push([hingeIndex + 1, leftLegStart + 3]);
  edges.push([leftLegStart + 2, leftLegStart]);
  edges.push([leftLegStart + 3, leftLegStart + 1]);
  edges.push([leftLegStart, leftLegStart + 1]);

  const rightLegStart = vertices.length;
  tipIndices.add(rightLegStart);
  tipIndices.add(rightLegStart + 1);
  vertices.push({ x: 48, y: -52, z: 2 });
  vertices.push({ x: 48, y: -52, z: -2 });
  vertices.push({ x: 38, y: -48, z: 4 });
  vertices.push({ x: 38, y: -48, z: -4 });

  edges.push([hingeIndex, rightLegStart + 2]);
  edges.push([hingeIndex + 1, rightLegStart + 3]);
  edges.push([rightLegStart + 2, rightLegStart]);
  edges.push([rightLegStart + 3, rightLegStart + 1]);
  edges.push([rightLegStart, rightLegStart + 1]);

  // Measuring Sector Arc between the two legs at y = -14
  const arcStart = vertices.length;
  const arcPts = [
    { x: -28, y: -8 },
    { x: -16, y: -16 },
    { x: 0, y: -19 },
    { x: 16, y: -16 },
    { x: 28, y: -8 }
  ];
  arcPts.forEach((pt) => {
    vertices.push({ x: pt.x, y: pt.y, z: 2 });
    vertices.push({ x: pt.x, y: pt.y, z: -2 });
  });
  for (let i = 0; i < arcPts.length - 1; i++) {
    const idx = arcStart + i * 2;
    edges.push([idx, idx + 2]);
    edges.push([idx + 1, idx + 3]);
    edges.push([idx, idx + 1]);
  }

  // Escuadra (Square) 90 degree elbow at bottom-center (0, -42)
  const sqStart = vertices.length;
  tipIndices.add(sqStart + 4);
  tipIndices.add(sqStart + 5);
  // Outer corner
  vertices.push({ x: 0, y: -44, z: 5 });
  vertices.push({ x: 0, y: -44, z: -5 });
  // Inner corner
  vertices.push({ x: 0, y: -26, z: 5 });
  vertices.push({ x: 0, y: -26, z: -5 });
  // Left arm outer / inner
  vertices.push({ x: -55, y: 12, z: 5 });
  vertices.push({ x: -55, y: 12, z: -5 });
  vertices.push({ x: -40, y: 2, z: 5 });
  vertices.push({ x: -40, y: 2, z: -5 });
  // Right arm outer / inner
  vertices.push({ x: 55, y: 12, z: 5 });
  vertices.push({ x: 55, y: 12, z: -5 });
  vertices.push({ x: 40, y: 2, z: 5 });
  vertices.push({ x: 40, y: 2, z: -5 });

  // Connect arms & depth
  edges.push([sqStart, sqStart + 4]);
  edges.push([sqStart + 1, sqStart + 5]);
  edges.push([sqStart + 2, sqStart + 6]);
  edges.push([sqStart + 3, sqStart + 7]);
  edges.push([sqStart + 4, sqStart + 6]);
  edges.push([sqStart + 5, sqStart + 7]);

  edges.push([sqStart, sqStart + 8]);
  edges.push([sqStart + 1, sqStart + 9]);
  edges.push([sqStart + 2, sqStart + 10]);
  edges.push([sqStart + 3, sqStart + 11]);
  edges.push([sqStart + 8, sqStart + 10]);
  edges.push([sqStart + 9, sqStart + 11]);

  edges.push([sqStart, sqStart + 1]);
  edges.push([sqStart + 2, sqStart + 3]);
  edges.push([sqStart + 4, sqStart + 5]);
  edges.push([sqStart + 8, sqStart + 9]);

  return { id: 'compass', name: 'ESCUADRA & COMPÁS', kanji: '規', vertices, edges, tipIndices, apexIndices };
}

// =========================================================================
// 3. ASSASSIN'S CREED EMBLEM GEOMETRY (THE CREED INSIGNIA)
// =========================================================================
function createAssassinGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  // Front spine vertices (Z = 12)
  const spineTop = vertices.length;
  apexIndices.add(spineTop);
  vertices.push({ x: 0, y: 70, z: 12 });
  vertices.push({ x: 0, y: 24, z: 14 });
  vertices.push({ x: 0, y: 5, z: 10 });
  vertices.push({ x: 0, y: -22, z: 8 });

  // Back spine vertices (Z = -12)
  const backSpineTop = vertices.length;
  apexIndices.add(backSpineTop);
  vertices.push({ x: 0, y: 70, z: -12 });
  vertices.push({ x: 0, y: 24, z: -14 });
  vertices.push({ x: 0, y: 5, z: -10 });
  vertices.push({ x: 0, y: -22, z: -8 });

  edges.push([spineTop, spineTop + 1], [spineTop + 1, spineTop + 2], [spineTop + 2, spineTop + 3]);
  edges.push([backSpineTop, backSpineTop + 1], [backSpineTop + 1, backSpineTop + 2], [backSpineTop + 2, backSpineTop + 3]);
  edges.push([spineTop, backSpineTop], [spineTop + 3, backSpineTop + 3]);

  // Outer perimeter (Z = 0)
  const perimStart = vertices.length;
  const perim = [
    { x: 0, y: 72 },       // 0: top peak
    { x: 36, y: 28 },      // 1: right upper shoulder
    { x: 28, y: 14 },      // 2: right inner waist
    { x: 54, y: -24 },     // 3: right flare hip
    { x: 42, y: -68 },     // 4: right bottom tip
    { x: 22, y: -38 },     // 5: right inner arch
    { x: 0, y: -22 },      // 6: bottom inner apex
    { x: -22, y: -38 },    // 7: left inner arch
    { x: -42, y: -68 },    // 8: left bottom tip
    { x: -54, y: -24 },    // 9: left flare hip
    { x: -28, y: 14 },     // 10: left inner waist
    { x: -36, y: 28 }      // 11: left upper shoulder
  ];

  tipIndices.add(perimStart);
  tipIndices.add(perimStart + 4);
  tipIndices.add(perimStart + 8);

  perim.forEach((p) => vertices.push({ x: p.x, y: p.y, z: 0 }));

  // Perimeter loop
  for (let i = 0; i < 12; i++) {
    edges.push([perimStart + i, perimStart + ((i + 1) % 12)]);
  }

  // Connect Front spine to perimeter
  edges.push([spineTop, perimStart]);
  edges.push([spineTop, perimStart + 1]);
  edges.push([spineTop, perimStart + 11]);
  edges.push([spineTop + 1, perimStart + 2]);
  edges.push([spineTop + 1, perimStart + 10]);
  edges.push([spineTop + 2, perimStart + 3]);
  edges.push([spineTop + 2, perimStart + 9]);
  edges.push([spineTop + 3, perimStart + 4]);
  edges.push([spineTop + 3, perimStart + 8]);
  edges.push([spineTop + 3, perimStart + 6]);

  // Connect Back spine to perimeter
  edges.push([backSpineTop, perimStart]);
  edges.push([backSpineTop, perimStart + 1]);
  edges.push([backSpineTop, perimStart + 11]);
  edges.push([backSpineTop + 1, perimStart + 2]);
  edges.push([backSpineTop + 1, perimStart + 10]);
  edges.push([backSpineTop + 2, perimStart + 3]);
  edges.push([backSpineTop + 2, perimStart + 9]);
  edges.push([backSpineTop + 3, perimStart + 4]);
  edges.push([backSpineTop + 3, perimStart + 8]);
  edges.push([backSpineTop + 3, perimStart + 6]);

  // Inner Cutout Chevron ring
  const cutStart = vertices.length;
  vertices.push({ x: 0, y: 16, z: 3 });
  vertices.push({ x: 18, y: -6, z: 3 });
  vertices.push({ x: 0, y: -12, z: 3 });
  vertices.push({ x: -18, y: -6, z: 3 });
  vertices.push({ x: 0, y: 16, z: -3 });
  vertices.push({ x: 18, y: -6, z: -3 });
  vertices.push({ x: 0, y: -12, z: -3 });
  vertices.push({ x: -18, y: -6, z: -3 });

  for (let i = 0; i < 4; i++) {
    edges.push([cutStart + i, cutStart + ((i + 1) % 4)]);
    edges.push([cutStart + 4 + i, cutStart + 4 + ((i + 1) % 4)]);
    edges.push([cutStart + i, cutStart + 4 + i]);
  }

  return { id: 'assassin', name: 'CREDO DE ASESINOS', kanji: '影', vertices, edges, tipIndices, apexIndices };
}

// =========================================================================
// 4. SACRED HINDU GLYPH OM (ॐ) 3D WIREFRAME
// =========================================================================
function createOmGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  // Helper to add extruded 3D curve with front (z=5) and back (z=-5) rails
  const addExtrudedCurve = (pts: { x: number; y: number }[], isClosed = false) => {
    const startIdx = vertices.length;
    const len = pts.length;
    pts.forEach((p) => {
      vertices.push({ x: p.x, y: p.y, z: 5 });
      vertices.push({ x: p.x, y: p.y, z: -5 });
    });
    for (let i = 0; i < len - 1; i++) {
      const a = startIdx + i * 2;
      const b = startIdx + (i + 1) * 2;
      edges.push([a, b]);         // Front rail
      edges.push([a + 1, b + 1]); // Back rail
      edges.push([a, a + 1]);     // Depth strut
    }
    edges.push([startIdx + (len - 1) * 2, startIdx + (len - 1) * 2 + 1]);
    if (isClosed) {
      const last = startIdx + (len - 1) * 2;
      edges.push([last, startIdx]);
      edges.push([last + 1, startIdx + 1]);
    }
    return startIdx;
  };

  // 1. Upper Loop (The top arc of the '3')
  const upperLoop = [
    { x: -2, y: 16 },
    { x: -16, y: 28 },
    { x: -30, y: 44 },
    { x: -22, y: 58 },
    { x: -4, y: 54 },
    { x: -2, y: 38 },
    { x: -14, y: 22 }
  ];
  addExtrudedCurve(upperLoop);

  // 2. Lower Main Belly (The big sweeping lower curve)
  const lowerBelly = [
    { x: -14, y: 22 },
    { x: -34, y: 8 },
    { x: -46, y: -12 },
    { x: -40, y: -42 },
    { x: -18, y: -58 },
    { x: 8, y: -50 },
    { x: 18, y: -30 },
    { x: 12, y: -16 }
  ];
  const lowerStart = addExtrudedCurve(lowerBelly);
  tipIndices.add(lowerStart + (lowerBelly.length - 1) * 2);

  // 3. Right Sweeping Tail (Emerging from the waist junction)
  const tailCurve = [
    { x: -14, y: 22 },
    { x: 4, y: 16 },
    { x: 22, y: 18 },
    { x: 40, y: 28 },
    { x: 48, y: 46 },
    { x: 38, y: 58 },
    { x: 26, y: 54 }
  ];
  const tailStart = addExtrudedCurve(tailCurve);
  tipIndices.add(tailStart + (tailCurve.length - 1) * 2);

  // 4. Chandra (Crescent Moon at top right)
  const chandra = [
    { x: 12, y: 58 },
    { x: 24, y: 50 },
    { x: 36, y: 50 },
    { x: 46, y: 58 }
  ];
  addExtrudedCurve(chandra);

  // 5. Bindu (Sacred Floating Orb / Diamond above Chandra)
  const bCenter = { x: 29, y: 70 };
  const binduStart = vertices.length;
  apexIndices.add(binduStart);
  apexIndices.add(binduStart + 1);

  // 3D Octahedron Bindu
  vertices.push({ x: bCenter.x, y: bCenter.y, z: 8 });     // Top apex
  vertices.push({ x: bCenter.x, y: bCenter.y, z: -8 });    // Bottom apex
  vertices.push({ x: bCenter.x - 7, y: bCenter.y, z: 0 }); // Left
  vertices.push({ x: bCenter.x + 7, y: bCenter.y, z: 0 }); // Right
  vertices.push({ x: bCenter.x, y: bCenter.y + 7, z: 0 }); // Upper
  vertices.push({ x: bCenter.x, y: bCenter.y - 7, z: 0 }); // Lower

  // Connect bindu octahedron
  for (let i = 2; i <= 5; i++) {
    edges.push([binduStart, binduStart + i]);     // To top
    edges.push([binduStart + 1, binduStart + i]); // To bottom
  }
  edges.push([binduStart + 2, binduStart + 4]);
  edges.push([binduStart + 4, binduStart + 3]);
  edges.push([binduStart + 3, binduStart + 5]);
  edges.push([binduStart + 5, binduStart + 2]);

  return { id: 'om', name: 'GLIFO PRIMORDIAL // ॐ', kanji: '魂', vertices, edges, tipIndices, apexIndices };
}

const GEOMETRIES: Record<WireframeShapeId, () => GeometryData> = {
  shuriken: createShurikenGeometry,
  compass: createCompassGeometry,
  assassin: createAssassinGeometry,
  om: createOmGeometry,
};

const SHAPE_ORDER: WireframeShapeId[] = ['shuriken', 'compass', 'assassin', 'om'];

export const CyberWireframeCore: React.FC<WireframeCoreProps> = ({
  accentColor = 'crimson',
  onCoreClick,
  syncPercent = 100,
  size = 260,
  label,
  isSpinningFast = false,
  theme = 'dark',
  initialShape,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawProgressRef = useRef<{ value: number }>({ value: 1 });
  const angleZRef = useRef<number>(0);
  const [isRedrawing, setIsRedrawing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pick random shape initially if not specified
  const [activeShapeId, setActiveShapeId] = useState<WireframeShapeId>(() => {
    if (initialShape && SHAPE_ORDER.includes(initialShape)) {
      return initialShape;
    }
    const rand = Math.floor(Math.random() * SHAPE_ORDER.length);
    return SHAPE_ORDER[rand];
  });

  const geoDataRef = useRef<GeometryData>(GEOMETRIES[activeShapeId]());

  // Listen for terminal CLI event to change shape
  useEffect(() => {
    const handleGlyphEvent = (e: Event) => {
      const customEvent = e as CustomEvent<WireframeShapeId>;
      if (customEvent.detail && SHAPE_ORDER.includes(customEvent.detail)) {
        changeShape(customEvent.detail);
      }
    };
    window.addEventListener('hlm:set-glyph', handleGlyphEvent);
    return () => window.removeEventListener('hlm:set-glyph', handleGlyphEvent);
  }, []);

  const changeShape = (nextId: WireframeShapeId) => {
    setActiveShapeId(nextId);
    geoDataRef.current = GEOMETRIES[nextId]();
    startWireframeTrace();
  };

  const cycleNextShape = () => {
    const idx = SHAPE_ORDER.indexOf(activeShapeId);
    const nextIdx = (idx + 1) % SHAPE_ORDER.length;
    changeShape(SHAPE_ORDER[nextIdx]);
  };

  // Trigger smooth wireframe trace animation
  const startWireframeTrace = () => {
    setIsRedrawing(true);
    cyberAudio.playShurikenWhoosh();

    drawProgressRef.current.value = 0;
    gsap.to(drawProgressRef.current, {
      value: 1,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        setIsRedrawing(false);
      },
    });

    gsap.to(angleZRef, {
      current: angleZRef.current + Math.PI * 2,
      duration: 1.4,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    drawProgressRef.current.value = 0;
    gsap.to(drawProgressRef.current, {
      value: 1,
      duration: 1.6,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let angleX = 0.2;
    let angleY = 0;
    let targetAngleX = 0.2;
    let targetAngleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      // Enhanced tilt responsiveness when hovering
      const multiplier = isHovered ? 2.4 : 1.1;
      targetAngleY = (x / rect.width) * multiplier;
      targetAngleX = (-y / rect.height) * multiplier;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const lerp = isHovered ? 0.08 : 0.04;
      angleX += (targetAngleX - angleX) * lerp;
      angleY += (targetAngleY - angleY) * lerp + (isHovered ? 0.008 : 0.003);
      angleZRef.current += isSpinningFast ? 0.015 : (isHovered ? 0.007 : 0.0035);

      const angleZ = angleZRef.current;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      const { vertices, edges, tipIndices, apexIndices } = geoDataRef.current;

      // Project vertices to 2D
      const projected = vertices.map((v) => {
        // Rotate Z
        const xz = v.x * cosZ - v.y * sinZ;
        const yz = v.x * sinZ + v.y * cosZ;
        const zz = v.z;

        // Rotate Y
        const x1 = xz * cosY + zz * sinY;
        const z1 = -xz * sinY + zz * cosY;

        // Rotate X
        const y2 = yz * cosX - z1 * sinX;
        const z2 = yz * sinX + z1 * cosX;

        // Perspective projection
        const fov = 240;
        const pz = z2 + 220;
        const scale = fov / pz;
        const x2D = x1 * scale + size / 2;
        const y2D = y2 * scale + size / 2;

        return { x: x2D, y: y2D, z: z2, scale };
      });

      // Palette
      const isDark = theme === 'dark';
      let mainStroke = isDark ? 'rgba(0, 240, 255, 0.45)' : 'rgba(15, 23, 42, 0.65)';
      let apexStroke = isDark ? 'rgba(255, 0, 85, 0.75)' : 'rgba(220, 38, 38, 0.85)';
      let dotColor = isDark ? '#00f0ff' : '#0284c7';

      if (accentColor === 'crimson') {
        mainStroke = isDark ? 'rgba(255, 0, 85, 0.45)' : 'rgba(220, 38, 38, 0.65)';
        apexStroke = isDark ? 'rgba(0, 240, 255, 0.75)' : 'rgba(15, 23, 42, 0.85)';
        dotColor = isDark ? '#ff0055' : '#dc2626';
      } else if (accentColor === 'amber') {
        mainStroke = isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(217, 119, 6, 0.65)';
        apexStroke = isDark ? 'rgba(255, 0, 85, 0.75)' : 'rgba(220, 38, 38, 0.85)';
        dotColor = isDark ? '#fbbf24' : '#d97706';
      }

      const progress = drawProgressRef.current.value;
      const totalEdges = edges.length;
      const visibleEdgesCount = Math.floor(totalEdges * progress);

      // Render wireframe lines
      for (let i = 0; i < visibleEdgesCount; i++) {
        const [idxA, idxB] = edges[i];
        const pA = projected[idxA];
        const pB = projected[idxB];
        if (!pA || !pB) continue;

        const isApexLine = apexIndices.has(idxA) || apexIndices.has(idxB);

        ctx.strokeStyle = isApexLine ? apexStroke : mainStroke;
        ctx.lineWidth = isApexLine ? 1.4 : 1.1;

        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      }

      // Render vertices
      if (progress > 0.05) {
        const nodeAlpha = Math.min(1, progress * 1.5);
        projected.forEach((p, idx) => {
          const isApex = apexIndices.has(idx);
          const isTip = tipIndices.has(idx);

          ctx.fillStyle = isApex
            ? (isDark ? '#ffffff' : '#0f172a')
            : isTip
            ? (isDark ? '#ff0055' : '#dc2626')
            : dotColor;
          ctx.globalAlpha = nodeAlpha;
          const nodeSize = Math.max(1.5, p.scale * (isTip ? 2.5 : isApex ? 2.2 : 1.8));

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // Telemetry Ring
      ctx.strokeStyle = isDark ? 'rgba(255, 0, 85, 0.2)' : 'rgba(220, 38, 38, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 88, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [accentColor, size, isSpinningFast, theme, isHovered]);

  const handleClick = () => {
    cycleNextShape();
    if (onCoreClick) {
      onCoreClick();
    }
  };

  const currentGeo = geoDataRef.current;
  const displayLabel = label || currentGeo.name;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer group select-none ${
        theme === 'light'
          ? 'bg-white/95 border border-slate-300 hover:border-red-600 shadow-md hover:shadow-lg'
          : 'bg-cyber-void/85 border border-ninja-crimson/40 hover:border-ninja-crimson hover:box-glow-crimson'
      }`}
      title={`${currentGeo.name} // Clic: Cambiar y redibujar glifo 3D`}
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-ninja-crimson font-bold flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full bg-ninja-crimson ${isRedrawing ? 'animate-ping' : 'animate-pulse'}`}></span>
        <span>{currentGeo.kanji} [{activeShapeId.toUpperCase()}_3D]</span>
      </div>

      <div className={`absolute top-2 right-2 text-[9px] font-mono ${theme === 'light' ? 'text-sky-700' : 'text-gits-cyan'}`}>
        <span>{isRedrawing ? 'REDIBUJANDO...' : `SYNC: ${syncPercent}%`}</span>
      </div>

      {/* Halo behind canvas */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,0,85,0.18)_0%,transparent_70%)] pointer-events-none"
        />
        <canvas ref={canvasRef} className="relative block cursor-grab active:cursor-grabbing" />
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="absolute bottom-2 text-center font-mono">
        <span className={`text-xs font-bold tracking-widest block transition-colors ${theme === 'light' ? 'text-slate-900 group-hover:text-red-600' : 'text-white group-hover:text-ninja-crimson'}`}>
          {displayLabel}
        </span>
        <span className={`text-[10px] transition-colors ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-800' : 'text-cyber-textMuted group-hover:text-gits-cyan'}`}>
          [Clic: Ciclar Glifo 3D ({activeShapeId})]
        </span>
      </div>
    </div>
  );
};
