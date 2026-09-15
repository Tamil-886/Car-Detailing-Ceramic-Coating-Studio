/**
 * APEX OBSIDIAN | Dynamic Custom Package Configurator & Quote Engine
 * assets/js/package-builder.js
 */

(function () {
  'use strict';

  function initPackageBuilder() {
    const builderContainer = document.getElementById('packageBuilder');
    if (!builderContainer) return;

    // Vehicle Multipliers
    const sizeMultipliers = {
      coupe: 1.0,
      sedan: 1.1,
      midsuv: 1.25,
      fullsuv: 1.4,
      exotic: 1.5
    };

    // Base Package Costs (USD)
    const basePackages = {
      essential: { name: 'Essential Obsidian Detail', price: 299, hours: 6 },
      ceramic: { name: '10H Diamond Ceramic Pro', price: 899, hours: 14 },
      concours: { name: '3-Stage Concours Correction', price: 1450, hours: 22 },
      ppf: { name: 'Bespoke Stealth PPF Full Front', price: 2850, hours: 28 }
    };

    // Addons (USD)
    const addonsData = {
      glass: { name: 'Hydrophobic Glass Shield Matrix', price: 150, hours: 1.5 },
      wheels: { name: 'Ceramic Wheel & Caliper Shield', price: 350, hours: 3 },
      leather: { name: 'Bespoke Leather & Alcantara Barrier', price: 220, hours: 2.5 },
      engine: { name: 'Optical Cleanroom Engine Bay Detail', price: 180, hours: 2 },
      ozone: { name: 'Medical-Grade Ozone Cabin Sterilization', price: 95, hours: 1 },
      underbody: { name: 'High-Gloss Underbody Sealant', price: 250, hours: 3 }
    };

    let currentSize = 'coupe';
    let currentBase = 'ceramic';
    let selectedAddons = new Set(['glass', 'wheels']);

    function getCurrencyRate() {
      const select = document.getElementById('apex-currency-select');
      const curr = select ? select.value : (localStorage.getItem('apex_currency') || 'USD');
      const rates = { USD: { symbol: '$', rate: 1.0 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 }, INR: { symbol: '₹', rate: 83.5 } };
      return rates[curr] || rates.USD;
    }

    function calculateTotal() {
      const curr = getCurrencyRate();
      const mult = sizeMultipliers[currentSize] || 1.0;
      const baseObj = basePackages[currentBase] || basePackages.ceramic;

      let basePrice = Math.round(baseObj.price * mult);
      let totalHours = baseObj.hours;
      let addonPriceSum = 0;

      let itemsHtml = `
        <div class="summary-item-row">
          <span>${baseObj.name} (${currentSize.toUpperCase()})</span>
          <span>${curr.symbol}${Math.round(basePrice * curr.rate).toLocaleString()}</span>
        </div>
      `;

      selectedAddons.forEach(addonKey => {
        const addon = addonsData[addonKey];
        if (addon) {
          const addonPrice = Math.round(addon.price * curr.rate);
          addonPriceSum += addon.price;
          totalHours += addon.hours;
          itemsHtml += `
            <div class="summary-item-row">
              <span style="color:var(--text-secondary);"><i class="ri-add-line text-cyan"></i> ${addon.name}</span>
              <span class="text-cyan">${curr.symbol}${addonPrice.toLocaleString()}</span>
            </div>
          `;
        }
      });

      const grandTotalUSD = basePrice + addonPriceSum;
      const grandTotalConverted = Math.round(grandTotalUSD * curr.rate);

      // Render Summary
      const summaryList = document.getElementById('quoteSummaryItems');
      const totalEl = document.getElementById('quoteGrandTotal');
      const timeEl = document.getElementById('quoteEstDuration');
      const quoteInput = document.getElementById('quoteBookingCode');

      if (summaryList) summaryList.innerHTML = itemsHtml;
      if (totalEl) totalEl.textContent = `${curr.symbol}${grandTotalConverted.toLocaleString()}`;
      if (timeEl) timeEl.textContent = `~${totalHours} Cleanroom Bay Hours`;
      if (quoteInput) quoteInput.value = `APX-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    // Bind Size Buttons
    document.querySelectorAll('.builder-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.builder-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSize = btn.getAttribute('data-size');
        calculateTotal();
      });
    });

    // Bind Base Package Radios
    document.querySelectorAll('input[name="builder-base-pkg"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        currentBase = e.target.value;
        calculateTotal();
      });
    });

    // Bind Addon Checkboxes
    document.querySelectorAll('.addon-card').forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      card.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        const key = card.getAttribute('data-addon');
        if (checkbox.checked) {
          card.classList.add('selected');
          selectedAddons.add(key);
        } else {
          card.classList.remove('selected');
          selectedAddons.delete(key);
        }
        calculateTotal();
      });
    });

    // Listen to global currency changes
    window.addEventListener('currencyChanged', calculateTotal);
    const currSelect = document.getElementById('apex-currency-select');
    if (currSelect) currSelect.addEventListener('change', calculateTotal);

    // Book Button -> Adds custom blueprint to Cart and navigates to cart.html
    const bookBtn = document.getElementById('builderReserveBtn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const baseObj = basePackages[currentBase] || basePackages.ceramic;
        const mult = sizeMultipliers[currentSize] || 1.0;
        let basePrice = Math.round(baseObj.price * mult);
        let addonPriceSum = 0;
        let addonNames = [];
        selectedAddons.forEach(k => {
          if (addonsData[k]) {
            addonPriceSum += addonsData[k].price;
            addonNames.push(addonsData[k].name);
          }
        });
        const finalPrice = basePrice + addonPriceSum;
        const customTitle = `${baseObj.name} (${addonNames.length > 0 ? addonNames.length + ' Custom Add-ons' : 'Core'})`;

        if (window.ApexCart && typeof window.ApexCart.addItem === 'function') {
          window.ApexCart.addItem({
            id: 'cfg-custom-' + Date.now().toString(36),
            name: customTitle,
            tier: 'Custom Atelier Blueprint',
            price: finalPrice,
            size: currentSize,
            image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
            duration: `~${baseObj.hours + (addonNames.length * 2)} Bay Hours`,
            warranty: 'Studio Custom Certified'
          });
          if (window.showToast) {
            window.showToast('Custom Blueprint Added to Cart!');
          }
          setTimeout(() => {
            window.location.href = 'cart.html';
          }, 400);
        } else {
          window.location.href = 'index.html#booking-section';
        }
      });
    }

    calculateTotal();
  }

  window.ApexPackageBuilder = {
    init: initPackageBuilder
  };

  document.addEventListener('DOMContentLoaded', initPackageBuilder);
})();
