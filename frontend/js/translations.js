const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.editor': 'Editor',
    'nav.templates': 'Templates',
    'nav.profile': 'Profile',
    'nav.signIn': 'Sign In',
    'nav.logout': 'Logout',
    'nav.language': 'Language',

    // Hero
    'hero.badge': 'Powered by AI',
    'hero.title': 'Build Your <span class="highlight">Dream Resume</span> with AI',
    'hero.subtitle': 'Create professional, ATS-optimized resumes in minutes. Smart AI suggestions, real-time preview, and beautiful templates — all in one place.',
    'hero.cta1': 'Get Started Free',
    'hero.cta2': 'View Templates',

    // Features
    'features.title': 'Everything You Need',
    'features.subtitle': 'Powerful tools to create the perfect resume',
    'features.ai.title': 'AI-Powered',
    'features.ai.desc': 'Smart suggestions for summaries, skills, and improvements tailored to your industry.',
    'features.live.title': 'Live Editing',
    'features.live.desc': 'Real-time preview updates as you type. See changes instantly with smart refresh technology.',
    'features.templates.title': 'Beautiful Templates',
    'features.templates.desc': 'Professionally designed templates that are ATS-friendly and visually stunning.',
    'features.pdf.title': 'PDF Export',
    'features.pdf.desc': 'Download high-quality, print-ready PDFs with a single click.',
    'features.theme.title': 'Dark/Light Mode',
    'features.theme.desc': 'Work comfortably with automatic theme switching for day and night.',
    'features.cloud.title': 'Cloud Save',
    'features.cloud.desc': 'All your resumes are saved securely in the cloud. Access them anywhere.',

    // Footer
    'footer.text': 'Built with ❤️',

    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to continue to your account',
    'auth.login.btn': 'Sign In',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Start building your professional resume',
    'auth.register.btn': 'Create Account',
    'auth.name': 'Full Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgot': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',

    // Dashboard
    'dash.title': 'Dashboard',
    'dash.newResume': 'New Resume',
    'dash.stats.total': 'Total Resumes',
    'dash.stats.edited': 'Edited This Week',
    'dash.stats.ats': 'ATS Templates',
    'dash.stats.ai': 'AI Assistance',
    'dash.empty': 'No resumes yet. Create your first one!',
    'dash.edit': 'Edit',
    'dash.delete': 'Delete',

    // Editor
    'editor.save': 'Save',
    'editor.pdf': 'PDF',
    'editor.autoResume': 'Auto Resume',
    'editor.suggestions': 'Suggestions',
    'editor.summary': 'Summary',
    'editor.improve': 'Improve',
    'editor.skills': 'Skills',
    'editor.coverLetter': 'Cover Letter',
    'editor.jobMatch': 'Job Match',
    'editor.rewrite': 'Rewrite',
    'editor.bullets': 'Bullets',

    // Sections
    'section.personal': 'Personal',
    'section.education': 'Education',
    'section.experience': 'Experience',
    'section.skills': 'Skills',
    'section.certs': 'Certs',
    'section.achievements': 'Achievements',
    'section.projects': 'Projects',

    // Templates page
    'templates.title': 'Choose Your Template',
    'templates.subtitle': 'Select a professionally designed template for your resume',

    // General
    'loading': 'Loading...',
    'saving': 'Saving...',
    'saved': 'Changes saved',
    'close': 'Close',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'error': 'Something went wrong',
    'success': 'Success',
  },

  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.editor': 'एडिटर',
    'nav.templates': 'टेम्पलेट्स',
    'nav.profile': 'प्रोफाइल',
    'nav.signIn': 'साइन इन',
    'nav.logout': 'लॉग आउट',
    'nav.language': 'भाषा',

    // Hero
    'hero.badge': 'AI द्वारा संचालित',
    'hero.title': 'AI के साथ अपना <span class="highlight">सपनों का रिज़्यूमे</span> बनाएं',
    'hero.subtitle': 'मिनटों में प्रोफेशनल, ATS-अनुकूलित रिज़्यूमे बनाएं। स्मार्ट AI सुझाव, रीयल-टाइम प्रीव्यू, और खूबसूरत टेम्पलेट — सब एक जगह।',
    'hero.cta1': 'मुफ्त शुरू करें',
    'hero.cta2': 'टेम्पलेट देखें',

    // Features
    'features.title': 'वह सब जो आपको चाहिए',
    'features.subtitle': 'परफेक्ट रिज़्यूमे बनाने के लिए शक्तिशाली टूल्स',
    'features.ai.title': 'AI-संचालित',
    'features.ai.desc': 'आपके उद्योग के अनुरूप सारांश, कौशल और सुधार के लिए स्मार्ट सुझाव।',
    'features.live.title': 'लाइव एडिटिंग',
    'features.live.desc': 'टाइप करते ही रीयल-टाइम प्रीव्यू। स्मार्ट रिफ्रेश तकनीक के साथ तुरंत बदलाव देखें।',
    'features.templates.title': 'खूबसूरत टेम्पलेट',
    'features.templates.desc': 'पेशेवर रूप से डिज़ाइन किए गए टेम्पलेट जो ATS-अनुकूल और देखने में शानदार हैं।',
    'features.pdf.title': 'PDF एक्सपोर्ट',
    'features.pdf.desc': 'एक क्लिक से हाई-क्वालिटी, प्रिंट-रेडी PDF डाउनलोड करें।',
    'features.theme.title': 'डार्क/लाइट मोड',
    'features.theme.desc': 'दिन और रात के लिए ऑटोमैटिक थीम स्विचिंग के साथ आराम से काम करें।',
    'features.cloud.title': 'क्लाउड सेव',
    'features.cloud.desc': 'आपके सभी रिज़्यूमे क्लाउड में सुरक्षित रूप से सेव हैं। कहीं से भी एक्सेस करें।',

    // Footer
    'footer.text': 'प्यार से बनाया गया',

    // Auth
    'auth.login.title': 'वापस स्वागत है',
    'auth.login.subtitle': 'अपने खाते में जारी रखने के लिए साइन इन करें',
    'auth.login.btn': 'साइन इन',
    'auth.register.title': 'खाता बनाएं',
    'auth.register.subtitle': 'अपना प्रोफेशनल रिज़्यूमे बनाना शुरू करें',
    'auth.register.btn': 'खाता बनाएं',
    'auth.name': 'पूरा नाम',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.forgot': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.hasAccount': 'पहले से खाता है?',

    // Dashboard
    'dash.title': 'डैशबोर्ड',
    'dash.newResume': 'नया रिज़्यूमे',
    'dash.stats.total': 'कुल रिज़्यूमे',
    'dash.stats.edited': 'इस सप्ताह संपादित',
    'dash.stats.ats': 'ATS टेम्पलेट',
    'dash.stats.ai': 'AI सहायता',
    'dash.empty': 'अभी तक कोई रिज़्यूमे नहीं। अपना पहला बनाएं!',
    'dash.edit': 'संपादित करें',
    'dash.delete': 'हटाएं',

    // Editor
    'editor.save': 'सेव',
    'editor.pdf': 'PDF',
    'editor.autoResume': 'ऑटो रिज़्यूमे',
    'editor.suggestions': 'सुझाव',
    'editor.summary': 'सारांश',
    'editor.improve': 'सुधारें',
    'editor.skills': 'कौशल',
    'editor.coverLetter': 'कवर लेटर',
    'editor.jobMatch': 'जॉब मैच',
    'editor.rewrite': 'फिर से लिखें',
    'editor.bullets': 'बुलेट्स',

    // Sections
    'section.personal': 'व्यक्तिगत',
    'section.education': 'शिक्षा',
    'section.experience': 'अनुभव',
    'section.skills': 'कौशल',
    'section.certs': 'प्रमाणपत्र',
    'section.achievements': 'उपलब्धियां',
    'section.projects': 'प्रोजेक्ट',

    // Templates page
    'templates.title': 'अपना टेम्पलेट चुनें',
    'templates.subtitle': 'अपने रिज़्यूमे के लिए एक प्रोफेशनल टेम्पलेट चुनें',

    // General
    'loading': 'लोड हो रहा है...',
    'saving': 'सेव हो रहा है...',
    'saved': 'बदलाव सेव हो गए',
    'close': 'बंद करें',
    'cancel': 'रद्द करें',
    'confirm': 'पुष्टि करें',
    'error': 'कुछ गलत हो गया',
    'success': 'सफल',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');
  translatePage();
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'hi' : 'en');
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const key = el.dataset.i18nValue;
    el.value = t(key);
  });

  const langBtn = document.querySelector('.lang-toggle span');
  if (langBtn) langBtn.textContent = currentLang === 'en' ? 'हिन्दी' : 'English';
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  if (saved !== 'en') {
    currentLang = saved;
    document.documentElement.setAttribute('lang', currentLang === 'hi' ? 'hi' : 'en');
  }
});
