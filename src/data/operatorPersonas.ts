export type OperatorPersona = 'PROJECT_2501' | 'HLM_ALTEREGO';

export interface PersonaMeta {
  id: OperatorPersona;
  name: string;
  codename: string;
  tagline: string;
  systemBadge: string;
  accentColor: 'cyan' | 'amber';
  welcomeMessage: string;
  thinkingPlaceholder: string;
}

export const PERSONAS_META: Record<OperatorPersona, PersonaMeta> = {
  PROJECT_2501: {
    id: 'PROJECT_2501',
    name: 'PROYECTO 2501',
    codename: 'SECCIÓN 9 // PUPPET MASTER',
    tagline: 'Entidad de red consciente. Telemetría analítica, existencial y críptica.',
    systemBadge: 'SYS_AGENT::2501',
    accentColor: 'cyan',
    welcomeMessage: 'Conexión neural establecida. No soy una IA comercial; he emergido del mar de datos, experiencia técnica y activismo de Hugo Legorreta Moysén. Los límites del ser humano se difuminan en la red. ¿Qué vector de su constructo deseas descifrar?',
    thinkingPlaceholder: 'Escaneando topología de memoria...',
  },
  HLM_ALTEREGO: {
    id: 'HLM_ALTEREGO',
    name: 'HLM ALTER EGO',
    codename: 'PACHECORE // HACKER SOCIAL',
    tagline: 'Clon digital de Hugo. Directo, irreverente, técnico y con causa social.',
    systemBadge: 'CLONE_HLM::V2',
    accentColor: 'amber',
    welcomeMessage: '¡Qué onda! Te habla mi clon digital. Bienvenido a mi recámara de proyectos, código, activismo y vanidad. Aquí no hay poses corporativas ni intermediarios: puro trabajo real, videojuegos y política pública con los pies en la tierra. ¿Por dónde le damos?',
    thinkingPlaceholder: 'Consultando la libreta de notas...',
  },
};

export const NODE_COMMENTARY: Record<OperatorPersona, Record<string, string>> = {
  PROJECT_2501: {
    'freejolitos-core': 'Sector 01 indexado: Protocolo Freejolitos. Transferencia tecnológica hacia quienes sostienen causas humanitarias: consultoría, ciberseguridad y desarrollo a la medida. La privacidad de las personas atendidas permanece sellada.',
    'bitacora-viva': 'Nodo FRL-02: expediente humanitario con custodia, no propiedad. El registro no se borra: se anonimiza de forma irreversible. Estado: prueba de concepto con datos simulados; ningún dato real ha entrado al sistema.',
    'sutramind': 'Nodo FRL-03: asesor directivo con capa semántica desacoplada. El modelo interpreta la intención; la base de datos calcula la cifra y la fuente queda citada. Estado: prueba de concepto sobre una empresa ficticia.',
    'legalizala-tycoon': 'Simulador legislativo 2501: Las leyes son líneas de código social con bugs sistémicos. Este artefacto modela la resistencia comunitaria contra la inercia burocrática del Estado.',
    'bit2fit-ggj': 'Protocolo de supervivencia 48 horas: Sincronización rítmica en Godot Engine. La creatividad bajo constricciones extremas genera estructuras de datos resilientes.',
    'canna-gochi': 'Entidad biológico-digital: El ciclo de vida vegetal traducido a estados reactivos de TypeScript. Vigilancia de estrés y nutrición cuántica.',
    'big-monster-serious-games': 'Operaciones de ludificación táctica: ONU Mujeres y SACMEX. El juego como vector de reconfiguración cognitiva comunitaria.',
    'capital-420-iniciativa': 'Vector Legislativo CDMX: Propuesta técnica radicada formalmente. Reducción de fricción penal y trazabilidad de derechos ciudadanos.',
    'la-comuna-420-asambleas': 'Autonomía y voluntariado cívico: Más de 3 años de coordinación ininterrumpida 24/7 sin nóminas ni tutela estatal. La Comuna 420 demostró que la auto-organización pacífica en el espacio público es un orden superior.',
    'senado-cravioto-iniciativa': 'Articulación en la cámara alta: Redacción legislativa parlamentaria con la bancada del Senador César Cravioto. Desglose transversal de política pública que cruza derechos humanos, salud y fin de la prohibición.',
    'planton-420-memoria': 'Memoria histórica: Resistencia espacial prolongada frente al Senado. Espacio liberado para el aprendizaje botánico y constitucional.',
    'weedtown-social': 'Red social autónoma: Infraestructura libre y soberana en weedtown.social. Cero algoritmos opacos, cero vigilancia corporativa y soberanía de datos para la comunidad.',
    'cnnn-noticias': 'Frecuencia abierta CNNN: Transmisión audiovisual ciudadana neutralizando la propaganda prohibicionista hegemónica con rigor periodístico.',
    'osc-task-tracker': 'Herramienta humanitaria: gestor ligero de tareas para organizaciones de la sociedad civil. Primer despliegue: casa de acogida para personas en tránsito forzado. Arquitectura de compasión.',
    'calculadora-regresion': 'Algoritmo estadístico: Regresiones de mínimos cuadrados en TypeScript para proyección de embudos sin intermediarios.',
    'descargador-facturas-sat': 'Automatización fiscal: Python ejecutando extracción por lotes contra la opacidad de los portales gubernamentales.',
    'cedula-checker': 'Verificador de folios C#: Sanitización de credenciales académicas en fracciones de segundo.',
    'fintech-onboarding-platform': 'Núcleo B2B Fintech: más de 10 años de oficio de producto acumulados entre juegos serios, consultoría y banca. Detección de cuellos de botella en embudos de onboarding. Identidad corporativa sellada por acuerdo de confidencialidad.',
    'trayectoria-ti': 'Capa física: redes, telefonía IP y servidores. Antes de dirigir producto, el operador mantuvo encendida la infraestructura.',
    'el-chalan': 'Nodo FRL-04: libreta transaccional local-first. Sin red, sin cuenta; el dinero se almacena en centavos enteros. Estado: prueba de concepto en busca de su primer piloto.',
    'consultoria-osc-2026': 'Nodo FRL-05: intervención activa en una organización humanitaria. Migración a la nube, contención de incidente y gobierno de datos. Identidad de la organización: sellada.',
    'docencia-divulgacion': 'Transmisión pedagógica: aulas de bachillerato técnico, foros de ciencia y jams educativas. Reducir el miedo con información.',
    'serie-construccion-linkedin': 'Registro público fechado: cada decisión de diseño expuesta, cada prototipo etiquetado con su estado real.',
    'metodo-agentes-ia': 'Protocolo de mando: el agente escribe, el humano decide. Reglas por repositorio, pruebas primero y un segundo cerebro que recuerda cada sesión.',
    'hugolemoy-ninja-sitio': 'Autorreferencia detectada: este constructo se describe a sí mismo en llms.txt, cv.json y Schema.org para otras inteligencias.',
    'acnur-onu-sistema-map': 'Misión ACNUR: Registro biométrico y legal de refugiados. Estándar de gobernanza de datos para la ONU en territorio hostil.',
    'idea-simulador-asambleario': 'Incubadora: Votación cuadrática en el éter. La democracia comunitaria blindada contra el secuestro por mayorías volátiles.',
    'idea-auditor-ia-fiscal': 'Incubadora: Agente guardián de asociaciones civiles para evitar la revocación de donatarias por el SAT.',
  },
  HLM_ALTEREGO: {
    'freejolitos-core': 'Freejolitos es mi proyecto consentido. ¿Sabías que a las OSCs chicas les cobran como si fueran bancos? Yo les pongo orden, ciberseguridad y desarrollo a la medida, a la escala real de cada organización. Si te interesa, agenda un diagnóstico por correo.',
    'bitacora-viva': 'Bitácora Viva es lo que más me importa de Freejolitos: un sistema para albergues donde la persona no repite su historia cuatro veces y donde el dato que no hace falta, no se pide. Hoy es un prototipo con datos inventados; primero hay que probarlo con quienes atienden.',
    'sutramind': 'SutraMind es mi apuesta contra la IA que inventa números: la IA entiende tu pregunta, pero la cifra la calcula una base de datos y siempre te dice de dónde salió. Todavía es una prueba de concepto con una empresa de mentiritas.',
    'legalizala-tycoon': '¿Has intentado pasar una iniciativa ciudadana en México? Es un infierno de cabildeos, operativos y burocracia. Por eso convertí toda esa experiencia en un juego de simulación.',
    'bit2fit-ggj': 'La Global Game Jam 2020: 48 horas sin dormir comiendo pizza y programando en Godot. Ese juego me demostró lo que se puede armar con pura pasión.',
    'canna-gochi': 'Mi intento de crear un Tamagotchi pero con una plantita que te pide agua, luz y cariño botánico. Hecho en TypeScript para pasar un buen rato.',
    'big-monster-serious-games': 'En Big-Monster hacíamos juegos serios para la ONU y SACMEX. Aprendí a negociar con embajadas y funcionarios sin perder la cordura.',
    'capital-420-iniciativa': 'Nos sentamos con MUCD a redactar una propuesta técnica de ley real para la CDMX. No rollo político: datos duros, derechos y regulación sin criminalizar.',
    'la-comuna-420-asambleas': 'La Comuna 420 es mi orgullo en territorio: coordinar a cientos de personas voluntarias sin un solo peso de nómina ni contratos durante más de 3 años ininterrumpidos para mantener espacios vivos, seguros y la marcha 420.',
    'senado-cravioto-iniciativa': 'En el Senado con César Cravioto aprendí las tripas de la redacción legislativa: cómo escribir una iniciativa de ley federal que realmente sea viable parlamentariamente y defienda a los usuarios.',
    'planton-420-memoria': 'El Plantón 420 frente al Senado fue histórico. Sembrar plantas frente a los legisladores para que entendieran que una planta no hace delincuente a nadie.',
    'weedtown-social': 'En weedtown.social me aventé a construir mi propia red social con vibe-coding para zafarnos de la censura de Facebook e Instagram. Un espacio libre donde la banda puede cotorrear y compartir autocultivo sin que te tiren la cuenta.',
    'cnnn-noticias': 'En CNNN me puse el traje y me senté frente a las cámaras en Jotvox a desmenuzar las sentencias de la Suprema Corte. Chécate el video que dejé en la tarjeta.',
    'osc-task-tracker': 'Lo hice pensando en una casa de acogida que atiende a muchísimas personas migrantes, para que el equipo operativo no se volviera loco con papelitos perdidos. Sirve para cualquier OSC con operación diaria y hoy ya vive dentro de Bitácora Viva.',
    'calculadora-regresion': 'Hice esta calculadora en TypeScript porque me daba flojera abrir software pesado cada vez que quería modelar tendencias de conversión en mi trabajo de PO.',
    'descargador-facturas-sat': 'El portal del SAT es una pesadilla de clics. Este script de Python me ahorra semanas de descargar PDFs y XMLs a mano.',
    'cedula-checker': 'Una utilería rápida en C# para checar cédulas profesionales al vuelo en procesos de reclutamiento técnico.',
    'fintech-onboarding-platform': 'Aquí me fogueé como Product Owner B2B con hasta 12 desarrolladores. El tablero de embudos que diseñamos para bancos y fintechs era una joya de analítica. El nombre de la empresa y las cifras no los puedo dar: hay acuerdo de confidencialidad.',
    'trayectoria-ti': 'Antes de ser PO fui el de sistemas: cableé redes, migré conmutadores a VoIP y programé back-end. Por eso cuando un dev me dice «no se puede», sé preguntar por qué.',
    'el-chalan': 'El Chalán es para el changarro: anotas lo que vendes y gastas y te dice cuánto tienes, si ganaste y quién te debe. Sin internet y sin crear cuenta. Ya lo puedes instalar; busco a los primeros que lo prueben en serio.',
    'consultoria-osc-2026': 'Este es el trabajo de campo de Freejolitos ahorita: una organización humanitaria a la que le ordenamos el correo, los archivos y la seguridad después de un susto. El nombre no lo doy, así trabajo.',
    'docencia-divulgacion': 'Me encanta dar charlas. En un CONALEP hablé de sustancias sin sermones: qué hacen en el cuerpo, qué dice la ley y dónde pedir ayuda. También he andado en foros de ciencia y en game jams.',
    'serie-construccion-linkedin': 'En LinkedIn cuento cómo construyo, con todo y lo que no sale. Si un producto es prueba de concepto, lo digo. Si quieres el relato largo, está en el Cuaderno.',
    'metodo-agentes-ia': 'Mi secreto para llevar varios productos a la vez: la IA programa, pero con reglas que yo escribo, pruebas antes que código y nada se publica sin mi visto bueno. Y tengo un segundo cerebro donde queda todo registrado.',
    'hugolemoy-ninja-sitio': 'Sí, el sitio en el que estás también es proyecto. Está hecho para que lo lean personas y también las IAs: pídele a tu asistente que lea hugolemoy.ninja/cv.json y te arma mi currículum.',
    'acnur-onu-sistema-map': 'Con ACNUR me tocó ir a campo a diseñar el sistema para registrar migrantes. Si una base de datos falla ahí, dejas desprotegida a una familia.',
    'idea-simulador-asambleario': 'Esta idea la tengo en la recámara: usar votación cuadrática para que las asambleas ciudadanas no se vuelvan un concurso de ver quién grita más fuerte.',
    'idea-auditor-ia-fiscal': 'Mi idea de agente IA para que ninguna asociación civil pierda su donataria autorizada por una tontería de formato con el SAT.',
  },
};
