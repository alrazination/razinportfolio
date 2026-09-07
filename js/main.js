/* =====================================================================
   RAZIN ABDULLAH — PORTFOLIO SCRIPT (V2)
   Plain JavaScript, no build step, no dependencies.

   Sections in this file:
   1. Site configuration      — edit name, contact info, hero video here
   2. Project data            — add/remove portfolio projects here
   3. Reduced motion helper
   4. Navigation (scroll state + mobile menu)
   5. Hero role rotation + parallax
   6. Selected work list (renders project entries from the data above)
   7. Manifesto reveal (the one deliberate scroll moment on the page)
   8. Contact link wiring (email / LinkedIn)
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. SITE CONFIGURATION
   Edit these values to update contact details and the hero video.
   Leave email/linkedin blank until you have real details — the site
   will show a clearly-labelled placeholder instead of a broken link.
   --------------------------------------------------------------------- */
const siteConfig = {
  name: "Razin Abdullah",
  title: "Learning Experience Designer",
  email: "",           // e.g. "hello@razinabdullah.com"
  linkedin: "",        // e.g. "https://www.linkedin.com/in/razinabdullah"
  heroVideo: "assets/videos/hero.mp4",
  heroPoster: "assets/images/hero-poster.svg",
  // Additional role statements the hero rotates through as the visitor
  // scrolls past the hero. Keep these short.
  heroRoles: [
    "Learning Experience Designer",
    "Expert in Simulation Learning Design",
    "Expert in eLearning Development"
  ]
};

/* ---------------------------------------------------------------------
   2. PROJECT DATA
   To add a project: duplicate one object below and change its fields.
   - image: path to a photo/still representing the project
   - link: leave "" to auto-link to the matching /projects/project-0N.html
     placeholder, or paste a full URL to link to a live case study.
   The "Selected Work" section lays projects out in a repeating 3-part
   rhythm (featured / offset-right / offset-left), so a 4th, 5th, etc.
   project added here will pick the rhythm back up automatically.
   --------------------------------------------------------------------- */
const projects = [
  {
    title: "Customer Decision Simulation",
    category: "Simulation Learning",
    image: "assets/images/projects/project-01.svg",
    description: "A scenario-based learning experience where learners make decisions in realistic workplace situations.",
    cta: "Experience the project",
    link: "projects/project-01.html"
  },
  {
    title: "Learning Experience Transformation",
    category: "eLearning Development",
    image: "assets/images/projects/project-02.svg",
    description: "Static content rebuilt as an interactive, self-paced learning experience.",
    cta: "View case study",
    link: "projects/project-02.html"
  },
  {
    title: "Learning Evaluation Experience",
    category: "Learning Evaluation",
    image: "assets/images/projects/project-03.svg",
    description: "Evaluation built directly into the learning experience, rather than bolted on afterwards.",
    cta: "View case study",
    link: "projects/project-03.html"
  }
];

/* ---------------------------------------------------------------------
   3. REDUCED MOTION HELPER
   --------------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------------
   4. NAVIGATION
   --------------------------------------------------------------------- */
(function initNav() {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------------------------------------------------------------------
   5. HERO ROLE ROTATION + PARALLAX
   As the visitor scrolls through the hero, the role text swaps between
   the statements in siteConfig.heroRoles, and the media/text move at
   slightly different speeds for a subtle, restrained parallax.
   --------------------------------------------------------------------- */
(function initHero() {
  const hero = document.getElementById('hero');
  const heroMedia = document.getElementById('heroMedia');
  const heroContent = document.querySelector('.hero__content');
  const roleEl = document.getElementById('heroRole');
  const video = document.getElementById('heroVideo');
  const videoSource = video ? video.querySelector('source') : null;

  if (!hero) return;

  // siteConfig.heroVideo / heroPoster is the single source of truth.
  // Apply it here so editing main.js is enough — you don't also need
  // to touch the <video> tag in index.html.
  if (videoSource && siteConfig.heroVideo) {
    videoSource.src = siteConfig.heroVideo;
  }
  if (video && siteConfig.heroPoster) {
    video.setAttribute('poster', siteConfig.heroPoster);
  }
  if (video) {
    video.load(); // re-evaluate the source now that it may have changed
    // Some browsers (especially when a page is opened via file:// instead
    // of a local server) block autoplay until this is called explicitly.
    const playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {
        // Autoplay was blocked — the warm placeholder texture still
        // shows underneath, so the hero never looks broken.
      });
    }
  }

  // If the hero video fails to load (e.g. placeholder file missing),
  // hide it and let the placeholder texture underneath show through
  // instead of a broken video element.
  video.addEventListener('error', () => {
    const err = video.error;
    const codes = { 1: 'MEDIA_ERR_ABORTED', 2: 'MEDIA_ERR_NETWORK', 3: 'MEDIA_ERR_DECODE (often an unsupported codec)', 4: 'MEDIA_ERR_SRC_NOT_SUPPORTED (file missing, wrong path, or wrong format)' };
    console.warn(
      '[hero] Video failed to load:', siteConfig.heroVideo,
      err ? `— ${codes[err.code] || 'unknown error'} (code ${err.code})` : '',
      '\nCheck: 1) the file actually exists at that exact path/name, 2) it\'s a browser-playable H.264 .mp4, 3) you\'re viewing the site through a local server (see README) rather than double-clicking index.html.'
    );
    video.style.display = 'none';
  });

  let lastRoleIndex = 0;
  let ticking = false;

  function updateOnScroll() {
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY;
    const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

    if (!prefersReducedMotion) {
      heroMedia.style.transform = `translateY(${progress * heroHeight * 0.08}px) scale(${1 + progress * 0.05})`;
      heroContent.style.transform = `translateY(${progress * heroHeight * 0.14}px)`;
      heroContent.style.opacity = String(1 - progress * 1.1);
    }

    const roles = siteConfig.heroRoles;
    let targetIndex = 0;
    if (progress > 0.66) targetIndex = 2;
    else if (progress > 0.33) targetIndex = 1;

    if (targetIndex !== lastRoleIndex && roles[targetIndex]) {
      lastRoleIndex = targetIndex;
      roleEl.classList.add('is-swapping');
      window.setTimeout(() => {
        roleEl.textContent = roles[targetIndex];
        roleEl.classList.remove('is-swapping');
      }, 200);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }, { passive: true });

  updateOnScroll();
})();

/* ---------------------------------------------------------------------
   6. SELECTED WORK LIST
   Renders project entries from the `projects` array above. Layout
   variety (featured / offset-right / offset-left) is handled entirely
   in CSS via nth-of-type, so this stays a plain, boring render loop.
   --------------------------------------------------------------------- */
(function initWork() {
  const list = document.getElementById('workList');
  if (!list) return;

  projects.forEach((project, i) => {
    const num = String(i + 1).padStart(2, '0');
    const item = document.createElement('article');
    item.className = 'work__item';

    item.innerHTML = `
      <div class="work__media">
        <img src="${project.image}" alt="${project.title} — cover artwork" loading="lazy"
             onerror="this.style.display='none';">
      </div>
      <div class="work__body">
        <span class="work__num">Project ${num}</span>
        <span class="work__category">${project.category}</span>
        <h3 class="work__title">${project.title}</h3>
        <p class="work__desc">${project.description}</p>
        <a class="work__cta" href="${project.link || `projects/project-0${i + 1}.html`}">${project.cta} →</a>
      </div>
    `;
    list.appendChild(item);
  });
})();

/* ---------------------------------------------------------------------
   7. MANIFESTO REVEAL
   The one deliberate scroll-triggered moment on the page — everything
   else stays static and calm. Disabled entirely under reduced motion,
   where the manifesto is simply visible from the start.
   --------------------------------------------------------------------- */
(function initManifesto() {
  const el = document.querySelector('.manifesto');
  if (!el) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.9s ${prefersReducedMotion ? '0s' : 'cubic-bezier(0.22, 1, 0.36, 1)'}, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)`;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(el);
})();

/* ---------------------------------------------------------------------
   8. CONTACT LINK WIRING
   Fills in email/LinkedIn links from siteConfig if provided, otherwise
   leaves clearly-labelled placeholder text so nothing looks broken.
   --------------------------------------------------------------------- */
(function initContact() {
  const emailBtn = document.getElementById('contactEmailBtn');
  const emailLink = document.getElementById('contactEmailLink');
  const linkedinLink = document.getElementById('contactLinkedinLink');
  const footerLinkedin = document.getElementById('footerLinkedin');

  if (siteConfig.email) {
    const mailto = `mailto:${siteConfig.email}`;
    emailBtn.href = mailto;
    emailLink.href = mailto;
    emailLink.textContent = siteConfig.email;
  } else {
    emailBtn.removeAttribute('href');
    emailBtn.setAttribute('aria-disabled', 'true');
    emailBtn.style.opacity = '0.6';
    emailBtn.style.cursor = 'not-allowed';
    emailBtn.addEventListener('click', (e) => e.preventDefault());
  }

  if (siteConfig.linkedin) {
    linkedinLink.href = siteConfig.linkedin;
    linkedinLink.textContent = 'LinkedIn';
    footerLinkedin.href = siteConfig.linkedin;
  } else {
    linkedinLink.removeAttribute('target');
    linkedinLink.addEventListener('click', (e) => e.preventDefault());
    footerLinkedin.addEventListener('click', (e) => e.preventDefault());
  }
})();
