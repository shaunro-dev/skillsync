// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Navigation Active State Logic
   * Improved to handle empty paths (index.html) and URL parameters.
   */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      link.style.color = 'var(--accent-blue)';
    }
  });

  /**
   * Scroll Animation Logic
   * Handles the '.animate-fade' classes used throughout the project.
   */
  const animateElements = document.querySelectorAll('.animate-fade');
  if (animateElements.length > 0) {
    const observerOptions = {
      threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Once animated, stop observing to save performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
});

/**
 * Authentication Object
 * Wrapped in 'Auth' to match the calls in dashboard and profile pages.
 */
const Auth = {
  logout: function() {
    console.log("Cleaning session and logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
};

// Also keep a global logout reference just in case some pages call it directly
const logout = Auth.logout;