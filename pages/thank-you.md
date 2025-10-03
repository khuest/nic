---
layout: default
title: "Thank You"
description: "Confirmation page after submitting a form."
permalink: /thank-you/
hero_style: "minimal" 
hero_image: "self-hero.png"
pill: "🔬 New Theory"
closing_note: ""
css:
  - "self.css"
js:
  - "self.js"
---

<div class="thank-you-wrapper">
  <h1>🎉 Thank You!</h1>
  <p>Your form has been successfully submitted.</p>

  <p>
    We’re grateful you took the step to reach out and be part of this journey.  
    Expect an email confirmation soon, and we’ll be in touch with next steps.
  </p>

  <hr>

  <h2>✨ What’s Next?</h2>
  <ul>
    <li>⏳ <strong>Check your inbox</strong> — if you don’t see a confirmation, peek in your spam folder.</li>
    <li>🌱 <strong>Stay tuned</strong> — we’ll send details about volunteer pairing and opportunities.</li>
    <li>🚀 <strong>Explore more</strong> — in the meantime, feel free to browse other sections of the site.</li>
  </ul>

  <a href="/" class="btn btn-primary">⬅ Back to Home</a>
</div>

<!-- 🎊 Confetti Script -->
<script>
  (function() {
    const duration = 3 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Since confetti.js is tiny, let’s use CDN
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);
  })();
</script>

<!-- 🎊 Confetti CDN -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>