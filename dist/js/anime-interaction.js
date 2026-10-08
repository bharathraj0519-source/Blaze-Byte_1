/**
 * BLAZEBYTE STUDIO — CLEAN ANIME INTERACTION SYSTEM
 * Features:
 * 1. Ambient Twilight Stardust & Energy Motes Canvas
 * 2. Interactive Cursor Reactive Aura & Particle Deflection
 * 3. 3D Holographic Micro-Tilt for Cards with Anime Edge Sheen
 * 4. Dynamic Cursor Lighting on Background Dunes
 */

(function () {
  'use strict';

  // --- 1. AMBIENT STARDUST CANVAS ---
  const canvas = document.createElement('canvas');
  canvas.id = 'anime-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.85';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const PARTICLE_COUNT = Math.min(window.innerWidth < 768 ? 24 : 50, 60);
  const colors = [
    'rgba(192, 132, 252, ', // Lavender/Violet
    'rgba(103, 232, 249, ', // Soft Electric Cyan
    'rgba(244, 114, 182, ', // Twilight Rose
    'rgba(255, 255, 255, '  // Pure Stardust
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
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(Math.random() * 0.55 + 0.2); // Gently drift upward like embers
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }

    update(mouseX, mouseY) {
      this.x += this.vx;
      this.y += this.vy;
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.2;

      // Mouse interactive repelling / attraction
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 1.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
          this.alpha = Math.min(1, this.alpha + 0.4);
        }
      }

      // Wrap around screen
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

    // Draw stardust particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouseX, mouseY);
      particles[i].draw();

      // Soft anime constellation threads between very close particles
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


  // --- 2. 3D ANIME HOLOGRAPHIC MICRO-TILT FOR CARDS ---
  if (window.matchMedia('(min-width: 992px)').matches) {
    const interactiveCards = document.querySelectorAll('.card, .pricing-card, .division-card, .portfolio-card, .solution-card');
    interactiveCards.forEach(card => {
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

  console.log('⚡ BlazeByte Studio: Clean Anime Interaction Engine Online');
})();
