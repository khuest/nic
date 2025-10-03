document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".menu");

  // Hamburger menu functionality
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Dropdown hover delay
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(drop => {
    let timeout;

    const button = drop.querySelector(".dropbtn");
    const menu = drop.querySelector(".dropdown-content");

    drop.addEventListener("mouseenter", () => {
      clearTimeout(timeout);      // cancel any hide timeout
      menu.style.display = "block"; // show dropdown immediately
    });

    drop.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        menu.style.display = "none"; // hide after delay
      }, 300); // delay in ms, adjust as needed
    });
  });
  
  // Mobile tooltip click functionality
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    const tooltipButtons = document.querySelectorAll(".dropbtn");
    
    tooltipButtons.forEach(button => {
      const tooltip = button.querySelector(".tooltip");
      
      if (tooltip) {
        button.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent default button behavior if needed
          
          // Hide all other tooltips first
          tooltipButtons.forEach(otherButton => {
            const otherTooltip = otherButton.querySelector(".tooltip");
            if (otherTooltip && otherTooltip !== tooltip) {
              otherTooltip.classList.remove("show");
            }
          });
          
          // Toggle current tooltip
          tooltip.classList.toggle("show");
        });
      }
    });

    // Hide tooltip when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropbtn")) {
        const allTooltips = document.querySelectorAll(".tooltip");
        allTooltips.forEach(tooltip => {
          tooltip.classList.remove("show");
        });
      }
    });
  };
  

  // Random logo and brand name functionality
  const logoImg = document.querySelector(".logo");
  const brandText = document.querySelector(".brand");
  
  if (logoImg) {
    const logoVariants = [
      "eekhue-logo.png",
      "eekhue-logo-sunglasses.png", 
      "eekhue-logo-shield.png",
      "eekhue-logo-fire.png",
      "eekhue-logo-water.png",
      "eekhue-logo-ice.png",
      "eekhue-logo-earth.png",
      "eekhue-logo-air.png",
      "eekhue-logo-poison.png"
      // Add more logo filenames as you create them
    ];

    const randomLogo = logoVariants[Math.floor(Math.random() * logoVariants.length)];
    
    logoImg.src = `${BASEURL}/assets/images/${randomLogo}`;
    
    // Optional: Add a fade-in effect when logo loads
    logoImg.style.opacity = "0";
    logoImg.onload = function() {
      logoImg.style.transition = "opacity 0.3s ease";
      logoImg.style.opacity = "1";
    };
    
  }

  // Random brand name functionality
  if (brandText) {
    const brandVariants = [
      "AykHue",   // AQ = Adversity Quotient
      "BeekHue",  // BQ = Body Quotient
      "SeekHue",  // CQ = Cultural / Curiosity Quotient
      "DeekHue",  // DQ = Digital Quotient
      "EekHue",   // EQ = Emotional Quotient
      "EfkHue",   // FQ = Financial Quotient
      "AikHue",   // IQ = Intelligence Quotient
      "EmkHue",   // MQ = Moral Quotient
      "EnkHue",   // NQ = Nutritional Quotient
      "OakHue",   // OQ = Open Quotient
      "PeekHue",  // PQ = Physical / Positive Quotient
      "ArkHue",   // RQ (less standard, sometimes "Rational Quotient")
      "EskHue",   // SQ = Spiritual Quotient
      "TeekHue",  // TQ = Trust / Total Quotient
      "VeekHue",  // VQ (not standardized, sometimes "Values Quotient")
      "DoubleYoukHue" // WQ (rare, sometimes "Will Quotient")
    ];

    // Array of font families (make sure they're loaded via CSS or Google Fonts)
    const fontVariants = [
      "Arial, sans-serif",
      "'Courier New', monospace",
      "'Times New Roman', serif",
      "'Trebuchet MS', sans-serif",
      "'Comic Sans MS', cursive", 
      "'Montserrat', sans-serif", 
      "'Roboto Slab', serif" 
    ];

    // Pick a random brand name & font
    const randomBrand = brandVariants[Math.floor(Math.random() * brandVariants.length)];
    const randomFont = fontVariants[Math.floor(Math.random() * fontVariants.length)];
    
    brandText.style.transition = "opacity 0.2s ease";
    brandText.style.opacity = "0";
    
    setTimeout(() => {
      brandText.textContent = randomBrand;
      brandText.style.fontFamily = randomFont;
      brandText.style.opacity = "1";
    }, 200);
    
  }
});
