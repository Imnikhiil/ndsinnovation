/* NDS — Nikhil Digital Solution | Ultra WOW Interactions */

const NDS = {
  whatsapp: '919310644433',
  email: 'ndsinnovationn@gmail.com',
  waGreeting: 'Hi Nikhil! I found NDS Innovation website and want to discuss a project.',
  packages: {
    'student-portfolio': 'Hi Nikhil! I am a college student and want the Student Portfolio package (₹4,999). I can share my college ID.',
    'student-club': 'Hi Nikhil! I am a college student and want the Club / Fest / Event Page package (₹5,999). I can share my college ID.',
    'student-mini': 'Hi Nikhil! I am a college student and want the Mini Website package (₹9,999). I can share my college ID.',
    'student-uiux': 'Hi Nikhil! I am a college student and want the UI/UX Design package (₹2,999). I can share my college ID.',
    'student-pwa': 'Hi Nikhil! I am a college student and want the Student App / PWA package (₹19,999). I can share my college ID.',
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
  initPwa();
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

  const words = ['Websites', 'PWA Apps', 'E-Commerce', 'UI/UX Design', 'Custom Code'];
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

/* Enhanced particles — mouse reactive */
function initHeroParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let mouseX = -1000, mouseY = -1000;

  const hero = canvas.closest('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });
  }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.width / 16));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      const distMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
      if (distMouse < 120) {
        const force = (120 - distMouse) / 120;
        p.x -= (mouseX - p.x) * force * 0.008;
        p.y -= (mouseY - p.y) * force * 0.008;
      }

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.25})`;
      ctx.fill();

      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles();
    draw();
  });
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

/* PWA service worker */
function initPwa() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    const swPath = new URL('sw.js', window.location.href).pathname;
    navigator.serviceWorker.register(swPath).catch(() => {});
  });
}
