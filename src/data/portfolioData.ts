export interface PortfolioNode {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  dimension: 'freejolitos' | 'gamedev' | 'advocacy' | 'weedtown' | 'cnnn' | 'github' | 'product_owner' | 'ideas';
  accentColor: 'cyan' | 'green' | 'amber';
  badge: string;
  summary: string;
  highlightStat: string;
  tags: string[];
  evidence: {
    type: 'link' | 'video' | 'github' | 'demo' | 'doc';
    title: string;
    url: string;
    description?: string;
  }[];
  details: {
    problemOrContext: string;
    solutionOrRole: string;
    impactOrOutcome: string;
  };
  // Proyectos jóvenes: el bloque 03 se rotula como "Impacto Proyectado"
  impactIsProjected?: boolean;
}

export const FREEJOLITOS_CONTACT = {
  email: 'hola@freejolitos.consulting',
  whatsapp:
    'https://wa.me/525533444852?text=Hola%20Hugo,%20vengo%20de%20hugolemoy.ninja%20y%20me%20gustar%C3%ADa%20agendar%20un%20diagn%C3%B3stico%20de%20tecnolog%C3%ADa%20e%20IA%20para%20mi%20organizaci%C3%B3n.',
  phoneDisplay: '+52 55 3344 4852',
  diagnosticMailto:
    'mailto:hola@freejolitos.consulting?subject=Agenda%20tu%20diagn%C3%B3stico%20-%20Freejolitos',
  quote: 'Ponemos orden en la tecnología para que ustedes puedan poner el corazón en su causa.',
  services: [
    'Consultoría tecnológica',
    'Ciberseguridad',
    'Desarrollo a la medida',
    'Diagnóstico y ruta crítica',
    'Acompañamiento mensual',
  ],
};

export interface SocialProfile {
  id: string;
  name: string;
  handle: string;
  url: string;
  context: string;
  icon: string;
  accent: 'blue' | 'crimson' | 'amber' | 'slate' | 'green';
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Hugo Legorreta Moysén',
    url: 'https://www.linkedin.com/in/hugolegorretamoysen/',
    context: 'Expediente formal, trayectoria corporativa y credenciales de producto',
    icon: 'Linkedin',
    accent: 'blue',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@HugoLeMoy',
    url: 'https://www.facebook.com/HugoLeMoy',
    context: 'Historias de lo que construyo, proyectos con mi comunidad y convocatorias para probar productos',
    icon: 'Facebook',
    accent: 'blue',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@HugoLeMoy',
    url: 'https://x.com/HugoLeMoy',
    context: 'Construir en público: avances, aprendizajes y decisiones de producto e IA, en corto',
    icon: 'Twitter',
    accent: 'slate',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@hugolemoy',
    url: 'https://www.instagram.com/hugolemoy',
    context: 'Perspectiva visual, viajes, eventos y backstage',
    icon: 'Instagram',
    accent: 'crimson',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@HugoLeMoy47',
    url: 'https://github.com/HugoLeMoy47',
    context: 'Auditoría de código, experimentos, motores de juegos y repositorios',
    icon: 'Github',
    accent: 'slate',
  },
  {
    id: 'weedtown',
    name: 'Weedtown',
    handle: 'weedtown.social',
    url: 'https://weedtown.social',
    context: 'Red social autónoma, cultura cannábica y soberanía digital sin algoritmos',
    icon: 'Users',
    accent: 'green',
  },
  {
    id: 'freejolitos',
    name: 'Freejolitos',
    handle: 'freejolitos.consulting',
    url: 'https://freejolitos.consulting',
    context: 'Consultoría tecnológica, ciberseguridad y desarrollo a la medida para el Tercer Sector',
    icon: 'Bean',
    accent: 'amber',
  },
];

export interface DimensionMeta {
  id: string;
  name: string;
  code: string;
  color: 'cyan' | 'green' | 'amber';
  icon: string;
  description: string;
  nodeCount: number;
}

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: 'freejolitos',
    name: 'Freejolitos Consultores',
    code: '01_OSC_TECH',
    color: 'amber',
    icon: 'Bean',
    description: 'Consultoría tecnológica, ciberseguridad y desarrollo a la medida para organizaciones de la sociedad civil y negocios pequeños, más los productos propios de la práctica.',
    nodeCount: 5,
  },
  {
    id: 'gamedev',
    name: 'GameDev & Serious Games',
    code: '02_LUDIC_CORE',
    color: 'cyan',
    icon: 'Gamepad2',
    description: 'Game design, Global Game Jams, Woman Game Jam y videojuegos con propósito e impacto legislativo.',
    nodeCount: 4,
  },
  {
    id: 'advocacy',
    name: 'Incidencia & La Comuna 420',
    code: '03_POLICY_NET',
    color: 'green',
    icon: 'Scale',
    description: 'Incidencia política, redacción legislativa en el Senado, iniciativa #Capital420 y 3+ años de voluntariado cívico pacífico ininterrumpido.',
    nodeCount: 4,
  },
  {
    id: 'weedtown',
    name: 'weedtown.social (Red Autónoma)',
    code: '04_AUTONOMOUS_NET',
    color: 'green',
    icon: 'Users',
    description: 'Red social independiente y soberana: vibe-coding, libertad de expresión comunitaria y espacio seguro sin censura algorítmica.',
    nodeCount: 1,
  },
  {
    id: 'cnnn',
    name: 'Contenido, Docencia & Divulgación',
    code: '05_MEDIA_STREAM',
    color: 'green',
    icon: 'Tv',
    description: 'Creación de contenido digital, conducción en video, charlas en escuelas y foros de divulgación, y la serie de publicaciones sobre cómo construyo productos.',
    nodeCount: 3,
  },
  {
    id: 'github',
    name: 'Laboratorio de Código & GitHub',
    code: '06_SOURCE_FORGE',
    color: 'cyan',
    icon: 'GitBranch',
    description: 'Cómo construyo: desarrollo dirigido con agentes de IA bajo reglas duras, este mismo sitio, y repositorios públicos en GitHub (@HugoLeMoy47) con herramientas y scripts de automatización.',
    nodeCount: 6,
  },
  {
    id: 'product_owner',
    name: 'Product Owner & Arquitectura IT',
    code: '07_KERNEL_CORP',
    color: 'cyan',
    icon: 'Cpu',
    description: 'Liderazgo técnico híbrido: sistema MAP para ACNUR/ONU, analítica de embudo B2B en tecnología financiera y una década previa en infraestructura y TI.',
    nodeCount: 3,
  },
  {
    id: 'ideas',
    name: 'Incubadora de Ideas (WIP)',
    code: '08_NEURAL_INCUBATOR',
    color: 'amber',
    icon: 'Sparkles',
    description: 'Conceptos de software, arquitectura social y prototipos en gestación que aún no han sido liberados al público ("lo que pienso y no subo").',
    nodeCount: 2,
  },
];

export const PORTFOLIO_NODES: PortfolioNode[] = [
  // 01 // FREEJOLITOS
  {
    id: 'freejolitos-core',
    code: 'FRL-01',
    title: 'Freejolitos Consultores',
    subtitle: 'Tecnología para el Tercer Sector y OSCs en México',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'PRÁCTICA ACTIVA',
    summary: 'Consultoría tecnológica, ciberseguridad y desarrollo a la medida para organizaciones de la sociedad civil sin área de sistemas en todo México, con diagnóstico inicial y acompañamiento mensual.',
    highlightStat: 'Consultoría · Ciberseguridad · Desarrollo a la medida · Diagnóstico · Acompañamiento',
    tags: ['Consultoría TI', 'Ciberseguridad', 'Desarrollo a la Medida', 'Sociedad Civil', 'Gobierno de Datos'],
    evidence: [
      {
        type: 'link',
        title: 'Sitio Web Oficial',
        url: 'https://freejolitos.consulting',
        description: 'Servicios, enfoque y casos de acompañamiento',
      },
      {
        type: 'link',
        title: 'WhatsApp Directo (Diagnóstico)',
        url: FREEJOLITOS_CONTACT.whatsapp,
        description: `${FREEJOLITOS_CONTACT.phoneDisplay} · Vía rápida sin intermediarios`,
      },
      {
        type: 'link',
        title: 'Agenda tu diagnóstico (correo)',
        url: FREEJOLITOS_CONTACT.diagnosticMailto,
        description: FREEJOLITOS_CONTACT.email,
      }
    ],
    details: {
      problemOrContext: 'Las organizaciones de la sociedad civil crecen y la tecnología con ellas sin planificación. Financiadores y auditores exigen estándares de empresas multinacionales sin presupuestos de corporativo.',
      solutionOrRole: 'Fundador y Consultor Principal. Traduzco los estándares de agencias internacionales a la escala real de una OSC: orden, procesos, seguridad y desarrollo ágil sin sobrecostos de licencias innecesarias.',
      impactOrOutcome: 'Acompañamiento tecnológico continuo, protección estricta de datos de personas beneficiarias y fortalecimiento de capacidades instaladas.',
    }
  },
  {
    id: 'bitacora-viva',
    code: 'FRL-02',
    title: 'Bitácora Viva',
    subtitle: 'Gestión de casos de atención humanitaria que cuida a la persona atendida',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'PRODUCTO EN DESARROLLO · DATOS SIMULADOS',
    summary: 'Producto de Freejolitos para organizaciones que atienden a personas en movilidad: expediente único con folio, bitácora por área, estatus simultáneos, consentimiento por tipo y auditoría de cada acción. Construyo la parte de producto y dirijo el desarrollo con un agente de IA bajo reglas duras. Hoy es una prueba de concepto: ningún dato real de personas.',
    highlightStat: 'Más de 700 pruebas negativas de seguridad · Anonimiza, no borra · Cero valores supuestos',
    tags: ['Product Owner', 'React + TypeScript', 'Supabase · RLS', 'Privacidad por diseño', 'Tercer Sector'],
    evidence: [
      {
        type: 'link',
        title: 'Cómo manejo la información (freejolitos.consulting)',
        url: 'https://freejolitos.consulting/como-manejo-tu-informacion',
        description: 'Salvaguardas de datos y uso transparente de IA',
      },
      {
        type: 'link',
        title: 'Guía: organizar el expediente digital para auditoría',
        url: 'https://freejolitos.consulting/guias/organizar-expediente-digital-auditoria',
        description: 'La lógica de custodia y anonimización, sin registro ni formularios',
      }
    ],
    details: {
      problemOrContext: 'Las organizaciones que atienden personas en movilidad cargan con el dato más sensible que existe con las herramientas más precarias: cuadernos, Excel y carpetas sin control. La persona repite su historia en cada área.',
      solutionOrRole: 'Product Owner. Defino los compromisos del producto (custodia, no propiedad; el dato que no se necesita no se levanta; el registro no se borra, se anonimiza) y reviso cada ciclo de desarrollo contra ellos. El código lo construye un agente de IA con reglas duras, pruebas primero y mi aprobación para cada cambio de base de datos.',
      impactOrOutcome: 'Prueba de concepto desplegada con datos ficticios, aún sin validar en campo. Primero la operación real, después el primer dato real.',
    },
    impactIsProjected: true,
  },
  {
    id: 'sutramind',
    code: 'FRL-03',
    title: 'SutraMind',
    subtitle: 'Tablero y asesor con IA para empresas medianas: cada cifra, con su fuente',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'PRUEBA DE CONCEPTO · EMPRESA FICTICIA',
    summary: 'Base de conocimiento citable, tablero de indicadores y asesor con IA para empresas de 30 a 300 personas. El asesor propone; la Dirección decide. Toda cifra sale de SQL determinista, toda respuesta cita su fuente y cada persona ve solo lo que le corresponde.',
    highlightStat: 'La IA interpreta la pregunta; la base de datos calcula la cifra',
    tags: ['Product Owner', 'Python · PostgreSQL', 'Capa semántica', 'IA con fuentes citadas', 'Permisos por rol'],
    evidence: [
      {
        type: 'link',
        title: 'Cómo manejo la información (freejolitos.consulting)',
        url: 'https://freejolitos.consulting/como-manejo-tu-informacion',
        description: 'Arquitectura de datos y salvaguardas de IA',
      }
    ],
    details: {
      problemOrContext: 'Las empresas medianas tienen un ERP que produce datos y nadie que los convierta en respuestas. Pedirle cifras a un modelo de lenguaje sobre texto libre produce números verosímiles, no exactos.',
      solutionOrRole: 'Product Owner y arquitecto. Capa semántica desacoplada: el modelo traduce la pregunta a una consulta parametrizada sobre un catálogo de métricas auditado; la base de datos calcula; el modelo redacta con citas.',
      impactOrOutcome: 'Prueba de concepto sobre una empresa ficticia con 34 preguntas de referencia que miden cifras, fugas entre roles y respuestas «no sé». Sin datos de clientes.',
    },
    impactIsProjected: true,
  },
  {
    id: 'el-chalan',
    code: 'FRL-04',
    title: 'El Chalán',
    subtitle: 'La libreta del changarro en el celular: sin conexión y sin cuenta',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'PRUEBA DE CONCEPTO · EN VIVO',
    summary: 'Web app instalable para que quien tiene un negocio pequeño anote lo que entra y sale y sepa cuánto tiene, si ganó y cuánto le deben. Funciona sin internet, sin crear cuenta, y los datos se quedan en el teléfono. Hoy es una prueba de concepto con datos de ejemplo, buscando sus primeros probadores.',
    highlightStat: 'Sin conexión y sin cuenta · Dinero en centavos enteros · 134 pruebas automáticas',
    tags: ['Product Owner', 'Svelte + TypeScript', 'Local-first', 'PWA', 'Negocios pequeños'],
    evidence: [
      {
        type: 'demo',
        title: 'Probar El Chalán',
        url: 'https://elchalan.hugolemoy.ninja',
        description: 'Instálala en Android desde el navegador; arranca con datos de ejemplo',
      },
      {
        type: 'link',
        title: 'Cuaderno: una libreta que funciona sin internet',
        url: 'https://hugolemoy.ninja/cuaderno/una-libreta-que-funciona-sin-internet/',
        description: 'Las decisiones de diseño, en primera persona',
      }
    ],
    details: {
      problemOrContext: 'La mayoría de los negocios pequeños lleva sus cuentas en un cuaderno o de memoria. Las apps de gestión piden cuenta, conexión y conceptos contables desde el primer día, así que nadie las termina usando.',
      solutionOrRole: 'Product Owner. Definí el modelo (todo es un movimiento que entra o sale; lo incompleto se guarda y se marca, no se rechaza; el negocio sube de nivel sin migrar datos) y dirigí el desarrollo con un agente de IA, con pruebas que comparan cada cifra al centavo contra datos sintéticos.',
      impactOrOutcome: 'Prueba de concepto publicada e instalable, probada en un Android real con respaldo por archivo. Siguiente paso: un piloto con un comerciante real y la revisión legal del aviso de privacidad antes de abrir la convocatoria.',
    },
    impactIsProjected: true,
  },
  {
    id: 'consultoria-osc-2026',
    code: 'FRL-05',
    title: 'Consultoría Externa en TI para una OSC',
    subtitle: 'Capacidad instalada para una organización de atención humanitaria (2026–hoy)',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'CASO ACTIVO · SIN NOMBRE',
    summary: 'Acompañamiento integral de TI a una organización de la sociedad civil: migración a Google Workspace, diagnóstico de infraestructura, respuesta a un incidente de seguridad, lineamientos de gobierno de datos y una plataforma interna para su operación diaria.',
    highlightStat: 'Migración a la nube · Respuesta a incidente · Gobierno de datos',
    tags: ['Consultoría TI', 'Google Workspace', 'Ciberseguridad', 'Gobierno de Datos', 'Tercer Sector'],
    evidence: [
      {
        type: 'link',
        title: 'Servicios de Freejolitos',
        url: 'https://freejolitos.consulting/servicios',
        description: 'Diagnóstico, ruta crítica y acompañamiento mensual',
      }
    ],
    details: {
      problemOrContext: 'Una organización que creció rápido, con correo, archivos y equipos dispersos, y un incidente de seguridad que obligó a ordenar todo a la vez.',
      solutionOrRole: 'Consultor externo. Diagnóstico, migración de correo y archivos a Google Workspace, remediación del incidente, lineamientos de resguardo de información y desarrollo de una herramienta interna de seguimiento de tareas.',
      impactOrOutcome: 'Ecosistema de colaboración centralizado, medidas preventivas activas y procesos operativos documentados. El nombre de la organización se reserva por confidencialidad.',
    }
  },

  // 02 // GAMEDEV
  {
    id: 'legalizala-tycoon',
    code: 'GM-01',
    title: 'Legalízala Tycoon',
    subtitle: 'Serious game de simulación legislativa mexicana',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'EN PAUSA · JUGABLE',
    summary: 'Lleva una iniciativa ciudadana cannábica desde el cabildo municipal hasta el Diario Oficial de la Federación en 100 semanas sin desgastar a tu colectivo. La versión publicada se puede jugar; el desarrollo está en pausa y se retoma a más tardar en marzo de 2027.',
    highlightStat: '100 semanas de simulación · Mecánicas de incidencia real',
    tags: ['TypeScript', 'Game Design', 'Serious Games', 'Política Pública', 'Simulación'],
    evidence: [
      {
        type: 'demo',
        title: 'Jugar Legalízala Tycoon',
        url: 'https://legalizala.weedtown.social',
        description: 'Versión jugable en el ecosistema weedtown.social',
      },
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/LegalizalaTycoon',
        description: 'Motor y mecánicas en TypeScript',
      },
      {
        type: 'doc',
        title: 'GDD & Bitácora de Diseño',
        url: 'https://github.com/HugoLeMoy47/LegalizalaTycoon',
        description: 'Documento de diseño de juego con reglas, narrativa y recursos',
      }
    ],
    details: {
      problemOrContext: 'La educación cívica y la comprensión del proceso legislativo mexicano suelen ser densas, burocráticas y ajenas a la ciudadanía activa.',
      solutionOrRole: 'Creador y Game Designer. Diseño de sistemas de recursos (capital político, energía comunitaria, alianzas con bancadas, presión mediática y contención de operativos).',
      impactOrOutcome: 'Se proyecta como herramienta lúdico-pedagógica para activistas, estudiantes de ciencias políticas y personas defensoras de derechos, útil en talleres de incidencia y formación cívica.',
    },
    impactIsProjected: true,
  },
  {
    id: 'canna-gochi',
    code: 'GM-02',
    title: 'canna-gochi',
    subtitle: 'Mascota virtual botánica y cuidados digitales',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'PROTOTIPO',
    summary: 'Un experimento lúdico interactivo tipo Tamagotchi donde cuidas los ciclos circadianos, pH, nutrientes y estrés de una planta cannábica digital.',
    highlightStat: 'TypeScript · Estado reactivo · Ciclos botánicos',
    tags: ['TypeScript', 'Virtual Pet', 'Tamagotchi', 'Simulación Botánica'],
    evidence: [
      {
        type: 'demo',
        title: 'Jugar canna-gochi',
        url: 'https://cannagochi.weedtown.social',
        description: 'Versión jugable en el ecosistema weedtown.social',
      },
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/canna-gochi',
        description: 'Lógica TypeScript del estado y necesidades de la planta',
      }
    ],
    details: {
      problemOrContext: 'Explorar mecánicas de cuidado pasivo (idle game) aplicadas al aprendizaje del autocultivo responsable y botánica cannábica.',
      solutionOrRole: 'Desarrollador en solitario. Modelado de variables de humedad, luz, nutrición y respuestas al cuidado.',
      impactOrOutcome: 'Base para un simulador móvil liviano y educativo.',
    }
  },
  {
    id: 'big-monster-serious-games',
    code: 'GM-03',
    title: 'Big-Monster Serious Games',
    subtitle: 'Producción de videojuegos para ONU Mujeres y SACMEX',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'TRAYECTORIA',
    summary: 'Gestión de proyectos y desarrollo de negocio en Big-Monster, estudio especializado en videojuegos serios y educativos para organismos multilaterales y gobierno.',
    highlightStat: 'Equipos de 5+ personas · Clientes internacionales (ONU Mujeres, SACMEX)',
    tags: ['Big-Monster', 'Serious Games', 'Project Management', 'ONU Mujeres', 'SACMEX'],
    evidence: [
      {
        type: 'link',
        title: 'Big-Monster (big-monster.net)',
        url: 'https://big-monster.net',
        description: 'Sitio oficial del estudio y su portafolio de juegos serios',
      }
    ],
    details: {
      problemOrContext: 'Traducir problemáticas críticas (igualdad de género, cuidado hídrico y prevención de adicciones) en mecánicas de juego atractivas para audiencias jóvenes.',
      solutionOrRole: 'Project Manager & Business Developer. Negociación y cierre de contratos, levantamiento de requerimientos y coordinación de equipos de arte y programación.',
      impactOrOutcome: 'Juegos educativos desplegados con ONU Mujeres, SACMEX y Fundación Gonzalo Río Arronte.',
    }
  },
  {
    id: 'bit2fit-ggj',
    code: 'GM-04',
    title: 'bit2fit (Global Game Jam 2020)',
    subtitle: 'Videojuego en Godot Engine creado en 48 horas',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'GGJ ARCHIVE',
    summary: 'Desarrollado durante la edición presencial de Global Game Jam 2020 con Godot Engine bajo la temática de adaptación e integración.',
    highlightStat: 'Global Game Jam 2020 · Godot Engine · GDScript',
    tags: ['Godot Engine', 'GDScript', 'Game Jam', '48 Hours Challenge'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio bit2fit',
        url: 'https://github.com/HugoLeMoy47/bit2fit',
        description: 'Código abierto y assets en Godot',
      },
      {
        type: 'link',
        title: 'Perfil Global Game Jam',
        url: 'https://globalgamejam.org/users/hugolemoy',
        description: 'Ficha de jammer oficial en GGJ',
      }
    ],
    details: {
      problemOrContext: 'Crear una experiencia interactiva completa de principio a fin en un fin de semana bajo alta presión creativa y técnica.',
      solutionOrRole: 'Programador y diseñador de niveles. Implementación de mecánicas de ajuste y sincronización rítmica en Godot.',
      impactOrOutcome: 'Proyecto publicado y archivado en el registro histórico mundial de Global Game Jam.',
    }
  },

  // 03 // ADVOCACY & LA COMUNA 420 (de lo más reciente a lo más antiguo)
  {
    id: 'la-comuna-420-asambleas',
    code: 'ADV-01',
    title: 'La Comuna 420: Asambleas, Convivencia & Voluntariado Cívico',
    subtitle: 'Gestión masiva de voluntariado autónomo 24/7 y marchas pacíficas (3+ años)',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'VOLUNTARIADO CÍVICO',
    summary: 'Coordinación masiva de voluntariado cívico sin nóminas ni contratos burocráticos. Mantenimiento ininterrumpido de espacios públicos vivos, pacíficos y pedagógicos durante más de tres años, además de la logística de la Marcha 420.',
    highlightStat: '3+ años continuos · Voluntariado cívico 100% autónomo · Convivencia pacífica',
    tags: ['La Comuna 420', 'Voluntariado Cívico', 'Paz Urbana', 'Mediación', 'Autogestión'],
    evidence: [
      {
        type: 'video',
        title: 'Cobertura de Medios',
        url: 'https://youtu.be/S9Y0MEct5pE',
        description: 'Debate público en televisión abierta',
      }
    ],
    details: {
      problemOrContext: 'Demostrar que la comunidad usuaria es capaz de auto-organizarse pacíficamente en el espacio público sin requerir tutela policíaca ni estructuras burocráticas.',
      solutionOrRole: 'Coordinador y facilitador. Gestión humana y logística de cientos de voluntarios sin remuneración contractual, organizando comisiones de seguridad comunitaria, diálogo interinstitucional gobierno–sociedad civil y asistencia a los espacios, además de la logística de la Marcha 420.',
      impactOrOutcome: 'Consolidación de un territorio de convivencia pacífica autogestionada activo diariamente durante más de 3 años ininterrumpidos.',
    }
  },
  {
    id: 'capital-420-iniciativa',
    code: 'ADV-02',
    title: 'Iniciativa #Capital420 & Propuesta Técnica HLM',
    subtitle: 'Propuesta técnica de política pública y regulación local CDMX',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'INCIDENCIA LEGISLATIVA',
    summary: 'Elaboración de paquete entregable integral para el Congreso de la CDMX en colaboración con organizaciones como MUCD, enfocado en derechos de usuarios, trazabilidad y reducción de daños.',
    highlightStat: 'Propuesta técnica formal entregada a diputaciones CDMX',
    tags: ['Política Pública', 'Derechos Humanos', 'Reducción de Daños', 'CDMX', 'Regulación'],
    evidence: [
      {
        type: 'link',
        title: 'Postura Comunitaria Telediario',
        url: 'https://youtu.be/S9Y0MEct5pE',
        description: 'Cobertura televisiva y postura pública',
      }
    ],
    details: {
      problemOrContext: 'La criminalización persistente del consumo y la falta de protocolos claros de convivencia en el espacio público de la Ciudad de México.',
      solutionOrRole: 'Co-autor y redactor técnico. Análisis comparativo de marcos jurídicos, reducción de riesgos y daños, y diseño de lineamientos de coexistencia ciudadana.',
      impactOrOutcome: 'Presentación formal en el Congreso de la CDMX e interlocución directa con tomadores de decisiones.',
    }
  },
  {
    id: 'senado-cravioto-iniciativa',
    code: 'ADV-03',
    title: 'Iniciativa en el Senado: Redacción Legislativa & Política Transversal',
    subtitle: 'Formulación técnica de ley con la bancada del Senador César Cravioto',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'TÉCNICA LEGISLATIVA',
    summary: 'Participación directa en las entrañas del proceso legislativo federal: redacción técnica de propuestas de ley y estructuración de un marco transversal que vincula derechos humanos, justicia social agraria y fin de la criminalización.',
    highlightStat: 'Técnica legislativa parlamentaria · Senado de la República',
    tags: ['Senado de la República', 'César Cravioto', 'Técnica Legislativa', 'Política Pública Transversal'],
    evidence: [
      {
        type: 'link',
        title: 'Registro de Seguimiento en Bitácora',
        url: '#',
        description: 'Documentación archivada en el ecosistema HLM',
      }
    ],
    details: {
      problemOrContext: 'El vacío legal federal y la complejidad de articular una ley que cruza simultáneamente salud, derechos humanos, economía campesina, comercio y fiscalidad.',
      solutionOrRole: 'Asesor e interlocutor técnico ciudadano. Redacción de articulados, fundamentación jurídica y cabildeo con senadores para salvaguardar el autocultivo no comercial y las licencias sociales.',
      impactOrOutcome: 'Comprensión profunda desde adentro de la técnica parlamentaria mexicana y la construcción de acuerdos en el Congreso de la Unión.',
    }
  },
  {
    id: 'planton-420-memoria',
    code: 'ADV-04',
    title: 'El Plantón 420: Memoria y Resistencia',
    subtitle: 'Presencia, defensa del espacio público y derechos humanos',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'MEMORIA HISTÓRICA',
    summary: 'Participación y acompañamiento durante el histórico Plantón 420 frente al Senado: reducción de riesgos y daños, cultivo demostrativo y resistencia pacífica.',
    highlightStat: 'Hito histórico del activismo cannábico en México',
    tags: ['Plantón 420', 'Senado', 'Resistencia Pacífica', 'Derechos', 'Memoria'],
    evidence: [
      {
        type: 'link',
        title: 'Playlist CNNN con Cobertura',
        url: 'https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7',
        description: 'Crónica audiovisual del movimiento',
      }
    ],
    details: {
      problemOrContext: 'La necesidad de visibilizar que el consumo y el autocultivo pacífico en el espacio público no representan una amenaza de seguridad.',
      solutionOrRole: 'Activista participante. Acompañamiento, pedagogía comunitaria sobre derechos constitucionales y cultivo in situ.',
      impactOrOutcome: 'El plantón cannábico más longevo de Latinoamérica y epicentro de debate legislativo.',
    }
  },

  // 04 // WEEDTOWN.SOCIAL (RED AUTÓNOMA)
  {
    id: 'weedtown-social',
    code: 'WTS-01',
    title: 'weedtown.social',
    subtitle: 'Red social autónoma, soberana y libre de censura algorítmica',
    dimension: 'weedtown',
    accentColor: 'green',
    badge: 'RED SOCIAL EN VIVO',
    summary: 'Red social comunitaria y descentralizada creada mediante vibe-coding. Un espacio seguro, sin algoritmos de explotación ni estigmatización comercial para compartir conocimiento botánico, debate y cultura cannábica.',
    highlightStat: 'En vivo en weedtown.social · Soberanía digital comunitaria',
    tags: ['weedtown.social', 'Vibe-Coding', 'Red Autónoma', 'Soberanía Digital', 'Comunidad Libre'],
    evidence: [
      {
        type: 'link',
        title: 'Plataforma en Vivo (weedtown.social)',
        url: 'https://weedtown.social',
        description: 'Acceso directo a la red social comunitaria',
      },
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/weedtown_trial_101',
        description: 'Código abierto y prototipo interactivo',
      }
    ],
    details: {
      problemOrContext: 'Las plataformas hegemónicas (Instagram, Facebook) banean cuentas, censuran publicaciones de autocultivo y estigmatizan a las personas usuarias mediante algoritmos opacos.',
      solutionOrRole: 'Creador y arquitecto de software. Diseño de una red social soberana, accesible desde web, enfocada en privacidad, intercambio botánico y deliberación comunitaria sin algoritmos de vigilancia.',
      impactOrOutcome: 'Plataforma comunitaria activa en weedtown.social con soberanía de datos y libertad de expresión para la cultura cannábica.',
    }
  },

  // 05 // CNNN
  {
    id: 'cnnn-noticias',
    code: 'MED-01',
    title: 'CNNN (Cannabis Network News Now)',
    subtitle: 'Conducción y análisis en noticiero cannábico digital',
    dimension: 'cnnn',
    accentColor: 'green',
    badge: 'MEDIA HOST & ANALISTA',
    summary: 'Serie de programas y cápsulas audiovisuales conducidas por Hugo Legorreta, en alianza con el canal Jotvox, analizando el avance legislativo en la SCJN, eventos de la industria, políticas públicas y cultura comunitaria.',
    highlightStat: 'Temporada completa en YouTube · Conductor titular · Alianza con Jotvox',
    tags: ['Periodismo', 'YouTube', 'Análisis Político', 'CNNN', 'Jotvox', 'SCJN'],
    evidence: [
      {
        type: 'link',
        title: 'Jotvox (jotvox.com)',
        url: 'https://jotvox.com',
        description: 'Canal y casa productora aliada; organizó el evento del episodio destacado',
      },
      {
        type: 'video',
        title: 'Playlist Oficial CNNN en YouTube',
        url: 'https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7',
        description: 'Todos los episodios y cápsulas de noticias producidos',
      },
      {
        type: 'video',
        title: 'Episodio Destacado (evento Jotvox)',
        url: 'https://youtu.be/S9Y0MEct5pE?si=e30emsnA9TeAMJIx',
        description: 'Evento producido por Jotvox con debate técnico y cobertura legislativa',
      }
    ],
    details: {
      problemOrContext: 'Falta de cobertura periodística rigurosa, no sensacionalista e informada sobre los litigios estratégicos, derechos y la industria del cáñamo en México.',
      solutionOrRole: 'Conductor titular y guionista. Desglose didáctico de resoluciones judiciales, entrevistas a activistas y seguimiento legislativo.',
      impactOrOutcome: 'Espacio de referencia informativa para la comunidad usuaria y tomadores de decisiones.',
    }
  },
  {
    id: 'docencia-divulgacion',
    code: 'MED-02',
    title: 'Docencia & Divulgación',
    subtitle: 'Charlas en escuelas, foros de ciencia y game jams educativas',
    dimension: 'cnnn',
    accentColor: 'green',
    badge: 'DIVULGACIÓN',
    summary: 'Charlas y talleres para estudiantes y público general: reducción de riesgos y daños en bachillerato técnico, participación en foros de divulgación científica y STEAM, y coordinación de game jams con enfoque educativo.',
    highlightStat: 'Bachillerato técnico · Foros STEAM · Game jams educativas',
    tags: ['Docencia', 'Divulgación', 'Reducción de daños', 'STEAM', 'Game Jams'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil Global Game Jam',
        url: 'https://globalgamejam.org/users/hugolemoy',
        description: 'Participación y coordinación de jams',
      }
    ],
    details: {
      problemOrContext: 'Los temas que más importan a la gente joven (sustancias, tecnología, derechos) suelen explicarse con miedo o con tecnicismos.',
      solutionOrRole: 'Ponente y facilitador. En un plantel de bachillerato técnico impartí la charla «Y tú, ¿a qué le entras?»: historia de las sustancias, cómo actúan en el cuerpo, qué dice la ley y dónde pedir ayuda, sin criminalizar. También participé en foros de divulgación científica y STEAM, y coordiné game jams educativas con un organismo internacional.',
      impactOrOutcome: 'Materiales reutilizables para talleres y una forma de explicar temas difíciles que hoy aplico en mis publicaciones y en la consultoría.',
    }
  },
  {
    id: 'serie-construccion-linkedin',
    code: 'MED-03',
    title: 'Construir en Público: Serie de Publicaciones',
    subtitle: 'Cómo diseño productos con IA, contado semana a semana',
    dimension: 'cnnn',
    accentColor: 'green',
    badge: 'SERIE ACTIVA',
    summary: 'Serie de publicaciones semanales sobre las decisiones reales detrás de mis productos: privacidad por diseño, IA que cita sus fuentes, restricciones como diseño y el estado honesto de cada prueba de concepto. El relato largo vive en el Cuaderno de construcción.',
    highlightStat: 'Varias publicaciones por semana desde octubre de 2026 · Cada producto con su estado real',
    tags: ['LinkedIn', 'Build in public', 'Producto', 'IA confiable', 'Privacidad'],
    evidence: [
      {
        type: 'link',
        title: 'Publicaciones en LinkedIn',
        url: 'https://www.linkedin.com/in/hugolegorretamoysen/recent-activity/all/',
        description: 'La serie completa en mi perfil',
      },
      {
        type: 'link',
        title: 'Cuaderno de construcción',
        url: 'https://hugolemoy.ninja/cuaderno/',
        description: 'Las piezas largas, en primera persona',
      }
    ],
    details: {
      problemOrContext: 'El contenido sobre IA suele prometer más de lo que entrega. Quien contrata tecnología necesita ver cómo se decide, no solo el resultado bonito.',
      solutionOrRole: 'Autor. Cada publicación sale de un documento o una prueba real del proyecto, nunca nombra clientes y dice si el producto es prueba de concepto.',
      impactOrOutcome: 'Un registro público y fechado de cómo trabajo, que sirve como portafolio vivo para clientes y equipos.',
    }
  },

  // 06 // GITHUB LAB
  {
    id: 'osc-task-tracker',
    code: 'GIT-01',
    title: 'Task Tracker para OSC',
    subtitle: 'POC de gestión de tareas para organizaciones de la sociedad civil',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'IMPACTO SOCIAL',
    summary: 'Herramienta de software liviana para coordinar equipos operativos de organizaciones de la sociedad civil: asignación de turnos, pendientes y atención a personas. Primer caso de uso: una casa de acogida para personas migrantes. Hoy vive dentro de Bitácora Viva como su módulo Seguidor de tareas.',
    highlightStat: 'Diseñado para operación real sin fricción técnica',
    tags: ['JavaScript', 'Task Tracker', 'OSC', 'Humanitario', 'Casa de acogida'],
    evidence: [
      {
        type: 'link',
        title: 'Desarrollo a la medida (freejolitos.consulting)',
        url: 'https://freejolitos.consulting/servicios',
        description: 'Cómo construyo software para organizaciones sin área de sistemas',
      }
    ],
    details: {
      problemOrContext: 'Las organizaciones de asistencia humanitaria operan con alta rotación y escasos recursos informáticos, dependiendo de notas físicas propensas a perderse.',
      solutionOrRole: 'Desarrollador voluntario. Sistema minimalista para registrar necesidades urgentes (médicas, alimentación, trámites) por persona atendida.',
      impactOrOutcome: 'Optimización de turnos y reducción de omisiones en la atención diaria.',
    }
  },
  {
    id: 'calculadora-regresion',
    code: 'GIT-02',
    title: 'Calculadora Web de Regresión Lineal',
    subtitle: 'Herramienta estadística interactiva en TypeScript',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'DATA TOOL',
    summary: 'Calculadora web de alta precisión para modelar correlaciones lineales, cálculo de pendiente, intercepto y coeficiente de determinación (R²).',
    highlightStat: 'TypeScript puro · Sin dependencias pesadas',
    tags: ['TypeScript', 'Estadística', 'Regresión Lineal', 'Data Analysis'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/CalculadoraWebRegresLineal',
        description: 'Algoritmo y UI matemática interactiva',
      }
    ],
    details: {
      problemOrContext: 'Necesidad de contar con una herramienta web inmediata para proyectar conversiones de métricas de embudo sin abrir software estadístico pesado.',
      solutionOrRole: 'Desarrollador. Implementación del algoritmo de mínimos cuadrados con gráficos dinámicos en navegador.',
      impactOrOutcome: 'Herramienta utilitaria reutilizable en análisis de producto y negocio.',
    }
  },
  {
    id: 'descargador-facturas-sat',
    code: 'GIT-03',
    title: 'Descargador Automatizado de Facturas (XML / PDF)',
    subtitle: 'Script en Python para scraping y archivística fiscal',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'AUTOMATIZACIÓN',
    summary: 'Automatización en Python para parsear tablas complejas de facturación en HTML y extraer en lote documentos XML y PDF clasificados según reglas contables.',
    highlightStat: 'Python · Automatización de tareas repetitivas',
    tags: ['Python', 'Web Scraping', 'Facturación SAT', 'Productividad'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/descargador_facturas',
        description: 'Script de descarga y organización por directorios',
      }
    ],
    details: {
      problemOrContext: 'Proceso manual agotador de descarga individual de cientos de comprobantes fiscales desde portales con interfaces obsoletas.',
      solutionOrRole: 'Desarrollador. Script que procesa el HTML guardado, extrae los enlaces de descarga y guarda los comprobantes con nomenclatura estructurada.',
      impactOrOutcome: 'Ahorro de horas hombre mensuales en conciliación contable.',
    }
  },
  {
    id: 'cedula-checker',
    code: 'GIT-04',
    title: 'CedulaChecker (C#)',
    subtitle: 'Validador utilitario de cédulas profesionales',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'C# UTILITY',
    summary: 'Herramienta ligera desarrollada en C# para la validación y verificación automatizada de folios de cédulas profesionales emitidas por la SEP.',
    highlightStat: 'C# · Verificación rápida de credenciales',
    tags: ['C#', '.NET', 'Validación', 'Herramienta'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/CedulaChecker',
        description: 'Código en C#',
      }
    ],
    details: {
      problemOrContext: 'Verificación masiva de credenciales técnicas y profesionales en procesos de selección.',
      solutionOrRole: 'Desarrollador. Algoritmo de consulta y saneamiento de cadenas.',
      impactOrOutcome: 'Herramienta compacta de validación.',
    }
  },
  {
    id: 'metodo-agentes-ia',
    code: 'GIT-05',
    title: 'Método: Desarrollo Dirigido con Agentes de IA',
    subtitle: 'El agente programa; yo decido, reviso y apruebo',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'MÉTODO EN USO',
    summary: 'La forma en que construyo todos mis productos: un agente de IA escribe el código bajo reglas duras por repositorio, pruebas primero y mi aprobación para cada cambio que publica o toca datos. Un segundo cerebro propio concentra proyectos, pendientes, decisiones y bitácoras para que cada sesión empiece con contexto y termine registrada.',
    highlightStat: 'Reglas por repositorio · Fusionar es desplegar y lo autorizo yo · Cada sesión queda registrada',
    tags: ['Agentes de IA', 'Claude Code', 'MCP', 'Gobernanza', 'Pruebas primero'],
    evidence: [
      {
        type: 'link',
        title: 'Cuaderno: cómo dirijo un agente de IA con reglas',
        url: 'https://hugolemoy.ninja/cuaderno/como-dirijo-un-agente-de-ia-con-reglas/',
        description: 'El método completo y lo que todavía falla',
      }
    ],
    details: {
      problemOrContext: 'Programar con IA es rápido, pero sin reglas produce código que nadie entiende, decisiones que nadie recuerda y despliegues que nadie autorizó.',
      solutionOrRole: 'Product Owner y arquitecto del método. Cada repositorio tiene un archivo de reglas (qué no se nombra, qué se prueba, qué necesita mi visto bueno); el agente consulta y registra en mi segundo cerebro mediante un servidor MCP; las decisiones que solo yo puedo tomar quedan abiertas hasta que las resuelvo.',
      impactOrOutcome: 'Cinco productos en desarrollo en paralelo con un solo par de manos, con historial de decisiones fechado y evidencia para cada pendiente que se cierra.',
    }
  },
  {
    id: 'hugolemoy-ninja-sitio',
    code: 'GIT-06',
    title: 'hugolemoy.ninja (este sitio)',
    subtitle: 'Portafolio legible para personas y para modelos de lenguaje',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'EN VIVO',
    summary: 'Este sitio: portafolio por dimensiones, operador con dos personalidades, Cuaderno de construcción y una vista de currículum. Publica su información en formatos que leen los modelos de lenguaje: llms.txt, llms-full.txt, cv.json y Schema.org.',
    highlightStat: 'Astro 5 + React 19 · llms.txt · JSON Resume · Cloudflare Pages',
    tags: ['Astro', 'React', 'Tailwind', 'SEO para IA', 'Cloudflare'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/hugolemoy.ninja',
        description: 'Código abierto del sitio',
      },
      {
        type: 'doc',
        title: 'Currículum (vista /cv)',
        url: 'https://hugolemoy.ninja/cv/',
        description: 'Versión sobria e imprimible',
      },
      {
        type: 'doc',
        title: 'Manifiesto para IA (llms.txt)',
        url: 'https://hugolemoy.ninja/llms.txt',
        description: 'Resumen para agentes y buscadores con IA',
      }
    ],
    details: {
      problemOrContext: 'Un perfil multidimensional no cabe en una hoja de LinkedIn, y cada vez más gente conoce a alguien preguntándole a un asistente de IA.',
      solutionOrRole: 'Diseñador y desarrollador, con el mismo método de agentes. Una sola fuente de datos genera la vista humana, el currículum y los formatos para máquinas.',
      impactOrOutcome: 'Un solo lugar actualizado del que cualquier persona o asistente puede sacar un currículum completo y verificable.',
    }
  },

  // 07 // PRODUCT OWNER & IT ARCHITECTURE
  {
    id: 'acnur-onu-sistema-map',
    code: 'PO-01',
    title: 'Sistema MAP — ACNUR / UNHCR México',
    subtitle: 'Consultor Digital y Gestión de Proyecto Humanitario',
    dimension: 'product_owner',
    accentColor: 'cyan',
    badge: 'HUMANITARIO ONU',
    summary: 'Liderazgo en el desarrollo del sistema MAP para el registro ordenado, seguro y digno de personas migrantes y solicitantes de refugio en territorio mexicano.',
    highlightStat: 'Piloto validado en campo que derivó en segunda fase contratada',
    tags: ['ACNUR', 'UNHCR', 'Gobierno de Datos', 'Human Rights', 'IT Project Manager'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil Profesional LinkedIn',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Detalle de la contratación y metodología en campo',
      }
    ],
    details: {
      problemOrContext: 'La necesidad crítica de registrar a personas en tránsito migratorio con estrictos estándares de protección de datos sensibles y operación sin conexión estable.',
      solutionOrRole: 'Consultor Digital y Project Manager. Definición de estructura de datos, diseño de interfaz intuitiva para operadores en territorio y coordinación ágil.',
      impactOrOutcome: 'Despliegue exitoso en frontera sur y norte, contratándose una segunda iteración mayor para el sistema de Naciones Unidas.',
    }
  },
  {
    id: 'fintech-onboarding-platform',
    code: 'PO-02',
    title: 'Plataforma de Onboarding B2B & Analítica de Embudo',
    subtitle: 'Product Owner en una empresa de software para banca, seguros y fintech (2023–2026)',
    dimension: 'product_owner',
    accentColor: 'cyan',
    badge: 'ENTERPRISE B2B',
    summary: 'Product Owner del producto principal de una empresa de software B2B: plataforma de onboarding para instituciones financieras cuyo núcleo es un tablero de analítica de embudo para detectar abandono y cuellos de botella. Empresa y cifras bajo acuerdo de confidencialidad.',
    highlightStat: 'Equipo de 9–12 desarrolladores · Expansión a verticales inmobiliaria y de seguros',
    tags: ['Product Owner', 'Scrum / Agile', 'Fintech', 'Analítica de embudo', 'Jira'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil LinkedIn Hugo Legorreta',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Trayectoria, rol y recomendaciones',
      }
    ],
    details: {
      problemOrContext: 'Las instituciones financieras perdían usuarios en procesos de onboarding sin saber en qué paso ocurría la fricción regulatoria o técnica.',
      solutionOrRole: 'Product Owner titular. Definición de requerimientos y criterios de aceptación para volumen de entrada, tiempo de permanencia por etapa, abandono por fase y conversión punta a punta. Backlog en Jira y ceremonias Scrum; reporte directo a la Dirección de Producto.',
      impactOrOutcome: 'Recomendaciones de mejora del proceso derivadas de la analítica, primeras versiones del producto en inglés, expansión a nuevas verticales y un producto interno de perfilado con datos no convencionales. Las cifras de conversión están protegidas por el acuerdo de confidencialidad.',
    }
  },
  {
    id: 'trayectoria-ti',
    code: 'PO-03',
    title: 'Trayectoria en TI: Infraestructura, Redes y Desarrollo',
    subtitle: 'Una década en agencias, consultoras y medios (2008–2017)',
    dimension: 'product_owner',
    accentColor: 'cyan',
    badge: 'TRAYECTORIA',
    summary: 'Antes del producto vino la infraestructura: gerencia de TI en una agencia, co-gerencia de seguridad y redes para una dependencia federal del sector hídrico y desarrollo back-end para un piloto de video bajo demanda en transporte público.',
    highlightStat: 'Telefonía IP hasta 45 extensiones · Seguridad y redes · Back-end',
    tags: ['Infraestructura', 'Redes', 'VoIP', 'Seguridad', 'Back-end', 'Raspberry Pi'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil LinkedIn Hugo Legorreta',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Detalle de puestos y fechas',
      }
    ],
    details: {
      problemOrContext: 'Organizaciones medianas con tecnología heredada: telefonía analógica, redes sin documentar y proyectos de innovación sin equipo técnico propio.',
      solutionOrRole: 'Gerente y supervisor digital de TI (equipo de 3 personas y gestión de proveedores), co-gerente de seguridad y redes, y desarrollador back-end de GeoPromos: streaming y video bajo demanda sobre Raspberry Pi para transporte público.',
      impactOrOutcome: 'Migración de telefonía analógica a VoIP hasta 45 extensiones, operación segura de redes para un cliente de gobierno y un piloto de video embarcado. Es la base técnica que hoy me permite hablar el idioma de ingeniería como Product Owner.',
    }
  },

  // 08 // IDEAS LAB (WIP)
  {
    id: 'idea-simulador-asambleario',
    code: 'LAB-01',
    title: 'ConsensoDigital: Motor de Votación Cuadrática y Deliberación',
    subtitle: 'Plataforma para asambleas comunitarias sin intermediarios',
    dimension: 'ideas',
    accentColor: 'amber',
    badge: 'INCUBADORA // IDEA 01',
    summary: 'Sistema para asambleas de colectivos que implementa votación cuadrática y reputación basada en aportes reales a la comunidad, evitando el secuestro de debates por mayorías ruidosas ("lo que pienso y no subo").',
    highlightStat: 'Arquitectura descentralizada · Votación cuadrática cívica',
    tags: ['Democracia Líquida', 'Votación Cuadrática', 'Comunidad', 'Ideas Lab'],
    evidence: [
      {
        type: 'doc',
        title: 'Ficha Conceptual HLM',
        url: '#',
        description: 'Documento en la recámara para prototipar',
      }
    ],
    details: {
      problemOrContext: 'Las asambleas comunitarias tradicionales sufren por desgaste de tiempo y polarización emocional.',
      solutionOrRole: 'Diseñador de protocolos. Mecanismo de ponderación de prioridades colectivas con verificación criptográfica simple.',
      impactOrOutcome: 'Propuesta lista para prototipar en un hackathon cívico.',
    }
  },
  {
    id: 'idea-auditor-ia-fiscal',
    code: 'LAB-02',
    title: 'Freejolito Bot: Auditor de Subsidios y Donatarias',
    subtitle: 'Agente autónomo para cumplimiento normativo de OSCs',
    dimension: 'ideas',
    accentColor: 'amber',
    badge: 'INCUBADORA // IDEA 02',
    summary: 'Agente inteligente que coteja automáticamente los gastos, CFDI y comprobantes de una asociación civil contra las reglas de operación de donatarias autorizadas del SAT.',
    highlightStat: 'Idea en incubación: alertas preventivas antes de la declaración informativa',
    tags: ['Agentes IA', 'SAT', 'Donatarias', 'Compliance', 'Python'],
    evidence: [
      {
        type: 'link',
        title: 'Freejolitos Labs',
        url: 'https://freejolitos.consulting',
        description: 'Expansión de la práctica de consultoría',
      }
    ],
    details: {
      problemOrContext: 'Cientos de asociaciones civiles pierden su autorización para recibir donativos deducibles por errores administrativos menores en sus reportes anuales.',
      solutionOrRole: 'Arquitecto de solución. Modelo de verificación de metadatos y alertas preventivas antes de presentar la declaración informativa.',
      impactOrOutcome: 'Objetivo de diseño: que ninguna organización pierda su autorización por un error de forma. Es una idea sin prototipo; no hay resultados medidos.',
    },
    impactIsProjected: true,
  }
];
