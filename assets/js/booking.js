/**
 * APEX OBSIDIAN | Studio Reservation & Booking Synchronization Engine (assets/js/booking.js)
 * Handles client-side validation, reservation creation, data persistence, and dashboard sync.
 */

(function () {
  'use strict';

  const BOOKINGS_KEY = 'apex_studio_bookings_list';
  const LATEST_BOOKING_KEY = 'apex_latest_confirmed_reservation';

  // Seed Default Reservations
  const DEFAULT_BOOKINGS = [
    {
      id: 'book-8924',
      code: 'APX-8924',
      studioLocation: 'Beverly Hills HQ (Wilshire Blvd)',
      vehicleModel: '2024 Porsche 911 GT3 RS',
      vehicleClassification: 'Coupe / 2-Door Sport',
      servicePackage: 'Ceramic Coating (10H Diamond Glass)',
      bookingDate: '2026-09-22',
      bookingTime: '08:30 AM (Morning Drop-Off)',
      clientName: 'Alexander Vance',
      clientPhone: '+1 (310) 555-0192',
      clientEmail: 'vance@exoticmotors.com',
      clientNotes: 'Front bumper has track stone chips; please compound carefully around carbon hood vents.',
      status: 'In-Progress',
      currentStage: 4,
      totalPrice: 18999,
      technician: 'Marcus Vance (Master Certified IDA)',
      createdAt: '2026-09-15T08:30:00.000Z'
    },
    {
      id: 'book-9140',
      code: 'APX-9140',
      studioLocation: 'Beverly Hills HQ (Wilshire Blvd)',
      vehicleModel: '2022 Mercedes-AMG G63',
      vehicleClassification: 'Full-Size Truck / 7-Seat SUV',
      servicePackage: 'Dry Ice Engine Cryo-Clean & Annual Boost',
      bookingDate: '2026-09-28',
      bookingTime: '11:30 AM (Midday Bay Slot)',
      clientName: 'Alexander Vance',
      clientPhone: '+1 (310) 555-0192',
      clientEmail: 'vance@exoticmotors.com',
      clientNotes: 'Standard intake for annual ceramic maintenance wash.',
      status: 'Confirmed',
      currentStage: 1,
      totalPrice: 4499,
      technician: 'Elena Rostova (Senior Optical Specialist)',
      createdAt: '2026-09-14T10:00:00.000Z'
    },
    {
      id: 'book-7412',
      code: 'APX-7412',
      studioLocation: 'Beverly Hills HQ (Wilshire Blvd)',
      vehicleModel: '2023 Ferrari 296 GTB',
      vehicleClassification: 'Exotic / Supercar / Hypercar',
      servicePackage: 'Bespoke Interior Leather Re-Feed (Swissvax)',
      bookingDate: '2026-09-04',
      bookingTime: '02:30 PM (Afternoon Intake)',
      clientName: 'Alexander Vance',
      clientPhone: '+1 (310) 555-0192',
      clientEmail: 'vance@exoticmotors.com',
      clientNotes: 'Clean semi-aniline red Italian hides.',
      status: 'Completed',
      currentStage: 7,
      totalPrice: 3999,
      technician: 'Julian Thorne (Interior Specialist)',
      createdAt: '2026-09-04T14:30:00.000Z'
    }
  ];

  // Helper: Retrieve all reservations from localStorage
  function getBookings() {
    try {
      const stored = localStorage.getItem(BOOKINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[ApexBooking] Failed to parse bookings storage', e);
    }
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(DEFAULT_BOOKINGS));
    return DEFAULT_BOOKINGS;
  }

  // Helper: Save a new reservation
  function saveBooking(bookingData) {
    const list = getBookings();
    
    // Generate unique Reservation ID: APX-BK-XXXXX
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const uniqueCode = `APX-BK-${randomCode}`;
    const price = extractPriceFromPackage(bookingData.servicePackage);
    
    const newReservation = {
      id: `book-${Date.now()}`,
      code: uniqueCode,
      orderId: uniqueCode,
      studioLocation: bookingData.studioLocation || 'Beverly Hills HQ (Wilshire Blvd)',
      vehicleModel: bookingData.vehicleModel || 'Unspecified Vehicle',
      vehicleClassification: bookingData.vehicleClassification || 'Exotic / Supercar',
      servicePackage: bookingData.servicePackage || 'Bespoke Studio Detailing',
      bookingDate: bookingData.bookingDate || new Date().toISOString().split('T')[0],
      bookingTime: bookingData.bookingTime || '08:30 AM (Morning Drop-Off)',
      clientName: bookingData.clientName || 'Valued Client',
      clientPhone: bookingData.clientPhone || '',
      clientEmail: bookingData.clientEmail || '',
      clientNotes: bookingData.clientNotes || 'None specified',
      status: 'Confirmed',
      paymentStatus: 'Pending Payment',
      currentStage: 1,
      totalPrice: price,
      technician: 'Marcus Vance (Master Certified IDA)',
      createdAt: new Date().toISOString()
    };

    // Prepend to top of list
    list.unshift(newReservation);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    localStorage.setItem(LATEST_BOOKING_KEY, JSON.stringify(newReservation));

    // Also sync active tracking if cleanroom tracking is active
    if (localStorage.getItem('apex_active_tracking')) {
      try {
        const activeTrack = JSON.parse(localStorage.getItem('apex_active_tracking'));
        activeTrack.bookingId = newReservation.code;
        activeTrack.vehicle = newReservation.vehicleModel;
        activeTrack.serviceName = newReservation.servicePackage;
        activeTrack.currentStage = 1;
        activeTrack.notes = newReservation.clientNotes;
        localStorage.setItem('apex_active_tracking', JSON.stringify(activeTrack));
      } catch (e) {}
    }

    return newReservation;
  }

  function extractPriceFromPackage(pkgString) {
    if (!pkgString) return 3499;
    const match = pkgString.match(/[₹$€£]([0-9,]+)/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 3499;
  }

  // --------------------------------------------------------------------------
  // Form Validation & Interaction Engine
  // --------------------------------------------------------------------------
  function initReservationForm() {
    const form = document.getElementById('apex-booking-form');
    if (!form) return;

    // Field references
    const locationInput = form.querySelector('[name="studio_location"]');
    const vehicleModelInput = form.querySelector('[name="vehicle_model"]');
    const vehicleSizeInput = form.querySelector('[name="vehicle_size"]');
    const servicePkgInput = form.querySelector('[name="service_package"]');
    const dateInput = form.querySelector('[name="booking_date"]');
    const timeInput = form.querySelector('[name="booking_time"]');
    const nameInput = form.querySelector('[name="client_name"]');
    const phoneInput = form.querySelector('[name="client_phone"]');
    const emailInput = form.querySelector('[name="client_email"]');
    const notesInput = form.querySelector('[name="client_notes"]');
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-submit-reservation');

    // Set minimum date to today
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) {
        // Default to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
    }

    // Prefill user data if logged in
    try {
      const sessionUser = (window.ApexAuth && window.ApexAuth.getCurrentUser) ? window.ApexAuth.getCurrentUser() : null;
      if (sessionUser) {
        if (nameInput && !nameInput.value) nameInput.value = sessionUser.name || '';
        if (emailInput && !emailInput.value) emailInput.value = sessionUser.email || '';
        if (phoneInput && !phoneInput.value) phoneInput.value = sessionUser.phone || '';
        if (vehicleModelInput && !vehicleModelInput.value && sessionUser.vehicle) vehicleModelInput.value = sessionUser.vehicle;
      }
    } catch (e) {}

    // Attach real-time validation clearing
    const fieldsToWatch = [locationInput, vehicleModelInput, vehicleSizeInput, servicePkgInput, dateInput, timeInput, nameInput, phoneInput, emailInput];
    fieldsToWatch.forEach(field => {
      if (field) {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
      }
    });

    // Form Submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Run comprehensive validation
      const isValid = validateForm();
      if (!isValid) {
        return;
      }

      // Lock button to prevent double-submission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Securing Cleanroom Bay...';
      }

      // Collect data
      const reservationPayload = {
        studioLocation: locationInput ? locationInput.value.trim() : 'Beverly Hills HQ (Wilshire Blvd)',
        vehicleModel: vehicleModelInput ? vehicleModelInput.value.trim() : '',
        vehicleClassification: vehicleSizeInput ? vehicleSizeInput.options[vehicleSizeInput.selectedIndex].text : 'Coupe / 2-Door Sport',
        servicePackage: servicePkgInput ? servicePkgInput.value.trim() : 'Full Car Detailing',
        bookingDate: dateInput ? dateInput.value : '',
        bookingTime: timeInput ? timeInput.value : '08:30 AM (Morning Drop-Off)',
        clientName: nameInput ? nameInput.value.trim() : '',
        clientPhone: phoneInput ? phoneInput.value.trim() : '',
        clientEmail: emailInput ? emailInput.value.trim() : '',
        clientNotes: notesInput ? notesInput.value.trim() : 'None specified'
      };

      // Simulate cleanroom allocation delay (600ms) for high-end feel
      setTimeout(() => {
        const confirmedReservation = saveBooking(reservationPayload);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-check-double-line"></i> Confirm Studio Reservation';
        }

        // Show Confirmation Section
        displayConfirmation(confirmedReservation);
      }, 600);
    });

    function validateForm() {
      let valid = true;
      let firstInvalidEl = null;

      // 1. Studio Location
      if (!locationInput || !locationInput.value.trim()) {
        showFieldError(locationInput, 'Please select a studio cleanroom location.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = locationInput;
      } else {
        clearFieldError(locationInput);
      }

      // 2. Vehicle Model
      if (!vehicleModelInput || !vehicleModelInput.value.trim()) {
        showFieldError(vehicleModelInput, 'Please enter vehicle make, model & year.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = vehicleModelInput;
      } else if (vehicleModelInput.value.trim().length < 2) {
        showFieldError(vehicleModelInput, 'Vehicle model must be at least 2 characters.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = vehicleModelInput;
      } else {
        clearFieldError(vehicleModelInput);
      }

      // 3. Vehicle Classification
      if (!vehicleSizeInput || !vehicleSizeInput.value.trim()) {
        showFieldError(vehicleSizeInput, 'Please select a vehicle classification.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = vehicleSizeInput;
      } else {
        clearFieldError(vehicleSizeInput);
      }

      // 4. Primary Detailing Service
      if (!servicePkgInput || !servicePkgInput.value.trim()) {
        showFieldError(servicePkgInput, 'Please select a primary detailing service.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = servicePkgInput;
      } else {
        clearFieldError(servicePkgInput);
      }

      // 5. Preferred Date
      if (!dateInput || !dateInput.value) {
        showFieldError(dateInput, 'Please select your preferred reservation date.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = dateInput;
      } else {
        const selectedDate = new Date(dateInput.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(selectedDate.getTime()) || selectedDate < today) {
          showFieldError(dateInput, 'Reservation date cannot be in the past.');
          valid = false;
          if (!firstInvalidEl) firstInvalidEl = dateInput;
        } else {
          clearFieldError(dateInput);
        }
      }

      // 6. Time Window
      if (!timeInput || !timeInput.value.trim()) {
        showFieldError(timeInput, 'Please select an intake time window.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = timeInput;
      } else {
        clearFieldError(timeInput);
      }

      // 7. Full Name
      if (!nameInput || !nameInput.value.trim()) {
        showFieldError(nameInput, 'Please enter your full name.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = nameInput;
      } else if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = nameInput;
      } else {
        clearFieldError(nameInput);
      }

      // 8. Phone Number
      if (!phoneInput || !phoneInput.value.trim()) {
        showFieldError(phoneInput, 'Please enter your phone number.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = phoneInput;
      } else {
        const cleanedPhone = phoneInput.value.replace(/[^0-9]/g, '');
        if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
          showFieldError(phoneInput, 'Please enter a valid phone number (7-15 digits).');
          valid = false;
          if (!firstInvalidEl) firstInvalidEl = phoneInput;
        } else {
          clearFieldError(phoneInput);
        }
      }

      // 9. Email Address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailInput.value.trim()) {
        showFieldError(emailInput, 'Please enter your email address.');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = emailInput;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        valid = false;
        if (!firstInvalidEl) firstInvalidEl = emailInput;
      } else {
        clearFieldError(emailInput);
      }

      if (!valid && firstInvalidEl) {
        firstInvalidEl.focus();
        if (firstInvalidEl.scrollIntoView) {
          firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      return valid;
    }

    function showFieldError(input, message) {
      if (!input) return;
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.25)';

      let errorSpan = input.parentNode.querySelector('.field-error-msg');
      if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'field-error-msg';
        errorSpan.style.cssText = 'color: #ef4444; font-size: 0.78rem; font-weight: 500; display: block; margin-top: 5px;';
        input.parentNode.appendChild(errorSpan);
      }
      errorSpan.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
      errorSpan.style.display = 'block';
    }

    function clearFieldError(input) {
      if (!input) return;
      input.style.borderColor = '';
      input.style.boxShadow = '';
      const errorSpan = input.parentNode.querySelector('.field-error-msg');
      if (errorSpan) {
        errorSpan.style.display = 'none';
      }
    }
  }

  // --------------------------------------------------------------------------
  // Display Confirmation Screen (No alerts, No popups)
  // --------------------------------------------------------------------------
  function displayConfirmation(reservation) {
    const formCard = document.getElementById('apex-booking-form-wrapper') || document.getElementById('apex-booking-form')?.closest('.glass-card');
    const confirmationView = document.getElementById('booking-confirmation-view');
    const bookingSection = document.getElementById('booking-section');

    if (confirmationView) {
      // Populate details
      const idEl = document.getElementById('confirm-display-id');
      const locEl = document.getElementById('confirm-display-location');
      const vehEl = document.getElementById('confirm-display-vehicle');
      const sizeEl = document.getElementById('confirm-display-size');
      const srvEl = document.getElementById('confirm-display-service');
      const dateEl = document.getElementById('confirm-display-date');
      const timeEl = document.getElementById('confirm-display-time');
      const nameEl = document.getElementById('confirm-display-name');
      const phoneEl = document.getElementById('confirm-display-phone');
      const emailEl = document.getElementById('confirm-display-email');
      const emailTextEl = document.getElementById('confirm-display-email-text');
      const notesEl = document.getElementById('confirm-display-notes');
      const payBtnEl = document.getElementById('confirm-display-pay-btn');

      if (idEl) idEl.textContent = reservation.code;
      if (locEl) locEl.textContent = reservation.studioLocation;
      if (vehEl) vehEl.textContent = reservation.vehicleModel;
      if (sizeEl) sizeEl.textContent = reservation.vehicleClassification;
      if (srvEl) srvEl.textContent = reservation.servicePackage;
      if (dateEl) dateEl.textContent = reservation.bookingDate;
      if (timeEl) timeEl.textContent = reservation.bookingTime;
      if (nameEl) nameEl.textContent = reservation.clientName;
      if (phoneEl) phoneEl.textContent = reservation.clientPhone;
      if (emailEl) emailEl.textContent = reservation.clientEmail;
      if (emailTextEl) emailTextEl.textContent = reservation.clientEmail;
      if (notesEl) notesEl.textContent = reservation.clientNotes || 'None specified';
      if (payBtnEl) payBtnEl.href = `payment.html?bookingId=${encodeURIComponent(reservation.code)}`;

      // Switch visibility
      if (formCard) formCard.style.display = 'none';
      confirmationView.style.display = 'block';

      // Smooth scroll into view
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      console.log('Reservation confirmed:', reservation);
    }
  }

  function bookAnotherReservation() {
    const formCard = document.getElementById('apex-booking-form-wrapper') || document.getElementById('apex-booking-form')?.closest('.glass-card');
    const confirmationView = document.getElementById('booking-confirmation-view');
    const form = document.getElementById('apex-booking-form');

    if (form) form.reset();
    if (formCard) formCard.style.display = 'block';
    if (confirmationView) confirmationView.style.display = 'none';

    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Helper: Allow other pages to prefill selected service
  function prefillBookingService(serviceName) {
    try {
      localStorage.setItem('apex_prefill_service', serviceName);
    } catch (e) {}
  }

  function checkPrefilledService() {
    try {
      const prefill = localStorage.getItem('apex_prefill_service');
      if (prefill) {
        const select = document.getElementById('booking_service_package') || document.querySelector('[name="service_package"]');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase().includes(prefill.toLowerCase()) || select.options[i].value.toLowerCase().includes(prefill.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
        localStorage.removeItem('apex_prefill_service');
      }
    } catch (e) {}
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initReservationForm();
    checkPrefilledService();
  });

  // Global Export
  window.ApexBooking = {
    getBookings,
    saveBooking,
    prefillBookingService,
    bookAnotherReservation
  };
  window.getBookings = getBookings;
  window.saveBooking = saveBooking;
  window.prefillBookingService = prefillBookingService;

})();
