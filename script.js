/* ============================================================
   ZAYE'S PORTFOLIO — JAVASCRIPT
   ------------------------------------------------------------
   Small, dependency-free interactions:
     • light / dark pink theme
     • mobile navigation
     • active nav link + scroll progress
     • back-to-top button
     • scroll reveal animations
     • project detail modal
     • a very light cursor sparkle trail
     • profile photo fallback

   Everything is wrapped in one IIFE so nothing leaks into the
   global scope. Edit the constants near each section to tweak.
   ============================================================ */

(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const $ = (selector, context) => (context || document).querySelector(selector);
  const $$ = (selector, context) => Array.from((context || document).querySelectorAll(selector));

  /* ==========================================================
     1. THEME (light / dark)
     ========================================================== */
  const themeToggle = $("#theme-toggle");
  const themeMeta = $('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      return localStorage.getItem("zaye-theme");
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme, remember) {
    const isDark = theme === "dark";

    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";

    if (themeMeta) {
      themeMeta.setAttribute("content", isDark ? "#1b1318" : "#fff7fa");
    }

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }

    if (remember) {
      try {
        localStorage.setItem("zaye-theme", isDark ? "dark" : "light");
      } catch (error) {
        /* localStorage can be unavailable in private mode — the site still works. */
      }
    }
  }

  // Sync the button with the theme chosen by the inline <head> script.
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light", false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  // If the visitor hasn't picked a theme, follow their system preference.
  if (typeof systemDark.addEventListener === "function") {
    systemDark.addEventListener("change", function (event) {
      if (!savedTheme()) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    });
  }

  /* ==========================================================
     2. MOBILE NAVIGATION
     ========================================================== */
  const navToggle = $("#nav-toggle");
  const navMenu = $("#nav-menu");
  const siteHeader = $("#site-header");

  function isMenuOpen() {
    return !!(navToggle && navToggle.getAttribute("aria-expanded") === "true");
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    navMenu.classList.add("is-open");
  }

  function closeMenu(returnFocus) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navMenu.classList.remove("is-open");
    if (returnFocus) navToggle.focus();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $$("a", navMenu).forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      if (!isMenuOpen()) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !isMenuOpen()) return;
      const dialog = $("#project-dialog");
      if (dialog && dialog.open) return; // let the modal handle its own Escape
      closeMenu(true);
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", function (event) {
        if (event.matches) closeMenu();
      });
    }
  }

  /* ==========================================================
     3. SCROLL STATE: active nav, progress, header, back to top
     ========================================================== */
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  const progressBar = $("#scroll-progress");
  const toTopButton = $("#to-top");
  let activeSectionId = "";
  let scrollQueued = false;

  function setActiveLink(id) {
    if (id === activeSectionId) return;
    activeSectionId = id;

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateScrollUI() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewport = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Progress line
    if (progressBar) {
      const maxScroll = Math.max(1, docHeight - viewport);
      progressBar.style.transform = "scaleX(" + Math.min(1, scrollY / maxScroll) + ")";
    }

    // Header gets a stronger glass background once you scroll
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", scrollY > 12);
    }

    // Back-to-top visibility
    if (toTopButton) {
      toTopButton.classList.toggle("is-visible", scrollY > 600);
    }

    // Active navigation link
    if (sections.length) {
      const marker = scrollY + viewport * 0.34;
      let current = sections[0].id;

      sections.forEach(function (section) {
        if (section.offsetTop <= marker) current = section.id;
      });

      // Make sure the last link is active when you reach the bottom.
      if (scrollY + viewport >= docHeight - 4) {
        current = sections[sections.length - 1].id;
      }

      setActiveLink(current);
    }

    scrollQueued = false;
  }

  function queueScrollUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener("scroll", queueScrollUpdate, { passive: true });
  window.addEventListener("resize", queueScrollUpdate);
  updateScrollUI();

  if (toTopButton) {
    toTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    });
  }

  /* ==========================================================
     4. SCROLL REVEAL
     ========================================================== */
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Very old browser: show everything instead of hiding it forever.
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ==========================================================
     5. PROJECT MODAL
     ========================================================== */
  const dialog = $("#project-dialog");
  const modalTitle = $("#modal-title");
  const modalTags = $("#modal-tags");
  const modalBody = $("#modal-body");
  const modalClose = $("#modal-close");
  let lastTrigger = null;

  function openProject(projectId, trigger) {
    if (!dialog) return;

    const source = document.getElementById("details-" + projectId);
    if (!source) return;

    const details = $(".detail-body", source);

    if (modalTitle) modalTitle.textContent = source.dataset.title || "Project";
    if (modalTags) modalTags.textContent = source.dataset.tags || "";
    if (modalBody) modalBody.innerHTML = details ? details.innerHTML : "";

    lastTrigger = trigger || null;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", ""); // basic fallback for older browsers
    }

    document.body.classList.add("modal-open");
  }

  function closeProject() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  $$("[data-project]").forEach(function (button) {
    button.addEventListener("click", function () {
      openProject(button.dataset.project, button);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeProject);
  }

  if (dialog) {
    // Clicking the dark backdrop closes the modal.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeProject();
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
      lastTrigger = null;
    });
  }

  /* ==========================================================
     6. CURSOR SPARKLES (subtle, optional)
     ========================================================== */
  if (finePointer.matches && !reduceMotion.matches) {
    let lastSparkle = 0;
    const glyphs = ["✦", "✧", "♡", "✿"];

    document.addEventListener(
      "pointermove",
      function (event) {
        const now = performance.now();
        if (now - lastSparkle < 95) return;
        if (Math.random() > 0.62) return; // keep it light
        lastSparkle = now;

        const sparkle = document.createElement("span");
        sparkle.className = "cursor-sparkle";
        sparkle.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        sparkle.style.left = event.clientX + (Math.random() * 12 - 6) + "px";
        sparkle.style.top = event.clientY + (Math.random() * 10 - 5) + "px";
        sparkle.style.fontSize = 8 + Math.random() * 6 + "px";
        sparkle.setAttribute("aria-hidden", "true");

        document.body.appendChild(sparkle);
        window.setTimeout(function () {
          sparkle.remove();
        }, 900);
      },
      { passive: true }
    );
  }

  /* ==========================================================
     7. PROFILE PHOTO FALLBACK
     ========================================================== */
  const portrait = $(".portrait-img");
  if (portrait) {
    const portraitWrap = portrait.closest(".portrait-wrap");

    function markPortraitMissing() {
      if (portraitWrap) portraitWrap.classList.add("is-missing");
    }

    portrait.addEventListener("error", markPortraitMissing);

    // It may have failed before this script loaded.
    if (portrait.complete && portrait.naturalWidth === 0) {
      markPortraitMissing();
    }
  }

  /* ==========================================================
     8. SMALL HOUSEKEEPING
     ========================================================== */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
