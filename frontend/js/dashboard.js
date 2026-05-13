document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar('dashboard');
  translatePage();
  const user = api.getUser();
  if (!user) {
    window.location.href = '/login.html';
    return;
  }
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userInitials').textContent = getInitials(user.name);

  await loadStats();
  await loadResumes();
});

async function loadStats() {
  try {
    const resumes = await api.getResumes();
    document.getElementById('totalResumes').textContent = resumes.length;
    document.getElementById('recentEdits').textContent = resumes.filter(r => {
      return new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }).length;
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
}

async function loadResumes() {
  try {
    const resumes = await api.getResumes();
    const grid = document.getElementById('resumeGrid');
    const empty = document.getElementById('emptyState');
    if (resumes.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = resumes.map(r => `
      <div class="resume-card fade-in" onclick="openResume('${r._id}')">
        <div class="preview">📄</div>
        <div class="info">
          <h3>${r.title || 'Untitled Resume'}</h3>
          <p>Updated ${formatDate(r.updatedAt)} · ${r.template} template</p>
        </div>
        <div class="actions">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openResume('${r._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteResume('${r._id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (e) {
    showToast('Failed to load resumes', 'error');
  }
}

function openResume(id) {
  window.location.href = `/editor.html?id=${id}`;
}

async function deleteResume(id) {
  if (!confirm('Delete this resume?')) return;
  try {
    await api.deleteResume(id);
    showToast('Resume deleted', 'success');
    await loadResumes();
    await loadStats();
  } catch (e) {
    showToast('Failed to delete resume', 'error');
  }
}

function createNewResume() {
  const modal = document.getElementById('newResumeModal');
  modal.classList.add('show');
}

async function openAIPanel(action) {
  const title = document.getElementById('resumeTitle').value || 'Untitled Resume';
  const template = document.getElementById('resumeTemplate').value;
  if (action === 'generateResume') {
    try {
      const resume = await api.createResume({ title, template });
      window.location.href = `/editor.html?id=${resume._id}&ai=1`;
    } catch (e) {
      showToast('Failed to create resume', 'error');
    }
  }
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
}

async function createResume() {
  const title = document.getElementById('resumeTitle').value.trim() || 'Untitled Resume';
  const template = document.getElementById('resumeTemplate').value;
  try {
    const resume = await api.createResume({ title, template });
    showToast('Resume created!', 'success');
    closeModal();
    window.location.href = `/editor.html?id=${resume._id}`;
  } catch (e) {
    showToast('Failed to create resume', 'error');
  }
}
