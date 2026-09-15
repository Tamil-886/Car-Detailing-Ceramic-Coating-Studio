/**
 * APEX OBSIDIAN | Theme & Currency Engine (assets/js/theme.js)
 * Manages Dark/Light theme, RTL layout, and Currency conversion.
 */

(function () {
  'use strict';

  // Immediate theme application to eliminate any flash of unstyled content
  try {
    const immediateTheme = localStorage.getItem('apex_studio_theme') || 'dark';
    if (immediateTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}

  // 1. Theme Mode Management (Dark / Light)
  const THEME_KEY = 'apex_studio_theme';
  const RTL_KEY = 'apex_studio_rtl';
  const CURRENCY_KEY = 'apex_studio_currency';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme, false);

    const savedRTL = localStorage.getItem(RTL_KEY) === 'true';
    setRTL(savedRTL, false);

    const savedCurrency = localStorage.getItem(CURRENCY_KEY) || 'USD';
    setCurrency(savedCurrency, false);

    // Attach listeners to Theme Toggle buttons
    document.querySelectorAll('#theme-toggle-btn, .theme-toggle, .theme-toggle-btn').forEach(btn => {
      btn.removeEventListener('click', toggleTheme);
      btn.addEventListener('click', toggleTheme);
    });

    // Attach listeners to RTL Toggle buttons
    document.querySelectorAll('#rtl-toggle-btn, .rtl-toggle').forEach(btn => {
      btn.removeEventListener('click', toggleRTL);
      btn.addEventListener('click', toggleRTL);
    });

    // Attach listeners to Currency Select dropdowns
    document.querySelectorAll('#apex-currency-select, .apex-currency-select').forEach(select => {
      select.value = savedCurrency;
      select.addEventListener('change', (e) => {
        setCurrency(e.target.value, true);
      });
    });
  }

  function setTheme(theme, showNotice = false) {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
      html.setAttribute('data-theme', 'light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButtons(theme);

    if (showNotice && window.showToast) {
      window.showToast(`Switched to ${theme.toUpperCase()} mode.`);
    }
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.contains('light') || document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    setTheme(next, true);
  }

  function setRTL(isRTL, showNotice = false) {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    localStorage.setItem(RTL_KEY, isRTL ? 'true' : 'false');
    updateRTLButtons(isRTL);

    if (showNotice && window.showToast) {
      window.showToast(isRTL ? 'Switched to Right-to-Left (RTL) Layout' : 'Switched to Left-to-Right (LTR) Layout');
    }
  }

  function toggleRTL() {
    const current = document.documentElement.dir === 'rtl';
    setRTL(!current, true);
  }

  function updateThemeButtons(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="ri-sun-fill text-gold"></i> Light'
        : '<i class="ri-moon-fill text-cyan"></i> Dark';
    });
    document.querySelectorAll('.theme-label-text').forEach(el => {
      el.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
  }

  function updateRTLButtons(isRTL) {
    document.querySelectorAll('#rtl-toggle-btn span, .rtl-toggle span').forEach(el => {
      el.textContent = isRTL ? 'RTL' : 'LTR';
    });
  }

  // 2. Currency Rates & Formatting
  const CURRENCY_DATA = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    INR: { symbol: '₹', rate: 86.5 }
  };

  function setCurrency(curr, showNotice = false) {
    if (!CURRENCY_DATA[curr]) curr = 'USD';
    localStorage.setItem(CURRENCY_KEY, curr);
    localStorage.setItem('apex_currency', curr);

    // Sync all selects on page
    document.querySelectorAll('#apex-currency-select, .apex-currency-select').forEach(select => {
      select.value = curr;
    });

    document.querySelectorAll('.currency-display-code').forEach(el => el.textContent = curr);
    
    // Dispatch global event for package builder & calculators
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: curr } }));

    // Trigger price re-renders if available
    if (window.renderPrices) {
      window.renderPrices();
    }

    if (showNotice && window.showToast) {
      window.showToast(`Currency changed to ${curr} (${CURRENCY_DATA[curr].symbol})`);
    }
  }

  function formatPrice(usdAmount) {
    const curr = localStorage.getItem(CURRENCY_KEY) || 'USD';
    const data = CURRENCY_DATA[curr] || CURRENCY_DATA.USD;
    const converted = Math.round(usdAmount * data.rate);
    return `${data.symbol}${converted.toLocaleString()}`;
  }

  // Expose to window
  window.toggleTheme = toggleTheme;
  window.setTheme = setTheme;
  window.toggleRTL = toggleRTL;
  window.setCurrency = setCurrency;
  window.formatPrice = formatPrice;

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
