const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a')];

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => activeObserver.observe(section));

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  progress.style.width = `${pct}%`;
};
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.querySelector('.toast');
document.querySelector('.copy-email')?.addEventListener('click', async (e) => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email copied';
  } catch {
    toast.textContent = email;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});

const projects = {
  follo: {
    label: 'Backend Platform',
    title: 'Follo Construction',
    intro: 'A construction operations platform with booking workflows for delivery, crane, concrete and inspection activities.',
    ownership: [
      'Led a five-member cross-functional team.',
      'Re-architected backend services and delivered 84+ REST APIs.',
      'Worked on resource constraints and calendar-based time-slot workflows.',
      'Containerized the Node.js backend using Docker.'
    ],
    impact: 'Supported a platform serving 3,000+ customers and improved database performance across 23 APIs.',
    ai: 'Integrated an AI-powered booking experience with backend functions/APIs for slot availability, required-value collection, booking creation and booking-status retrieval.',
    tech: ['Node.js','Express.js','Angular','PostgreSQL','AWS','Docker','REST APIs','Conversational AI']
  },
  tax: {
    label: 'Enterprise Integration',
    title: 'Republic Services — Sales Tax Automation',
    intro: 'Enterprise backend automation for sales-tax processing and system-to-system integration workflows.',
    ownership: [
      'Led backend delivery within a six-member engineering team.',
      'Built services using Node.js, TypeScript, TypeORM and Microsoft SQL Server.',
      'Implemented three Salesforce system integrations.',
      'Supported requirement analysis, code reviews, releases and production issue resolution.'
    ],
    impact: 'Automated previously manual tax-processing steps and supported workflows processing hundreds of tax records.',
    ai: null,
    tech: ['Node.js','TypeScript','TypeORM','MSSQL','AWS','Salesforce','REST APIs']
  },
  textbook: {
    label: 'Applied AI',
    title: 'AI-Powered Textbook Publishing',
    intro: 'An end-to-end GenAI workflow that turns a user-defined textbook index into structured chapter content for document publishing.',
    ownership: [
      'Integrated OpenAI APIs from a Node.js backend.',
      'Orchestrated sequential content-generation calls.',
      'Added user confirmation checkpoints before continuing generation.',
      'Connected generated content to document-generation logic.'
    ],
    impact: 'Demonstrates practical LLM integration and workflow orchestration rather than a standalone chatbot.',
    ai: 'OpenAI API integration, prompt-driven generation, sequential LLM workflow orchestration and human-in-the-loop validation.',
    tech: ['Node.js','OpenAI API','LLM Integration','Prompt Workflows','Document Generation']
  },
  supportal: {
    label: 'Healthcare Platform',
    title: 'Supportal',
    intro: 'Healthcare appointment platform supporting Admin, Doctor and Patient roles.',
    ownership: [
      'Delivered 25+ secure REST APIs.',
      'Implemented authentication and user-management workflows.',
      'Built appointment-booking and healthcare workflow services.',
      'Contributed across backend and full-stack delivery.'
    ],
    impact: 'Created a secure API foundation for multi-role appointment and healthcare workflows.',
    ai: null,
    tech: ['Node.js','React.js','MongoDB','REST APIs','Authentication']
  }
};

const dialog = document.getElementById('projectDialog');
const dialogContent = document.getElementById('dialogContent');
const closeBtn = dialog.querySelector('.dialog-close');

function openProject(key){
  const project = projects[key];
  if (!project) return;
  dialogContent.innerHTML = `
    <span class="dialog-label">${project.label}</span>
    <h3>${project.title}</h3>
    <p class="dialog-intro">${project.intro}</p>
    <div class="dialog-grid">
      <div class="dialog-box">
        <h4>What I owned</h4>
        <ul>${project.ownership.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="dialog-box">
        <h4>Impact</h4>
        <p>${project.impact}</p>
      </div>
      ${project.ai ? `<div class="dialog-box" style="grid-column:1/-1"><h4>AI integration</h4><p>${project.ai}</p></div>` : ''}
    </div>
    <div class="dialog-tech">${project.tech.map(item => `<span>${item}</span>`).join('')}</div>
  `;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

document.querySelectorAll('.project-open').forEach(btn => btn.addEventListener('click', () => openProject(btn.dataset.project)));
closeBtn.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
