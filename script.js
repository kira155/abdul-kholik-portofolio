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
  "production-dashboard": {
    category: "Production Analytics",
    year: "2026",
    title: "Production & Leader Dashboard",
    image: "assets/projects/production-dashboard.png",
    summary: "A focused operational dashboard for reviewing production status and line performance.",
    challenge: "Targets, hourly output, WIP, rework, and loss-time data were spread across different views.",
    solution: "Combined the main production indicators, filters, and timelines in one consistent dashboard.",
    impact: "Made line conditions easier to review and supported faster daily coordination.",
    stack: ["PHP", "MySQL", "JavaScript", "KPI Design", "Data Visualization"]
  },
  "work-instruction": {
    category: "Digital Standardization",
    year: "2026",
    title: "Digital Work Instruction System",
    image: "assets/projects/work-instruction-system.png",
    summary: "A structured system for creating, updating, and tracing production work instructions.",
    challenge: "Process steps, visuals, standards, and revisions needed clearer control.",
    solution: "Organized instructions by product, model, process, station, work step, visual, tool, and cycle time.",
    impact: "Improved access to standards and simplified document revision tracking.",
    stack: ["PHP", "MySQL", "Document Workflow", "Responsive Web"]
  },
  "cleaning-stock": {
    category: "Inventory Control",
    year: "2026",
    title: "Cleaning Stock Management System",
    image: "assets/projects/cleaning-stock-dashboard.webp",
    summary: "An internal system for managing cleaning-material stock and transaction flow.",
    challenge: "Stock, requests, and movement history were difficult to monitor consistently.",
    solution: "Connected item masters, requests, incoming and outgoing goods, alerts, and reports.",
    impact: "Improved stock visibility and transaction traceability.",
    stack: ["PHP", "MySQL", "JavaScript", "Inventory System"]
  },
  "clone-scanner": {
    category: "Production Automation",
    year: "2026",
    title: "Clone Scanner — SSD / NVMe Detector",
    image: "assets/projects/gallery/clone-scanner-dashboard.jpg",
    summary: "A desktop utility for validating storage and system information after the cloning process.",
    challenge: "Multiple validation points had to be checked manually and recorded consistently.",
    solution: "Automated storage detection and checks for serial number, firmware, health, capacity, and Windows build.",
    impact: "Reduced repetitive checking and improved validation consistency.",
    stack: ["Desktop Utility", "Automation", "Hardware Detection", "Database Logging"]
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
