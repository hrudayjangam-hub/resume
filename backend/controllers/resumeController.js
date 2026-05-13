const Resume = require('../models/Resume');
const { sanitizeResumeData } = require('../utils/helpers');

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResume = async (req, res) => {
  try {
    const data = sanitizeResumeData(req.body);
    const resume = await Resume.create({ ...data, userId: req.user._id });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const data = sanitizeResumeData(req.body);
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchResumeSection = async (req, res) => {
  try {
    const { section, data } = req.body;
    const validSections = ['personalInfo', 'education', 'experience', 'skills', 'certifications', 'projects', 'customization', 'achievements', 'title', 'template'];
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section' });
    }
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (section === 'title' || section === 'template') {
      resume[section] = data;
    } else {
      resume[section] = data;
    }
    resume.updatedAt = Date.now();
    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getResumes, getResume, createResume, updateResume, patchResumeSection, deleteResume };
