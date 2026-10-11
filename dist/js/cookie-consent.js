/**
 * BLAZEBYTE STUDIO — ENTERPRISE COOKIE CONSENT SYSTEM
 * GDPR / ePrivacy Directive / CCPA / DPDP Act Compliant Consent Banner & Preferences Modal
 */

(function () {
  const STORAGE_KEY = 'bb_cookie_consent_v1';

  function getStoredConsent() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      consent.timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      applyConsent(consent);
    } catch (e) {}
  }

  function applyConsent(consent) {
    if (consent.analytics) {
      window.dispatchEvent(new CustomEvent('bb_consent_analytics_granted'));
    }
  }

  function createBannerStyles() {
    if (document.getElementById('bb-cookie-styles')) return;
    const style = document.createElement('style');
    style.id = 'bb-cookie-styles';
    style.textContent = `
      .bb-cookie-banner {
        position: fixed;
        bottom: 24px;
        left: 24px;
        right: 24px;
        max-width: 580px;
        z-index: 999999;
        background: rgba(14, 7, 34, 0.94);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(168, 85, 247, 0.4);
        border-radius: 16px;
        padding: 24px 28px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(0, 245, 255, 0.12);
        color: #e2daf8;
        font-family: var(--font-body, 'Barlow', sans-serif);
        font-size: 15px;
        line-height: 1.55;
        animation: bbSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes bbSlideUp {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .bb-cookie-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }
      .bb-cookie-title {
        font-family: var(--font-heading, 'Rajdhani', sans-serif);
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
      }
      .bb-cookie-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        margin-top: 18px;
      }
      .bb-cookie-btn {
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        text-decoration: none;
      }
      .bb-cookie-btn-primary {
        background: #00f5ff;
        color: #060312;
        border-color: #00f5ff;
        font-weight: 700;
      }
      .bb-cookie-btn-primary:hover {
        background: #5df7ff;
        box-shadow: 0 0 16px rgba(0, 245, 255, 0.45);
      }
      .bb-cookie-btn-secondary {
        background: rgba(255, 255, 255, 0.06);
        color: #ffffff;
        border-color: rgba(168, 85, 247, 0.3);
      }
      .bb-cookie-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(0, 245, 255, 0.5);
      }
      .bb-cookie-btn-link {
        background: none;
        color: #baaed8;
        border: none;
        padding: 6px 10px;
        text-decoration: underline;
      }
      .bb-cookie-btn-link:hover {
        color: #00f5ff;
      }
      /* Preferences Modal */
      .bb-cookie-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000000;
        background: rgba(4, 2, 12, 0.82);
        backdrop-filter: blur(14px);
        display: grid;
        place-items: center;
        padding: 20px;
        animation: bbFadeIn 0.25s ease;
      }
      @keyframes bbFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .bb-cookie-modal {
        background: #0e0722;
        border: 1px solid rgba(168, 85, 247, 0.4);
        border-radius: 16px;
        max-width: 620px;
        width: 100%;
        padding: 32px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
        color: #e2daf8;
      }
      .bb-pref-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 16px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(168, 85, 247, 0.2);
        margin-bottom: 12px;
        gap: 16px;
      }
      .bb-switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
        flex-shrink: 0;
      }
      .bb-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .bb-slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #2b1f48;
        transition: .3s;
        border-radius: 24px;
      }
      .bb-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
      }
      .bb-switch input:checked + .bb-slider {
        background-color: #00f5ff;
      }
      .bb-switch input:checked + .bb-slider:before {
        transform: translateX(20px);
        background-color: #060312;
      }
      .bb-switch input:disabled + .bb-slider {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }

  function showBanner() {
    createBannerStyles();
    if (document.querySelector('.bb-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.className = 'bb-cookie-banner';
    banner.innerHTML = `
      <div class="bb-cookie-header">
        <span style="font-size:22px;">🛡️</span>
        <div class="bb-cookie-title">Privacy &amp; Cookie Preferences</div>
      </div>
      <p style="margin:0;color:#baaed8;font-size:14px;line-height:1.6;">
        We strictly prioritize data privacy: only essential security cookies are enabled by default. Performance analytics are activated only with your explicit consent under GDPR and global privacy standards.
      </p>
      <div class="bb-cookie-actions">
        <button class="bb-cookie-btn bb-cookie-btn-primary" id="bb-accept-all">Accept All</button>
        <button class="bb-cookie-btn bb-cookie-btn-secondary" id="bb-reject-all">Reject Non-Essential</button>
        <button class="bb-cookie-btn bb-cookie-btn-link" id="bb-manage-pref">Preferences</button>
        <a href="cookie-policy.html" style="font-size:13px;color:#00f5ff;text-decoration:none;margin-left:auto;">Read Policy &rarr;</a>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector('#bb-accept-all').addEventListener('click', () => {
      saveConsent({ essential: true, analytics: true, functional: true });
      banner.remove();
    });

    banner.querySelector('#bb-reject-all').addEventListener('click', () => {
      saveConsent({ essential: true, analytics: false, functional: false });
      banner.remove();
    });

    banner.querySelector('#bb-manage-pref').addEventListener('click', () => {
      banner.remove();
      showPreferencesModal();
    });
  }

  function showPreferencesModal() {
    createBannerStyles();
    const existing = document.querySelector('.bb-cookie-modal-backdrop');
    if (existing) existing.remove();

    const current = getStoredConsent() || { essential: true, analytics: false, functional: false };

    const backdrop = document.createElement('div');
    backdrop.className = 'bb-cookie-modal-backdrop';
    backdrop.innerHTML = `
      <div class="bb-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="bb-modal-title">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 id="bb-modal-title" style="font-family:var(--font-heading);font-size:24px;color:#fff;margin:0;">Cookie &amp; Tracking Preferences</h3>
          <button id="bb-close-modal" style="background:none;border:none;color:#baaed8;font-size:24px;cursor:pointer;">&times;</button>
        </div>
        <p style="color:#baaed8;font-size:14px;margin-bottom:20px;">
          Customize how BlazeByte Studio uses cookies on your device. Essential security and session cookies cannot be deactivated.
        </p>

        <div class="bb-pref-row">
          <div>
            <strong style="color:#fff;display:block;margin-bottom:4px;">1. Strictly Necessary Cookies</strong>
            <span style="font-size:13px;color:#baaed8;">Required for site stability, CSRF protection, and secure SSL transmissions. Always active.</span>
          </div>
          <label class="bb-switch">
            <input type="checkbox" checked disabled>
            <span class="bb-slider"></span>
          </label>
        </div>

        <div class="bb-pref-row">
          <div>
            <strong style="color:#fff;display:block;margin-bottom:4px;">2. Performance &amp; Analytics</strong>
            <span style="font-size:13px;color:#baaed8;">Aggregated, IP-masked telemetry used strictly to identify site errors and improve loading speeds.</span>
          </div>
          <label class="bb-switch">
            <input type="checkbox" id="bb-toggle-analytics" ${current.analytics ? 'checked' : ''}>
            <span class="bb-slider"></span>
          </label>
        </div>

        <div class="bb-pref-row">
          <div>
            <strong style="color:#fff;display:block;margin-bottom:4px;">3. Interactive Demonstrations</strong>
            <span style="font-size:13px;color:#baaed8;">Remembers conversational thread state in the interactive AI chatbot demo across browser tabs.</span>
          </div>
          <label class="bb-switch">
            <input type="checkbox" id="bb-toggle-functional" ${current.functional ? 'checked' : ''}>
            <span class="bb-slider"></span>
          </label>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px;">
          <button class="bb-cookie-btn bb-cookie-btn-secondary" id="bb-modal-reject">Reject Optional</button>
          <button class="bb-cookie-btn bb-cookie-btn-primary" id="bb-modal-save">Save Preferences</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const closeModal = () => backdrop.remove();

    backdrop.querySelector('#bb-close-modal').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });

    backdrop.querySelector('#bb-modal-reject').addEventListener('click', () => {
      saveConsent({ essential: true, analytics: false, functional: false });
      closeModal();
    });

    backdrop.querySelector('#bb-modal-save').addEventListener('click', () => {
      const analytics = backdrop.querySelector('#bb-toggle-analytics').checked;
      const functional = backdrop.querySelector('#bb-toggle-functional').checked;
      saveConsent({ essential: true, analytics, functional });
      closeModal();
    });
  }

  // Expose global controller
  window.openCookieSettings = showPreferencesModal;

  document.addEventListener('DOMContentLoaded', () => {
    const existingConsent = getStoredConsent();
    if (!existingConsent) {
      setTimeout(showBanner, 800);
    } else {
      applyConsent(existingConsent);
    }

    // Attach listeners to any trigger buttons in page or footers
    document.addEventListener('click', (e) => {
      const target = e.target.closest('#openCookieSettings, #openFooterCookieSettings, #openCookieSettingsBtn, [data-open-cookies]');
      if (target) {
        e.preventDefault();
        showPreferencesModal();
      }
    });
  });
})();
