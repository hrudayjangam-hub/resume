function initAIAssistant() {
  if (document.getElementById('aiAssistantRoot')) return;

  const root = document.createElement('div');
  root.id = 'aiAssistantRoot';
  root.innerHTML = `
    <button class="ai-fab" id="aiFab" onclick="toggleAIPanel()" aria-label="AI Assistant">
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
        <button class="ai-close-btn" onclick="toggleAIPanel()">✕</button>
      </div>
      <div class="ai-quick-actions" id="aiQuickActions">
        <button class="ai-quick-btn" onclick="aiSendQuick('help')">💡 Help</button>
        <button class="ai-quick-btn" onclick="aiSendQuick('write-summary')">✍️ Write Summary</button>
        <button class="ai-quick-btn" onclick="aiSendQuick('improve-skills')">💪 Improve Skills</button>
        <button class="ai-quick-btn" onclick="aiSendQuick('ats-tips')">🎯 ATS Tips</button>
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
        <input type="text" id="aiInput" placeholder="Ask me anything..." onkeydown="if(event.key==='Enter')aiSend()">
        <button class="ai-send-btn" onclick="aiSend()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(root);
}

let aiPanelOpen = false;

function toggleAIPanel() {
  aiPanelOpen = !aiPanelOpen;
  const panel = document.getElementById('aiPanel');
  const fab = document.getElementById('aiFab');
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
  const input = document.getElementById('aiInput');
  const body = document.getElementById('aiPanelBody');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, 'user');
  input.value = '';
  showTyping();

  setTimeout(() => {
    hideTyping();
    const reply = getAIResponse(msg);
    addMessage(reply, 'ai');
    body.scrollTop = body.scrollHeight;
  }, 600 + Math.random() * 600);
}

function addMessage(text, role) {
  const body = document.getElementById('aiPanelBody');
  const div = document.createElement('div');
  div.className = `ai-message ${role}`;
  div.innerHTML = `
    <div class="ai-msg-avatar">${role === 'ai' ? 'AI' : 'You'}</div>
    <div class="ai-msg-content">${text}</div>
  `;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = document.getElementById('aiPanelBody');
  const div = document.createElement('div');
  div.className = 'ai-message ai';
  div.id = 'aiTypingIndicator';
  div.innerHTML = `
    <div class="ai-msg-avatar">AI</div>
    <div class="ai-msg-content">
      <div class="ai-typing-dots"><span></span><span></span><span></span></div>
    </div>
  `;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes('summary') || lower.includes('write') && lower.includes('professional')) {
    return `Here's a template for a professional summary:

"Results-driven professional with [X] years of experience in [industry/field]. Proven track record of [key achievement 1] and [key achievement 2]. Adept at [skill 1], [skill 2], and [skill 3], with a strong focus on delivering measurable results. Passionate about leveraging expertise to drive organizational success."

👉 Pro tip: Customize this with your actual years of experience, specific achievements, and measurable outcomes!`;
  }

  if (lower.includes('skills') || lower.includes('improve')) {
    return `Here are tips to improve your skills section:

1️⃣ **Mix Hard & Soft Skills** - Combine technical skills (Python, Excel) with soft skills (Leadership, Communication)

2️⃣ **Use Industry Keywords** - Scan job descriptions and include relevant keywords for ATS

3️⃣ **Categorize** - Group skills into: Technical, Soft Skills, Languages, Tools

4️⃣ **Be Specific** - Instead of "Microsoft Office", write "Advanced Excel (Pivot Tables, VLOOKUP)"

5️⃣ **Prioritize** - Put your strongest, most relevant skills first

Want me to help format a specific skill? Tell me your industry!`;
  }

  if (lower.includes('ats') || lower.includes('optimize') || lower.includes('tips')) {
    return `🎯 **ATS Optimization Tips:**

1. **Use Standard Headings** - "Experience", "Education", "Skills" (not creative alternatives)

2. **Include Keywords** - Mirror language from job descriptions you're targeting

3. **Avoid Tables/Columns** - ATS can't parse them correctly

4. **Use Standard Fonts** - Arial, Calibri, or Inter at 10-12pt

5. **Save as DOCX** - Most ATS prefer it over PDF

6. **No Graphics/Icons** - They don't render in ATS parsing

7. **Spell Check** - ATS penalizes typos and misspellings

8. **Include Location** - City and state for each position

Would you like me to review a specific section of your resume?`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! 👋 I'm your AI resume assistant. I can help you with:

• ✍️ Writing professional summaries
• 💪 Improving your skills section
• 🎯 ATS optimization
• 📝 Rewriting experience bullet points
• 🔍 Keyword suggestions

What would you like help with today?`;
  }

  if (lower.includes('bullet') || lower.includes('rewrite') || lower.includes('experience')) {
    return `Here's a formula for strong bullet points:

**Action Verb + What You Did + Measurable Result**

Examples:
• "Led a team of 5 engineers to deliver a SaaS platform, resulting in 40% revenue growth"
• "Optimized database queries reducing page load time by 60%"
• "Developed training program that improved team productivity by 25%"

**Tip:** Start each bullet with a strong action verb (Led, Developed, Implemented, Designed, Spearheaded) and always include numbers!`;
  }

  if (lower.includes('cover letter')) {
    return `Here's a cover letter structure:

**1. Opening** - Hook with enthusiasm and mention the role
**2. Your Value** - 2-3 key achievements relevant to the role
**3. Company Connection** - Why you want THIS company
**4. Call to Action** - Request an interview

Pro tip: Keep it under 400 words and personalize for each application!`;
  }

  if (lower.includes('thank')) {
    return `You're welcome! 😊 I'm glad I could help. Feel free to ask if you need anything else — whether it's rewriting a bullet point, optimizing for a specific job, or crafting a summary.

Good luck with your resume! 🚀`;
  }

  const defaultResponses = [
    `Great question! To help you best, could you tell me what specific section of your resume you're working on? I can assist with summaries, skills, experience, education, and more.`,
    `I'd be happy to help with that! For the best assistance, try asking me to:
• Write a professional summary
• Improve your skills section
• Give ATS optimization tips
• Rewrite experience bullet points`,
    `I'm here to help you build an amazing resume! Here's what I can do:
• ✍️ Craft compelling summaries
• 💪 Enhance your skills section
• 🎯 Optimize for ATS
• 📝 Improve bullet points
• 🔑 Suggest industry keywords

What would you like help with?`
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initAIAssistant, 300);
});
