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
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span>ResumeAI</span>
      </a>
    </div>
    <div class="nav-links" id="navLinks">
      ${navLinks}
      <button class="theme-toggle" onclick="toggleTheme()">🌙</button>
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
