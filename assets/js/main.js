/* NDS Innovation — site interactions */

/* Force reload when new service worker activates */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (newSW) {
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'activated' && navigator.serviceWorker.controller) {
            window.location.reload();
          }
        });
      }
    });
  });
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) { refreshing = true; window.location.reload(); }
  });
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SW_UPDATED') {
      window.location.reload();
    }
  });
}

const NDS = {
  whatsapp: '919310644433',
  email: 'ndsinnovationn@gmail.com',
  waGreeting: 'Hi Nikhil! I found NDS Innovation website and want to discuss a project.',
  packages: {
    'student-portfolio': 'Hi Nikhil! I am a college student and want the Student Portfolio package (₹3,499). I can share my college ID.',
    'student-club': 'Hi Nikhil! I am a college student and want the Club / Fest / Event Page package (₹4,999). I can share my college ID.',
    'student-mini': 'Hi Nikhil! I am a college student and want the Mini Website package (₹9,999). I can share my college ID.',
    'student-uiux': 'Hi Nikhil! I am a college student and want the UI/UX Design package (₹1,999). I can share my college ID.',
    'student-pwa': 'Hi Nikhil! I am a college student and want the Student App / PWA package (₹18,999). I can share my college ID.',
    'student-custom': 'Hi Nikhil! I am a college student with a custom project idea. Can we discuss scope and student pricing? I can share my college ID.',
    starter: 'Hi Nikhil! I want the Landing Page package (₹7,999). Can we discuss my project?',
    business: 'Hi Nikhil! I want the Business Website package (₹18,999). Can we have a free consultation?',
    ecommerce: 'Hi Nikhil! I am interested in the E-Commerce / PWA package (₹34,999). Please share next steps.',
    portal: 'Hi Nikhil! I need a custom solution for my project. Can we discuss scope and pricing?',
    maintenance: 'Hi Nikhil! I want monthly website maintenance (from ₹1,499/mo). Please share details.',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const internalNav = sessionStorage.getItem('nds-page-nav') === '1';
  initPageTransition(internalNav);
  initPreloader(internalNav);
  initHeader();
  initMobileNav();
  initScrollReveal();
  initScrollTop();
  initWhatsAppFloat();
  initContactForm();
  initPricingWaButtons();
  initHeroTyping();
  initHeroParticles();
  initParallax();
  initScrollProgress();
  initCounterAnimation();
  initProcessLine();
  initRippleButtons();
  initTitleReveal();
  initBeamAngle();
  initMagneticButtons();
  initFaq();
  initWorkMarquee();
  initHeroMockup();
  initCompareSlider();
  initProcessAnimation();
  initCalculatorToggle();
  initPricingCalculator();
  initPortfolioFilters();
  initCaseStudyTabs();
  initPwa();
  initCardSpotlight();
  initSoftTilt();
  initImageReveal();
});

/* Smooth page transitions between internal pages */
function initPageTransition(internalNav) {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAGE_MS = 520;

  if (internalNav && !reduceMotion) {
    sessionStorage.removeItem('nds-page-nav');
    document.documentElement.classList.remove('nav-transition');
    document.documentElement.classList.add('page-enter');

    requestAnimationFrame(() => {
      overlay.classList.remove('is-active');
    });

    setTimeout(() => {
      document.documentElement.classList.remove('page-enter');
    }, 800);
  } else if (!internalNav && !reduceMotion && !document.getElementById('preloader')) {
    document.documentElement.classList.add('page-enter');
    setTimeout(() => {
      document.documentElement.classList.remove('page-enter');
    }, 800);
  } else {
    document.documentElement.classList.remove('nav-transition');
    overlay.classList.remove('is-active');
  }

  document.addEventListener('click', (e) => {
    if (reduceMotion) return;

    const link = e.target.closest('a');
    if (!link || link.closest('.nav-toggle')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && !url.hash) return;

    e.preventDefault();

    if (overlay.classList.contains('is-active')) return;

    sessionStorage.setItem('nds-page-nav', '1');
    overlay.classList.add('is-active');

    setTimeout(() => {
      window.location.href = link.href;
    }, PAGE_MS);
  });
}

/* Preloader */
function initPreloader(internalNav) {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (internalNav) {
    preloader.remove();
    return;
  }

  const hide = () => {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  };

  window.addEventListener('load', () => setTimeout(hide, 500));
  setTimeout(hide, 2800);
}

/* Sticky header */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* Mobile nav */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* Enhanced scroll reveal */
function initScrollReveal() {
  const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .section-header';
  const reveals = document.querySelectorAll(selectors);
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const parent = el.parentElement;
        const siblings = parent
          ? [...parent.children].filter(c => c.matches(selectors))
          : [el];
        const index = siblings.indexOf(el);

        el.style.setProperty('--reveal-delay', `${index * 70}ms`);
        requestAnimationFrame(() => {
          el.classList.add('visible');
          el.querySelectorAll('.title-reveal').forEach(t => t.classList.add('visible'));
        });

        observer.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* Scroll to top */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Contact form — sends via WhatsApp */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', validate: v => v.trim().length >= 2 },
      { id: 'email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'service', validate: v => v !== '' },
      { id: 'message', validate: v => v.trim().length >= 10 },
    ];

    fields.forEach(({ id, validate }) => {
      const input = document.getElementById(id);
      const group = input.closest('.form-group');
      if (!validate(input.value)) {
        group.classList.add('error');
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (!valid) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone')?.value.trim() || 'Not provided';
    const serviceEl = document.getElementById('service');
    const service = serviceEl.options[serviceEl.selectedIndex].text;
    const budgetEl = document.getElementById('budget');
    const budget = budgetEl?.value
      ? budgetEl.options[budgetEl.selectedIndex].text
      : 'Not specified';
    const message = document.getElementById('message').value.trim();

    const text = [
      'Hi Nikhil! New project inquiry from NDS Innovation website:',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      '',
      'Project details:',
      message,
    ].join('\n');

    const waUrl = `https://wa.me/${NDS.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener');

    const success = document.getElementById('formSuccess');
    if (success) {
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 8000);
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group')?.classList.remove('error');
    });
  });
}

/* Floating WhatsApp button */
function initWhatsAppFloat() {
  if (document.getElementById('waFloat')) return;

  const link = document.createElement('a');
  link.id = 'waFloat';
  link.className = 'wa-float';
  link.href = `https://wa.me/${NDS.whatsapp}?text=${encodeURIComponent(NDS.waGreeting)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Chat on WhatsApp');
  link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg><span>WhatsApp</span>`;

  document.body.appendChild(link);
}

/* Pricing package → WhatsApp */
function initPricingWaButtons() {
  document.querySelectorAll('.pricing-wa-btn[data-package]').forEach((btn) => {
    const key = btn.dataset.package;
    const text = NDS.packages[key] || NDS.waGreeting;
    btn.href = `https://wa.me/${NDS.whatsapp}?text=${encodeURIComponent(text)}`;
    btn.target = '_blank';
    btn.rel = 'noopener';
  });
}

/* Scroll progress bar */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let current = 0;
  let target = 0;
  let ticking = false;

  function render() {
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.1) current = target;
    bar.style.width = current + '%';
    if (Math.abs(target - current) > 0.1) {
      requestAnimationFrame(render);
    } else {
      ticking = false;
    }
  }

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    target = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }, { passive: true });
}

/* Hero typing */
function initHeroTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = ['businesses', 'campuses', 'students', 'startups'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = words[wordIndex];

    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 90);
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, 45);
    }
  }

  setTimeout(type, 2000);
}

/* Hero particle network — gold constellation with glow & smooth motion */
function initHeroParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const GOLD = { r: 201, g: 168, b: 76 };
  const LINK_DIST = 145;
  const REPEL_RADIUS = 130;
  const MOUSE_INFLUENCE = 200;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let particles = [];
  let animId = null;
  let mouseX = -1000;
  let mouseY = -1000;
  let smoothMouseX = -1000;
  let smoothMouseY = -1000;
  let time = 0;

  const hero = canvas.closest('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas._w = w;
    canvas._h = h;
  }

  function createParticles() {
    const w = canvas._w;
    const h = canvas._h;
    particles = [];
    const count = Math.min(90, Math.max(50, Math.round((w * h) / 10000)));
    for (let i = 0; i < count; i++) {
      const isGlow = Math.random() < 0.18;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: isGlow ? Math.random() * 1.4 + 1.6 : Math.random() * 0.9 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseOpacity: Math.random() * 0.15 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        drift: Math.random() * Math.PI * 2,
        glow: isGlow,
      });
    }
  }

  function wrapParticle(p, w, h) {
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;
  }

  function mouseProximity(x, y) {
    if (smoothMouseX < 0) return 0;
    const d = Math.hypot(x - smoothMouseX, y - smoothMouseY);
    if (d >= MOUSE_INFLUENCE) return 0;
    return (1 - d / MOUSE_INFLUENCE) ** 1.5;
  }

  function drawGlowDot(x, y, r, alpha) {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    grad.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * 0.9})`);
    grad.addColorStop(0.35, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * 0.35})`);
    grad.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${Math.min(alpha * 1.4, 0.45)})`;
    ctx.fill();
  }

  function draw() {
    const w = canvas._w;
    const h = canvas._h;
    time += reducedMotion ? 0 : 1;

    smoothMouseX += (mouseX - smoothMouseX) * 0.12;
    smoothMouseY += (mouseY - smoothMouseY) * 0.12;

    ctx.clearRect(0, 0, w, h);

    if (smoothMouseX >= 0) {
      const aura = ctx.createRadialGradient(
        smoothMouseX, smoothMouseY, 0,
        smoothMouseX, smoothMouseY, MOUSE_INFLUENCE
      );
      aura.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.06)`);
      aura.addColorStop(0.5, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.02)`);
      aura.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!reducedMotion) {
        const distMouse = Math.hypot(p.x - smoothMouseX, p.y - smoothMouseY);
        if (distMouse < REPEL_RADIUS && distMouse > 0) {
          const force = ((REPEL_RADIUS - distMouse) / REPEL_RADIUS) ** 2;
          const angle = Math.atan2(p.y - smoothMouseY, p.x - smoothMouseX);
          p.x += Math.cos(angle) * force * 2.2;
          p.y += Math.sin(angle) * force * 2.2;
        }

        p.x += p.vx + Math.sin(time * 0.008 + p.drift) * 0.12;
        p.y += p.vy + Math.cos(time * 0.007 + p.drift) * 0.12;
        wrapParticle(p, w, h);
      }

      p._opacity = p.baseOpacity + Math.sin(time * p.pulseSpeed + p.pulse) * 0.06;
      p._proximity = mouseProximity(p.x, p.y);
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist >= LINK_DIST) continue;

        const fade = 1 - dist / LINK_DIST;
        const boost = Math.max(p._proximity, p2._proximity, mouseProximity(
          (p.x + p2.x) * 0.5, (p.y + p2.y) * 0.5
        ));
        const alpha = fade * (0.06 + boost * 0.14);

        const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * (0.6 + p._proximity * 0.8)})`);
        grad.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha * (0.6 + p2._proximity * 0.8)})`);

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5 + fade * 0.4;
        ctx.stroke();
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const alpha = Math.min(p._opacity + p._proximity * 0.18, 0.38);

      if (p.glow) {
        drawGlowDot(p.x, p.y, p.r, alpha);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
        ctx.fill();
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    if (animId) cancelAnimationFrame(animId);
    resize();
    createParticles();
    draw();
  }

  start();
  window.addEventListener('resize', start);
}

/* Smooth parallax */
function initParallax() {
  const items = [...document.querySelectorAll('[data-parallax]')].map(el => ({
    el,
    speed: parseFloat(el.dataset.parallax),
    y: 0
  }));
  if (!items.length) return;

  let scrollY = window.scrollY;
  let animating = false;

  function tick() {
    let moving = false;
    items.forEach(item => {
      const goal = scrollY * item.speed;
      const diff = goal - item.y;
      if (Math.abs(diff) > 0.05) {
        item.y += diff * 0.1;
        moving = true;
      } else {
        item.y = goal;
      }
      item.el.style.transform = `translate3d(0, ${item.y}px, 0)`;
    });
    if (moving) {
      requestAnimationFrame(tick);
    } else {
      animating = false;
    }
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }, { passive: true });

  tick();
}

/* Subtle magnetic — nav button only */
function initMagneticButtons() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    function animate() {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) * 0.12;
      targetY = (e.clientY - rect.top - rect.height / 2) * 0.12;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    btn.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });
  });
}


/* Counter animation */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Process timeline line draw */
function initProcessLine() {
  const timeline = document.querySelector('.process-timeline');
  if (!timeline) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('line-drawn');
        observer.unobserve(timeline);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(timeline);
}

/* Ripple on buttons */
function initRippleButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* Title reveal observer */
function initTitleReveal() {
  document.querySelectorAll('.title-reveal').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

/* Animate border beam angle via JS for broader browser support */
function initBeamAngle() {
  let angle = 0;
  function rotate() {
    angle = (angle + 1) % 360;
    document.querySelectorAll('.border-beam').forEach(el => {
      el.style.setProperty('--beam-angle', angle + 'deg');
    });
    requestAnimationFrame(rotate);
  }
  if (document.querySelector('.border-beam')) rotate();
}

/* FAQ accordion */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem === item) return;
        openItem.classList.remove('is-open');
        const openAnswer = openItem.querySelector('.faq-answer');
        if (openAnswer) openAnswer.style.maxHeight = '0';
        openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* Auto-scrolling marquees — clones cards for a seamless loop */
function initWorkMarquee() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.work-marquee').forEach((marquee) => {
    const track = marquee.querySelector('.work-marquee-track');
    if (!track || track.dataset.marqueeReady) return;
    track.dataset.marqueeReady = '1';

    const originals = [...track.children];
    originals.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });

    const setDuration = () => {
      const halfWidth = track.scrollWidth / 2;
      const speed = 70;
      const duration = Math.max(30, Math.round(halfWidth / speed));
      track.style.setProperty('--marquee-duration', duration + 's');
    };

    setDuration();
    window.addEventListener('resize', setDuration, { passive: true });
  });
}

/* Hero mockup — cycles through live project screenshots */
function initHeroMockup() {
  const carousel = document.getElementById('mockupCarousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.mockup-slide')];
  const dots = document.querySelectorAll('#mockupDots .mockup-dot');
  const urlEl = document.getElementById('mockupUrl');
  if (!slides.length) return;

  let index = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    slides.forEach((s, n) => s.classList.toggle('active', n === i));
    dots.forEach((d, n) => d.classList.toggle('active', n === i));
    if (urlEl) urlEl.textContent = slides[i].dataset.url || 'ndsinnovation.com';
  }

  if (reduceMotion) return;

  setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 3500);
}

/* Before/After comparison slider */
function initCompareSlider() {
  const slider = document.getElementById('compareSlider');
  const range = document.getElementById('compareRange');
  const handle = document.getElementById('compareHandle');
  if (!slider || !range) return;

  function update() {
    const val = range.value;
    slider.style.setProperty('--compare-pos', val + '%');
    if (handle) handle.style.left = val + '%';
  }

  range.addEventListener('input', update);
  update();
}

/* Process timeline — sequential step animation */
function initProcessAnimation() {
  const timeline = document.getElementById('processTimeline');
  if (!timeline) return;

  const steps = [...timeline.querySelectorAll('.process-step')];
  const fill = document.getElementById('processProgress');
  if (!steps.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.classList.toggle('is-done', i < index);
    });
    if (fill && steps.length > 1) {
      fill.style.width = (index / (steps.length - 1)) * 100 + '%';
    }
  }

  function runSequence() {
    setStep(0);
    steps.forEach((_, i) => {
      if (i === 0) return;
      setTimeout(() => setStep(i), i * 700);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(timeline);
      if (reduceMotion) {
        setStep(steps.length - 1);
      } else {
        runSequence();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(timeline);

  steps.forEach((step, i) => {
    step.addEventListener('mouseenter', () => setStep(i));
  });

  timeline.addEventListener('mouseleave', () => {
    setStep(steps.length - 1);
  });
}

/* Collapsible price calculator toggle */
function initCalculatorToggle() {
  const toggle = document.getElementById('calcToggle');
  const section = document.getElementById('calculator');
  if (!toggle || !section) return;

  toggle.addEventListener('click', () => {
    const isOpen = !section.hidden;

    if (isOpen) {
      section.hidden = true;
      section.classList.remove('calc-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Price Calculator';
    } else {
      section.hidden = false;
      section.classList.add('calc-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = 'Hide Calculator';
      requestAnimationFrame(() => {
        const top = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    }
  });
}

/* Interactive pricing calculator */
function initPricingCalculator() {
  const typeEl = document.getElementById('calcType');
  if (!typeEl) return;

  const pagesEl = document.getElementById('calcPages');
  const pagesVal = document.getElementById('calcPagesVal');
  const timelineEl = document.getElementById('calcTimeline');
  const priceEl = document.getElementById('calcPrice');
  const timelineText = document.getElementById('calcTimelineText');
  const waBtn = document.getElementById('calcWaBtn');
  const checks = document.querySelectorAll('.calc-check input');

  const timelines = {
    7999: '7–10 days',
    18999: '2–3 weeks',
    34999: '4–6 weeks',
    45000: '4–8 weeks',
    60000: '6–10 weeks',
  };

  function formatINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function calculate() {
    let base = parseInt(typeEl.value, 10);
    const pages = parseInt(pagesEl.value, 10);
    const multiplier = parseFloat(timelineEl.value);

    if (pages > 5 && base === 18999) base += (pages - 5) * 2000;
    if (pages > 1 && base === 7999) base += (pages - 1) * 1500;

    let extras = 0;
    const features = [];
    checks.forEach((cb) => {
      if (cb.checked) {
        extras += parseInt(cb.dataset.price, 10);
        features.push(cb.value);
      }
    });

    const total = Math.round((base + extras) * multiplier);
    priceEl.textContent = formatINR(total);

    const baseKey = parseInt(typeEl.value, 10);
    timelineText.textContent = '⏱ ~' + (timelines[baseKey] || '2–4 weeks') + ' delivery';

    const typeName = typeEl.options[typeEl.selectedIndex].text.split('—')[0].trim();
    const msg = [
      'Hi Nikhil! I used your price calculator on NDS Innovation:',
      '',
      `Project: ${typeName}`,
      `Pages: ${pages}`,
      `Features: ${features.length ? features.join(', ') : 'Standard package'}`,
      `Timeline: ${timelineEl.options[timelineEl.selectedIndex].text}`,
      `Estimated: ${formatINR(total)}`,
      '',
      'Can we discuss the final scope and quote?',
    ].join('\n');

    waBtn.href = `https://wa.me/${NDS.whatsapp}?text=${encodeURIComponent(msg)}`;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener';
  }

  [typeEl, pagesEl, timelineEl, ...checks].forEach((el) => {
    el.addEventListener('input', () => {
      if (pagesVal) pagesVal.textContent = pagesEl.value;
      calculate();
    });
    el.addEventListener('change', calculate);
  });

  if (pagesVal) pagesVal.textContent = pagesEl.value;
  calculate();
}

/* Portfolio category filters */
function initPortfolioFilters() {
  const filters = document.getElementById('portfolioFilters');
  const grid = document.getElementById('portfolioGrid');
  if (!filters || !grid) return;

  const cards = [...grid.querySelectorAll('.portfolio-card')];
  const buttons = [...filters.querySelectorAll('.portfolio-filter')];

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      cards.forEach((card) => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) card.classList.add('visible');
      });
    });
  });
}

/* Case study tabs */
function initCaseStudyTabs() {
  const tabs = document.querySelectorAll('.case-tab');
  if (!tabs.length) return;

  const panels = {
    dseu: document.getElementById('case-dseu'),
    'rc-club': document.getElementById('case-rc-club'),
    apex: document.getElementById('case-apex'),
    nds: document.getElementById('case-nds'),
  };

  function activate(key) {
    tabs.forEach(t => {
      const on = t.dataset.case === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    Object.entries(panels).forEach(([k, panel]) => {
      if (!panel) return;
      const on = k === key;
      panel.classList.toggle('active', on);
      panel.hidden = !on;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab.dataset.case));
  });

  const hash = window.location.hash.replace('#case-', '');
  const map = { dseu: 'dseu', 'rc-club': 'rc-club', apex: 'apex', nds: 'nds' };
  if (hash && map[hash]) activate(map[hash]);
}

/* PWA service worker */
function initPwa() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    const swPath = new URL('sw.js', window.location.href).pathname;
    navigator.serviceWorker.register(swPath).catch(() => {});
  });
}

/* Cursor spotlight on premium cards */
function initCardSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.premium-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      card.classList.add('is-spotlit');
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-spotlit');
    });
  });
}

/* Soft 3D tilt — why / promise / value cards */
function initSoftTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const cards = document.querySelectorAll(
    '.why-card, .promise-card, .value-card, .pricing-card:not(.featured)'
  );
  if (!cards.length) return;

  cards.forEach((card) => {
    card.classList.add('tilt-card');
    let raf = null;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function tick() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (Math.abs(cx) < 0.02 && Math.abs(cy) < 0.02 && tx === 0 && ty === 0) {
        card.style.transform = '';
        raf = null;
        return;
      }
      card.style.transform = `perspective(800px) rotateX(${cy}deg) rotateY(${cx}deg)`;
      raf = requestAnimationFrame(tick);
    }

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      tx = (x - 0.5) * 8;
      ty = (0.5 - y) * 6;
      if (!raf) raf = requestAnimationFrame(tick);
    });

    card.addEventListener('pointerleave', () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  });
}

/* Fade-in images as they enter view */
function initImageReveal() {
  const images = document.querySelectorAll(
    '.portfolio-thumb-img, .about-photo img, .case-visual img'
  );
  if (!images.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  images.forEach((img) => {
    if (reduceMotion) {
      img.classList.add('img-reveal', 'is-loaded');
      return;
    }

    img.classList.add('img-reveal');

    const mark = () => img.classList.add('is-loaded');

    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(mark);
    } else {
      img.addEventListener('load', mark, { once: true });
      img.addEventListener('error', mark, { once: true });
    }
  });
}
