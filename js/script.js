/**
 * ============================================
 * CABRALES GARDENING - MAIN JAVASCRIPT
 * ============================================
 * A modern, premium-quality website for a 
 * professional gardening and landscaping business.
 * 
 * Table of Contents:
 * 1. DOM Elements
 * 2. Navigation
 * 3. Scroll Effects
 * 4. Scroll Animations (Intersection Observer)
 * 5. Stats Counter Animation
 * 6. Gallery Filter & Lightbox
 * 7. Testimonials Auto-Scroll
 * 8. Form Validation
 * 9. Back to Top Button
 * 10. Utility Functions
 * 11. Initialization
 * ============================================
 */

'use strict';

// ============================================
// 1. DOM ELEMENTS
// ============================================
const DOM = {
    // Navigation
    header: document.getElementById('header'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    mobileOverlay: document.getElementById('mobile-nav-overlay'),
    
    // Scroll Elements
    scrollIndicator: document.getElementById('scroll-indicator'),
    backToTop: document.getElementById('back-to-top'),
    footer: document.querySelector('footer'),
    
    // Stats
    statsNumbers: document.querySelectorAll('.stats__number'),
    
    // Gallery
    galleryFilters: document.querySelectorAll('.gallery__filter'),
    galleryItems: document.querySelectorAll('.gallery__item'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxClose: document.querySelector('.lightbox__close'),
    lightboxPrev: document.querySelector('.lightbox__prev'),
    lightboxNext: document.querySelector('.lightbox__next'),
    
    // Testimonials
    testimonialsSlider: document.getElementById('testimonials-slider'),
    testimonialsTrack: document.querySelector('.testimonials__track'),
    
    // Form
    contactForm: document.getElementById('contact-form'),
    formSuccess: document.getElementById('form-success'),
    charCount: document.getElementById('char-count'),
    messageTextarea: document.getElementById('message'),
    
    // Animate on scroll elements
    animateElements: document.querySelectorAll('.animate-on-scroll')
};

// ============================================
// 2. NAVIGATION
// ============================================
const Navigation = {
    isMenuOpen: false,
    
    init() {
        // Mobile menu toggle
        DOM.navToggle?.addEventListener('click', () => this.toggleMenu());
        
        // Close menu on overlay click
        DOM.mobileOverlay?.addEventListener('click', () => this.closeMenu());
        
        // Close menu on nav link click
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLink(link);
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        
        // Update active link on scroll
        this.setupScrollSpy();
    },
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        DOM.navToggle.classList.toggle('nav__toggle--active', this.isMenuOpen);
        DOM.navMenu.classList.toggle('nav__menu--active', this.isMenuOpen);
        DOM.mobileOverlay.classList.toggle('mobile-nav-overlay--active', this.isMenuOpen);
        DOM.navToggle.setAttribute('aria-expanded', this.isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    
    closeMenu() {
        if (!this.isMenuOpen) return;
        
        this.isMenuOpen = false;
        DOM.navToggle.classList.remove('nav__toggle--active');
        DOM.navMenu.classList.remove('nav__menu--active');
        DOM.mobileOverlay.classList.remove('mobile-nav-overlay--active');
        DOM.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    },
    
    setActiveLink(activeLink) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
        });
        activeLink.classList.add('nav__link--active');
    },
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
                    if (activeLink) {
                        this.setActiveLink(activeLink);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
};

// ============================================
// 3. SCROLL EFFECTS
// ============================================
const ScrollEffects = {
    lastScrollY: 0,
    ticking: false,
    
    init() {
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
        
        // Scroll indicator click
        DOM.scrollIndicator?.addEventListener('click', () => {
            const nextSection = document.querySelector('.stats');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Initial check
        this.updateScrollEffects();
    },
    
    onScroll() {
        this.lastScrollY = window.scrollY;
        
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    },
    
    updateScrollEffects() {
        const scrollY = this.lastScrollY;
        
        // Header scroll effect
        if (DOM.header) {
            DOM.header.classList.toggle('header--scrolled', scrollY > 100);
        }

        // Hide header when footer approaches (prevents overlap near page bottom)
        if (DOM.header && DOM.footer) {
            const footerTop = DOM.footer.getBoundingClientRect().top;
            const headerHeight = DOM.header.offsetHeight || 0;
            const hideThreshold = headerHeight + 16;
            const shouldHide = footerTop <= hideThreshold;

            // If the mobile menu is open, keep header visible so user can close it
            const menuOpen = DOM.navMenu?.classList.contains('nav__menu--active');
            DOM.header.classList.toggle('header--hidden', shouldHide && !menuOpen);
        }
        
        // Hide scroll indicator
        if (DOM.scrollIndicator) {
            DOM.scrollIndicator.classList.toggle('hero__scroll-indicator--hidden', scrollY > 200);
        }
        
        // Show/hide back to top button
        if (DOM.backToTop) {
            DOM.backToTop.classList.toggle('back-to-top--visible', scrollY > 500);
        }
    },
    
    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = DOM.header?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
};

// ============================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const ScrollAnimations = {
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animated');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        DOM.animateElements.forEach(element => {
            observer.observe(element);
        });
    }
};

// ============================================
// 5. STATS COUNTER ANIMATION
// ============================================
const StatsCounter = {
    hasAnimated: false,
    
    init() {
        if (DOM.statsNumbers.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                    observer.disconnect();
                }
            });
        }, observerOptions);
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    },
    
    animateCounters() {
        DOM.statsNumbers.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(target * easeOut);
                
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }
};

// ============================================
// 6. GALLERY FILTER & LIGHTBOX
// ============================================
const Gallery = {
    currentIndex: 0,
    galleryImages: [],
    
    init() {
        // Filter buttons
        DOM.galleryFilters.forEach(filter => {
            filter.addEventListener('click', () => this.filterGallery(filter));
        });
        
        // Gallery item clicks (lightbox)
        DOM.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Collect all gallery images
        this.galleryImages = Array.from(DOM.galleryItems).map(item => ({
            src: item.querySelector('img').src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800'),
            alt: item.querySelector('img').alt
        }));
        
        // Lightbox controls
        DOM.lightboxClose?.addEventListener('click', () => this.closeLightbox());
        DOM.lightboxPrev?.addEventListener('click', () => this.prevImage());
        DOM.lightboxNext?.addEventListener('click', () => this.nextImage());
        
        // Close on overlay click
        DOM.lightbox?.addEventListener('click', (e) => {
            if (e.target === DOM.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!DOM.lightbox?.classList.contains('lightbox--active')) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    },
    
    filterGallery(activeFilter) {
        const filterValue = activeFilter.dataset.filter;
        
        // Update active filter button
        DOM.galleryFilters.forEach(filter => {
            filter.classList.remove('gallery__filter--active');
        });
        activeFilter.classList.add('gallery__filter--active');
        
        // Filter gallery items
        DOM.galleryItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filterValue === 'all' || category === filterValue;
            
            if (shouldShow) {
                item.classList.remove('gallery__item--hidden');
                item.style.display = '';
            } else {
                item.classList.add('gallery__item--hidden');
                item.style.display = 'none';
            }
        });
        
        // Update gallery images array for lightbox
        this.galleryImages = Array.from(DOM.galleryItems)
            .filter(item => !item.classList.contains('gallery__item--hidden'))
            .map(item => ({
                src: item.querySelector('img').src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800'),
                alt: item.querySelector('img').alt
            }));
    },
    
    openLightbox(index) {
        // Find the actual index in filtered images
        const visibleItems = Array.from(DOM.galleryItems).filter(
            item => !item.classList.contains('gallery__item--hidden')
        );
        const clickedItem = DOM.galleryItems[index];
        this.currentIndex = visibleItems.indexOf(clickedItem);
        
        if (this.currentIndex === -1) this.currentIndex = 0;
        
        this.updateLightboxImage();
        DOM.lightbox?.classList.add('lightbox--active');
        document.body.style.overflow = 'hidden';
    },
    
    closeLightbox() {
        DOM.lightbox?.classList.remove('lightbox--active');
        document.body.style.overflow = '';
    },
    
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        this.updateLightboxImage();
    },
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
        this.updateLightboxImage();
    },
    
    updateLightboxImage() {
        if (this.galleryImages.length === 0) return;
        
        const image = this.galleryImages[this.currentIndex];
        if (DOM.lightboxImage && image) {
            DOM.lightboxImage.src = image.src;
            DOM.lightboxImage.alt = image.alt;
        }
    }
};

// ============================================
// 7. TESTIMONIALS AUTO-SCROLL
// ============================================
const Testimonials = {
    init() {
        if (!DOM.testimonialsTrack) return;
        
        // Clone testimonial cards for infinite scroll
        const cards = DOM.testimonialsTrack.innerHTML;
        DOM.testimonialsTrack.innerHTML = cards + cards;
        
        // Pause animation on hover
        DOM.testimonialsSlider?.addEventListener('mouseenter', () => {
            DOM.testimonialsTrack.style.animationPlayState = 'paused';
        });
        
        DOM.testimonialsSlider?.addEventListener('mouseleave', () => {
            DOM.testimonialsTrack.style.animationPlayState = 'running';
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        DOM.testimonialsSlider?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            DOM.testimonialsTrack.style.animationPlayState = 'paused';
        }, { passive: true });
        
        DOM.testimonialsSlider?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            DOM.testimonialsTrack.style.animationPlayState = 'running';
        }, { passive: true });
    }
};

// ============================================
// 8. FORM VALIDATION
// ============================================
const FormValidation = {
    init() {
        if (!DOM.contactForm) return;
        
        // Character counter for textarea
        DOM.messageTextarea?.addEventListener('input', () => this.updateCharCount());
        
        // Form submission
        DOM.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = DOM.contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('form-group--error')) {
                    this.validateField(input);
                }
            });
        });
        
        // Phone number formatting
        const phoneInput = DOM.contactForm.querySelector('#phone');
        phoneInput?.addEventListener('input', (e) => this.formatPhoneNumber(e));
    },
    
    updateCharCount() {
        if (DOM.charCount && DOM.messageTextarea) {
            const count = DOM.messageTextarea.value.length;
            DOM.charCount.textContent = count;
            
            if (count > 500) {
                DOM.messageTextarea.value = DOM.messageTextarea.value.substring(0, 500);
                DOM.charCount.textContent = 500;
            }
        }
    },
    
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        if (value.length >= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    },
    
    validateField(field) {
        const formGroup = field.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error state
        formGroup.classList.remove('form-group--error');
        
        // Check required
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Name validation
        else if (field.id === 'name' && field.value && field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
        
        // Select validation
        else if (field.tagName === 'SELECT' && field.required && !field.value) {
            isValid = false;
            errorMessage = 'Please select an option';
        }
        
        // Message validation
        else if (field.id === 'message' && field.value && field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        // Display error
        if (!isValid) {
            formGroup.classList.add('form-group--error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }
        
        return isValid;
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = `
                <span>Submitting...</span>
                <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="60" style="animation: spin 1s linear infinite;"></circle>
                </svg>
            `;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form, show success message
                form.style.display = 'none';
                DOM.formSuccess?.classList.add('contact__form-success--active');
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = '';
                    DOM.formSuccess?.classList.remove('contact__form-success--active');
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    if (DOM.charCount) DOM.charCount.textContent = '0';
                }, 5000);
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.form-group--error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
};

// ============================================
// 9. BACK TO TOP BUTTON
// ============================================
const BackToTop = {
    init() {
        DOM.backToTop?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ============================================
// 10. UTILITY FUNCTIONS
// ============================================
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Preload images
    preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
};

// ============================================
// 11. INITIALIZATION
// ============================================
const App = {
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },
    
    setup() {
        // Initialize all modules
        Navigation.init();
        ScrollEffects.init();
        ScrollAnimations.init();
        StatsCounter.init();
        Gallery.init();
        Testimonials.init();
        FormValidation.init();
        BackToTop.init();
        
        // Add loaded class for animations
        document.body.classList.add('loaded');
        
        // Log initialization
        console.log('🌿 Cabrales Gardening website initialized');
    }
};

// Start the app
App.init();

// Add spinner animation to head for form loading state
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .spinner {
        width: 1.25rem;
        height: 1.25rem;
        animation: spin 1s linear infinite;
    }
    .spinner circle {
        stroke-dasharray: 60;
        stroke-dashoffset: 60;
        animation: spin 1.5s linear infinite;
    }
`;
document.head.appendChild(spinnerStyle);
