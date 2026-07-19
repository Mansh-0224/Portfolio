/* =====================================================================
   Portfolio Interactions
   Vanilla JavaScript only — no libraries or frameworks.

   Modules:
     1. Mobile Navigation Toggle
     2. Smooth Scrolling
     3. Active Navigation Link Highlighting
     4. Dark / Light Mode Toggle
     5. Sticky Navbar on Scroll
     6. Scroll-to-Top Button
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ---------------------------------------------------------------
     Shared DOM references
     --------------------------------------------------------------- */
  const body = document.body;
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.navbar__links');
  const navLinks = document.querySelectorAll('.navbar__link');
  const themeToggle = document.querySelector('.theme-toggle');
  const scrollTopButton = document.querySelector('.scroll-top');
  const sections = document.querySelectorAll('main section[id]');

  /* =================================================================
     1. MOBILE NAVIGATION TOGGLE
     Opens/closes the primary nav on small screens and keeps ARIA
     attributes in sync so the control stays accessible.
     ================================================================= */
  const MobileNav = (() => {
    if (!navToggle || !navLinksList) return;

    const desktopQuery = window.matchMedia('(min-width: 768px)');

    const open = () => {
      navLinksList.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      body.classList.add('nav-open');
    };

    const close = () => {
      navLinksList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-open');
    };

    const toggle = () => {
      const isOpen = navLinksList.classList.contains('is-open');
      isOpen ? close() : open();
    };

    // Toggle menu when the hamburger button is clicked.
    navToggle.addEventListener('click', toggle);

    // Close the menu after a link is clicked (mobile UX).
    navLinks.forEach((link) => link.addEventListener('click', close));

    // Close the menu when clicking anywhere outside of it.
    document.addEventListener('click', (event) => {
      const clickedInsideNav = navLinksList.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) close();
    });

    // Close the menu on Escape for keyboard users.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });

    // Auto-close if the viewport is resized past the mobile breakpoint.
    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) close();
    });

    return { open, close, toggle };
  })();

  /* =================================================================
     2. SMOOTH SCROLLING
     Intercepts in-page anchor clicks and scrolls to the target
     smoothly, accounting for the sticky header's height.
     ================================================================= */
  const SmoothScroll = (() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    const scrollToTarget = (target) => {
      const headerOffset = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    };

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');

        // Ignore empty/placeholder hashes (e.g. href="#").
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        scrollToTarget(target);

        // Update the URL without adding a new history entry per click.
        window.history.replaceState(null, '', targetId);

        // Move focus to the target for keyboard/screen-reader users.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  })();

  /* =================================================================
     3. ACTIVE NAVIGATION LINK HIGHLIGHTING
     Uses IntersectionObserver to detect which section is in view
     and highlights the matching nav link.
     ================================================================= */
  const ActiveNavHighlight = (() => {
    if (!sections.length || !navLinks.length) return;

    const setActiveLink = (sectionId) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isActive);
        isActive
          ? link.setAttribute('aria-current', 'page')
          : link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section.
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveLink(visibleSection.target.id);
      },
      {
        // Treat a section as "current" once it clears the sticky header
        // and before it's mostly scrolled past.
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
  })();

  /* =================================================================
     4. DARK / LIGHT MODE TOGGLE
     Persists the user's preference in localStorage and falls back
     to the OS-level color-scheme preference on first visit.
     ================================================================= */
  const ThemeToggle = (() => {
    if (!themeToggle) return;

    const STORAGE_KEY = 'portfolio-theme';

    const getSavedTheme = () => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (error) {
        return null; // Storage unavailable (e.g. private browsing).
      }
    };

    const saveTheme = (theme) => {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        // Fail silently — theme still applies for this session.
      }
    };

    const getPreferredTheme = () => {
      const saved = getSavedTheme();
      if (saved === 'light' || saved === 'dark') return saved;

      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      return prefersLight ? 'light' : 'dark';
    };

    const applyTheme = (theme) => {
      const isLight = theme === 'light';

      document.documentElement.setAttribute('data-theme', theme);
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);

      const icon = themeToggle.querySelector('.theme-toggle__icon');
      if (icon) icon.textContent = isLight ? '☼' : '◐';
    };

    // Apply the initial theme as early as possible.
    applyTheme(getPreferredTheme());

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      saveTheme(next);
    });
  })();

  /* =================================================================
     5. STICKY NAVBAR ON SCROLL
     Adds a class once the page scrolls past a small threshold so the
     header can pick up an elevated/condensed style via CSS.
     ================================================================= */
  const StickyNavbar = (() => {
    if (!header) return;

    const SCROLL_THRESHOLD = 20;
    let ticking = false;

    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      // Throttle with requestAnimationFrame to avoid layout thrashing.
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeaderState(); // Set correct initial state (e.g. on page reload mid-scroll).
  })();

  /* =================================================================
     6. SCROLL-TO-TOP BUTTON
     Shows a "back to top" button once the user scrolls down and
     smoothly returns them to the top when clicked.
     ================================================================= */
  const ScrollToTop = (() => {
    if (!scrollTopButton) return;

    const VISIBILITY_THRESHOLD = 500;
    let ticking = false;

    const updateButtonVisibility = () => {
      scrollTopButton.classList.toggle('is-visible', window.scrollY > VISIBILITY_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateButtonVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateButtonVisibility(); // Set correct initial state on load.

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
});