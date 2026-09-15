/**
 * APEX OBSIDIAN - Car Detailing & Ceramic Coating Studio
 * assets/js/forms.js - Contact Forms, Review Submissions & Newsletter Engine
 */

(function () {
    'use strict';

    function initContactForm() {
        const form = document.getElementById('apex-contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('[name="name"]')?.value.trim();
            const email = form.querySelector('[name="email"]')?.value.trim();
            const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';
            const message = form.querySelector('[name="message"]')?.value.trim();

            if (!name || !email || !message) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please fill in all required inquiry fields.', 'error');
                }
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Dispatching to Studio...';
            }

            setTimeout(() => {
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
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

            if (!email) {
                if (window.ApexNotifications) {
                    window.ApexNotifications.show('Please provide a valid email address.', 'error');
                }
                return;
            }

            if (emailInput) emailInput.value = '';
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
