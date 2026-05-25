/* ============================================================
   particles.js — hero canvas particle system + mouse parallax
   Only active on pages that load this script (index.html).
============================================================ */

(function () {
  'use strict';

  var PARTICLE_COUNT = 104;
  var REPEL_RADIUS   = 130;
  var MAX_SPEED      = 3;

  /* ── Particle ── */
  function Particle(w, h) {
    this.reset(w, h);
  }

  Particle.prototype.reset = function (w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.bvx = (Math.random() - 0.5) * 0.6;
    this.bvy = (Math.random() - 0.5) * 0.6;
    this.vx = this.bvx;
    this.vy = this.bvy;
    this.size = Math.random() * 1.5 + 1.5;
    this.life = Math.random() * Math.PI * 2;
    this.lifeSpeed = Math.random() * 0.008 + 0.003;

    var r = Math.random();
    if (r < 0.45)      this.hue = 'lime';
    else if (r < 0.75) this.hue = 'indigo';
    else               this.hue = 'white';
  };

  Particle.prototype.update = function (mx, my) {
    var dx   = this.x - mx;
    var dy   = this.y - my;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < REPEL_RADIUS && dist > 0.5) {
      var force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
      this.vx += (dx / dist) * force * 1.4;
      this.vy += (dy / dist) * force * 1.4;
    }

    /* drift back toward base velocity */
    this.vx += (this.bvx - this.vx) * 0.04;
    this.vy += (this.bvy - this.vy) * 0.04;

    /* clamp speed */
    var spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > MAX_SPEED) {
      this.vx = (this.vx / spd) * MAX_SPEED;
      this.vy = (this.vy / spd) * MAX_SPEED;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.life += this.lifeSpeed;
  };

  Particle.prototype.draw = function (ctx, w, h) {
    /* wrap at edges */
    if (this.x < -4) this.x = w + 4;
    if (this.x > w + 4) this.x = -4;
    if (this.y < -4) this.y = h + 4;
    if (this.y > h + 4) this.y = -4;

    var alpha = Math.abs(Math.sin(this.life)) * 0.55;
    if (alpha < 0.02) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    if (this.hue === 'lime') {
      ctx.shadowColor = 'rgba(104,255,0,0.9)';
      ctx.shadowBlur  = this.size * 4;
      ctx.fillStyle   = 'rgba(104,255,0,' + alpha + ')';
    } else if (this.hue === 'indigo') {
      ctx.shadowColor = 'rgba(71,19,150,0.8)';
      ctx.shadowBlur  = this.size * 3;
      ctx.fillStyle   = 'rgba(71,19,150,' + Math.min(alpha * 1.8, 1) + ')';
    } else {
      ctx.shadowBlur  = 0;
      ctx.fillStyle   = 'rgba(255,255,255,' + alpha * 0.45 + ')';
    }

    ctx.fill();
    ctx.shadowBlur = 0;
  };


  /* ── Init particles ── */
  function initParticles() {
    var heroEl = document.querySelector('.hero');
    if (!heroEl) return;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:0;';
    heroEl.insertBefore(canvas, heroEl.firstChild);

    var ctx = canvas.getContext('2d');
    var mouse = { x: -9999, y: -9999 };
    var particles = [];
    var raf;

    function resize() {
      canvas.width  = heroEl.offsetWidth;
      canvas.height = heroEl.offsetHeight;
    }

    function spawnParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var w = canvas.width, h = canvas.height;
      for (var i = 0; i < particles.length; i++) {
        particles[i].update(mouse.x, mouse.y);
        particles[i].draw(ctx, w, h);
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    spawnParticles();

    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      resize();
      spawnParticles();
      loop();
    });

    heroEl.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroEl.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    loop();
  }


  /* ── Mouse parallax on glow orbs ── */
  function initParallax() {
    var heroEl     = document.querySelector('.hero');
    var glow       = document.querySelector('.hero-glow');
    var glowAccent = document.querySelector('.hero-glow-accent');
    if (!heroEl || !glow) return;

    heroEl.addEventListener('mousemove', function (e) {
      var rect = heroEl.getBoundingClientRect();
      var dx   = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
      var dy   = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);

      glow.style.transform = 'translate(' + (dx * 30) + 'px,' + (dy * 20) + 'px)';
      if (glowAccent) {
        glowAccent.style.transform = 'translate(' + (dx * -20) + 'px,' + (dy * -15) + 'px)';
      }
    });

    heroEl.addEventListener('mouseleave', function () {
      glow.style.transform = '';
      if (glowAccent) glowAccent.style.transform = '';
    });
  }


  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initParallax();
  });

})();
