/* ============================================
   OLD SCHOOL FITNESS CLUB — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
    initParticles();
    initSmoothScroll();
    initAnalyticsEvents();
});

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Don't unobserve, so they reanimate if scrolled back
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    document.querySelectorAll('.animate-in').forEach((el) => {
        observer.observe(el);
    });
}

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 80) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* --- Floating Particles --- */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 6;
        const size = 2 + Math.random() * 3;

        particle.style.left = `${x}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}

/* --- Smooth Scroll for Nav Links --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth',
                });
            }
        });
    });
}

/* --- Google Analytics Events --- */
function initAnalyticsEvents() {
    if (typeof gtag !== 'function') return;

    // WhatsApp CTA button clicks
    document.querySelectorAll('a[href*="chat.whatsapp.com"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            gtag('event', 'whatsapp_click', {
                event_category: 'CTA',
                event_label: btn.closest('.join') ? 'Join Section' : 'Other',
            });
        });
    });

    // Google Maps location link
    document.querySelectorAll('a[href*="maps.app.goo.gl"]').forEach((link) => {
        link.addEventListener('click', () => {
            gtag('event', 'map_click', {
                event_category: 'CTA',
                event_label: 'Location Link',
            });
        });
    });

    // Hero "Вступить в клуб" button
    const heroCta = document.querySelector('.hero .btn-primary');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            gtag('event', 'hero_cta_click', {
                event_category: 'CTA',
                event_label: 'Hero Join Button',
            });
        });
    }

    // Hero "Узнать больше" button
    const heroLearnMore = document.querySelector('.hero .btn-outline');
    if (heroLearnMore) {
        heroLearnMore.addEventListener('click', () => {
            gtag('event', 'learn_more_click', {
                event_category: 'Navigation',
                event_label: 'Hero Learn More',
            });
        });
    }

    // Nav "Вступить" button
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.addEventListener('click', () => {
            gtag('event', 'nav_cta_click', {
                event_category: 'CTA',
                event_label: 'Nav Join Button',
            });
        });
    }

    // Track section views
    const sections = document.querySelectorAll('.section, .hero');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        event_category: 'Engagement',
                        event_label: entry.target.id || 'unknown',
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}
