// Card Compare System
(function() {
  let selectedCards = [];
  let currentCardElement = null;
  let currentCardData = null;
  let allCardsData = {}; // Will store data from YAML via data attributes

  function initCardCompare() {
    // Get all card links in the grid
    const cardLinks = document.querySelectorAll('.grid .card-link');
    
    cardLinks.forEach(link => {
      // Store card data from data attributes (you'll need to add these to your card template)
      const type = extractCardType(link);
      if (type) {
        allCardsData[type] = {
          type: type,
          element: link,
          href: link.getAttribute('href'),
          // These will come from your YAML data via data attributes
          title: link.getAttribute('data-title') || type,
          subtitle: link.getAttribute('data-subtitle') || '',
          functions: link.getAttribute('data-functions') || '',
          strengths: link.getAttribute('data-strengths') || '',
          weaknesses: link.getAttribute('data-weaknesses') || '',
          cognitiveStack: link.getAttribute('data-cognitive-stack') || '',
          description: link.getAttribute('data-description') || ''
        };
      }
      
      // Prevent default link behavior and show popup instead
      link.addEventListener('click', function(e) {
        e.preventDefault();
        currentCardElement = this;
        currentCardData = allCardsData[type];
        showPopupMenu(e);
      });
    });

    // Setup popup menu buttons
    setupPopupHandlers();
    
    // Setup backdrop click to close
    document.getElementById('popup-backdrop').addEventListener('click', closePopup);
    
    // Setup clear button
    document.getElementById('clear-compare').addEventListener('click', clearComparison);
  }

  function extractCardType(cardElement) {
    // Extract MBTI type from href or data attribute
    const href = cardElement.getAttribute('href');
    const match = href.match(/\/([A-Z]{4})\.html/);
    return match ? match[1] : null;
  }

  function showPopupMenu(event) {
    const popup = document.getElementById('card-popup-menu');
    const backdrop = document.getElementById('popup-backdrop');
    const addButton = document.getElementById('popup-add-compare');
    const removeButton = document.getElementById('popup-remove-compare');
    
    // Check if card is already selected
    const isSelected = selectedCards.some(card => card.type === currentCardData.type);
    
    // Show/hide appropriate buttons
    if (isSelected) {
      addButton.style.display = 'none';
      removeButton.style.display = 'flex';
    } else {
      removeButton.style.display = 'none';
      // Hide "Add to Compare" if already have 2 cards selected
      addButton.style.display = selectedCards.length >= 2 ? 'none' : 'flex';
    }
    
    // Show popup and backdrop
    popup.style.display = 'block';
    backdrop.style.display = 'block';
  }

  function closePopup() {
    document.getElementById('card-popup-menu').style.display = 'none';
    document.getElementById('popup-backdrop').style.display = 'none';
  }

  function setupPopupHandlers() {
    // View Details
    document.getElementById('popup-view-details').addEventListener('click', function() {
      closePopup();
      window.location.href = currentCardData.href;
    });

    // Add to Compare
    document.getElementById('popup-add-compare').addEventListener('click', function() {
      addToCompare(currentCardData);
      closePopup();
    });

    // Remove from Compare
    document.getElementById('popup-remove-compare').addEventListener('click', function() {
      removeFromCompare(currentCardData);
      closePopup();
    });
  }

  function addToCompare(cardData) {
    if (selectedCards.length >= 2) return;
    
    selectedCards.push(cardData);
    
    // Add glow effect to card
    cardData.element.classList.add('card-selected-for-compare');
    
    // Update comparison display
    updateCompareDisplay();
  }

  function removeFromCompare(cardData) {
    selectedCards = selectedCards.filter(card => card.type !== cardData.type);
    
    // Remove glow effect
    cardData.element.classList.remove('card-selected-for-compare');
    
    // Update comparison display
    updateCompareDisplay();
  }

  function buildCardHTML(cardData) {
    // Build the card preview
    let html = `
      <div class="compare-card-preview">
        <h3>${cardData.type}</h3>
        <p class="subtitle">${cardData.subtitle || cardData.title}</p>
      </div>
      
      <div class="compare-details">
    `;

    // Add cognitive stack if available
    if (cardData.cognitiveStack) {
      html += `
        <div class="compare-detail-section">
          <h4>Cognitive Functions</h4>
          <p>${cardData.cognitiveStack}</p>
        </div>
      `;
    }

    // Add description if available
    if (cardData.description) {
      html += `
        <div class="compare-detail-section">
          <h4>Overview</h4>
          <p>${cardData.description}</p>
        </div>
      `;
    }

    // Add strengths if available
    if (cardData.strengths) {
      const strengthsList = cardData.strengths.split(',').map(s => s.trim());
      html += `
        <div class="compare-detail-section">
          <h4>Strengths</h4>
          <ul>
            ${strengthsList.map(strength => `<li>${strength}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Add weaknesses if available
    if (cardData.weaknesses) {
      const weaknessesList = cardData.weaknesses.split(',').map(w => w.trim());
      html += `
        <div class="compare-detail-section">
          <h4>Growth Areas</h4>
          <ul>
            ${weaknessesList.map(weakness => `<li>${weakness}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    html += `</div>`;
    
    return html;
  }

  function updateCompareDisplay() {
    const slot1 = document.getElementById('compare-card-1');
    const slot2 = document.getElementById('compare-card-2');
    const clearBtn = document.getElementById('clear-compare');
    
    // Update slot 1
    if (selectedCards[0]) {
      slot1.innerHTML = buildCardHTML(selectedCards[0]);
      slot1.style.display = 'block';
      slot1.parentElement.querySelector('.compare-placeholder').style.display = 'none';
    } else {
      slot1.style.display = 'none';
      slot1.parentElement.querySelector('.compare-placeholder').style.display = 'block';
    }
    
    // Update slot 2
    if (selectedCards[1]) {
      slot2.innerHTML = buildCardHTML(selectedCards[1]);
      slot2.style.display = 'block';
      slot2.parentElement.querySelector('.compare-placeholder').style.display = 'none';
    } else {
      slot2.style.display = 'none';
      slot2.parentElement.querySelector('.compare-placeholder').style.display = 'block';
    }
    
    // Show/hide clear button
    clearBtn.style.display = selectedCards.length > 0 ? 'inline-block' : 'none';
  }

  function clearComparison() {
    // Remove glow from all selected cards
    selectedCards.forEach(card => {
      card.element.classList.remove('card-selected-for-compare');
    });
    
    selectedCards = [];
    updateCompareDisplay();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardCompare);
  } else {
    initCardCompare();
  }
})();