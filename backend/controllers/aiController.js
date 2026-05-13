const AILog = require('../models/AILog');
const Resume = require('../models/Resume');
const { getAIResponse } = require('../services/aiService');

const generateSummary = async (req, res) => {
  try {
    const { jobRole, experience, skills, education } = req.body;
    const prompt = `Write a professional resume summary for a ${jobRole} with ${experience} experience. Skills: ${skills}. Education: ${education}. Keep it concise, ATS-friendly, and impactful (3-4 sentences).`;
    let aiResponse = await getAIResponse(prompt);
    if (!aiResponse) {
      aiResponse = `Professional ${jobRole} with ${experience} of experience in ${skills}. Proven track record of delivering results and driving innovation. Skilled in ${skills} with a strong foundation in ${education}. Committed to leveraging expertise to solve complex challenges and contribute to organizational success.`;
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse, type: 'summary' });
    res.json({ summary: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const improveContent = async (req, res) => {
  try {
    const { content, context } = req.body;
    const prompt = `Improve the following ${context} description for a resume to be more impactful and ATS-friendly: "${content}". Use action verbs and quantify achievements where possible.`;
    let aiResponse = await getAIResponse(prompt);
    if (!aiResponse) {
      aiResponse = `${content.trim().replace(/\.$/, '')} — delivering measurable improvements and driving significant outcomes through strategic initiatives and cross-functional collaboration.`;
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse, type: 'improve' });
    res.json({ improved: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateSkills = async (req, res) => {
  try {
    const { jobRole, experience } = req.body;
    const prompt = `List top 10 most relevant and in-demand skills for a ${jobRole} with ${experience} experience. Return as a comma-separated list.`;
    let aiResponse = await getAIResponse(prompt);
    if (!aiResponse) {
      aiResponse = 'JavaScript, Python, React, Node.js, TypeScript, SQL, Docker, AWS, Git, REST APIs';
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse, type: 'skills' });
    res.json({ skills: aiResponse.split(', ').map(s => ({ name: s, level: 'intermediate' })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateCoverLetter = async (req, res) => {
  try {
    const { jobRole, company, skills } = req.body;
    const prompt = `Write a professional cover letter for a ${jobRole} position at ${company}. Key skills: ${skills}.`;
    let aiResponse = await getAIResponse(prompt);
    if (!aiResponse) {
      aiResponse = `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${jobRole} position at ${company}. With expertise in ${skills}, I am confident in my ability to contribute to your team's success.\n\nThroughout my career, I have demonstrated a commitment to excellence and a passion for delivering results. My skills in ${skills} align perfectly with the requirements of this role.\n\nI would welcome the opportunity to discuss how my experience and skills can benefit ${company}. Thank you for your consideration.\n\nBest regards,\n[Your Name]`;
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse, type: 'cover-letter' });
    res.json({ coverLetter: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateResume = async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiPrompt = `You are an expert resume writer. Based on the following description, create a complete professional resume in valid JSON only (no markdown, no code fences). Follow this exact schema:
{
  "personalInfo": { "fullName": "", "title": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "portfolio": "", "summary": "" },
  "education": [{ "institution": "", "degree": "", "field": "", "startDate": "", "endDate": "", "description": "" }],
  "experience": [{ "company": "", "position": "", "location": "", "startDate": "", "endDate": "", "current": false, "description": "" }],
  "skills": [{ "name": "", "level": "beginner|intermediate|advanced|expert" }],
  "certifications": [{ "name": "", "issuer": "", "date": "", "url": "" }],
  "projects": [{ "title": "", "description": "", "technologies": [] }]
}
Rules:
- Keep summaries and descriptions concise, impactful, and ATS-friendly (1-3 sentences each)
- Use 6-10 relevant skills
- Return ONLY the JSON object, nothing else
- Use realistic dates relative to today (no future dates)
- Fill in all fields that are inferable from the description

Description: ${prompt}`;

    let aiResponse = await getAIResponse(aiPrompt);
    let parsed;
    if (aiResponse) {
      try {
        parsed = JSON.parse(aiResponse);
      } catch {
        const match = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
          try { parsed = JSON.parse(match[1]); } catch { parsed = null; }
        } else {
          parsed = null;
        }
      }
    }

    if (!parsed || !parsed.personalInfo) {
      parsed = {
        personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: 'Professional with expertise in delivering results.' },
        education: [],
        experience: [],
        skills: [{ name: 'JavaScript', level: 'intermediate' }, { name: 'Python', level: 'intermediate' }],
        certifications: [],
        projects: []
      };
    }

    await AILog.create({ userId: req.user._id, prompt, aiResponse: JSON.stringify(parsed), type: 'full-resume' });
    res.json({ resume: parsed });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const analyzeResumeQuality = async (req, res) => {
  try {
    const resume = req.body;
    const suggestions = [];

    // Personal Info checks
    if (!resume.personalInfo?.fullName?.trim()) suggestions.push({ section: 'personalInfo', type: 'warning', message: 'Add your full name.' });
    if (!resume.personalInfo?.email?.trim()) suggestions.push({ section: 'personalInfo', type: 'warning', message: 'Add an email address.' });
    if (!resume.personalInfo?.phone?.trim()) suggestions.push({ section: 'personalInfo', type: 'info', message: 'Consider adding a phone number.' });
    if (!resume.personalInfo?.summary?.trim()) suggestions.push({ section: 'personalInfo', type: 'warning', message: 'Add a professional summary — it is the first thing recruiters see.' });
    else if (resume.personalInfo.summary.length < 80) suggestions.push({ section: 'personalInfo', type: 'info', message: 'Your summary is short. Aim for 2-4 impactful sentences.' });
    if (!resume.personalInfo?.title?.trim()) suggestions.push({ section: 'personalInfo', type: 'info', message: 'Add a professional title (e.g. "Software Engineer").' });
    if (!resume.personalInfo?.linkedin?.trim()) suggestions.push({ section: 'personalInfo', type: 'tip', message: 'Adding a LinkedIn profile increases credibility.' });
    if (!resume.personalInfo?.github?.trim()) suggestions.push({ section: 'personalInfo', type: 'tip', message: 'Adding a GitHub profile showcases your projects and code — essential for tech roles.' });

    // Experience checks
    const exp = resume.experience || [];
    if (exp.length === 0) suggestions.push({ section: 'experience', type: 'warning', message: 'No experience entries. Add at least one role.' });
    exp.forEach((item, i) => {
      if (!item.position?.trim()) suggestions.push({ section: 'experience', type: 'warning', message: `Experience #${i+1} is missing a position title.` });
      if (!item.company?.trim()) suggestions.push({ section: 'experience', type: 'warning', message: `Experience #${i+1} is missing a company name.` });
      if (!item.description?.trim() || item.description.length < 30) suggestions.push({ section: 'experience', type: 'info', message: `Experience #${i+1} description is too short. Use bullet points with action verbs and quantified results.` });
      if (item.description?.length > 0 && !/\d/.test(item.description)) suggestions.push({ section: 'experience', type: 'tip', message: `Experience #${i+1} lacks numbers. Add metrics (e.g. "increased sales by 20%").` });
      if (item.description?.length > 0 && !/^(Led|Developed|Managed|Created|Designed|Built|Improved|Implemented|Delivered|Drove|Launched|Optimized|Reduced|Architected)/im.test(item.description)) suggestions.push({ section: 'experience', type: 'tip', message: `Experience #${i+1}: Start descriptions with strong action verbs.` });
    });

    // Education checks
    const edu = resume.education || [];
    if (edu.length === 0) suggestions.push({ section: 'education', type: 'info', message: 'No education entries. Add your educational background.' });
    edu.forEach((item, i) => {
      if (!item.institution?.trim()) suggestions.push({ section: 'education', type: 'warning', message: `Education #${i+1} is missing the institution name.` });
      if (!item.degree?.trim()) suggestions.push({ section: 'education', type: 'info', message: `Education #${i+1} is missing the degree.` });
    });

    // Skills checks
    const skills = resume.skills || [];
    if (skills.length === 0) suggestions.push({ section: 'skills', type: 'warning', message: 'No skills listed. Add relevant technical and soft skills.' });
    else if (skills.length < 5) suggestions.push({ section: 'skills', type: 'info', message: `Only ${skills.length} skills. Aim for 6-10 relevant skills.` });

    // Projects checks
    const projects = resume.projects || [];
    projects.forEach((item, i) => {
      if (!item.description?.trim() || item.description.length < 20) suggestions.push({ section: 'projects', type: 'info', message: `Project #${i+1} description is too vague. Explain what you built and the impact.` });
    });

    // Overall checks
    const totalWords = [
      resume.personalInfo?.summary || '',
      ...exp.map(e => e.description || ''),
      ...projects.map(p => p.description || '')
    ].join(' ').split(/\s+/).filter(Boolean).length;
    if (totalWords < 100) suggestions.push({ section: 'overall', type: 'warning', message: 'Your resume content is very short. Aim for 200+ words of substantive content.' });

    await AILog.create({ userId: req.user._id, prompt: 'analyze-resume', aiResponse: JSON.stringify(suggestions), type: 'analysis' });

    // Try AI-powered suggestions
    try {
      const aiPrompt = `You are a resume expert. Analyze this resume JSON and give 3-5 specific, actionable suggestions to improve it. Focus on content quality, ATS optimization, and impact. Resume: ${JSON.stringify(resume)}. Return suggestions as a JSON array of objects with "type" ("warning"|"info"|"tip"), "section" string, and "message" string. Return ONLY the JSON array.`;
      const aiResult = await getAIResponse(aiPrompt);
      if (aiResult) {
        try {
          const parsed = JSON.parse(aiResult);
          if (Array.isArray(parsed)) suggestions.push(...parsed);
        } catch { /* fall back to rule-based suggestions */ }
      }
    } catch { /* fall back to rule-based suggestions */ }

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const tailorToJob = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;
    const prompt = `You are an expert resume tailor. Given this resume JSON and a job description, rewrite the experience descriptions, summary, and skills to match the job description. Keep the same structure but optimize keywords and highlight relevant achievements.

Job Description: "${jobDescription}"

Resume: ${JSON.stringify(resume)}

Return the entire resume JSON with updated experience descriptions, summary (if needed), and skills. Keep all other fields unchanged. Return ONLY valid JSON.`;

    let aiResponse = await getAIResponse(prompt, 3000);
    let tailored;
    if (aiResponse) {
      try { tailored = JSON.parse(aiResponse); }
      catch {
        const match = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) { try { tailored = JSON.parse(match[1]); } catch { tailored = null; } }
        else { tailored = null; }
      }
    }
    if (!tailored || !tailored.personalInfo) {
      tailored = {
        ...resume,
        personalInfo: { ...resume.personalInfo, summary: resume.personalInfo?.summary || 'Professional with relevant experience.' }
      };
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse: JSON.stringify(tailored), type: 'analysis' });
    res.json({ resume: tailored });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rewriteContent = async (req, res) => {
  try {
    const { content, tone } = req.body;
    const toneGuide = {
      professional: 'Make it sound professional, formal, and confident.',
      concise: 'Make it very concise and punchy. Remove fluff.',
      achievement: 'Focus on achievements. Use action verbs and quantify results.',
      ats: 'Optimize for ATS keyword scanning naturally.'
    };
    const guide = toneGuide[tone] || toneGuide.professional;
    const prompt = `Rewrite this resume content. ${guide}\n\nContent: "${content}"\n\nReturn only the rewritten text.`;
    let aiResponse = await getAIResponse(prompt);
    if (!aiResponse) aiResponse = content;
    await AILog.create({ userId: req.user._id, prompt, aiResponse, type: 'improve' });
    res.json({ rewritten: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateBulletPoints = async (req, res) => {
  try {
    const { description, role } = req.body;
    const prompt = `Convert this into 3-5 achievement bullet points for a ${role || 'professional'} resume. Each bullet: start with action verb, quantify results. Return ONLY a JSON array of strings, no other text.\n\nDescription: "${description}"`;
    let aiResponse = await getAIResponse(prompt);
    let bullets;
    if (aiResponse) {
      try { bullets = JSON.parse(aiResponse); } catch {
        const match = aiResponse.match(/\[[\s\S]*?\]/);
        if (match) { try { bullets = JSON.parse(match[0]); } catch { bullets = null; } }
      }
    }
    if (!bullets || !Array.isArray(bullets)) {
      bullets = ['Delivered measurable results through strategic initiatives and team collaboration.'];
    }
    await AILog.create({ userId: req.user._id, prompt, aiResponse: JSON.stringify(bullets), type: 'analysis' });
    res.json({ bullets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSummary, improveContent, generateSkills, generateCoverLetter, generateResume, analyzeResumeQuality, tailorToJob, rewriteContent, generateBulletPoints };
