const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const scrollProgress = document.getElementById("scrollProgress");
const copyEmail = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");
const projectModal = document.getElementById("projectModal");
const galleryModal = document.getElementById("galleryModal");

const projectData = {
  "cleaning-stock": {
    category: "Inventory Management",
    year: "2026",
    title: "Cleaning Stock Management System",
    image: "assets/projects/cleaning-stock-dashboard.webp",
    summary: "An internal inventory system for managing cleaning-material availability and transaction flows in a more structured, transparent, and traceable way.",
    challenge: "Stock, request, and movement data was fragmented, making it difficult to identify actual quantities, critical items, and transaction history quickly.",
    solution: "Built an integrated dashboard covering item masters, requests, incoming and outgoing goods, stock status, monthly reports, item details, and user management.",
    impact: "Improved stock visibility, supported replenishment prioritization, and simplified transaction tracking and data accountability.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Responsive UI"]
  },
  "production-dashboard": {
    category: "KPI & Production Reporting",
    year: "2026",
    title: "Production & Leader Dashboard",
    image: "assets/projects/production-dashboard.png",
    summary: "An operational dashboard that helps production leaders assess daily conditions from targets to line performance, supported by a cross-functional dashboard gallery.",
    challenge: "Output, target, WIP, rework, loss-time, and quality information needed to be interpreted quickly so abnormalities could be addressed immediately.",
    solution: "Combined key indicators, hourly production timelines, line and date filters, public dashboards, and cross-functional views such as PPIC, repair, IPQC, and OQC into one monitoring ecosystem.",
    impact: "Accelerated assessment of current conditions, clarified gaps against targets, and supported daily cross-team communication through consistent data views.",
    stack: ["PHP", "MySQL", "JavaScript", "KPI Design", "Data Visualization", "Cross-Function Dashboard"]
  },
  "work-instruction": {
    category: "Digital Standardization",
    year: "2026",
    title: "Digital Work Instruction System",
    image: "assets/projects/work-instruction-system.png",
    summary: "A digital work instruction system designed to maintain method consistency, visual clarity, and production-process revision control.",
    challenge: "Work instructions needed to be easy to create, update, trace, and understand without losing document structure or quality standards.",
    solution: "Structured product families, models, processes, stations, work steps, visual media, tools, specifications, cycle time, and revision workflows in one system.",
    impact: "Supported process standardization, accelerated access to work information, and improved document-change traceability.",
    stack: ["PHP", "MySQL", "Document Workflow", "Visual Instruction", "Responsive Web"]
  },
  "production-kpi": {
    category: "Performance Management",
    year: "2026",
    title: "Production KPI Dashboard",
    image: "assets/projects/production-kpi-dashboard.webp",
    summary: "A management-level dashboard presenting operational health, performance trends, achievement, and areas requiring attention.",
    challenge: "Monthly KPI data needed to be translated into concise visuals so trends, gaps, and improvement priorities could be understood quickly.",
    solution: "Designed an operational health index, focus-area scores, monthly trends, achievement summaries, and top issues in an executive layout.",
    impact: "Enabled more consistent performance reviews, simplified priority setting, and improved data communication with stakeholders.",
    stack: ["KPI Framework", "Data Analysis", "Dashboard UI", "Excel/SQL", "Management Reporting"]
  },
  maintenance: {
    category: "Maintenance Management",
    year: "2026",
    title: "Maintenance Summary Dashboard",
    image: "assets/projects/maintenance-dashboard.png",
    summary: "A monitoring dashboard for controlling maintenance activities and making follow-up work more visible.",
    challenge: "Maintenance projects, inspection results, equipment condition, work evidence, and operational needs had to be monitored across multiple sources.",
    solution: "Unified project tracking, inspection status, equipment health, evidence availability, and supporting information in one dashboard.",
    impact: "Improved visibility of open work, simplified follow-up, and helped teams maintain facility and equipment readiness.",
    stack: ["PHP", "MySQL", "Project Tracking", "Inspection", "Dashboard Design"]
  },
  "mp-cost": {
    category: "Cost Analytics",
    year: "2026",
    title: "Manpower Cost Dashboard",
    image: "assets/projects/mp-cost-dashboard.webp",
    summary: "An analytical dashboard connecting labor cost with production output and cost per unit.",
    challenge: "Cost changes needed to be evaluated alongside output so the analysis would not stop at total cost without productivity context.",
    solution: "Presented output trends, total manpower cost, cost per unit, actual versus target, and identification of the best and worst periods.",
    impact: "Supported more objective cost-efficiency analysis and helped identify periods or areas requiring deeper investigation.",
    stack: ["Cost Analysis", "Production Data", "KPI Dashboard", "Excel/SQL", "Data Visualization"]
  }
};

const projectModalElements = {
  image: document.getElementById("modalImage"),
  category: document.getElementById("modalCategory"),
  year: document.getElementById("modalYear"),
  title: document.getElementById("modalTitle"),
  summary: document.getElementById("modalSummary"),
  challenge: document.getElementById("modalChallenge"),
  solution: document.getElementById("modalSolution"),
  impact: document.getElementById("modalImpact"),
  stack: document.getElementById("modalStack")
};

const galleryModalElements = {
  image: document.getElementById("galleryImage"),
  tag: document.getElementById("galleryTag"),
  title: document.getElementById("galleryTitle"),
  description: document.getElementById("galleryDescription")
};

let lastFocusedElement = null;

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

  header.classList.toggle("scrolled", scrollTop > 18);
  scrollProgress.style.width = `${percentage}%`;
}

function closeMobileMenu() {
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  savedTheme = null;
}

if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("portfolio-theme", next);
  } catch (error) {
    // Ignore storage errors and still switch theme for the current session.
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -45px" }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...mainNav.querySelectorAll("a")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -58%", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

copyEmail.addEventListener("click", async () => {
  const email = copyEmail.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied successfully.";
  } catch (error) {
    copyStatus.textContent = email;
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2600);
});

function getOpenModal() {
  if (galleryModal?.classList.contains("open")) return galleryModal;
  if (projectModal?.classList.contains("open")) return projectModal;
  return null;
}

function openProjectModal(projectKey, trigger) {
  const project = projectData[projectKey];
  if (!project) return;

  lastFocusedElement = trigger;
  projectModalElements.image.src = project.image;
  projectModalElements.image.alt = `${project.title} dashboard preview`;
  projectModalElements.category.textContent = project.category;
  projectModalElements.year.textContent = project.year;
  projectModalElements.title.textContent = project.title;
  projectModalElements.summary.textContent = project.summary;
  projectModalElements.challenge.textContent = project.challenge;
  projectModalElements.solution.textContent = project.solution;
  projectModalElements.impact.textContent = project.impact;
  projectModalElements.stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectModal.querySelector(".modal-close").focus();
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  if (!galleryModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
  if (lastFocusedElement) lastFocusedElement.focus();
}

function openGalleryModal(button) {
  lastFocusedElement = button;
  galleryModalElements.image.src = button.dataset.image;
  galleryModalElements.image.alt = button.dataset.title;
  galleryModalElements.tag.textContent = button.dataset.tag;
  galleryModalElements.title.textContent = button.dataset.title;
  galleryModalElements.description.textContent = button.dataset.desc;

  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  galleryModal.querySelector(".modal-close").focus();
}

function closeGalleryModal() {
  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");
  if (!projectModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".project-detail-button").forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
});

document.querySelectorAll(".gallery-open").forEach((button) => {
  button.addEventListener("click", () => openGalleryModal(button));
});

projectModal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

galleryModal.querySelectorAll("[data-close-gallery]").forEach((element) => {
  element.addEventListener("click", closeGalleryModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    if (galleryModal.classList.contains("open")) closeGalleryModal();
    else if (projectModal.classList.contains("open")) closeProjectModal();
  }

  const activeModal = getOpenModal();
  if (event.key === "Tab" && activeModal) {
    const focusable = [...activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hasAttribute("disabled"));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 920) closeMobileMenu();
});

updateScrollUI();
document.getElementById("year").textContent = new Date().getFullYear();
