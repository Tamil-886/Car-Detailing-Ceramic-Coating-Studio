/**
 * APEX OBSIDIAN | Gallery Filter & Lightbox Engine (assets/js/gallery.js)
 */

(function () {
  'use strict';

  function initGallery() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter || category.includes(filter)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Modal
  function openLightbox(imgSrc, title, desc) {
    let modal = document.getElementById('galleryLightboxModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'galleryLightboxModal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(16px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="position:relative;max-width:900px;width:100%;background:#0c0f17;border:1px solid rgba(0,240,255,0.3);border-radius:24px;overflow:hidden;box-shadow:0 0 50px rgba(0,0,0,0.9);">
        <button onclick="document.getElementById('galleryLightboxModal').style.display='none'" style="position:absolute;top:16px;right:16px;z-index:10;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,0.6);color:#fff;font-size:1.2rem;border:1px solid rgba(255,255,255,0.2);">✕</button>
        <img src="${imgSrc}" alt="${title}" style="width:100%;max-height:550px;object-fit:cover;">
        <div style="padding:24px;">
          <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin-bottom:6px;">${title}</h3>
          <p style="color:#94a3b8;font-size:0.875rem;">${desc || 'Master certified detailing and ceramic coating restoration.'}</p>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  }

  window.openLightbox = openLightbox;

  document.addEventListener('DOMContentLoaded', initGallery);
})();
