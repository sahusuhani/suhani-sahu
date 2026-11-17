document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------
     1. SCROLL REVEAL ANIMATION
     Fades and slides elements up as they appear
  --------------------------------------------- */

  const revealTargets = document.querySelectorAll(`
    .about-heading,
    .about-copy > *,
    .section-introduction,
    .education-item,
    .work-item,
    .skills-heading,
    .personal-heading,
    .personal-card,
    .achievement-heading,
    .achievement,
    .achievement-note,
    .certification,
    .contact-heading span,
    .contact-bottom
  `);

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));


  /* ---------------------------------------------
     2. SCROLL PROGRESS BAR
     The coral line at the very top of the page
  --------------------------------------------- */

  const progressBar = document.querySelector(".scroll-progress");

  function updateProgress() {
    const scrollTop = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = percent + "%";
    }
  }


  /* ---------------------------------------------
     3. ACTIVE NAV LINK
     Highlights the link of the section you are in
  --------------------------------------------- */

  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {
    let currentId = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId
      );
    });
  }


  /* ---------------------------------------------
     Run on scroll and once on load
  --------------------------------------------- */

  window.addEventListener(
    "scroll",
    () => {
      updateProgress();
      updateActiveLink();
    },
    { passive: true }
  );

  updateProgress();
  updateActiveLink();

});