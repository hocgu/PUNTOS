// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');

    if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    observer.observe(element);
});

// Typography Animation - Split text into words
const animateText = (element) => {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        element.appendChild(span);
    });
};

// Apply text animation to hero subtitle after page load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // Reset and apply animation
        setTimeout(() => {
            animateText(heroSubtitle);
        }, 800);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
        contactForm.reset();
    });
}

// Add to cart functionality (placeholder)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.closest('.shop-item').querySelector('h3').textContent;
        alert(`"${productName}" added to cart! This is a demo.`);

        // Button animation
        button.textContent = 'Added!';
        button.style.background = '#48bb78';

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '';
        }, 2000);
    });
});

// Gallery item hover effect enhancement
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for multiple elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Different parallax speeds for depth
    document.querySelectorAll('[data-speed]').forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', navHighlighter);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Illustrator Portfolio Website Loaded Successfully!');
console.log('Features: Parallax Scrolling, Typography Animations, Smooth Scrolling, Responsive Design');
