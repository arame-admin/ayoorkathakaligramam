/**
 * Ayroor Kathakali Gramam - Procedural Sacred Temple Soundscape
 * Uses Web Audio API to create authentic, zero-latency meditative temple atmosphere.
 * Includes sacred 108Hz drone, periodic Maddalam heartbeat, and bronze bell resonance.
 */

class TempleSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.heartbeatTimer = null;
    this.bellTimer = null;
    this.toggleBtn = document.getElementById('hero-sound-toggle');

    if (this.toggleBtn) {
      this.initEvents();
    }
  }

  initAudioContext() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  startDrone() {
    if (!this.ctx) return;

    // Sacred dual harmonic drone (108Hz and 162Hz)
    const baseFreqs = [108, 162, 216];
    this.oscillators = [];

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
    droneFilter.connect(this.masterGain);

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow detune wave
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(idx === 0 ? 0.09 : 0.04, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(droneFilter);
      osc.start();

      this.oscillators.push(osc, lfo);
    });

    // Schedule gentle temple maddalam pulse
    this.scheduleDrumPulse();
    // Schedule periodic bronze bell
    this.scheduleBronzeBell();
  }

  triggerDrumPulse() {
    if (!this.ctx || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    const drumOsc = this.ctx.createOscillator();
    const drumGain = this.ctx.createGain();
    const drumFilter = this.ctx.createBiquadFilter();

    drumFilter.type = 'lowpass';
    drumFilter.frequency.setValueAtTime(180, t);

    drumOsc.type = 'sine';
    drumOsc.frequency.setValueAtTime(75, t);
    drumOsc.frequency.exponentialRampToValueAtTime(38, t + 0.35);

    drumGain.gain.setValueAtTime(0.08, t);
    drumGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    drumOsc.connect(drumGain);
    drumGain.connect(drumFilter);
    drumFilter.connect(this.masterGain);

    drumOsc.start(t);
    drumOsc.stop(t + 0.65);
  }

  triggerBronzeBell() {
    if (!this.ctx || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    const freqs = [528, 1056, 1584];

    freqs.forEach((freq, i) => {
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, t);

      const amp = (0.04 / (i + 1));
      bellGain.gain.setValueAtTime(amp, t);
      bellGain.gain.exponentialRampToValueAtTime(0.00005, t + 3.8);

      bellOsc.connect(bellGain);
      bellGain.connect(this.masterGain);

      bellOsc.start(t);
      bellOsc.stop(t + 4.0);
    });
  }

  scheduleDrumPulse() {
    this.heartbeatTimer = setInterval(() => {
      if (this.isPlaying) this.triggerDrumPulse();
    }, 3800);
  }

  scheduleBronzeBell() {
    this.bellTimer = setInterval(() => {
      if (this.isPlaying) this.triggerBronzeBell();
    }, 9500);
  }

  toggle() {
    this.initAudioContext();

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.startDrone();
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.7, this.ctx.currentTime + 1.2);
      this.updateUI(true);
    } else {
      this.isPlaying = false;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      clearInterval(this.heartbeatTimer);
      clearInterval(this.bellTimer);
      this.updateUI(false);
    }
  }

  updateUI(active) {
    if (!this.toggleBtn) return;
    if (active) {
      this.toggleBtn.classList.add('active');
      const label = this.toggleBtn.querySelector('.sound-label');
      if (label) label.textContent = 'SOUND: ON';
    } else {
      this.toggleBtn.classList.remove('active');
      const label = this.toggleBtn.querySelector('.sound-label');
      if (label) label.textContent = 'TEMPLE SOUND';
    }
  }

  initEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }
}

// Auto-initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.templeSoundscape = new TempleSoundscape();
  });
} else {
  window.templeSoundscape = new TempleSoundscape();
}
