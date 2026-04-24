// ========== Mobile Navigation Toggle ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========== Form Submission ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Create mailto link
    const mailtoLink = `mailto:priyakrish816@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

    // Show success message
    const originalText = contactForm.querySelector('button').textContent;
    contactForm.querySelector('button').textContent = 'Opening email client...';

    // Open default email client
    window.location.href = mailtoLink;

    // Reset button text after 2 seconds
    setTimeout(() => {
        contactForm.querySelector('button').textContent = originalText;
    }, 2000);

    // Reset form
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .cert-item, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== Navbar Background on Scroll ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.querySelector('.hero-scroll');
    const scrollProgress = window.scrollY / window.innerHeight;
    
    // Fade out hero content and scroll indicator
    if (heroContent) {
        heroContent.style.opacity = Math.max(0, 1 - scrollProgress * 1.5);
        heroContent.style.pointerEvents = scrollProgress > 0.5 ? 'none' : 'auto';
    }
    
    if (heroScroll) {
        heroScroll.style.opacity = Math.max(0, 1 - scrollProgress * 1.5);
        heroScroll.style.pointerEvents = scrollProgress > 0.5 ? 'none' : 'auto';
    }
    
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--primary-color)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'var(--primary-color)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ========== Smooth Scroll for Navigation ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Active Navigation Link Highlighting ==========
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    if (current) {
        const activeLink = document.querySelector(`.nav-menu a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});

// ========== Counter Animation for Stats ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const h3 = entry.target.querySelector('h3');
            const value = parseInt(h3.textContent);
            animateCounter(h3, value);
        }
    });
});

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ========== Keyboard Navigation ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ========== Prevent Right Click on Portfolio (Optional - Remove if not desired) ==========
// Uncomment below if you want to prevent right-click
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});
*/

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== Dynamic Year in Footer ==========
document.querySelectorAll('.footer p').forEach(p => {
    if (p.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        p.textContent = p.textContent.replace('2026', currentYear);
    }
});

// ========== Parallax Effect (Optional) ==========
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========== Add Loading State to Form ==========
const formButton = contactForm.querySelector('button');
formButton.addEventListener('mouseenter', () => {
    formButton.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.4)';
});

formButton.addEventListener('mouseleave', () => {
    formButton.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
});

// ========== Mobile Menu Toggle Styling ==========
navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ========== Add CSS for Mobile Menu Toggle Animation ==========
const style = document.createElement('style');
style.textContent = `
    .nav-toggle span {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ========== Accessibility: Skip to Content Link ==========
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.style.position = 'absolute';
skipLink.style.left = '-10000px';
skipLink.style.zIndex = '999';
skipLink.className = 'skip-link';
document.body.insertBefore(skipLink, document.body.firstChild);

const skipCSS = document.createElement('style');
skipCSS.textContent = `
    .skip-link:focus {
        position: fixed;
        top: 10px;
        left: 10px;
        background: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 9999;
    }
`;
document.head.appendChild(skipCSS);

// ========== Scroll to Top Button ==========
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Console Message ==========
console.log(
    '%c Welcome to Priyadharshini\'s Portfolio! ',
    'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 14px; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
);
console.log(
    '%c Let\'s build something amazing together! 🚀',
    'color: #6366f1; font-size: 12px; font-weight: 600;'
);
