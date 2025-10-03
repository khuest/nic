document.addEventListener("DOMContentLoaded", () => {
  // Find all quiz containers on the page
  const quizContainers = document.querySelectorAll('[id^="quiz-container"]');
  
  quizContainers.forEach(quizEl => {
    initializeQuiz(quizEl);
  });

  function initializeQuiz(quizEl) {
    const quizSlug = quizEl.dataset.quiz;
    const quizData = window.siteQuizData[quizSlug];
    
    if (!quizData) {
      quizEl.innerHTML = `<p>Quiz "${quizSlug}" not found.</p>`;
      return;
    }

    let currentQ = 0;
    let answers = {}; // Store answers as { questionId: selectedValue }

    function renderQuestion() {
      const q = quizData.questions[currentQ];
      quizEl.innerHTML = `
        <div class="quiz-card">
          ${q.image ? `<img src="${q.image}" alt="" class="quiz-img">` : ""}
          <div class="quiz-content">
            <h2>${quizData.title}</h2>
            <p class="quiz-text">${q.text}</p>
            <div class="quiz-options">
              ${q.options.map(o =>
                `<button class="quiz-option" data-id="${q.id}" data-value="${o.value}">
                  ${o.text}
                </button>`
              ).join("")}
            </div>
            <div class="quiz-nav">
              <button id="prevBtn-${quizEl.id}" class="prevBtn" ${currentQ === 0 ? "disabled" : ""}>← Prev</button>
              <button id="nextBtn-${quizEl.id}" class="nextBtn" disabled>Next →</button>
            </div>
            <div class="quiz-progress">
              Question ${currentQ + 1} of ${quizData.questions.length}
            </div>
          </div>
        </div>
      `;
      
      // If we already answered this question, highlight the previous answer
      if (answers[q.id]) {
        const prevAnswerBtn = quizEl.querySelector(`[data-value="${answers[q.id]}"]`);
        if (prevAnswerBtn) {
          prevAnswerBtn.classList.add('selected');
          quizEl.querySelector(`#nextBtn-${quizEl.id}`).disabled = false;
        }
      }
    }

    quizEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      // option clicked
      if (btn.classList.contains("quiz-option")) {
        // Remove previous selection styling
        quizEl.querySelectorAll(".quiz-option").forEach(b => b.classList.remove('selected'));
        
        // Mark this option as selected
        btn.classList.add('selected');
        
        // Store the answer
        answers[btn.dataset.id] = btn.dataset.value;
        
        // Enable "Next" button
        quizEl.querySelector(`#nextBtn-${quizEl.id}`).disabled = false;
      }

      // nav clicked
      if (btn.id === `nextBtn-${quizEl.id}`) {
        currentQ++;
        if (currentQ < quizData.questions.length) {
          renderQuestion();
        } else {
          finishQuiz();
        }
      }
      if (btn.id === `prevBtn-${quizEl.id}`) {
        currentQ--;
        renderQuestion();
      }

      // restart clicked
      if (btn.classList.contains(`restartBtn-${quizEl.id}`)) {
        currentQ = 0;
        answers = {};
        renderQuestion();
      }
    });

    function finishQuiz() {
      // Count votes for each result type
      const votes = {};
      Object.values(answers).forEach(value => {
        votes[value] = (votes[value] || 0) + 1;
      });
      
      // Find the result with the most votes
      const winnerValue = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
      const result = quizData.results[winnerValue];

      quizEl.innerHTML = `
        <div class="quiz-result">
          <h2>${result.title}</h2>
          <p>${result.description}</p>
          ${result.image ? `<img src="${result.image}" alt="" class="quiz-result-img">` : ""}
          ${result.traits ? `
            <div class="quiz-traits">
              <h4>Your Traits:</h4>
              <div class="trait-tags">
                ${result.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join("")}
              </div>
            </div>
          ` : ""}
          ${result.element_powers ? `
            <div class="quiz-powers">
              <h4>Your Powers:</h4>
              <div class="power-tags">
                ${result.element_powers.map(power => `<span class="power-tag">${power}</span>`).join("")}
              </div>
            </div>
          ` : ""}
          <div class="quiz-actions">
            <button class="restartBtn-${quizEl.id} quiz-restart">Take Quiz Again</button>
            ${result.redirect ? `<a href="${result.redirect}" class="quiz-link">Learn More</a>` : ""}
          </div>
        </div>
      `;
    }

    // Start the quiz
    renderQuestion();
  }
});
