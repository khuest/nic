// assets/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     Helpers
     ------------------------- */
  function computeBase() {
    // Use injected Jekyll baseurl if available
    if (typeof window !== "undefined" && window.BASEURL) {
      const b = window.BASEURL.toString().trim();
      return b === "/" ? "" : b.replace(/\/$/, "");
    }
    // Fallback: guess the repo root as the first path segment
    const parts = location.pathname.split("/").filter(Boolean);
    return parts.length ? "/" + parts[0] : "";
  }

  const BASE = computeBase(); // e.g. "/eekhue-core"
  function joinPath(relPath) {
    // normalize: ensure no double slashes and return absolute-ish path with BASE
    const base = BASE.replace(/\/$/, "");
    const p = relPath.replace(/^\/+/, "");
    return (base ? base + "/" + p : "/" + p);
  }

  /* -------------------------
    Hamburger Menu Toggle
    ------------------------- */
  function toggleMenu() {
    const nav = document.querySelector(".menu");
    nav.classList.toggle("open");
    log("toggleMenu function called to open nav")
  }

  // attach event listener
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
    log("toggle menu clicked.")
  }
});
  

  /* -------------------------
     Click counter
     ------------------------- */
  const btn = document.getElementById("helloBtn");
  const resetBtn = document.getElementById("resetBtn");
  const output = document.getElementById("output");
  let clickCount = 0;
  const emojis = ["🎉", "🚀", "✨", "🔥", "🌟", "💡", "🎈"];

  if (btn) {
    btn.addEventListener("click", () => {
      clickCount++;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      console.log("Button clicked. Count:", clickCount);

      if (clickCount % 10 === 0) {
        output.textContent = `${emoji} Wow! You reached ${clickCount} clicks! ${emoji}`;
      } else if (clickCount % 5 === 0) {
        output.textContent = `${emoji} Nice! ${clickCount} clicks already! ${emoji}`;
      } else {
        output.textContent = `${emoji} JavaScript works! Clicked ${clickCount} times. ${emoji}`;
      }

      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      output.style.color = `rgb(${r}, ${g}, ${b})`;

      output.style.transform = "scale(1.1)";
      setTimeout(() => {
        output.style.transform = "scale(1)";
      }, 150);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clickCount = 0;
      console.log("Counter reset");
      if (output) {
        output.textContent = "Counter reset!";
        output.style.color = getAccent();
        output.style.transform = "scale(1)";
      }
    });
  }

  function getAccent() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue("--accent") || "#7aa2f7";
  }

  /* -------------------------
     HTTP fetch demo
     ------------------------- */
  const fetchBtn = document.getElementById("fetchBtn");
  const fetchOutput = document.getElementById("fetchOutput");

  if (fetchBtn && fetchOutput) {
    fetchBtn.addEventListener("click", async () => {
      fetchOutput.textContent = "Fetching...";
      console.log("Fetching data...");
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await resp.json();
        console.log("Data received:", data);
        fetchOutput.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        console.error("Fetch error:", err);
        fetchOutput.textContent = "Error fetching data: " + err;
      }
    });
  }

  /* -------------------------
     Multi-step Personality Quiz
     ------------------------- */
  const quiz = document.getElementById("quiz");
  const quizOutput = document.getElementById("quiz-output");
  const quizDataEl = document.getElementById("quizData");

  if (quiz && quizOutput && quizDataEl) {
    let answers = {};

    // helper to render next set of buttons
    function renderQ2() {
      quiz.innerHTML = `
        <p>Q2: How do you approach challenges?</p>
        <button data-question="q2" data-answer="hands-on">🛠 Hands-on experimentation</button>
        <button data-question="q2" data-answer="planning">📋 Careful planning</button>
      `;
    }

    quiz.addEventListener("click", (e) => {
      const target = e.target;
      if (!target || !target.dataset || !target.dataset.answer) return;

      const question = target.dataset.question;
      const answer = target.dataset.answer;
      answers[question] = answer;
      quizDataEl.value = JSON.stringify(answers);
      console.log("Quiz — current answers:", answers);

      // show immediate feedback
      quizOutput.textContent = `You answered ${question}: ${answer}`;

      if (question === "q1") {
        // move to Q2
        setTimeout(renderQ2, 300);
        return;
      }

      if (question === "q2") {
        // decide persona and redirect after slight delay
        quizOutput.textContent = "Processing your personality...";
        const isGadgetTinker = answers.q1 === "gadget" && answers.q2 === "hands-on";
        const targetRel = isGadgetTinker ? "persona/gadget-tinker.html" : "persona/creative-performer.html";
        const targetUrl = joinPath(targetRel);
        console.log("Final answers:", answers);
        console.log("Redirecting to:", targetUrl);

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 900);
      }
    });
  }


  // Grab all the rainbow triggers
  const rainbowColors = document.querySelectorAll(".rainbow-color");
  const personaCards = document.querySelectorAll(".persona-card");

  // Helper to hide all cards
  function hideAllCards() {
    personaCards.forEach(card => card.style.display = "none");
  }

  // Initialize: hide all cards
  hideAllCards();

  // Add click listeners to each rainbow color
  rainbowColors.forEach(colorEl => {
    colorEl.addEventListener("click", () => {
      const targetId = colorEl.dataset.persona; // e.g. "creative-performer"
      const targetCard = document.getElementById(targetId);

      if (!targetCard) return;

      // Toggle visibility
      if (targetCard.style.display === "block") {
        targetCard.style.display = "none";
      } else {
        hideAllCards(); // hide other cards
        targetCard.style.display = "block"; // show this card
      }
    });
  });

  // Optional: close card when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInside = [...personaCards, ...rainbowColors].some(el => el.contains(e.target));
    if (!clickedInside) hideAllCards();
  });




function log(msg) {
  const out = document.getElementById("debug");
  if (out) {
    out.innerHTML += msg + "<br>";
  }
}
log("JS Loaded!");


