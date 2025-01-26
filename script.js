const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a'); // Select all navbar links
const sections = document.querySelectorAll('section.content-section'); // Select content sections


menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-times');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
});

// Close navbar when clicking outside on mobile
document.addEventListener('click', (event) => {
    const isClickInsideNavbar = navbar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideNavbar && !isClickOnMenuToggle && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    }
});


// Function to highlight active navbar link based on section in view
function highlightNavLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3 && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active'); // Add active class to the current section's link
        }
    });
}

// Listen for scroll events and highlight active link
window.addEventListener('scroll', highlightNavLink);
window.addEventListener('load', highlightNavLink); // Highlight on page load as well