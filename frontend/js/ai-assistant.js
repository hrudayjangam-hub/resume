function initAIAssistant() {
  if (document.getElementById('aiAssistantRoot')) return;

  const root = document.createElement('div');
  root.id = 'aiAssistantRoot';
  root.innerHTML = `
    <button class="ai-fab" id="aiFab" aria-label="AI Assistant">
      <span class="pulse-ring"></span>
      <span class="ai-status-dot"></span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3l1.91 5.44 5.72.44-4.35 3.71 1.33 5.56L12 15.77l-4.61 2.38 1.33-5.56-4.35-3.71 5.72-.44L12 3z"/>
      </svg>
    </button>
    <div class="ai-panel-container" id="aiPanel">
      <div class="ai-panel-header">
        <h3>
          <span class="ai-dot"></span>
          AI Assistant
        </h3>
        <button class="ai-close-btn" id="aiCloseBtn">✕</button>
      </div>
      <div class="ai-quick-actions" id="aiQuickActions">
        <button class="ai-quick-btn" data-ai-action="help">💡 Help</button>
        <button class="ai-quick-btn" data-ai-action="write-summary">✍️ Write Summary</button>
        <button class="ai-quick-btn" data-ai-action="improve-skills">💪 Improve Skills</button>
        <button class="ai-quick-btn" data-ai-action="ats-tips">🎯 ATS Tips</button>
      </div>
      <div class="ai-panel-body" id="aiPanelBody">
        <div class="ai-message ai">
          <div class="ai-msg-avatar">AI</div>
          <div class="ai-msg-content">
            Hello! I'm your AI assistant. I can help you craft the perfect resume.<br><br>
            Try asking me to write a summary, improve your skills section, or give you ATS optimization tips!
          </div>
        </div>
      </div>
      <div class="ai-panel-footer">
        <input type="text" id="aiInput" placeholder="Ask me anything...">
        <button class="ai-send-btn" id="aiSendBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  bindAIEvents();
}

let aiPanelOpen = false;

function bindAIEvents() {
  const fab = document.getElementById('aiFab');
  const close = document.getElementById('aiCloseBtn');
  const send = document.getElementById('aiSendBtn');
  const input = document.getElementById('aiInput');

  if (fab) fab.addEventListener('click', toggleAIPanel);
  if (close) close.addEventListener('click', toggleAIPanel);
  if (send) send.addEventListener('click', aiSend);
  if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') aiSend(); });

  document.querySelectorAll('[data-ai-action]').forEach(btn => {
    btn.addEventListener('click', () => aiSendQuick(btn.dataset.aiAction));
  });
}

function toggleAIPanel() {
  aiPanelOpen = !aiPanelOpen;
  const panel = document.getElementById('aiPanel');
  const fab = document.getElementById('aiFab');
  if (!panel || !fab) return;
  if (aiPanelOpen) {
    panel.classList.add('open');
    fab.style.transform = 'scale(0)';
  } else {
    panel.classList.remove('open');
    fab.style.transform = '';
  }
}

function aiSendQuick(action) {
  if (!aiPanelOpen) toggleAIPanel();
  const input = document.getElementById('aiInput');
  if (!input) return;
  const prompts = {
    'help': 'What can you help me with?',
    'write-summary': 'Write a professional summary for my resume',
    'improve-skills': 'Help me improve my skills section',
    'ats-tips': 'Give me ATS optimization tips'
  };
  input.value = prompts[action] || action;
  aiSend();
}

function aiSend() {
  try {
    const input = document.getElementById('aiInput');
    const body = document.getElementById('aiPanelBody');
    if (!input || !body) return;
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    input.value = '';

    showTyping();
    setTimeout(() => {
      try {
        hideTyping();
        const reply = getAIResponse(msg);
        addMessage(reply, 'ai');
        body.scrollTop = body.scrollHeight;
      } catch (e) {
        console.error('AI reply error:', e);
      }
    }, 600 + Math.random() * 600);
  } catch (e) {
    console.error('AI send error:', e);
  }
}

function addMessage(text, role) {
  const body = document.getElementById('aiPanelBody');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'ai-message ' + role;
  const avatar = role === 'ai' ? 'AI' : 'You';
  div.innerHTML = '<div class="ai-msg-avatar">' + avatar + '</div><div class="ai-msg-content">' + text + '</div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = document.getElementById('aiPanelBody');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'ai-message ai';
  div.id = 'aiTypingIndicator';
  div.innerHTML = '<div class="ai-msg-avatar">AI</div><div class="ai-msg-content"><div class="ai-typing-dots"><span></span><span></span><span></span></div></div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

function getAIResponse(msg) {
  var lower = msg.toLowerCase();

  if (lower.indexOf('summary') !== -1 || (lower.indexOf('write') !== -1 && lower.indexOf('professional') !== -1)) {
    return 'Here\'s a template for a professional summary:\n\n"Results-driven professional with [X] years of experience in [industry/field]. Proven track record of [key achievement 1] and [key achievement 2]. Adept at [skill 1], [skill 2], and [skill 3], with a strong focus on delivering measurable results. Passionate about leveraging expertise to drive organizational success."\n\nPro tip: Customize this with your actual years of experience, specific achievements, and measurable outcomes!';
  }

  if (lower.indexOf('skills') !== -1 || lower.indexOf('improve') !== -1) {
    return 'Here are tips to improve your skills section:\n\n1. Mix Hard & Soft Skills - Combine technical skills (Python, Excel) with soft skills (Leadership, Communication)\n\n2. Use Industry Keywords - Scan job descriptions and include relevant keywords for ATS\n\n3. Categorize - Group skills into: Technical, Soft Skills, Languages, Tools\n\n4. Be Specific - Instead of "Microsoft Office", write "Advanced Excel (Pivot Tables, VLOOKUP)"\n\n5. Prioritize - Put your strongest, most relevant skills first\n\nWant me to help format a specific skill? Tell me your industry!';
  }

  if (lower.indexOf('ats') !== -1 || lower.indexOf('optimize') !== -1 || lower.indexOf('tips') !== -1) {
    return 'ATS Optimization Tips:\n\n1. Use Standard Headings - "Experience", "Education", "Skills" (not creative alternatives)\n\n2. Include Keywords - Mirror language from job descriptions you\'re targeting\n\n3. Avoid Tables/Columns - ATS can\'t parse them correctly\n\n4. Use Standard Fonts - Arial, Calibri, or Inter at 10-12pt\n\n5. Save as DOCX - Most ATS prefer it over PDF\n\n6. No Graphics/Icons - They don\'t render in ATS parsing\n\n7. Spell Check - ATS penalizes typos and misspellings\n\n8. Include Location - City and state for each position\n\nWould you like me to review a specific section of your resume?';
  }

  if (lower.indexOf('hello') !== -1 || lower.indexOf('hi') !== -1 || lower.indexOf('hey') !== -1) {
    return 'Hello! I\'m your AI resume assistant. I can help you with:\n\n- Writing professional summaries\n- Improving your skills section\n- ATS optimization\n- Rewriting experience bullet points\n- Keyword suggestions\n\nWhat would you like help with today?';
  }

  if (lower.indexOf('bullet') !== -1 || lower.indexOf('rewrite') !== -1 || lower.indexOf('experience') !== -1) {
    return 'Here\'s a formula for strong bullet points:\n\nAction Verb + What You Did + Measurable Result\n\nExamples:\n- "Led a team of 5 engineers to deliver a SaaS platform, resulting in 40% revenue growth"\n- "Optimized database queries reducing page load time by 60%"\n- "Developed training program that improved team productivity by 25%"\n\nTip: Start each bullet with a strong action verb (Led, Developed, Implemented, Designed, Spearheaded) and always include numbers!';
  }

  if (lower.indexOf('cover letter') !== -1) {
    return 'Here\'s a cover letter structure:\n\n1. Opening - Hook with enthusiasm and mention the role\n2. Your Value - 2-3 key achievements relevant to the role\n3. Company Connection - Why you want THIS company\n4. Call to Action - Request an interview\n\nPro tip: Keep it under 400 words and personalize for each application!';
  }

  if (lower.indexOf('thank') !== -1) {
    return 'You\'re welcome! I\'m glad I could help. Feel free to ask if you need anything else — whether it\'s rewriting a bullet point, optimizing for a specific job, or crafting a summary.\n\nGood luck with your resume!';
  }

  var defaults = [
    'Great question! To help you best, could you tell me what specific section of your resume you\'re working on? I can assist with summaries, skills, experience, education, and more.',
    'I\'d be happy to help with that! For the best assistance, try asking me to:\n- Write a professional summary\n- Improve your skills section\n- Give ATS optimization tips\n- Rewrite experience bullet points',
    'I\'m here to help you build an amazing resume! Here\'s what I can do:\n- Craft compelling summaries\n- Enhance your skills section\n- Optimize for ATS\n- Improve bullet points\n- Suggest industry keywords\n\nWhat would you like help with?'
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initAIAssistant, 300);
});
