// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

mobileToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu when clicking a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        isMenuOpen = false;
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let scrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !scrolled) {
        navbar.classList.remove('bg-transparent', 'py-6');
        navbar.classList.add('bg-[#FFF9F8]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        scrolled = true;
    } else if (window.scrollY <= 50 && scrolled) {
        navbar.classList.remove('bg-[#FFF9F8]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar.classList.add('bg-transparent', 'py-6');
        scrolled = false;
    }
});

// Dropdown functionality
const aboutDropdown = document.getElementById('about-dropdown');
const aboutMenu = document.getElementById('about-menu');
const sessionsDropdown = document.getElementById('sessions-dropdown');
const sessionsMenu = document.getElementById('sessions-menu');
let activeDropdown = null;

function showDropdown(menu) {
    menu.classList.remove('opacity-0', 'scale-95', 'invisible');
    menu.classList.add('opacity-100', 'scale-100', 'visible');
}

function hideDropdown(menu) {
    menu.classList.remove('opacity-100', 'scale-100', 'visible');
    menu.classList.add('opacity-0', 'scale-95', 'invisible');
}

aboutDropdown.addEventListener('mouseenter', () => {
    showDropdown(aboutMenu);
    activeDropdown = 'about';
});

aboutDropdown.addEventListener('mouseleave', () => {
    hideDropdown(aboutMenu);
    activeDropdown = null;
});

sessionsDropdown.addEventListener('mouseenter', () => {
    showDropdown(sessionsMenu);
    activeDropdown = 'sessions';
});

sessionsDropdown.addEventListener('mouseleave', () => {
    hideDropdown(sessionsMenu);
    activeDropdown = null;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Testimonial expand/collapse functionality
function toggleTestimonial(cardId) {
    const card = document.getElementById(cardId);
    const backdrop = document.getElementById('testimonial-backdrop');
    const button = card.querySelector('.read-more-btn');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        card.classList.remove('expanded');
        backdrop.classList.remove('active');
        backdrop.classList.add('hidden');
        button.textContent = 'Read More';
        
        // Scroll back to card position
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // Expand
        card.classList.add('expanded');
        backdrop.classList.remove('hidden');
        backdrop.classList.add('active');
        button.textContent = 'Read Less';
        
        // Scroll to card
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Close expanded testimonial when clicking backdrop
document.getElementById('testimonial-backdrop').addEventListener('click', function() {
    const expandedCard = document.querySelector('.testimonial-card.expanded');
    if (expandedCard) {
        const cardId = expandedCard.id;
        toggleTestimonial(cardId);
    }
});
