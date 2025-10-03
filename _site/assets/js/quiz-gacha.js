class QuizGacha {
  constructor() {
    this.drawnQuiz = null;
    this.currentQuizInstance = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    console.log('Quiz Gacha initialized');
    console.log('Available quizzes:', Object.keys(window.siteQuizData || {}));
  }

  setupEventListeners() {
    // Draw Card button
    const drawBtn = document.getElementById('draw-card-btn');
    if (drawBtn) {
      drawBtn.addEventListener('click', () => this.drawCard());
    }

    // Play Card button  
    const playBtn = document.getElementById('play-card-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.playCard());
    }

    // Dropdown selection
    const dropdown = document.getElementById('quiz-selector');
    if (dropdown) {
      dropdown.addEventListener('change', (e) => this.selectQuizFromDropdown(e.target.value));
    }

    // Deck click (alternative to draw button)
    const deckCards = document.querySelectorAll('.card-in-deck');
    deckCards.forEach(card => {
      card.addEventListener('click', () => this.shuffleDeck());
    });
  }

  shuffleDeck() {
    const deckPile = document.querySelector('.deck-pile');
    if (deckPile) {
      deckPile.style.animation = 'deckShuffle 0.5s ease-in-out';
      setTimeout(() => {
        deckPile.style.animation = '';
      }, 500);
    }
  }
  
  drawCard() {
    // Get available quizzes
    const quizSlugs = Object.keys(window.siteQuizData || {});
    if (quizSlugs.length === 0) {
      console.error('No quizzes available');
      return;
    }

    // Pick random quiz
    const randomSlug = quizSlugs[Math.floor(Math.random() * quizSlugs.length)];
    const selectedQuiz = window.siteQuizData[randomSlug];
    
    this.drawnQuiz = {
      slug: randomSlug,
      data: selectedQuiz
    };

    console.log('Drew card:', selectedQuiz.title);

    // Animate card flip
    this.showDrawnCard();
  }

  showDrawnCard() {
    const emptySpace = document.getElementById('empty-space');
    const drawnCard = document.getElementById('drawn-card');
    const playBtn = document.getElementById('play-card-btn');
    // const drawnTitle = document.getElementById('drawn-title');
    const drawnPicture = document.getElementById('drawn-picture');
  
    if (emptySpace && drawnCard && this.drawnQuiz) {
      emptySpace.style.display = 'none';
  
      // Pull from YAML
      const quizData = this.drawnQuiz.data;
      const cardTitle = quizData["card-title"]
      // const quizType = quizData["card-title"];
      const picture = quizData.picture 
        ? `${BASEURL}/assets/images/quiz/${quizData.picture}`
        : "";
  
      // if (drawnTitle) drawnTitle.textContent = quizType;
      if (drawnPicture && picture) drawnPicture.src = picture;      
      
      if (drawnPicture) {
        if (picture) {
          // Show picture, hide any title
          drawnPicture.src = picture;
          drawnPicture.style.display = 'block';
          drawnPicture.alt = cardTitle;
        } else {
          // No picture - show title as text content
          drawnPicture.style.display = 'none';
        
          // Create or update a title element
          let titleElement = drawnCard.querySelector('.card-title-fallback');
          if (!titleElement) {
            titleElement = document.createElement('div');
            titleElement.className = 'card-title-fallback';
            drawnCard.appendChild(titleElement);
          }
          titleElement.textContent = cardTitle;
          titleElement.style.display = 'block';
        }
      }  
  
      drawnCard.style.display = 'block';
  
      if (playBtn) playBtn.style.display = 'block';
    }
  }
    

  playCard() {
    if (!this.drawnQuiz) {
      console.error('No card drawn');
      return;
    }

    console.log('Playing card:', this.drawnQuiz.data.title);
    this.loadQuizIntoFrame(this.drawnQuiz.slug);
  }

  selectQuizFromDropdown(slug) {
    if (!slug) return;
  
    console.log('Selected quiz from dropdown:', slug);
  
    const quizData = window.siteQuizData[slug];
    if (!quizData) return;
  
    // Update the big card frame
    const drawnTitle = document.getElementById("drawn-title");
    const drawnPicture = document.getElementById("drawn-picture");
  
    if (drawnTitle) {
      drawnTitle.textContent = quizData["card-title"] || quizData.title || "Untitled Quiz";
    }
  
    if (drawnPicture) {
      drawnPicture.src = quizData.picture
        ? `${BASEURL}/assets/images/quiz/${quizData.picture}`
        : `${BASEURL}/assets/images/quiz/cardfront-frame.png`; // fallback
      drawnPicture.alt = quizData.title || "Quiz cover";
    }
  
    // Finally, load the actual quiz into the big frame
    this.loadQuizIntoFrame(slug);
  }
  

  loadQuizIntoFrame(slug) {
    const quizData = window.siteQuizData[slug];
    if (!quizData) {
      console.error('Quiz data not found for:', slug);
      return;
    }

    // Hide initial video state
    const initialState = document.getElementById('initial-state');
    const quizState = document.getElementById('quiz-state');
    const quizContent = document.getElementById('quiz-content');
  
    
    if (initialState && quizState && quizContent) {
      initialState.style.display = 'none';
      quizState.style.display = 'block';
    
      // Simply inject the same div structure your test uses
      quizContent.innerHTML = `<div id="quiz-container-99" data-quiz="${slug}"></div>`;
    
      // Let your existing quiz.js handle the rest
      const newContainer = document.getElementById('quiz-container-99');
      if (newContainer && window.initializeQuiz) {
        window.initializeQuiz(newContainer);
      }       
    }
  }

  // Reset functions
  resetDrawnCard() {
    const emptySpace = document.getElementById('empty-space');
    const drawnCard = document.getElementById('drawn-card');
    const playBtn = document.getElementById('play-card-btn');

    if (emptySpace && drawnCard) {
      emptySpace.style.display = 'flex';
      drawnCard.style.display = 'none';
    }
    
    if (playBtn) {
      playBtn.style.display = 'none';
    }

    this.drawnQuiz = null;
  }

  resetFrame() {
    const initialState = document.getElementById('initial-state');
    const quizState = document.getElementById('quiz-state');
    
    if (initialState && quizState) {
      initialState.style.display = 'block';
      quizState.style.display = 'none';
    }

    if (this.currentQuizInstance && this.currentQuizInstance.destroy) {
      this.currentQuizInstance.destroy();
      this.currentQuizInstance = null;
    }
  }

  // XP Integration placeholder
  addXP(amount, message) {
    // TODO: Integrate with your XP system
    console.log(`XP +${amount}: ${message}`);
    
    // If you have global XP functions
    if (window.addXP) {
      window.addXP(amount, message);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.quizGacha = new QuizGacha();
});

// Debug helpers
window.debugGacha = {
  drawSpecific: (slug) => {
    if (window.quizGacha && window.siteQuizData[slug]) {
      window.quizGacha.drawnQuiz = {
        slug: slug,
        data: window.siteQuizData[slug]
      };
      window.quizGacha.showDrawnCard();
    }
  },
  reset: () => {
    if (window.quizGacha) {
      window.quizGacha.resetDrawnCard();
      window.quizGacha.resetFrame();
    }
  },
  listQuizzes: () => {
    console.table(Object.keys(window.siteQuizData || {}));
  }
};
