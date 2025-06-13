// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'navOverlay';
  body.appendChild(overlay);

  // Toggle mobile menu
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
  }

  // Close mobile menu
  function closeMenu() {
    hamburger.classList.remove('active');
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
  }

  // Event listeners
  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on mobile nav links
  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on window resize if desktop view
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      closeMenu();
    }
  });

  // Make closeMenu function globally available
  window.closeMenu = closeMenu;
});