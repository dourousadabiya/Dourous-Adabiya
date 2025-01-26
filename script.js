const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section.content-section');

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
    let viewportCenter = window.pageYOffset + window.innerHeight / 2; // Center of viewport

    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
        const sectionCenter = sectionTop + section.clientHeight / 2; // Center of section
        const distanceToCenter = Math.abs(sectionCenter - viewportCenter); // Distance from section center to viewport center

        // Check if section is at least partially in viewport
        if (sectionTop <= viewportCenter && sectionBottom >= viewportCenter) {

            if (distanceToCenter < minDistance) { // Find the section closest to the viewport center
                minDistance = distanceToCenter;
                closestSection = section;
            }
        }
    });

    if (closestSection) {
        currentSection = closestSection.id;
    }


    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events and highlight active link
window.addEventListener('scroll', highlightNavLink);
window.addEventListener('load', highlightNavLink);