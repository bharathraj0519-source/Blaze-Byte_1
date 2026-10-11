/**
 * BLAZEBYTE STUDIO — INTERNATIONAL LEAD GENERATION SYSTEM
 * High-Security Sanitized Lead Pipeline (Zero Client-Side Credentials)
 * All sensitive database credentials proxied strictly through server-side environment
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('internationalEnquiryForm');
  if (!form) return;

  const submitBtn = form.querySelector('#enquirySubmitBtn');
  const statusEl = document.getElementById('enquiryStatus');
  const successBox = document.getElementById('enquirySuccessBox');
  const refCodeEl = document.getElementById('enquiryRefCode');
  const budgetSelect = form.querySelector('#estimatedBudget');
  const milestoneBreakdownEl = document.getElementById('milestoneDepositBreakdown');

  // Input Sanitizer Helper
  function sanitizeInput(str, maxLen = 255) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/[<>'"&]/g, c => ({
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '&': '&amp;'
      }[c] || c))
      .trim()
      .slice(0, maxLen);
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(email) && email.length <= 120;
  }

  // Milestone deposit estimation helper
  function updateMilestoneEstimate() {
    if (!budgetSelect || !milestoneBreakdownEl) return;
    const val = budgetSelect.value;
    let note = '';
    if (val.includes('Under $500')) {
      note = '~$100 – $250 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$500–$1,000')) {
      note = '~$250 – $500 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$1,000–$2,500')) {
      note = '~$500 – $1,250 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$2,500–$5,000')) {
      note = '~$1,250 – $2,500 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$5,000–$10,000')) {
      note = '~$2,500 – $5,000 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('Above $10,000')) {
      note = '50% of agreed contract value (Remaining 50% upon final delivery)';
    } else {
      note = '50% upfront deposit calculated upon formal scope agreement';
    }
    milestoneBreakdownEl.innerHTML = `⚡ Estimated 50% Kickoff Deposit: <strong>${note}</strong>`;
  }

  if (budgetSelect) {
    budgetSelect.addEventListener('change', updateMilestoneEstimate);
    updateMilestoneEstimate();
  }

  // Check URL query parameters to prefill service or package
  const params = new URLSearchParams(window.location.search);
  const prefillService = params.get('service');
  const prefillBudget = params.get('budget');

  if (prefillService) {
    const serviceSelect = form.querySelector('#serviceSelect');
    if (serviceSelect) {
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(prefillService.toLowerCase())) {
          serviceSelect.value = option.value;
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }
  }

  if (prefillBudget && budgetSelect) {
    for (let option of budgetSelect.options) {
      if (option.value.toLowerCase().includes(prefillBudget.toLowerCase()) || option.textContent.toLowerCase().includes(prefillBudget.toLowerCase())) {
        budgetSelect.value = option.value;
        budgetSelect.dispatchEvent(new Event('change', { bubbles: true }));
        updateMilestoneEstimate();
        break;
      }
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-Spam Honeypot Verification
    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey) {
      console.warn("Automated bot submission suppressed.");
      return;
    }

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const fullName = sanitizeInput(formData.get('fullName'), 100);
    const email = (formData.get('businessEmail') || '').trim().toLowerCase();
    const company = sanitizeInput(formData.get('companyName') || 'Independent', 100);
    const country = sanitizeInput(formData.get('country') || 'International', 80);
    const service = sanitizeInput(formData.get('serviceInterested') || 'Web Development', 80);
    const budget = sanitizeInput(formData.get('estimatedBudget') || 'Not Sure', 60);
    const timeline = sanitizeInput(formData.get('expectedTimeline') || 'Standard', 60);
    const contactMethod = sanitizeInput(formData.get('preferredContact') || 'Email', 40);
    const phone = sanitizeInput(formData.get('phoneNumber') || 'Not Provided', 30);
    const description = sanitizeInput(formData.get('projectDescription'), 3000);
    const milestoneConsent = formData.get('milestonePaymentConsent') === 'Accepted';
    const privacyConsent = formData.get('privacyConsent') === 'Accepted';

    // Front-End Field Validation
    if (!fullName || !email || !description) {
      statusEl.textContent = 'Please complete all required fields.';
      statusEl.className = 'enquiry-status error';
      return;
    }

    if (!validateEmail(email)) {
      statusEl.textContent = 'Please enter a valid business email address.';
      statusEl.className = 'enquiry-status error';
      return;
    }

    if (!milestoneConsent) {
      statusEl.textContent = 'Please acknowledge and agree to the 50% milestone payment requirement.';
      statusEl.className = 'enquiry-status error';
      return;
    }

    if (!privacyConsent) {
      statusEl.textContent = 'Please accept the privacy policy to submit your enquiry.';
      statusEl.className = 'enquiry-status error';
      return;
    }

    const refNumber = `BB-INTL-${Date.now().toString().slice(-6)}`;
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting to Global Desk…</span>`;
    statusEl.textContent = '';

    const payload = {
      reference_number: refNumber,
      fullName: fullName,
      businessEmail: email,
      companyName: company,
      country: country,
      serviceInterested: service,
      estimatedBudget: budget,
      expectedTimeline: timeline,
      preferredContact: contactMethod,
      phoneNumber: phone,
      projectDescription: description,
      milestonePaymentConsent: true,
      privacyConsent: true
    };

    try {
      // Secure Backend Transmission (Zero Credentials Exposed)
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        // Display Success State
        form.style.display = 'none';
        if (successBox) {
          successBox.style.display = 'block';
          if (refCodeEl) refCodeEl.textContent = refNumber;
          successBox.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        throw new Error(result.error || 'Server rejected transmission.');
      }

    } catch (err) {
      console.error('Submission error:', err.message);
      statusEl.textContent = 'Transmission error. Please email us directly at blazebytestudio7@gmail.com or call +91 7708795342.';
      statusEl.className = 'enquiry-status error';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});
