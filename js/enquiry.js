/**
 * BLAZEBYTE STUDIO — INTERNATIONAL LEAD GENERATION SYSTEM
 * Two-Stage Flow: Project Inquiry Specification -> 50% Milestone Payment Verification -> Success
 * High-Security Sanitized Pipeline (Zero Client-Side Credentials)
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('internationalEnquiryForm');
  if (!form) return;

  const submitBtn = form.querySelector('#enquirySubmitBtn');
  const statusEl = document.getElementById('enquiryStatus');
  const successBox = document.getElementById('enquirySuccessBox');
  const refCodeEl = document.getElementById('enquiryRefCode');
  const txnCodeEl = document.getElementById('enquiryTxnCode');
  const depositPaidEl = document.getElementById('enquiryDepositPaid');
  const balanceDueEl = document.getElementById('enquiryBalanceDue');
  const budgetSelect = form.querySelector('#estimatedBudget');
  const milestoneBreakdownEl = document.getElementById('milestoneDepositBreakdown');

  // Payment Verification Elements
  const pvContainer = document.getElementById('paymentVerificationContainer');
  const pvForm = document.getElementById('paymentVerificationForm');
  const pvRefNumber = document.getElementById('pvRefNumber');
  const pvClientService = document.getElementById('pvClientService');
  const pvDepositAmount = document.getElementById('pvDepositAmount');
  const pvRemainingBalance = document.getElementById('pvRemainingBalance');
  const pvSubmitBtn = document.getElementById('pvSubmitBtn');
  const pvBackBtn = document.getElementById('pvBackBtn');
  const pvStatus = document.getElementById('pvStatus');

  const cardFields = document.getElementById('cardFieldsContainer');
  const wireFields = document.getElementById('wireFieldsContainer');
  const cryptoFields = document.getElementById('cryptoFieldsContainer');

  let activeEnquiryData = null;

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

  // Calculate 50% deposit figure based on selected budget
  function getDepositDetails(budgetVal) {
    let deposit = '$250.00 USD';
    let balance = '$250.00 USD';
    if (budgetVal.includes('Under $500')) {
      deposit = '$125.00 USD';
      balance = '$125.00 USD';
    } else if (budgetVal.includes('$500–$1,000')) {
      deposit = '$375.00 USD';
      balance = '$375.00 USD';
    } else if (budgetVal.includes('$1,000–$2,500')) {
      deposit = '$875.00 USD';
      balance = '$875.00 USD';
    } else if (budgetVal.includes('$2,500–$5,000')) {
      deposit = '$1,875.00 USD';
      balance = '$1,875.00 USD';
    } else if (budgetVal.includes('$5,000–$10,000')) {
      deposit = '$3,750.00 USD';
      balance = '$3,750.00 USD';
    } else if (budgetVal.includes('Above $10,000')) {
      deposit = '$5,000.00 USD (Deposit Advance)';
      balance = 'Agreed Milestone Balance';
    }
    return { deposit, balance };
  }

  // Milestone deposit estimation helper for step 1
  function updateMilestoneEstimate() {
    if (!budgetSelect || !milestoneBreakdownEl) return;
    const val = budgetSelect.value;
    let note = '';
    if (val.includes('Under $500')) {
      note = '~$125.00 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$500–$1,000')) {
      note = '~$375.00 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$1,000–$2,500')) {
      note = '~$875.00 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$2,500–$5,000')) {
      note = '~$1,875.00 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('$5,000–$10,000')) {
      note = '~$3,750.00 USD (Remaining 50% upon verified delivery)';
    } else if (val.includes('Above $10,000')) {
      note = '50% of agreed enterprise tier (Remaining 50% upon final delivery)';
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

  // Step 1: Submit Initial Project Specifications
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
      // Secure Backend Transmission
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        // Compute deposit numbers
        const depositInfo = getDepositDetails(budget);

        activeEnquiryData = {
          refNumber,
          fullName,
          service,
          depositAmount: depositInfo.deposit,
          remainingBalance: depositInfo.balance
        };

        // Transition from Form -> Payment Verification Step (BEFORE SUCCESS)
        form.style.display = 'none';

        if (pvContainer) {
          pvRefNumber.textContent = refNumber;
          pvClientService.textContent = `${fullName} • ${service}`;
          pvDepositAmount.textContent = depositInfo.deposit;
          pvRemainingBalance.textContent = depositInfo.balance;
          pvContainer.style.display = 'block';
          pvContainer.scrollIntoView({ behavior: 'smooth' });
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

  // Step 2 Interactivity: Payment Method Switching
  const methodPills = document.querySelectorAll('.pay-method-pill');
  methodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      methodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const methodVal = radio ? radio.value : 'Card';
      if (cardFields) cardFields.style.display = methodVal === 'Card' ? 'grid' : 'none';
      if (wireFields) wireFields.style.display = methodVal === 'Wire' ? 'block' : 'none';
      if (cryptoFields) cryptoFields.style.display = methodVal === 'Crypto' ? 'block' : 'none';
      if (pvStatus) pvStatus.textContent = '';
    });
  });

  // Auto-format card number input
  const cardNumInput = document.getElementById('pvCardNumber');
  if (cardNumInput) {
    cardNumInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
  }

  // Auto-format expiration MM/YY
  const cardExpInput = document.getElementById('pvCardExpiry');
  if (cardExpInput) {
    cardExpInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) {
        e.target.value = v.slice(0, 2) + '/' + v.slice(2);
      } else {
        e.target.value = v;
      }
    });
  }

  // Back to Scope button
  if (pvBackBtn) {
    pvBackBtn.addEventListener('click', () => {
      if (pvContainer) pvContainer.style.display = 'none';
      if (form) {
        form.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Submit International Project Enquiry (50% Milestone Terms)`;
        form.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Step 2: Handle Payment Verification & Authorization Submission
  if (pvForm) {
    pvForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!activeEnquiryData) {
        if (pvStatus) {
          pvStatus.textContent = 'Enquiry reference lost. Please refresh or return to scope.';
          pvStatus.className = 'enquiry-status error';
        }
        return;
      }

      const selectedMethodEl = document.querySelector('input[name="payMethod"]:checked');
      const selectedMethod = selectedMethodEl ? selectedMethodEl.value : 'Card';

      let cardLast4 = '4242';
      let transactionRef = '';

      if (selectedMethod === 'Card') {
        const cNum = (document.getElementById('pvCardNumber')?.value || '').replace(/\s/g, '');
        const cExp = (document.getElementById('pvCardExpiry')?.value || '').trim();
        const cCvc = (document.getElementById('pvCardCvc')?.value || '').trim();
        const cName = (document.getElementById('pvCardName')?.value || '').trim();

        if (cNum.length < 15) {
          pvStatus.textContent = 'Please enter a valid card number (15 or 16 digits).';
          pvStatus.className = 'enquiry-status error';
          return;
        }
        if (!cExp || !cExp.includes('/')) {
          pvStatus.textContent = 'Please enter a valid card expiration date (MM/YY).';
          pvStatus.className = 'enquiry-status error';
          return;
        }
        if (cCvc.length < 3) {
          pvStatus.textContent = 'Please enter a valid 3 or 4 digit CVC security code.';
          pvStatus.className = 'enquiry-status error';
          return;
        }
        cardLast4 = cNum.slice(-4);
        transactionRef = `CARD-AUTH-${cardLast4}`;
      } else if (selectedMethod === 'Wire') {
        const wRef = (document.getElementById('pvWireRef')?.value || '').trim();
        if (!wRef) {
          pvStatus.textContent = 'Please enter your bank transfer reference or remittance identifier.';
          pvStatus.className = 'enquiry-status error';
          return;
        }
        transactionRef = wRef;
      } else if (selectedMethod === 'Crypto') {
        const cTx = (document.getElementById('pvCryptoTxHash')?.value || '').trim();
        if (!cTx) {
          pvStatus.textContent = 'Please enter the transaction hash (TxID) for escrow verification.';
          pvStatus.className = 'enquiry-status error';
          return;
        }
        transactionRef = cTx;
      }

      pvSubmitBtn.disabled = true;
      pvSubmitBtn.innerHTML = `<span>Authorizing Escrow Deposit…</span>`;
      pvStatus.textContent = 'Connecting to banking verification gateway...';
      pvStatus.className = 'enquiry-status';
      pvStatus.style.color = 'var(--cyan)';

      try {
        const verifyRes = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceNumber: activeEnquiryData.refNumber,
            clientName: activeEnquiryData.fullName,
            paymentMethod: selectedMethod,
            depositAmount: activeEnquiryData.depositAmount,
            cardLast4: cardLast4,
            transactionRef: transactionRef
          })
        });

        const verifyData = await verifyRes.json().catch(() => ({}));

        if (verifyRes.ok && verifyData.success) {
          // Success! Hide Verification Step -> Reveal Final Confirmed Success Box
          pvContainer.style.display = 'none';

          if (successBox) {
            successBox.style.display = 'block';
            if (refCodeEl) refCodeEl.textContent = activeEnquiryData.refNumber;
            if (txnCodeEl) txnCodeEl.textContent = verifyData.transactionId || `TXN-BB-2026-904128`;
            if (depositPaidEl) depositPaidEl.textContent = activeEnquiryData.depositAmount;
            if (balanceDueEl) balanceDueEl.textContent = `${activeEnquiryData.remainingBalance} (On Handover)`;
            successBox.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          throw new Error(verifyData.error || 'Payment gateway declined authorization.');
        }

      } catch (verErr) {
        console.error('Verification error:', verErr.message);
        pvStatus.textContent = 'Verification notice: ' + verErr.message + ' You can also email our billing desk at blazebytestudio7@gmail.com.';
        pvStatus.className = 'enquiry-status error';
        pvSubmitBtn.disabled = false;
        pvSubmitBtn.innerHTML = `Verify &amp; Authorize 50% Deposit`;
      }
    });
  }
});
