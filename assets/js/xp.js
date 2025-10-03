/* ==============================
 XP Progress System
 Shared across homepage + quiz
 Uses localStorage + YAML data
============================== */
const xpMessagesElement = document.getElementById('xp-messages');
const xpMessages = xpMessagesElement ? JSON.parse(xpMessagesElement.textContent) : [];

document.addEventListener("DOMContentLoaded", () => {
  const xpFill    = document.getElementById("xpFill");
  const xpLabel   = document.getElementById("xpLabel");
  const xpMessage = document.getElementById("xpMessage");
  const REPLAY_ID = "xpReplayBtn";

  let currentXP   = parseInt(localStorage.getItem("eekhueXP")) || 0;
  let visitedRealms = JSON.parse(localStorage.getItem("visitedRealms")) || {};

  // --- Milestones ---
  const milestones = [
    { percent: 0,   text: "Begin your journey..." },
    { percent: 14,  text: "Path Opens Ahead" },
    { percent: 28,  text: "Power Levels Rise" },
    { percent: 42,  text: "Trials Grow Harder" },
    { percent: 57,  text: "Hidden Routes Found" },
    { percent: 71,  text: "Rare Treasures Near" },
    { percent: 85,  text: "Final Arc Begins" },
    { percent: 100, text: "Legend Complete 🎯" }
  ];

  // --- Helpers ---
  function getMilestoneMessage(progress) {
    let msg = milestones[0].text;
    for (let m of milestones) {
      if (progress >= m.percent) msg = m.text;
    }
    return msg;
  }

  function updateXPBar() {
    const messageStr = getMilestoneMessage(currentXP);

    if (xpFill)  xpFill.style.width = currentXP + "%";
    if (xpLabel) xpLabel.textContent = `XP: ${currentXP}%`;
    if (xpMessage) xpMessage.textContent = messageStr;

    localStorage.setItem("eekhueXP", currentXP);
    localStorage.setItem("eekhueXPMsg", messageStr);

  // When XP hits 100, show replay button if not already there
    if (currentXP >= 100 && !document.getElementById(REPLAY_ID)) {
      const replayBtn = document.createElement("button");
      replayBtn.id = REPLAY_ID;
      replayBtn.textContent = "🔄 Replay Journey";
      replayBtn.className = "xp-replay";
      replayBtn.addEventListener("click", resetXP);
      document.body.appendChild(replayBtn);
    }
  }

  function addXP(amount) {
    currentXP = Math.min(100, currentXP + amount);
    updateXPBar();
  }

  function resetXP() {
    currentXP = 0;
    localStorage.removeItem("eekhueXP");
    localStorage.removeItem("eekhueXPMsg");
    localStorage.removeItem("visitedRealms");
    visitedRealms = {};
    const btn = document.getElementById(REPLAY_ID);
    if (btn) btn.remove();
    updateXPBar();
  }

  // --- Init ---
  updateXPBar();

// --- NEW Starfield planet clicks (homepage only, safe no-op on quiz page) ---
  document.querySelectorAll(".starfield-planet").forEach((planet, i) => {
    const id = planet.dataset.title || planet.id || `starfield-planet${i}`;
    planet.addEventListener("click", () => {
      if (!visitedRealms[id]) {
        visitedRealms[id] = true;
        localStorage.setItem("visitedRealms", JSON.stringify(visitedRealms));
        addXP(11); // award once per planet
      }
    });
  });
  

  // --- Realm node clicks (homepage only, safe no-op on quiz page) ---
   document.querySelectorAll(".realm-node").forEach((node, i) => {
    const id = node.dataset.title || `realm${i}`;
    node.addEventListener("click", () => {
      if (!visitedRealms[id]) {
        visitedRealms[id] = true;
        localStorage.setItem("visitedRealms", JSON.stringify(visitedRealms));
        addXP(11); // award once
      }
    });
  });

  // --- Quiz interactions (quiz page only) ---
  const drawBtn = document.getElementById('draw-card-btn');
    if (drawBtn) {
      drawBtn.addEventListener('click', () => addXP(1));
    }
  const playBtn = document.getElementById('play-card-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => addXP(2));
    }
  
  // --- Quiz page spam button --- 
  const spamBtn = document.getElementById("spamBtn");
  const spamMessage = document.getElementById("spamMessage");
  const emojis = ["🎉", "🚀", "✨", "🔥", "🌟", "💡", "🎈"];
  
  let spamIndex = 0;

  if (spamBtn && spamMessage && typeof xpMessages !== "undefined" && Array.isArray(xpMessages)) {
    spamBtn.addEventListener("click", () => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      // Pick a random message from YAML data
      const msgObj = xpMessages[Math.floor(Math.random() * xpMessages.length)];
    
      // Update button text and badge message
      spamBtn.textContent = msgObj.button;
      spamMessage.textContent = msgObj.message;
      spamBtn.textContent = `${msgObj.button} ${emoji}`;
      
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      spamMessage.style.color = `rgb(${r}, ${g}, ${b})`;

      spamMessage.style.transform = "scale(1.1)";
      setTimeout(() => {
        spamMessage.style.transform = "scale(1)";
      }, 150);
    
      // Add XP
      addXP(msgObj.xp);
    });
  }
  
  
});
