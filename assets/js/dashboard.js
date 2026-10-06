/**
 * APEX OBSIDIAN - Car Detailing & Ceramic Coating Studio
 * assets/js/dashboard.js - Customer Dashboard Engine, Live Service Tracker & Loyalty System
 */

(function () {
  'use strict';

  // 1. 7-Stage Cleanroom Service Pipeline Definition
  var SERVICE_STAGES = [
    {
      stage: 1,
      name: "Booking Confirmed",
      desc: "Studio appointment secured and bay allocated",
      badge: "Confirmed",
      icon: "ri-calendar-check-line",
      progress: 14
    },
    {
      stage: 2,
      name: "Vehicle Received",
      desc: "Checked into Bay 02, odometer logged, initial wash prep",
      badge: "Received",
      icon: "ri-car-line",
      progress: 28
    },
    {
      stage: 3,
      name: "Inspection & Ultrasonic Paint Scan",
      desc: "Mil-spec digital paint gauge scan and swirl defect mapping",
      badge: "Scanning",
      icon: "ri-scan-2-line",
      progress: 42
    },
    {
      stage: 4,
      name: "Detailing & Multi-Stage Correction",
      desc: "Rotary & DA dual action polishing, 10H ceramic bond application",
      badge: "In Progress",
      icon: "ri-sparkling-fill",
      progress: 70
    },
    {
      stage: 5,
      name: "Quality Check & Gloss Meter Sign-Off",
      desc: "Triple Scangrip 96 CRI optical audit; 99.4 Gloss Units certified",
      badge: "QC Audit",
      icon: "ri-shield-check-line",
      progress: 85
    },
    {
      stage: 6,
      name: "Ready for Pickup",
      desc: "Cured in climate-controlled cleanroom; VIP handover staged",
      badge: "Ready",
      icon: "ri-checkbox-circle-line",
      progress: 95
    },
    {
      stage: 7,
      name: "Completed",
      desc: "Handover finalized, digital warranty certificate issued",
      badge: "Delivered",
      icon: "ri-award-line",
      progress: 100
    }
  ];

  // Default In-Bay Tracking Telemetry
  var DEFAULT_TRACKING = {
    bookingId: "APX-8924",
    vehicle: "2024 Porsche 911 GT3 RS",
    plate: "CA-911-APX",
    color: "Obsidian Black Metallic",
    currentStage: 4,
    serviceName: "Ceramic Pro 10H Obsidian Shield + 3-Stage Correction",
    technician: "Marcus Vance (Master Certified Detailer)",
    bay: "Cleanroom Bay 02 (Class 10,000 ISO)",
    startedAt: "Today, 08:30 AM",
    estimatedCompletion: "Today, 05:45 PM",
    preGloss: 68.2,
    currentGloss: 98.6,
    targetGloss: 99.8,
    cureTemp: "22.5 °C",
    cureHumidity: "42 % RH",
    notes: "Paint correction complete on hood and quarter panels. 1st layer of 10H nanotech ceramic cured. Applying hydrophobic topcoat."
  };

  function getTrackingData() {
    var stored = localStorage.getItem('apex_active_tracking');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Tracking parse error", e);
      }
    }
    localStorage.setItem('apex_active_tracking', JSON.stringify(DEFAULT_TRACKING));
    return DEFAULT_TRACKING;
  }

  function saveTrackingData(data) {
    localStorage.setItem('apex_active_tracking', JSON.stringify(data));
  }

  // Render 7-Stage Timeline in DOM
  function renderTimeline() {
    var container = document.getElementById('apex-service-timeline');
    var stagePill = document.getElementById('tracker-current-stage-name');
    var progressBar = document.getElementById('tracker-progress-bar');
    var percentText = document.getElementById('tracker-progress-percent');
    var data = getTrackingData();

    var currentStageObj = SERVICE_STAGES.find(function (s) { return s.stage === data.currentStage; }) || SERVICE_STAGES[3];

    if (stagePill) stagePill.textContent = "Stage " + data.currentStage + ": " + currentStageObj.name;
    if (progressBar) progressBar.style.width = currentStageObj.progress + "%";
    if (percentText) percentText.textContent = currentStageObj.progress + "% Completed";

    if (!container) return;

    container.innerHTML = SERVICE_STAGES.map(function (s) {
      var isCompleted = s.stage < data.currentStage;
      var isCurrent = s.stage === data.currentStage;

      var statusClass = "pending";
      var statusBadge = "Upcoming";

      if (isCompleted) {
        statusClass = "completed";
        statusBadge = "Done";
      } else if (isCurrent) {
        statusClass = "active";
        statusBadge = "Live Now";
      }

      return '<div class="timeline-step ' + statusClass + '" data-stage="' + s.stage + '">' +
        '<div class="step-indicator"><i class="' + (isCompleted ? 'ri-check-line' : s.icon) + '"></i></div>' +
        '<div class="step-content">' +
          '<div class="step-header">' +
            '<h4 class="step-title">Stage ' + s.stage + ': ' + s.name + '</h4>' +
            '<span class="step-badge ' + statusClass + '">' + statusBadge + '</span>' +
          '</div>' +
          '<p class="step-desc">' + s.desc + '</p>' +
          (isCurrent ? (
            '<div class="step-telemetry-box">' +
              '<div class="telemetry-item"><span class="label">Lead Detailer:</span> <span class="val">' + data.technician + '</span></div>' +
              '<div class="telemetry-item"><span class="label">Bay Location:</span> <span class="val">' + data.bay + '</span></div>' +
              '<div class="telemetry-item"><span class="label">Current Optical Gloss:</span> <span class="val text-gold"><strong>' + data.currentGloss + ' GU</strong> (Target: ' + data.targetGloss + ' GU)</span></div>' +
              '<div class="telemetry-item"><span class="label">Cleanroom Atmosphere:</span> <span class="val">' + data.cureTemp + ' | ' + data.cureHumidity + '</span></div>' +
            '</div>'
          ) : '') +
        '</div>' +
      '</div>';
    }).join('');
  }

  // Advance Stage Simulation (Demo/Testing)
  function advanceServiceStage() {
    var data = getTrackingData();
    if (data.currentStage < 7) {
      data.currentStage += 1;
      if (data.currentStage === 5) data.currentGloss = 99.4;
      if (data.currentStage === 6) data.currentGloss = 99.8;
      if (data.currentStage === 7) data.currentGloss = 100.0;
      saveTrackingData(data);
      renderTimeline();
      showToast("Advanced to Stage " + data.currentStage + ": " + SERVICE_STAGES[data.currentStage - 1].name, 'success');
    } else {
      showToast('Vehicle service is already fully completed!', 'info');
    }
  }

  function resetServiceStage() {
    var data = getTrackingData();
    data.currentStage = 1;
    data.currentGloss = 68.2;
    saveTrackingData(data);
    renderTimeline();
    showToast('Service tracker reset to Stage 1 for demonstration.', 'info');
  }

  // 2. Bookings Filter System
  function initBookingsFilter() {
    var filterBtns = document.querySelectorAll('.booking-filter-btn, .dash-filter-btn[data-filter]');
    var rows = document.querySelectorAll('.booking-table-row, [data-booking-status]');

    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        rows.forEach(function (row) {
          var status = row.getAttribute('data-status') || row.getAttribute('data-booking-status');
          if (filter === 'all' || status === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Photo Vault Filter System
  function initPhotoVaultFilter() {
    var filterBtns = document.querySelectorAll('.vault-filter-btn');
    var cards = document.querySelectorAll('.vault-vehicle-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-vehicle');
        cards.forEach(function (card) {
          var vehicle = card.getAttribute('data-vehicle-id');
          if (filter === 'all' || vehicle === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Loyalty Points Store Redemption Logic
  function redeemVoucher(cost, voucherName) {
    var currentUser = (window.ApexAuth && window.ApexAuth.getCurrentUser) ? window.ApexAuth.getCurrentUser() : null;
    var points = 2450;
    
    if (currentUser && currentUser.loyaltyPoints !== undefined) {
      points = currentUser.loyaltyPoints;
    } else {
      var storedPoints = localStorage.getItem('apex_loyalty_points');
      if (storedPoints) points = parseInt(storedPoints, 10);
    }

    if (points < cost) {
      showToast("Insufficient points! You need " + cost.toLocaleString() + " pts to redeem " + voucherName + ".", 'error');
      return;
    }

    points -= cost;
    localStorage.setItem('apex_loyalty_points', points.toString());

    if (currentUser) {
      currentUser.loyaltyPoints = points;
      if (window.ApexAuth && window.ApexAuth.updateProfile) {
        window.ApexAuth.updateProfile({ loyaltyPoints: points });
      }
    }

    // Update all point balance displays
    document.querySelectorAll('.loyalty-balance-display').forEach(function (el) {
      el.textContent = points.toLocaleString();
    });

    showToast("Successfully redeemed " + voucherName + "! Voucher voucher code issued to your profile.", 'success');
  }

  // 5. Garage Management (Add / Remove Vehicles)
  function promptAddVehicle() {
    var model = prompt('Enter Vehicle Make & Model (e.g. 2024 Ferrari 296 GTB):', '');
    if (!model || !model.trim()) return;
    var plate = prompt('Enter License Plate (e.g. CA-296-EXO):', 'CA-APEX');
    
    showToast('Vehicle "' + model.trim() + '" successfully registered to your Apex Obsidian VIP garage!', 'success');
  }

  // 6. Mobile Sidebar Overlay & Drawer
  function initDashboardSidebar() {
    var sidebarToggle = document.getElementById('sidebar-toggle-btn');
    var sidebar = document.getElementById('dashboard-sidebar') || document.querySelector('.dashboard-sidebar');
    var overlay = document.querySelector('.sidebar-overlay');

    if (!overlay && sidebar) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    var closeSidebar = function () {
      if (sidebar) sidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    };

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active', sidebar.classList.contains('active'));
      });

      var closeBtn = sidebar.querySelector('.sidebar-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
      }

      if (overlay) {
        overlay.addEventListener('click', closeSidebar);
      }

      sidebar.querySelectorAll('.sidebar-links a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 991) closeSidebar();
        });
      });
    }
  }

  // 7. Profile and Security Form Handlers
  function handleProfileUpdate(e) {
    if (e && e.preventDefault) e.preventDefault();
    var nameInput = document.getElementById('profile-name');
    var phoneInput = document.getElementById('profile-phone');
    var locInput = document.getElementById('profile-location');
    
    var newName = nameInput ? nameInput.value.trim() : '';
    var newPhone = phoneInput ? phoneInput.value.trim() : '';
    var newLoc = locInput ? locInput.value : '';

    if (!newName) {
      showToast('Please enter your name.', 'error');
      return false;
    }

    if (window.ApexAuth && window.ApexAuth.updateProfile) {
      window.ApexAuth.updateProfile({
        name: newName,
        phone: newPhone,
        location: newLoc
      });
    }

    showToast('Profile information successfully saved and synced!', 'success');
    return false;
  }

  function handlePasswordUpdate(e) {
    if (e && e.preventDefault) e.preventDefault();
    var currPass = document.getElementById('settings-curr-pass');
    var newPass = document.getElementById('settings-new-pass');
    
    var curr = currPass ? currPass.value : '';
    var next = newPass ? newPass.value : '';

    if (!next || next.length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return false;
    }

    var currentUser = (window.ApexAuth && window.ApexAuth.getCurrentUser) ? window.ApexAuth.getCurrentUser() : null;
    if (currentUser && currentUser.password && curr && curr !== currentUser.password) {
      showToast('Current password does not match registered records.', 'error');
      return false;
    }

    if (window.ApexAuth && window.ApexAuth.updateProfile) {
      window.ApexAuth.updateProfile({ password: next });
    }

    if (currPass) currPass.value = '';
    if (newPass) newPass.value = '';

    showToast('Password successfully updated and encrypted!', 'success');
    return false;
  }

  // 8. Modal Management Helpers
  function initModals() {
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  // Simple Notification Toast Helper
  function showToast(message, type) {
    type = type || 'info';
    
    var toastContainer = document.getElementById('dash-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'dash-toast-container';
      toastContainer.style.cssText = 'position:fixed;bottom:25px;right:25px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    var toast = document.createElement('div');
    var isSuccess = type === 'success';
    var isError = type === 'error';
    var icon = isSuccess ? 'ri-checkbox-circle-fill' : (isError ? 'ri-error-warning-fill' : 'ri-information-fill');
    var borderColor = isSuccess ? '#22c55e' : (isError ? '#ef4444' : '#d4af37');

    toast.style.cssText = 'background:#0f172a;color:#fff;border:1px solid ' + borderColor + ';border-radius:12px;padding:14px 20px;font-size:0.88rem;box-shadow:0 10px 30px rgba(0,0,0,0.5);display:flex;align-items:center;gap:10px;pointer-events:auto;transition:all 0.3s ease;transform:translateY(10px);opacity:0;';
    toast.innerHTML = '<i class="' + icon + '" style="font-size:1.2rem;color:' + borderColor + ';"></i> <span>' + message + '</span>';

    toastContainer.appendChild(toast);
    requestAnimationFrame(function () {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () {
        if (toast && toast.remove) {
          toast.remove();
        } else if (toast && toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  // Initialize on DOM Ready
  
  // Dynamic Bookings Table Renderer
  // Dynamic Bookings Table Renderer
  function renderBookingsTable() {
    var tbody = document.getElementById('dashboard-bookings-tbody') || document.querySelector('.dashboard-bookings-table tbody');
    if (!tbody) return;

    var bookings = (window.getBookings ? window.getBookings() : null) || [
      {
        code: 'APX-8924',
        vehicleModel: '2024 Porsche 911 GT3 RS',
        servicePackage: 'Ceramic Pro 10H Obsidian Shield + 3-Stage',
        studioLocation: 'Cleanroom Bay 02',
        bookingDate: 'Today (Drop-off 08:30 AM)',
        status: 'In-Progress',
        paymentStatus: 'Paid'
      }
    ];

    tbody.innerHTML = '';

    bookings.forEach(function (b) {
      var tr = document.createElement('tr');
      tr.className = 'booking-table-row';
      var statusKey = (b.status || 'Confirmed').toLowerCase().replace(/\s+/g, '-');
      tr.setAttribute('data-status', statusKey);
      tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

      var statusBadgeHtml = '';
      if (statusKey === 'in-progress' || statusKey === 'in-bay') {
        statusBadgeHtml = '<span class="badge badge-emerald" style="font-size: 0.75rem;"><i class="ri-loader-4-line spin"></i> In Progress</span>';
      } else if (statusKey === 'completed') {
        statusBadgeHtml = '<span class="badge badge-cyan" style="font-size: 0.75rem;"><i class="ri-checkbox-circle-fill"></i> Completed</span>';
      } else if (statusKey === 'cancelled') {
        statusBadgeHtml = '<span class="badge badge-danger" style="font-size: 0.75rem;"><i class="ri-close-circle-line"></i> Cancelled</span>';
      } else {
        statusBadgeHtml = '<span class="badge badge-gold" style="font-size: 0.75rem;"><i class="ri-calendar-check-line"></i> Confirmed</span>';
      }

      var paymentBadgeHtml = '';
      if ((b.paymentStatus || '').toLowerCase() === 'paid') {
        paymentBadgeHtml = '<span class="badge badge-emerald" style="font-size: 0.75rem;"><i class="ri-checkbox-circle-line"></i> Paid</span>';
      } else {
        paymentBadgeHtml = '<a href="../payment.html?bookingId=' + encodeURIComponent(b.code || b.id) + '" class="badge badge-warning" style="font-size: 0.75rem; text-decoration:none;" title="Click to Complete Payment"><i class="ri-time-line"></i> Pending</a>';
      }

      tr.innerHTML = `
        <td style="padding: 15px 10px; font-weight: 700; color: var(--primary-gold); font-family: var(--font-mono, monospace);">${b.code || b.id}</td>
        <td style="padding: 15px 10px;">
          <strong style="color: var(--text-primary);">${b.vehicleModel || (b.vehicle ? (b.vehicle.year + ' ' + b.vehicle.make + ' ' + b.vehicle.model) : 'Vehicle')}</strong><br>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${b.vehicleClassification || 'Standard Classification'}</span>
        </td>
        <td style="padding: 15px 10px; color: var(--text-secondary);">${b.servicePackage || b.packageName || 'Studio Detailing'}</td>
        <td style="padding: 15px 10px;"><span class="badge badge-outline" style="font-size: 0.75rem;">${b.studioLocation || 'Beverly Hills Cleanroom'}</span></td>
        <td style="padding: 15px 10px; color: var(--text-primary);">${b.bookingDate || b.serviceDate} <small style="color: var(--text-muted); display: block;">${b.bookingTime || b.timeSlot || ''}</small></td>
        <td style="padding: 15px 10px;">${statusBadgeHtml}</td>
        <td style="padding: 15px 10px;">${paymentBadgeHtml}</td>
        <td style="padding: 15px 10px; text-align: right;">
          <a href="booking-details.html?id=${encodeURIComponent(b.code || b.id)}" class="btn btn-sm btn-gold"><i class="ri-file-search-line"></i> Details</a>
        </td>
      `;
      tbody.appendChild(tr);
    });

    updateBookingFilterCounts(bookings);
  }

  function updateBookingFilterCounts(bookings) {
    var allBtn = document.querySelector('.booking-filter-btn[data-filter="all"]');
    var inProgBtn = document.querySelector('.booking-filter-btn[data-filter="in-progress"]');
    var confirmedBtn = document.querySelector('.booking-filter-btn[data-filter="confirmed"]') || document.querySelector('.booking-filter-btn[data-filter="upcoming"]');
    var compBtn = document.querySelector('.booking-filter-btn[data-filter="completed"]');

    var total = bookings.length;
    var inProg = bookings.filter(b => (b.status || '').toLowerCase().includes('progress') || (b.status || '').toLowerCase().includes('bay')).length;
    var confirmed = bookings.filter(b => (b.status || '').toLowerCase().includes('confirm') || (b.status || '').toLowerCase().includes('upcoming')).length;
    var completed = bookings.filter(b => (b.status || '').toLowerCase().includes('complete')).length;

    if (allBtn) allBtn.textContent = 'All Bookings (' + total + ')';
    if (inProgBtn) inProgBtn.textContent = 'In-Bay Active (' + inProg + ')';
    if (confirmedBtn) confirmedBtn.textContent = 'Confirmed (' + confirmed + ')';
    if (compBtn) compBtn.textContent = 'Completed (' + completed + ')';
  }

  function renderRecentBookingsTable() {
    var tbody = document.getElementById('dashboard-recent-bookings-tbody');
    if (!tbody) return;

    var bookings = (window.getBookings ? window.getBookings() : null) || [];
    tbody.innerHTML = '';

    var recent = bookings.slice(0, 3);
    if (recent.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">No active reservations. <a href="../index.html#booking-section" class="text-gold">Book your first slot</a></td></tr>';
      return;
    }

    recent.forEach(function (b) {
      var tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
      var statusBadge = (b.status === 'In-Progress' || b.status === 'in-bay')
        ? '<span class="badge badge-emerald">In-Progress</span>'
        : (b.status === 'Completed' ? '<span class="badge badge-cyan">Completed</span>' : '<span class="badge badge-gold">Confirmed</span>');

      tr.innerHTML = `
        <td style="padding: 12px 0; font-weight: 600; color: var(--primary-gold); font-family: var(--font-mono, monospace);">${b.code || b.id}</td>
        <td style="padding: 12px 0; color: var(--text-primary); font-weight: 600;">${b.vehicleModel || (b.vehicle ? (b.vehicle.year + ' ' + b.vehicle.make + ' ' + b.vehicle.model) : 'Vehicle')}</td>
        <td style="padding: 12px 0; color: var(--text-secondary); max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${b.servicePackage || b.packageName || 'Detailing'}</td>
        <td style="padding: 12px 0;">${statusBadge}</td>
        <td style="padding: 12px 0; text-align: right;"><a href="booking-details.html?id=${encodeURIComponent(b.code || b.id)}" class="btn btn-sm btn-outline">View</a></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderBookingDetailsPage() {
    var titleEl = document.getElementById('booking-details-code-title');
    if (!titleEl) return;

    var urlParams = new URLSearchParams(window.location.search);
    var requestedCode = urlParams.get('id');

    var bookings = (window.getBookings ? window.getBookings() : null) || [];
    var booking = bookings.find(b => (b.code === requestedCode || b.id === requestedCode)) || bookings[0];

    if (!booking) return;

    titleEl.textContent = '#' + (booking.code || booking.id);
    
    var subEl = document.getElementById('booking-details-sub-title');
    if (subEl) subEl.textContent = (booking.vehicleModel || 'Porsche 911') + ' • ' + (booking.status || 'Confirmed');

    var studioEl = document.getElementById('booking-details-studio');
    if (studioEl) studioEl.textContent = booking.studioLocation || 'Beverly Hills Cleanroom Studio';

    var techEl = document.getElementById('booking-details-technician');
    if (techEl) techEl.textContent = booking.technician || 'Marcus Vance (IDA Master)';

    var timeEl = document.getElementById('booking-details-time');
    if (timeEl) timeEl.textContent = (booking.bookingDate || 'Scheduled') + ' (' + (booking.bookingTime || 'Drop-off') + ')';

    var srvEl = document.getElementById('booking-details-service-name');
    if (srvEl) srvEl.textContent = booking.servicePackage || '10H Obsidian Ceramic Shield';

    var notesEl = document.getElementById('booking-details-client-notes');
    if (notesEl) notesEl.textContent = booking.clientNotes || 'No special instructions logged.';

    // Dynamic pricing & payment information
    var payBadgeEl = document.getElementById('booking-details-payment-badge');
    var payActionEl = document.getElementById('booking-details-payment-action-box');
    var totalEl = document.getElementById('booking-details-total-price');
    var itemTitleEl = document.getElementById('booking-details-item-title');

    var isPaid = (booking.paymentStatus || '').toLowerCase() === 'paid';
    var formattedPrice = booking.totalPrice ? (typeof booking.totalPrice === 'number' ? '$' + booking.totalPrice.toLocaleString() : booking.totalPrice) : '$1,950';

    if (itemTitleEl) itemTitleEl.textContent = booking.servicePackage || 'Ceramic Pro 10H Obsidian Shield';
    if (totalEl) totalEl.textContent = formattedPrice;

    if (payBadgeEl) {
      if (isPaid) {
        payBadgeEl.innerHTML = '<span class="badge badge-emerald" style="font-size: 0.8rem;"><i class="ri-checkbox-circle-line"></i> Paid & Verified</span>';
      } else {
        payBadgeEl.innerHTML = '<span class="badge badge-warning" style="font-size: 0.8rem;"><i class="ri-time-line"></i> Pending Payment</span>';
      }
    }

    if (payActionEl) {
      if (!isPaid) {
        payActionEl.innerHTML = `
          <a href="../payment.html?bookingId=${encodeURIComponent(booking.code || booking.id)}" class="btn btn-gold w-100" style="margin-top: 10px; font-weight: 700;">
            <i class="ri-secure-payment-line"></i> Complete Secure Payment (${formattedPrice})
          </a>
        `;
      } else {
        payActionEl.innerHTML = `
          <a href="invoices.html" class="btn btn-outline w-100" style="margin-top: 10px; font-size: 0.85rem;">
            <i class="ri-file-text-line"></i> View Official Invoice & E-Warranty
          </a>
        `;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderBookingsTable();
    renderRecentBookingsTable();
    renderBookingDetailsPage();
    renderTimeline();
    initBookingsFilter();
    initPhotoVaultFilter();
    initDashboardSidebar();
    initModals();

    // Attach form listeners
    var profileForm = document.getElementById('apex-profile-edit-form');
    if (profileForm) {
      profileForm.addEventListener('submit', handleProfileUpdate);
    }

    var secForm = document.getElementById('apex-security-form');
    if (secForm) {
      secForm.addEventListener('submit', handlePasswordUpdate);
    }

    // Hydrate loyalty points from storage
    var points = localStorage.getItem('apex_loyalty_points') || '2,450';
    document.querySelectorAll('.loyalty-balance-display').forEach(function (el) {
      el.textContent = typeof points === 'number' ? points.toLocaleString() : points;
    });
  });

  // Expose API to window
  window.ApexDashboard = {
    getTrackingData: getTrackingData,
    saveTrackingData: saveTrackingData,
    renderTimeline: renderTimeline,
    advanceServiceStage: advanceServiceStage,
    resetServiceStage: resetServiceStage,
    redeemVoucher: redeemVoucher,
    promptAddVehicle: promptAddVehicle,
    handleProfileUpdate: handleProfileUpdate,
    handlePasswordUpdate: handlePasswordUpdate,
    showToast: showToast
  };
  window.ApexNotifications = { show: showToast };
  window.showToast = showToast;
  window.handleProfileUpdate = handleProfileUpdate;
  window.handlePasswordUpdate = handlePasswordUpdate;

})();
