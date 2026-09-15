/**
 * APEX OBSIDIAN | Pure Web Audio API Sound Engine (assets/js/audio-feedback.js)
 * Synthesizes cleanroom ambient acoustics and interactive UI sound feedback.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isMuted = localStorage.getItem('apex_audio_muted') === 'true';
  let ambientOscillator = null;
  let ambientGain = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Subtle Click / Tap Haptic Sound
  function playClickSound() {
    if (isMuted) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Ignore audio policy blocks
    }
  }

  // 2. Rotary Polisher Motor Spin Sound
  function playPolisherSound() {
    if (isMuted) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}
  }

  // 3. Ceramic Curing Chime
  function playCureChime() {
    if (isMuted) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.07, audioCtx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + i * 0.08);
        osc.stop(audioCtx.currentTime + i * 0.08 + 0.4);
      });
    } catch (e) {}
  }

  // Toggle Mute
  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('apex_audio_muted', isMuted ? 'true' : 'false');
    updateAudioToggleButtons();
    if (!isMuted) {
      playClickSound();
      if (window.showToast) window.showToast('Cleanroom Sound Synthesis Active');
    } else {
      if (window.showToast) window.showToast('Sound Muted');
    }
    return !isMuted;
  }

  function updateAudioToggleButtons() {
    document.querySelectorAll('.audio-toggle-btn').forEach(btn => {
      if (isMuted) {
        btn.classList.add('muted');
        btn.innerHTML = '<i class="ri-volume-mute-line"></i>';
        btn.setAttribute('title', 'Unmute Cleanroom Audio');
      } else {
        btn.classList.remove('muted');
        btn.innerHTML = '<i class="ri-volume-up-line text-gold"></i>';
        btn.setAttribute('title', 'Mute Cleanroom Audio');
      }
    });
  }

  // Attach auto-click sounds to buttons
  function attachSoundListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, .btn, .nav-links a, .defect-chip, .stage-btn, .panel-node, .addon-card');
      if (target && !target.classList.contains('no-sound')) {
        playClickSound();
      }
    });

    document.querySelectorAll('.audio-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMute();
      });
    });

    updateAudioToggleButtons();
  }

  // Expose API
  window.ApexAudio = {
    playClick: playClickSound,
    playPolisher: playPolisherSound,
    playCureChime: playCureChime,
    toggleMute: toggleMute,
    isMuted: () => isMuted
  };

  document.addEventListener('DOMContentLoaded', attachSoundListeners);
})();
