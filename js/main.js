/**
 * TimeCare & TimeCare Lite - Main JavaScript Controller
 * Light Theme Edition with Scroll Reveal Animations, Lightbox, Obfuscated Contacts & FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initObfuscatedContacts();
  initGalleryFilterAndLightbox();
  initFaqAccordion();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
});

/* ==========================================================================
   1. Anti-Bot Obfuscated Contacts
   ========================================================================== */
function initObfuscatedContacts() {
  // Encoded payloads to prevent plain-text email/phone scraping by web crawlers
  // Email: atendimento.iatech@gmail.com
  const _ePayload = 'YXRlbmRpbWVudG8uaWF0ZWNoQGdtYWlsLmNvbQ==';
  // Phone display: (31) 98795-5690
  const _pDisplay = 'KDMxKSA5ODc5NS01Njkw';
  // Phone raw digits: 5531987955690
  const _pRaw = 'NTUzMTk4Nzk1NTY5MA==';

  const emailBtn = document.getElementById('btn-reveal-email');
  const emailDisplay = document.getElementById('display-email');
  const emailCopyBtn = document.getElementById('btn-copy-email');

  const waBtn = document.getElementById('btn-reveal-wa');
  const waDisplay = document.getElementById('display-wa');
  const waCopyBtn = document.getElementById('btn-copy-wa');

  if (emailBtn && emailDisplay) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const decodedEmail = atob(_ePayload);
      emailDisplay.textContent = decodedEmail;
      emailDisplay.classList.add('revealed');
      if (emailCopyBtn) emailCopyBtn.style.display = 'inline-flex';
      
      // Open mailto on direct user click
      window.location.href = 'mailto:' + decodedEmail + '?subject=' + encodeURIComponent('Contato via Site TimeCare');
      showToast('E-mail pronto para envio!');
    });
  }

  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => {
      const decodedEmail = atob(_ePayload);
      navigator.clipboard.writeText(decodedEmail).then(() => {
        showToast('E-mail copiado para a área de transferência!');
      });
    });
  }

  if (waBtn && waDisplay) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const decodedPhone = atob(_pDisplay);
      const rawDigits = atob(_pRaw);
      waDisplay.textContent = decodedPhone;
      waDisplay.classList.add('revealed');
      if (waCopyBtn) waCopyBtn.style.display = 'inline-flex';

      // Open WhatsApp Web/App
      const defaultMsg = encodeURIComponent('Olá! Visitei o site do TimeCare e gostaria de tirar algumas dúvidas.');
      window.open(`https://wa.me/${rawDigits}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
      showToast('Redirecionando para o WhatsApp...');
    });
  }

  if (waCopyBtn) {
    waCopyBtn.addEventListener('click', () => {
      const decodedPhone = atob(_pDisplay);
      navigator.clipboard.writeText(decodedPhone).then(() => {
        showToast('WhatsApp copiado para a área de transferência!');
      });
    });
  }
}

/* ==========================================================================
   2. Gallery Filters & Lightbox Modal
   ========================================================================== */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalClose = document.getElementById('lightbox-close');

  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'flex';
          setTimeout(() => item.classList.add('visible'), 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox open
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-fullsrc') || item.querySelector('img').src;
      const title = item.querySelector('.gallery-item-title') ? item.querySelector('.gallery-item-title').textContent : '';
      const tag = item.querySelector('.gallery-item-tag') ? item.querySelector('.gallery-item-tag').textContent : '';

      if (modal && modalImg && modalCaption) {
        modalImg.src = fullSrc;
        modalImg.alt = title;
        modalCaption.textContent = tag ? `${tag} — ${title}` : title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Lightbox close
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.navbar-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', expanded);
    });

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   5. Smooth Scroll & Navbar Dynamic Shadow
   ========================================================================== */
function initSmoothScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.08)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   6. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ==========================================================================
   7. Toast Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.style.display = 'flex';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}
