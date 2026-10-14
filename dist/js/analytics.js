/**
 * BLAZEBYTE STUDIO — ANALYTICS & GOOGLE TAG MANAGER MODULE
 * Fully integrated with Google Consent Mode v2 for GDPR, CCPA & global privacy compliance.
 * Supports Google Analytics 4 (GA4) and Google Tag Manager (GTM).
 */
(function() {
  'use strict';

  // 1. Production IDs configuration
  // Set window.GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' or window.GTM_CONTAINER_ID = 'GTM-XXXXXXX'
  // to activate tracking dynamically.
  const GA_MEASUREMENT_ID = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  const GTM_CONTAINER_ID = window.GTM_CONTAINER_ID || 'GTM-XXXXXXX';

  // 2. Initialize dataLayer & Google Consent Mode v2 Defaults
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Set default consent state: DENIED until explicit user acceptance in cookie banner
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  gtag('js', new Date());

  // 3. Helper to dynamically inject script tag safely
  function loadScript(src, id) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  // 4. Initialize GA4 when valid ID is provided
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'ga4-gtag-script');
    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'send_page_view': true
    });
  }

  // 5. Initialize Google Tag Manager when valid Container ID is provided
  if (GTM_CONTAINER_ID && GTM_CONTAINER_ID !== 'GTM-XXXXXXX') {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',GTM_CONTAINER_ID);
  }

  // 6. Synchronize with BlazeByte Cookie Consent Engine (js/cookie-consent.js)
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

        // Trigger custom GTM event for consent change
        window.dataLayer.push({
          event: 'consent_status_updated',
          analytics_consent: consent.analytics,
          functional_consent: consent.functional
        });
      }
    } catch (e) {}
  }

  // Run initial check if consent was previously granted
  handleConsentUpdate();

  // Listen for consent grant events from cookie banner
  window.addEventListener('bb_consent_analytics_granted', handleConsentUpdate);
})();
