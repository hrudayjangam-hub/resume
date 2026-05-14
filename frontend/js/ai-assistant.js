function initAIAssistant() {
  if (document.getElementById('aiAssistantRoot')) return;

  var root = document.createElement('div');
  root.id = 'aiAssistantRoot';
  root.innerHTML =
    '<button class="ai-fab" id="aiFab" aria-label="AI Assistant">' +
      '<span class="pulse-ring"></span>' +
      '<span class="ai-status-dot"></span>' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 3l1.91 5.44 5.72.44-4.35 3.71 1.33 5.56L12 15.77l-4.61 2.38 1.33-5.56-4.35-3.71 5.72-.44L12 3z"/>' +
      '</svg>' +
    '</button>' +
    '<div class="ai-panel-container" id="aiPanel">' +
      '<div class="ai-panel-header">' +
        '<h3><span class="ai-dot"></span> AI Assistant</h3>' +
        '<button class="ai-close-btn" id="aiCloseBtn">&times;</button>' +
      '</div>' +
      '<div class="ai-quick-actions" id="aiQuickActions">' +
        '<button class="ai-quick-btn" data-ai-action="help">&#128161; Help</button>' +
        '<button class="ai-quick-btn" data-ai-action="write-summary">&#9997;&#65039; Write Summary</button>' +
        '<button class="ai-quick-btn" data-ai-action="improve-skills">&#128170; Improve Skills</button>' +
        '<button class="ai-quick-btn" data-ai-action="ats-tips">&#127919; ATS Tips</button>' +
      '</div>' +
      '<div class="ai-panel-body" id="aiPanelBody">' +
        '<div class="ai-message ai">' +
          '<div class="ai-msg-avatar">AI</div>' +
          '<div class="ai-msg-content">Hello! I\'m your AI assistant. I can help you craft the perfect resume.<br><br>Try asking me to write a summary, improve your skills section, or give you ATS optimization tips!</div>' +
        '</div>' +
      '</div>' +
      '<div class="ai-panel-footer">' +
        '<input type="text" id="aiInput" placeholder="Ask me anything..." maxlength="500" autocomplete="off">' +
        '<button class="ai-send-btn" id="aiSendBtn" aria-label="Send">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(root);
  bindAIEvents();
}

var aiPanelOpen = false;
var aiSending = false;

function bindAIEvents() {
  var fab = document.getElementById('aiFab');
  var close = document.getElementById('aiCloseBtn');
  var send = document.getElementById('aiSendBtn');
  var input = document.getElementById('aiInput');
  var panel = document.getElementById('aiPanel');

  if (fab) fab.addEventListener('click', toggleAIPanel);
  if (close) close.addEventListener('click', toggleAIPanel);
  if (send) send.addEventListener('click', aiSend);
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        aiSend();
      }
    });
  }
  if (panel) {
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (aiPanelOpen) toggleAIPanel();
      }
    });
  }

  document.querySelectorAll('[data-ai-action]').forEach(function (btn) {
    btn.addEventListener('click', function () { aiSendQuick(btn.dataset.aiAction); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aiPanelOpen) {
      toggleAIPanel();
    }
  });
}

function toggleAIPanel() {
  aiPanelOpen = !aiPanelOpen;
  var panel = document.getElementById('aiPanel');
  var fab = document.getElementById('aiFab');
  if (!panel || !fab) return;
  if (aiPanelOpen) {
    panel.classList.add('open');
    fab.style.transform = 'scale(0)';
    setTimeout(function () {
      var input = document.getElementById('aiInput');
      if (input) input.focus();
    }, 100);
  } else {
    panel.classList.remove('open');
    fab.style.transform = '';
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function aiSendQuick(action) {
  if (!aiPanelOpen) toggleAIPanel();
  var input = document.getElementById('aiInput');
  if (!input) return;
  var prompts = {
    'help': 'What can you help me with?',
    'write-summary': 'Write a professional summary for my resume',
    'improve-skills': 'Help me improve my skills section',
    'ats-tips': 'Give me ATS optimization tips'
  };
  input.value = prompts[action] || action;
  aiSend();
}

function aiSend() {
  if (aiSending) return;
  try {
    var input = document.getElementById('aiInput');
    var body = document.getElementById('aiPanelBody');
    if (!input || !body) return;
    var msg = input.value.trim();
    if (!msg) return;

    aiSending = true;
    addMessage(escapeHTML(msg), 'user');
    input.value = '';
    input.focus();

    showTyping();
    setTimeout(function () {
      try {
        hideTyping();
        var reply = getAIResponse(msg);
        addMessage(reply, 'ai');
        body.scrollTop = body.scrollHeight;
      } catch (e) {
        console.error('AI reply error:', e);
      }
      aiSending = false;
    }, 400 + Math.random() * 300);
  } catch (e) {
    console.error('AI send error:', e);
    aiSending = false;
  }
}

function addMessage(text, role) {
  if (!text) return;
  var body = document.getElementById('aiPanelBody');
  if (!body) return;
  var div = document.createElement('div');
  div.className = 'ai-message ' + role;
  var avatar = role === 'ai' ? 'AI' : 'You';
  var content = role === 'user' ? text : text.replace(/\n/g, '<br>');
  div.innerHTML = '<div class="ai-msg-avatar">' + avatar + '</div><div class="ai-msg-content">' + content + '</div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  var body = document.getElementById('aiPanelBody');
  if (!body) return;
  var div = document.createElement('div');
  div.className = 'ai-message ai';
  div.id = 'aiTypingIndicator';
  div.innerHTML = '<div class="ai-msg-avatar">AI</div><div class="ai-msg-content"><div class="ai-typing-dots"><span></span><span></span><span></span></div></div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function hideTyping() {
  var el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

function getAIResponse(msg) {
  var lower = msg.toLowerCase();

  if (lower.indexOf('summary') !== -1 || (lower.indexOf('write') !== -1 && lower.indexOf('professional') !== -1)) {
    return 'Here\'s a template for a professional summary:<br><br>"Results-driven professional with [X] years of experience in [industry/field]. Proven track record of [key achievement 1] and [key achievement 2]. Adept at [skill 1], [skill 2], and [skill 3], with a strong focus on delivering measurable results. Passionate about leveraging expertise to drive organizational success."<br><br><strong>Pro tip:</strong> Customize this with your actual years of experience, specific achievements, and measurable outcomes!';
  }

  if (lower.indexOf('skills') !== -1 || lower.indexOf('improve') !== -1) {
    return 'Here are tips to improve your skills section:<br><br><strong>1.</strong> Mix Hard &amp; Soft Skills - Combine technical skills (Python, Excel) with soft skills (Leadership, Communication)<br><br><strong>2.</strong> Use Industry Keywords - Scan job descriptions and include relevant keywords for ATS<br><br><strong>3.</strong> Categorize - Group skills into: Technical, Soft Skills, Languages, Tools<br><br><strong>4.</strong> Be Specific - Instead of "Microsoft Office", write "Advanced Excel (Pivot Tables, VLOOKUP)"<br><br><strong>5.</strong> Prioritize - Put your strongest, most relevant skills first<br><br>Want me to help format a specific skill? Tell me your industry!';
  }

  if (lower.indexOf('ats') !== -1 || lower.indexOf('optimize') !== -1 || lower.indexOf('tips') !== -1) {
    return '<strong>ATS Optimization Tips:</strong><br><br><strong>1.</strong> Use Standard Headings - "Experience", "Education", "Skills" (not creative alternatives)<br><br><strong>2.</strong> Include Keywords - Mirror language from job descriptions you\'re targeting<br><br><strong>3.</strong> Avoid Tables/Columns - ATS can\'t parse them correctly<br><br><strong>4.</strong> Use Standard Fonts - Arial, Calibri, or Inter at 10-12pt<br><br><strong>5.</strong> Save as DOCX - Most ATS prefer it over PDF<br><br><strong>6.</strong> No Graphics/Icons - They don\'t render in ATS parsing<br><br><strong>7.</strong> Spell Check - ATS penalizes typos and misspellings<br><br><strong>8.</strong> Include Location - City and state for each position<br><br>Would you like me to review a specific section of your resume?';
  }

  if (lower.indexOf('hello') !== -1 || lower.indexOf('hi') !== -1 || lower.indexOf('hey') !== -1) {
    return 'Hello! I\'m your AI resume assistant. I can help you with:<br><br>- Writing professional summaries<br>- Improving your skills section<br>- ATS optimization<br>- Rewriting experience bullet points<br>- Keyword suggestions<br><br>What would you like help with today?';
  }

  if (lower.indexOf('bullet') !== -1 || lower.indexOf('rewrite') !== -1 || lower.indexOf('experience') !== -1) {
    return 'Here\'s a formula for strong bullet points:<br><br><strong>Action Verb + What You Did + Measurable Result</strong><br><br>Examples:<br>- "Led a team of 5 engineers to deliver a SaaS platform, resulting in 40% revenue growth"<br>- "Optimized database queries reducing page load time by 60%"<br>- "Developed training program that improved team productivity by 25%"<br><br><strong>Tip:</strong> Start each bullet with a strong action verb (Led, Developed, Implemented, Designed, Spearheaded) and always include numbers!';
  }

  if (lower.indexOf('cover letter') !== -1) {
    return 'Here\'s a cover letter structure:<br><br><strong>1. Opening</strong> - Hook with enthusiasm and mention the role<br><strong>2. Your Value</strong> - 2-3 key achievements relevant to the role<br><strong>3. Company Connection</strong> - Why you want THIS company<br><strong>4. Call to Action</strong> - Request an interview<br><br>Pro tip: Keep it under 400 words and personalize for each application!';
  }

  if (lower.indexOf('thank') !== -1) {
    return 'You\'re welcome! I\'m glad I could help. Feel free to ask if you need anything else &mdash; whether it\'s rewriting a bullet point, optimizing for a specific job, or crafting a summary.<br><br>Good luck with your resume!';
  }

  var defaults = [
    'Great question! To help you best, could you tell me what specific section of your resume you\'re working on? I can assist with summaries, skills, experience, education, and more.',
    'I\'d be happy to help with that! For the best assistance, try asking me to:<br>- Write a professional summary<br>- Improve your skills section<br>- Give ATS optimization tips<br>- Rewrite experience bullet points',
    'I\'m here to help you build an amazing resume! Here\'s what I can do:<br>- Craft compelling summaries<br>- Enhance your skills section<br>- Optimize for ATS<br>- Improve bullet points<br>- Suggest industry keywords<br><br>What would you like help with?'
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initAIAssistant, 300);
});
