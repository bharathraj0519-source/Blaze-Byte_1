/**
 * BLAZEBYTE STUDIO — GLOBAL INTERACTIONS & NAVIGATION
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header state
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // Mobile Navigation Menu
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    const closeMobileNav = () => {
      navMenu.classList.remove('open');
      document.body.classList.remove('mobile-nav-locked');
      mobileToggle.textContent = '☰';
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    const openMobileNav = () => {
      navMenu.classList.add('open');
      document.body.classList.add('mobile-nav-locked');
      mobileToggle.textContent = '✕';
      mobileToggle.setAttribute('aria-expanded', 'true');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Auto-close on nav link click (except dropdown toggle)
    navMenu.querySelectorAll('a:not(.nav-item.has-dropdown > a)').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // Services Dropdown for Mobile
  const servicesNavItem = document.querySelector('.nav-item.has-dropdown');
  if (servicesNavItem) {
    const navLink = servicesNavItem.querySelector('.nav-link');
    navLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        servicesNavItem.classList.toggle('dropdown-open');
      }
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        const parent = item.closest('.faq-accordion');
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        }
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // Active Navigation item detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      const navItem = link.closest('.nav-item');
      if (navItem) navItem.classList.add('active');
    }
  });

  // ==========================================================================
  // CLEAN ANIME INTERACTION SYSTEM
  // 1. Ambient Twilight Stardust & Energy Motes Canvas
  // 2. Interactive Cursor Reactive Aura & Particle Deflection
  // 3. 3D Holographic Micro-Tilt on Cards
  // 4. Anime Cyber Preloader for All Service Sections
  // ==========================================================================
  initAnimePreloader();
  initAnimeInteraction();
});

function initAnimePreloader() {
  if (document.getElementById('anime-preloader')) return;

  const preloader = document.createElement('div');
  preloader.id = 'anime-preloader';
  preloader.innerHTML = `
    <div class="anime-loader-core">
      <div class="anime-ring-outer"></div>
      <div class="anime-ring-middle"></div>
      <div class="anime-ring-inner">
        <span class="anime-core-icon">BB</span>
      </div>
    </div>
    <div class="anime-loader-meta">
      <div class="anime-loader-kanji">// INITIALIZING PLATFORM //</div>
      <div class="anime-loader-title">BlazeByte Studio</div>
      <div class="anime-progress-track">
        <div class="anime-progress-bar" id="animeProgressBar"></div>
      </div>
      <div class="anime-loader-status" id="animeLoaderStatus">INITIALIZING NEURAL PIPELINE...</div>
    </div>
  `;
  document.body.prepend(preloader);

  const bar = preloader.querySelector('#animeProgressBar');
  const status = preloader.querySelector('#animeLoaderStatus');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (bar) bar.style.width = '100%';
      if (status) status.textContent = 'SYSTEM ONLINE // READY';
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 450);
      }, 250);
    } else {
      if (bar) bar.style.width = `${progress}%`;
      if (status) status.textContent = `SYNCING DIVISION NODES ${progress}%...`;
    }
  }, 45);
}

function initAnimeInteraction() {
  // Prevent duplicate canvas
  if (document.getElementById('anime-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'anime-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.9';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const PARTICLE_COUNT = Math.min(window.innerWidth < 768 ? 20 : 45, 55);
  const colors = [
    'rgba(192, 132, 252, ', // Lavender / Horizon Violet
    'rgba(103, 232, 249, ', // Ethereal Cyan
    'rgba(244, 114, 182, ', // Twilight Rose
    'rgba(255, 255, 255, '  // Starlight White
  ];

  class AnimeParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.6 + 0.2;
      this.alpha = this.baseAlpha;
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.5 + 0.2); // Gently drift upward through dunes
      this.pulseSpeed = Math.random() * 0.025 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }

    update(mouseX, mouseY) {
      this.x += this.vx;
      this.y += this.vy;
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.22;

      // Mouse interactive repelling / attraction
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 1.6;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
          this.alpha = Math.min(1, this.alpha + 0.4);
        }
      }

      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorPrefix + Math.max(0, Math.min(1, this.alpha)) + ')';
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = this.colorPrefix + '0.8)';
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new AnimeParticle());
  }

  let mouseX = null;
  let mouseY = null;
  let isThrottled = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isThrottled) {
      isThrottled = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
        isThrottled = false;
      });
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouseX, mouseY);
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 75) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const linkAlpha = (1 - dist / 75) * 0.16;
          ctx.strokeStyle = `rgba(168, 85, 247, ${linkAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 3D Anime Holographic Micro-Tilt for Cards
  if (window.matchMedia('(min-width: 992px)').matches) {
    const cards = document.querySelectorAll('.card, .pricing-card, .division-card, .case-study-card, .solution-card, .process-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
        card.style.setProperty('--card-mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
        card.style.setProperty('--card-mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
