const templates = [
  { id: 'modern', name: 'Modern', icon: '✨', desc: 'Clean and contemporary design with smooth gradients', color: '#2563eb' },
  { id: 'minimal', name: 'Minimal', icon: '○', desc: 'Simple and elegant with plenty of whitespace', color: '#0f172a' },
  { id: 'corporate', name: 'Corporate', icon: '🏢', desc: 'Professional layout suitable for traditional industries', color: '#1e40af' },
  { id: 'creative', name: 'Creative', icon: '🎨', desc: 'Bold design for creative professionals', color: '#7c3aed' },
  { id: 'ats', name: 'ATS Optimized', icon: '✓', desc: 'Applicant Tracking System friendly format', color: '#059669' }
];

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar('templates');
  translatePage();
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = templates.map(t => `
    <div class="template-card fade-in" data-template="${t.id}" onclick="selectTemplate('${t.id}')">
      <div class="template-preview" style="background: linear-gradient(135deg, ${t.color}11, ${t.color}22); color: ${t.color}">
        ${t.icon}
      </div>
      <div class="template-info">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <div style="margin-top:12px;display:flex;gap:6px">
          <span class="badge badge-primary" style="background:${t.color}22;color:${t.color}">${t.id === 'ats' ? '🤖 Best for ATS' : 'Popular'}</span>
        </div>
      </div>
    </div>
  `).join('');

  const token = api.getToken();
  if (token) {
    document.getElementById('templateActions').innerHTML = `<a href="/editor.html" class="btn btn-primary btn-lg">Create Resume</a>`;
  }
});

function selectTemplate(id) {
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`[data-template="${id}"]`)?.classList.add('selected');
  showToast(`Selected: ${templates.find(t => t.id === id)?.name} template`, 'info');
}
