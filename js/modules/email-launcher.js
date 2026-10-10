window.BloodRadar = window.BloodRadar || {};

window.BloodRadar.EmailLauncher = (function() {
  const EMAIL_CONFIGS = {
    support: {
      email: 'support.bloodradar@thesurfboard.in',
      badge: 'Support Desk',
      title: 'Contact Support Desk',
      subtitle: 'Direct assistance for voluntary donors, blood banks, and patients',
      subject: '[BloodRadar Support] Assistance Request',
      body: 'Hello BloodRadar Support Team,\n\nName: \nPhone / WhatsApp: \nCity / Location: \nQuery or Issue Details:\n\nThank you.'
    },
    legal: {
      email: 'legal.bloodradar@thesurfboard.in',
      badge: 'Legal & Compliance',
      title: 'Legal & Regulatory Inquiries',
      subtitle: 'Statutory compliance, policy matters, and regulatory inquiries',
      subject: '[BloodRadar Legal] Compliance Inquiry',
      body: 'Hello BloodRadar Legal Team,\n\nName: \nOrganization / Role: \nContact Information: \nInquiry or Matter:\n\nThank you.'
    },
    privacy: {
      email: 'privacy.bloodradar@thesurfboard.in',
      badge: 'Data Protection Officer',
      title: 'Privacy & Grievance Desk',
      subtitle: 'Data rights, account purge, or privacy grievances',
      subject: '[BloodRadar Privacy] Data Grievance Request',
      body: 'Hello BloodRadar Grievance Officer,\n\nName: \nRegistered Mobile Number: \nRequest Type (Account Deletion / Data Inquiry / Truecaller / Other): \nDetails:\n\nThank you.'
    }
  };

  function init() {
    let modalBackdrop = document.getElementById('br-email-launcher-modal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'br-email-launcher-modal';
      modalBackdrop.className = 'br-email-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');
      modalBackdrop.setAttribute('aria-labelledby', 'br-email-modal-title');
      modalBackdrop.innerHTML = `
        <div class="br-email-modal-dialog">
          <button type="button" class="br-email-modal-close-btn" id="br-email-modal-close" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="br-email-modal-header">
            <span class="br-email-modal-badge" id="br-email-modal-badge">Support Desk</span>
            <h3 class="br-email-modal-title" id="br-email-modal-title">Contact Support Desk</h3>
            <p class="br-email-modal-subtitle" id="br-email-modal-subtitle">Choose your preferred application to send an email</p>
          </div>
          <div class="br-email-pill-container">
            <span class="br-email-pill-label">Recipient</span>
            <span id="br-email-modal-pill-text">support.bloodradar@thesurfboard.in</span>
          </div>
          <div class="br-email-options-list">
            <a href="#" class="br-email-option-btn" id="br-email-opt-gmail" target="_blank" rel="noopener noreferrer">
              <span class="br-email-option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <div class="br-email-option-text">
                <span class="br-email-option-title">Open in Gmail Web</span>
                <span class="br-email-option-desc">Browser compose window with pre-filled details</span>
              </div>
              <span class="br-email-option-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </a>

            <a href="#" class="br-email-option-btn" id="br-email-opt-client">
              <span class="br-email-option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </span>
              <div class="br-email-option-text">
                <span class="br-email-option-title">Default Email App</span>
                <span class="br-email-option-desc">Apple Mail, Outlook, or mobile email client</span>
              </div>
              <span class="br-email-option-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </a>

            <button type="button" class="br-email-option-btn" id="br-email-opt-copy">
              <span class="br-email-option-icon" id="br-email-copy-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </span>
              <div class="br-email-option-text">
                <span class="br-email-option-title" id="br-email-copy-title">Copy Email Address</span>
                <span class="br-email-option-desc" id="br-email-copy-desc">Copies recipient address to your clipboard</span>
              </div>
            </button>
          </div>
          <div class="br-email-modal-footer">
            <p>Official communication desk • Voluntary emergency network</p>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
    }

    const closeBtn = document.getElementById('br-email-modal-close');
    const badgeEl = document.getElementById('br-email-modal-badge');
    const titleEl = document.getElementById('br-email-modal-title');
    const subtitleEl = document.getElementById('br-email-modal-subtitle');
    const pillTextEl = document.getElementById('br-email-modal-pill-text');
    const gmailOpt = document.getElementById('br-email-opt-gmail');
    const clientOpt = document.getElementById('br-email-opt-client');
    const copyBtn = document.getElementById('br-email-opt-copy');
    const copyTitle = document.getElementById('br-email-copy-title');
    const copyDesc = document.getElementById('br-email-copy-desc');
    const copyIcon = document.getElementById('br-email-copy-icon');

    let activeEmail = 'support.bloodradar@thesurfboard.in';
    let copyResetTimer = null;

    function closeModal() {
      modalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      if (copyResetTimer) clearTimeout(copyResetTimer);
      resetCopyButtonState();
    }

    function resetCopyButtonState() {
      copyBtn.classList.remove('copied');
      copyTitle.textContent = 'Copy Email Address';
      copyDesc.textContent = 'Copies recipient address to your clipboard';
      copyIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    }

    function openModal(typeKey) {
      const config = EMAIL_CONFIGS[typeKey] || EMAIL_CONFIGS['support'];
      activeEmail = config.email;

      badgeEl.textContent = config.badge;
      titleEl.textContent = config.title;
      subtitleEl.textContent = config.subtitle;
      pillTextEl.textContent = config.email;

      const encodedEmail = encodeURIComponent(config.email);
      const encodedSubject = encodeURIComponent(config.subject);
      const encodedBody = encodeURIComponent(config.body);

      gmailOpt.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;
      clientOpt.href = `mailto:${encodedEmail}?subject=${encodedSubject}&body=${encodedBody}`;

      resetCopyButtonState();
      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });

    clientOpt.addEventListener('click', () => {
      setTimeout(closeModal, 400);
    });
    gmailOpt.addEventListener('click', () => {
      setTimeout(closeModal, 400);
    });

    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(activeEmail);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = activeEmail;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        copyBtn.classList.add('copied');
        copyTitle.textContent = 'Copied to Clipboard!';
        copyDesc.textContent = activeEmail + ' ready to paste';
        copyIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        if (copyResetTimer) clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(resetCopyButtonState, 2500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });

    document.addEventListener('click', (e) => {
      const mailLink = e.target.closest('a[href^="mailto:"]');
      if (!mailLink) return;

      e.preventDefault();
      const href = mailLink.getAttribute('href') || '';
      const email = href.replace(/^mailto:/i, '').split('?')[0].trim().toLowerCase();

      let typeKey = 'support';
      if (email.includes('legal')) {
        typeKey = 'legal';
      } else if (email.includes('privacy')) {
        typeKey = 'privacy';
      } else if (mailLink.dataset.mailType) {
        typeKey = mailLink.dataset.mailType;
      }

      openModal(typeKey);
    });
  }

  return { init };
})();
