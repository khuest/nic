// assets/js/rainbow.js
document.addEventListener("DOMContentLoaded", () => {

  // Grab all the rainbow button triggers (corrected selector)
  const rainbowButtons = document.querySelectorAll(".rainbow-bar button");
  const personaCards = document.querySelectorAll(".persona-card");

  // Helper to hide all cards (using CSS classes instead of display)
  function hideAllCards() {
    personaCards.forEach(card => {
      card.classList.remove("active");
    });
  }

  // Initialize: hide all cards
  hideAllCards();

  // Add click listeners to each rainbow button
  rainbowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any default button behavior
      
      const targetId = button.dataset.target; // e.g. "creative-performer"
      const targetCard = document.getElementById(targetId);

      if (!targetCard) {
        console.warn(`Card with ID "${targetId}" not found`);
        return;
      }

      // Toggle visibility using CSS classes
      if (targetCard.classList.contains("active")) {
        // If this card is already active, hide it
        targetCard.classList.remove("active");
      } else {
        // Hide all other cards first, then show this one
        hideAllCards();
        targetCard.classList.add("active");
      }
    });

    // Add hover effect for desktop users
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.05)";
      button.style.filter = "brightness(1.1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
      button.style.filter = "brightness(1)";
    });
  });

  // Close card when clicking outside (improved detection)
  document.addEventListener("click", (e) => {
    // Check if click was on a rainbow button or inside a persona card
    const clickedOnButton = e.target.closest(".rainbow-bar button");
    const clickedOnCard = e.target.closest(".persona-card");
    
    // If clicked outside both buttons and cards, hide all cards
    if (!clickedOnButton && !clickedOnCard) {
      hideAllCards();
    }
  });

  // Optional: Close card when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAllCards();
    }
  });

  // Debug logging (remove in production)
  console.log(`Found ${rainbowButtons.length} rainbow buttons`);
  console.log(`Found ${personaCards.length} persona cards`);
  
  // Log button targets for debugging
  rainbowButtons.forEach((button, index) => {
    console.log(`Button ${index}: targets "${button.dataset.target}"`);
  });

});