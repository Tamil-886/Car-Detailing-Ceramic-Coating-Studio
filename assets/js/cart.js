/**
 * APEX OBSIDIAN | Luxury Detailing Studio
 * Cart & Reservation Order Engine (assets/js/cart.js)
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'apex_cart';
  const PROMO_STORAGE_KEY = 'apex_cart_promo';
  const ORDERS_STORAGE_KEY = 'apex_orders';
  const TAX_RATE = 0.08; // 8% Studio Cleanroom Tax
  const PREP_FEE = 45;   // $45 Environmental Prep & Cleanroom Decon Fee

  // Active Promo Codes (Demo Perks)
  const PROMO_CODES = {
    'OBSIDIAN10': { discountPercent: 10, description: '10% VIP Studio Discount' },
    'VIPGLOSS': { discountFlat: 100, description: '$100 Studio Credit' },
    'CERAMIC20': { discountPercent: 20, description: '20% Ceramic Promo' }
  };

  /**
   * Retrieves the current cart array from localStorage.
   * @returns {Array} Array of cart item objects.
   */
  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading apex_cart:', e);
      return [];
    }
  }

  /**
   * Saves the cart array to localStorage, syncs badges and dispatches event.
   * @param {Array} cart 
   */
  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateNavbarBadges();
      window.dispatchEvent(new CustomEvent('apex_cart_updated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving apex_cart:', e);
    }
  }

  /**
   * Adds an item to the cart.
   * @param {Object} item { id, name, tier, price, size, image, duration, warranty }
   */
  function addItem(item) {
    if (!item || !item.id) return;
    const cart = getCart();
    const existingIndex = cart.findIndex(i => i.id === item.id && (i.size || 'coupe') === (item.size || 'coupe'));

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name || 'Studio Package',
        tier: item.tier || 'Signature Tier',
        price: Number(item.price) || 450,
        basePrice: Number(item.basePrice) || Number(item.price) || 450,
        size: item.size || 'coupe',
        image: item.image || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
        duration: item.duration || '1-2 Days',
        warranty: item.warranty || 'Studio Guarantee',
        quantity: item.quantity || 1
      });
    }

    saveCart(cart);

    if (window.showToast) {
      window.showToast(item.name ? item.name + ' added to cart!' : 'Package added to cart!');
    }

    // Play subtle audio if available
    if (window.ApexAudio && window.ApexAudio.play) {
      window.ApexAudio.play('success');
    }
  }

  /**
   * Removes an item from the cart by its ID (and optional size).
   * @param {string} id 
   * @param {string} size 
   */
  function removeItem(id, size) {
    let cart = getCart();
    const item = cart.find(i => i.id === id && (size ? i.size === size : true));
    cart = cart.filter(i => !(i.id === id && (size ? i.size === size : true)));
    saveCart(cart);

    if (window.showToast && item) {
      window.showToast('Removed "' + item.name + '" from cart.');
    }
  }

  /**
   * Updates the quantity of a cart item.
   * @param {string} id 
   * @param {number} qty 
   * @param {string} size 
   */
  function updateQuantity(id, arg2, arg3) {
    let qty, size;
    if (typeof arg2 === 'string' && (typeof arg3 === 'number' || (!isNaN(parseInt(arg3, 10)) && arg3 !== ''))) {
      size = arg2;
      qty = parseInt(arg3, 10);
    } else {
      qty = parseInt(arg2, 10);
      size = arg3;
    }

    let cart = getCart();
    const index = cart.findIndex(i => i.id === id && (size ? i.size === size : true));
    if (index > -1) {
      if (isNaN(qty) || qty <= 0) {
        removeItem(id, size);
        return;
      }
      cart[index].quantity = qty;
      saveCart(cart);
    }
  }

  /**
   * Clears all items in the cart.
   */
  function clearCart(showNotification) {
    if (showNotification === undefined) showNotification = true;
    saveCart([]);
    localStorage.removeItem(PROMO_STORAGE_KEY);
    if (showNotification && window.showToast) {
      window.showToast('Shopping cart has been cleared.');
    }
  }

  /**
   * Calculates total number of items in the cart.
   * @returns {number}
   */
  function getCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }

  /**
   * Calculates subtotal of items.
   * @returns {number}
   */
  function getSubtotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  }

  /**
   * Calculates studio tax amount.
   * @returns {number}
   */
  function getTaxAmount() {
    const subtotal = getSubtotal();
    return subtotal > 0 ? Math.round(subtotal * TAX_RATE) : 0;
  }

  /**
   * Returns cleanroom prep fee.
   * @returns {number}
   */
  function getPrepFee() {
    return getSubtotal() > 0 ? PREP_FEE : 0;
  }

  /**
   * Retrieves applied promo code object.
   * @returns {Object|null}
   */
  function getAppliedPromo() {
    try {
      const promoKey = localStorage.getItem(PROMO_STORAGE_KEY);
      if (promoKey && PROMO_CODES[promoKey.toUpperCase()]) {
        return { code: promoKey.toUpperCase(), ...PROMO_CODES[promoKey.toUpperCase()] };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Applies a promo code.
   * @param {string} code 
   * @returns {Object} { success: boolean, message: string }
   */
  function applyPromo(code) {
    if (!code) return { success: false, message: 'Please enter a promo code.' };
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      localStorage.setItem(PROMO_STORAGE_KEY, normalized);
      saveCart(getCart()); // trigger UI updates
      return { success: true, message: 'Promo code "' + normalized + '" applied (' + PROMO_CODES[normalized].description + ')!' };
    }
    return { success: false, message: 'Invalid promo code. Try OBSIDIAN10 or VIPGLOSS.' };
  }

  /**
   * Removes applied promo code.
   */
  function removePromo() {
    localStorage.removeItem(PROMO_STORAGE_KEY);
    saveCart(getCart());
  }

  /**
   * Calculates discount amount based on applied promo.
   * @returns {number}
   */
  function getDiscountAmount() {
    const promo = getAppliedPromo();
    if (!promo) return 0;
    const subtotal = getSubtotal();
    if (promo.discountPercent) {
      return Math.round((subtotal * promo.discountPercent) / 100);
    }
    if (promo.discountFlat) {
      return Math.min(promo.discountFlat, subtotal);
    }
    return 0;
  }

  /**
   * Calculates final total investment.
   * @returns {number}
   */
  function getTotal() {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    const tax = getTaxAmount();
    const fee = getPrepFee();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal + tax + fee - discount);
  }

  /**
   * Updates all navbar cart badges and text on the active page.
   */
  function updateNavbarBadges() {
    const count = getCount();
    
    // Update all badge elements with count
    document.querySelectorAll('.cart-count-badge, #cart-count-badge, #mobile-cart-badge, .nav-cart-badge').forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.add('has-items');
        el.style.display = 'inline-flex';
      } else {
        el.classList.remove('has-items');
      }
    });

    // Update cart button title
    document.querySelectorAll('.nav-cart-btn, #nav-cart-btn').forEach(btn => {
      btn.setAttribute('aria-label', 'Shopping Cart (' + count + ' items)');
      if (count > 0) {
        btn.classList.add('cart-active');
      } else {
        btn.classList.remove('cart-active');
      }
    });
  }

  /**
   * Creates a new order from current cart and stores it.
   * @param {Object} orderData Customer and billing info
   * @returns {Object} Generated order record
   */
  function createOrder(orderData) {
    const cart = getCart();
    if (cart.length === 0) {
      throw new Error('Cart is empty.');
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = orderData.bookingId || ('APX-BK-' + randomNum);
    const paymentId = 'APX-PAY-' + randomNum;
    const invoiceNo = 'INV-2024-' + Math.floor(100 + Math.random() * 900);
    const warrantyCode = 'WAR-10H-' + randomNum;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Assemble primary service name from items
    const primaryService = cart.map(i => i.name).join(' + ') || 'Signature Detailing Package';
    const primaryTier = cart[0] ? (cart[0].tier || 'Studio Package') : 'Studio Package';
    const vehicleClass = (cart[0] && cart[0].size) ? (
      cart[0].size === 'coupe' ? 'Coupe / 2-Door Sport' :
      cart[0].size === 'mid-suv' ? 'Mid-Size SUV' :
      cart[0].size === 'full-suv' ? 'Full-Size Truck / 7-Seat SUV' :
      cart[0].size === 'exotic' ? 'Exotic / Supercar / Hypercar' :
      cart[0].size === 'hatchback' ? 'Hatchback' :
      cart[0].size === 'sedan' ? 'Sedan / Saloon' :
      cart[0].size.toUpperCase()
    ) : 'Exotic / Supercar';

    const totalInvestment = getTotal();

    const newOrder = {
      id: `book-${Date.now()}`,
      orderId: bookingCode,
      code: bookingCode,
      date: dateFormatted,
      timestamp: now.toISOString(),
      customer: {
        name: orderData.name || 'VIP Client',
        email: orderData.email || 'client@exoticmotors.com',
        phone: orderData.phone || '+1 (310) 555-0199',
        vehicle: orderData.vehicle || '2024 Porsche 911 GT3 RS',
        plate: orderData.plate || 'CA-911-APX',
        bayLocation: orderData.bayLocation || 'Beverly Hills Cleanroom Studio 02',
        preferredDate: orderData.preferredDate || dateFormatted
      },
      clientName: orderData.name || 'VIP Client',
      clientEmail: orderData.email || 'client@exoticmotors.com',
      clientPhone: orderData.phone || '+1 (310) 555-0199',
      vehicleModel: orderData.vehicle || '2024 Porsche 911 GT3 RS',
      vehicleClassification: vehicleClass,
      servicePackage: primaryService,
      studioLocation: orderData.bayLocation || 'Beverly Hills Cleanroom Studio 02',
      bookingDate: orderData.preferredDate || dateFormatted,
      bookingTime: orderData.time || '08:30 AM (Morning Drop-Off)',
      clientNotes: orderData.notes || 'Online reservation order',
      technician: 'Marcus Vance (Master Certified IDA)',
      currentStage: 1,
      billing: {
        address: orderData.address || '742 Rodeo Drive',
        city: orderData.city || 'Beverly Hills',
        state: orderData.state || 'CA',
        zip: orderData.zip || '90210',
        country: orderData.country || 'United States',
        paymentMethod: orderData.paymentMethod || 'Credit Card (Obsidian Shield)'
      },
      items: [...cart],
      pricing: {
        subtotal: getSubtotal(),
        tax: getTaxAmount(),
        prepFee: getPrepFee(),
        discount: getDiscountAmount(),
        total: totalInvestment,
        promoCode: (getAppliedPromo() || {}).code || null
      },
      totalPrice: totalInvestment,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      paymentId: paymentId,
      invoiceNo: invoiceNo,
      warrantyCode: warrantyCode,
      paidAt: now.toISOString(),
      createdAt: now.toISOString(),
      stage: 'Stage 1: In-Processing & Vehicle Decontamination'
    };

    // 1. Save to global orders list
    try {
      const allOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      allOrders.unshift(newOrder);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders));

      // 2. Add or update in apex_studio_bookings_list for Dashboard
      const bookingsKey = 'apex_studio_bookings_list';
      let allBookings = [];
      try {
        const storedB = localStorage.getItem(bookingsKey);
        allBookings = storedB ? JSON.parse(storedB) : ((window.getBookings ? window.getBookings() : []) || []);
      } catch (e) {
        allBookings = [];
      }

      const existingIdx = allBookings.findIndex(b => b.code === bookingCode || b.id === bookingCode);
      if (existingIdx > -1) {
        allBookings[existingIdx] = Object.assign({}, allBookings[existingIdx], newOrder);
      } else {
        allBookings.unshift(newOrder);
      }
      localStorage.setItem(bookingsKey, JSON.stringify(allBookings));
      localStorage.setItem('apex_latest_confirmed_reservation', JSON.stringify(newOrder));

      // 3. Create invoice in apex_user_invoices for Invoices & Warranties page
      const invKey = 'apex_user_invoices';
      let allInvoices = [];
      try {
        const storedInv = localStorage.getItem(invKey);
        allInvoices = storedInv ? JSON.parse(storedInv) : ((window.ApexInvoices && window.ApexInvoices.getInvoices) ? window.ApexInvoices.getInvoices() : []);
      } catch (e) {
        allInvoices = [];
      }
      const newInvoice = {
        invoiceNo: invoiceNo,
        bookingCode: bookingCode,
        date: dateFormatted,
        vehicle: newOrder.vehicleModel,
        vin: orderData.plate || 'CA-911-APX',
        service: primaryService,
        amount: totalInvestment,
        status: 'Paid',
        paymentMethod: newOrder.billing.paymentMethod,
        paymentId: paymentId,
        warrantyCode: warrantyCode,
        warrantyTerm: '7-Year Transferable Studio Warranty',
        cureDate: dateFormatted,
        expiryDate: new Date(now.getFullYear() + 7, now.getMonth(), now.getDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        batchNo: `APX-SIO2-10H-BATCH-${randomNum.toString().slice(-3)}A`,
        items: cart.map(i => ({
          name: `${i.name} (${i.tier || 'Studio'} - Qty: ${i.quantity || 1})`,
          price: (Number(i.price) || 0) * (Number(i.quantity) || 1)
        })),
        tax: getTaxAmount(),
        prepFee: getPrepFee(),
        discount: getDiscountAmount()
      };
      allInvoices.unshift(newInvoice);
      localStorage.setItem(invKey, JSON.stringify(allInvoices));

      // 4. Update live telemetry in apex_active_tracking
      const activeTracking = {
        bookingId: bookingCode,
        vehicle: newOrder.vehicleModel,
        plate: orderData.plate || 'CA-911-APX',
        color: 'Obsidian Metallic / Clearcoat',
        currentStage: 1,
        serviceName: primaryService,
        technician: 'Marcus Vance (Master Certified Detailer)',
        bay: newOrder.studioLocation || 'Cleanroom Bay 02 (Class 10,000 ISO)',
        startedAt: `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        estimatedCompletion: 'In 24-48 Hours',
        preGloss: 68.2,
        currentGloss: 72.4,
        targetGloss: 99.8,
        cureTemp: '22.5 °C',
        cureHumidity: '42 % RH',
        notes: `Bay reserved for ${newOrder.customer.name}. Intake scheduled.`
      };
      localStorage.setItem('apex_active_tracking', JSON.stringify(activeTracking));

      // 5. Award loyalty points (+1 point per dollar spent)
      const currentPts = parseInt(localStorage.getItem('apex_loyalty_points') || '2450', 10);
      const earnedPts = Math.round(totalInvestment);
      localStorage.setItem('apex_loyalty_points', (currentPts + earnedPts).toString());

      // 6. Sync with user session if logged in
      if (window.ApexAuth && window.ApexAuth.getCurrentUser) {
        const user = window.ApexAuth.getCurrentUser();
        if (user && user.email) {
          const userBookingsKey = 'apex_bookings_' + user.email;
          const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
          userBookings.unshift(newOrder);
          localStorage.setItem(userBookingsKey, JSON.stringify(userBookings));
        }
      }
    } catch (e) {
      console.error('Error saving complete order suite:', e);
    }

    // Clear cart after order creation
    clearCart(false);

    return newOrder;
  }

  // Cross-tab synchronization
  window.addEventListener('storage', function (e) {
    if (e.key === CART_STORAGE_KEY) {
      updateNavbarBadges();
      window.dispatchEvent(new CustomEvent('apex_cart_updated', { detail: { cart: getCart() } }));
    }
  });

  // Public API
  window.ApexCart = {
    getCart: getCart,
    addItem: addItem,
    removeItem: removeItem,
    updateQuantity: updateQuantity,
    clearCart: clearCart,
    getCount: getCount,
    getSubtotal: getSubtotal,
    getTaxAmount: getTaxAmount,
    getPrepFee: getPrepFee,
    getDiscountAmount: getDiscountAmount,
    getAppliedPromo: getAppliedPromo,
    applyPromo: applyPromo,
    removePromo: removePromo,
    getTotal: getTotal,
    updateNavbarBadges: updateNavbarBadges,
    createOrder: createOrder
  };

  // Initialize badges immediately and on DOM load
  updateNavbarBadges();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbarBadges);
  }
})();
