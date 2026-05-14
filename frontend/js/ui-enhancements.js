(function () {
  // 1. Cursor Glow Follower
  let cursorGlow = null;
  let cursorTimeout = null;

  function initCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('visible');
      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(() => {
        cursorGlow.classList.remove('visible');
      }, 2000);
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('visible');
    });
  }

  // 2. Button Ripple Effect
  function initRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn:not(.btn-ghost):not(.btn-icon):not(.ai-quick-btn):not(.ai-send-btn)');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.classList.add('btn-ripple');
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
        btn.classList.remove('btn-ripple');
      });
    });
  }

  // 3. 3D Card Tilt
  function initCardTilt() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.card-tilt');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        const rotateY = deltaX * 6;
        const rotateX = -deltaY * 6;
        card.style.setProperty('--rotate-x', rotateX + 'deg');
        card.style.setProperty('--rotate-y', rotateY + 'deg');
        const inner = card.querySelector('.card-tilt-inner');
        if (inner) {
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });
    });

    document.addEventListener('mouseleave', () => {
      document.querySelectorAll('.card-tilt-inner').forEach(el => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  // 4. Page Entrance Animation
  function initPageEntrance() {
    const main = document.querySelector('.main-content, .landing, .auth-container');
    if (main) {
      main.classList.add('page-enter');
    }
    document.querySelectorAll('.stat-card, .resume-card, .template-card, .feature-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animation = `fadeIn 0.5s ease ${0.1 + i * 0.08}s forwards`;
    });
  }

  // 5. Animated Counters
  function animateCounter(el, target, suffix) {
    if (!el) return;
    const duration = 800;
    const start = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = current + (suffix || '');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  window.animateCounter = animateCounter;

  // 6. Loading Bar
  function initLoadingBar() {
    const bar = document.createElement('div');
    bar.className = 'loading-bar';
    bar.innerHTML = '<div class="loading-bar-fill" id="loadingBarFill"></div>';
    document.body.appendChild(bar);
  }

  window.startLoading = function () {
    const fill = document.getElementById('loadingBarFill');
    if (fill) {
      fill.style.width = '30%';
      setTimeout(() => { fill.style.width = '70%'; }, 200);
    }
  };

  window.finishLoading = function () {
    const fill = document.getElementById('loadingBarFill');
    if (fill) {
      fill.style.width = '100%';
      setTimeout(() => { fill.style.width = '0'; }, 400);
    }
  };

  // Init on DOM ready
  function init() {
    initCursorGlow();
    initRipple();
    initCardTilt();
    initPageEntrance();
    initLoadingBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
