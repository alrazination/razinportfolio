/* =====================================================================
   RAZIN ABDULLAH — PORTFOLIO SCRIPT
   Plain JavaScript, no build step, no dependencies.

   Sections in this file:
   1. Site configuration      — edit name, contact info, hero video here
   2. Project data            — add/remove portfolio projects here
   3. Reduced motion helper
   4. Navigation (scroll state + mobile menu)
   5. Scroll-reveal animations
   6. Hero role-text rotation + parallax
   7. Selected work carousel (renders project cards from the data above)
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
  // Additional hero statements the role text rotates through as the
  // visitor scrolls past the hero. Keep these short.
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
   - link: leave "" to show a "coming soon" placeholder page, or paste
     a full URL (including https://) to link to a live project.
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
    title: "PowerPoint to Interactive Learning",
    category: "eLearning Development",
    image: "assets/images/projects/project-02.svg",
    description: "A static presentation rebuilt as an interactive, self-paced learning experience.",
    cta: "View project",
    link: "projects/project-02.html"
  },
  {
    title: "Learning Evaluation Experience",
    category: "Learning Evaluation",
    image: "assets/images/projects/project-03.svg",
    description: "Evaluation built directly into the learning experience, rather than bolted on afterwards.",
    cta: "View project",
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

  // Close mobile menu after a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------------------------------------------------------------------
   5. SCROLL-REVEAL ANIMATIONS
   Elements with the .reveal class fade/slide in once they enter the
   viewport. Disabled entirely under reduced-motion (see CSS + guard
   below), where everything is simply visible.
   --------------------------------------------------------------------- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ---------------------------------------------------------------------
   6. HERO ROLE ROTATION + PARALLAX
   As the visitor scrolls through the hero, the role text swaps between
   the statements in siteConfig.heroRoles, and the video/text move at
   slightly different speeds for a subtle cinematic parallax.
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
        // Autoplay was blocked — the poster image still shows, so the
        // hero never looks broken. This is common when double-clicking
        // index.html open directly rather than serving it (see README).
      });
    }
  }

  // If the hero video fails to load (e.g. placeholder file missing),
  // hide it and let the animated gradient fallback underneath show
  // through instead of a broken video element.
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
      // Background moves slowest, text moves slightly faster (parallax)
      heroMedia.style.transform = `translateY(${progress * heroHeight * 0.1}px) scale(${1 + progress * 0.06})`;
      heroContent.style.transform = `translateY(${progress * heroHeight * 0.18}px)`;
      heroContent.style.opacity = String(1 - progress * 1.1);
    }

    // Swap role text at two scroll thresholds within the hero
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
      }, 220);
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
   7. SELECTED WORK CAROUSEL
   Renders project cards from the `projects` array above into the
   horizontal track, and wires up the prev/next buttons.
   --------------------------------------------------------------------- */
(function initWork() {
  const track = document.getElementById('workTrack');
  const prevBtn = document.getElementById('workPrev');
  const nextBtn = document.getElementById('workNext');
  if (!track) return;

  projects.forEach((project, i) => {
    const card = document.createElement('a');
    card.className = 'project-card reveal';
    // Projects without a real link fall back to the matching
    // placeholder page under /projects/, so the click always works.
    card.href = project.link || `projects/project-0${i + 1}.html`;

    const num = String(i + 1).padStart(2, '0');

    card.innerHTML = `
      <div class="project-card__media">
        <img src="${project.image}" alt="" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="project-card__placeholder" style="display:none;">Project ${num} — image placeholder</div>
      </div>
      <div class="project-card__category">${project.category}</div>
      <div class="project-card__title">${project.title}</div>
      <div class="project-card__desc">${project.description}</div>
      <div class="project-card__cta">${project.cta} <span class="arrow">→</span></div>
    `;
    track.appendChild(card);
  });

  // Re-observe newly injected .reveal cards
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    track.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    track.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  function scrollByCard(direction) {
    const card = track.querySelector('.project-card');
    const distance = card ? card.getBoundingClientRect().width + 28 : 400;
    track.scrollBy({ left: distance * direction, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));
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
