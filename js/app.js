/* ==========================================================================
   BloodRadar Web Logic & Interactive Engine
   100% Standard Native Web Standards • Zero Scroll Hijacking • Zero Dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initBloodCalculator();
  initSmoothScroll();
  initActiveNavSpy();
  initEmailLauncher();
});

/* ==========================================================================
   Navbar Scroll & Glassmorphism Transition
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Navigation Drawer Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      toggleBtn.classList.add('active');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      toggleBtn.classList.remove('active');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   Blood Compatibility Matrix & Dual-Mode Calculator (Whole Blood vs SDP)
   ========================================================================== */
const COMPATIBILITY_DATA = {
  'WHOLE_BLOOD': {
    'A+': {
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      note: 'As an A+ whole blood donor, your red blood cells can help A+ and AB+ patients. You can safely receive blood from A+, A-, O+, and O-.'
    },
    'A-': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      note: 'A- whole blood is in critical need for Rh-negative recipients. You can donate red cells to all A and AB groups, and receive from A- and O-.'
    },
    'B+': {
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      note: 'As a B+ donor, you can give red cells to B+ and AB+ recipients. You can receive from B+, B-, O+, and O- (covers 35% of Indian hospital needs).'
    },
    'B-': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      note: 'B- is a scarce blood type in Indian blood banks. You can donate red cells to all B and AB groups, and receive from B- and O-.'
    },
    'O+': {
      canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O+', 'O-'],
      note: 'O+ is India\'s primary clinical reserve (37% of population). Can give red blood cells to any Rh-positive patient in an emergency.'
    },
    'O-': {
      canDonateTo: ['All Groups (Universal RBC Donor)'],
      canReceiveFrom: ['O-'],
      note: 'Universal Red Blood Cell Donor. Your red cells can be transfused to any patient in acute hemorrhage prior to laboratory cross-matching.'
    },
    'AB+': {
      canDonateTo: ['AB+'],
      canReceiveFrom: ['All Groups (Universal RBC Recipient)'],
      note: 'Universal Red Blood Cell Recipient. In an emergency, you can safely receive red blood cells from any blood type.'
    },
    'AB-': {
      canDonateTo: ['AB+', 'AB-'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      note: 'One of the rarest ABO blood groups in India (<0.5%). Can donate red cells to AB- and AB+, and receive from any Rh-negative group.'
    },
    'Bombay (hh)': {
      canDonateTo: ['All ABO Blood Groups'],
      canReceiveFrom: ['Bombay (hh) Only'],
      note: 'Extremely rare phenotype (1 in 10,000 in Mumbai). Can donate red cells to all ABO groups, but can ONLY safely receive from another Bombay donor.'
    },
    'Rh-null': {
      canDonateTo: ['All Rh Variant Patients'],
      canReceiveFrom: ['Rh-null Only'],
      note: 'The "Golden Blood" (<50 cases known globally). Lacks all 61 Rh antigens. Universal donor for rare Rh variants, but can only receive Rh-null blood.'
    }
  },
  'PLATELETS_SDP': {
    'A+': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      note: 'In platelet apheresis, A platelets are safe for A and AB patients. High demand for recurring cancer chemotherapy protocols.'
    },
    'A-': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      note: 'Safe platelet donor for all A and AB recipients. Red blood cells are returned to you during the procedure.'
    },
    'B+': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      note: 'B platelets are compatible with B and AB patients. Vital for dengue fever thrombocytopenia and surgical reserves.'
    },
    'B-': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      note: 'Essential platelet donor for scarce B and AB emergencies across both Rh polarities.'
    },
    'O+': {
      canDonateTo: ['O+', 'O-'],
      canReceiveFrom: ['All Groups (Universal Platelet Recipient)'],
      note: 'O plasma contains anti-A and anti-B antibodies, so O platelets are given to O patients. However, O patients can receive platelets from any group!'
    },
    'O-': {
      canDonateTo: ['O-', 'O+'],
      canReceiveFrom: ['All Groups (Universal Platelet Recipient)'],
      note: 'O- donors can give platelets to O patients. In platelets, O patients are Universal Recipients!'
    },
    'AB+': {
      canDonateTo: ['All Groups (Universal Platelet Donor)'],
      canReceiveFrom: ['AB+'],
      note: 'Universal Platelet & Plasma Donor! AB plasma contains zero anti-A or anti-B antibodies, making it universally safe for all trauma and dengue cases.'
    },
    'AB-': {
      canDonateTo: ['All Groups (Universal Platelet Donor)'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      note: 'Universal Platelet Donor across all ABO patient categories. Vitally needed for severe burns and intensive care trauma.'
    },
    'Bombay (hh)': {
      canDonateTo: ['Bombay (hh)'],
      canReceiveFrom: ['Bombay (hh)'],
      note: 'Due to anti-H antibodies in plasma, Bombay platelets are managed specifically for Bombay phenotype patients.'
    },
    'Rh-null': {
      canDonateTo: ['Rh-null'],
      canReceiveFrom: ['Rh-null'],
      note: 'Rare donor platelet apheresis protocols require coordination with certified transfusion registries.'
    }
  }
};

let currentCalculatorMode = 'WHOLE_BLOOD';
let currentSelectedGroup = 'A+';

function initBloodCalculator() {
  const chips = document.querySelectorAll('.chip-btn');
  const modeButtons = document.querySelectorAll('.mode-toggle-btn');
  const donateList = document.getElementById('matrix-donate-list');
  const receiveList = document.getElementById('matrix-receive-list');
  const noteBox = document.getElementById('calc-note-text');
  const currentSelectedLabel = document.getElementById('calc-selected-group');

  if (!chips.length || !donateList || !receiveList) return;

  const donateCountBadge = document.getElementById('donate-count-badge');
  const receiveCountBadge = document.getElementById('receive-count-badge');

  function renderCompatibility() {
    const modeData = COMPATIBILITY_DATA[currentCalculatorMode] || COMPATIBILITY_DATA['WHOLE_BLOOD'];
    const data = modeData[currentSelectedGroup];
    if (!data) return;

    if (currentSelectedLabel) {
      currentSelectedLabel.textContent = currentSelectedGroup;
    }

    // Render Donate To Count & Chips
    if (donateCountBadge) {
      const count = data.canDonateTo.length;
      donateCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
    }

    donateList.innerHTML = data.canDonateTo.map(item => {
      const isSpecial = item.includes('Universal') || item.includes('All');
      return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : 'highlight-red'}">${item}</span>`;
    }).join('');

    // Render Receive From Count & Chips
    if (receiveCountBadge) {
      const count = data.canReceiveFrom.length;
      receiveCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
    }

    receiveList.innerHTML = data.canReceiveFrom.map(item => {
      const isSpecial = item.includes('Universal') || item.includes('Everyone');
      return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : ''}">${item}</span>`;
    }).join('');

    // Render Note
    if (noteBox) {
      noteBox.textContent = data.note;
    }
  }

  // Blood group chips click listener
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSelectedGroup = chip.getAttribute('data-bg');
      renderCompatibility();
    });
  });

  // Mode toggle buttons click listener (Whole Blood vs Platelets SDP)
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCalculatorMode = btn.getAttribute('data-mode') || 'WHOLE_BLOOD';
      renderCompatibility();
    });
  });

  // Initial render
  renderCompatibility();
}

/* ==========================================================================
   Standard Native Anchor Scrolling with Fixed Header Compensation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 76;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   Active Navigation Link Highlighting via IntersectionObserver
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   Smart Email Provider Launcher (100% Free • Unlimited • Direct Dispatch)
   Zero Third-Party Quotas • Official Webmail & Desktop/Mobile Client
   ========================================================================== */
function initEmailLauncher() {
  const EMAIL_CONFIGS = {
    'support': {
      email: 'support.bloodradar@thesurfboard.in',
      badge: 'Support Desk',
      title: 'Contact Support Desk',
      subtitle: 'Direct assistance for voluntary donors, blood banks, and patients',
      subject: '[BloodRadar Support] Assistance Request',
      body: 'Hello BloodRadar Support Team,\n\nName: \nPhone / WhatsApp: \nCity / Location: \nQuery or Issue Details:\n\nThank you.'
    },
    'legal': {
      email: 'legal.bloodradar@thesurfboard.in',
      badge: 'Legal & Compliance',
      title: 'Legal & Regulatory Inquiries',
      subtitle: 'Statutory compliance, policy matters, and regulatory inquiries',
      subject: '[BloodRadar Legal] Compliance Inquiry',
      body: 'Hello BloodRadar Legal Team,\n\nName: \nOrganization / Role: \nContact Information: \nInquiry or Matter:\n\nThank you.'
    },
    'privacy': {
      email: 'privacy.bloodradar@thesurfboard.in',
      badge: 'Data Protection Officer',
      title: 'Privacy & Grievance Desk',
      subtitle: 'Data rights, account purge, or privacy grievances',
      subject: '[BloodRadar Privacy] Data Grievance Request',
      body: 'Hello BloodRadar Grievance Officer,\n\nName: \nRegistered Mobile Number: \nRequest Type (Account Deletion / Data Inquiry / Truecaller / Other): \nDetails:\n\nThank you.'
    }
  };

  // Create Modal DOM element once if not present
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

    // Gmail Web compose link
    gmailOpt.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;

    // Mailto native app link
    clientOpt.href = `mailto:${encodedEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    resetCopyButtonState();
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // Event handlers
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

  // Global delegation for any mailto links
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
