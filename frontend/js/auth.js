// Auth Guard - check if user is logged in
(function checkAuth() {
  const token = localStorage.getItem('token');
  const publicPages = ['/index.html', '/login.html', '/register.html', '/forgot-password.html', '/'];
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const isPublic = publicPages.some(p => p === currentPath || currentPath.endsWith(p));
  if (!token && !isPublic) {
    window.location.href = '/login.html';
  }
  if (token && currentPath.includes('login.html')) {
    window.location.href = '/dashboard.html';
  }
})();

// Theme management
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcons(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcons(next);
}

function updateThemeIcons(theme) {
  const sun = document.querySelector('.theme-toggle .sun-icon');
  const moon = document.querySelector('.theme-toggle .moon-icon');
  if (sun && moon) {
    sun.style.display = theme === 'dark' ? 'none' : 'block';
    moon.style.display = theme === 'dark' ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', initTheme);

// Navbar loader
function loadNavbar(activePage) {
  const token = api.getToken();
  const user = api.getUser();
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isLoggedIn = !!token;
  const navLinks = isLoggedIn ? `
    <a href="/dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a>
    <a href="/editor.html" class="${activePage === 'editor' ? 'active' : ''}">Editor</a>
    <a href="/templates.html" class="${activePage === 'templates' ? 'active' : ''}">Templates</a>
  ` : `
    <a href="/index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
    <a href="/templates.html" class="${activePage === 'templates' ? 'active' : ''}">Templates</a>
  `;

  navbar.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px">
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">☰</button>
      <a href="/${isLoggedIn ? 'dashboard.html' : 'index.html'}" class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M12 18v-4"/><path d="M8 18v-2"/><path d="M16 18v-3"/></svg>
        <span>ResumeAI</span>
      </a>
    </div>
    <div class="nav-links" id="navLinks">
      ${navLinks}
      <button class="lang-toggle btn-ghost btn-sm" onclick="toggleLanguage()" style="display:flex;align-items:center;gap:4px;padding:6px 10px;border:none;background:var(--primary-light);border-radius:var(--radius-sm);cursor:pointer;color:var(--primary);font-size:12px;font-weight:600">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>${currentLang === 'en' ? 'हिन्दी' : 'English'}</span>
      </button>
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">
        <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      ${isLoggedIn ? `<a href="/profile.html" class="btn btn-ghost btn-sm">${user?.name || 'Profile'}</a><button class="btn btn-ghost btn-sm" onclick="logout()">Logout</button>` : `<a href="/login.html" class="btn btn-primary btn-sm">Sign In</a>`}
    </div>
  `;
  initTheme();
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) backdrop.classList.toggle('show');
    return;
  }
  const nav = document.getElementById('navLinks');
  if (nav) {
    const isOpen = nav.classList.toggle('open');
    const btn = document.querySelector('.mobile-menu-btn');
    if (btn) btn.textContent = isOpen ? '✕' : '☰';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('show');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.mobile-menu-btn');
  if (nav && nav.classList.contains('open') && btn && !btn.contains(e.target) && !nav.contains(e.target)) {
    nav.classList.remove('open');
  }
});

function logout() {
  api.removeToken();
  api.removeUser();
  window.location.href = '/index.html';
}
