<script>
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let currentIndex = 0;
  let autoPlayInterval;

  function updateSlide(index) {
    currentIndex = (index + slides.length) % slides.length; // wrap around
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 5000); // 5 seconds per slide
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Buttons
  prevBtn.addEventListener('click', () => {
    updateSlide(currentIndex - 1);
    stopAutoPlay(); startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    updateSlide(currentIndex + 1);
    stopAutoPlay(); startAutoPlay();
  });

  // Swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });
  track.addEventListener('touchend', e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) updateSlide(currentIndex - 1); // swipe right
    if (diff < -50) updateSlide(currentIndex + 1); // swipe left
    startAutoPlay();
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Init
  updateSlide(0);
  startAutoPlay();
});
</script>