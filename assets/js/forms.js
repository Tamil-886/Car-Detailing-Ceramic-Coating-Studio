/**
 * APEX OBSIDIAN - Car Detailing & Ceramic Coating Studio
 * assets/js/forms.js - Contact Forms, Review Submissions & Newsletter Engine
 */

(function () {
    'use strict';

    /**
     * Validates full name: at least 2 characters, only letters, spaces, hyphens, apostrophes, and periods, no numbers.
     */
    function isValidFullName(name) {
        if (!name || typeof name !== 'string') return false;
        const trimmed = name.trim();
        if (trimmed.length < 2) return false;
        if (/\d/.test(trimmed)) return false; // Disallow numbers
        const nameRegex = /^[a-zA-Z\s'\-\.]{2,60}$/;
        if (!nameRegex.test(trimmed)) return false;
        const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, '');
        return lettersOnly.length >= 2;
    }

    /**
     * Validates email address strictly requiring a valid domain and at least 2-character TLD.
     */
    function isValidEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const trimmed = email.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(trimmed);
    }

    /**
     * Validates phone number: rejects alphabetic characters, requires 7 to 15 digits.
     */
    function isValidPhone(phone) {
        if (!phone || typeof phone !== 'string') return false;
        const trimmed = phone.trim();
        if (/[a-zA-Z]/.test(trimmed)) return false; // Strict check: no letters allowed
        const cleaned = trimmed.replace(/[^0-9]/g, '');
        return cleaned.length >= 7 && cleaned.length <= 15;
    }

    function initContactForm() {
        const form = document.getElementById('apex-contact-form');
        if (!form) return;

        const nameInput = form.querySelector('[name="name"]') || document.getElementById('contact-name');
        const emailInput = form.querySelector('[name="email"]') || document.getElementById('contact-email');
        const phoneInput = form.querySelector('[name="phone"]') || document.getElementById('contact-phone');
        const messageInput = form.querySelector('[name="message"]');
        const nameErr = document.getElementById('contact-name-error');
        const emailErr = document.getElementById('contact-email-error');
        const phoneErr = document.getElementById('contact-phone-error');

        // Real-time error clearing & sanitization
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                if (isValidFullName(nameInput.value)) {
                    nameInput.classList.remove('is-invalid');
                    if (nameErr) nameErr.style.display = 'none';
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                // If user types letters, notify or clear
                if (/[a-zA-Z]/.test(phoneInput.value)) {
                    phoneInput.classList.add('is-invalid');
                    if (phoneErr) {
                        phoneErr.textContent = 'Phone number cannot contain letters.';
                        phoneErr.style.display = 'block';
                    }
                } else if (isValidPhone(phoneInput.value)) {
                    phoneInput.classList.remove('is-invalid');
                    if (phoneErr) phoneErr.style.display = 'none';
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', () => {
                if (isValidEmail(emailInput.value)) {
                    emailInput.classList.remove('is-invalid');
                    if (emailErr) emailErr.style.display = 'none';
                }
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';
            const message = messageInput ? messageInput.value.trim() : '';

            // 1. Check required fields
            if (!name || !email || !message) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please fill in all required inquiry fields.', 'error');
                }
                return;
            }

            // 2. Validate Name Field (minimum 2 letters, no numbers, valid format)
            if (!isValidFullName(name)) {
                if (nameInput) {
                    nameInput.classList.add('is-invalid');
                    nameInput.focus();
                }
                if (nameErr) {
                    nameErr.textContent = 'Please enter a valid full name (at least 2 letters, no numbers).';
                    nameErr.style.display = 'block';
                }
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please enter a valid full name (at least 2 letters, no numbers).', 'error');
                }
                return;
            } else {
                if (nameInput) nameInput.classList.remove('is-invalid');
                if (nameErr) nameErr.style.display = 'none';
            }

            // 3. Validate Phone Number (no letters, 7-15 digits)
            if (phone && !isValidPhone(phone)) {
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const msg = /[a-zA-Z]/.test(phone) ? 'Phone number cannot contain letters.' : 'Please enter a valid phone number (7-15 digits).';
                if (phoneErr) {
                    phoneErr.textContent = msg;
                    phoneErr.style.display = 'block';
                }
                if (window.ApexNotifications) {
                    window.ApexNotifications.show(msg, 'error');
                }
                return;
            } else {
                if (phoneInput) phoneInput.classList.remove('is-invalid');
                if (phoneErr) phoneErr.style.display = 'none';
            }

            // 4. Validate Email Format (strict domain and TLD check)
            if (!isValidEmail(email)) {
                if (emailInput) {
                    emailInput.classList.add('is-invalid');
                    emailInput.focus();
                }
                if (emailErr) {
                    emailErr.textContent = 'Please provide a valid email address with a domain (e.g. name@domain.com).';
                    emailErr.style.display = 'block';
                }
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please provide a valid email address (e.g. name@domain.com).', 'error');
                }
                return;
            } else {
                if (emailInput) emailInput.classList.remove('is-invalid');
                if (emailErr) emailErr.style.display = 'none';
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Dispatching to Studio...';
            }

            setTimeout(() => {
                form.reset();
                const ddLabel = form.querySelector('.custom-dropdown-label');
                if (ddLabel) ddLabel.textContent = 'Ceramic Coating 10H';
                const ddOpts = form.querySelectorAll('.custom-dropdown-option');
                ddOpts.forEach((o, idx) => o.classList.toggle('selected', idx === 0));
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                if (nameErr) nameErr.style.display = 'none';
                if (phoneErr) phoneErr.style.display = 'none';
                if (emailErr) emailErr.style.display = 'none';
                if (nameInput) nameInput.classList.remove('is-invalid');
                if (phoneInput) phoneInput.classList.remove('is-invalid');
                if (emailInput) emailInput.classList.remove('is-invalid');
                if (window.ApexNotifications) {
                    window.ApexNotifications.show(`Thank you, ${name}! Your inquiry for "${service}" has been assigned to our senior studio consultant. We will call you within 2 business hours.`, 'success');
                }
            }, 1200);
        });
    }

    function initNewsletterForm() {
        const form = document.getElementById('apex-newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';

            if (!email || !isValidEmail(email)) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please provide a valid email address with a domain (e.g. name@domain.com).', 'error');
                }
                if (emailInput) {
                    emailInput.classList.add('is-invalid');
                    emailInput.focus();
                }
                return;
            }

            if (emailInput) {
                emailInput.value = '';
                emailInput.classList.remove('is-invalid');
            }
            if (window.ApexNotifications) {
                window.ApexNotifications.show('🌟 You are now subscribed to APEX OBSIDIAN VIP Private Detailing Bulletins.', 'success');
            }
        });
    }

    function initReviewForm() {
        const form = document.getElementById('apex-review-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewerName = form.querySelector('[name="reviewer_name"]')?.value.trim();
            const vehicle = form.querySelector('[name="reviewer_vehicle"]')?.value.trim();
            const comment = form.querySelector('[name="reviewer_comment"]')?.value.trim();

            if (!reviewerName || !comment) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please fill out your name and experience summary.', 'error');
                }
                return;
            }

            if (!isValidFullName(reviewerName)) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please enter a valid full name (at least 2 letters, no numbers).', 'error');
                }
                return;
            }

            form.reset();
            if (window.ApexNotifications) {
                window.ApexNotifications.show(`✨ Thank you ${reviewerName}! Your 5-star studio audit review for your ${vehicle || 'vehicle'} has been published to the Showroom board.`, 'success');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initContactForm();
        initNewsletterForm();
        initReviewForm();
    });

})();
