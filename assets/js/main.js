/**
 * APEX OBSIDIAN | Global Master Utilities (assets/js/main.js)
 */

(function () {
  'use strict';

  // 1. Toast Notification System
  function showToast(message, duration = 3000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }

    // Dismiss older toasts if more than 1 are displaying
    while (container.children.length >= 2) {
      container.removeChild(container.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = 'apex-toast';
    toast.innerHTML = `<span class="apex-toast-dot"></span> <span>${message}</span>`;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // 2. Interactive Before & After Slider Logic
  function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.ba-slider-container, .before-after-container');

    function syncSliderSizes() {
      sliders.forEach(slider => {
        const beforeImg = slider.querySelector('.ba-image-before-wrapper img, .img-before-wrapper img');
        if (beforeImg && slider.offsetWidth > 0) {
          beforeImg.style.width = `${slider.offsetWidth}px`;
          beforeImg.style.maxWidth = `${slider.offsetWidth}px`;
          beforeImg.style.height = `${slider.offsetHeight}px`;
        }
      });
    }

    syncSliderSizes();
    window.addEventListener('resize', syncSliderSizes);
    window.addEventListener('load', syncSliderSizes);
    setTimeout(syncSliderSizes, 100);
    setTimeout(syncSliderSizes, 400);

    // Watch for size changes if container resized
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => syncSliderSizes());
      sliders.forEach(slider => resizeObserver.observe(slider));
    }

    sliders.forEach(slider => {
      const beforeImg = slider.querySelector('.ba-image-before-wrapper img, .img-before-wrapper img');
      if (beforeImg) {
        beforeImg.addEventListener('load', syncSliderSizes);
      }
      const beforeWrapper = slider.querySelector('.ba-image-before-wrapper, .img-before-wrapper');
      const handle = slider.querySelector('.ba-slider-handle, .slider-handle');
      if (!beforeWrapper || !handle) return;

      let isDragging = false;

      function updateSlider(clientX) {
        const rect = slider.getBoundingClientRect();
        let pos = ((clientX - rect.left) / rect.width) * 100;
        pos = Math.max(0, Math.min(100, pos));

        beforeWrapper.style.width = `${pos}%`;
        handle.style.left = `${pos}%`;
      }

      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
      });
      window.addEventListener('mouseup', () => isDragging = false);
      window.addEventListener('mousemove', (e) => {
        if (isDragging) updateSlider(e.clientX);
      });

      // Touch events
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', () => isDragging = false);
      window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches[0]) updateSlider(e.touches[0].clientX);
      }, { passive: true });
    });
  }

  // 3. Number Counter Animation
  function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          const count = +entry.target.innerText;
          const inc = target / speed;

          function updateCount() {
            const current = +entry.target.innerText;
            if (current < target) {
              entry.target.innerText = Math.ceil(current + inc);
              setTimeout(updateCount, 15);
            } else {
              entry.target.innerText = target;
            }
          }
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  
  // 5. Booking Pre-fill Handler
  function initBookingPrefill() {
    const serviceSelect = document.getElementById('booking_service_package');
    if (!serviceSelect) return;

    let targetService = '';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('service')) {
      targetService = decodeURIComponent(urlParams.get('service'));
    } else {
      const stored = localStorage.getItem('apex_prefill_service');
      if (stored) {
        targetService = stored;
        localStorage.removeItem('apex_prefill_service');
      }
    }

    if (targetService) {
      const cleanTarget = targetService.toLowerCase().trim();
      for (let i = 0; i < serviceSelect.options.length; i++) {
        const optText = serviceSelect.options[i].text.toLowerCase();
        const optVal = serviceSelect.options[i].value.toLowerCase();
        if (optText.includes(cleanTarget) || optVal.includes(cleanTarget) || cleanTarget.includes(optText)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // 4. FAQ Accordion Logic
  function initFaqs() {
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const body = item.querySelector('.faq-answer-body');
      if (btn && body) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          faqItems.forEach(i => {
            i.classList.remove('active');
            const b = i.querySelector('.faq-answer-body');
            if (b) b.style.maxHeight = null;
          });

          if (!isOpen) {
            item.classList.add('active');
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // Expose
  window.showToast = showToast;
  window.ApexNotifications = {
    show: function (message, type = 'info') {
      showToast(message);
    }
  };
  window.initBeforeAfterSliders = initBeforeAfterSliders;
  window.initBookingPrefill = initBookingPrefill;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initBeforeAfterSliders();
    initCounters();
    initFaqs();
    initBookingPrefill();
  });
})();
