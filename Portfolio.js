// ==================== Theme Toggle ====================
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('toggle-theme');

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      htmlEl.classList.add('dark');
    }
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  const isDark = htmlEl.classList.contains('dark');
  if (isDark) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = htmlEl.classList.contains('dark');
  if (isDark) {
    htmlEl.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlEl.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  updateThemeIcon();
});

initTheme();

// ==================== Mobile Menu ====================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.add('active');
});

mobileCloseBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ==================== Typing Animation ====================
const typingElement = document.getElementById('typing-animation');
const typingTexts = ['Software Developer  ', 'Data Analyst  ', 'Front-End Developer   '];
let textIndex = 0;

function typeText(text, callback) {
  let charIndex = 0;
  typingElement.textContent = '';
  
  const typeInterval = setInterval(() => {
    if (charIndex < text.length) {
      typingElement.textContent += text[charIndex];
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        eraseText(callback);
      }, 2000);
    }
  }, 100);
}

function eraseText(callback) {
  const text = typingElement.textContent;
  let charIndex = text.length;
  
  const eraseInterval = setInterval(() => {
    if (charIndex > 0) {
      typingElement.textContent = text.substring(0, charIndex - 1);
      charIndex--;
    } else {
      clearInterval(eraseInterval);
      callback();
    }
  }, 50);
}

function startTypingAnimation() {
  typeText(typingTexts[textIndex], () => {
    textIndex = (textIndex + 1) % typingTexts.length;
    startTypingAnimation();
  });
}

startTypingAnimation();

// ==================== Project Management ====================
const PROJECT_DETAILS = [
  {
    title: 'Ecommerce Website',
    icon: '🛍️',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>Developed a responsive e-commerce website with expertise in designing key pages, integrating interactive elements, and applying e-commerce principles.</p>
      <h4>Technologies Used</h4>
      <p>HTML, CSS, JavaScript, Bootstrap</p>
      <h4>Key Features</h4>
      <ul>
        <li>Responsive home page with modern design</li>
        <li>Interactive shop page with product filtering</li>
        <li>Detailed single product pages</li>
        <li>Blog section for content marketing</li>
        <li>Functional shopping cart with checkout flow</li>
      </ul>
    `
  },
  {
    title: 'Gemini Clone',
    icon: '🤖',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>React-based web application replicating the Google Gemini AI chatbot interface and functionality.</p>
      <h4>Technologies Used</h4>
      <p>React, CSS, Google Gemini API</p>
      <h4>Key Features</h4>
      <ul>
        <li>Interactive chat interface with smooth animations</li>
        <li>Google Gemini API integration for AI responses</li>
        <li>React component architecture for maintainability</li>
        <li>Real-time message handling and display</li>
      </ul>
    `
  },
  {
    title: 'Hospital Management System',
    icon: '🏥',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>Developed a console-based Hospital Management System with comprehensive features for managing healthcare operations.</p>
      <h4>Technologies Used</h4>
      <p>C++, Object-Oriented Programming (OOP), File Handling</p>
      <h4>Key Features</h4>
      <ul>
        <li>Patient record management with CRUD operations</li>
        <li>Doctor information database</li>
        <li>Appointment scheduling system</li>
        <li>File-based data persistence</li>
        <li>OOP principles for clean architecture</li>
      </ul>
    `
  },
  {
    title: 'Pizza Sales Analysis',
    icon: '🍕',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>Comprehensive data analysis project using MySQL to extract insights from pizza sales data.</p>
      <h4>Technologies Used</h4>
      <p>MySQL, SQL Queries, Data Analysis</p>
      <h4>Key Insights</h4>
      <ul>
        <li>Identified peak sales periods and patterns</li>
        <li>Analyzed customer preferences and trends</li>
        <li>Optimized inventory management recommendations</li>
        <li>Developed marketing strategy insights</li>
      </ul>
    `
  },
  {
    title: 'Employee Performance Dashboard',
    icon: '📊',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>Interactive Power BI dashboard for analyzing employee performance metrics and retention patterns.</p>
      <h4>Technologies Used</h4>
      <p>Power BI, DAX, Data Visualization</p>
      <h4>Key Features</h4>
      <ul>
        <li>Performance trend visualizations</li>
        <li>Retention metrics and analysis</li>
        <li>Interactive filters and drill-down capabilities</li>
        <li>Actionable insights for HR management</li>
        <li>Real-time data refresh capabilities</li>
      </ul>
    `
  },
  {
    title: 'Diwali Sale Analysis',
    icon: '🎉',
    fullDesc: `
      <h4>Project Overview</h4>
      <p>Python-based sentiment analysis project to improve sales strategies through customer feedback analysis.</p>
      <h4>Technologies Used</h4>
      <p>Python, NumPy, Pandas, Sentiment Analysis</p>
      <h4>Key Deliverables</h4>
      <ul>
        <li>Customer review sentiment analysis</li>
        <li>Rating patterns and correlations</li>
        <li>Sales improvement recommendations</li>
        <li>Data-driven marketing strategies</li>
      </ul>
    `
  }
];

const STORAGE_KEY = 'portfolio_projects';

// Load saved projects from localStorage
function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error loading projects:', e);
    return [];
  }
}

// Save projects to localStorage
function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects:', e);
  }
}

// Render all projects
function renderProjects() {
  const grid = document.getElementById('portfolio-grid');
  const userProjects = loadProjects();
  const icons = ['🎨', '💼', '🚀', '⭐', '🔧', '🌟', '💡', '⚡'];
  
  // Clear only user-added projects
  const userCards = grid.querySelectorAll('.project-card.user-project');
  userCards.forEach(card => card.remove());
  
  // Add user projects
  userProjects.forEach((project, index) => {
    const card = createProjectCard(
      project.title,
      project.desc,
      icons[index % icons.length],
      true,
      index
    );
    grid.appendChild(card);
  });
}

// Create project card element
function createProjectCard(title, desc, icon, isUserProject = false, userIndex = null) {
  const card = document.createElement('div');
  card.className = 'project-card' + (isUserProject ? ' user-project' : '');
  
  card.innerHTML = `
    <div class="project-icon">${icon}</div>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(desc)}</p>
    <button class="btn-view">View Details</button>
    ${isUserProject ? `<button class="btn-delete" data-index="${userIndex}" style="position: absolute; top: 1rem; right: 1rem; background: var(--destructive, #ef4444); color: white; border: none; width: 2rem; height: 2rem; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-trash"></i></button>` : ''}
  `;
  
  const viewBtn = card.querySelector('.btn-view');
  viewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isUserProject) {
      showUserProjectDetail(title, icon, desc);
    } else {
      const projectIndex = parseInt(card.dataset.project);
      showProjectDetail(projectIndex);
    }
  });
  
  if (isUserProject) {
    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this project?')) {
        const projects = loadProjects();
        projects.splice(userIndex, 1);
        saveProjects(projects);
        renderProjects();
      }
    });
  }
  
  return card;
}

// Show default project detail
function showProjectDetail(index) {
  const project = PROJECT_DETAILS[index];
  if (!project) return;
  
  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('project-detail-content');
  
  content.innerHTML = `
    <div style="text-align: center; font-size: 4rem; margin-bottom: 1.5rem;">
      ${project.icon}
    </div>
    <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
    <div style="color: var(--text-secondary);">
      ${project.fullDesc}
    </div>
  `;
  
  modal.classList.add('show');
}

// Show user project detail
function showUserProjectDetail(title, icon, desc) {
  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('project-detail-content');
  
  content.innerHTML = `
    <div style="text-align: center; font-size: 4rem; margin-bottom: 1.5rem;">
      ${icon}
    </div>
    <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${escapeHtml(title)}</h2>
    <div style="color: var(--text-secondary); line-height: 1.8;">
      <p>${escapeHtml(desc)}</p>
    </div>
  `;
  
  modal.classList.add('show');
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Modal controls
const addModal = document.getElementById('add-modal');
const detailModal = document.getElementById('detail-modal');
const addBtn = document.getElementById('add-project-btn');
const cancelBtn = document.getElementById('cancel-add');
const closeDetailBtn = document.getElementById('close-detail');
const addForm = document.getElementById('add-project-form');

addBtn.addEventListener('click', () => {
  addModal.classList.add('show');
});

cancelBtn.addEventListener('click', () => {
  addModal.classList.remove('show');
  addForm.reset();
});

closeDetailBtn.addEventListener('click', () => {
  detailModal.classList.remove('show');
});

// Close modals when clicking backdrop
[addModal, detailModal].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      addForm.reset();
    }
  });
});

// Add new project
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('project-title').value.trim();
  const desc = document.getElementById('project-desc').value.trim();
  
  if (!title || !desc) {
    alert('Please provide both title and description');
    return;
  }
  
  const projects = loadProjects();
  projects.push({ title, desc, created: Date.now() });
  saveProjects(projects);
  
  renderProjects();
  addModal.classList.remove('show');
  addForm.reset();
});

// Add click handlers to default project cards
document.querySelectorAll('.project-card[data-project]').forEach(card => {
  const viewBtn = card.querySelector('.btn-view');
  viewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const index = parseInt(card.dataset.project);
    showProjectDetail(index);
  });
});

// Initial render
renderProjects();

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});