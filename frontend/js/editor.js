let currentResume = null;
let resumeId = null;
let activeSection = 'personalInfo';

document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar('editor');
  translatePage();
  const params = new URLSearchParams(window.location.search);
  resumeId = params.get('id');
  if (!resumeId) {
    showToast('No resume selected', 'error');
    window.location.href = '/dashboard.html';
    return;
  }
  await loadResume();
  setupAutoSave();
  setupSectionTabs();
  document.getElementById('saveBtn').addEventListener('click', saveFullResume);
  document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
  if (params.get('ai') === '1') {
    setTimeout(() => openAIPanel('generateResume'), 300);
  }
});

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
}

function toggleEditorSidebar() {
  const sidebar = document.getElementById('editorSidebar');
  const btn = document.getElementById('editorToggleBtn');
  sidebar.classList.toggle('collapsed');
  btn.textContent = sidebar.classList.contains('collapsed') ? '🔽 Show' : '🔼 Hide';
}

async function loadResume() {
  try {
    currentResume = await api.getResume(resumeId);
    populateEditor();
    renderPreview();
  } catch (e) {
    showToast('Failed to load resume', 'error');
    window.location.href = '/dashboard.html';
  }
}

function populateEditor() {
  const r = currentResume;
  // Personal Info
  setVal('fullName', r.personalInfo.fullName);
  setVal('email', r.personalInfo.email);
  setVal('phone', r.personalInfo.phone);
  setVal('location', r.personalInfo.location);
  setVal('linkedin', r.personalInfo.linkedin);
  setVal('github', r.personalInfo.github);
  setVal('portfolio', r.personalInfo.portfolio);
  setVal('professionalTitle', r.personalInfo.title);
  setVal('summary', r.personalInfo.summary);
  document.getElementById('resumeTitle').value = r.title || 'Untitled Resume';
  document.getElementById('primaryColor').value = r.customization?.primaryColor || '#2563eb';

  // Education
  renderEducation();
  // Experience
  renderExperience();
  // Skills
  renderSkills();
  // Certifications
  renderCertifications();
  // Achievements
  renderAchievements();
  // Projects
  renderProjects();
  // Template select
  document.getElementById('templateSelect').value = r.template || 'modern';
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function collectSectionData() {
  const r = currentResume;
  if (!r) return {};
  return {
    personalInfo: {
      fullName: getVal('fullName'),
      email: getVal('email'),
      phone: getVal('phone'),
      location: getVal('location'),
      linkedin: getVal('linkedin'),
      github: getVal('github'),
      portfolio: getVal('portfolio'),
      title: getVal('professionalTitle'),
      summary: getVal('summary')
    },
    title: getVal('resumeTitle') || 'Untitled Resume',
    template: document.getElementById('templateSelect')?.value || 'modern',
    customization: {
      primaryColor: document.getElementById('primaryColor')?.value || '#2563eb'
    },
    education: collectArrayData('education'),
    experience: collectArrayData('experience'),
    skills: collectArrayData('skills'),
    certifications: collectArrayData('certifications'),
    achievements: collectArrayData('achievements'),
    projects: collectArrayData('projects')
  };
}

function collectArrayData(prefix) {
  const items = document.querySelectorAll(`[data-group="${prefix}"]`);
  return Array.from(items).map(item => {
    const inputs = item.querySelectorAll('[data-field]');
    const data = {};
    inputs.forEach(inp => {
      const field = inp.dataset.field;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (!data[parent]) data[parent] = {};
        data[parent][child] = inp.type === 'checkbox' ? inp.checked : inp.value;
      } else {
        data[field] = inp.type === 'checkbox' ? inp.checked : inp.value;
      }
    });
    if (data.technologies && typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (data.achievements && typeof data.achievements === 'string') {
      data.achievements = data.achievements.split('\n').map(a => a.trim()).filter(Boolean);
    }
    return data;
  });
}

function renderEducation() {
  const container = document.getElementById('educationList');
  const items = currentResume.education || [];
  container.innerHTML = items.map((item, i) => renderEducationItem(item, i)).join('');
}

function renderEducationItem(item, i) {
  return `<div class="entry-card" data-group="education">
    <div class="entry-header"><h4>${item.institution || 'Education ' + (i+1)}</h4><button class="remove-btn" onclick="removeItem(this)">✕</button></div>
    <div class="form-group"><label>Institution</label><input class="form-input" data-field="institution" value="${escapeHtml(item.institution || '')}"></div>
    <div class="form-group"><label>Degree</label><input class="form-input" data-field="degree" value="${escapeHtml(item.degree || '')}"></div>
    <div class="form-group"><label>Field of Study</label><input class="form-input" data-field="field" value="${escapeHtml(item.field || '')}"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label>Start</label><input class="form-input" data-field="startDate" value="${escapeHtml(item.startDate || '')}"></div>
      <div class="form-group"><label>End</label><input class="form-input" data-field="endDate" value="${escapeHtml(item.endDate || '')}"></div>
    </div>
    <div class="form-group"><label>GPA</label><input class="form-input" data-field="gpa" placeholder="e.g. 8.5/10" value="${escapeHtml(item.gpa || '')}"></div>
    <div class="form-group"><label>Description</label><textarea class="form-textarea" data-field="description">${escapeHtml(item.description || '')}</textarea></div>
  </div>`;
}

function renderExperience() {
  const container = document.getElementById('experienceList');
  const items = currentResume.experience || [];
  container.innerHTML = items.map((item, i) => renderExperienceItem(item, i)).join('');
}

function renderExperienceItem(item, i) {
  return `<div class="entry-card" data-group="experience">
    <div class="entry-header"><h4>${item.position || 'Experience ' + (i+1)}</h4><button class="remove-btn" onclick="removeItem(this)">✕</button></div>
    <div class="form-group"><label>Company</label><input class="form-input" data-field="company" value="${escapeHtml(item.company || '')}"></div>
    <div class="form-group"><label>Position</label><input class="form-input" data-field="position" value="${escapeHtml(item.position || '')}"></div>
    <div class="form-group"><label>Location</label><input class="form-input" data-field="location" value="${escapeHtml(item.location || '')}"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label>Start</label><input class="form-input" data-field="startDate" value="${escapeHtml(item.startDate || '')}"></div>
      <div class="form-group"><label>End</label><input class="form-input" data-field="endDate" value="${escapeHtml(item.endDate || '')}"></div>
    </div>
    <div class="form-group" style="display:flex;align-items:center;gap:8px">
      <label><input type="checkbox" data-field="current" ${item.current ? 'checked' : ''}> Currently working here</label>
    </div>
    <div class="form-group"><label>Description</label><textarea class="form-textarea" data-field="description">${escapeHtml(item.description || '')}</textarea></div>
    <div class="form-group"><label>Achievements (one per line)</label><textarea class="form-textarea" data-field="achievements" rows="3" placeholder="Led a team of 5 engineers...">${escapeHtml((item.achievements || []).join('\n'))}</textarea></div>
  </div>`;
}

function renderSkills() {
  const container = document.getElementById('skillsList');
  const items = currentResume.skills || [];
  container.innerHTML = items.map((item, i) => renderSkillItem(item, i)).join('');
}

function renderSkillItem(item, i) {
  return `<div class="entry-card" data-group="skills" style="display:flex;gap:12px;align-items:end;padding:12px">
    <div class="form-group" style="flex:1;margin:0"><label>Skill</label><input class="form-input" data-field="name" value="${escapeHtml(item.name || '')}"></div>
    <div class="form-group" style="width:140px;margin:0"><label>Level</label><select class="form-select" data-field="level">
      <option value="beginner" ${item.level === 'beginner' ? 'selected' : ''}>Beginner</option>
      <option value="intermediate" ${item.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
      <option value="advanced" ${item.level === 'advanced' ? 'selected' : ''}>Advanced</option>
      <option value="expert" ${item.level === 'expert' ? 'selected' : ''}>Expert</option>
    </select></div>
    <button class="remove-btn" onclick="removeItem(this)" style="margin-bottom:2px">✕</button>
  </div>`;
}

function renderCertifications() {
  const container = document.getElementById('certificationsList');
  const items = currentResume.certifications || [];
  container.innerHTML = items.map((item, i) => renderCertificationItem(item, i)).join('');
}

function renderCertificationItem(item, i) {
  return `<div class="entry-card" data-group="certifications">
    <div class="entry-header"><h4>${item.name || 'Certification ' + (i+1)}</h4><button class="remove-btn" onclick="removeItem(this)">✕</button></div>
    <div class="form-group"><label>Name</label><input class="form-input" data-field="name" value="${escapeHtml(item.name || '')}"></div>
    <div class="form-group"><label>Issuer</label><input class="form-input" data-field="issuer" value="${escapeHtml(item.issuer || '')}"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label>Date</label><input class="form-input" data-field="date" value="${escapeHtml(item.date || '')}"></div>
      <div class="form-group"><label>URL</label><input class="form-input" data-field="url" value="${escapeHtml(item.url || '')}"></div>
    </div>
  </div>`;
}

function renderAchievements() {
  const container = document.getElementById('achievementsList');
  const items = currentResume.achievements || [];
  container.innerHTML = items.map((item, i) => renderAchievementItem(item, i)).join('');
}

function renderAchievementItem(item, i) {
  return `<div class="entry-card" data-group="achievements">
    <div class="entry-header"><h4>${item.title || 'Achievement ' + (i+1)}</h4><button class="remove-btn" onclick="removeItem(this)">✕</button></div>
    <div class="form-group"><label>Title</label><input class="form-input" data-field="title" value="${escapeHtml(item.title || '')}"></div>
    <div class="form-group"><label>Description</label><textarea class="form-textarea" data-field="description">${escapeHtml(item.description || '')}</textarea></div>
  </div>`;
}

function renderProjects() {
  const container = document.getElementById('projectsList');
  const items = currentResume.projects || [];
  container.innerHTML = items.map((item, i) => renderProjectItem(item, i)).join('');
}

function renderProjectItem(item, i) {
  return `<div class="entry-card" data-group="projects">
    <div class="entry-header"><h4>${item.title || 'Project ' + (i+1)}</h4><button class="remove-btn" onclick="removeItem(this)">✕</button></div>
    <div class="form-group"><label>Title</label><input class="form-input" data-field="title" value="${escapeHtml(item.title || '')}"></div>
    <div class="form-group"><label>Description</label><textarea class="form-textarea" data-field="description">${escapeHtml(item.description || '')}</textarea></div>
    <div class="form-group"><label>Technologies (comma separated)</label><input class="form-input" data-field="technologies" value="${escapeHtml((item.technologies || []).join(', '))}"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label>Start</label><input class="form-input" data-field="startDate" value="${escapeHtml(item.startDate || '')}"></div>
      <div class="form-group"><label>End</label><input class="form-input" data-field="endDate" value="${escapeHtml(item.endDate || '')}"></div>
    </div>
    <div class="form-group"><label>URL</label><input class="form-input" data-field="url" placeholder="https://..." value="${escapeHtml(item.url || '')}"></div>
  </div>`;
}

function addItem(group) {
  const container = document.getElementById(group + 'List');
  const template = {
    education: { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' },
    experience: { company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', achievements: [] },
    skills: { name: '', level: 'intermediate' },
    certifications: { name: '', issuer: '', date: '', url: '' },
    achievements: { title: '', description: '' },
    projects: { title: '', description: '', technologies: [], url: '', startDate: '', endDate: '' }
  };
  if (!currentResume[group]) currentResume[group] = [];
  currentResume[group].push(template[group]);
  const renderers = { education: renderEducation, experience: renderExperience, skills: renderSkills, certifications: renderCertifications, achievements: renderAchievements, projects: renderProjects };
  renderers[group]();
  triggerSave();
}

function removeItem(btn) {
  const card = btn.closest('.entry-card');
  if (!card) return;
  const group = card.dataset.group;
  const container = card.parentElement;
  const idx = Array.from(container.children).indexOf(card);
  if (idx > -1 && currentResume[group]) {
    currentResume[group].splice(idx, 1);
  }
  card.remove();
  triggerSave();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// --- Smart Refresh ---
function setupAutoSave() {
  const debouncedSave = debounce(triggerSave, 500);
  document.querySelectorAll('.editor-sidebar input, .editor-sidebar textarea, .editor-sidebar select').forEach(el => {
    el.addEventListener('input', debouncedSave);
    el.addEventListener('change', debouncedSave);
  });
}

function triggerSave() {
  const data = collectSectionData();
  if (!currentResume || !resumeId) return;
  currentResume.personalInfo = data.personalInfo;
  currentResume.title = data.title;
  currentResume.template = data.template;
  currentResume.education = data.education;
  currentResume.experience = data.experience;
  currentResume.skills = data.skills;
  currentResume.certifications = data.certifications;
  currentResume.achievements = data.achievements;
  currentResume.projects = data.projects;
  currentResume.customization = { ...currentResume.customization, ...data.customization };
  renderPreview();
  updateLocalPreview();
  debouncedServerSave();
}

async function saveToServer() {
  if (!currentResume || !resumeId) return;
  const data = { ...currentResume };
  delete data._id;
  delete data.userId;
  delete data.createdAt;
  delete data.updatedAt;
  try {
    await api.updateResume(resumeId, data);
  } catch (e) {
    console.error('Save failed:', e);
  }
}

const debouncedServerSave = debounce(saveToServer, 1000);

const saveFullResume = debounce(async () => {
  triggerSave();
  await saveToServer();
  showToast('Resume saved!', 'success');
}, 300);

// --- Live Preview ---
function renderPreview() {
  const r = currentResume;
  if (!r) return;
  const preview = document.getElementById('resumePreview');
  if (!preview) return;

  const info = r.personalInfo || {};
  const primaryColor = r.customization?.primaryColor || '#2563eb';

  preview.innerHTML = `
    <div class="rp-header" style="border-bottom-color:${primaryColor}">
      <div class="rp-name">${escapeHtml(info.fullName || 'Your Name')}</div>
      <div class="rp-title">${escapeHtml(info.title || 'Professional Title')}</div>
      <div class="rp-contact">
        ${info.email ? `<span>✉ ${escapeHtml(info.email)}</span>` : ''}
        ${info.phone ? `<span>📞 ${escapeHtml(info.phone)}</span>` : ''}
        ${info.location ? `<span>📍 ${escapeHtml(info.location)}</span>` : ''}
        ${info.linkedin ? `<span>🔗 ${escapeHtml(info.linkedin)}</span>` : ''}
        ${info.github ? `<span>🐙 ${escapeHtml(info.github)}</span>` : ''}
      </div>
    </div>
    ${info.summary ? `<div class="rp-section"><div class="rp-section-title" style="color:${primaryColor};border-bottom-color:${primaryColor}">Professional Summary</div><p style="font-size:13px;color:#475569;line-height:1.6">${escapeHtml(info.summary)}</p></div>` : ''}
    ${renderPreviewSection('Experience', 'experience', '💼', r.experience, (item) => `
      <div class="rp-item">
        <div class="rp-item-header">
          <div><div class="rp-item-title">${escapeHtml(item.position || '')}</div><div class="rp-item-sub">${escapeHtml(item.company || '')}</div></div>
          <div class="rp-item-date">${formatDateShort(item.startDate)} - ${item.current ? 'Present' : formatDateShort(item.endDate)}</div>
        </div>
        <div class="rp-item-desc">${escapeHtml(item.description || '')}</div>
      </div>
    `, primaryColor)}
    ${renderPreviewSection('Education', 'education', '🎓', r.education, (item) => `
      <div class="rp-item">
        <div class="rp-item-header">
          <div><div class="rp-item-title">${escapeHtml(item.degree || '')} in ${escapeHtml(item.field || '')}</div><div class="rp-item-sub">${escapeHtml(item.institution || '')}</div></div>
          <div class="rp-item-date">${formatDateShort(item.startDate)} - ${formatDateShort(item.endDate)}</div>
        </div>
        ${item.description ? `<div class="rp-item-desc">${escapeHtml(item.description)}</div>` : ''}
      </div>
    `, primaryColor)}
    ${r.skills && r.skills.length ? `<div class="rp-section"><div class="rp-section-title" style="color:${primaryColor};border-bottom-color:${primaryColor}">Skills</div><div class="rp-skills">${r.skills.filter(s => s.name).map(s => `<span class="rp-skill">${escapeHtml(s.name)}</span>`).join('')}</div></div>` : ''}
    ${renderPreviewSection('Certifications', 'certifications', '📜', r.certifications, (item) => `
      <div class="rp-item">
        <div class="rp-item-header">
          <div><div class="rp-item-title">${escapeHtml(item.name || '')}</div><div class="rp-item-sub">${escapeHtml(item.issuer || '')}</div></div>
          <div class="rp-item-date">${item.date || ''}</div>
        </div>
      </div>
    `, primaryColor)}
    ${renderPreviewSection('Achievements', 'achievements', '🏆', r.achievements, (item) => `
      <div class="rp-item">
        <div class="rp-item-header">
          <div class="rp-item-title">${escapeHtml(item.title || '')}</div>
        </div>
        <div class="rp-item-desc">${escapeHtml(item.description || '')}</div>
      </div>
    `, primaryColor)}
    ${renderPreviewSection('Projects', 'projects', '🚀', r.projects, (item) => `
      <div class="rp-item">
        <div class="rp-item-header">
          <div class="rp-item-title">${escapeHtml(item.title || '')}</div>
        </div>
        <div class="rp-item-desc">${escapeHtml(item.description || '')}</div>
        ${item.technologies && item.technologies.length ? `<div class="rp-skills" style="margin-top:6px">${item.technologies.filter(Boolean).map(t => `<span class="rp-skill">${escapeHtml(t.trim())}</span>`).join('')}</div>` : ''}
      </div>
    `, primaryColor)}
  `;
}

function renderPreviewSection(title, key, icon, items, renderFn, primaryColor) {
  if (!items || !items.length) return '';
  return `<div class="rp-section">
    <div class="rp-section-title" style="color:${primaryColor};border-bottom-color:${primaryColor}">${icon} ${title}</div>
    ${items.filter(i => i && (i.name || i.title || i.company || i.institution || i.degree)).map(item => renderFn(item)).join('')}
  </div>`;
}

function updateLocalPreview() {
  const indicator = document.getElementById('saveIndicator');
  if (indicator) {
    indicator.textContent = 'Changes saved';
    indicator.style.color = 'var(--success)';
    setTimeout(() => { indicator.textContent = ''; }, 2000);
  }
}

function setupSectionTabs() {
  const tabs = document.querySelectorAll('.section-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(tab.dataset.section);
      if (target) target.classList.add('active');
    });
  });
}

// --- PDF Export ---
async function downloadPDF() {
  triggerSave();
  const preview = document.getElementById('resumePreview');
  if (!preview) return;
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Resume</title><style>
    body { font-family: 'Inter', Arial, sans-serif; padding: 48px 56px; color: #1e293b; font-size: 14px; line-height: 1.6; }
    ${Array.from(document.styleSheets).map(s => {
      try { return Array.from(s.cssRules || []).map(r => r.cssText).join(''); }
      catch(e) { return ''; }
    }).join('')}
    @page { margin: 20mm; }
    .no-print, .editor-sidebar, .navbar { display: none !important; }
  </style></head><body>${preview.innerHTML}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}

// --- AI Features ---
function openAIPanel(action) {
  const modal = document.getElementById('aiModal');
  modal.classList.add('show');
  document.getElementById('aiModalTitle').textContent = {
    summary: 'Generate Professional Summary',
    improve: 'Improve Content',
    skills: 'Generate Skills',
    coverLetter: 'Generate Cover Letter',
    tailor: 'Tailor to Job Description',
    rewrite: 'Rewrite Content',
    bulletPoints: 'Generate Bullet Points'
  }[action] || 'AI Assistant';

  let html = '';
  if (action === 'summary') {
    html = `
      <div class="form-group"><label>Job Role</label><input class="form-input" id="aiJobRole" placeholder="e.g. Software Engineer"></div>
      <div class="form-group"><label>Experience</label><input class="form-input" id="aiExperience" placeholder="e.g. 5 years"></div>
      <div class="form-group"><label>Skills</label><input class="form-input" id="aiSkills" placeholder="e.g. JavaScript, React, Node.js"></div>
      <div class="form-group"><label>Education</label><input class="form-input" id="aiEducation" placeholder="e.g. B.S. Computer Science"></div>
      <button class="btn btn-primary btn-block" onclick="runAI('summary')">Generate Summary</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'improve') {
    html = `
      <div class="form-group"><label>Content to Improve</label><textarea class="form-textarea" id="aiContent" rows="4" placeholder="Paste job description or achievement..."></textarea></div>
      <div class="form-group"><label>Context</label><input class="form-input" id="aiContext" placeholder="e.g. work experience, achievement"></div>
      <button class="btn btn-primary btn-block" onclick="runAI('improve')">Improve Content</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'skills') {
    html = `
      <div class="form-group"><label>Job Role</label><input class="form-input" id="aiJobRole" placeholder="e.g. Data Scientist"></div>
      <div class="form-group"><label>Experience Level</label><input class="form-input" id="aiExperience" placeholder="e.g. Senior"></div>
      <button class="btn btn-primary btn-block" onclick="runAI('skills')">Generate Skills</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'coverLetter') {
    html = `
      <div class="form-group"><label>Job Role</label><input class="form-input" id="aiJobRole" placeholder="e.g. Software Engineer"></div>
      <div class="form-group"><label>Company</label><input class="form-input" id="aiCompany" placeholder="e.g. Google"></div>
      <div class="form-group"><label>Skills</label><input class="form-input" id="aiSkills" placeholder="e.g. JavaScript, React, Node.js"></div>
      <button class="btn btn-primary btn-block" onclick="runAI('coverLetter')">Generate Cover Letter</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'generateResume') {
    html = `
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Describe your background, skills, experience, and what kind of resume you want. The AI will generate a complete resume.</p>
      <div class="form-group"><label>Describe Your Profile</label><textarea class="form-textarea" id="aiPrompt" rows="6" placeholder="e.g. I am a senior software engineer with 5 years of experience at Google, specializing in React, Node.js, and AWS. I have a B.S. in Computer Science from MIT. I led a team of 4 engineers and built a microservices platform serving 1M+ users..."></textarea></div>
      <button class="btn btn-primary btn-block" onclick="runAI('generateResume')">🚀 Generate Full Resume</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'tailor') {
    html = `
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Paste a job description below. The AI will rewrite your resume experience and skills to match the job requirements.</p>
      <div class="form-group"><label>Job Description</label><textarea class="form-textarea" id="aiJobDesc" rows="8" placeholder="Paste the full job description here..."></textarea></div>
      <button class="btn btn-primary btn-block" onclick="runAI('tailor')">🎯 Tailor Resume</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'rewrite') {
    html = `
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Rewrite text in a different tone. Great for improving descriptions and summaries.</p>
      <div class="form-group"><label>Content to Rewrite</label><textarea class="form-textarea" id="aiRewriteContent" rows="4" placeholder="Paste the text you want to rewrite..."></textarea></div>
      <div class="form-group"><label>Tone</label><select class="form-select" id="aiTone">
        <option value="professional">Professional</option>
        <option value="concise">Concise</option>
        <option value="achievement">Achievement-Focused</option>
        <option value="ats">ATS-Optimized</option>
      </select></div>
      <button class="btn btn-primary btn-block" onclick="runAI('rewrite')">✍️ Rewrite</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  } else if (action === 'bulletPoints') {
    html = `
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Convert a paragraph description into strong achievement bullet points.</p>
      <div class="form-group"><label>Description</label><textarea class="form-textarea" id="aiBulletDesc" rows="4" placeholder="Paste a job description or achievement paragraph..."></textarea></div>
      <div class="form-group"><label>Role (optional)</label><input class="form-input" id="aiBulletRole" placeholder="e.g. Software Engineer"></div>
      <button class="btn btn-primary btn-block" onclick="runAI('bulletPoints')">🔫 Generate Bullet Points</button>
      <div id="aiResult" style="margin-top:16px"></div>`;
  }
  document.getElementById('aiModalBody').innerHTML = html;
}

async function runAI(action) {
  const resultEl = document.getElementById('aiResult');
  resultEl.innerHTML = '<div class="loading-spinner"></div>';
  try {
    if (action === 'summary') {
      const data = await api.generateSummary({
        jobRole: document.getElementById('aiJobRole')?.value || '',
        experience: document.getElementById('aiExperience')?.value || '',
        skills: document.getElementById('aiSkills')?.value || '',
        education: document.getElementById('aiEducation')?.value || ''
      });
      resultEl.innerHTML = `<div class="ai-panel"><h4>✨ Generated Summary</h4><p>${data.summary}</p><button class="btn btn-primary btn-sm" onclick="applyAIResult('summary', '${escapeHtml(data.summary)}')">Apply to Resume</button></div>`;
    } else if (action === 'improve') {
      const data = await api.improveContent({
        content: document.getElementById('aiContent')?.value || '',
        context: document.getElementById('aiContext')?.value || ''
      });
      resultEl.innerHTML = `<div class="ai-panel"><h4>✨ Improved Content</h4><p>${data.improved}</p><button class="btn btn-primary btn-sm" onclick="applyAIResult('improve', '${escapeHtml(data.improved)}')">Apply</button></div>`;
    } else if (action === 'skills') {
      const data = await api.generateSkills({
        jobRole: document.getElementById('aiJobRole')?.value || '',
        experience: document.getElementById('aiExperience')?.value || ''
      });
      if (data.skills && data.skills.length) {
        currentResume.skills = data.skills;
        renderSkills();
        triggerSave();
        resultEl.innerHTML = `<div class="ai-panel"><h4>✅ Skills Generated & Applied</h4><p>${data.skills.map(s => s.name).join(', ')}</p></div>`;
      }
    } else if (action === 'coverLetter') {
      const data = await api.generateCoverLetter({
        jobRole: document.getElementById('aiJobRole')?.value || '',
        company: document.getElementById('aiCompany')?.value || '',
        skills: document.getElementById('aiSkills')?.value || ''
      });
      resultEl.innerHTML = `<div class="ai-panel"><h4>✨ Cover Letter</h4><p style="white-space:pre-line">${data.coverLetter}</p><button class="btn btn-primary btn-sm" onclick="navigator.clipboard.writeText('${escapeHtml(data.coverLetter)}'); showToast('Copied!','success')">Copy to Clipboard</button></div>`;
    } else if (action === 'generateResume') {
      const prompt = document.getElementById('aiPrompt')?.value;
      if (!prompt || !prompt.trim()) {
        resultEl.innerHTML = '<div class="alert alert-error show">Please describe your background first.</div>';
        return;
      }
      const data = await api.generateResume({ prompt });
      if (data.resume) {
        Object.assign(currentResume, data.resume);
        populateEditor();
        renderPreview();
        triggerSave();
        closeModal();
        showToast('Resume generated by AI!', 'success');
      }
    } else if (action === 'tailor') {
      const jobDesc = document.getElementById('aiJobDesc')?.value;
      if (!jobDesc || !jobDesc.trim()) {
        resultEl.innerHTML = '<div class="alert alert-error show">Please paste a job description first.</div>';
        return;
      }
      const data = collectSectionData();
      data._id = resumeId;
      const result = await api.tailorToJob({ resume: data, jobDescription: jobDesc });
      if (result.resume) {
        Object.assign(currentResume, result.resume);
        populateEditor();
        renderPreview();
        triggerSave();
        closeModal();
        showToast('Resume tailored to job!', 'success');
      }
    } else if (action === 'rewrite') {
      const content = document.getElementById('aiRewriteContent')?.value;
      const tone = document.getElementById('aiTone')?.value || 'professional';
      if (!content || !content.trim()) {
        resultEl.innerHTML = '<div class="alert alert-error show">Paste content to rewrite first.</div>';
        return;
      }
      const data = await api.rewriteContent({ content, tone });
      resultEl.innerHTML = `<div class="ai-panel"><h4>✨ Rewritten (${tone})</h4><p>${data.rewritten}</p><button class="btn btn-primary btn-sm" onclick="applyAIResult('rewrite', '${escapeHtml(data.rewritten)}')">Apply</button></div>`;
    } else if (action === 'bulletPoints') {
      const description = document.getElementById('aiBulletDesc')?.value;
      const role = document.getElementById('aiBulletRole')?.value || '';
      if (!description || !description.trim()) {
        resultEl.innerHTML = '<div class="alert alert-error show">Paste a description first.</div>';
        return;
      }
      const data = await api.generateBulletPoints({ description, role });
      if (data.bullets && data.bullets.length) {
        resultEl.innerHTML = `<div class="ai-panel"><h4>🎯 Bullet Points</h4><ul style="margin:8px 0;padding-left:20px">${data.bullets.map(b => `<li style="font-size:13px;margin-bottom:6px">${escapeHtml(b)}</li>`).join('')}</ul><button class="btn btn-primary btn-sm" onclick="applyBulletPoints('${escapeHtml(JSON.stringify(data.bullets))}')">Apply to Current Description</button></div>`;
      }
    }
  } catch (e) {
    resultEl.innerHTML = `<div class="alert alert-error show">Failed: ${e.message}</div>`;
  }
}

function applyAIResult(type, content) {
  if (type === 'summary') {
    document.getElementById('summary').value = content;
    triggerSave();
  } else if (type === 'improve') {
    const descField = document.querySelector('.section-content.active textarea[data-field="description"]');
    if (descField) { descField.value = content; triggerSave(); }
  } else if (type === 'rewrite') {
    const descField = document.querySelector('.section-content.active textarea[data-field="description"], .section-content.active textarea[id="summary"]');
    if (descField) { descField.value = content; triggerSave(); }
  }
  closeModal();
  showToast('Applied!', 'success');
}

function applyBulletPoints(bulletsJson) {
  try {
    const bullets = JSON.parse(bulletsJson);
    if (Array.isArray(bullets)) {
      const descField = document.querySelector('.section-content.active textarea[data-field="description"]');
      if (descField) {
        descField.value = bullets.map(b => '• ' + b).join('\n');
        triggerSave();
        closeModal();
        showToast('Bullet points applied!', 'success');
      }
    }
  } catch {}
}

// --- Mobile Editor Toggle ---
function toggleEditorSidebar() {
  const sidebar = document.getElementById('editorSidebar');
  const btn = document.getElementById('editorToggleBtn');
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    btn.textContent = '🔽 Show';
  } else {
    btn.textContent = '🔼 Hide';
  }
}

// --- Resume Quality Suggestions ---
async function getSuggestions() {
  const modal = document.getElementById('aiModal');
  modal.classList.add('show');
  document.getElementById('aiModalTitle').textContent = 'Resume Quality Suggestions';
  document.getElementById('aiModalBody').innerHTML = '<div class="loading-spinner"></div>';
  try {
    const data = collectSectionData();
    data._id = resumeId;
    const result = await api.analyzeResume(data);
    const suggestions = result.suggestions || [];
    if (suggestions.length === 0) {
      document.getElementById('aiModalBody').innerHTML = '<div class="ai-panel"><h4>Great job!</h4><p>Your resume looks solid. No suggestions found.</p></div>';
      return;
    }
    const icons = { warning: '⚠️', info: 'ℹ️', tip: '💡' };
    const colors = { warning: 'var(--warning)', info: 'var(--primary)', tip: 'var(--success)' };

    // Calculate ATS Score
    let score = 100;
    suggestions.forEach(s => {
      if (s.type === 'warning') score -= 10;
      if (s.type === 'info') score -= 5;
      if (s.type === 'tip') score -= 3;
    });
    score = Math.max(0, Math.min(100, score));
    const scoreColor = score >= 80 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : '#ef4444';

    let html = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:36px;font-weight:800;color:${scoreColor}">${score}/100</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">ATS Resume Score</div>
        <div style="width:100%;height:8px;background:#e2e8f0;border-radius:4px;margin-top:8px;overflow:hidden">
          <div style="width:${score}%;height:100%;background:${scoreColor};border-radius:4px;transition:width 0.5s"></div>
        </div>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">${suggestions.length > 0 ? `Found ${suggestions.length} suggestion${suggestions.length > 1 ? 's' : ''} to improve your resume:` : 'No issues found!'}</p>`;
    suggestions.forEach((s, i) => {
      const icon = icons[s.type] || 'ℹ️';
      const color = colors[s.type] || 'var(--text-secondary)';
      html += `<div class="ai-panel" style="border-left:3px solid ${color};padding:12px 16px;margin-bottom:10px">
        <div style="display:flex;align-items:flex-start;gap:8px">
          <span style="font-size:16px;line-height:1.4">${icon}</span>
          <div>
            <strong style="font-size:13px;color:${color}">${s.section || 'General'}</strong>
            <p style="font-size:13px;margin-top:2px">${s.message}</p>
          </div>
        </div>
      </div>`;
    });
    document.getElementById('aiModalBody').innerHTML = html;
  } catch (e) {
    document.getElementById('aiModalBody').innerHTML = `<div class="alert alert-error show">Failed: ${e.message}</div>`;
  }
}
