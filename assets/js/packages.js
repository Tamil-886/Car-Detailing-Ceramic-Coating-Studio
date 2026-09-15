/**
 * APEX OBSIDIAN | Packages & Pricing Engine (assets/js/packages.js)
 */

(function () {
  'use strict';

  const PACKAGES_MAP = {
    'essential': {
      id: 'essential',
      name: 'Essential Studio Care',
      tier: 'Tier 01 - Enhancement',
      tagline: 'Paint Gloss Enhancement & 12-Month Sealant',
      warranty: '12 Months',
      duration: '1 Day (6-8 Hours)',
      basePrice: 450,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80'
    },
    'ceramic-pro': {
      id: 'ceramic-pro',
      name: 'Ceramic Pro 10H Obsidian',
      tier: 'Tier 02 - Master Choice',
      tagline: '2-Stage Multi-Correction & Dual 10H Ceramic Layers',
      warranty: '7 Years Transferable',
      duration: '2 Days (18 Hours)',
      basePrice: 1450,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'
    },
    'interior-bespoke': {
      id: 'interior-bespoke',
      name: 'Bespoke Interior & Leather',
      tier: 'Tier 03 - Cabin Sanctuary',
      tagline: 'Deep Steam Clean, Swissvax Feed & Ceramic Leather Coat',
      warranty: '12 Months',
      duration: '1 Day (8 Hours)',
      basePrice: 550,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
    },
    'ultimate': {
      id: 'ultimate',
      name: 'Ultimate Concours Lab',
      tier: 'Tier 04 - Hypercar Concours',
      tagline: 'Full 3-Stage Correction, PPF, 10H Ceramic & Cryo Engine',
      warranty: 'Lifetime Re-Certification',
      duration: '3-4 Days (32+ Hours)',
      basePrice: 2850,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80'
    }
  };

  let selectedSize = 'coupe';

  function initVehicleSizeButtons() {
    document.querySelectorAll('.btn-size').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.btn-size').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSize = this.getAttribute('data-size') || 'coupe';
        updatePackageCardPrices();
      });
    });
  }

  function updatePackageCardPrices() {
    document.querySelectorAll('.package-card').forEach(card => {
      const amountEl = card.querySelector('.amount');
      if (amountEl) {
        const base = Number(amountEl.getAttribute('data-base')) || 450;
        const multiplier = selectedSize === 'mid-suv' ? 1.15 : (selectedSize === 'full-suv' ? 1.30 : (selectedSize === 'exotic' ? 1.25 : 1.0));
        const finalPrice = Math.round(base * multiplier);
        if (window.formatPrice) {
          amountEl.textContent = window.formatPrice(finalPrice).replace(/[^0-9,]/g, '');
        } else {
          amountEl.textContent = finalPrice.toLocaleString();
        }
      }
    });
  }

  function addPackageToCart(pkgId) {
    const pkg = PACKAGES_MAP[pkgId];
    if (!pkg) return;

    const multiplier = selectedSize === 'mid-suv' ? 1.15 : (selectedSize === 'full-suv' ? 1.30 : (selectedSize === 'exotic' ? 1.25 : 1.0));
    const finalPrice = Math.round(pkg.basePrice * multiplier);

    if (window.ApexCart) {
      window.ApexCart.addItem({
        id: pkg.id,
        name: pkg.name,
        tier: pkg.tier,
        price: finalPrice,
        basePrice: pkg.basePrice,
        size: selectedSize,
        image: pkg.image,
        duration: pkg.duration,
        warranty: pkg.warranty,
        quantity: 1
      });
    }
  }

  window.PACKAGES_MAP = PACKAGES_MAP;
  window.addPackageToCart = addPackageToCart;
  window.getVehicleSize = () => selectedSize;

  document.addEventListener('DOMContentLoaded', () => {
    initVehicleSizeButtons();
    updatePackageCardPrices();
  });
})();
