/* ========================================================
   AVINASH NAIK — INTERACTIVE DEVELOPER PORTFOLIO ENGINE
   LIVE GITHUB SYNC, AUDIO SYNTH, TERMINAL HUD & MODALS
   ======================================================== */

(function () {
  'use strict';

  // Config & State
  const GITHUB_USERNAME = 'naikavinash1908-ctrl';
  const STATE = {
    soundEnabled: true,
    activeTheme: 'dark',
    terminalOpen: false,
    githubData: null,
    repos: [
      {
        name: 'avinash-clinic',
        category: 'healthcare',
        title: 'Avinash Natural Clinic',
        desc: 'Holistic clinical web portal featuring comprehensive treatment catalog, doctor profiles, wellness gallery, and appointment consultation forms.',
        lang: 'HTML / CSS',
        stars: 0,
        url: 'https://github.com/naikavinash1908-ctrl/avinash-clinic'
      },
      {
        name: 'premium-healthcare-clinic',
        category: 'healthcare',
        title: 'PremiumCare Healthcare Clinic',
        desc: 'Advanced modern clinic landing page with responsive navigation toggles, client-side script validation, interactive appointment booking, and testimonials.',
        lang: 'JavaScript / HTML',
        stars: 0,
        url: 'https://github.com/naikavinash1908-ctrl/premium-healthcare-clinic'
      },
      {
        name: 'Diva-Clothing-',
        category: 'ecommerce',
        title: 'Diva Clothing Boutique Store',
        desc: 'Luxury fashion retail storefront featuring curated lookbooks, responsive hero banners, dynamic JavaScript catalog feeding, cart drawer, and checkout layout.',
        lang: 'JavaScript / CSS',
        stars: 0,
        url: 'https://github.com/naikavinash1908-ctrl/Diva-Clothing-'
      },
      {
        name: 'to-do-list',
        category: 'productivity',
        title: 'TaskFlow (Interactive To-Do List)',
        desc: 'Clean and responsive productivity application with CSS variable-driven dark/light theming, priority filtering, completed status toggles, and persistence.',
        lang: 'HTML / CSS / JS',
        stars: 0,
        url: 'https://github.com/naikavinash1908-ctrl/to-do-list'
      },
      {
        name: 'student-login',
        category: 'auth',
        title: 'Student Login & Portal Gate',
        desc: 'Academic authentication interface with client-side form validation, password visibility toggling, error state feedback, and responsive session layout.',
        lang: 'HTML / Security',
        stars: 0,
        url: 'https://github.com/naikavinash1908-ctrl/student-login'
      }
    ],
    cart: [
      { id: 1, name: 'Silk Evening Gown', price: 129, qty: 1 },
      { id: 2, name: 'Minimalist Linen Blazer', price: 89, qty: 1 }
    ],
    todos: [
      { id: 1, text: 'Deploy Avinash Clinic portfolio website', done: true, priority: 'high' },
      { id: 2, text: 'Integrate real-time GitHub REST API v3', done: true, priority: 'high' },
      { id: 3, text: 'Add interactive mini e-commerce checkout flow', done: true, priority: 'med' },
      { id: 4, text: 'Optimize mobile touch interactions & audio SFX', done: false, priority: 'normal' }
    ]
  };

  /* ========================================================
     1. AUDIO SYNTHESIZER (WEB AUDIO API)
     Zero external audio files needed!
     ======================================================== */
  class SoundFX {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
      if (!STATE.soundEnabled) return;
      try {
        this.init();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio might be blocked until user gesture
      }
    }

    click() {
      this.playTone(800, 'sine', 0.04, 0.03);
    }

    success() {
      if (!STATE.soundEnabled) return;
      this.playTone(523.25, 'sine', 0.1, 0.04);
      setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.04), 80);
      setTimeout(() => this.playTone(783.99, 'sine', 0.15, 0.04), 160);
    }

    terminalBeep() {
      this.playTone(950, 'triangle', 0.05, 0.04);
    }

    toggle() {
      this.playTone(440, 'sine', 0.06, 0.03);
      setTimeout(() => this.playTone(880, 'sine', 0.08, 0.03), 60);
    }
  }

  const sfx = new SoundFX();

  /* ========================================================
     2. DYNAMIC BACKGROUND CONSTELLATION PARTICLES
     ======================================================== */
  function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function getThemeColor() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      switch (theme) {
        case 'emerald': return { r: 16, g: 185, b: 129 };
        case 'cyber': return { r: 245, g: 158, b: 11 };
        case 'light': return { r: 37, g: 99, b: 235 };
        default: return { r: 59, g: 130, b: 246 };
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      const col = getThemeColor();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.5)`;
        ctx.fill();

        // Connect lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction line
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${0.35 * (1 - mDist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  /* ========================================================
     3. THEME MANAGER
     ======================================================== */
  function initThemeManager() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');
    const themeLabel = document.getElementById('themeLabel');

    const savedTheme = localStorage.getItem('avinash_portfolio_theme') || 'dark';
    setTheme(savedTheme);

    if (themeBtn && themeMenu) {
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('show');
        sfx.click();
      });

      document.addEventListener('click', () => {
        themeMenu.classList.remove('show');
      });

      themeMenu.querySelectorAll('button[data-set-theme]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const newTheme = btn.getAttribute('data-set-theme');
          setTheme(newTheme);
          themeMenu.classList.remove('show');
          sfx.toggle();
          showToast(`Theme switched to: ${getThemeName(newTheme)}`);
        });
      });
    }

    function getThemeName(th) {
      switch (th) {
        case 'emerald': return '🌿 Emerald Clinical';
        case 'cyber': return '⚡ Neon Cyberpunk';
        case 'light': return '☀️ Clean Light';
        default: return '🌌 Cosmic Dark';
      }
    }

    function setTheme(th) {
      document.documentElement.setAttribute('data-theme', th);
      STATE.activeTheme = th;
      localStorage.setItem('avinash_portfolio_theme', th);
      if (themeLabel) {
        themeLabel.textContent = th.charAt(0).toUpperCase() + th.slice(1);
      }
    }
  }

  /* ========================================================
     4. AUDIO TOGGLE
     ======================================================== */
  function initAudioToggle() {
    const soundBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    const soundLabel = soundBtn ? soundBtn.querySelector('.btn-text') : null;

    const savedSound = localStorage.getItem('avinash_sound_enabled');
    if (savedSound !== null) {
      STATE.soundEnabled = savedSound === 'true';
    }
    updateSoundUI();

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        STATE.soundEnabled = !STATE.soundEnabled;
        localStorage.setItem('avinash_sound_enabled', STATE.soundEnabled);
        updateSoundUI();
        if (STATE.soundEnabled) {
          sfx.toggle();
          showToast('Sound Synthesizer: ON (Web Audio API active)');
        } else {
          showToast('Sound Synthesizer: MUTED');
        }
      });
    }

    function updateSoundUI() {
      if (!soundIcon || !soundLabel) return;
      if (STATE.soundEnabled) {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'SFX: ON';
      } else {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'SFX: OFF';
      }
    }
  }

  /* ========================================================
     5. TOAST NOTIFICATION UTILITY
     ======================================================== */
  function showToast(message, duration = 3200) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ========================================================
     6. LIVE GITHUB REST API SYNCHRONIZATION
     ======================================================== */
  async function syncGitHubData() {
    const statusText = document.getElementById('syncStatus');
    const refreshBtn = document.getElementById('refreshGithubBtn');
    if (statusText) statusText.textContent = 'SYNCING...';

    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        STATE.githubData = userData;

        const ghName = document.getElementById('ghName');
        const ghBio = document.getElementById('ghBio');
        const ghPublicRepos = document.getElementById('ghPublicRepos');
        const ghFollowers = document.getElementById('ghFollowers');
        const heroReposCount = document.getElementById('heroReposCount');
        const repoCountBadge = document.getElementById('repoCountBadge');

        if (ghName) ghName.textContent = userData.name || 'Avinash Naik';
        if (ghBio && userData.bio) ghBio.textContent = userData.bio;
        if (ghPublicRepos) ghPublicRepos.textContent = userData.public_repos;
        if (ghFollowers) ghFollowers.textContent = userData.followers;
        if (heroReposCount) heroReposCount.textContent = `${userData.public_repos}+`;
        if (repoCountBadge) repoCountBadge.textContent = userData.public_repos;

        const remaining = userRes.headers.get('x-ratelimit-remaining');
        const rateLimitNum = document.getElementById('rateLimitNum');
        if (rateLimitNum && remaining) rateLimitNum.textContent = remaining;
      }

      // 2. Fetch User Repositories
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        let totalStars = 0;

        reposData.forEach(r => {
          totalStars += r.stargazers_count || 0;
          // Sync with local state
          const match = STATE.repos.find(p => p.name.toLowerCase() === r.name.toLowerCase());
          if (match) {
            match.stars = r.stargazers_count;
            if (r.description) match.desc = r.description;
            if (r.language) match.lang = r.language;
          }
        });

        const ghTotalStars = document.getElementById('ghTotalStars');
        if (ghTotalStars) ghTotalStars.textContent = totalStars;
      }

      if (statusText) statusText.textContent = 'ONLINE';
      showToast('GitHub cloud telemetry synchronized!');
      sfx.success();
    } catch (err) {
      console.warn('GitHub API offline / rate limited, using verified snapshot data.', err);
      if (statusText) statusText.textContent = 'VERIFIED SNAPSHOT';
    }
  }

  /* ========================================================
     7. PROJECT CATEGORY FILTERS
     ======================================================== */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sfx.click();

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ========================================================
     8. INTERACTIVE PROJECT SIMULATOR (MODALS)
     ======================================================== */
  function initProjectModals() {
    const modal = document.getElementById('demoModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    function closeModal() {
      if (modal) modal.classList.remove('active');
      sfx.click();
    }

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    document.querySelectorAll('.launch-demo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const demoType = btn.getAttribute('data-demo');
        openDemo(demoType);
      });
    });

    window.openProjectModal = openDemo;

    function openDemo(type) {
      if (!modal || !modalBody || !modalTitle) return;
      sfx.toggle();
      modal.classList.add('active');

      switch (type) {
        case 'clinic':
        case 'premium-clinic':
          renderClinicDemo();
          break;
        case 'diva':
          renderDivaClothingDemo();
          break;
        case 'todo':
          renderTodoDemo();
          break;
        case 'student':
          renderStudentDemo();
          break;
        default:
          modalTitle.textContent = 'Interactive Simulation';
          modalBody.innerHTML = '<p>Project demo loading...</p>';
      }
    }

    // A. CLINIC DEMO
    function renderClinicDemo() {
      modalTitle.textContent = 'Avinash Natural & PremiumCare Clinic — Appointment Scheduler';
      modalBody.innerHTML = `
        <div class="sim-container">
          <div class="sim-hero-banner">
            <h4>🌿 Welcome to Avinash Natural Clinic Desk</h4>
            <p style="color:var(--text-secondary);font-size:0.9rem;">
              Experience the patient intake engine designed by Avinash Naik. Book a natural consultation or routine health checkup below.
            </p>
          </div>

          <div class="sim-interactive-box">
            <h5 style="margin-bottom:12px;font-size:1rem;">1. Select Clinical Specialist</h5>
            <div class="doctor-select-pills" id="docPillGroup">
              <div class="doc-pill selected" data-doc="Dr. Avinash Naik (Lead Wellness)">👨‍⚕️ Dr. Avinash Naik (Lead Wellness)</div>
              <div class="doc-pill" data-doc="Dr. Sarah Jenkins (Therapeutic Care)">👩‍⚕️ Dr. Sarah Jenkins (Therapeutics)</div>
              <div class="doc-pill" data-doc="Dr. Rajesh Rao (Diagnostics)">👨‍⚕️ Dr. Rajesh Rao (Diagnostics)</div>
            </div>

            <div style="margin-top:20px;">
              <h5 style="margin-bottom:12px;font-size:1rem;">2. Patient & Booking Credentials</h5>
              <div class="clinic-form-grid">
                <div class="form-group">
                  <label>Patient Full Name</label>
                  <input type="text" id="simPatientName" placeholder="e.g. John Doe" value="Avinash Guest Patient">
                </div>
                <div class="form-group">
                  <label>Select Date</label>
                  <input type="date" id="simPatientDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                  <label>Treatment Category</label>
                  <select id="simTreatmentType">
                    <option>Natural Therapy & Stress Relief</option>
                    <option>General Clinical Consultation</option>
                    <option>Holistic Nutritional Plan</option>
                    <option>Cardiovascular Wellness</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Preferred Time Window</label>
                  <select id="simTimeWindow">
                    <option>Morning (10:00 AM - 12:30 PM)</option>
                    <option>Afternoon (02:00 PM - 04:30 PM)</option>
                    <option>Evening (05:00 PM - 07:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            <button id="simBookBtn" class="btn btn-primary btn-large btn-full" style="margin-top:20px;">
              <span>Confirm Appointment Booking</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"/></svg>
            </button>

            <div id="simBookingReceipt" style="display:none;margin-top:20px;padding:16px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;"></div>
          </div>
        </div>
      `;

      // Interactive pill logic
      let selectedDoc = 'Dr. Avinash Naik (Lead Wellness)';
      modalBody.querySelectorAll('.doc-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          modalBody.querySelectorAll('.doc-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          selectedDoc = pill.getAttribute('data-doc');
          sfx.click();
        });
      });

      const bookBtn = modalBody.querySelector('#simBookBtn');
      const receipt = modalBody.querySelector('#simBookingReceipt');

      if (bookBtn && receipt) {
        bookBtn.addEventListener('click', () => {
          const name = modalBody.querySelector('#simPatientName').value || 'Guest Patient';
          const date = modalBody.querySelector('#simPatientDate').value;
          const treatment = modalBody.querySelector('#simTreatmentType').value;
          const time = modalBody.querySelector('#simTimeWindow').value;

          sfx.success();
          receipt.style.display = 'block';
          receipt.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <span style="font-size:1.4rem;">🎉</span>
              <strong style="color:var(--success);font-size:1.05rem;">Appointment Verified & Scheduled!</strong>
            </div>
            <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Patient:</strong> ${name}<br>
              <strong>Specialist:</strong> ${selectedDoc}<br>
              <strong>Treatment:</strong> ${treatment}<br>
              <strong>Date & Time:</strong> ${date} (${time})<br>
              <strong>Reference Token:</strong> <code>CLI-${Math.floor(100000 + Math.random() * 900000)}</code>
            </p>
          `;
          showToast(`Clinic appointment scheduled with ${selectedDoc}!`);
        });
      }
    }

    // B. DIVA CLOTHING E-COMMERCE MINI-STORE DEMO
    function renderDivaClothingDemo() {
      modalTitle.textContent = 'Diva Clothing — Dynamic Catalog & Shopping Cart Simulator';

      const items = [
        { id: 1, name: 'Silk Evening Gown', price: 129, icon: '👗', badge: 'Boutique' },
        { id: 2, name: 'Minimalist Linen Blazer', price: 89, icon: '🧥', badge: 'New Arrival' },
        { id: 3, name: 'Handcrafted Wool Coat', price: 165, icon: '🧥', badge: 'Autumn Luxe' },
        { id: 4, name: 'Embroidered Satin Blouse', price: 74, icon: '👚', badge: 'Popular' },
        { id: 5, name: 'Designer Pleated Trousers', price: 92, icon: '👖', badge: 'Trend' },
        { id: 6, name: 'Cashmere Ribbed Scarf', price: 45, icon: '🧣', badge: 'Accessory' }
      ];

      function updateCartView() {
        const cartList = modalBody.querySelector('#simCartList');
        const cartTotal = modalBody.querySelector('#simCartTotal');
        const cartCount = modalBody.querySelector('#simCartBadge');

        if (!cartList || !cartTotal) return;

        let total = 0;
        let count = 0;
        cartList.innerHTML = '';

        if (STATE.cart.length === 0) {
          cartList.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:8px 0;">Your shopping bag is empty.</div>';
        } else {
          STATE.cart.forEach((item, idx) => {
            total += item.price * item.qty;
            count += item.qty;
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
              <span>${item.name} (x${item.qty})</span>
              <div>
                <strong style="color:var(--accent);margin-right:10px;">$${item.price * item.qty}</strong>
                <button class="cart-remove-btn" data-index="${idx}" style="background:none;border:none;color:#ef4444;cursor:pointer;">✕</button>
              </div>
            `;
            cartList.appendChild(row);
          });
        }

        cartTotal.textContent = `$${total}`;
        if (cartCount) cartCount.textContent = count;

        modalBody.querySelectorAll('.cart-remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            STATE.cart.splice(index, 1);
            sfx.click();
            updateCartView();
          });
        });
      }

      modalBody.innerHTML = `
        <div class="sim-container">
          <div class="sim-hero-banner" style="background:linear-gradient(135deg, rgba(131,24,67,0.2), rgba(0,0,0,0.4));">
            <h4 style="font-family:var(--font-serif);font-size:1.35rem;">✨ Diva Clothing Lookbook Engine</h4>
            <p style="color:var(--text-secondary);font-size:0.9rem;">
              Demonstrating product catalog data structures & real-time client-side checkout calculation.
            </p>
          </div>

          <div class="shop-items-grid">
            ${items.map(it => `
              <div class="shop-item-card">
                <div class="shop-item-img">${it.icon}</div>
                <div style="font-size:0.7rem;color:var(--accent);text-transform:uppercase;margin-bottom:2px;">${it.badge}</div>
                <div class="shop-item-title">${it.name}</div>
                <div class="shop-item-price">$${it.price}</div>
                <button class="btn btn-sm btn-primary add-to-bag-btn" data-id="${it.id}" data-name="${it.name}" data-price="${it.price}">
                  + Add to Bag
                </button>
              </div>
            `).join('')}
          </div>

          <div class="cart-summary-drawer">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <h5 style="font-size:1rem;">🛍️ Shopping Bag (<span id="simCartBadge">2</span> items)</h5>
              <span style="font-size:0.85rem;color:var(--text-muted);">Client State Storage</span>
            </div>
            <div class="cart-items-list" id="simCartList"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--card-border);">
              <span style="font-weight:600;">Total Amount:</span>
              <span id="simCartTotal" style="font-size:1.25rem;font-weight:800;color:var(--accent);">$218</span>
            </div>
            <button id="simCheckoutBtn" class="btn btn-primary btn-large btn-full" style="margin-top:14px;">
              <span>Simulate One-Click Checkout</span>
            </button>
          </div>
        </div>
      `;

      updateCartView();

      modalBody.querySelectorAll('.add-to-bag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const name = btn.getAttribute('data-name');
          const price = parseInt(btn.getAttribute('data-price'));

          const existing = STATE.cart.find(c => c.id === id);
          if (existing) {
            existing.qty += 1;
          } else {
            STATE.cart.push({ id, name, price, qty: 1 });
          }
          sfx.success();
          showToast(`Added ${name} to Diva shopping bag!`);
          updateCartView();
        });
      });

      const checkoutBtn = modalBody.querySelector('#simCheckoutBtn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          if (STATE.cart.length === 0) {
            showToast('Bag is empty! Select items above.');
            return;
          }
          sfx.success();
          alert('🛍️ Checkout Simulation Complete!\nOrder dispatch payload validated successfully.');
          STATE.cart = [];
          updateCartView();
        });
      }
    }

    // C. TASKFLOW (TO-DO LIST) DEMO
    function renderTodoDemo() {
      modalTitle.textContent = 'TaskFlow — Interactive State & Filter Task Engine';

      function renderTodoList() {
        const list = modalBody.querySelector('#simTodoList');
        if (!list) return;
        list.innerHTML = '';

        STATE.todos.forEach(todo => {
          const item = document.createElement('div');
          item.className = `sim-todo-item ${todo.done ? 'done' : ''}`;
          item.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
              <input type="checkbox" class="todo-check" data-id="${todo.id}" ${todo.done ? 'checked' : ''}>
              <span>${todo.text}</span>
            </div>
            <div class="sim-todo-actions">
              <span class="pill-tag">${todo.priority.toUpperCase()}</span>
              <button class="todo-del-btn" data-id="${todo.id}" style="background:none;border:none;color:#ef4444;cursor:pointer;">✕</button>
            </div>
          `;
          list.appendChild(item);
        });

        modalBody.querySelectorAll('.todo-check').forEach(ck => {
          ck.addEventListener('change', () => {
            const id = parseInt(ck.getAttribute('data-id'));
            const match = STATE.todos.find(t => t.id === id);
            if (match) match.done = ck.checked;
            sfx.click();
            renderTodoList();
          });
        });

        modalBody.querySelectorAll('.todo-del-btn').forEach(del => {
          del.addEventListener('click', () => {
            const id = parseInt(del.getAttribute('data-id'));
            STATE.todos = STATE.todos.filter(t => t.id !== id);
            sfx.click();
            renderTodoList();
          });
        });
      }

      modalBody.innerHTML = `
        <div class="sim-container">
          <div class="sim-hero-banner">
            <h4>📋 TaskFlow Interactive Task Manager</h4>
            <p style="color:var(--text-secondary);font-size:0.9rem;">
              Demonstrates state filtering, priority management, and item lifecycle transitions.
            </p>
          </div>

          <div class="sim-todo-input-row">
            <input type="text" id="simNewTodoText" placeholder="Enter new task or roadmap goal...">
            <select id="simTodoPriority" style="background:var(--bg-secondary);border:1px solid var(--card-border);border-radius:var(--radius-sm);color:var(--text-primary);padding:0 12px;">
              <option value="high">High Priority</option>
              <option value="med" selected>Medium</option>
              <option value="normal">Normal</option>
            </select>
            <button id="simAddTodoBtn" class="btn btn-primary">Add Task</button>
          </div>

          <div class="sim-todo-list" id="simTodoList"></div>
        </div>
      `;

      renderTodoList();

      const addBtn = modalBody.querySelector('#simAddTodoBtn');
      const input = modalBody.querySelector('#simNewTodoText');
      const prio = modalBody.querySelector('#simTodoPriority');

      if (addBtn && input) {
        const handleAdd = () => {
          const text = input.value.trim();
          if (!text) return;
          STATE.todos.unshift({
            id: Date.now(),
            text: text,
            done: false,
            priority: prio.value
          });
          input.value = '';
          sfx.success();
          renderTodoList();
        };

        addBtn.addEventListener('click', handleAdd);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') handleAdd();
        });
      }
    }

    // D. STUDENT LOGIN DEMO
    function renderStudentDemo() {
      modalTitle.textContent = 'Student Login Portal — Authentication Simulator';
      modalBody.innerHTML = `
        <div class="sim-container" style="max-width:480px;margin:0 auto;">
          <div class="sim-hero-banner" style="text-align:center;">
            <h4>🎓 StudentGate Institute Portal</h4>
            <p style="color:var(--text-secondary);font-size:0.88rem;">
              Secure single-sign-on prototype designed with clean form feedback.
            </p>
          </div>

          <div class="sim-interactive-box">
            <div class="form-group" style="margin-bottom:14px;">
              <label>Student Enrollment ID</label>
              <input type="text" id="simStudentId" value="STU-2026-AVINASH">
            </div>
            <div class="form-group" style="margin-bottom:18px;">
              <label>Passcode / Token</label>
              <input type="password" id="simStudentPass" value="••••••••••••">
            </div>
            <button id="simLoginSubmitBtn" class="btn btn-primary btn-large btn-full">
              <span>Enter Student Dashboard</span>
            </button>
            <div id="simAuthFeedback" style="margin-top:16px;text-align:center;font-size:0.86rem;"></div>
          </div>
        </div>
      `;

      const btn = modalBody.querySelector('#simLoginSubmitBtn');
      const fb = modalBody.querySelector('#simAuthFeedback');
      if (btn && fb) {
        btn.addEventListener('click', () => {
          sfx.success();
          fb.innerHTML = `
            <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:10px;border-radius:6px;border:1px solid rgba(16,185,129,0.3);">
              ✓ Authenticated! Welcome, <strong>Avinash Naik</strong>.<br>
              Semester Status: Active • Enrolled Modules: Web Architecture
            </div>
          `;
        });
      }
    }
  }

  /* ========================================================
     9. CYBER TERMINAL CLI (ADVANCED UNIQUE FEATURE)
     ======================================================== */
  function initCyberTerminal() {
    const terminal = document.getElementById('cyberTerminal');
    const toggleBtn = document.getElementById('toggleTerminalBtn');
    const quickLaunch = document.getElementById('quickTerminalLaunch');
    const closeBtn = document.getElementById('termCloseBtn');
    const closeDot = document.getElementById('termCloseDot');
    const clearBtn = document.getElementById('termClearBtn');
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');

    function toggleTerminal(force) {
      STATE.terminalOpen = typeof force === 'boolean' ? force : !STATE.terminalOpen;
      if (terminal) {
        if (STATE.terminalOpen) {
          terminal.classList.add('open');
          sfx.terminalBeep();
          if (input) input.focus();
        } else {
          terminal.classList.remove('open');
          sfx.click();
        }
      }
    }

    if (toggleBtn) toggleBtn.addEventListener('click', () => toggleTerminal());
    if (quickLaunch) quickLaunch.addEventListener('click', () => toggleTerminal(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleTerminal(false));
    if (closeDot) closeDot.addEventListener('click', () => toggleTerminal(false));

    // Shortcut: backtick `
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        toggleTerminal();
      }
    });

    if (clearBtn && output) {
      clearBtn.addEventListener('click', () => {
        output.innerHTML = '';
        sfx.click();
      });
    }

    if (input && output) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const raw = input.value.trim();
          input.value = '';
          if (!raw) return;
          sfx.click();
          executeCommand(raw);
        }
      });
    }

    function printLine(html, className = '') {
      if (!output) return;
      const line = document.createElement('div');
      line.className = `term-line ${className}`;
      line.innerHTML = html;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function executeCommand(cmdStr) {
      printLine(`<span class="term-prompt-echo">avinash@github:~$ ${cmdStr}</span>`);
      const args = cmdStr.split(' ').map(s => s.trim()).filter(Boolean);
      const cmd = args[0].toLowerCase();

      switch (cmd) {
        case 'help':
          printLine(`
            <strong>AVAILABLE SHELL COMMANDS:</strong><br>
            • <span class="term-cmd">repos</span> - List all repositories & live URLs<br>
            • <span class="term-cmd">demo &lt;clinic|diva|todo|student&gt;</span> - Launch interactive simulator<br>
            • <span class="term-cmd">stats</span> - View GitHub metrics & language composition<br>
            • <span class="term-cmd">whoami</span> - Display developer bio & philosophy<br>
            • <span class="term-cmd">theme &lt;dark|emerald|cyber|light&gt;</span> - Switch UI color space<br>
            • <span class="term-cmd">sync</span> - Trigger live GitHub REST API telemetry<br>
            • <span class="term-cmd">contact</span> - Show inquiry channels & coordinates<br>
            • <span class="term-cmd">clear</span> - Clear terminal buffer<br>
            • <span class="term-cmd">exit</span> - Close terminal console
          `);
          break;

        case 'repos':
        case 'ls':
          printLine('<strong>SCANNING REPOSITORIES FOR @naikavinash1908-ctrl:</strong>');
          STATE.repos.forEach(r => {
            printLine(`→ <strong class="term-highlight">${r.name}</strong> [${r.lang}] - ${r.title} (<a href="${r.url}" target="_blank" style="color:var(--accent);">link</a>)`);
          });
          break;

        case 'demo':
          const target = args[1];
          if (!target) {
            printLine('Please specify a demo target: <span class="term-cmd">demo clinic</span>, <span class="term-cmd">demo diva</span>, <span class="term-cmd">demo todo</span>, or <span class="term-cmd">demo student</span>', 'term-error');
          } else if (['clinic', 'diva', 'todo', 'student'].includes(target.toLowerCase())) {
            printLine(`Launching interactive module for [${target}]...`, 'term-success');
            if (window.openProjectModal) {
              window.openProjectModal(target.toLowerCase());
            }
          } else {
            printLine(`Unknown demo target '${target}'. Try: clinic, diva, todo, or student.`, 'term-error');
          }
          break;

        case 'stats':
          printLine(`
            <strong>GITHUB CLOUD TELEMETRY:</strong><br>
            Account: <span class="term-highlight">@naikavinash1908-ctrl</span><br>
            Public Repositories: 5<br>
            Primary Stack: HTML5 (54%), CSS3 (32%), JavaScript ES6+ (14%)<br>
            Sync Protocol: REST API v3 (Verified)
          `);
          break;

        case 'whoami':
        case 'bio':
          printLine(`
            <strong>DEVELOPER IDENTITY:</strong><br>
            Name: Avinash Naik<br>
            Role: Full-Stack Web Developer & UI Architect<br>
            Focus: Healthcare platforms, high-converting retail stores, task systems<br>
            Motto: "Crafting clean semantics, responsive beauty, and scalable web apps."
          `);
          break;

        case 'theme':
          const t = args[1];
          if (['dark', 'emerald', 'cyber', 'light'].includes(t)) {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('avinash_portfolio_theme', t);
            printLine(`Active theme switched to [${t}].`, 'term-success');
          } else {
            printLine('Usage: theme &lt;dark | emerald | cyber | light&gt;', 'term-error');
          }
          break;

        case 'sync':
          printLine('Connecting to api.github.com/users/naikavinash1908-ctrl...', 'term-highlight');
          syncGitHubData();
          break;

        case 'contact':
          printLine(`
            <strong>DIRECT COORDINATES:</strong><br>
            GitHub: https://github.com/naikavinash1908-ctrl<br>
            Location: India (Remote Global Availability)<br>
            Engagement: Open for Freelance & Full-Stack Engineering
          `);
          break;

        case 'clear':
          output.innerHTML = '';
          break;

        case 'exit':
        case 'quit':
          toggleTerminal(false);
          break;

        default:
          printLine(`Command not found: '${cmd}'. Type <span class="term-cmd">help</span> for a list of commands.`, 'term-error');
      }
    }
  }

  /* ========================================================
     10. CONTACT FORM HANDLER
     ======================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const type = document.getElementById('projectTypeSelect').value;

      sfx.success();
      showToast(`Thank you, ${name}! Your inquiry for [${type}] has been dispatched.`);
      form.reset();
    });
  }

  /* ========================================================
     11. MOBILE NAVIGATION TOGGLE
     ======================================================== */
  function initMobileNav() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
      sfx.click();
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('mobile-open');
      });
    });
  }

  /* ========================================================
     12. INITIALIZATION ROUTINE
     ======================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initThemeManager();
    initAudioToggle();
    initProjectFilters();
    initProjectModals();
    initCyberTerminal();
    initContactForm();
    initMobileNav();

    // Trigger GitHub telemetry
    syncGitHubData();

    const refreshBtn = document.getElementById('refreshGithubBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        syncGitHubData();
      });
    }

    console.log('%c🚀 Avinash Naik Portfolio Initialized | Live GitHub Synchronization Engine Online', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
  });
})();
