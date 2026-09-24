import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

export const CyberTerminalModal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'boot-0',
      command: 'sys.init',
      output: (
        <div className="text-cyber-textMuted space-y-1">
          <p className="text-matrix-green">✓ HUGOSYSTEM_OS KERNEL LOADED [2026.09]</p>
          <p className="text-gits-cyan">✓ NEURAL MATRIX: SYNCHRONIZED WITH HUGO LEGORETTA MOYSÉN (HLM)</p>
          <p>Escribe <span className="text-amberGold font-bold">help</span> para comandos disponibles o <span className="text-matrix-green font-bold">llms</span> para el manifiesto de IA.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-cyber-textBright">
            <p className="text-matrix-green font-bold">Comandos disponibles en HUGOSYSTEM:</p>
            <p><span className="text-gits-cyan font-semibold">bio</span> — Resumen ejecutivo de Hugo Legorreta</p>
            <p><span className="text-gits-cyan font-semibold">weedtown</span> — Plataforma autónoma y soberana weedtown.social</p>
            <p><span className="text-gits-cyan font-semibold">freejolitos</span> — Detalle de servicios y tarifas para OSCs</p>
            <p><span className="text-gits-cyan font-semibold">gamedev</span> — Trayectoria en videojuegos y Game Jams</p>
            <p><span className="text-gits-cyan font-semibold">cnnn</span> — Cannabis Network News Now y acervo audiovisual</p>
            <p><span className="text-gits-cyan font-semibold">github</span> — Lista de proyectos y repositorios de código</p>
            <p><span className="text-gits-cyan font-semibold">stack</span> — Competencias técnicas y metodológicas</p>
            <p><span className="text-gits-cyan font-semibold">llms</span> — Manifiesto estructurado para Agentes de IA (/llms.txt)</p>
            <p><span className="text-gits-cyan font-semibold">contact</span> / <span className="text-gits-cyan font-semibold">redes</span> — Vías de contacto y redes oficiales</p>
            <p><span className="text-gits-cyan font-semibold">clear</span> — Limpiar pantalla de terminal</p>
          </div>
        );
        break;

      case 'bio':
        response = (
          <div className="space-y-2 text-cyber-textBright">
            <p className="text-gits-cyan font-bold">Hugo Legorreta Moysén (HLM):</p>
            <p>Product Owner & Consultor Tecnológico con más de 10 años en tecnología y perfil híbrido técnico-negocio. Creador de contenido digital, activista cannábico en La Comuna 420 (#Capital420 / Senado), desarrollador de videojuegos (*Legalízala Tycoon*, *bit2fit* en GGJ) y fundador de Freejolitos Consultores.</p>
            <p className="text-xs text-cyber-textMuted">Base: CDMX, México · Inglés B2 · Práctica independiente y consultoría.</p>
          </div>
        );
        break;

      case 'weedtown':
        response = (
          <div className="space-y-2 text-cyber-textBright">
            <p className="text-emerald-400 font-bold">weedtown.social — Red Social Autónoma & Soberana:</p>
            <p>Plataforma comunitaria creada mediante vibe-coding para zafarse de la censura algorítmica y el shadowban de las Big Tech. Espacio de libre expresión e intercambio cultural y de cultivo.</p>
            <p className="text-xs">Web: <a href="https://weedtown.social" target="_blank" className="underline text-gits-cyan">https://weedtown.social</a> · Repo: <a href="https://github.com/HugoLeMoy47/weedtown_trial_101" target="_blank" className="underline text-matrix-green">github.com/HugoLeMoy47/weedtown_trial_101</a></p>
          </div>
        );
        break;

      case 'freejolitos':
        response = (
          <div className="space-y-2 text-cyber-textBright">
            <p className="text-amberGold font-bold">Freejolitos Consultores (freejolitos.consulting):</p>
            <p>Tecnología, auditoría e IA ética para organizaciones de la sociedad civil (OSC) en México.</p>
            <ul className="list-disc list-inside text-xs space-y-1 text-cyber-textMuted">
              <li><strong className="text-cyber-textBright">Diagnóstico y ruta crítica:</strong> $16,704 MXN (tarifa institucional).</li>
              <li><strong className="text-cyber-textBright">Acompañamiento mensual:</strong> desde $8,120 MXN al mes.</li>
              <li><strong className="text-cyber-textBright">Desarrollo a la medida:</strong> bajo cotización por proyecto.</li>
              <li><strong className="text-amberGold">Política de IA:</strong> "Uso inteligencia artificial, y lo digo. Nunca con datos de beneficiarios."</li>
            </ul>
            <p className="text-xs">Web: <a href="https://freejolitos.consulting" target="_blank" className="underline text-gits-cyan">freejolitos.consulting</a> · WhatsApp: +52 55 3344 4852</p>
          </div>
        );
        break;

      case 'gamedev':
        response = (
          <div className="space-y-2 text-cyber-textBright">
            <p className="text-matrix-green font-bold">Ecosistema GameDev & Serious Games:</p>
            <p>• <strong className="text-gits-cyan">Legalízala Tycoon:</strong> Serious game en TypeScript. Simulación legislativa ciudadana (de cabildo al DOF).</p>
            <p>• <strong className="text-gits-cyan">bit2fit:</strong> Global Game Jam 2020 en Godot Engine / GDScript.</p>
            <p>• <strong className="text-gits-cyan">canna-gochi:</strong> Mascota virtual y simulador de cuidado botánico en TypeScript.</p>
            <p>• <strong className="text-gits-cyan">Big-Monster:</strong> Producción de videojuegos con ONU Mujeres, SACMEX y Fundación Río Arronte.</p>
          </div>
        );
        break;

      case 'cnnn':
        response = (
          <div className="space-y-2 text-cyber-textBright">
            <p className="text-matrix-green font-bold">CNNN (Cannabis Network News Now):</p>
            <p>Programa de noticias, análisis legislativo y entrevistas a actores de la industria cannábica conducido por Hugo Legorreta Moysén.</p>
            <p className="text-xs">Playlist oficial en YouTube: <a href="https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7" target="_blank" className="underline text-gits-cyan">Ver episodios</a></p>
          </div>
        );
        break;

      case 'github':
        response = (
          <div className="space-y-1 text-cyber-textBright text-xs">
            <p className="text-gits-cyan font-bold">Repositorios públicos en @HugoLeMoy47:</p>
            <p>1. <span className="text-matrix-green">weedtown_trial_101</span> — Red social cannábica con vibe-coding.</p>
            <p>2. <span className="text-matrix-green">LegalizalaTycoon</span> — Simulador legislativo en TypeScript.</p>
            <p>3. <span className="text-matrix-green">canna-gochi</span> — Experimento de mascota virtual.</p>
            <p>4. <span className="text-matrix-green">freejolitosConsultingWeb</span> — Sitio web institucional.</p>
            <p>5. <span className="text-matrix-green">cafemin-task-tracker</span> — Gestor para albergue migrante CAFEMIN.</p>
            <p>6. <span className="text-matrix-green">CalculadoraWebRegresLineal</span> — Calculadora estadística web.</p>
            <p>7. <span className="text-matrix-green">descargador_facturas</span> — Script Python de facturación SAT.</p>
          </div>
        );
        break;

      case 'stack':
        response = (
          <div className="space-y-1 text-cyber-textBright text-xs">
            <p className="text-matrix-green font-bold">Competencias Técnicas & Metodológicas:</p>
            <p>• <strong className="text-gits-cyan">Producto & Datos:</strong> Backlog Jira, embudos de conversión, analítica de onboarding, CMMI, ITIL.</p>
            <p>• <strong className="text-gits-cyan">Metodologías:</strong> Scrum Master, Agile, Kanban, DevOps.</p>
            <p>• <strong className="text-gits-cyan">Lenguajes & Código:</strong> TypeScript, JavaScript, Python, Godot GDScript, HTML5/CSS3, SQL, C#.</p>
            <p>• <strong className="text-gits-cyan">Infraestructura:</strong> Cloudflare Pages, Linux, Redes IP, VoIP, Google Workspace Admin.</p>
          </div>
        );
        break;

      case 'llms':
        response = (
          <div className="space-y-1 text-xs text-matrix-green bg-cyber-void/80 p-2 rounded border border-matrix-green/30">
            <p className="font-bold"># hugolemoy.ninja LLMs Manifest</p>
            <p>&gt; Titular: Hugo Legorreta Moysén (HLM)</p>
            <p>&gt; Roles: Product Owner | Consultor Tecnológico | Creador de Contenido Digital | Desarrollador de Videojuegos | La Comuna 420</p>
            <p>&gt; Repositorio: github.com/HugoLeMoy47</p>
            <p>&gt; Consultoría: freejolitos.consulting</p>
            <p className="text-gits-cyan">Endpoint completo disponible en: /llms.txt</p>
          </div>
        );
        break;

      case 'contact':
      case 'redes':
      case 'social':
        response = (
          <div className="space-y-1 text-cyber-textBright text-xs">
            <p className="text-amberGold font-bold">Directorio de Contacto & Canales Oficiales:</p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/hugolegorretamoysen/" target="_blank" className="text-gits-cyan underline">in/hugolegorretamoysen</a></p>
            <p>• Facebook: <a href="https://www.facebook.com/HugoLeMoy" target="_blank" className="text-gits-cyan underline">facebook.com/HugoLeMoy</a></p>
            <p>• X (Twitter): <a href="https://x.com/HugoLeMoy" target="_blank" className="text-gits-cyan underline">@HugoLeMoy</a></p>
            <p>• Instagram: <a href="https://www.instagram.com/hugolemoy" target="_blank" className="text-gits-cyan underline">@hugolemoy</a></p>
            <p>• GitHub: <a href="https://github.com/HugoLeMoy47" target="_blank" className="text-matrix-green underline">@HugoLeMoy47</a></p>
            <p>• weedtown: <a href="https://weedtown.social" target="_blank" className="text-emerald-400 underline">weedtown.social</a></p>
            <p>• WhatsApp: <a href="https://wa.me/525533444852" target="_blank" className="text-matrix-green underline">+52 55 3344 4852</a></p>
            <p>• Correo Personal: <a href="mailto:hugo.legorreta@gmail.com" className="text-gits-cyan underline">hugo.legorreta@gmail.com</a></p>
            <p>• Consultoría: <a href="mailto:hola@freejolitos.consulting" className="text-gits-cyan underline">hola@freejolitos.consulting</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        response = (
          <p className="text-red-400">
            Comando no reconocido: '{trimmed}'. Escribe <span className="text-amberGold font-bold">help</span> para ver la lista de comandos válidos.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        output: response,
      },
    ]);
    setInputVal('');
  };

  const handleCopyBio = () => {
    navigator.clipboard.writeText("Hugo Legorreta Moysén — Product Owner, Consultor Tecnológico, Creador de Contenido Digital & Desarrollador de Videojuegos. https://hugolemoy.ninja");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cyber-void/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-cyber-card border border-gits-cyan/40 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] box-glow-cyan font-mono text-sm">
        
        {/* Terminal Titlebar */}
        <div className="bg-cyber-void px-4 py-2.5 border-b border-cyber-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-matrix-green" />
            <span className="text-matrix-green font-bold tracking-wider text-xs">
              TERMINAL_CONSTRUCT // HUGOSYSTEM AI CLI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBio}
              className="text-cyber-textMuted hover:text-gits-cyan p-1 text-xs flex items-center gap-1"
              title="Copiar resumen"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-matrix-green" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Copiar</span>
            </button>
            <button
              onClick={onClose}
              className="text-cyber-textMuted hover:text-red-400 p-1"
              title="Cerrar terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen / Logs */}
        <div ref={scrollRef} className="p-4 overflow-y-auto space-y-4 flex-1 bg-cyber-void/95">
          {history.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-cyber-textMuted">
                <span className="text-matrix-green">hlm@matrix:~$</span>
                <span className="text-cyber-textBright font-semibold">{log.command}</span>
              </div>
              <div className="pl-4 text-xs sm:text-sm border-l border-cyber-border">
                {log.output}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="p-3 bg-cyber-card border-t border-cyber-border flex items-center gap-2">
          <span className="text-matrix-green text-xs font-bold">hlm@matrix:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(inputVal);
              }
            }}
            placeholder="escribe un comando (ej: help, freejolitos, gamedev, llms)..."
            className="flex-1 bg-transparent text-cyber-textBright text-xs sm:text-sm focus:outline-none placeholder:text-cyber-textMuted/60"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="text-gits-cyan hover:text-matrix-green p-1"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
