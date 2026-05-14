(function () {
  // ============================================================
  // 1. Cursor Glow Follower
  // ============================================================
  var cursorGlow = null;
  var cursorTimeout = null;

  function initCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('visible');
      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(function () {
        cursorGlow.classList.remove('visible');
      }, 2000);
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.classList.remove('visible');
    });
  }

  // ============================================================
  // 2. Button Ripple Effect
  // ============================================================
  function initRipple() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn:not(.btn-ghost):not(.btn-icon):not(.ai-quick-btn):not(.ai-send-btn)');
      if (!btn) return;
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;
      var ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.classList.add('btn-ripple');
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () {
        ripple.remove();
        btn.classList.remove('btn-ripple');
      });
    });
  }

  // ============================================================
  // 3. 3D Card Tilt
  // ============================================================
  function initCardTilt() {
    document.addEventListener('mousemove', function (e) {
      var cards = document.querySelectorAll('.card-tilt');
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var rect = card.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var deltaX = (e.clientX - centerX) / (rect.width / 2);
        var deltaY = (e.clientY - centerY) / (rect.height / 2);
        var rotateY = deltaX * 6;
        var rotateX = -deltaY * 6;
        var inner = card.querySelector('.card-tilt-inner');
        if (inner) {
          inner.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        }
      }
    });
    document.addEventListener('mouseleave', function () {
      var inners = document.querySelectorAll('.card-tilt-inner');
      for (var i = 0; i < inners.length; i++) {
        inners[i].style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    });
  }

  // ============================================================
  // 4. Page Entrance Animation
  // ============================================================
  function initPageEntrance() {
    var main = document.querySelector('.main-content, .landing, .auth-container');
    if (main) main.classList.add('page-enter');
    var items = document.querySelectorAll('.stat-card, .resume-card, .template-card, .feature-card');
    for (var i = 0; i < items.length; i++) {
      items[i].style.opacity = '0';
      items[i].style.animation = 'fadeIn 0.5s ease ' + (0.1 + i * 0.08) + 's forwards';
    }
  }

  // ============================================================
  // 5. Animated Counters
  // ============================================================
  function animateCounter(el, target, suffix) {
    if (!el) return;
    var duration = 800;
    var start = performance.now();
    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(start + (target - start) * eased);
      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  window.animateCounter = animateCounter;

  // ============================================================
  // 6. Loading Bar
  // ============================================================
  function initLoadingBar() {
    var bar = document.createElement('div');
    bar.className = 'loading-bar';
    bar.innerHTML = '<div class="loading-bar-fill" id="loadingBarFill"></div>';
    document.body.appendChild(bar);
  }

  window.startLoading = function () {
    var fill = document.getElementById('loadingBarFill');
    if (fill) { fill.style.width = '30%'; setTimeout(function () { fill.style.width = '70%'; }, 200); }
  };
  window.finishLoading = function () {
    var fill = document.getElementById('loadingBarFill');
    if (fill) { fill.style.width = '100%'; setTimeout(function () { fill.style.width = '0'; }, 400); }
  };

  // ============================================================
  // 7. Smooth Page Transitions
  // ============================================================
  function initPageTransitions() {
    var overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.id = 'pageTransitionOverlay';
    document.body.appendChild(overlay);

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]:not([href^="#"]):not([href*="javascript"]):not([target])');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('//')) return;
      e.preventDefault();
      var overlayEl = document.getElementById('pageTransitionOverlay');
      if (!overlayEl) { window.location.href = href; return; }
      overlayEl.classList.add('active');
      setTimeout(function () { window.location.href = href; }, 300);
    });
  }

  // ============================================================
  // 8. Parallax Hero on Scroll
  // ============================================================
  function initParallax() {
    var els = document.querySelectorAll('.hero-parallax');
    if (!els.length) return;
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      for (var i = 0; i < els.length; i++) {
        var speed = parseFloat(els[i].getAttribute('data-parallax-speed')) || 0.05;
        els[i].style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      }
    }, { passive: true });
  }

  // ============================================================
  // 9. Scroll to Top Button
  // ============================================================
  function initScrollTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.id = 'scrollTopBtn';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      btn.classList.toggle('visible', scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 10. Keyboard Shortcuts
  // ============================================================
  function initKeyboardShortcuts() {
    var overlay = document.createElement('div');
    overlay.className = 'shortcuts-overlay';
    overlay.id = 'shortcutsOverlay';
    overlay.innerHTML =
      '<div class="shortcuts-panel">' +
        '<h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01"/></svg> Keyboard Shortcuts</h3>' +
        '<div class="shortcuts-grid">' +
          '<div class="shortcut-row"><span class="shortcut-desc">Toggle dark mode</span><span class="shortcut-keys"><kbd>T</kbd></span></div>' +
          '<div class="shortcut-row"><span class="shortcut-desc">Toggle AI assistant</span><span class="shortcut-keys"><kbd>A</kbd></span></div>' +
          '<div class="shortcut-row"><span class="shortcut-desc">Save resume</span><span class="shortcut-keys"><kbd>Ctrl</kbd><kbd>S</kbd></span></div>' +
          '<div class="shortcut-row"><span class="shortcut-desc">Download PDF</span><span class="shortcut-keys"><kbd>Ctrl</kbd><kbd>P</kbd></span></div>' +
          '<div class="shortcut-row"><span class="shortcut-desc">New resume</span><span class="shortcut-keys"><kbd>N</kbd></span></div>' +
          '<div class="shortcut-row"><span class="shortcut-desc">Show shortcuts</span><span class="shortcut-keys"><kbd>?</kbd></span></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    document.addEventListener('keydown', function (e) {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        var target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        e.preventDefault();
        overlay.classList.toggle('active');
      }
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
      if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey) {
        var target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        if (typeof toggleTheme === 'function') toggleTheme();
      }
      if ((e.key === 'a' || e.key === 'A') && !e.ctrlKey && !e.metaKey) {
        var target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        if (typeof toggleAIPanel === 'function') toggleAIPanel();
      }
      if (e.key === 'n' || e.key === 'N') {
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
        var newBtn = document.querySelector('[onclick*="createNewResume"], [onclick*="createResume"]');
        if (newBtn) newBtn.click();
      }
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  // ============================================================
  // 11. Auto-Resize Textareas
  // ============================================================
  function initAutoResize() {
    document.addEventListener('input', function (e) {
      if (e.target.tagName === 'TEXTAREA' && e.target.classList.contains('auto-resize')) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      }
    });
  }

  // ============================================================
  // 12. Interactive Particles (Canvas)
  // ============================================================
  function initParticles() {
    try {
      var canvas = document.createElement('canvas');
      canvas.id = 'particleCanvas';
      document.body.appendChild(canvas);
      var ctx = canvas.getContext('2d');
      var particles = [];
      var mouseX = -1000, mouseY = -1000;
      var w, h;

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      for (var i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1,
          alpha: Math.random() * 0.3 + 0.1
        });
      }

      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animate() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          var dx = mouseX - p.x;
          var dy = mouseY - p.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var force = (120 - dist) / 120;
            p.x -= dx * force * 0.02;
            p.y -= dy * force * 0.02;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(79, 70, 229, ' + p.alpha + ')';
          ctx.fill();
        }
        requestAnimationFrame(animate);
      }
      animate();
    } catch (_) {}
  }

  // ============================================================
  // Init
  // ============================================================
  function init() {
    initCursorGlow();
    initRipple();
    initCardTilt();
    initPageEntrance();
    initLoadingBar();
    initPageTransitions();
    initParallax();
    initScrollTop();
    initKeyboardShortcuts();
    initAutoResize();
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
