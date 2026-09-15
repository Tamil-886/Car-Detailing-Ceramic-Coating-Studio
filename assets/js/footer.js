/**
 * APEX OBSIDIAN | Reusable Master Footer Component (assets/js/footer.js)
 * Single Source of Truth for footer content across all pages.
 */

(function () {
  'use strict';

  function getFooterHTML(prefix = '') {
    return `<footer class="site-footer" id="main-site-footer">
    <!-- Top Highlights Bar -->
    <div class="footer-highlights">
        <div class="container">
            <div class="footer-highlights-grid">
                <div class="footer-highlight-item">
                    <div class="highlight-icon"><i class="ri-shield-star-fill text-gold"></i></div>
                    <div class="highlight-text">
                        <h4>ISO-6 Cleanroom Facility</h4>
                        <p>HEPA-filtered climate & dust-free bays</p>
                    </div>
                </div>
                <div class="footer-highlight-item">
                    <div class="highlight-icon"><i class="ri-award-fill text-gold"></i></div>
                    <div class="highlight-text">
                        <h4>Certified Master Detailers</h4>
                        <p>XPEL, Gtechniq & Swissvax verified</p>
                    </div>
                </div>
                <div class="footer-highlight-item">
                    <div class="highlight-icon"><i class="ri-dashboard-3-fill text-gold"></i></div>
                    <div class="highlight-text">
                        <h4>Live 7-Stage Telemetry</h4>
                        <p>Real-time customer progress portal</p>
                    </div>
                </div>
                <div class="footer-highlight-item">
                    <div class="highlight-icon"><i class="ri-medal-fill text-gold"></i></div>
                    <div class="highlight-text">
                        <h4>Transferable E-Warranty</h4>
                        <p>Digital gloss audit certificates</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Footer Columns -->
    <div class="footer-main">
        <div class="container">
            <div class="footer-grid">
                <!-- Col 1: Brand & Bio -->
                <div class="footer-col footer-col-brand">
                    <a href="${prefix}index.html" class="logo">
                        <span class="logo-mark"><i class="ri-car-fill"></i></span>
                        <span class="logo-text">APEX<span class="logo-accent">OBSIDIAN</span></span>
                    </a>
                    <p class="footer-bio">
                        Bespoke automotive detailing and surface protection laboratory specializing in 10H ceramic coatings, surgical paint correction, and PPF installations inside climate-controlled ISO-6 cleanrooms.
                    </p>
                    <div class="footer-social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link" title="YouTube" aria-label="YouTube"><i class="ri-youtube-line"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-link" title="X (Twitter)" aria-label="X"><i class="ri-twitter-x-line"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook" aria-label="Facebook"><i class="ri-facebook-box-line"></i></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn" aria-label="LinkedIn"><i class="ri-linkedin-fill"></i></a>
                    </div>
                </div>

                <!-- Col 2: Studio Navigation -->
                <div class="footer-col">
                    <h4 class="footer-title">Studio Navigation</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}index.html"><i class="ri-arrow-right-s-line"></i> Home Studio</a></li>
                        <li><a href="${prefix}home-2.html"><i class="ri-arrow-right-s-line"></i> Ceramic Coating Focus</a></li>
                        <li><a href="${prefix}about.html"><i class="ri-arrow-right-s-line"></i> About Studio & Labs</a></li>
                        <li><a href="${prefix}packages.html"><i class="ri-arrow-right-s-line"></i> Packages & Pricing</a></li>
                        <li><a href="${prefix}before-after.html"><i class="ri-arrow-right-s-line"></i> Before & After Sliders</a></li>
                        <li><a href="${prefix}gallery.html"><i class="ri-arrow-right-s-line"></i> Showroom Gallery</a></li>
                        <li><a href="${prefix}blog.html"><i class="ri-arrow-right-s-line"></i> Studio Journal</a></li>
                        <li><a href="${prefix}contact.html"><i class="ri-arrow-right-s-line"></i> Contact & Directions</a></li>
                    </ul>
                </div>

                <!-- Col 3: Bespoke Services -->
                <div class="footer-col">
                    <h4 class="footer-title">Bespoke Services</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}ceramic-coating.html"><i class="ri-arrow-right-s-line"></i> Ceramic Coating (10H)</a></li>
                        <li><a href="${prefix}paint-correction.html"><i class="ri-arrow-right-s-line"></i> Paint Correction</a></li>
                        <li><a href="${prefix}paint-protection-film.html"><i class="ri-arrow-right-s-line"></i> Paint Protection Film (PPF)</a></li>
                        <li><a href="${prefix}interior-deep-cleaning.html"><i class="ri-arrow-right-s-line"></i> Interior Deep Cleaning</a></li>
                        <li><a href="${prefix}graphene-coating.html"><i class="ri-arrow-right-s-line"></i> Graphene Coating</a></li>
                        <li><a href="${prefix}full-car-detailing.html"><i class="ri-arrow-right-s-line"></i> Full Car Detailing</a></li>
                        <li><a href="${prefix}engine-bay-detailing.html"><i class="ri-arrow-right-s-line"></i> Engine Bay Detailing</a></li>
                        <li><a href="${prefix}services.html" class="footer-all-services-link"><i class="ri-grid-fill text-gold"></i> View All 20 Services</a></li>
                    </ul>
                </div>

                <!-- Col 4: VIP Client Portal & Support -->
                <div class="footer-col">
                    <h4 class="footer-title">Client Concierge</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}index.html#booking-section"><i class="ri-calendar-check-line text-gold"></i> Reserve Detailing Slot</a></li>
                        <li><a href="${prefix}cart.html"><i class="ri-shopping-cart-2-line text-gold"></i> View Cart & Checkout</a></li>
                        <li><a href="${prefix}dashboard/index.html"><i class="ri-dashboard-line text-gold"></i> Live Telemetry Portal</a></li>
                        <li><a href="${prefix}dashboard/bookings.html"><i class="ri-time-line text-gold"></i> Booking History</a></li>
                        <li><a href="${prefix}dashboard/loyalty-points.html"><i class="ri-copper-diamond-line text-gold"></i> Apex Gloss Club</a></li>
                        <li><a href="${prefix}dashboard/invoices.html"><i class="ri-file-shield-line text-gold"></i> Digital Warranties</a></li>
                        <li><a href="${prefix}login.html"><i class="ri-user-line text-gold"></i> Customer Sign In</a></li>
                        <li><a href="${prefix}register.html"><i class="ri-user-add-line text-gold"></i> Register Account</a></li>
                    </ul>
                </div>

                <!-- Col 5: Contact & Newsletter -->
                <div class="footer-col footer-col-contact">
                    <h4 class="footer-title">Studio Contact & Hours</h4>
                    <ul class="footer-contact-list">
                        <li>
                            <i class="ri-map-pin-2-fill text-gold"></i>
                            <div>
                                <strong>Beverly Hills Cleanroom:</strong>
                                <span>9400 Wilshire Blvd, Beverly Hills, CA 90212</span>
                            </div>
                        </li>
                        <li>
                            <i class="ri-phone-fill text-gold"></i>
                            <div>
                                <strong>Concierge Desk:</strong>
                                <a href="tel:+18005552739">+1 (800) 555-APEX / (310) 555-0192</a>
                            </div>
                        </li>
                        <li>
                            <i class="ri-mail-fill text-gold"></i>
                            <div>
                                <strong>Private Inquiries:</strong>
                                <a href="mailto:concierge@apexobsidian.com">concierge@apexobsidian.com</a>
                            </div>
                        </li>
                        <li>
                            <i class="ri-time-fill text-gold"></i>
                            <div>
                                <strong>Operational Bay Hours:</strong>
                                <span>Mon – Sat: 8:00 AM – 7:00 PM<br><small style="color: var(--text-muted);">Sun: VIP Private Slots By Appointment</small></span>
                            </div>
                        </li>
                    </ul>

                    <div class="footer-newsletter">
                        <span class="newsletter-label">Studio Journal Newsletter</span>
                        <form class="footer-newsletter-form" onsubmit="event.preventDefault(); if(window.showToast) { window.showToast('Thank you for subscribing to Apex Obsidian Journals!'); } this.reset();">
                            <div class="newsletter-input-group">
                                <input type="email" placeholder="Enter your email" required class="form-control newsletter-input">
                                <button type="submit" class="btn btn-gold btn-sm newsletter-btn" title="Subscribe"><i class="ri-send-plane-fill"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Copyright Sub-Footer -->
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-bottom-inner">
                <div class="footer-copyright">
                    &copy; 2024 <strong class="text-gold">APEX OBSIDIAN Automotive Studio</strong>. All Rights Reserved. ISO-6 Cleanroom Certified.
                </div>
                <div class="footer-legal-links">
                    <a href="${prefix}contact.html">Privacy Policy</a>
                    <span class="divider">•</span>
                    <a href="${prefix}contact.html">Terms & Conditions</a>
                    <span class="divider">•</span>
                    <a href="${prefix}packages.html">Transferable Warranty</a>
                    <span class="divider">•</span>
                    <a href="${prefix}services.html">Cleanroom Protocols</a>
                </div>
            </div>
        </div>
    </div>
</footer>`;
  }

  window.getStudioFooterHTML = getFooterHTML;

  // Auto-mount if a placeholder container exists
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('site-footer-container');
    if (container) {
      const isSubdir = window.location.pathname.includes('/dashboard/');
      container.innerHTML = getFooterHTML(isSubdir ? '../' : '');
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getFooterHTML };
  }
})();
