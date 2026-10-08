/**
 * BLAZEBYTE STUDIO — INTERNATIONAL LEAD GENERATION SYSTEM
 * Multi-Channel Submission Pipeline (Supabase REST + Local Backup + Silent Email Dispatch)
 * Project: https://ssbxolloyyvlbuefyhda.supabase.co
 */

const SUPABASE_URL = 'https://ssbxolloyyvlbuefyhda.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_hutGjIj8D5_sqewq7eGhcw_tuTkSX5G';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('internationalEnquiryForm');
  if (!form) return;

  const submitBtn = form.querySelector('#enquirySubmitBtn');
  const statusEl = document.getElementById('enquiryStatus');
  const successBox = document.getElementById('enquirySuccessBox');
  const refCodeEl = document.getElementById('enquiryRefCode');
  const budgetSelect = form.querySelector('#estimatedBudget');
  const milestoneBreakdownEl = document.getElementById('milestoneDepositBreakdown');

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

  // Check URL query parameters to prefill service or package if passed
  const params = new URLSearchParams(window.location.search);
  const prefillService = params.get('service');
  const prefillPlan = params.get('plan');
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

    // Honeypot anti-spam check
    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey) {
      console.warn("Spam submission suppressed.");
      return;
    }

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const fullName = formData.get('fullName')?.trim() || '';
    const email = formData.get('businessEmail')?.trim() || '';
    const company = formData.get('companyName')?.trim() || 'Independent';
    const country = formData.get('country')?.trim() || 'International';
    const service = formData.get('serviceInterested') || 'Multiple Services';
    const budget = formData.get('estimatedBudget') || 'Not Sure';
    const timeline = formData.get('expectedTimeline') || 'Standard';
    const description = formData.get('projectDescription')?.trim() || '';
    const contactMethod = formData.get('preferredContact') || 'Email';
    const milestoneConsent = formData.get('milestonePaymentConsent') === 'Accepted';
    const privacyConsent = formData.get('privacyConsent') === 'Accepted';

    if (!fullName || !email || !description) {
      statusEl.textContent = 'Please complete all required fields.';
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

    // Split name for Supabase customer_requests table compatibility
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || 'Client';
    const lastName = nameParts.slice(1).join(' ') || 'Global';

    const milestoneEstimateText = milestoneBreakdownEl ? milestoneBreakdownEl.innerText.replace('⚡ ', '') : '50% Upfront Milestone Deposit';

    // Primary Database Payload (matches check constraint: request_type IN ('contact', 'enquiry', 'plan'))
    const dbRecord = {
      reference_number: refNumber,
      request_type: 'enquiry',
      selected_service: `${service} (${budget})`,
      quoted_price: budget,
      first_name: firstName,
      last_name: lastName,
      phone: formData.get('phoneNumber')?.trim() || 'Not Provided',
      email: email,
      company: `${company} [${country}]`,
      project_type: service,
      project_details: `TIMELINE: ${timeline} | PREF CONTACT: ${contactMethod}\n50% MILESTONE TERMS: Accepted (${milestoneEstimateText})\n\nPROJECT SCOPE & TARGET GOALS:\n${description}`,
      payment_preference: `50% Upfront Milestone Escrow (${milestoneEstimateText})`,
      privacy_consent: true
    };

    let transmissionSuccess = false;

    try {
      // 1. Primary Supabase REST transmission to ssbxolloyyvlbuefyhda.supabase.co
      const supabasePromise = fetch(`${SUPABASE_URL}/rest/v1/customer_requests`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(dbRecord)
      });

      // 2. Separate Supabase table insert attempt (if project_enquiries table exists)
      const separateSupabasePromise = fetch(`${SUPABASE_URL}/rest/v1/project_enquiries`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          reference_number: refNumber,
          full_name: fullName,
          business_email: email,
          company_name: company,
          country: country,
          service_interested: service,
          estimated_budget: budget,
          expected_timeline: timeline,
          preferred_contact: contactMethod,
          phone_number: formData.get('phoneNumber')?.trim() || 'Not Provided',
          project_description: description,
          milestone_deposit_acknowledged: true,
          deposit_amount_estimate: milestoneEstimateText
        })
      }).catch(() => null);

      // 3. Local Server API endpoint backup
      const localApiPromise = fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dbRecord,
          full_name: fullName,
          milestone_deposit_acknowledged: true,
          milestone_estimate: milestoneEstimateText,
          description: description
        })
      }).catch(() => null);

      // 4. Silent Background Email Dispatch to blazebytestudio7@gmail.com
      // Transmits via HTTP AJAX without opening any external apps (no mailto / no email clients)
      const emailPayload = {
        referenceNumber: refNumber,
        clientName: fullName,
        businessEmail: email,
        company: company,
        country: country,
        service: service,
        estimatedBudget: budget,
        milestonePaymentTerms: '50% Upfront Milestone Deposit Accepted',
        estimatedDeposit: milestoneEstimateText,
        timeline: timeline,
        preferredContact: contactMethod,
        phoneNumber: formData.get('phoneNumber')?.trim() || 'Not Provided',
        projectScope: description,
        _subject: `🌍 [BlazeByte International] New Project Enquiry — ${refNumber} (${service})`,
        _template: 'table'
      };

      fetch('https://formsubmit.co/ajax/blazebytestudio7@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload)
      }).catch(err => console.warn('Background mail dispatch notice:', err));

      // Wait for primary Supabase transmission
      const supabaseRes = await supabasePromise;
      if (supabaseRes && (supabaseRes.status === 201 || supabaseRes.ok)) {
        transmissionSuccess = true;
      } else {
        console.warn('Supabase status:', supabaseRes ? supabaseRes.status : 'error');
        // Check if local API succeeded
        const localRes = await localApiPromise;
        if (localRes && localRes.ok) {
          transmissionSuccess = true;
        }
      }

      if (transmissionSuccess) {
        // Display Success State
        form.style.display = 'none';
        if (successBox) {
          successBox.style.display = 'block';
          if (refCodeEl) refCodeEl.textContent = refNumber;
          successBox.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        throw new Error('Pipeline unavailable.');
      }

    } catch (err) {
      console.error('Enquiry transmission error:', err);
      // Even if network drops, check if local server received it
      try {
        const localRes = await fetch('/api/enquire', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dbRecord)
        });
        if (localRes.ok) {
          form.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'block';
            if (refCodeEl) refCodeEl.textContent = refNumber;
            successBox.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      } catch (localErr) {}

      statusEl.textContent = 'Transmission error. Please email us directly at blazebytestudio7@gmail.com or call +91 7708795342.';
      statusEl.className = 'enquiry-status error';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});
