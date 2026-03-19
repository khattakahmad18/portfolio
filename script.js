/* ============================================
   Ahmad's Portfolio — Main JavaScript
   ============================================
   Handles: navbar scroll, mobile menu, scroll
   reveal animations, skill bar fills, and
   ambient hero particles.
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // DOM REFERENCES
  // ============================================

  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('nav-hamburger');
  const navLinks     = document.getElementById('nav-links');
  const allNavLinks  = document.querySelectorAll('.nav-link');
  const heroParticles = document.getElementById('hero-particles');
  const revealEls    = document.querySelectorAll('.reveal');
  const skillFills   = document.querySelectorAll('.skill-fill');


  // ============================================
  // 1. NAVBAR — shrink on scroll
  // ============================================

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ============================================
  // 2. MOBILE MENU — hamburger toggle
  // ============================================

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  // ============================================
  // 3. SCROLL REVEAL — IntersectionObserver
  // ============================================

  /**
   * Uses IntersectionObserver to add a 'visible' class
   * when elements enter the viewport. Each element gets
   * a staggered delay based on its index within siblings.
   */
  function initScrollReveal() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Add stagger delay based on sibling position
            var parent   = entry.target.parentElement;
            var siblings = parent ? parent.querySelectorAll('.reveal') : [];
            var index    = Array.prototype.indexOf.call(siblings, entry.target);
            entry.target.style.transitionDelay = (index * 0.08) + 's';

            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();


  // ============================================
  // 4. SKILL BARS — animate width on scroll
  // ============================================

  function initSkillBars() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var level = entry.target.getAttribute('data-level');
            entry.target.style.width = level + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillFills.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  initSkillBars();


  // ============================================
  // 5. HERO PARTICLES — floating ambient dots
  // ============================================

  /**
   * Creates small floating particles in the hero
   * background for an ambient, cinematic feel.
   */
  function createParticles() {
    var count = 30; // Number of particles

    for (var i = 0; i < count; i++) {
      var particle = document.createElement('span');
      particle.classList.add('hero-particle');

      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top  = Math.random() * 100 + '%';

      // Random size (2–5px)
      var size = 2 + Math.random() * 3;
      particle.style.width  = size + 'px';
      particle.style.height = size + 'px';

      // Random animation delay & duration for organic feel
      particle.style.animationDelay    = (Math.random() * 6) + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';

      heroParticles.appendChild(particle);
    }
  }

  createParticles();


  // ============================================
  // 6. SMOOTH SCROLL — for anchor links
  // ============================================
  // (CSS scroll-behavior: smooth handles this,
  //  but we add a fallback for older browsers.)

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ============================================
  // 7. ACTIVE NAV HIGHLIGHT — based on scroll
  // ============================================

  var sections = document.querySelectorAll('.section');

  function highlightNav() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });


  // ============================================
  // 8. PAGE LOAD — trigger initial reveals
  // ============================================

  // Small delay to ensure CSS transitions work on load
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

})();
