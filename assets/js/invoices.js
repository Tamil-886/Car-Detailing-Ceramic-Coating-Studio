/**
 * APEX OBSIDIAN - Car Detailing & Ceramic Coating Studio
 * assets/js/invoices.js - Invoices, E-Warranties & Printable Receipts Engine
 */

(function () {
    'use strict';

    const SAMPLE_INVOICES = [
        {
            invoiceNo: "INV-2024-089",
            date: "May 18, 2024",
            vehicle: "2024 Porsche 911 GT3 RS",
            vin: "WP0AF2A97RS198240",
            service: "Ceramic Pro 10H Obsidian Shield + 3-Stage Correction",
            amount: 2100,
            status: "Paid",
            paymentMethod: "Visa Platinum ending in 4092",
            warrantyCode: "WAR-10H-99824",
            warrantyTerm: "7-Year Transferable Studio Warranty",
            cureDate: "May 18, 2024",
            expiryDate: "May 18, 2031",
            batchNo: "APX-SIO2-10H-BATCH-89A",
            items: [
                { name: "3-Stage Rotary & Dual-Action Multi-Step Paint Correction", price: 650 },
                { name: "10H Obsidian Nanoceramic Dual Basecoat Matrix", price: 950 },
                { name: "Hydrophobic Glass Fluoropolymer Coating (All Windows)", price: 250 },
                { name: "Thermal Wheel Barrel & Brake Caliper Ceramic Infusion", price: 250 }
            ],
            tax: 0,
            discount: 0
        },
        {
            invoiceNo: "INV-2023-412",
            date: "Nov 04, 2023",
            vehicle: "2023 Ferrari 296 GTB",
            vin: "ZFF98NHA8P0284912",
            service: "Bespoke Full Interior Leather Re-Feed + Engine Cryo-Clean",
            amount: 725,
            status: "Paid",
            paymentMethod: "Apple Pay (Mastercard ending in 1184)",
            warrantyCode: "WAR-INT-55410",
            warrantyTerm: "1-Year Swissvax Conditioner Guarantee",
            cureDate: "Nov 04, 2023",
            expiryDate: "Nov 04, 2024",
            batchNo: "SWISSVAX-FEED-9902",
            items: [
                { name: "Full Semi-Aniline Leather Clean & Swissvax Treatment", price: 475 },
                { name: "Engine Bay Cryogenic Dry Ice Blasting & Dressing", price: 250 }
            ],
            tax: 0,
            discount: 0
        },
        {
            invoiceNo: "INV-2023-108",
            date: "Aug 15, 2023",
            vehicle: "2022 Mercedes-AMG G63",
            vin: "W1N9M7HJ2NL384910",
            service: "Annual Ceramic Boost & Paint Decontamination Wash",
            amount: 380,
            status: "Paid",
            paymentMethod: "Amex Centurion ending in 9002",
            warrantyCode: "WAR-10H-88120",
            warrantyTerm: "Annual Re-certification",
            cureDate: "Aug 15, 2023",
            expiryDate: "Aug 15, 2030",
            batchNo: "APX-BOOST-SIO2-442",
            items: [
                { name: "Iron & Tar Fallout Decontamination Wash", price: 180 },
                { name: "Si02 Sacrificial Gloss Barrier Topcoat Application", price: 200 }
            ],
            tax: 0,
            discount: 0
        }
    ];

    function getInvoices() {
        const stored = localStorage.getItem('apex_user_invoices');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Invoice parse error", e);
            }
        }
        localStorage.setItem('apex_user_invoices', JSON.stringify(SAMPLE_INVOICES));
        return SAMPLE_INVOICES;
    }

    function viewInvoiceModal(invoiceNo) {
        const invoices = getInvoices();
        const inv = invoices.find(i => i.invoiceNo === invoiceNo) || invoices[0];
        const modal = document.getElementById('invoice-detail-modal');
        if (!modal) {
            window.print();
            return;
        }

        const sym = window.ApexTheme ? window.ApexTheme.getCurrencySymbol() : '$';
        const rate = window.ApexTheme ? window.ApexTheme.getExchangeRate() : 1;

        const body = modal.querySelector('.invoice-modal-body');
        if (body) {
            body.innerHTML = `
                <div class="invoice-sheet" id="printable-invoice">
                    <div class="invoice-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div class="brand-logo" style="font-size: 1.5rem; font-weight: 800; letter-spacing: 2px;">
                                <span style="color: var(--primary-gold);">APEX</span> OBSIDIAN
                            </div>
                            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Bespoke Auto Detailing & Ceramic Lab</p>
                        </div>
                        <div style="text-align: right;">
                            <h3 style="font-size: 1.4rem; color: var(--primary-gold); margin: 0;">${inv.invoiceNo}</h3>
                            <p style="color: var(--text-secondary); font-size: 0.85rem;">Date: ${inv.date}</p>
                            <span class="badge badge-emerald" style="padding: 3px 12px; font-size: 0.8rem;">${inv.status}</span>
                        </div>
                    </div>

                    <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 20px 0;">

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; font-size: 0.9rem;">
                        <div>
                            <p style="color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem;">Billed To:</p>
                            <strong style="color: var(--text-primary);">Alexander Vance</strong><br>
                            <span style="color: var(--text-secondary);">9400 Wilshire Blvd, Beverly Hills, CA</span><br>
                            <span style="color: var(--text-secondary);">Vehicle: ${inv.vehicle}</span>
                        </div>
                        <div style="text-align: right;">
                            <p style="color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; font-size: 0.75rem;">Studio Bay & Warranty:</p>
                            <span style="color: var(--text-secondary);">Studio: Apex Beverly Hills HQ</span><br>
                            <span style="color: var(--primary-cyan); font-weight: 600;">Warranty No: ${inv.warrantyCode}</span><br>
                            <span style="color: var(--text-secondary); font-size: 0.8rem;">${inv.warrantyTerm}</span>
                        </div>
                    </div>

                    <table class="table" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted); font-size: 0.85rem;">
                                <th style="padding: 10px 0;">Item Description</th>
                                <th style="padding: 10px 0; text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${inv.items.map(item => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem;">
                                    <td style="padding: 12px 0; color: var(--text-primary);">${item.name}</td>
                                    <td style="padding: 12px 0; text-align: right; color: var(--primary-gold); font-weight: 600;">
                                        ${sym}${Math.round(item.price * rate).toLocaleString()}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div style="text-align: right; font-size: 1.1rem; border-top: 1px solid var(--border-color); padding-top: 15px;">
                        <span style="color: var(--text-secondary); margin-right: 15px;">Total Paid:</span>
                        <strong style="color: var(--primary-gold); font-size: 1.4rem;">${sym}${Math.round(inv.amount * rate).toLocaleString()}</strong>
                        <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 5px;">Payment: ${inv.paymentMethod}</p>
                    </div>
                </div>
            `;
        }

        modal.classList.add('active');
        if (window.ApexAudio) window.ApexAudio.playClick();
    }

    function downloadCertificate(warrantyCode) {
        const invoices = getInvoices();
        const inv = invoices.find(i => i.warrantyCode === warrantyCode) || invoices[0];
        const modal = document.getElementById('warranty-certificate-modal');
        if (!modal) {
            window.print();
            return;
        }

        const body = modal.querySelector('.warranty-modal-body');
        if (body) {
            body.innerHTML = `
                <div class="warranty-certificate" id="printable-warranty">
                    <div class="warranty-header">
                        <div class="warranty-gold-seal"><i class="ri-shield-check-fill"></i></div>
                        <div class="warranty-cert-title">Certificate of Surface Warranty</div>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase;">APEX OBSIDIAN ISO CLASS 10,000 NANOTECHNOLOGY LABORATORY</p>
                    </div>

                    <table class="warranty-table">
                        <tr>
                            <td class="label">Certificate ID</td>
                            <td class="val text-gold">${inv.warrantyCode}</td>
                        </tr>
                        <tr>
                            <td class="label">Client & Owner</td>
                            <td class="val">${(window.ApexAuth && window.ApexAuth.getCurrentUser()) ? window.ApexAuth.getCurrentUser().name : 'Alexander Vance'} (Obsidian VIP Member)</td>
                        </tr>
                        <tr>
                            <td class="label">Registered Vehicle</td>
                            <td class="val">${inv.vehicle}</td>
                        </tr>
                        <tr>
                            <td class="label">VIN / Chassis #</td>
                            <td class="val" style="font-family: monospace;">${inv.vin || 'WP0AF2A97RS198240'}</td>
                        </tr>
                        <tr>
                            <td class="label">Coating Spec</td>
                            <td class="val text-cyan">${inv.service}</td>
                        </tr>
                        <tr>
                            <td class="label">Chemical Batch</td>
                            <td class="val" style="font-family: monospace;">${inv.batchNo || 'APX-SIO2-10H-89A'}</td>
                        </tr>
                        <tr>
                            <td class="label">Curing Date</td>
                            <td class="val">${inv.cureDate || 'May 18, 2024'}</td>
                        </tr>
                        <tr>
                            <td class="label">Warranty Term</td>
                            <td class="val text-gold">${inv.warrantyTerm} (Valid thru ${inv.expiryDate || '2031'})</td>
                        </tr>
                    </table>

                    <div class="warranty-footer">
                        <div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px;">Master Detailer Sign-Off:</div>
                            <div style="font-family: 'Outfit', cursive; font-size: 1.3rem; color: var(--primary-gold); letter-spacing: 1px;">Marcus Vance, IDA Master</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Head of Cleanroom Coating Operations</div>
                        </div>

                        <div style="text-align: right;">
                            <div class="qr-code-box" style="margin-left: auto;">
                                <svg width="67" height="67" viewBox="0 0 100 100" fill="#000">
                                    <rect width="100" height="100" fill="#fff" />
                                    <!-- Simplified SVG QR Mock -->
                                    <rect x="10" y="10" width="30" height="30" fill="#000" />
                                    <rect x="16" y="16" width="18" height="18" fill="#fff" />
                                    <rect x="20" y="20" width="10" height="10" fill="#000" />
                                    <rect x="60" y="10" width="30" height="30" fill="#000" />
                                    <rect x="66" y="16" width="18" height="18" fill="#fff" />
                                    <rect x="70" y="20" width="10" height="10" fill="#000" />
                                    <rect x="10" y="60" width="30" height="30" fill="#000" />
                                    <rect x="16" y="66" width="18" height="18" fill="#fff" />
                                    <rect x="20" y="70" width="10" height="10" fill="#000" />
                                    <rect x="50" y="50" width="12" height="12" fill="#000" />
                                    <rect x="70" y="65" width="20" height="10" fill="#000" />
                                    <rect x="50" y="75" width="10" height="15" fill="#000" />
                                </svg>
                            </div>
                            <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Scan To Verify Authenticity</span>
                        </div>
                    </div>
                </div>
            `;
        }

        modal.classList.add('active');
        if (window.ApexAudio) window.ApexAudio.playCureChime();
        if (window.showToast) window.showToast(`Transferable Warranty Certificate #${warrantyCode} Generated`);
    }

    const viewWarrantyCertificate = downloadCertificate;
    const printInvoice = function () { window.print(); };

    function renderInvoicesTable() {
        const tbody = document.getElementById('dashboard-invoices-tbody');
        if (!tbody) return;

        const invoices = getInvoices();
        const sym = window.ApexTheme ? window.ApexTheme.getCurrencySymbol() : '$';
        const rate = window.ApexTheme ? window.ApexTheme.getExchangeRate() : 1;

        if (invoices.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:25px; color:var(--text-muted);">No invoices recorded yet.</td></tr>';
            return;
        }

        tbody.innerHTML = invoices.map(inv => {
            const formattedAmount = `${sym}${Math.round(inv.amount * rate).toLocaleString()}`;
            return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 15px 10px; font-weight: 700; color: var(--primary-gold); font-family: var(--font-mono, monospace);">${inv.invoiceNo}</td>
                    <td style="padding: 15px 10px; color: var(--text-secondary);">${inv.date}</td>
                    <td style="padding: 15px 10px;"><strong>${inv.vehicle}</strong></td>
                    <td style="padding: 15px 10px; color: var(--text-secondary); max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${inv.service}</td>
                    <td style="padding: 15px 10px; font-weight: 700; color: var(--text-primary);">${formattedAmount}</td>
                    <td style="padding: 15px 10px;"><span class="badge" style="background: rgba(34,197,94,0.15); color: #22c55e;"><i class="ri-check-line"></i> Paid</span></td>
                    <td style="padding: 15px 10px; text-align: right;">
                        <button class="btn btn-sm btn-outline" onclick="ApexInvoices.viewInvoiceModal('${inv.invoiceNo}')"><i class="ri-eye-line"></i> View Receipt</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function renderWarrantyCards() {
        const grid = document.getElementById('dashboard-warranties-vault-grid');
        if (!grid) return;

        const invoices = getInvoices().filter(i => i.warrantyCode);
        if (invoices.length === 0) return;

        grid.innerHTML = invoices.map((inv, idx) => {
            const isGold = idx % 2 === 0;
            const borderCol = isGold ? 'var(--primary-gold)' : 'var(--primary-cyan)';
            const bgBadge = isGold ? 'badge-gold' : 'badge-cyan';
            const iconCol = isGold ? 'text-gold' : 'text-cyan';
            const btnClass = isGold ? 'btn-gold' : 'btn-outline';

            return `
                <div class="glass-card" style="padding: 20px; border-radius: 14px; border: 1px solid ${borderCol}; background: rgba(212,175,55,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div>
                            <span class="badge ${bgBadge}" style="font-size: 0.75rem;">${inv.warrantyTerm || '7-Year Certified Shield'}</span>
                            <h4 style="margin: 8px 0 2px; font-size: 1.1rem;">${inv.vehicle}</h4>
                        </div>
                        <i class="ri-shield-star-fill ${iconCol}" style="font-size: 1.8rem;"></i>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 15px;">
                        Certificate No: <strong>${inv.warrantyCode}</strong><br>
                        Cured: ${inv.cureDate || inv.date} • Expiration: ${inv.expiryDate || '2031'}
                    </p>
                    <button class="btn btn-sm ${btnClass} w-100" onclick="ApexInvoices.downloadCertificate('${inv.warrantyCode}')">
                        <i class="ri-download-line"></i> Download Official E-Warranty PDF
                    </button>
                </div>
            `;
        }).join('');
    }

    // Auto-init on page load
    document.addEventListener('DOMContentLoaded', function () {
        renderInvoicesTable();
        renderWarrantyCards();
    });

    window.ApexInvoices = {
        getInvoices,
        renderInvoicesTable,
        renderWarrantyCards,
        viewInvoiceModal,
        viewWarrantyCertificate,
        printInvoice,
        downloadCertificate
    };

})();
