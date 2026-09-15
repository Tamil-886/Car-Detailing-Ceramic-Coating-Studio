/**
 * APEX OBSIDIAN - Car Detailing & Ceramic Coating Studio
 * assets/js/loyalty.js - Apex Gloss Club Loyalty Engine & Voucher Redemption
 */

(function () {
    'use strict';

    const REWARDS_CATALOG = [
        {
            id: "RWD-01",
            title: "Complimentary Hydrophobic Windshield Coating",
            pointsCost: 500,
            worth: "$120 Value",
            desc: "2-year fluoropolymer rain-repellent shield applied to front and rear windshields.",
            category: "Glass Protection"
        },
        {
            id: "RWD-02",
            title: "Leather Conditioning & UV Ceramic Infusion",
            pointsCost: 750,
            worth: "$175 Value",
            desc: "Deep Swissvax feed with ceramic matte finish on steering wheel and front bucket seats.",
            category: "Interior"
        },
        {
            id: "RWD-03",
            title: "Dry Ice Engine Bay Cryo-Clean",
            pointsCost: 1200,
            worth: "$250 Value",
            desc: "Non-conductive, moisture-free dry ice blasting detailing of complete engine bay.",
            category: "Engine"
        },
        {
            id: "RWD-04",
            title: "Annual Ceramic Coating Maintenance Re-boost",
            pointsCost: 2000,
            worth: "$450 Value",
            desc: "Decontamination wash, mineral deposit dissolution, and Si02 sacrificial gloss topper.",
            category: "Ceramic Service"
        },
        {
            id: "RWD-05",
            title: "Full Studio Interior Ozone & Anti-Microbial Clean",
            pointsCost: 600,
            worth: "$140 Value",
            desc: "Medical-grade air scrubber run through HVAC and interior cabin fabrics.",
            category: "Sanitization"
        }
    ];

    function getLoyaltyState() {
        const stored = localStorage.getItem('apex_loyalty_state');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Loyalty state parse error", e);
            }
        }
        const defaultState = {
            points: 2450,
            tier: "Obsidian Black VIP",
            tierRank: 3,
            nextTierPoints: 5000,
            pointsToNextTier: 2550,
            lifetimePointsEarned: 4800,
            redeemedHistory: [
                {
                    code: "GLOSS-9812",
                    title: "Hydrophobic Glass Sealant",
                    points: 500,
                    date: "May 12, 2024",
                    status: "Redeemed"
                },
                {
                    code: "GLOSS-7439",
                    title: "Leather Conditioning Pass",
                    points: 750,
                    date: "Nov 04, 2023",
                    status: "Redeemed"
                }
            ]
        };
        localStorage.setItem('apex_loyalty_state', JSON.stringify(defaultState));
        return defaultState;
    }

    function saveLoyaltyState(state) {
        localStorage.setItem('apex_loyalty_state', JSON.stringify(state));
    }

    function renderLoyaltyUI() {
        const state = getLoyaltyState();
        const balanceEls = document.querySelectorAll('.loyalty-balance-display');
        const tierEls = document.querySelectorAll('.loyalty-tier-display');
        const progressEl = document.querySelector('.loyalty-tier-progress-fill');
        const progressTxt = document.querySelector('.loyalty-tier-progress-text');

        balanceEls.forEach(el => el.textContent = state.points.toLocaleString());
        tierEls.forEach(el => el.textContent = state.tier);

        if (progressEl) {
            const pct = Math.min(100, Math.round((state.points / state.nextTierPoints) * 100));
            progressEl.style.width = `${pct}%`;
        }

        if (progressTxt) {
            progressTxt.textContent = `${state.pointsToNextTier} points needed for Hypercar Elite Tier`;
        }

        const rewardsContainer = document.getElementById('rewards-catalog-container');
        if (rewardsContainer) {
            rewardsContainer.innerHTML = REWARDS_CATALOG.map(r => {
                const canAfford = state.points >= r.pointsCost;
                return `
                    <div class="reward-card ${canAfford ? 'eligible' : 'locked'}">
                        <div class="reward-header">
                            <span class="reward-category">${r.category}</span>
                            <span class="reward-worth">${r.worth}</span>
                        </div>
                        <h4 class="reward-title">${r.title}</h4>
                        <p class="reward-desc">${r.desc}</p>
                        <div class="reward-footer">
                            <div class="points-tag">
                                <i class="ri-copper-diamond-line"></i>
                                <span>${r.pointsCost} Points</span>
                            </div>
                            <button class="btn btn-sm ${canAfford ? 'btn-gold' : 'btn-glass'}" 
                                    ${canAfford ? `onclick="ApexLoyalty.redeemReward('${r.id}')"` : 'disabled'}>
                                ${canAfford ? 'Redeem Voucher' : 'Insufficient Points'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    function redeemReward(rewardId) {
        const state = getLoyaltyState();
        const reward = REWARDS_CATALOG.find(r => r.id === rewardId);
        if (!reward) return;

        if (state.points < reward.pointsCost) {
            if (window.ApexNotifications) {
                window.ApexNotifications.show('You do not have enough Gloss Points for this perk.', 'error');
            }
            return;
        }

        const voucherCode = `GLOSS-${Math.floor(1000 + Math.random() * 9000)}`;
        state.points -= reward.pointsCost;
        state.redeemedHistory.unshift({
            code: voucherCode,
            title: reward.title,
            points: reward.pointsCost,
            date: "Just Now",
            status: "Active Voucher"
        });

        saveLoyaltyState(state);
        renderLoyaltyUI();

        if (window.ApexNotifications) {
            window.ApexNotifications.show(`🎉 Successfully redeemed! Voucher Code: ${voucherCode}. Applied to your studio account.`, 'success');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderLoyaltyUI();
    });

    window.ApexLoyalty = {
        getLoyaltyState,
        renderLoyaltyUI,
        redeemReward
    };

})();
