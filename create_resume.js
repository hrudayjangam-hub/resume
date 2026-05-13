const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join('C:\\resume 2', '.env') });

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Resume' },
  template: { type: String, enum: ['modern', 'minimal', 'corporate', 'creative', 'ats'], default: 'modern' },
  personalInfo: {
    fullName: { type: String, default: '' }, email: { type: String, default: '' }, phone: { type: String, default: '' },
    location: { type: String, default: '' }, linkedin: { type: String, default: '' }, github: { type: String, default: '' }, portfolio: { type: String, default: '' },
    title: { type: String, default: '' }, summary: { type: String, default: '' }
  },
  education: [{ institution: String, degree: String, field: String, startDate: String, endDate: String, gpa: String, description: String }],
  experience: [{ company: String, position: String, location: String, startDate: String, endDate: String, current: Boolean, description: String, achievements: [String] }],
  skills: [{ name: String, level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] } }],
  certifications: [{ name: String, issuer: String, date: String, url: String }],
  projects: [{ title: String, description: String, technologies: [String], url: String, startDate: String, endDate: String }],
  customization: { primaryColor: String, fontFamily: String, fontSize: String, spacing: String, sectionOrder: [String] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

// Usage: node create_resume.js         (creates Rahul Sharma's resume)
//        node create_resume.js --priya (creates Priya Verma's resume)
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const users = await db.collection('users').find().toArray();
  if (!users.length) {
    console.log('No users found in DB. Create a user first via the web app.');
    process.exit(1);
  }
  const userId = users[0]._id;
  console.log('Using user:', users[0].name, users[0].email);

  const isPriya = process.argv.includes('--priya');
  const resumeData = isPriya ? {
    userId,
    title: 'Priya Verma - Frontend Developer Resume',
    template: 'modern',
    personalInfo: {
      fullName: 'Priya Verma',
      email: 'priya.verma@email.com',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      linkedin: 'linkedin.com/in/priyaverma',
      github: 'github.com/priyaverma',
      portfolio: 'priyaverma.dev',
      title: 'Frontend Developer',
      summary: 'Creative and detail-oriented Frontend Developer with a B.Tech in Information Technology and hands-on experience building responsive web applications. Proficient in HTML, CSS, JavaScript, React, and modern CSS frameworks like Tailwind CSS and Bootstrap. Known for strong communication skills, teamwork, and a fast-learning attitude. Passionate about crafting clean, user-friendly, and ATS-optimized interfaces that deliver exceptional user experiences.'
    },
    education: [{
      institution: 'Delhi Technological University',
      degree: 'B.Tech',
      field: 'Information Technology',
      startDate: '2021-08',
      endDate: '2025-06',
      gpa: '8.2/10',
      description: 'Relevant coursework: Data Structures & Algorithms, Web Development, Database Management, UI/UX Design, Software Engineering, Computer Networks.'
    }],
    experience: [{
      company: 'TechSolutions Pvt. Ltd.',
      position: 'Frontend Developer Intern',
      location: 'New Delhi, India',
      startDate: '2024-06',
      endDate: '2024-12',
      current: false,
      description: 'Developed responsive UI components using React and Tailwind CSS, improving page load speed by 30%. Collaborated with the design team to implement pixel-perfect Figma mockups. Participated in daily stand-ups and code reviews as part of an Agile team.',
      achievements: ['Reduced page load time by 30% through code splitting and lazy loading', 'Built 20+ reusable React components adopted across 3 projects']
    }],
    skills: [
      { name: 'HTML', level: 'expert' },
      { name: 'CSS', level: 'expert' },
      { name: 'JavaScript', level: 'advanced' },
      { name: 'React', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Bootstrap', level: 'advanced' },
      { name: 'Git', level: 'intermediate' },
      { name: 'GitHub', level: 'intermediate' },
      { name: 'UI/UX Design', level: 'intermediate' },
      { name: 'Responsive Design', level: 'advanced' },
      { name: 'Figma', level: 'intermediate' },
      { name: 'TypeScript', level: 'intermediate' }
    ],
    certifications: [],
    projects: [
      {
        title: 'E-commerce Website',
        description: 'Built a fully responsive e-commerce platform with React and Tailwind CSS featuring product listings, cart management, user authentication, and payment integration. Implemented state management using React Context API and optimized performance with lazy loading.',
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Stripe API'],
        url: '',
        startDate: '2024-09',
        endDate: '2024-11'
      },
      {
        title: 'Weather App',
        description: 'Developed a real-time weather application using vanilla JavaScript and OpenWeatherMap API. Features include geolocation-based weather data, 7-day forecasts, search by city, dark mode, and responsive design for all screen sizes.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API', 'Geolocation API'],
        url: '',
        startDate: '2024-03',
        endDate: '2024-04'
      },
      {
        title: 'AI Chatbot UI',
        description: 'Designed and developed an intuitive chatbot interface using React with streaming message support, typing indicators, and theme customization. Focused on accessibility, smooth animations, and mobile-first responsive design.',
        technologies: ['React', 'CSS Modules', 'WebSocket', 'Framer Motion'],
        url: '',
        startDate: '2024-06',
        endDate: '2024-08'
      }
    ],
    customization: {
      primaryColor: '#2563eb',
      fontFamily: 'Inter',
      fontSize: '14px',
      spacing: 'comfortable',
      sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects']
    }
  } : {
    userId,
    title: 'Rahul Sharma - Software Engineer Resume',
    template: 'modern',
    personalInfo: {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India',
      linkedin: 'linkedin.com/in/rahulsharma',
      github: 'github.com/rahulsharma',
      portfolio: 'rahulsharma.dev',
      title: 'Software Engineer',
      summary: 'Enthusiastic and detail-oriented Computer Science graduate with strong foundation in full-stack web development. Proficient in MERN stack, Python, and modern web technologies. Quick learner with excellent problem-solving skills and a passion for building scalable applications. Seeking opportunities to leverage technical expertise and teamwork in a dynamic software engineering role.'
    },
    education: [{
      institution: 'University of Mumbai',
      degree: 'B.Tech',
      field: 'Computer Science',
      startDate: '2021-08',
      endDate: '2025-06',
      gpa: '8.5/10',
      description: 'Relevant coursework: Data Structures & Algorithms, Database Management, Web Technologies, Machine Learning, Software Engineering, Cloud Computing.'
    }],
    experience: [],
    skills: [
      { name: 'HTML', level: 'advanced' },
      { name: 'CSS', level: 'advanced' },
      { name: 'JavaScript', level: 'advanced' },
      { name: 'React', level: 'intermediate' },
      { name: 'Node.js', level: 'intermediate' },
      { name: 'Express.js', level: 'intermediate' },
      { name: 'MongoDB', level: 'intermediate' },
      { name: 'Python', level: 'intermediate' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Git & GitHub', level: 'intermediate' },
      { name: 'REST API', level: 'intermediate' },
      { name: 'Firebase', level: 'beginner' },
      { name: 'VS Code', level: 'advanced' },
      { name: 'AI Tools', level: 'intermediate' }
    ],
    certifications: [
      { name: 'Full-Stack Web Development', issuer: 'Udemy', date: '2024-03', url: '' },
      { name: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', date: '2024-01', url: '' },
      { name: 'Python for Data Science', issuer: 'Coursera', date: '2023-11', url: '' }
    ],
    projects: [
      {
        title: 'AI Resume Builder',
        description: 'Built an AI-powered resume builder using React, Node.js, and OpenRouter API. Features include smart content generation, real-time preview, ATS-friendly templates, and PDF export. Implemented JWT authentication and MongoDB for data persistence.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'OpenRouter AI'],
        url: '',
        startDate: '2025-01',
        endDate: '2025-03'
      },
      {
        title: 'AI Video Generator',
        description: 'Developed a video generation platform leveraging AI APIs to create custom videos from text prompts. Built responsive UI with React and Tailwind CSS, integrated REST APIs for video processing, and implemented user authentication with Firebase.',
        technologies: ['React', 'Tailwind CSS', 'Firebase', 'AI APIs', 'Node.js'],
        url: '',
        startDate: '2024-09',
        endDate: '2024-12'
      },
      {
        title: 'Portfolio Website',
        description: 'Designed and developed a personal portfolio website showcasing projects and skills. Built with React and Tailwind CSS featuring smooth animations, responsive design, dark mode, and a contact form with email integration.',
        technologies: ['React', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS'],
        url: 'rahulsharma.dev',
        startDate: '2024-06',
        endDate: '2024-08'
      }
    ],
    customization: {
      primaryColor: '#2563eb',
      fontFamily: 'Inter',
      fontSize: '14px',
      spacing: 'comfortable',
      sectionOrder: ['personalInfo', 'education', 'skills', 'projects', 'certifications']
    }
  };

  const resume = await Resume.create(resumeData);
  console.log('Resume created successfully!');
  console.log('ID:', resume._id);
  console.log('Name:', isPriya ? 'Priya Verma' : 'Rahul Sharma');
  console.log('Open: http://localhost:5000/editor.html?id=' + resume._id);
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
