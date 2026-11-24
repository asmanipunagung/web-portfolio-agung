/**
 * Bento Studio Portfolio — Vanilla JavaScript
 * Zero-dependency, lightweight, performant script
 * Agung Purwanto | Bento Studio & Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark with localStorage)
  const htmlRoot = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');

  const getSavedTheme = () => {
    return localStorage.getItem('ap-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      if (themeText) themeText.textContent = 'Gelap';
    } else {
      htmlRoot.removeAttribute('data-theme');
      if (themeText) themeText.textContent = 'Terang';
    }
    localStorage.setItem('ap-theme', theme);
  };

  const toggleTheme = () => {
    const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  };

  applyTheme(getSavedTheme());
  themeToggle?.addEventListener('click', toggleTheme);

  // 2. Robust Copy Email with Non-HTTPS / LAN Fallback
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

  setupCopyEmail('copy-email-btn', 'copy-feedback');
  setupCopyEmail('copy-email-contact-btn', 'contact-copy-feedback');

  // 3. Topbar Nav Chip Active State on Scroll
  const navChips = document.querySelectorAll('.nav-chip');
  const targetSections = ['about', 'research', 'toys', 'education', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    targetSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navChips.forEach(chip => {
          const match = chip.getAttribute('href') === `#${id}`;
          chip.style.backgroundColor = match ? 'var(--bg-subtle)' : '';
          chip.style.color = match ? 'var(--text-primary)' : '';
          chip.style.fontWeight = match ? '600' : '500';
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 4. Retro Game Boy Hero Console Interactive Menu
  const gbDesc = document.getElementById('gb-desc');
  const gbMenuBtns = document.querySelectorAll('.gb-menu button');
  gbMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gbMenuBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      if (gbDesc && btn.dataset.t) {
        gbDesc.textContent = btn.dataset.t;
      }
    });
  });

  // 5. Interactive Avatar (Game Boy Camera DMG-01 <-> True Color)
  const avatarFrame = document.querySelector('.avatar-frame-gameboy');
  const profileImg = document.getElementById('profile-img');
  const modeLabel = document.getElementById('avatar-mode-label');
  let isRetroMode = true;

  if (avatarFrame && profileImg) {
    avatarFrame.addEventListener('click', () => {
      isRetroMode = !isRetroMode;
      profileImg.src = isRetroMode ? 'assets/profile.png' : 'assets/profile-color.jpg';
      if (modeLabel) modeLabel.textContent = isRetroMode ? 'DMG-01' : 'COLOR';
    });
    avatarFrame.addEventListener('mouseenter', () => {
      profileImg.src = 'assets/profile-color.jpg';
      if (modeLabel) modeLabel.textContent = 'COLOR';
    });
    avatarFrame.addEventListener('mouseleave', () => {
      if (isRetroMode) {
        profileImg.src = 'assets/profile.png';
        if (modeLabel) modeLabel.textContent = 'DMG-01';
      }
    });
  }

  // 6. Dynamic Gallery Loader (reads from /api/gallery with graceful fallback)
  const toyFramesContainer = document.querySelector('.toy-frames-pair');
  if (toyFramesContainer) {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(items => {
        if (Array.isArray(items) && items.length > 0) {
          toyFramesContainer.innerHTML = items.map(item => `
            <div class="bento-frame">
              <div class="frame-canvas" style="${item.image ? 'padding:0; overflow:hidden;' : ''}">
                ${item.image
                  ? `<img src="${item.image}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block;" />`
                  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="frame-svg"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                     <span class="frame-tag">${item.title}</span>
                     <span class="frame-sub">${item.subtitle || ''}</span>`
                }
              </div>
              <div class="frame-info">
                ${(item.specs || []).map(s => `<span class="spec-chip">${s}</span>`).join('')}
              </div>
            </div>
          `).join('');
        }
      })
      .catch(err => {
        console.debug('Menggunakan fallback galeri statis:', err.message);
      });
  }
});
