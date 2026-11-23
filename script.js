/**
 * Academic Faculty Portfolio — Vanilla JavaScript
 * Zero-dependency, lightweight, performant script
 * Agung Purwanto, M.Kom. | Universitas Darwan Ali
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark with localStorage)
  const htmlRoot = document.documentElement;
  const themeToggleDesktop = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeText = document.getElementById('theme-text');

  const getSavedTheme = () => {
    return localStorage.getItem('ap-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      if (themeText) themeText.textContent = 'Mode Gelap';
    } else {
      htmlRoot.removeAttribute('data-theme');
      if (themeText) themeText.textContent = 'Mode Terang';
    }
    localStorage.setItem('ap-theme', theme);
  };

  const toggleTheme = () => {
    const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  };

  applyTheme(getSavedTheme());
  themeToggleDesktop?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // 2. Mobile Sidebar Navigation & Backdrop
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileNav = () => {
    sidebar?.classList.add('open');
    mobileOverlay?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    sidebar?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = sidebar?.classList.contains('open');
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  mobileOverlay?.addEventListener('click', closeMobileNav);

  // Close mobile nav when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMobileNav();
      }
    });
  });

  // 3. Robust Copy Email with Non-HTTPS / LAN Fallback
  const setupCopyEmail = (btnId, feedbackId) => {
    const btn = document.getElementById(btnId);
    const feedback = document.getElementById(feedbackId);
    if (!btn || !feedback) return;

    btn.addEventListener('click', async () => {
      const email = btn.dataset.email || 'agung.purwanto@unda.ac.id';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Off-screen fallback for LAN / non-secure HTTP contexts
          const temp = document.createElement('textarea');
          temp.value = email;
          temp.style.position = 'fixed';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }
        feedback.textContent = `✓ Berhasil disalin: ${email}`;
        setTimeout(() => {
          feedback.textContent = '';
        }, 3500);
      } catch (err) {
        feedback.textContent = `Salin manual: ${email}`;
      }
    });
  };

  setupCopyEmail('copy-email-hero-btn', 'hero-copy-feedback');
  setupCopyEmail('copy-email-contact-btn', 'contact-copy-feedback');

  // 5. Scrollspy Navigation Indicator
  const sections = document.querySelectorAll('.content-section');
  const updateScrollspy = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();
});
