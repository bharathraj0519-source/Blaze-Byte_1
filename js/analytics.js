/**
 * BLAZEBYTE STUDIO — ANALYTICS & GOOGLE TAG MANAGER MODULE
 * Configured with Google Consent Mode v2 for GDPR, CCPA & global privacy compliance.
 * Coordinates with Google Tag Manager container (GTM-WSN8P965) and cookie consent.
 */
(function() {
  'use strict';

  // 1. Ensure dataLayer and gtag are available globally
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // 2. Synchronize with BlazeByte Cookie Consent Engine (js/cookie-consent.js)
  function handleConsentUpdate() {
    try {
      const stored = localStorage.getItem('blazebyte_cookie_consent');
      if (stored) {
        const consent = JSON.parse(stored);
        const analyticsState = consent.analytics ? 'granted' : 'denied';
        const adState = (consent.functional || consent.analytics) ? 'granted' : 'denied';

        gtag('consent', 'update', {
          'analytics_storage': analyticsState,
          'ad_storage': adState,
          'ad_user_data': analyticsState,
          'ad_personalization': analyticsState
        });

        // Push custom GTM event for consent state change
        window.dataLayer.push({
          event: 'consent_status_updated',
          analytics_consent: consent.analytics,
          functional_consent: consent.functional
        });
      }
    } catch (e) {}
  }

  // Run initial check if consent was previously granted in local storage
  handleConsentUpdate();

  // Listen for real-time consent updates from the cookie banner
  window.addEventListener('bb_consent_analytics_granted', handleConsentUpdate);
})();
