// ---------- mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mainNav.classList.remove('open'))
  );
}

// ---------- active nav link ----------
(function highlightActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// ---------- terminal typing effect ----------
const typeTarget = document.querySelector('[data-type-lines]');
if (typeTarget) {
  const lines = JSON.parse(typeTarget.getAttribute('data-type-lines'));
  let li = 0, ci = 0;
  typeTarget.innerHTML = '';
  function typeStep() {
    if (li >= lines.length) return;
    const lineEl = document.createElement('div');
    typeTarget.appendChild(lineEl);
    const full = lines[li];
    function charStep() {
      lineEl.innerHTML = full.slice(0, ci) + '<span class="type-caret"></span>';
      ci++;
      if (ci <= full.length) {
        setTimeout(charStep, 18 + Math.random() * 22);
      } else {
        lineEl.innerHTML = full;
        li++; ci = 0;
        setTimeout(typeStep, 260);
      }
    }
    charStep();
  }
  typeStep();
}

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
}

// ---------- animate skill bars ----------
const bars = document.querySelectorAll('.bar > span[data-pct]');
if ('IntersectionObserver' in window && bars.length) {
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-pct') + '%';
        io2.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => { b.style.width = '0%'; b.style.transition = 'width 1s ease'; io2.observe(b); });
}

// ---------- contact form (static demo) ----------
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Отправлено ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 2400);
  });
}
