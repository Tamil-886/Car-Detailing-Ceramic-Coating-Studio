/**
 * APEX OBSIDIAN | Command Palette Engine (assets/js/command-palette.js)
 * Global Ctrl + K / Cmd + K Spotlight search and quick studio navigation.
 */

(function () {
  'use strict';

  const commands = [
    // Main Pages
    { title: 'Home 1 - Detailing Studio Landing', url: 'index.html', icon: 'ri-home-4-line', category: 'Studio Portals' },
    { title: 'Home 2 - 10H Ceramic Coating Landing', url: 'home-2.html', icon: 'ri-shield-flash-line', category: 'Studio Portals' },
    { title: 'All 11 Detailing Services', url: 'services.html', icon: 'ri-grid-fill', category: 'Services & Science' },
    { title: '10H Diamond Ceramic Coating Spec', url: 'service-details.html?id=ceramic-coating', icon: 'ri-shield-star-line', category: 'Services & Science' },
    { title: '3-Stage Optical Paint Correction', url: 'service-details.html?id=paint-correction', icon: 'ri-magic-line', category: 'Services & Science' },
    { title: 'Bespoke Interior & Alcantara Detail', url: 'service-details.html?id=interior-detailing', icon: 'ri-vip-crown-line', category: 'Services & Science' },
    { title: 'Paint Protection Film (PPF)', url: 'service-details.html?id=ppf', icon: 'ri-file-shield-line', category: 'Services & Science' },
    { title: 'Signature Packages & Comparison Matrix', url: 'packages.html', icon: 'ri-price-tag-3-line', category: 'Pricing & Tiers' },
    { title: 'Draggable Before & After Sliders', url: 'before-after.html', icon: 'ri-contrast-drop-line', category: 'Media & Proof' },
    { title: 'Showroom Supercar Gallery', url: 'gallery.html', icon: 'ri-image-2-line', category: 'Media & Proof' },
    { title: 'Detailing Journal & Surface Science', url: 'blog.html', icon: 'ri-article-line', category: 'Media & Proof' },
    { title: 'Article: Ceramic Coating Myths vs Facts (9H/10H)', url: 'article-details-1.html', icon: 'ri-atom-line', category: 'Journal & Science' },
    { title: 'Article: Optical Clarity & 99+ Gloss Units', url: 'article-details-2.html', icon: 'ri-sparkling-2-line', category: 'Journal & Science' },
    { title: 'Article: Preserving Semi-Aniline Italian Leather', url: 'article-details-3.html', icon: 'ri-vip-crown-line', category: 'Journal & Science' },
    { title: 'Contact Studios (Beverly Hills / Miami)', url: 'contact.html', icon: 'ri-map-pin-line', category: 'Studio Portals' },

    // Dashboard
    { title: 'Customer Dashboard Overview', url: 'dashboard/index.html', icon: 'ri-dashboard-3-line', category: 'Client Portal' },
    { title: 'Live 7-Stage Cleanroom Bay Tracker', url: 'dashboard/services-status.html', icon: 'ri-sparkling-fill', category: 'Client Portal' },
    { title: 'My Reservations & Telemetry', url: 'dashboard/bookings.html', icon: 'ri-calendar-check-line', category: 'Client Portal' },
    { title: 'Personal Transformation Photo Vault', url: 'dashboard/before-after.html', icon: 'ri-gallery-upload-line', category: 'Client Portal' },
    { title: 'Apex Gloss Club Loyalty Rewards', url: 'dashboard/loyalty-points.html', icon: 'ri-copper-diamond-line', category: 'Client Portal' },
    { title: 'Invoices & 7-Year Digital Warranties', url: 'dashboard/invoices.html', icon: 'ri-file-shield-2-line', category: 'Client Portal' },
    { title: 'Client Garage & Vehicle Profile', url: 'dashboard/profile.html', icon: 'ri-car-line', category: 'Client Portal' },
    { title: 'Customer Sign In / Login', url: 'login.html', icon: 'ri-login-box-line', category: 'Authentication' },
    { title: 'Register Garage Account', url: 'register.html', icon: 'ri-user-add-line', category: 'Authentication' },
    { title: 'Sign Out / Logout Session', action: 'logoutUser', icon: 'ri-logout-box-r-line', category: 'Authentication' },

    // Actions
    { title: 'Toggle Light / Dark Theme', action: 'toggleTheme', icon: 'ri-contrast-2-line', category: 'Quick Actions' },
    { title: 'Toggle Cleanroom Audio Sounds', action: 'toggleAudio', icon: 'ri-volume-up-line', category: 'Quick Actions' },
    { title: 'Switch Currency to USD ($)', action: 'setCurrencyUSD', icon: 'ri-money-dollar-circle-fill', category: 'Quick Actions' },
    { title: 'Switch Currency to EUR (€)', action: 'setCurrencyEUR', icon: 'ri-money-euro-circle-line', category: 'Quick Actions' },
    { title: 'Switch Currency to GBP (£)', action: 'setCurrencyGBP', icon: 'ri-money-pound-circle-line', category: 'Quick Actions' },
    { title: 'Switch Currency to INR (₹)', action: 'setCurrencyINR', icon: 'ri-money-rupee-circle-line', category: 'Quick Actions' }
  ];

  let modalEl = null;
  let searchInput = null;
  let resultsContainer = null;
  let activeIndex = 0;
  let filteredCommands = [...commands];

  function createPaletteDOM() {
    if (document.getElementById('commandPaletteBackdrop')) return;

    modalEl = document.createElement('div');
    modalEl.id = 'commandPaletteBackdrop';
    modalEl.className = 'command-palette-backdrop';
    modalEl.innerHTML = `
      <div class="command-palette-dialog">
        <div class="palette-input-wrapper">
          <i class="ri-search-2-line"></i>
          <input type="text" id="paletteSearchInput" class="palette-search-input" placeholder="Search services, packages, simulators, or actions..." autocomplete="off">
          <span class="palette-shortcut-badge">ESC</span>
        </div>
        <div class="palette-results-list" id="paletteResultsList"></div>
        <div class="palette-footer">
          <span><kbd class="palette-shortcut-badge">↑</kbd> <kbd class="palette-shortcut-badge">↓</kbd> Navigate</span>
          <span><kbd class="palette-shortcut-badge">ENTER</kbd> Select</span>
          <span><kbd class="palette-shortcut-badge">ESC</kbd> Close</span>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    searchInput = document.getElementById('paletteSearchInput');
    resultsContainer = document.getElementById('paletteResultsList');

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closePalette();
    });

    searchInput.addEventListener('input', (e) => {
      filterCommands(e.target.value);
    });

    searchInput.addEventListener('keydown', handleKeyDown);
  }

  function openPalette() {
    createPaletteDOM();
    modalEl.classList.add('active');
    searchInput.value = '';
    filterCommands('');
    setTimeout(() => searchInput.focus(), 50);
  }

  function closePalette() {
    if (modalEl) {
      modalEl.classList.remove('active');
      if (searchInput) searchInput.blur();
    }
  }

  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      filteredCommands = [...commands];
    } else {
      filteredCommands = commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    activeIndex = 0;
    renderResults();
  }

  function renderResults() {
    if (!resultsContainer) return;
    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:0.85rem;">No matching detailing services or commands found.</div>';
      return;
    }

    // Group by category
    const groups = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });

    let html = '';
    let globalIdx = 0;

    for (const [category, items] of Object.entries(groups)) {
      html += `<div class="palette-group-title">${category}</div>`;
      items.forEach(item => {
        const isFocused = globalIdx === activeIndex;
        html += `
          <div class="palette-item ${isFocused ? 'focused' : ''}" data-index="${globalIdx}">
            <div class="palette-item-left">
              <i class="${item.icon}"></i>
              <span>${item.title}</span>
            </div>
            <span class="palette-shortcut-badge"><i class="ri-corner-down-left-line"></i></span>
          </div>
        `;
        globalIdx++;
      });
    }

    resultsContainer.innerHTML = html;

    // Click bindings
    resultsContainer.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        executeCommand(filteredCommands[idx]);
      });
    });
  }

  function executeCommand(cmd) {
    if (!cmd) return;
    closePalette();

    if (cmd.url) {
      // Check if inside dashboard subdirectory
      const isInsideDashboard = window.location.pathname.includes('/dashboard/');
      let targetUrl = cmd.url;
      if (isInsideDashboard && !targetUrl.startsWith('dashboard/')) {
        targetUrl = '../' + targetUrl;
      } else if (isInsideDashboard && targetUrl.startsWith('dashboard/')) {
        targetUrl = targetUrl.replace('dashboard/', '');
      }
      window.location.href = targetUrl;
    } else if (cmd.action) {
      if (cmd.action === 'toggleTheme') {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) btn.click();
      } else if (cmd.action === 'toggleAudio') {
        if (window.ApexAudio) window.ApexAudio.toggleMute();
      } else if (cmd.action === 'logoutUser') {
        if (window.ApexAuth) window.ApexAuth.logout();
      } else if (cmd.action.startsWith('setCurrency')) {
        const curr = cmd.action.replace('setCurrency', '');
        const select = document.getElementById('apex-currency-select');
        if (select) {
          select.value = curr;
          select.dispatchEvent(new Event('change'));
        }
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredCommands.length;
      renderResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filteredCommands[activeIndex]);
    }
  }

  // Global Key Listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openPalette();
    }
  });

  // Expose
  window.ApexCommandPalette = {
    open: openPalette,
    close: closePalette
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.palette-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
      });
    });
  });
})();
