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
  rotationMode?: 'spinZ' | 'upright';
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

  return { id: 'compass', name: 'ESCUADRA & COMPÁS', kanji: '規', vertices, edges, tipIndices, apexIndices, rotationMode: 'upright' };
}

// Catmull-Rom spline interpolation helper for smooth calligraphic curves
function generateSplinePoints(
  controlPoints: { x: number; y: number }[],
  subdivisions = 3
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < controlPoints.length - 1; i++) {
    const p0 = controlPoints[Math.max(0, i - 1)];
    const p1 = controlPoints[i];
    const p2 = controlPoints[i + 1];
    const p3 = controlPoints[Math.min(controlPoints.length - 1, i + 2)];

    for (let t = 0; t < subdivisions; t++) {
      const u = t / subdivisions;
      const u2 = u * u;
      const u3 = u2 * u;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * u +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3
      );
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * u +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3
      );
      points.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }
  }
  points.push(controlPoints[controlPoints.length - 1]);
  return points;
}

// =========================================================================
// 3. ASSASSIN'S CREED EMBLEM GEOMETRY (THE CREED INSIGNIA)
// =========================================================================
function createAssassinGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  // Canonical silhouette of the Brotherhood hooded blade crest
  const profile2D = [
    { x: 0, y: 76 },       // 0: Top sharp beak (apex)
    { x: 15, y: 62 },      // 1: Upper hood slope R
    { x: 28, y: 44 },      // 2: Upper shoulder point R
    { x: 23, y: 22 },      // 3: Waist indent notch R
    { x: 38, y: -2 },      // 4: Mid wing flare R
    { x: 55, y: -28 },     // 5: Outer hip flare R
    { x: 62, y: -54 },     // 6: Lower blade sweep R
    { x: 48, y: -74 },     // 7: Bottom wingtip blade point R
    { x: 34, y: -62 },     // 8: Inner arch wing bevel R
    { x: 26, y: -34 },     // 9: Inner arch waist R
    { x: 16, y: -10 },     // 10: Inner arch rise R
    { x: 0, y: 12 },       // 11: Inner arch apex (top of hollow hood cutout)
    { x: -16, y: -10 },    // 12: Inner arch rise L
    { x: -26, y: -34 },    // 13: Inner arch waist L
    { x: -34, y: -62 },    // 14: Inner arch wing bevel L
    { x: -48, y: -74 },    // 15: Bottom wingtip blade point L
    { x: -62, y: -54 },    // 16: Lower blade sweep L
    { x: -55, y: -28 },    // 17: Outer hip flare L
    { x: -38, y: -2 },     // 18: Mid wing flare L
    { x: -23, y: 22 },     // 19: Waist indent notch L
    { x: -28, y: 44 },     // 20: Upper shoulder point L
    { x: -15, y: 62 },     // 21: Upper hood slope L
  ];

  const rimStart = vertices.length;
  profile2D.forEach((p) => {
    vertices.push({ x: p.x, y: p.y, z: 0 });
  });

  // Perimeter boundary loop
  const n = profile2D.length;
  for (let i = 0; i < n; i++) {
    edges.push([rimStart + i, rimStart + ((i + 1) % n)]);
  }

  // Key glowing tips and apexes
  apexIndices.add(rimStart + 0);  // Top beak
  apexIndices.add(rimStart + 11); // Inner hood arch apex
  tipIndices.add(rimStart + 7);   // Right bottom wingtip
  tipIndices.add(rimStart + 15);  // Left bottom wingtip

  // Front Center Spine (Z = +10)
  const fSpineStart = vertices.length;
  vertices.push({ x: 0, y: 76, z: 9 });   // 0: top beak front
  vertices.push({ x: 0, y: 44, z: 12 });  // 1: upper crest front
  vertices.push({ x: 0, y: 22, z: 10 });  // 2: waist crest front
  vertices.push({ x: 0, y: 12, z: 6 });   // 3: inner arch apex front

  apexIndices.add(fSpineStart);
  apexIndices.add(fSpineStart + 1);

  // Front spine edges
  edges.push([fSpineStart, fSpineStart + 1]);
  edges.push([fSpineStart + 1, fSpineStart + 2]);
  edges.push([fSpineStart + 2, fSpineStart + 3]);

  // Connect Front spine to perimeter facets (leaves inner arch void completely open)
  edges.push([fSpineStart, rimStart + 0]);
  edges.push([fSpineStart, rimStart + 1]);
  edges.push([fSpineStart, rimStart + 21]);

  edges.push([fSpineStart + 1, rimStart + 2]);
  edges.push([fSpineStart + 1, rimStart + 3]);
  edges.push([fSpineStart + 1, rimStart + 19]);
  edges.push([fSpineStart + 1, rimStart + 20]);

  edges.push([fSpineStart + 2, rimStart + 4]);
  edges.push([fSpineStart + 2, rimStart + 18]);

  edges.push([fSpineStart + 3, rimStart + 10]);
  edges.push([fSpineStart + 3, rimStart + 11]);
  edges.push([fSpineStart + 3, rimStart + 12]);

  // Back Center Spine (Z = -10)
  const bSpineStart = vertices.length;
  vertices.push({ x: 0, y: 76, z: -9 });   // 0: top beak back
  vertices.push({ x: 0, y: 44, z: -12 });  // 1: upper crest back
  vertices.push({ x: 0, y: 22, z: -10 });  // 2: waist crest back
  vertices.push({ x: 0, y: 12, z: -6 });   // 3: inner arch apex back

  apexIndices.add(bSpineStart);
  apexIndices.add(bSpineStart + 1);

  // Back spine edges
  edges.push([bSpineStart, bSpineStart + 1]);
  edges.push([bSpineStart + 1, bSpineStart + 2]);
  edges.push([bSpineStart + 2, bSpineStart + 3]);

  // Connect Back spine to perimeter facets
  edges.push([bSpineStart, rimStart + 0]);
  edges.push([bSpineStart, rimStart + 1]);
  edges.push([bSpineStart, rimStart + 21]);

  edges.push([bSpineStart + 1, rimStart + 2]);
  edges.push([bSpineStart + 1, rimStart + 3]);
  edges.push([bSpineStart + 1, rimStart + 19]);
  edges.push([bSpineStart + 1, rimStart + 20]);

  edges.push([bSpineStart + 2, rimStart + 4]);
  edges.push([bSpineStart + 2, rimStart + 18]);

  edges.push([bSpineStart + 3, rimStart + 10]);
  edges.push([bSpineStart + 3, rimStart + 11]);
  edges.push([bSpineStart + 3, rimStart + 12]);

  // Depth struts at vertical apexes
  edges.push([fSpineStart, bSpineStart]);
  edges.push([fSpineStart + 3, bSpineStart + 3]);

  // Wing Blade Facets (Bevel cross-ribs on the left and right blades)
  edges.push([rimStart + 4, rimStart + 9]);
  edges.push([rimStart + 5, rimStart + 8]);
  edges.push([rimStart + 6, rimStart + 8]);

  edges.push([rimStart + 18, rimStart + 13]);
  edges.push([rimStart + 17, rimStart + 14]);
  edges.push([rimStart + 16, rimStart + 14]);

  return {
    id: 'assassin',
    name: 'CREDO DE ASESINOS',
    kanji: '影',
    vertices,
    edges,
    tipIndices,
    apexIndices,
    rotationMode: 'upright',
  };
}

// =========================================================================
// 4. SACRED HINDU GLYPH OM (ॐ) 3D WIREFRAME
// =========================================================================
function createOmGeometry(): GeometryData {
  const vertices: Point3D[] = [];
  const edges: [number, number][] = [];
  const tipIndices = new Set<number>();
  const apexIndices = new Set<number>();

  // Helper to add clean extruded 3D ribbon with front (z=+3.5) and back (z=-3.5) rails
  // Only places depth struts at ends and key intervals to prevent railroad rung clutter
  const addRibbonCurve = (pts: { x: number; y: number }[], zDepth = 3.5, strutStep = 6) => {
    const startIdx = vertices.length;
    const len = pts.length;
    pts.forEach((p) => {
      vertices.push({ x: p.x, y: p.y, z: zDepth });
      vertices.push({ x: p.x, y: p.y, z: -zDepth });
    });

    for (let i = 0; i < len - 1; i++) {
      const a = startIdx + i * 2;
      const b = startIdx + (i + 1) * 2;
      edges.push([a, b]);         // Front rail
      edges.push([a + 1, b + 1]); // Back rail
      if (i === 0 || i % strutStep === 0) {
        edges.push([a, a + 1]);   // Clean depth strut
      }
    }
    const lastA = startIdx + (len - 1) * 2;
    edges.push([lastA, lastA + 1]); // Terminal depth strut

    tipIndices.add(startIdx);
    tipIndices.add(lastA);
    return startIdx;
  };

  // 1. Upper Loop (The top arc of the Devanagari '3')
  const upperPts = generateSplinePoints([
    { x: -4, y: 22 },
    { x: -22, y: 34 },
    { x: -28, y: 50 },
    { x: -16, y: 62 },
    { x: 2, y: 58 },
    { x: 0, y: 40 },
    { x: -4, y: 22 }
  ], 3);
  addRibbonCurve(upperPts, 3.5, 5);

  // 2. Lower Main Belly (The big sweeping lower curve of Devanagari '3')
  const lowerPts = generateSplinePoints([
    { x: -4, y: 22 },
    { x: -24, y: 14 },
    { x: -44, y: -4 },
    { x: -46, y: -28 },
    { x: -32, y: -52 },
    { x: -10, y: -64 },
    { x: 14, y: -58 },
    { x: 26, y: -40 },
    { x: 22, y: -22 },
    { x: 12, y: -16 }
  ], 3);
  addRibbonCurve(lowerPts, 4.0, 6);

  // 3. Central Sweeping Tail / Trunk (Ascending to upper right)
  const tailPts = generateSplinePoints([
    { x: -4, y: 22 },
    { x: 10, y: 20 },
    { x: 26, y: 24 },
    { x: 42, y: 36 },
    { x: 52, y: 52 },
    { x: 48, y: 66 },
    { x: 36, y: 70 },
    { x: 26, y: 64 }
  ], 3);
  addRibbonCurve(tailPts, 3.5, 5);

  // 4. Chandra (Sacred Crescent Moon at top right)
  const chandraPts = generateSplinePoints([
    { x: 10, y: 66 },
    { x: 18, y: 58 },
    { x: 30, y: 56 },
    { x: 42, y: 60 },
    { x: 48, y: 68 }
  ], 3);
  addRibbonCurve(chandraPts, 2.5, 4);

  // 5. Bindu (Sacred Floating Orb / Diamond above Chandra)
  const bCenter = { x: 29, y: 80 };
  const binduStart = vertices.length;
  apexIndices.add(binduStart);
  apexIndices.add(binduStart + 1);

  // 3D Octahedron Bindu with sparkling apexes
  vertices.push({ x: bCenter.x, y: bCenter.y + 7, z: 0 }); // 0: Top apex
  vertices.push({ x: bCenter.x, y: bCenter.y - 7, z: 0 }); // 1: Bottom apex
  vertices.push({ x: bCenter.x, y: bCenter.y, z: 6 });     // 2: Front
  vertices.push({ x: bCenter.x, y: bCenter.y, z: -6 });    // 3: Back
  vertices.push({ x: bCenter.x - 6, y: bCenter.y, z: 0 }); // 4: Left
  vertices.push({ x: bCenter.x + 6, y: bCenter.y, z: 0 }); // 5: Right

  // Connect bindu octahedron facets
  edges.push([binduStart, binduStart + 2]);
  edges.push([binduStart, binduStart + 3]);
  edges.push([binduStart, binduStart + 4]);
  edges.push([binduStart, binduStart + 5]);
  edges.push([binduStart + 1, binduStart + 2]);
  edges.push([binduStart + 1, binduStart + 3]);
  edges.push([binduStart + 1, binduStart + 4]);
  edges.push([binduStart + 1, binduStart + 5]);
  edges.push([binduStart + 2, binduStart + 4]);
  edges.push([binduStart + 4, binduStart + 3]);
  edges.push([binduStart + 3, binduStart + 5]);
  edges.push([binduStart + 5, binduStart + 2]);

  return {
    id: 'om',
    name: 'GLIFO SAGRADO // ॐ',
    kanji: '魂',
    vertices,
    edges,
    tipIndices,
    apexIndices,
    rotationMode: 'upright',
  };
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

    if (geoDataRef.current.rotationMode !== 'upright') {
      gsap.to(angleZRef, {
        current: angleZRef.current + Math.PI * 2,
        duration: 1.4,
        ease: 'power2.out',
      });
    }
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
      const multiplier = isHovered ? 2.8 : 1.3;
      targetAngleY = (x / rect.width) * multiplier;
      targetAngleX = (-y / rect.height) * multiplier;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const { vertices, edges, tipIndices, apexIndices, rotationMode = 'spinZ' } = geoDataRef.current;

      const lerp = isHovered ? 0.12 : 0.05;
      angleX += (targetAngleX - angleX) * lerp;

      if (rotationMode === 'upright') {
        // Slow ambient 3D yaw rotation (like a rotating holographic talisman/crest)
        angleY += (targetAngleY - angleY) * lerp + (isHovered ? 0.007 : 0.0025);
        // Upright orientation with subtle organic breathing levitation (never turns upside down)
        angleZRef.current = Math.sin(Date.now() * 0.0015) * 0.04;
      } else {
        // Continuous ninja spin around Z
        angleY += (targetAngleY - angleY) * lerp + (isHovered ? 0.008 : 0.003);
        angleZRef.current += isSpinningFast ? 0.015 : (isHovered ? 0.007 : 0.0035);
      }

      const angleZ = angleZRef.current;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

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
