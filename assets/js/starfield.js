/* ==============================
   NEW STARFIELD SYSTEM - SEPARATE FROM EXISTING
============================== */
document.addEventListener("DOMContentLoaded", () => {
  
  // New Starfield Canvas Animation
  const canvas = document.getElementById("starfield-new");
  if (!canvas) return; // Exit if canvas doesn't exist
  
  const ctx = canvas.getContext("2d");
  let stars = [];

  function initStars() {
    stars = [];
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Create stars with varied properties
    for(let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.3,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.01
      });
    }
  }

  function animateStars() {
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
      // Move stars
      star.x += star.dx;
      star.y += star.dy;
      
      // Wrap around screen
      if(star.x < 0) star.x = width;
      if(star.x > width) star.x = 0;
      if(star.y < 0) star.y = height;
      if(star.y > height) star.y = 0;
      
      // Twinkling effect
      star.opacity += (Math.random() - 0.5) * star.twinkle;
      star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      
      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animateStars);
  }

  // New Planet System Class
  class StarfieldPlanetSystem {
    constructor() {
      this.planets = document.querySelectorAll(".starfield-planet");
      this.popup = document.getElementById("starfield-popup");
      this.titleEl = document.getElementById("starfield-title");
      this.textEl = document.getElementById("starfield-text");
      this.closeBtn = document.getElementById("starfield-close");
      
      if (this.planets.length > 0) {
        this.init();
      }
    }

    init() {
      this.setupPlanetInteractions();
      this.setupPopupControls();
      this.startPlanetAnimations();
    }

    setupPlanetInteractions() {
      this.planets.forEach(planet => {
        planet.addEventListener("click", () => {
          const title = planet.dataset.title;
          const text = planet.dataset.text;
          
          this.titleEl.textContent = title;
          this.textEl.textContent = text;
          this.popup.classList.add("starfield-active");
          
          // Add click effect
          planet.style.transform = planet.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.95)';
          setTimeout(() => {
            planet.style.transform = planet.style.transform.replace(/scale\([^)]*\)/, '');
          }, 150);
        });
      });
    }

    setupPopupControls() {
      this.closeBtn.addEventListener("click", () => {
        this.popup.classList.remove("starfield-active");
      });
      
      window.addEventListener("click", (e) => {
        if(e.target === this.popup) {
          this.popup.classList.remove("starfield-active");
        }
      });
      
      // Close with Escape key
      document.addEventListener("keydown", (e) => {
        if(e.key === "Escape" && this.popup.classList.contains("starfield-active")) {
          this.popup.classList.remove("starfield-active");
        }
      });
    }

    startPlanetAnimations() {
      // Create floating data for each planet
      this.planetData = Array.from(this.planets).map(planet => {
        return {
          el: planet,
          baseX: parseFloat(planet.style.left),
          baseY: parseFloat(planet.style.top),
          offsetX: (Math.random() * 0.8) + 0.4, // Percentage based
          offsetY: (Math.random() * 0.8) + 0.4,
          speedX: (Math.random() * 0.003) + 0.008,
          speedY: (Math.random() * 0.003) + 0.008,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2
        };
      });

      this.animatePlanets();
    }

    animatePlanets() {
      this.planetData.forEach(data => {
        data.phaseX += data.speedX;
        data.phaseY += data.speedY;
        
        const floatX = Math.sin(data.phaseX) * data.offsetX;
        const floatY = Math.sin(data.phaseY) * data.offsetY;
        
        data.el.style.left = `${data.baseX + floatX}%`;
        data.el.style.top = `${data.baseY + floatY}%`;
      });
      
      requestAnimationFrame(() => this.animatePlanets());
    }
  }

  // Initialize new starfield system
  initStars();
  animateStars();
  window.addEventListener("resize", initStars);
  
  new StarfieldPlanetSystem();
});