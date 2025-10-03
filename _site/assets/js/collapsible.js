// Collapsible Section Toggle
function toggleCollapsible(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  
  if (content && content.classList.contains('collapsible-content')) {
    content.classList.toggle('collapsed');
    icon.textContent = content.classList.contains('collapsed') ? '+' : '−';
  }
}

// Initialize all collapsible sections on page load
document.addEventListener('DOMContentLoaded', function() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      toggleCollapsible(this);
    });
    
    // Add keyboard accessibility
    header.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCollapsible(this);
      }
    });
    
    // Make focusable for keyboard navigation
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'true');
  });
});