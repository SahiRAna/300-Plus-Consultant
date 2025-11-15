// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page with animation
    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.remove('hidden');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-indigo-600', 'text-white', 'md:text-indigo-600');
        link.classList.add('text-gray-900');
    });
    
    // Restart animations for the page
    restartAnimations(selectedPage);
    
    // Re-initialize counters if on services page
    if (pageId === 'services') {
        setTimeout(() => {
            animateCounters();
        }, 300);
    }
}

// Restart animations when page loads
function restartAnimations(container) {
    const elements = container.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up, .float-animation');
    elements.forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = '';
        }, 10);
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Check if element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.page-transition').forEach(el => {
        observer.observe(el);
    });
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form
    const form = e.target;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce';
    successMessage.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-2xl">✓</span>
            <div>
                <p class="font-bold">Thank you for your feedback!</p>
                <p class="text-sm">We'll get back to you soon.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    form.reset();
    
    // Remove message after 4 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 4000);
}

// Add hover effects to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax effect for background elements
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animated-ring');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add floating animation to form inputs on focus
function initFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Dynamic text color animation for headings
function initTextColorAnimation() {
    const headings = document.querySelectorAll('h1, h2');
    let colorIndex = 0;
    const colors = [
        'from-indigo-600 to-purple-600',
        'from-purple-600 to-pink-600',
        'from-pink-600 to-red-600',
        'from-blue-600 to-indigo-600'
    ];
    
    setInterval(() => {
        headings.forEach(heading => {
            if (heading.querySelector('.bg-clip-text')) {
                const span = heading.querySelector('.bg-clip-text');
                span.className = span.className.replace(/from-\S+ to-\S+/, colors[colorIndex]);
            }
        });
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize counters
    animateCounters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize parallax
    initParallax();
    
    // Initialize form animations
    initFormAnimations();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Add form submit handler
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Add ripple effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Initialize text color animation
    initTextColorAnimation();
    
    // Add escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Show home page by default
    showPage('home');
    
    // Add page transition class to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('page-transition');
    });
    
    // Trigger initial animation
    setTimeout(() => {
        document.querySelectorAll('.page-transition').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});

// Add scroll reveal effect
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const rings = document.querySelectorAll('.animated-ring');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    rings.forEach((ring, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        ring.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});