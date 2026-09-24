class CyberAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted && !this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tactical click / blip
  public playClick(pitch: number = 800) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch / 2, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Node select / confirm chord
  public playNodeSelect(accent: 'cyan' | 'green' | 'amber' = 'cyan') {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const baseFreq = accent === 'amber' ? 520 : accent === 'green' ? 620 : 740;

    try {
      [baseFreq, baseFreq * 1.5].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.03);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.03 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.03);
        osc.stop(this.ctx.currentTime + i * 0.03 + 0.13);
      });
    } catch {
      // Fail silently
    }
  }

  // AI Typing chirp
  public playTypingChirp() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 1200 + Math.random() * 400;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {
      // Fail silently
    }
  }

  // Aerodynamic Shuriken rotation sweep
  public playShurikenWhoosh() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.65);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.65);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    } catch {
      // Fail silently
    }
  }

  // Smooth Holographic Construction & Scanning Drone (1.2s to 1.5s glide)
  public playHoloRepaint(duration: number = 1.3) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Harmonic fifth: 330Hz (E4) and 495Hz (B4) ascending smoothly
      osc1.frequency.setValueAtTime(330, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(550, this.ctx.currentTime + duration);

      osc2.frequency.setValueAtTime(495, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(825, this.ctx.currentTime + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1600, this.ctx.currentTime + duration * 0.7);

      // Smooth fade-in, sustain, and graceful release
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime + duration * 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + duration + 0.05);
      osc2.stop(this.ctx.currentTime + duration + 0.05);
    } catch {
      // Fail silently
    }
  }

  // Ghost Dive Boot Glitch Arpeggio
  public playBootGlitch() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [220, 440, 660, 880, 1760];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.035, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.13);
      });
    } catch {
      // Fail silently
    }
  }

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }
}

export const cyberAudio = new CyberAudioSynthesizer();
