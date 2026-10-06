/**
 * APEX OBSIDIAN | Navigation, Sticky Header, Mobile Drawer & Back-to-Top Engine (assets/js/navigation.js)
 */

(function () {
  'use strict';

  function initNavigation() {
    const siteHeader = document.getElementById('site-header') || document.querySelector('.site-header, .main-header');
    const mobileDrawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    
    // 1. Ensure Drawer Backdrop Overlay exists
    let backdrop = document.getElementById('drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'drawer-backdrop';
      backdrop.className = 'drawer-backdrop';
      document.body.appendChild(backdrop);
    }

    // 2. Ensure Back-To-Top Button exists
    let backToTopBtn = document.getElementById('back-to-top-btn') || document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'back-to-top-btn';
      backToTopBtn.className = 'back-to-top-btn';
      backToTopBtn.setAttribute('aria-label', 'Scroll to top');
      backToTopBtn.setAttribute('title', 'Back to Top');
      backToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
      document.body.appendChild(backToTopBtn);
    }

    // Sticky Header & Back-to-Top Scroll Effects
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      if (siteHeader) {
        if (scrollY > 30) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 280) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to Top Click
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Drawer Open / Close Helpers
    function openDrawer() {
      if (mobileDrawer) {
        mobileDrawer.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Delegated click handler for maximum responsiveness across 360, 768, 1024
    document.addEventListener('click', (e) => {
      // Toggle button clicked
      const toggleBtn = e.target.closest('#mobile-menu-toggle, .mobile-toggle, .mobile-menu-btn, #sidebar-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
          closeDrawer();
        } else {
          openDrawer();
        }
        return;
      }

      // Close button clicked
      const closeBtn = e.target.closest('#drawer-close-btn, .drawer-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
        return;
      }

      // Backdrop clicked
      if (e.target === backdrop) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      // Nav link inside drawer clicked
      const drawerLink = e.target.closest('.mobile-nav-links a, .drawer-body a:not(.dropdown-toggle)');
      if (drawerLink && mobileDrawer && mobileDrawer.contains(drawerLink)) {
        closeDrawer();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Dropdown hover & keyboard accessibility on desktop
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

    // Expose helpers globally
    window.openDrawer = openDrawer;
    window.closeDrawer = closeDrawer;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
