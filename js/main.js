/**
 * TimeCare & TimeCare Lite - Main JavaScript Controller
 * Light Theme Edition with Lead Capture Modal (FormSubmit), Scroll Reveal, Lightbox & Obfuscated Contacts
 */

document.addEventListener('DOMContentLoaded', () => {
  initObfuscatedContacts();
  initGalleryFilterAndLightbox();
  initFaqAccordion();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initLeadModalForm();
});

/* ==========================================================================
   1. Anti-Bot Obfuscated Contacts
   ========================================================================== */
function initObfuscatedContacts() {
  // Encoded payloads to prevent plain-text email/phone scraping by web crawlers
  const _ePayload = 'YXRlbmRpbWVudG8uaWF0ZWNoQGdtYWlsLmNvbQ==';
  const _pDisplay = 'KDMxKSA5ODc5NS01Njkw';
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
   3. Lead Capture Modal & FormSubmit AJAX Handler
   ========================================================================== */
function initLeadModalForm() {
  const leadModal = document.getElementById('lead-modal');
  const modalCloseBtn = document.getElementById('lead-modal-close');
  const openModalBtns = document.querySelectorAll('.btn-open-lead-modal');
  const form = document.getElementById('lead-capture-form');
  const formSuccessMsg = document.getElementById('form-success-message');
  const closeSuccessBtn = document.getElementById('btn-close-success');
  const submitBtn = document.getElementById('lead-submit-btn');

  function openModal() {
    if (leadModal) {
      leadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (leadModal) {
      leadModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      closeModal();
      // Reset form state after closing
      setTimeout(() => {
        if (form) form.style.display = 'block';
        if (formSuccessMsg) formSuccessMsg.style.display = 'none';
      }, 300);
    });
  }

  if (leadModal) {
    leadModal.addEventListener('click', (e) => {
      if (e.target === leadModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && leadModal && leadModal.classList.contains('active')) {
      closeModal();
    }
  });

  // FormSubmit AJAX handling
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Enviando solicitação...</span>
          <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
        `;
      }

      const formData = new FormData(form);

      fetch('https://formsubmit.co/ajax/atendimento.iatech@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Enviar Solicitação</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
        }

        form.reset();
        form.style.display = 'none';
        if (formSuccessMsg) formSuccessMsg.style.display = 'block';
        showToast('Solicitação enviada com sucesso!');
      })
      .catch(err => {
        console.error('Erro na requisição AJAX do FormSubmit:', err);
        // Fallback to standard submit
        form.submit();
      });
    });
  }
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

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
   5. Mobile Menu
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

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   6. Smooth Scroll & Navbar Dynamic Shadow
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
   7. Scroll Reveal Animations (Intersection Observer)
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
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ==========================================================================
   8. Toast Utility
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
