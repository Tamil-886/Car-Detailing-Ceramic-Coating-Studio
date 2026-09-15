/**
 * APEX OBSIDIAN | Navigation, Sticky Header & Mobile Drawer Engine (assets/js/navigation.js)
 */

(function () {
  'use strict';

  function initNavigation() {
    const siteHeader = document.getElementById('site-header') || document.querySelector('.site-header, .main-header');
    const mobileToggleBtn = document.getElementById('mobile-menu-toggle') || document.getElementById('mobileMenuToggle') || document.querySelector('.mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer') || document.getElementById('mobileNavDrawer') || document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn') || document.getElementById('mobileMenuClose') || document.querySelector('.drawer-close');

    // Sticky Header Scroll Effect
    if (siteHeader) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Open Mobile Drawer
    if (mobileToggleBtn && mobileDrawer) {
      mobileToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    // Close Mobile Drawer
    const closeDrawer = () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    // Close on mobile nav link click or backdrop click
    document.querySelectorAll('.mobile-nav-links a, .drawer-body a').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    if (mobileDrawer) {
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
          closeDrawer();
        }
      });
    }

    // Dropdown hover & keyboard accessibility
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
      const trigger = item.querySelector('a');
      const menu = item.querySelector('.dropdown-menu');

      if (trigger && menu) {
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });

    window.closeDrawer = closeDrawer;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
