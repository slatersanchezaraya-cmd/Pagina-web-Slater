/* ============================================================
   SLEYGROWTH — ENGINE v2.0 (shared script)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL PROGRESS
  const bar = document.getElementById('sg-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
    });
  }

  // ── CURSOR
  const cur = document.getElementById('sg-cur');
  const ring = document.getElementById('sg-ring');
  if (cur && ring) {
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    (function lerp() {
      rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(lerp);
    })();
    document.querySelectorAll('a,button,.sg-card,.sg-case-card,.sg-service-card,.sg-step').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='52px'; ring.style.height='52px'; ring.style.borderColor='#b97aff'; ring.style.opacity='0.6'; });
      el.addEventListener('mouseleave', () => { ring.style.width='34px'; ring.style.height='34px'; ring.style.borderColor='var(--v)'; ring.style.opacity='1'; });
    });
  }

  // ── 3D CARD TILT
  document.querySelectorAll('.sg-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      const cx = r.width/2, cy = r.height/2;
      card.style.transform = `perspective(900px) rotateX(${(y-cy)/18}deg) rotateY(${(cx-x)/18}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── REVEAL ON SCROLL
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

  // ── FAQ ACCORDION
  document.querySelectorAll('details.sg-faq-item').forEach(d => {
    d.addEventListener('toggle', () => {
      const icon = d.querySelector('.faq-plus');
      if (!icon) return;
      icon.textContent = d.open ? '×' : '+';
    });
    d.addEventListener('click', () => {
      document.querySelectorAll('details.sg-faq-item').forEach(other => {
        if (other !== d && other.open) other.removeAttribute('open');
      });
    });
  });

  // ── NAV ACTIVE LINK
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sg-nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // ── FORM SUBMIT (contacto)
  const form = document.getElementById('sg-contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Enviado — te contactamos pronto';
      btn.style.background = 'var(--green)';
      btn.style.color = 'black';
      btn.disabled = true;
    });
  }

  // ── NEWSLETTER
  const nlForm = document.querySelector('.sg-nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      nlForm.innerHTML = '<p style="font-family:var(--font-mono);font-size:0.75rem;color:var(--green);">✓ Suscrito correctamente.</p>';
    });
  }

});