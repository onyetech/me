/* ═══════════════════════════════════════════════════════
   ONYETECH CREATIVE HUB — Interactive Scripts
   ═══════════════════════════════════════════════════════ */

/* ─── PRELOADER ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    // Kick off hero animations after preloader
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-fade').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1800);
});

/* ─── NAVBAR SCROLL ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── HAMBURGER MENU ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ─── SMOOTH ACTIVE LINK ─────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
  // Skip hero elements — handled by preloader callback
  if (!el.closest('#hero')) revealObserver.observe(el);
});

/* ─── COUNTER ANIMATION ─────────────────────────────────── */
function animateCount(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step     = Math.ceil(target / (duration / 16));
  let   current  = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ─── FLOATING PARTICLES ─────────────────────────────────── */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size  = Math.random() * 3 + 1;
    const x     = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur   = Math.random() * 8 + 6;

    p.style.cssText = `
      left: ${x}%;
      bottom: ${Math.random() * 30}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ─── BACK TO TOP ────────────────────────────────────────── */
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
}, { passive: true });

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── CONTACT FORM — Formspree ───────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn     = contactForm.querySelector('button[type="submit"]');
    const span    = btn.querySelector('span');
    const original = span.textContent;

    btn.disabled      = true;
    span.textContent  = 'Sending…';
    btn.style.opacity = '0.75';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Show success banner
        const banner = document.createElement('div');
        banner.className = 'form-success-banner';
        banner.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div>
            <strong>Message received!</strong>
            <span>Thank you for reaching out. We'll get back to you within 24 hours.</span>
          </div>`;
        contactForm.insertAdjacentElement('beforebegin', banner);
        contactForm.reset();
        contactForm.style.display = 'none';
        setTimeout(() => {
          banner.remove();
          contactForm.style.display = '';
          btn.disabled     = false;
          span.textContent = original;
          btn.style.opacity = '1';
        }, 6000);
      } else {
        throw new Error('submission failed');
      }
    } catch {
      span.textContent  = 'Failed — try again';
      btn.style.opacity = '1';
      btn.style.background = '#c0392b';
      setTimeout(() => {
        span.textContent = original;
        btn.disabled     = false;
        btn.style.background = '';
      }, 3000);
    }
  });
}

/* ─── NEWSLETTER FORM — Formspree ────────────────────────── */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn   = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    btn.textContent = 'Subscribing…';
    btn.disabled    = true;

    try {
      const res = await fetch(newsletterForm.action, {
        method: 'POST',
        body: new FormData(newsletterForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#2e7d52';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } else { throw new Error(); }
    } catch {
      btn.textContent  = 'Try again';
      btn.disabled     = false;
    }
  });
}

/* ─── SERVICE CARD TILT EFFECT ───────────────────────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y     = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── SMOOTH SECTION TRANSITIONS (Intersection-based) ──── */
// Stagger children inside grids when they enter the viewport
const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.service-card, .stat-card, .why-card, .testimonial-card');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 100);
      });
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.services-grid, .stats-grid, .why-grid, .testimonials-grid').forEach(grid => {
  // Add reveal class to grid children
  grid.querySelectorAll('.service-card, .stat-card, .why-card, .testimonial-card').forEach(el => {
    if (!el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
    }
  });
  gridObserver.observe(grid);
});

/* ─── COPYRIGHT YEAR ─────────────────────────────────────── */
document.getElementById('copyrightYear').textContent = new Date().getFullYear();
