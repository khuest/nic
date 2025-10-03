// Card Compare System - Loads data from Jekyll YAML files
(function() {
  let selectedCards = [];
  let currentCardElement = null;
  let currentCardType = null;
  let compareData = {}; // Will be loaded from YAML via Jekyll

  function initCardCompare() {
    // Load comparison data from global variable (injected by Jekyll)
    loadCompareData();
    
    // Get all card links in the grid
    const cardLinks = document.querySelectorAll('.grid .card-link');
    
    cardLinks.forEach(link => {
      const cardDiv = link.querySelector('.card');
      if (!cardDiv) return;
      
      const type = cardDiv.getAttribute('data-type');
      
      // Prevent default link behavior and show popup instead
      link.addEventListener('click', function(e) {
        e.preventDefault();
        currentCardElement = link;
        currentCardType = type;
        showPopupMenu(e);
      });
    });

    setupPopupHandlers();
    
    const backdrop = document.getElementById('popup-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closePopup);
    }
    
    const clearBtn = document.getElementById('clear-compare');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearComparison);
    }
  }

  function loadCompareData() {
    // Expects window.mbtiCompareData to be populated by Jekyll
    if (window.mbtiCompareData) {
      compareData = window.mbtiCompareData;
    } else {
      console.error('MBTI comparison data not loaded');
    }
  }

  function showPopupMenu(event) {
    const popup = document.getElementById('card-popup-menu');
    const backdrop = document.getElementById('popup-backdrop');
    const addButton = document.getElementById('popup-add-compare');
    const removeButton = document.getElementById('popup-remove-compare');
    
    if (!popup || !backdrop || !addButton || !removeButton) return;
    
    const isSelected = selectedCards.some(card => card.type === currentCardType);
    
    if (isSelected) {
      addButton.style.display = 'none';
      removeButton.style.display = 'flex';
    } else {
      removeButton.style.display = 'none';
      addButton.style.display = selectedCards.length >= 2 ? 'none' : 'flex';
    }
    
    popup.style.display = 'block';
    backdrop.style.display = 'block';
  }

  function closePopup() {
    const popup = document.getElementById('card-popup-menu');
    const backdrop = document.getElementById('popup-backdrop');
    if (popup) popup.style.display = 'none';
    if (backdrop) backdrop.style.display = 'none';
  }

  function setupPopupHandlers() {
    const viewBtn = document.getElementById('popup-view-details');
    if (viewBtn) {
      viewBtn.addEventListener('click', function() {
        closePopup();
        if (currentCardElement) {
          const href = currentCardElement.getAttribute('href');
          if (href) window.location.href = href;
        }
      });
    }

    const addBtn = document.getElementById('popup-add-compare');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        addToCompare();
        closePopup();
      });
    }

    const removeBtn = document.getElementById('popup-remove-compare');
    if (removeBtn) {
      removeBtn.addEventListener('click', function() {
        removeFromCompare();
        closePopup();
      });
    }
  }

  function addToCompare() {
    if (selectedCards.length >= 2 || !currentCardType) return;
    
    const cardData = {
      type: currentCardType,
      element: currentCardElement
    };
    
    selectedCards.push(cardData);
    currentCardElement.classList.add('card-selected-for-compare');
    updateCompareDisplay();
  }

  function removeFromCompare() {
    if (!currentCardType) return;
    
    const cardToRemove = selectedCards.find(card => card.type === currentCardType);
    if (cardToRemove) {
      cardToRemove.element.classList.remove('card-selected-for-compare');
      selectedCards = selectedCards.filter(card => card.type !== currentCardType);
      updateCompareDisplay();
    }
  }

  function buildCardHTML(cardData) {
    const typeData = compareData[cardData.type];
    if (!typeData) {
      return `
        <div class="compare-card-preview">
          <h3>${cardData.type}</h3>
          <p class="no-data">Comparison data not available</p>
        </div>
      `;
    }

    const cardDiv = cardData.element.querySelector('.card');
    const archetype = cardDiv ? cardDiv.getAttribute('data-archetype') : '';

    let html = `
      <div class="compare-card-preview">
        <h3>${cardData.type}</h3>
        <p class="subtitle">${archetype}</p>
        <p class="stack-label">${typeData.stack || ''}</p>
      </div>
    `;

    // Build DIFFERENCES section
    if (typeData.differences) {
      html += `<div class="compare-section-header">Key Differences</div>`;
      html += `<div class="compare-details">`;
      
      const diffOrder = [
        'hero_function',
        'inferior_function',
        'parent_function',
        'hero_child_loop',
        'overgiving_parent',
        'inferior_overwhelm'
      ];

      diffOrder.forEach(key => {
        const item = typeData.differences[key];
        if (item) {
          html += `
            <div class="compare-detail-item">
              <h4>${item.title}</h4>
              <p class="detail-description">${item.description}</p>
              <ul class="detail-examples">
          `;
          
          if (item.examples && Array.isArray(item.examples)) {
            item.examples.forEach(example => {
              html += `<li>${example}</li>`;
            });
          }
          
          html += `</ul></div>`;
        }
      });
      
      html += `</div>`;
    }

    // Build SIMILARITIES section
    if (typeData.similarities) {
      html += `<div class="compare-section-header">Similarities With Other Types</div>`;
      html += `<div class="compare-details">`;
      
      Object.keys(typeData.similarities).forEach(key => {
        const sim = typeData.similarities[key];
        if (sim) {
          html += `
            <div class="compare-similarity-item">
              <h4>${sim.title}</h4>
              <ul class="similarity-points">
          `;
          
          if (sim.points && Array.isArray(sim.points)) {
            sim.points.forEach(point => {
              html += `<li>${point}</li>`;
            });
          }
          
          html += `</ul></div>`;
        }
      });
      
      html += `</div>`;
    }
    
    return html;
  }

  function updateCompareDisplay() {
    const slot1 = document.getElementById('compare-card-1');
    const slot2 = document.getElementById('compare-card-2');
    const clearBtn = document.getElementById('clear-compare');
    
    if (!slot1 || !slot2 || !clearBtn) return;
    
    // Update slot 1
    if (selectedCards[0]) {
      slot1.innerHTML = buildCardHTML(selectedCards[0]);
      slot1.style.display = 'block';
      const placeholder = slot1.parentElement.querySelector('.compare-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    } else {
      slot1.style.display = 'none';
      const placeholder = slot1.parentElement.querySelector('.compare-placeholder');
      if (placeholder) placeholder.style.display = 'block';
    }
    
    // Update slot 2
    if (selectedCards[1]) {
      slot2.innerHTML = buildCardHTML(selectedCards[1]);
      slot2.style.display = 'block';
      const placeholder = slot2.parentElement.querySelector('.compare-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    } else {
      slot2.style.display = 'none';
      const placeholder = slot2.parentElement.querySelector('.compare-placeholder');
      if (placeholder) placeholder.style.display = 'block';
    }
    
    clearBtn.style.display = selectedCards.length > 0 ? 'inline-block' : 'none';
  }

  function clearComparison() {
    selectedCards.forEach(card => {
      if (card.element) {
        card.element.classList.remove('card-selected-for-compare');
      }
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