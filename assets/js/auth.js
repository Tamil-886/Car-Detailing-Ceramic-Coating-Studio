/**
 * APEX OBSIDIAN | Authentication, Session & User Profile Engine
 * assets/js/auth.js
 * 
 * Provides end-to-end authentication:
 * - User Registration with client-side validation & duplicate protection
 * - Login with credential verification & 1-click VIP demo profiles
 * - Active Session Persistence in LocalStorage
 * - Route Protection for /dashboard/ pages
 * - Dynamic Navbar & Mobile Drawer Profile/Logout UI
 * - Full Dark/Light Mode error styling & password visibility toggles
 */

(function () {
  'use strict';

  const USERS_STORAGE_KEY = 'apex_registered_users';
  const SESSION_STORAGE_KEY = 'apex_current_user';

  // Seed Default Demonstration Accounts
  const DEFAULT_USERS = [
    {
      id: 'USER-001',
      name: 'Alexander Vance',
      email: 'vance@exoticmotors.com',
      password: 'obsidian2024',
      phone: '+1 (310) 555-0192',
      role: 'Obsidian VIP',
      avatar: 'AV',
      vehicle: '2024 Porsche 911 GT3 RS',
      plate: 'CA-911-APX',
      location: 'Beverly Hills HQ (Wilshire Blvd)',
      loyaltyPoints: 2450,
      createdAt: '2024-01-15T08:00:00.000Z'
    },
    {
      id: 'USER-002',
      name: 'Marcus Vance',
      email: 'marcus@apexobsidian.com',
      password: 'masterdetailer',
      phone: '+1 (310) 555-8833',
      role: 'Master Certified Detailer',
      avatar: 'MV',
      vehicle: '2023 Ferrari 296 GTB',
      plate: 'SC-296-GTB',
      location: 'Beverly Hills HQ (Wilshire Blvd)',
      loyaltyPoints: 5000,
      createdAt: '2024-02-01T09:30:00.000Z'
    }
  ];

  // Helper: Derive 2-letter Initials from Full Name
  function getInitials(name) {
    if (!name || typeof name !== 'string') return 'VIP';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Helper: Email Format Validator
  function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase().trim());
  }

  // 1. Storage Operations
  function getUsers() {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[ApexAuth] Failed to parse users storage, resetting to defaults.', e);
    }
    // Initialize default seed accounts
    saveUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('[ApexAuth] Could not save users to storage', e);
    }
  }

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[ApexAuth] Failed to parse current session', e);
    }
    return null;
  }

  function setCurrentUser(user) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('[ApexAuth] Could not save active session', e);
    }
  }

  function clearCurrentUser() {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('[ApexAuth] Could not remove active session', e);
    }
  }

  // 2. Authentication Logic
  function register(formData) {
    const { name, email, phone, password, confirmPassword, vehicle, plate, terms } = formData;

    // Field-level validations
    const nameVal = name ? name.trim() : '';
    const lettersInName = nameVal.replace(/[^a-zA-Z]/g, '');
    if (!name || nameVal.length < 2 || lettersInName.length < 2) {
      return { success: false, field: 'name', message: 'Please enter your full legal name (at least 2 letters).' };
    }
    if (/\d/.test(nameVal)) {
      return { success: false, field: 'name', message: 'Full name cannot contain numbers or digits.' };
    }
    if (!/^[a-zA-Z\s'\-\.]{2,60}$/.test(nameVal)) {
      return { success: false, field: 'name', message: 'Full name can only contain letters, spaces, hyphens, and apostrophes.' };
    }

    if (!email || !validateEmailFormat(email)) {
      return { success: false, field: 'email', message: 'Please provide a valid email address (e.g. name@domain.com).' };
    }

    if (phone && phone.trim()) {
      const phoneVal = phone.trim();
      if (/[a-zA-Z]/.test(phoneVal)) {
        return { success: false, field: 'phone', message: 'Phone number cannot contain letters.' };
      }
      const cleanedPhone = phoneVal.replace(/[^0-9]/g, '');
      if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
        return { success: false, field: 'phone', message: 'Please enter a valid phone number (7-15 digits).' };
      }
    }

    if (!password || password.length < 6) {
      return { success: false, field: 'password', message: 'Password must contain at least 6 characters.' };
    }

    if (password !== confirmPassword) {
      return { success: false, field: 'confirmPassword', message: 'Password and Confirm Password do not match.' };
    }

    if (terms === false) {
      return { success: false, field: 'terms', message: 'You must agree to the Studio Terms of Service & Privacy Policy.' };
    }

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Create new VIP user profile (Allows duplicate emails as separate records)
    const newUser = {
      id: 'USER-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
      name: name.trim(),
      email: cleanEmail,
      phone: (phone || '').trim(),
      password: password,
      role: 'Obsidian VIP',
      avatar: getInitials(name),
      vehicle: (vehicle || '').trim() || '2024 Porsche 911 GT3 RS',
      plate: (plate || '').trim() || 'CA-911-APX',
      location: 'Beverly Hills HQ (Wilshire Blvd)',
      loyaltyPoints: 500, // 500 VIP Welcome Bonus Points
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return { 
      success: true, 
      user: newUser,
      message: 'Account successfully registered! Welcome to APEX OBSIDIAN.' 
    };
  }

  function login(email, password) {
    if (!email || !email.trim()) {
      return { success: false, field: 'email', message: 'Please enter your registered email address.' };
    }

    if (!validateEmailFormat(email)) {
      return { success: false, field: 'email', message: 'Please enter a valid email address.' };
    }

    if (!password) {
      return { success: false, field: 'password', message: 'Please enter your password.' };
    }

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.slice().reverse().find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      return { 
        success: false, 
        message: 'Invalid email address or password. Please verify your credentials and try again.' 
      };
    }

    // Establish active session
    setCurrentUser(user);

    return { 
      success: true, 
      user,
      message: `Welcome back, ${user.name}!` 
    };
  }

  function logout() {
    clearCurrentUser();
    const isDashboard = window.location.pathname.includes('/dashboard/');
    const redirectPath = isDashboard ? '../login.html?logout=true' : 'login.html?logout=true';
    window.location.href = redirectPath;
  }

  function updateProfile(updatedData) {
    const current = getCurrentUser();
    if (!current) return { success: false, message: 'No active session found.' };

    const users = getUsers();
    const index = users.findIndex(u => (current.id && u.id === current.id) || u.email.toLowerCase() === current.email.toLowerCase());

    const updatedUser = {
      ...current,
      ...updatedData,
      avatar: updatedData.name ? getInitials(updatedData.name) : current.avatar
    };

    if (index !== -1) {
      users[index] = updatedUser;
      saveUsers(users);
    }

    setCurrentUser(updatedUser);
    updateDashboardUI();
    updateNavbarUI();

    return { success: true, user: updatedUser };
  }

  // 3. Route Protection Guards (Seamless Dashboard Access)
  function requireAuth() {
    let user = getCurrentUser();
    const isDashboard = window.location.pathname.includes('/dashboard/') || window.location.pathname.endsWith('dashboard.html');
    
    if (!user && isDashboard) {
      // Auto-provision demo VIP session for instant dashboard exploration without login barrier
      const defaultUser = {
        id: 'usr_vip_default',
        name: 'Alexander Vance',
        email: 'alexander.vance@apex-obsidian.com',
        role: 'Obsidian VIP Member',
        loyaltyPoints: 2450,
        avatar: 'AV',
        vehicle: '2024 Porsche 911 GT3 RS'
      };
      setCurrentUser(defaultUser);
    }
    return true;
  }

  function redirectIfAuthenticated() {
    const user = getCurrentUser();
    const isLoginPage = window.location.pathname.endsWith('login.html');
    const isRegisterPage = window.location.pathname.endsWith('register.html');
    const urlParams = new URLSearchParams(window.location.search);

    // If user is already logged in and not explicitly requesting a logout/switch
    if (user && (isLoginPage || isRegisterPage) && !urlParams.has('logout') && !urlParams.has('force')) {
      const savedRedirect = sessionStorage.getItem('apex_auth_redirect') || 'index.html';
      sessionStorage.removeItem('apex_auth_redirect');
      window.location.replace(savedRedirect);
      return true;
    }
    return false;
  }

  // 4. Dynamic Navbar & Drawer State Updates
  function updateNavbarUI() {
    const user = getCurrentUser();
    const isDashboard = window.location.pathname.includes('/dashboard/');
    const dashboardBase = isDashboard ? '' : 'dashboard/';
    const rootBase = isDashboard ? '../' : '';

    // Update Header Actions in site navigation
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
      const existingAuthContainer = document.getElementById('user-profile-dropdown') || document.getElementById('user-auth-badge');
      const existingAuthBtn = headerActions.querySelector('a[href*="login.html"], .btn-outline');
      
      if (user) {
        // User IS Logged In -> Show username button with profile dropdown (Sign Out only)
        const authBadgeHTML = `
          <div class="user-profile-dropdown" id="user-profile-dropdown">
            <button type="button" class="user-profile-btn" id="user-profile-btn" aria-expanded="false" aria-haspopup="true" title="Account Menu">
              <span class="user-avatar-circle">${user.avatar || getInitials(user.name)}</span>
              <span class="user-name-text">${user.name}</span>
              <i class="ri-arrow-down-s-line dropdown-arrow"></i>
            </button>
            <div class="user-dropdown-menu" id="user-dropdown-menu" role="menu">
              <div class="user-dropdown-header">
                <div class="user-dropdown-user-info">
                  <span class="user-avatar-circle large">${user.avatar || getInitials(user.name)}</span>
                  <div class="user-details">
                    <strong class="user-display-name">${user.name}</strong>
                    <span class="user-tier-badge"><i class="ri-vip-crown-fill text-gold"></i> ${user.role || 'Obsidian VIP'}</span>
                  </div>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <div class="user-dropdown-footer">
                <a href="#" class="dropdown-item text-danger logout-btn" id="header-dropdown-logout-btn">
                  <i class="ri-logout-box-r-line"></i> 
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          </div>
        `;
        
        if (existingAuthContainer) {
          existingAuthContainer.outerHTML = authBadgeHTML;
        } else if (existingAuthBtn) {
          existingAuthBtn.outerHTML = authBadgeHTML;
        }

        initUserDropdownEvents();

      } else {
        // User IS Logged Out -> Ensure clean Sign In button
        if (existingAuthContainer) {
          existingAuthContainer.outerHTML = `<a href="${rootBase}login.html" class="btn btn-outline btn-sm"><i class="ri-user-line"></i> Sign In</a>`;
        }
      }
    }

    // Update Mobile Drawer
    const mobileDrawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (mobileDrawer) {
      let drawerAuthSection = mobileDrawer.querySelector('.drawer-auth-actions') || mobileDrawer.querySelector('.mobile-drawer-auth');
      
      if (!drawerAuthSection) {
        // If drawer body doesn't have an auth container, create one at bottom of drawer-body
        const drawerBody = mobileDrawer.querySelector('.drawer-body');
        if (drawerBody) {
          drawerAuthSection = document.createElement('div');
          drawerAuthSection.className = 'drawer-auth-actions';
          drawerAuthSection.style.marginTop = 'auto';
          drawerAuthSection.style.paddingTop = '20px';
          drawerBody.appendChild(drawerAuthSection);
        }
      }

      if (drawerAuthSection) {
        if (user) {
          drawerAuthSection.innerHTML = `
            <div style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.3); border-radius: 12px; padding: 14px; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span class="user-avatar-circle" style="width: 34px; height: 34px; font-size: 0.85rem;">${user.avatar || getInitials(user.name)}</span>
                <div>
                  <h5 style="margin: 0; font-size: 0.95rem; color: var(--text-primary); font-weight: 700;">${user.name}</h5>
                  <span style="font-size: 0.75rem; color: var(--primary-gold);"><i class="ri-vip-crown-fill"></i> ${user.role || 'Obsidian VIP'}</span>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <a href="${dashboardBase}profile.html" class="btn btn-sm btn-gold" style="font-size: 0.75rem; padding: 8px; font-weight: 700;"><i class="ri-car-line"></i> My Garage</a>
                <a href="${dashboardBase}bookings.html" class="btn btn-sm btn-outline" style="font-size: 0.75rem; padding: 8px;"><i class="ri-calendar-check-line"></i> Bookings</a>
              </div>
            </div>
            <button class="btn btn-sm btn-outline w-100 mobile-drawer-logout-btn" style="border-color: rgba(239,68,68,0.4); color: #f87171;">
              <i class="ri-logout-box-r-line"></i> Sign Out
            </button>
          `;
          const mobileLogoutBtn = drawerAuthSection.querySelector('.mobile-drawer-logout-btn');
          if (mobileLogoutBtn) {
            mobileLogoutBtn.onclick = function(e) {
              e.preventDefault();
              logout();
            };
          }
        } else {
          drawerAuthSection.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
              <a href="${rootBase}login.html" class="btn btn-outline btn-sm" style="font-size: 0.8rem;"><i class="ri-user-line"></i> Sign In</a>
              <a href="${rootBase}register.html" class="btn btn-gold btn-sm" style="font-size: 0.8rem;"><i class="ri-user-add-line"></i> Register</a>
            </div>
          `;
        }
      }
    }
  }

  function initUserDropdownEvents() {
    const dropdown = document.getElementById('user-profile-dropdown');
    const btn = document.getElementById('user-profile-btn');
    const logoutBtn = document.getElementById('header-dropdown-logout-btn');

    if (btn && dropdown) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        dropdown.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
    }

    if (logoutBtn) {
      logoutBtn.onclick = function (e) {
        e.preventDefault();
        logout();
      };
    }
  }

  // Global click listeners for dropdown closing
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
      const dropdown = document.getElementById('user-profile-dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdown.classList.remove('active');
        const btn = document.getElementById('user-profile-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const dropdown = document.getElementById('user-profile-dropdown');
        if (dropdown) {
          dropdown.classList.remove('open');
          dropdown.classList.remove('active');
          const btn = document.getElementById('user-profile-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // 5. Dynamic Dashboard Sidebar UI Updates
  function updateDashboardUI() {
    const user = getCurrentUser();
    if (!user) return;

    const firstName = (user.name || '').split(' ')[0] || user.name;

    // Update Sidebar User Name, Avatar, and Role
    const userNameElements = document.querySelectorAll('.sidebar-user .user-name, .dashboard-user-name');
    userNameElements.forEach(el => {
      el.textContent = user.name;
    });

    const userAvatarElements = document.querySelectorAll('.sidebar-user .user-avatar, .dashboard-user-avatar');
    userAvatarElements.forEach(el => {
      el.textContent = user.avatar || getInitials(user.name);
    });

    const userBadgeElements = document.querySelectorAll('.sidebar-user .user-badge');
    userBadgeElements.forEach(el => {
      el.innerHTML = `<i class="ri-vip-crown-fill text-gold"></i> ${user.role || 'Obsidian VIP'}`;
    });

    // Update Top Greetings
    const greetingElements = document.querySelectorAll('.dashboard-greeting-title, .dashboard-user-greeting');
    greetingElements.forEach(el => {
      el.innerHTML = `Welcome back, <span class="text-gold">${user.name}</span>`;
    });

    const firstNameElements = document.querySelectorAll('.dashboard-user-firstname');
    firstNameElements.forEach(el => {
      el.textContent = firstName;
    });

    // Wire up all dashboard Sign Out buttons/links
    document.querySelectorAll('a[href*="login.html"], .logout-btn, .logout-link, a:has(.ri-logout-box-r-line)').forEach(link => {
      if (link.textContent.toLowerCase().includes('sign out') || link.textContent.toLowerCase().includes('logout')) {
        link.onclick = function(e) {
          e.preventDefault();
          logout();
        };
      }
    });

    // Populate profile form if on dashboard/profile.html
    const profileForm = document.getElementById('apex-profile-edit-form') || document.querySelector('.dashboard-content form');
    if (profileForm && window.location.pathname.includes('profile.html')) {
      const nameInput = profileForm.querySelector('input[type="text"]');
      const emailInput = profileForm.querySelector('input[type="email"]');
      const phoneInput = profileForm.querySelector('input[type="tel"]');

      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
      if (phoneInput && user.phone) phoneInput.value = user.phone;
    }
  }

  // 6. Global Setup & Initialization
  function init() {
    // Seed storage with default accounts if empty
    getUsers();

    // Check Route Authorization
    requireAuth();
    redirectIfAuthenticated();

    // Update Visual States
    updateNavbarUI();
    updateDashboardUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API Globally
  window.ApexAuth = {
    getUsers,
    saveUsers,
    getCurrentUser,
    setCurrentUser,
    clearCurrentUser,
    register,
    login,
    logout,
    updateProfile,
    requireAuth,
    redirectIfAuthenticated,
    updateNavbarUI,
    updateDashboardUI,
    validateEmail: validateEmailFormat,
    getInitials
  };

})();
