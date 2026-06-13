document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       DYNAMIC NAVIGATION SCROLL ACTIVE STATE
       ========================================================================== */
    const sections = document.querySelectorAll('section, main');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewport area
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* ==========================================================================
       FEATURED PROJECTS CAROUSEL SLIDER
       ========================================================================== */
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotContainer = document.getElementById('carousel-dots');
    
    if (track && prevBtn && nextBtn && dotContainer) {
        const slides = Array.from(track.children);
        const dots = Array.from(dotContainer.children);
        let currentIndex = 2; // E-Commerce Experience is index 2

        const updateCarousel = () => {
            // Keep index within bounds
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > slides.length - 1) currentIndex = slides.length - 1;

            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Set active slide and dot
            const activeSlide = slides[currentIndex];
            activeSlide.classList.add('active');
            dots[currentIndex].classList.add('active');

            // Responsive calculations
            const isSmallScreen = window.innerWidth <= 768;
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
            
            let transXDiff = 210;
            let farTransXDiff = 370;
            if (isSmallScreen) {
                transXDiff = 90;
                farTransXDiff = 160;
            } else if (isTablet) {
                transXDiff = 160;
                farTransXDiff = 290;
            }

            slides.forEach((slide, idx) => {
                const diff = idx - currentIndex;
                let opacity = 0;
                let transform = '';
                let zIndex = 0;
                
                if (diff === 0) {
                    // Center Active Card
                    transform = 'translateX(0px) scale(1.1) rotate(0deg)';
                    opacity = 1;
                    zIndex = 10;
                } else if (diff === -1) {
                    // Tilted Left
                    transform = `translateX(${-transXDiff}px) scale(0.95) rotate(-2deg)`;
                    opacity = 0.95;
                    zIndex = 8;
                } else if (diff === 1) {
                    // Tilted Right
                    transform = `translateX(${transXDiff}px) scale(0.95) rotate(2deg)`;
                    opacity = 0.95;
                    zIndex = 8;
                } else if (diff === -2) {
                    // Far Left
                    transform = `translateX(${-farTransXDiff}px) scale(0.85) rotate(-4deg)`;
                    opacity = 0.8;
                    zIndex = 6;
                } else if (diff === 2) {
                    // Far Right
                    transform = `translateX(${farTransXDiff}px) scale(0.85) rotate(4deg)`;
                    opacity = 0.8;
                    zIndex = 6;
                } else {
                    // Hide other cards offscreen
                    if (diff < -2) {
                        transform = `translateX(${-farTransXDiff - 100}px) scale(0.7) rotate(-6deg)`;
                    } else {
                        transform = `translateX(${farTransXDiff + 100}px) scale(0.7) rotate(6deg)`;
                    }
                    opacity = 0;
                    zIndex = 1;
                }
                
                slide.style.transform = transform;
                slide.style.opacity = opacity;
                slide.style.zIndex = zIndex;
            });
        };

        // Click Arrow Event Listeners
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Click Dots Event Listeners
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
            });
        });

        // Click Cards to Focus Event Listeners
        slides.forEach((slide, idx) => {
            slide.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
            });
        });

        // Initial setup and resize listener
        window.addEventListener('resize', updateCarousel);
        
        // Timeout to ensure initial layout measurements are ready
        setTimeout(updateCarousel, 200);
    }
});
