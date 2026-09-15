/**
 * APEX OBSIDIAN | Paint Correction Simulator, Ultrasonic Vehicle Inspector & ROI Engine
 * assets/js/simulator.js
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Interactive Paint Correction & Ceramic Coating Simulator
  // =========================================================================
  function initPaintSimulator() {
    const canvas = document.getElementById('paintSimCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 340);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 340;
        drawCanvas();
      }
    });

    let currentDefect = 'swirls'; // 'swirls', 'holograms', 'scratches', 'etching', 'oxidation'
    let currentStage = 0; // 0: Raw defect, 1: Rotary Cut, 2: DA Polish, 3: 10H Ceramic Shield
    let isPolishing = false;
    let particles = [];

    // Defect definitions
    const defectConfigs = {
      swirls: { name: 'Spiderweb Swirl Marks', baseGloss: 42, baseMicrons: 135, desc: 'Rotary buffer scuffs & improper wash grit scratching.' },
      holograms: { name: 'Buffer Hologram Trails', baseGloss: 51, baseMicrons: 132, desc: 'High-speed rotary scouring creating 3D hologram mirages.' },
      scratches: { name: '2000-Grit Sanding Scratches', baseGloss: 38, baseMicrons: 134, desc: 'Linear clear coat scratches requiring multi-step compounding.' },
      etching: { name: 'Acid Rain & Bird Dropping Etch', baseGloss: 45, baseMicrons: 136, desc: 'Corrosive chemical craters embedded into porous clear coat.' },
      oxidation: { name: 'Severe UV Paint Oxidation', baseGloss: 34, baseMicrons: 130, desc: 'Chalky sun-damaged microscopic surface failure.' }
    };

    function updateTelemetry() {
      const config = defectConfigs[currentDefect];
      let gloss = config.baseGloss;
      let microns = config.baseMicrons;

      if (currentStage === 1) {
        gloss = 74;
        microns -= 2.2;
      } else if (currentStage === 2) {
        gloss = 89;
        microns -= 3.1;
      } else if (currentStage === 3) {
        gloss = 99.8;
        microns += 3.5; // + Ceramic build layer!
      }

      const glossEl = document.getElementById('simGlossValue');
      const glossBar = document.getElementById('simGlossBar');
      const micronEl = document.getElementById('simMicronValue');
      const micronBar = document.getElementById('simMicronBar');
      const defectLabel = document.getElementById('simDefectLabel');

      if (glossEl) glossEl.textContent = `${gloss.toFixed(1)} GU`;
      if (glossBar) glossBar.style.width = `${Math.min(100, (gloss / 100) * 100)}%`;
      if (micronEl) micronEl.textContent = `${microns.toFixed(1)} μm`;
      if (micronBar) micronBar.style.width = `${Math.min(100, (microns / 160) * 100)}%`;
      if (defectLabel) defectLabel.textContent = config.name;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          radius: Math.random() * 2 + 1,
          alpha: 1,
          color: currentStage === 3 ? '#00f0ff' : '#d4af37'
        });
      }
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Obsidian Automotive Metallic Base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (currentStage === 3) {
        bgGrad.addColorStop(0, '#020305');
        bgGrad.addColorStop(0.5, '#060a12');
        bgGrad.addColorStop(1, '#020305');
      } else if (currentStage === 0 && currentDefect === 'oxidation') {
        bgGrad.addColorStop(0, '#1c1f26');
        bgGrad.addColorStop(1, '#11141a');
      } else {
        bgGrad.addColorStop(0, '#090a0f');
        bgGrad.addColorStop(1, '#050608');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Metallic Paint Flakes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < 150; i++) {
        const fx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
        const fy = (Math.cos(i * 33) * 0.5 + 0.5) * height;
        ctx.fillRect(fx, fy, 1.2, 1.2);
      }

      // 3. Render Optical Light Spot & Reflections
      const lightGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 180);
      if (currentStage === 3) {
        lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        lightGrad.addColorStop(0.1, 'rgba(0, 240, 255, 0.6)');
        lightGrad.addColorStop(0.4, 'rgba(0, 240, 255, 0.15)');
        lightGrad.addColorStop(1, 'transparent');
      } else {
        lightGrad.addColorStop(0, 'rgba(255, 235, 180, 0.85)');
        lightGrad.addColorStop(0.2, 'rgba(212, 175, 55, 0.35)');
        lightGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Render Paint Defects if not fully coated
      if (currentStage < 3) {
        ctx.save();
        if (currentDefect === 'swirls') {
          // Circular spiderweb swirls around optical focal point
          const swirlCount = currentStage === 0 ? 90 : currentStage === 1 ? 25 : 6;
          const alpha = currentStage === 0 ? 0.45 : currentStage === 1 ? 0.2 : 0.08;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;

          for (let i = 0; i < swirlCount; i++) {
            const angle = (i / swirlCount) * Math.PI * 2;
            const r = 40 + (i % 12) * 12;
            ctx.beginPath();
            ctx.arc(width / 2 + Math.cos(angle) * 15, height / 2 + Math.sin(angle) * 15, r, angle, angle + Math.PI * 1.3);
            ctx.stroke();
          }
        } else if (currentDefect === 'holograms') {
          // 3D Buffer trail lines
          const trailCount = currentStage === 0 ? 40 : currentStage === 1 ? 15 : 3;
          ctx.strokeStyle = `rgba(212, 175, 55, ${currentStage === 0 ? 0.5 : 0.15})`;
          ctx.lineWidth = 1.5;
          for (let i = 0; i < trailCount; i++) {
            ctx.beginPath();
            const y = (i / trailCount) * height;
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(width * 0.3, y - 40, width * 0.7, y + 40, width, y);
            ctx.stroke();
          }
        } else if (currentDefect === 'scratches') {
          // Jagged linear scratches
          const count = currentStage === 0 ? 30 : currentStage === 1 ? 8 : 2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentStage === 0 ? 0.6 : 0.2})`;
          ctx.lineWidth = 1.2;
          for (let i = 0; i < count; i++) {
            const sx = (i * 37) % width;
            const sy = (i * 29) % height;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + 60, sy + 30);
            ctx.stroke();
          }
        } else if (currentDefect === 'etching') {
          // Acid rain micro craters
          const count = currentStage === 0 ? 50 : currentStage === 1 ? 12 : 2;
          ctx.fillStyle = `rgba(255, 200, 200, ${currentStage === 0 ? 0.4 : 0.1})`;
          for (let i = 0; i < count; i++) {
            const ex = (i * 43) % width;
            const ey = (i * 31) % height;
            ctx.beginPath();
            ctx.arc(ex, ey, 4 + (i % 5), 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (currentDefect === 'oxidation') {
          // Chalky milky haze layer
          ctx.fillStyle = `rgba(200, 210, 220, ${currentStage === 0 ? 0.35 : currentStage === 1 ? 0.12 : 0.03})`;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();
      }

      // 5. If Stage 3: Supercar Mirror Finish Specular Reflection
      if (currentStage === 3) {
        // High-gloss sharp studio light tube reflection
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height * 0.25);
        ctx.lineTo(width, height * 0.45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 12;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 25;
        ctx.stroke();
        ctx.restore();
      }

      // 6. Draw Polishing Machine Particles
      if (particles.length > 0) {
        particles.forEach((p, idx) => {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.02;

          if (p.alpha <= 0) {
            particles.splice(idx, 1);
          }
        });
        ctx.globalAlpha = 1;
      }

      if (isPolishing) {
        requestAnimationFrame(drawCanvas);
      }
    }

    // Event Bindings
    document.querySelectorAll('.defect-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.defect-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDefect = chip.getAttribute('data-defect');
        currentStage = 0;
        updateStageButtons();
        updateTelemetry();
        drawCanvas();
      });
    });

    function updateStageButtons() {
      document.querySelectorAll('.stage-btn').forEach((btn, idx) => {
        if (idx === currentStage) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    document.querySelectorAll('.stage-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        currentStage = idx;
        updateStageButtons();
        updateTelemetry();

        // Trigger particle animation & audio
        createParticles();
        isPolishing = true;

        if (window.ApexAudio) {
          if (idx === 3) {
            window.ApexAudio.playCureChime();
          } else if (idx > 0) {
            window.ApexAudio.playPolisher();
          }
        }

        drawCanvas();
        setTimeout(() => {
          isPolishing = false;
        }, 1200);
      });
    });

    updateTelemetry();
    drawCanvas();
  }

  // =========================================================================
  // 2. Interactive 48-Point Paint Depth Vehicle Inspector
  // =========================================================================
  function initVehicleInspector() {
    const nodes = document.querySelectorAll('.panel-node');
    if (!nodes.length) return;

    const panelData = {
      hood: { name: 'Front Carbon/Alloy Hood', depth: 124.5, clearcoat: 48, base: 38, primer: 28, status: 'Factory Nominal', passes: '1-Step Finishing Polish' },
      roof: { name: 'Panoramic Roof Clear Section', depth: 118.0, clearcoat: 44, base: 36, primer: 28, status: 'Optimal Depth', passes: '2-Stage Microfiber Cut & Polish' },
      fender_l: { name: 'Front Left Fender (Driver)', depth: 96.5, clearcoat: 31, base: 35, primer: 22, status: 'Caution: Thin Clear', passes: 'Ultra-Fine Finishing Foam Only' },
      fender_r: { name: 'Front Right Fender (Pass.)', depth: 128.2, clearcoat: 51, base: 37, primer: 30, status: 'High Clear Reserve', passes: 'Full 3-Stage Heavy Wool Correction' },
      door_l: { name: 'Driver Side Door Panel', depth: 121.0, clearcoat: 46, base: 37, primer: 28, status: 'Factory Nominal', passes: '2-Stage Paint Enhancement' },
      door_r: { name: 'Passenger Side Door Panel', depth: 122.8, clearcoat: 47, base: 37, primer: 28, status: 'Factory Nominal', passes: '2-Stage Paint Enhancement' },
      quarter_l: { name: 'Rear Left Quarter Arch', depth: 114.2, clearcoat: 42, base: 36, primer: 26, status: 'Factory Nominal', passes: '2-Stage Optical Correction' },
      bumper_f: { name: 'Front Aerodynamic Nosecone', depth: 138.0, clearcoat: 58, base: 40, primer: 30, status: 'Repaint / High Mil', passes: 'PPF Prep + 10H Ceramic Seal' }
    };

    function selectPanel(panelKey) {
      const data = panelData[panelKey] || panelData.hood;

      nodes.forEach(n => {
        if (n.getAttribute('data-panel') === panelKey) {
          n.classList.add('active');
        } else {
          n.classList.remove('active');
        }
      });

      const titleEl = document.getElementById('inspectorPanelTitle');
      const depthEl = document.getElementById('inspectorDepthValue');
      const statusEl = document.getElementById('inspectorStatusBadge');
      const passesEl = document.getElementById('inspectorPassesValue');
      const clearEl = document.getElementById('inspectorClearMicrons');
      const baseEl = document.getElementById('inspectorBaseMicrons');
      const primerEl = document.getElementById('inspectorPrimerMicrons');

      if (titleEl) titleEl.textContent = data.name;
      if (depthEl) depthEl.textContent = `${data.depth.toFixed(1)} μm`;
      if (statusEl) {
        statusEl.textContent = data.status;
        statusEl.className = data.depth < 100 ? 'badge badge-gold' : 'badge badge-cyan';
      }
      if (passesEl) passesEl.textContent = data.passes;
      if (clearEl) clearEl.textContent = `${data.clearcoat} μm`;
      if (baseEl) baseEl.textContent = `${data.base} μm`;
      if (primerEl) primerEl.textContent = `${data.primer} μm`;
    }

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const panelKey = node.getAttribute('data-panel');
        selectPanel(panelKey);
        if (window.ApexAudio) window.ApexAudio.playClick();
      });
    });

    selectPanel('hood');
  }

  // =========================================================================
  // 3. Longevity & ROI Cost Comparison Engine
  // =========================================================================
  function initRoiCalculator() {
    const yearsSlider = document.getElementById('roiYearsSlider');
    if (!yearsSlider) return;

    function updateRoi() {
      const years = parseInt(yearsSlider.value, 10);
      const yearsDisplay = document.getElementById('roiYearsDisplay');
      if (yearsDisplay) yearsDisplay.textContent = `${years} ${years === 1 ? 'Year' : 'Years'}`;

      // Annual Traditional Detailing & Waxing: $720/year + $450 paint decontamination = $1,170/yr
      const waxCost = years * 1150;
      // Apex Ceramic 10H: One-time $1,290 + $120 annual inspection refresh
      const ceramicCost = 1290 + (years - 1) * 120;
      const totalSavings = waxCost - ceramicCost;
      const hoursSaved = years * 38; // 38 hours of hand-waxing/cleaning avoided per year
      const equityProtected = Math.min(5500, years * 750);

      const waxEl = document.getElementById('roiWaxCost');
      const ceramicEl = document.getElementById('roiCeramicCost');
      const savingsEl = document.getElementById('roiTotalSavings');
      const hoursEl = document.getElementById('roiHoursSaved');
      const equityEl = document.getElementById('roiEquityProtected');

      if (waxEl) waxEl.textContent = `$${waxCost.toLocaleString()}`;
      if (ceramicEl) ceramicEl.textContent = `$${ceramicCost.toLocaleString()}`;
      if (savingsEl) savingsEl.textContent = `$${totalSavings.toLocaleString()}`;
      if (hoursEl) hoursEl.textContent = `${hoursSaved} hrs`;
      if (equityEl) equityEl.textContent = `+$${equityProtected.toLocaleString()}`;
    }

    yearsSlider.addEventListener('input', updateRoi);
    updateRoi();
  }

  // Expose
  window.ApexSimulators = {
    initPaintSimulator,
    initVehicleInspector,
    initRoiCalculator
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPaintSimulator();
    initVehicleInspector();
    initRoiCalculator();
  });
})();
