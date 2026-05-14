const languages = {
  en: 'English', hi: 'हिन्दी', te: 'తెలుగు', es: 'Español', fr: 'Français',
  de: 'Deutsch', 'zh-CN': '中文', ar: 'العربية', pt: 'Português',
  ru: 'Русский', ja: '日本語', it: 'Italiano', ko: '한국어'
};

const translations = {
  en: {
    'nav.home': 'Home', 'nav.dashboard': 'Dashboard', 'nav.editor': 'Editor',
    'nav.templates': 'Templates', 'nav.profile': 'Profile', 'nav.signIn': 'Sign In', 'nav.logout': 'Logout',
    'hero.badge': 'Powered by AI',
    'hero.title': 'Build Your <span class="highlight">Dream Resume</span> with AI',
    'hero.subtitle': 'Create professional, ATS-optimized resumes in minutes. Smart AI suggestions, real-time preview, and beautiful templates — all in one place.',
    'hero.cta1': 'Get Started Free', 'hero.cta2': 'View Templates',
    'features.title': 'Everything You Need', 'features.subtitle': 'Powerful tools to create the perfect resume',
    'features.ai.title': 'AI-Powered', 'features.ai.desc': 'Smart suggestions for summaries, skills, and improvements tailored to your industry.',
    'features.live.title': 'Live Editing', 'features.live.desc': 'Real-time preview updates as you type. See changes instantly with smart refresh technology.',
    'features.templates.title': 'Beautiful Templates', 'features.templates.desc': 'Professionally designed templates that are ATS-friendly and visually stunning.',
    'features.pdf.title': 'PDF Export', 'features.pdf.desc': 'Download high-quality, print-ready PDFs with a single click.',
    'features.theme.title': 'Dark/Light Mode', 'features.theme.desc': 'Work comfortably with automatic theme switching for day and night.',
    'features.cloud.title': 'Cloud Save', 'features.cloud.desc': 'All your resumes are saved securely in the cloud. Access them anywhere.',
    'footer.text': 'Built with ❤️',
    'auth.login.title': 'Welcome Back', 'auth.login.subtitle': 'Sign in to continue to your account', 'auth.login.btn': 'Sign In',
    'auth.register.title': 'Create Account', 'auth.register.subtitle': 'Start building your professional resume', 'auth.register.btn': 'Create Account',
    'auth.name': 'Full Name', 'auth.email': 'Email', 'auth.password': 'Password', 'auth.forgot': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?", 'auth.hasAccount': 'Already have an account?',
    'dash.title': 'Dashboard', 'dash.newResume': 'New Resume',
    'dash.stats.total': 'Total Resumes', 'dash.stats.edited': 'Edited This Week', 'dash.stats.ats': 'ATS Templates', 'dash.stats.ai': 'AI Assistance',
    'dash.empty': 'No resumes yet. Create your first one!', 'dash.edit': 'Edit', 'dash.delete': 'Delete',
    'editor.save': 'Save', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto Resume', 'editor.suggestions': 'Suggestions',
    'editor.summary': 'Summary', 'editor.improve': 'Improve', 'editor.skills': 'Skills', 'editor.coverLetter': 'Cover Letter',
    'editor.jobMatch': 'Job Match', 'editor.rewrite': 'Rewrite', 'editor.bullets': 'Bullets',
    'section.personal': 'Personal', 'section.education': 'Education', 'section.experience': 'Experience', 'section.skills': 'Skills',
    'section.certs': 'Certs', 'section.achievements': 'Achievements', 'section.projects': 'Projects',
    'templates.title': 'Choose Your Template', 'templates.subtitle': 'Select a professionally designed template for your resume',
    'loading': 'Loading...', 'saving': 'Saving...', 'saved': 'Changes saved', 'close': 'Close', 'cancel': 'Cancel',
    'confirm': 'Confirm', 'error': 'Something went wrong', 'success': 'Success'
  },

  hi: {
    'nav.home': 'होम', 'nav.dashboard': 'डैशबोर्ड', 'nav.editor': 'एडिटर',
    'nav.templates': 'टेम्पलेट्स', 'nav.profile': 'प्रोफाइल', 'nav.signIn': 'साइन इन', 'nav.logout': 'लॉग आउट',
    'hero.badge': 'AI द्वारा संचालित',
    'hero.title': 'AI के साथ अपना <span class="highlight">सपनों का रिज़्यूमे</span> बनाएं',
    'hero.subtitle': 'मिनटों में प्रोफेशनल, ATS-अनुकूलित रिज़्यूमे बनाएं। स्मार्ट AI सुझाव, रीयल-टाइम प्रीव्यू, और खूबसूरत टेम्पलेट — सब एक जगह।',
    'hero.cta1': 'मुफ्त शुरू करें', 'hero.cta2': 'टेम्पलेट देखें',
    'features.title': 'वह सब जो आपको चाहिए', 'features.subtitle': 'परफेक्ट रिज़्यूमे बनाने के लिए शक्तिशाली टूल्स',
    'features.ai.title': 'AI-संचालित', 'features.ai.desc': 'आपके उद्योग के अनुरूप सारांश, कौशल और सुधार के लिए स्मार्ट सुझाव।',
    'features.live.title': 'लाइव एडिटिंग', 'features.live.desc': 'टाइप करते ही रीयल-टाइम प्रीव्यू। स्मार्ट रिफ्रेश तकनीक के साथ तुरंत बदलाव देखें।',
    'features.templates.title': 'खूबसूरत टेम्पलेट', 'features.templates.desc': 'पेशेवर रूप से डिज़ाइन किए गए टेम्पलेट जो ATS-अनुकूल और देखने में शानदार हैं।',
    'features.pdf.title': 'PDF एक्सपोर्ट', 'features.pdf.desc': 'एक क्लिक से हाई-क्वालिटी, प्रिंट-रेडी PDF डाउनलोड करें।',
    'features.theme.title': 'डार्क/लाइट मोड', 'features.theme.desc': 'दिन और रात के लिए ऑटोमैटिक थीम स्विचिंग के साथ आराम से काम करें।',
    'features.cloud.title': 'क्लाउड सेव', 'features.cloud.desc': 'आपके सभी रिज़्यूमे क्लाउड में सुरक्षित रूप से सेव हैं। कहीं से भी एक्सेस करें।',
    'footer.text': 'प्यार से बनाया गया',
    'auth.login.title': 'वापस स्वागत है', 'auth.login.subtitle': 'अपने खाते में जारी रखने के लिए साइन इन करें', 'auth.login.btn': 'साइन इन',
    'auth.register.title': 'खाता बनाएं', 'auth.register.subtitle': 'अपना प्रोफेशनल रिज़्यूमे बनाना शुरू करें', 'auth.register.btn': 'खाता बनाएं',
    'auth.name': 'पूरा नाम', 'auth.email': 'ईमेल', 'auth.password': 'पासवर्ड', 'auth.forgot': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?', 'auth.hasAccount': 'पहले से खाता है?',
    'dash.title': 'डैशबोर्ड', 'dash.newResume': 'नया रिज़्यूमे',
    'dash.stats.total': 'कुल रिज़्यूमे', 'dash.stats.edited': 'इस सप्ताह संपादित', 'dash.stats.ats': 'ATS टेम्पलेट', 'dash.stats.ai': 'AI सहायता',
    'dash.empty': 'अभी तक कोई रिज़्यूमे नहीं। अपना पहला बनाएं!', 'dash.edit': 'संपादित करें', 'dash.delete': 'हटाएं',
    'editor.save': 'सेव', 'editor.pdf': 'PDF', 'editor.autoResume': 'ऑटो रिज़्यूमे', 'editor.suggestions': 'सुझाव',
    'editor.summary': 'सारांश', 'editor.improve': 'सुधारें', 'editor.skills': 'कौशल', 'editor.coverLetter': 'कवर लेटर',
    'editor.jobMatch': 'जॉब मैच', 'editor.rewrite': 'फिर से लिखें', 'editor.bullets': 'बुलेट्स',
    'section.personal': 'व्यक्तिगत', 'section.education': 'शिक्षा', 'section.experience': 'अनुभव', 'section.skills': 'कौशल',
    'section.certs': 'प्रमाणपत्र', 'section.achievements': 'उपलब्धियां', 'section.projects': 'प्रोजेक्ट',
    'templates.title': 'अपना टेम्पलेट चुनें', 'templates.subtitle': 'अपने रिज़्यूमे के लिए एक प्रोफेशनल टेम्पलेट चुनें',
    'loading': 'लोड हो रहा है...', 'saving': 'सेव हो रहा है...', 'saved': 'बदलाव सेव हो गए',
    'close': 'बंद करें', 'cancel': 'रद्द करें', 'confirm': 'पुष्टि करें', 'error': 'कुछ गलत हो गया', 'success': 'सफल'
  },

  te: {
    'nav.home': 'హోమ్', 'nav.dashboard': 'డాష్‌బోర్డ్', 'nav.editor': 'ఎడిటర్',
    'nav.templates': 'టెంప్లేట్లు', 'nav.profile': 'ప్రొఫైల్', 'nav.signIn': 'సైన్ ఇన్', 'nav.logout': 'లాగ్ అవుట్',
    'hero.badge': 'AI ఆధారితం',
    'hero.title': 'AIతో మీ <span class="highlight">డ్రీమ్ రెజ్యూమ్</span>ను రూపొందించండి',
    'hero.subtitle': 'నిమిషాలలో ప్రొఫెషనల్, ATS-ఆప్టిమైజ్ చేసిన రెజ్యూమ్‌లను సృష్టించండి. స్మార్ట్ AI సూచనలు, రియల్-టైమ్ ప్రివ్యూ మరియు అందమైన టెంప్లేట్లు — అన్నీ ఒకే చోట.',
    'hero.cta1': 'ఉచితంగా ప్రారంభించండి', 'hero.cta2': 'టెంప్లేట్లు చూడండి',
    'features.title': 'మీకు కావలసినవన్నీ', 'features.subtitle': 'పర్ఫెక్ట్ రెజ్యూమ్ సృష్టించడానికి శక్తివంతమైన సాధనాలు',
    'features.ai.title': 'AI ఆధారితం', 'features.ai.desc': 'మీ పరిశ్రమకు అనుగుణంగా సారాంశాలు, నైపుణ్యాలు మరియు మెరుగుదలల కోసం స్మార్ట్ సూచనలు.',
    'features.live.title': 'లైవ్ ఎడిటింగ్', 'features.live.desc': 'మీరు టైప్ చేస్తున్నప్పుడు రియల్-టైమ్ ప్రివ్యూ. స్మార్ట్ రిఫ్రెష్ టెక్నాలజీతో మార్పులను తక్షణమే చూడండి.',
    'features.templates.title': 'అందమైన టెంప్లేట్లు', 'features.templates.desc': 'ప్రొఫెషనల్‌గా డిజైన్ చేసిన టెంప్లేట్లు ATS-ఫ్రెండ్లీ మరియు దృశ్యపరంగా అద్భుతంగా ఉంటాయి.',
    'features.pdf.title': 'PDF ఎక్స్‌పోర్ట్', 'features.pdf.desc': 'ఒక క్లిక్‌తో అధిక-నాణ్యత, ప్రింట్-రెడీ PDFలను డౌన్‌లోడ్ చేయండి.',
    'features.theme.title': 'డార్క్/లైట్ మోడ్', 'features.theme.desc': 'పగలు మరియు రాత్రికి ఆటోమేటిక్ థీమ్ మార్పుతో సౌకర్యవంతంగా పని చేయండి.',
    'features.cloud.title': 'క్లౌడ్ సేవ్', 'features.cloud.desc': 'మీ అన్ని రెజ్యూమ్‌లు క్లౌడ్‌లో సురక్షితంగా సేవ్ చేయబడతాయి. ఎక్కడి నుండైనా యాక్సెస్ చేయండి.',
    'footer.text': 'ప్రేమతో తయారు చేయబడింది',
    'auth.login.title': 'తిరిగి స్వాగతం', 'auth.login.subtitle': 'మీ ఖాతాను కొనసాగించడానికి సైన్ ఇన్ చేయండి', 'auth.login.btn': 'సైన్ ఇన్',
    'auth.register.title': 'ఖాతాను సృష్టించండి', 'auth.register.subtitle': 'మీ ప్రొఫెషనల్ రెజ్యూమ్ నిర్మించడం ప్రారంభించండి', 'auth.register.btn': 'ఖాతాను సృష్టించండి',
    'auth.name': 'పూర్తి పేరు', 'auth.email': 'ఇమెయిల్', 'auth.password': 'పాస్‌వర్డ్', 'auth.forgot': 'పాస్‌వర్డ్ మర్చిపోయారా?',
    'auth.noAccount': 'ఖాతా లేదా?', 'auth.hasAccount': 'ఇప్పటికే ఖాతా ఉందా?',
    'dash.title': 'డాష్‌బోర్డ్', 'dash.newResume': 'కొత్త రెజ్యూమ్',
    'dash.stats.total': 'మొత్తం రెజ్యూమ్‌లు', 'dash.stats.edited': 'ఈ వారం సవరించినవి', 'dash.stats.ats': 'ATS టెంప్లేట్లు', 'dash.stats.ai': 'AI సహాయం',
    'dash.empty': 'ఇంకా రెజ్యూమ్‌లు లేవు. మీ మొదటిదాన్ని సృష్టించండి!', 'dash.edit': 'సవరించు', 'dash.delete': 'తొలగించు',
    'editor.save': 'సేవ్', 'editor.pdf': 'PDF', 'editor.autoResume': 'ఆటో రెజ్యూమ్', 'editor.suggestions': 'సూచనలు',
    'editor.summary': 'సారాంశం', 'editor.improve': 'మెరుగుపరచు', 'editor.skills': 'నైపుణ్యాలు', 'editor.coverLetter': 'కవర్ లెటర్',
    'editor.jobMatch': 'జాబ్ మ్యాచ్', 'editor.rewrite': 'తిరిగి వ్రాయండి', 'editor.bullets': 'బుల్లెట్లు',
    'section.personal': 'వ్యక్తిగతం', 'section.education': 'విద్య', 'section.experience': 'అనుభవం', 'section.skills': 'నైపుణ్యాలు',
    'section.certs': 'సర్టిఫికెట్లు', 'section.achievements': 'విజయాలు', 'section.projects': 'ప్రాజెక్ట్‌లు',
    'templates.title': 'మీ టెంప్లేట్ ఎంచుకోండి', 'templates.subtitle': 'మీ రెజ్యూమ్ కోసం ప్రొఫెషనల్‌గా డిజైన్ చేసిన టెంప్లేట్ ఎంచుకోండి',
    'loading': 'లోడ్ అవుతోంది...', 'saving': 'సేవ్ అవుతోంది...', 'saved': 'మార్పులు సేవ్ చేయబడ్డాయి',
    'close': 'మూసివేయి', 'cancel': 'రద్దు చేయి', 'confirm': 'నిర్ధారించు', 'error': 'ఏదో తప్పు జరిగింది', 'success': 'విజయం'
  },

  es: {
    'nav.home': 'Inicio', 'nav.dashboard': 'Panel', 'nav.editor': 'Editor',
    'nav.templates': 'Plantillas', 'nav.profile': 'Perfil', 'nav.signIn': 'Iniciar Sesión', 'nav.logout': 'Cerrar Sesión',
    'hero.badge': 'Impulsado por IA',
    'hero.title': 'Construye tu <span class="highlight">Currículum Soñado</span> con IA',
    'hero.subtitle': 'Crea currículums profesionales y optimizados para ATS en minutos. Sugerencias inteligentes de IA, vista previa en tiempo real y plantillas hermosas, todo en un solo lugar.',
    'hero.cta1': 'Comenzar Gratis', 'hero.cta2': 'Ver Plantillas',
    'features.title': 'Todo lo que Necesitas', 'features.subtitle': 'Herramientas poderosas para crear el currículum perfecto',
    'features.ai.title': 'Impulsado por IA', 'features.ai.desc': 'Sugerencias inteligentes para resúmenes, habilidades y mejoras adaptadas a tu industria.',
    'features.live.title': 'Edición en Vivo', 'features.live.desc': 'Vista previa en tiempo real mientras escribes. Ve los cambios al instante.',
    'features.templates.title': 'Plantillas Hermosas', 'features.templates.desc': 'Plantillas diseñadas profesionalmente, compatibles con ATS y visualmente impactantes.',
    'features.pdf.title': 'Exportar PDF', 'features.pdf.desc': 'Descarga PDFs de alta calidad listos para imprimir con un solo clic.',
    'features.theme.title': 'Modo Oscuro/Claro', 'features.theme.desc': 'Trabaja cómodamente con cambio automático de tema para día y noche.',
    'features.cloud.title': 'Guardar en Nube', 'features.cloud.desc': 'Todos tus currículums se guardan de forma segura en la nube. Accede desde cualquier lugar.',
    'footer.text': 'Hecho con ❤️',
    'auth.login.title': 'Bienvenido de Nuevo', 'auth.login.subtitle': 'Inicia sesión para continuar con tu cuenta', 'auth.login.btn': 'Iniciar Sesión',
    'auth.register.title': 'Crear Cuenta', 'auth.register.subtitle': 'Comienza a construir tu currículum profesional', 'auth.register.btn': 'Crear Cuenta',
    'auth.name': 'Nombre Completo', 'auth.email': 'Correo Electrónico', 'auth.password': 'Contraseña', 'auth.forgot': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes una cuenta?', 'auth.hasAccount': '¿Ya tienes una cuenta?',
    'dash.title': 'Panel', 'dash.newResume': 'Nuevo Currículum',
    'dash.stats.total': 'Total Currículums', 'dash.stats.edited': 'Editados Esta Semana', 'dash.stats.ats': 'Plantillas ATS', 'dash.stats.ai': 'Asistencia IA',
    'dash.empty': 'Aún no hay currículums. ¡Crea el primero!', 'dash.edit': 'Editar', 'dash.delete': 'Eliminar',
    'editor.save': 'Guardar', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto Currículum', 'editor.suggestions': 'Sugerencias',
    'editor.summary': 'Resumen', 'editor.improve': 'Mejorar', 'editor.skills': 'Habilidades', 'editor.coverLetter': 'Carta de Presentación',
    'editor.jobMatch': 'Emparejar Trabajo', 'editor.rewrite': 'Reescribir', 'editor.bullets': 'Viñetas',
    'section.personal': 'Personal', 'section.education': 'Educación', 'section.experience': 'Experiencia', 'section.skills': 'Habilidades',
    'section.certs': 'Certificaciones', 'section.achievements': 'Logros', 'section.projects': 'Proyectos',
    'templates.title': 'Elige tu Plantilla', 'templates.subtitle': 'Selecciona una plantilla diseñada profesionalmente para tu currículum',
    'loading': 'Cargando...', 'saving': 'Guardando...', 'saved': 'Cambios guardados',
    'close': 'Cerrar', 'cancel': 'Cancelar', 'confirm': 'Confirmar', 'error': 'Algo salió mal', 'success': 'Éxito'
  },

  fr: {
    'nav.home': 'Accueil', 'nav.dashboard': 'Tableau de Bord', 'nav.editor': 'Éditeur',
    'nav.templates': 'Modèles', 'nav.profile': 'Profil', 'nav.signIn': 'Connexion', 'nav.logout': 'Déconnexion',
    'hero.badge': 'Propulsé par l\'IA',
    'hero.title': 'Construisez votre <span class="highlight">CV de Rêve</span> avec l\'IA',
    'hero.subtitle': 'Créez des CV professionnels optimisés ATS en minutes. Suggestions IA intelligentes, aperçu en temps réel et magnifiques modèles — tout en un seul endroit.',
    'hero.cta1': 'Commencer Gratuitement', 'hero.cta2': 'Voir les Modèles',
    'features.title': 'Tout ce dont vous avez besoin', 'features.subtitle': 'Des outils puissants pour créer le CV parfait',
    'features.ai.title': 'Alimenté par l\'IA', 'features.ai.desc': 'Suggestions intelligentes pour les résumés, compétences et améliorations adaptées à votre secteur.',
    'features.live.title': 'Édition en Direct', 'features.live.desc': 'Aperçu en temps réel pendant la saisie. Voyez les changements instantanément.',
    'features.templates.title': 'Beaux Modèles', 'features.templates.desc': 'Modèles conçus professionnellement, compatibles ATS et visuellement époustouflants.',
    'features.pdf.title': 'Export PDF', 'features.pdf.desc': 'Téléchargez des PDF de haute qualité prêts à imprimer en un clic.',
    'features.theme.title': 'Mode Sombre/Clair', 'features.theme.desc': 'Travaillez confortablement avec le changement automatique de thème jour/nuit.',
    'features.cloud.title': 'Sauvegarde Cloud', 'features.cloud.desc': 'Tous vos CV sont sauvegardés en toute sécurité dans le cloud. Accédez-y depuis n\'importe où.',
    'footer.text': 'Fait avec ❤️',
    'auth.login.title': 'Bon Retour', 'auth.login.subtitle': 'Connectez-vous pour continuer', 'auth.login.btn': 'Connexion',
    'auth.register.title': 'Créer un Compte', 'auth.register.subtitle': 'Commencez à construire votre CV professionnel', 'auth.register.btn': 'Créer un Compte',
    'auth.name': 'Nom Complet', 'auth.email': 'Email', 'auth.password': 'Mot de Passe', 'auth.forgot': 'Mot de passe oublié ?',
    'auth.noAccount': 'Vous n\'avez pas de compte ?', 'auth.hasAccount': 'Vous avez déjà un compte ?',
    'dash.title': 'Tableau de Bord', 'dash.newResume': 'Nouveau CV',
    'dash.stats.total': 'Total CV', 'dash.stats.edited': 'Modifiés Cette Semaine', 'dash.stats.ats': 'Modèles ATS', 'dash.stats.ai': 'Assistance IA',
    'dash.empty': 'Pas encore de CV. Créez le premier !', 'dash.edit': 'Modifier', 'dash.delete': 'Supprimer',
    'editor.save': 'Sauvegarder', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto CV', 'editor.suggestions': 'Suggestions',
    'editor.summary': 'Résumé', 'editor.improve': 'Améliorer', 'editor.skills': 'Compétences', 'editor.coverLetter': 'Lettre de Motivation',
    'editor.jobMatch': 'Correspondance Emploi', 'editor.rewrite': 'Réécrire', 'editor.bullets': 'Puces',
    'section.personal': 'Personnel', 'section.education': 'Formation', 'section.experience': 'Expérience', 'section.skills': 'Compétences',
    'section.certs': 'Certifications', 'section.achievements': 'Réalisations', 'section.projects': 'Projets',
    'templates.title': 'Choisissez votre Modèle', 'templates.subtitle': 'Sélectionnez un modèle conçu professionnellement pour votre CV',
    'loading': 'Chargement...', 'saving': 'Sauvegarde...', 'saved': 'Modifications sauvegardées',
    'close': 'Fermer', 'cancel': 'Annuler', 'confirm': 'Confirmer', 'error': 'Quelque chose s\'est mal passé', 'success': 'Succès'
  },

  de: {
    'nav.home': 'Startseite', 'nav.dashboard': 'Dashboard', 'nav.editor': 'Editor',
    'nav.templates': 'Vorlagen', 'nav.profile': 'Profil', 'nav.signIn': 'Anmelden', 'nav.logout': 'Abmelden',
    'hero.badge': 'KI-gestützt',
    'hero.title': 'Erstelle deinen <span class="highlight">Traumlebenslauf</span> mit KI',
    'hero.subtitle': 'Erstelle in Minuten professionelle, ATS-optimierte Lebensläufe. Intelligente KI-Vorschläge, Echtzeit-Vorschau und schöne Vorlagen — alles an einem Ort.',
    'hero.cta1': 'Kostenlos Starten', 'hero.cta2': 'Vorlagen Ansehen',
    'features.title': 'Alles was du brauchst', 'features.subtitle': 'Leistungsstarke Werkzeuge für den perfekten Lebenslauf',
    'features.ai.title': 'KI-gestützt', 'features.ai.desc': 'Intelligente Vorschläge für Zusammenfassungen, Fähigkeiten und Verbesserungen, zugeschnitten auf deine Branche.',
    'features.live.title': 'Live-Bearbeitung', 'features.live.desc': 'Echtzeit-Vorschau während der Eingabe. Sieh Änderungen sofort.',
    'features.templates.title': 'Schöne Vorlagen', 'features.templates.desc': 'Professionell gestaltete Vorlagen, ATS-freundlich und visuell beeindruckend.',
    'features.pdf.title': 'PDF-Export', 'features.pdf.desc': 'Lade hochwertige, druckfertige PDFs mit einem Klick herunter.',
    'features.theme.title': 'Dunkel/Hell-Modus', 'features.theme.desc': 'Arbeite bequem mit automatischem Themenwechsel für Tag und Nacht.',
    'features.cloud.title': 'Cloud-Speicher', 'features.cloud.desc': 'Alle Lebensläufe werden sicher in der Cloud gespeichert. Greife von überall darauf zu.',
    'footer.text': 'Mit ❤️ gemacht',
    'auth.login.title': 'Willkommen Zurück', 'auth.login.subtitle': 'Melde dich an, um fortzufahren', 'auth.login.btn': 'Anmelden',
    'auth.register.title': 'Konto Erstellen', 'auth.register.subtitle': 'Beginne mit der Erstellung deines professionellen Lebenslaufs', 'auth.register.btn': 'Konto Erstellen',
    'auth.name': 'Vollständiger Name', 'auth.email': 'E-Mail', 'auth.password': 'Passwort', 'auth.forgot': 'Passwort vergessen?',
    'auth.noAccount': 'Noch kein Konto?', 'auth.hasAccount': 'Bereits ein Konto?',
    'dash.title': 'Dashboard', 'dash.newResume': 'Neuer Lebenslauf',
    'dash.stats.total': 'Lebensläufe Gesamt', 'dash.stats.edited': 'Diese Woche Bearbeitet', 'dash.stats.ats': 'ATS-Vorlagen', 'dash.stats.ai': 'KI-Unterstützung',
    'dash.empty': 'Noch keine Lebensläufe. Erstelle deinen ersten!', 'dash.edit': 'Bearbeiten', 'dash.delete': 'Löschen',
    'editor.save': 'Speichern', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto Lebenslauf', 'editor.suggestions': 'Vorschläge',
    'editor.summary': 'Zusammenfassung', 'editor.improve': 'Verbessern', 'editor.skills': 'Fähigkeiten', 'editor.coverLetter': 'Anschreiben',
    'editor.jobMatch': 'Job-Match', 'editor.rewrite': 'Umschreiben', 'editor.bullets': 'Aufzählungen',
    'section.personal': 'Persönlich', 'section.education': 'Bildung', 'section.experience': 'Erfahrung', 'section.skills': 'Fähigkeiten',
    'section.certs': 'Zertifikate', 'section.achievements': 'Errungenschaften', 'section.projects': 'Projekte',
    'templates.title': 'Wähle deine Vorlage', 'templates.subtitle': 'Wähle eine professionell gestaltete Vorlage für deinen Lebenslauf',
    'loading': 'Laden...', 'saving': 'Speichern...', 'saved': 'Änderungen gespeichert',
    'close': 'Schließen', 'cancel': 'Abbrechen', 'confirm': 'Bestätigen', 'error': 'Etwas ist schiefgelaufen', 'success': 'Erfolg'
  },

  'zh-CN': {
    'nav.home': '首页', 'nav.dashboard': '仪表盘', 'nav.editor': '编辑器',
    'nav.templates': '模板', 'nav.profile': '个人资料', 'nav.signIn': '登录', 'nav.logout': '退出',
    'hero.badge': 'AI 驱动',
    'hero.title': '用AI打造你的<span class="highlight">梦想简历</span>',
    'hero.subtitle': '几分钟内创建专业的、ATS优化的简历。智能AI建议、实时预览和精美模板 — 一站式完成。',
    'hero.cta1': '免费开始', 'hero.cta2': '查看模板',
    'features.title': '您需要的一切', 'features.subtitle': '创建完美简历的强大工具',
    'features.ai.title': 'AI 驱动', 'features.ai.desc': '针对您行业量身定制的摘要、技能和改进的智能建议。',
    'features.live.title': '实时编辑', 'features.live.desc': '输入时实时预览更新。通过智能刷新技术立即查看更改。',
    'features.templates.title': '精美模板', 'features.templates.desc': '专业设计的模板，兼容ATS且视觉惊艳。',
    'features.pdf.title': 'PDF 导出', 'features.pdf.desc': '一键下载高质量、可打印的PDF。',
    'features.theme.title': '深色/浅色模式', 'features.theme.desc': '自动切换主题，日夜舒适工作。',
    'features.cloud.title': '云存储', 'features.cloud.desc': '所有简历安全保存在云端。随时随地访问。',
    'footer.text': '用心打造 ❤️',
    'auth.login.title': '欢迎回来', 'auth.login.subtitle': '登录以继续使用您的帐户', 'auth.login.btn': '登录',
    'auth.register.title': '创建帐户', 'auth.register.subtitle': '开始制作您的专业简历', 'auth.register.btn': '创建帐户',
    'auth.name': '全名', 'auth.email': '邮箱', 'auth.password': '密码', 'auth.forgot': '忘记密码？',
    'auth.noAccount': '没有帐户？', 'auth.hasAccount': '已有帐户？',
    'dash.title': '仪表盘', 'dash.newResume': '新建简历',
    'dash.stats.total': '总简历数', 'dash.stats.edited': '本周编辑', 'dash.stats.ats': 'ATS 模板', 'dash.stats.ai': 'AI 辅助',
    'dash.empty': '还没有简历。创建您的第一个！', 'dash.edit': '编辑', 'dash.delete': '删除',
    'editor.save': '保存', 'editor.pdf': 'PDF', 'editor.autoResume': '自动简历', 'editor.suggestions': '建议',
    'editor.summary': '摘要', 'editor.improve': '改进', 'editor.skills': '技能', 'editor.coverLetter': '求职信',
    'editor.jobMatch': '职位匹配', 'editor.rewrite': '重写', 'editor.bullets': '要点',
    'section.personal': '个人信息', 'section.education': '教育', 'section.experience': '经验', 'section.skills': '技能',
    'section.certs': '证书', 'section.achievements': '成就', 'section.projects': '项目',
    'templates.title': '选择您的模板', 'templates.subtitle': '为您的简历选择专业设计的模板',
    'loading': '加载中...', 'saving': '保存中...', 'saved': '更改已保存',
    'close': '关闭', 'cancel': '取消', 'confirm': '确认', 'error': '出了点问题', 'success': '成功'
  },

  ar: {
    'nav.home': 'الرئيسية', 'nav.dashboard': 'لوحة التحكم', 'nav.editor': 'المحرر',
    'nav.templates': 'القوالب', 'nav.profile': 'الملف الشخصي', 'nav.signIn': 'تسجيل الدخول', 'nav.logout': 'تسجيل الخروج',
    'hero.badge': 'مدعوم بالذكاء الاصطناعي',
    'hero.title': 'ابنِ <span class="highlight">سيرتك الذاتية</span> مع الذكاء الاصطناعي',
    'hero.subtitle': 'أنشئ سيرًا ذاتية احترافية متوافقة مع ATS في دقائق. اقتراحات ذكية ومعاينة فورية وقوالب جميلة — كل شيء في مكان واحد.',
    'hero.cta1': 'ابدأ مجانًا', 'hero.cta2': 'عرض القوالب',
    'features.title': 'كل ما تحتاجه', 'features.subtitle': 'أدوات قوية لإنشاء السيرة الذاتية المثالية',
    'features.ai.title': 'مدعوم بالذكاء الاصطناعي', 'features.ai.desc': 'اقتراحات ذكية للملخصات والمهارات والتحسينات المصممة خصيصًا لمجالك.',
    'features.live.title': 'تحرير مباشر', 'features.live.desc': 'معاينة فورية أثناء الكتابة. شاهد التغييرات في الحال.',
    'features.templates.title': 'قوالب جميلة', 'features.templates.desc': 'قوالب مصممة باحترافية متوافقة مع ATS ومذهلة بصريًا.',
    'features.pdf.title': 'تصدير PDF', 'features.pdf.desc': 'حمّل PDF عالية الجودة جاهزة للطباعة بنقرة واحدة.',
    'features.theme.title': 'وضع داكن/فاتح', 'features.theme.desc': 'اعمل براحة مع التبديل التلقائي للسمة ليلاً ونهارًا.',
    'features.cloud.title': 'حفظ سحابي', 'features.cloud.desc': 'جميع سيرك الذاتية محفوظة بأمان في السحابة. يمكنك الوصول إليها من أي مكان.',
    'footer.text': 'صنع بـ ❤️',
    'auth.login.title': 'مرحبًا بعودتك', 'auth.login.subtitle': 'سجل الدخول للمتابعة', 'auth.login.btn': 'تسجيل الدخول',
    'auth.register.title': 'إنشاء حساب', 'auth.register.subtitle': 'ابدأ في بناء سيرتك الذاتية المهنية', 'auth.register.btn': 'إنشاء حساب',
    'auth.name': 'الاسم الكامل', 'auth.email': 'البريد الإلكتروني', 'auth.password': 'كلمة المرور', 'auth.forgot': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟', 'auth.hasAccount': 'لديك حساب بالفعل؟',
    'dash.title': 'لوحة التحكم', 'dash.newResume': 'سيرة ذاتية جديدة',
    'dash.stats.total': 'إجمالي السير', 'dash.stats.edited': 'محّرت هذا الأسبوع', 'dash.stats.ats': 'قوالب ATS', 'dash.stats.ai': 'مساعدة AI',
    'dash.empty': 'لا توجد سير ذاتية بعد. أنشئ أول واحدة!', 'dash.edit': 'تعديل', 'dash.delete': 'حذف',
    'editor.save': 'حفظ', 'editor.pdf': 'PDF', 'editor.autoResume': 'سيرة تلقائية', 'editor.suggestions': 'اقتراحات',
    'editor.summary': 'ملخص', 'editor.improve': 'تحسين', 'editor.skills': 'مهارات', 'editor.coverLetter': 'خطاب تقديمي',
    'editor.jobMatch': 'مطابقة وظيفة', 'editor.rewrite': 'إعادة كتابة', 'editor.bullets': 'نقاط',
    'section.personal': 'شخصي', 'section.education': 'التعليم', 'section.experience': 'الخبرة', 'section.skills': 'المهارات',
    'section.certs': 'الشهادات', 'section.achievements': 'الإنجازات', 'section.projects': 'المشاريع',
    'templates.title': 'اختر قالبك', 'templates.subtitle': 'اختر قالبًا مصممًا باحترافية لسيرتك الذاتية',
    'loading': 'جارٍ التحميل...', 'saving': 'جارٍ الحفظ...', 'saved': 'تم حفظ التغييرات',
    'close': 'إغلاق', 'cancel': 'إلغاء', 'confirm': 'تأكيد', 'error': 'حدث خطأ ما', 'success': 'نجاح'
  },

  pt: {
    'nav.home': 'Início', 'nav.dashboard': 'Painel', 'nav.editor': 'Editor',
    'nav.templates': 'Modelos', 'nav.profile': 'Perfil', 'nav.signIn': 'Entrar', 'nav.logout': 'Sair',
    'hero.badge': 'Impulsionado por IA',
    'hero.title': 'Construa seu <span class="highlight">Currículo dos Sonhos</span> com IA',
    'hero.subtitle': 'Crie currículos profissionais otimizados para ATS em minutos. Sugestões inteligentes de IA, pré-visualização em tempo real e belos modelos — tudo em um só lugar.',
    'hero.cta1': 'Comece Grátis', 'hero.cta2': 'Ver Modelos',
    'features.title': 'Tudo que Você Precisa', 'features.subtitle': 'Ferramentas poderosas para criar o currículo perfeito',
    'features.ai.title': 'Impulsionado por IA', 'features.ai.desc': 'Sugestões inteligentes para resumos, habilidades e melhorias adaptadas ao seu setor.',
    'features.live.title': 'Edição ao Vivo', 'features.live.desc': 'Pré-visualização em tempo real enquanto você digita. Veja as mudanças instantaneamente.',
    'features.templates.title': 'Modelos Lindos', 'features.templates.desc': 'Modelos projetados profissionalmente, compatíveis com ATS e visualmente impressionantes.',
    'features.pdf.title': 'Exportar PDF', 'features.pdf.desc': 'Baixe PDFs de alta qualidade prontos para impressão com um clique.',
    'features.theme.title': 'Modo Escuro/Claro', 'features.theme.desc': 'Trabalhe confortavelmente com alternância automática de tema para dia e noite.',
    'features.cloud.title': 'Salvar na Nuvem', 'features.cloud.desc': 'Todos os seus currículos são salvos com segurança na nuvem. Acesse de qualquer lugar.',
    'footer.text': 'Feito com ❤️',
    'auth.login.title': 'Bem-vindo de Volta', 'auth.login.subtitle': 'Entre para continuar', 'auth.login.btn': 'Entrar',
    'auth.register.title': 'Criar Conta', 'auth.register.subtitle': 'Comece a construir seu currículo profissional', 'auth.register.btn': 'Criar Conta',
    'auth.name': 'Nome Completo', 'auth.email': 'Email', 'auth.password': 'Senha', 'auth.forgot': 'Esqueceu a senha?',
    'auth.noAccount': 'Não tem uma conta?', 'auth.hasAccount': 'Já tem uma conta?',
    'dash.title': 'Painel', 'dash.newResume': 'Novo Currículo',
    'dash.stats.total': 'Total de Currículos', 'dash.stats.edited': 'Editados Esta Semana', 'dash.stats.ats': 'Modelos ATS', 'dash.stats.ai': 'Assistência IA',
    'dash.empty': 'Ainda não há currículos. Crie o primeiro!', 'dash.edit': 'Editar', 'dash.delete': 'Excluir',
    'editor.save': 'Salvar', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto Currículo', 'editor.suggestions': 'Sugestões',
    'editor.summary': 'Resumo', 'editor.improve': 'Melhorar', 'editor.skills': 'Habilidades', 'editor.coverLetter': 'Carta de Apresentação',
    'editor.jobMatch': 'Corresponder Vaga', 'editor.rewrite': 'Reescrever', 'editor.bullets': 'Tópicos',
    'section.personal': 'Pessoal', 'section.education': 'Educação', 'section.experience': 'Experiência', 'section.skills': 'Habilidades',
    'section.certs': 'Certificações', 'section.achievements': 'Conquistas', 'section.projects': 'Projetos',
    'templates.title': 'Escolha seu Modelo', 'templates.subtitle': 'Selecione um modelo projetado profissionalmente para seu currículo',
    'loading': 'Carregando...', 'saving': 'Salvando...', 'saved': 'Alterações salvas',
    'close': 'Fechar', 'cancel': 'Cancelar', 'confirm': 'Confirmar', 'error': 'Algo deu errado', 'success': 'Sucesso'
  },

  ru: {
    'nav.home': 'Главная', 'nav.dashboard': 'Панель', 'nav.editor': 'Редактор',
    'nav.templates': 'Шаблоны', 'nav.profile': 'Профиль', 'nav.signIn': 'Войти', 'nav.logout': 'Выйти',
    'hero.badge': 'На базе ИИ',
    'hero.title': 'Создай своё <span class="highlight">Резюме Мечты</span> с ИИ',
    'hero.subtitle': 'Создавайте профессиональные резюме, оптимизированные для ATS, за минуты. Умные предложения ИИ, предпросмотр в реальном времени и красивые шаблоны — всё в одном месте.',
    'hero.cta1': 'Начать Бесплатно', 'hero.cta2': 'Посмотреть Шаблоны',
    'features.title': 'Всё, что вам нужно', 'features.subtitle': 'Мощные инструменты для создания идеального резюме',
    'features.ai.title': 'На базе ИИ', 'features.ai.desc': 'Умные предложения для резюме, навыков и улучшений, адаптированные под вашу отрасль.',
    'features.live.title': 'Живое Редактирование', 'features.live.desc': 'Предпросмотр в реальном времени во время ввода. Мгновенно видите изменения.',
    'features.templates.title': 'Красивые Шаблоны', 'features.templates.desc': 'Профессионально разработанные шаблоны, совместимые с ATS и визуально впечатляющие.',
    'features.pdf.title': 'Экспорт PDF', 'features.pdf.desc': 'Скачивайте качественные PDF, готовые к печати, одним кликом.',
    'features.theme.title': 'Тёмный/Светлый Режим', 'features.theme.desc': 'Работайте с комфортом с автоматическим переключением темы для дня и ночи.',
    'features.cloud.title': 'Облачное Хранение', 'features.cloud.desc': 'Все резюме безопасно сохраняются в облаке. Доступ к ним с любого устройства.',
    'footer.text': 'Сделано с ❤️',
    'auth.login.title': 'С Возвращением', 'auth.login.subtitle': 'Войдите, чтобы продолжить', 'auth.login.btn': 'Войти',
    'auth.register.title': 'Создать Аккаунт', 'auth.register.subtitle': 'Начните создавать своё профессиональное резюме', 'auth.register.btn': 'Создать Аккаунт',
    'auth.name': 'Полное Имя', 'auth.email': 'Email', 'auth.password': 'Пароль', 'auth.forgot': 'Забыли пароль?',
    'auth.noAccount': 'Нет аккаунта?', 'auth.hasAccount': 'Уже есть аккаунт?',
    'dash.title': 'Панель', 'dash.newResume': 'Новое Резюме',
    'dash.stats.total': 'Всего Резюме', 'dash.stats.edited': 'Отредактировано На Этой Неделе', 'dash.stats.ats': 'ATS Шаблоны', 'dash.stats.ai': 'Помощь ИИ',
    'dash.empty': 'Пока нет резюме. Создайте первое!', 'dash.edit': 'Редактировать', 'dash.delete': 'Удалить',
    'editor.save': 'Сохранить', 'editor.pdf': 'PDF', 'editor.autoResume': 'Авто Резюме', 'editor.suggestions': 'Предложения',
    'editor.summary': 'Резюме', 'editor.improve': 'Улучшить', 'editor.skills': 'Навыки', 'editor.coverLetter': 'Сопроводительное Письмо',
    'editor.jobMatch': 'Соответствие Вакансии', 'editor.rewrite': 'Переписать', 'editor.bullets': 'Маркеры',
    'section.personal': 'Личное', 'section.education': 'Образование', 'section.experience': 'Опыт', 'section.skills': 'Навыки',
    'section.certs': 'Сертификаты', 'section.achievements': 'Достижения', 'section.projects': 'Проекты',
    'templates.title': 'Выберите Шаблон', 'templates.subtitle': 'Выберите профессионально разработанный шаблон для вашего резюме',
    'loading': 'Загрузка...', 'saving': 'Сохранение...', 'saved': 'Изменения сохранены',
    'close': 'Закрыть', 'cancel': 'Отмена', 'confirm': 'Подтвердить', 'error': 'Что-то пошло не так', 'success': 'Успех'
  },

  ja: {
    'nav.home': 'ホーム', 'nav.dashboard': 'ダッシュボード', 'nav.editor': 'エディター',
    'nav.templates': 'テンプレート', 'nav.profile': 'プロフィール', 'nav.signIn': 'ログイン', 'nav.logout': 'ログアウト',
    'hero.badge': 'AI搭載',
    'hero.title': 'AIで<span class="highlight">理想の履歴書</span>を作成',
    'hero.subtitle': 'プロフェッショナルでATS対応の履歴書を数分で作成。スマートなAI提案、リアルタイムプレビュー、美しいテンプレート — すべて1か所で。',
    'hero.cta1': '無料で始める', 'hero.cta2': 'テンプレートを見る',
    'features.title': '必要なすべて', 'features.subtitle': '完璧な履歴書を作成するための強力なツール',
    'features.ai.title': 'AI搭載', 'features.ai.desc': 'あなたの業界に合わせた要約、スキル、改善点のスマートな提案。',
    'features.live.title': 'ライブ編集', 'features.live.desc': '入力中にリアルタイムプレビュー。変更を即座に確認。',
    'features.templates.title': '美しいテンプレート', 'features.templates.desc': 'プロがデザインしたATS対応で視覚的に魅力的なテンプレート。',
    'features.pdf.title': 'PDF出力', 'features.pdf.desc': '高品質で印刷可能なPDFをワンクリックでダウンロード。',
    'features.theme.title': 'ダーク/ライトモード', 'features.theme.desc': '自動テーマ切り替えで昼夜快適に作業。',
    'features.cloud.title': 'クラウド保存', 'features.cloud.desc': '履歴書はすべてクラウドに安全に保存。どこからでもアクセス可能。',
    'footer.text': '愛を込めて ❤️',
    'auth.login.title': 'お帰りなさい', 'auth.login.subtitle': 'アカウントにログイン', 'auth.login.btn': 'ログイン',
    'auth.register.title': 'アカウント作成', 'auth.register.subtitle': 'プロフェッショナルな履歴書を作成', 'auth.register.btn': 'アカウント作成',
    'auth.name': '氏名', 'auth.email': 'メールアドレス', 'auth.password': 'パスワード', 'auth.forgot': 'パスワードをお忘れですか？',
    'auth.noAccount': 'アカウントをお持ちでない方', 'auth.hasAccount': 'すでにアカウントをお持ちの方',
    'dash.title': 'ダッシュボード', 'dash.newResume': '新規履歴書',
    'dash.stats.total': '履歴書総数', 'dash.stats.edited': '今週の編集数', 'dash.stats.ats': 'ATSテンプレート', 'dash.stats.ai': 'AIアシスト',
    'dash.empty': 'まだ履歴書がありません。最初のものを作成しましょう！', 'dash.edit': '編集', 'dash.delete': '削除',
    'editor.save': '保存', 'editor.pdf': 'PDF', 'editor.autoResume': '自動履歴書', 'editor.suggestions': '提案',
    'editor.summary': '要約', 'editor.improve': '改善', 'editor.skills': 'スキル', 'editor.coverLetter': 'カバーレター',
    'editor.jobMatch': 'ジョブマッチ', 'editor.rewrite': '書き直し', 'editor.bullets': '箇条書き',
    'section.personal': '個人情報', 'section.education': '学歴', 'section.experience': '職歴', 'section.skills': 'スキル',
    'section.certs': '資格', 'section.achievements': '実績', 'section.projects': 'プロジェクト',
    'templates.title': 'テンプレートを選択', 'templates.subtitle': 'プロがデザインしたテンプレートを選択',
    'loading': '読み込み中...', 'saving': '保存中...', 'saved': '変更を保存しました',
    'close': '閉じる', 'cancel': 'キャンセル', 'confirm': '確認', 'error': 'エラーが発生しました', 'success': '成功'
  },

  it: {
    'nav.home': 'Home', 'nav.dashboard': 'Dashboard', 'nav.editor': 'Editor',
    'nav.templates': 'Modelli', 'nav.profile': 'Profilo', 'nav.signIn': 'Accedi', 'nav.logout': 'Esci',
    'hero.badge': 'Alimentato da IA',
    'hero.title': 'Costruisci il tuo <span class="highlight">Curriculum dei Sogni</span> con l\'IA',
    'hero.subtitle': 'Crea curriculum professionali ottimizzati per ATS in minuti. Suggerimenti AI intelligenti, anteprima in tempo reale e splendidi modelli — tutto in un posto.',
    'hero.cta1': 'Inizia Gratis', 'hero.cta2': 'Vedi Modelli',
    'features.title': 'Tutto ciò di cui hai bisogno', 'features.subtitle': 'Strumenti potenti per creare il curriculum perfetto',
    'features.ai.title': 'Alimentato da IA', 'features.ai.desc': 'Suggerimenti intelligenti per riepiloghi, competenze e miglioramenti su misura per il tuo settore.',
    'features.live.title': 'Modifica in Diretta', 'features.live.desc': 'Anteprima in tempo reale mentre digiti. Vedi le modifiche all\'istante.',
    'features.templates.title': 'Bellissimi Modelli', 'features.templates.desc': 'Modelli progettati professionalmente, compatibili ATS e visivamente sbalorditivi.',
    'features.pdf.title': 'Esporta PDF', 'features.pdf.desc': 'Scarica PDF di alta qualità pronti per la stampa con un clic.',
    'features.theme.title': 'Modalità Scuro/Chiaro', 'features.theme.desc': 'Lavora comodamente con il cambio automatico del tema per giorno e notte.',
    'features.cloud.title': 'Salvataggio Cloud', 'features.cloud.desc': 'Tutti i tuoi curriculum sono salvati in modo sicuro nel cloud. Accedi da ovunque.',
    'footer.text': 'Fatto con ❤️',
    'auth.login.title': 'Bentornato', 'auth.login.subtitle': 'Accedi per continuare', 'auth.login.btn': 'Accedi',
    'auth.register.title': 'Crea Account', 'auth.register.subtitle': 'Inizia a costruire il tuo curriculum professionale', 'auth.register.btn': 'Crea Account',
    'auth.name': 'Nome Completo', 'auth.email': 'Email', 'auth.password': 'Password', 'auth.forgot': 'Password dimenticata?',
    'auth.noAccount': 'Non hai un account?', 'auth.hasAccount': 'Hai già un account?',
    'dash.title': 'Dashboard', 'dash.newResume': 'Nuovo Curriculum',
    'dash.stats.total': 'Curriculum Totali', 'dash.stats.edited': 'Modificati Questa Settimana', 'dash.stats.ats': 'Modelli ATS', 'dash.stats.ai': 'Assistenza IA',
    'dash.empty': 'Ancora nessun curriculum. Crea il primo!', 'dash.edit': 'Modifica', 'dash.delete': 'Elimina',
    'editor.save': 'Salva', 'editor.pdf': 'PDF', 'editor.autoResume': 'Auto Curriculum', 'editor.suggestions': 'Suggerimenti',
    'editor.summary': 'Riepilogo', 'editor.improve': 'Migliora', 'editor.skills': 'Competenze', 'editor.coverLetter': 'Lettera di Presentazione',
    'editor.jobMatch': 'Abbinamento Lavoro', 'editor.rewrite': 'Riscrivi', 'editor.bullets': 'Elenchi',
    'section.personal': 'Personale', 'section.education': 'Istruzione', 'section.experience': 'Esperienza', 'section.skills': 'Competenze',
    'section.certs': 'Certificazioni', 'section.achievements': 'Risultati', 'section.projects': 'Progetti',
    'templates.title': 'Scegli il tuo Modello', 'templates.subtitle': 'Seleziona un modello progettato professionalmente per il tuo curriculum',
    'loading': 'Caricamento...', 'saving': 'Salvataggio...', 'saved': 'Modifiche salvate',
    'close': 'Chiudi', 'cancel': 'Annulla', 'confirm': 'Conferma', 'error': 'Qualcosa è andato storto', 'success': 'Successo'
  },

  ko: {
    'nav.home': '홈', 'nav.dashboard': '대시보드', 'nav.editor': '에디터',
    'nav.templates': '템플릿', 'nav.profile': '프로필', 'nav.signIn': '로그인', 'nav.logout': '로그아웃',
    'hero.badge': 'AI 기반',
    'hero.title': 'AI로 <span class="highlight">꿈의 이력서</span>를 만드세요',
    'hero.subtitle': '몇 분 만에 전문적이고 ATS에 최적화된 이력서를 만드세요. 스마트 AI 제안, 실시간 미리보기, 아름다운 템플릿 — 모두 한곳에서.',
    'hero.cta1': '무료로 시작하기', 'hero.cta2': '템플릿 보기',
    'features.title': '필요한 모든 것', 'features.subtitle': '완벽한 이력서를 만들기 위한 강력한 도구',
    'features.ai.title': 'AI 기반', 'features.ai.desc': '귀하의 업계에 맞춰진 요약, 기술 및 개선을 위한 스마트 제안.',
    'features.live.title': '실시간 편집', 'features.live.desc': '입력하면서 실시간 미리보기. 스마트 새로고침 기술로 변경사항을 즉시 확인하세요.',
    'features.templates.title': '아름다운 템플릿', 'features.templates.desc': '전문적으로 디자인된 ATS 친화적이며 시각적으로 뛰어난 템플릿.',
    'features.pdf.title': 'PDF 내보내기', 'features.pdf.desc': '한 번의 클릭으로 고품질 인쇄 가능 PDF를 다운로드하세요.',
    'features.theme.title': '다크/라이트 모드', 'features.theme.desc': '낮과 밤의 자동 테마 전환으로 편안하게 작업하세요.',
    'features.cloud.title': '클라우드 저장', 'features.cloud.desc': '모든 이력서가 클라우드에 안전하게 저장됩니다. 어디서나 액세스하세요.',
    'footer.text': '❤️로 만들었습니다',
    'auth.login.title': '돌아오신 것을 환영합니다', 'auth.login.subtitle': '계속하려면 로그인하세요', 'auth.login.btn': '로그인',
    'auth.register.title': '계정 만들기', 'auth.register.subtitle': '전문 이력서 만들기 시작', 'auth.register.btn': '계정 만들기',
    'auth.name': '성함', 'auth.email': '이메일', 'auth.password': '비밀번호', 'auth.forgot': '비밀번호를 잊으셨나요?',
    'auth.noAccount': '계정이 없으신가요?', 'auth.hasAccount': '이미 계정이 있으신가요?',
    'dash.title': '대시보드', 'dash.newResume': '새 이력서',
    'dash.stats.total': '총 이력서', 'dash.stats.edited': '이번 주 편집', 'dash.stats.ats': 'ATS 템플릿', 'dash.stats.ai': 'AI 도움',
    'dash.empty': '아직 이력서가 없습니다. 첫 번째를 만들어보세요!', 'dash.edit': '편집', 'dash.delete': '삭제',
    'editor.save': '저장', 'editor.pdf': 'PDF', 'editor.autoResume': '자동 이력서', 'editor.suggestions': '제안',
    'editor.summary': '요약', 'editor.improve': '개선', 'editor.skills': '기술', 'editor.coverLetter': '자기소개서',
    'editor.jobMatch': '직무 매칭', 'editor.rewrite': '다시 쓰기', 'editor.bullets': '글머리',
    'section.personal': '개인정보', 'section.education': '학력', 'section.experience': '경력', 'section.skills': '기술',
    'section.certs': '자격증', 'section.achievements': '성과', 'section.projects': '프로젝트',
    'templates.title': '템플릿 선택', 'templates.subtitle': '이력서에 사용할 전문적으로 디자인된 템플릿을 선택하세요',
    'loading': '로딩 중...', 'saving': '저장 중...', 'saved': '변경사항이 저장되었습니다',
    'close': '닫기', 'cancel': '취소', 'confirm': '확인', 'error': '문제가 발생했습니다', 'success': '성공'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  try {
    return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
  } catch (_) {
    return key;
  }
}

function translatePage() {
  try {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var translated = t(key);
      if (translated !== key) el.innerHTML = translated;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var translated = t(key);
      if (translated !== key) el.placeholder = translated;
    });
  } catch (_) {}
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  updateLangButton();
  translatePage();
}

function updateLangButton() {
  const btn = document.querySelector('.lang-toggle');
  if (!btn) return;
  const langName = languages[currentLang] || currentLang;
  const textSpan = btn.querySelector('span');
  if (textSpan) textSpan.textContent = langName;
}

function toggleLanguage() {
  const codes = Object.keys(languages);
  const idx = codes.indexOf(currentLang);
  setLanguage(codes[(idx + 1) % codes.length]);
}

function openLanguagePicker() {
  const existing = document.querySelector('.lang-dropdown');
  if (existing) { existing.remove(); return; }
  const btn = document.querySelector('.lang-toggle');
  if (!btn) return;
  const dropdown = document.createElement('div');
  dropdown.className = 'lang-dropdown';
  dropdown.style.cssText = 'position:absolute;top:100%;right:0;margin-top:4px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-lg);z-index:100;min-width:160px;max-height:300px;overflow-y:auto;padding:4px';
  Object.entries(languages).forEach(([code, name]) => {
    const item = document.createElement('button');
    item.textContent = name;
    item.style.cssText = 'display:block;width:100%;padding:8px 12px;border:none;background:transparent;color:var(--text);font-size:13px;cursor:pointer;border-radius:6px;text-align:left;font-family:inherit';
    item.onmouseenter = () => item.style.background = 'var(--primary-light)';
    item.onmouseleave = () => item.style.background = 'transparent';
    item.onclick = () => { setLanguage(code); dropdown.remove(); };
    if (code === currentLang) item.style.background = 'var(--primary-light)';
    dropdown.appendChild(item);
  });
  btn.parentElement.style.position = 'relative';
  btn.parentElement.appendChild(dropdown);
  document.addEventListener('click', function closePicker(e) {
    if (!dropdown.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      dropdown.remove();
      document.removeEventListener('click', closePicker);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  if (saved !== 'en') {
    currentLang = saved;
    document.documentElement.setAttribute('lang', saved);
  }
});
