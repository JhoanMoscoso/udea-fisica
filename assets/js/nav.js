/* ============================================================
   nav.js — shared navigation behaviour
============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Active nav link ── */
    const path = window.location.pathname;

    document.querySelectorAll('.nav-links a, .site-nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#')) return;

      // Strip leading ../ to normalise
      const normHref = href.replace(/^(\.\.\/)+/, '/').replace(/index\.html$/, '');
      const normPath = path.replace(/index\.html$/, '');

      if (normHref !== '/' && normPath.includes(normHref.replace(/^\//, ''))) {
        link.classList.add('active');
      }
    });

    /* ── Sticky nav opacity on scroll ── */
    var nav = document.querySelector('.nav') || document.querySelector('.site-nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 24) {
          nav.style.background = 'rgba(9, 0, 64, 0.97)';
        } else {
          nav.style.background = '';
        }
      }, { passive: true });
    }

    /* ── Scroll-triggered fade-in (Intersection Observer) ── */
    var fadeEls = document.querySelectorAll('.fade-in-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

      fadeEls.forEach(function (el) { observer.observe(el); });
    }

    /* ── Stagger child .fade-in-up within grids ── */
    document.querySelectorAll(
      '.skills-grid, .hackathons-grid, .projects-grid, .subjects-grid, .about-stats'
    ).forEach(function (grid) {
      var children = grid.querySelectorAll('.fade-in-up');
      children.forEach(function (child, i) {
        child.style.transitionDelay = (i * 0.07) + 's';
      });
    });

  });
})();
