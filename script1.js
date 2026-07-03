// section 1, 2, 3, navbar

   /* ==================== NAVBAR SCROLL ==================== */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });

        /* ==================== MOBILE SIDEBAR ==================== */
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        const sidebarClose = document.getElementById('sidebarClose');

        function openSidebar() {
            mobileSidebar.classList.add('active');
            sidebarBackdrop.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.classList.add('sidebar-open');
            mobileSidebar.setAttribute('aria-hidden', 'false');
        }

        function closeSidebar() {
            mobileSidebar.classList.remove('active');
            sidebarBackdrop.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            mobileSidebar.setAttribute('aria-hidden', 'true');
        }

        mobileMenuBtn.addEventListener('click', () => {
            mobileSidebar.classList.contains('active') ? closeSidebar() : openSidebar();
        });

        sidebarClose.addEventListener('click', closeSidebar);
        sidebarBackdrop.addEventListener('click', closeSidebar);

        document.querySelectorAll('.sidebar-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const item = toggle.closest('.sidebar-item');
                document.querySelectorAll('.sidebar-item.open').forEach(open => {
                    if (open !== item) open.classList.remove('open');
                });
                item.classList.toggle('open');
            });
        });

        document.querySelectorAll('.mobile-sidebar a').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) closeSidebar();
        });

        /* ==================== SEARCH OVERLAY ==================== */
        const searchBtn = document.getElementById('searchBtn');
        const searchOverlay = document.getElementById('searchOverlay');
        const closeSearch = document.getElementById('closeSearch');

        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchOverlay.querySelector('input').focus(), 400);
        });

        function hideSearch() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeSearch.addEventListener('click', hideSearch);
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) hideSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (searchOverlay.classList.contains('active')) hideSearch();
                if (mobileSidebar.classList.contains('active')) closeSidebar();
            }
        });

        /* ==================== TYPED HEADLINE ==================== */
        const phrases = [
            'Convert Visitors Into Customers',
            'Grow Businesses Online',
            'Turn Clicks Into Clients'
        ];
        const typedEl = document.getElementById('typedText');
        let phraseIndex = 0, charIndex = phrases[0].length, deleting = true;

        function typeLoop() {
            const current = phrases[phraseIndex];
            if (deleting) {
                charIndex--;
                typedEl.textContent = current.substring(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeLoop, 350);
                    return;
                }
                setTimeout(typeLoop, 32);
            } else {
                charIndex++;
                typedEl.textContent = phrases[phraseIndex].substring(0, charIndex);
                if (charIndex === phrases[phraseIndex].length) {
                    deleting = true;
                    setTimeout(typeLoop, 3200);
                    return;
                }
                setTimeout(typeLoop, 65);
            }
        }
        setTimeout(typeLoop, 4500);

        /* ==================== ANIMATED STATS COUNTERS ==================== */
        function animateCounter(el, target, suffix, duration = 1600) {
            const start = performance.now();
            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        const statsData = [
            { target: 20, suffix: '+' },
            { target: 5, suffix: '+' },
            { target: 100, suffix: '%' },
            { target: 24, suffix: '/7' }
        ];

        const statsEl = document.querySelector('.hero-stats');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('h3').forEach((h3, i) => {
                        animateCounter(h3, statsData[i].target, statsData[i].suffix);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        if (statsEl) statsObserver.observe(statsEl);

        /* ==================== SCROLL REVEAL ANIMATIONS ==================== */
        document.addEventListener('DOMContentLoaded', function () {
            // Section headers
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });

            document.querySelectorAll('.section-header').forEach(h => headerObserver.observe(h));

            // Service cards staggered pop-in
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = Array.from(document.querySelectorAll('.service-card'));
                        const idx = cards.indexOf(entry.target);
                        entry.target.style.transitionDelay = (idx % 3) * 0.12 + 's';
                        entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease, border-color 0.4s ease, box-shadow 0.4s ease';
                        entry.target.classList.add('pop-in');
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll('.service-card').forEach(card => cardObserver.observe(card));

            // Tech section reveal
            const techObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        techObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.tech-reveal').forEach(el => techObserver.observe(el));

            // Why Choose Us — random staggered pop-in
            const bentoCards = Array.from(document.querySelectorAll('[data-pop]'));
            let bentoPending = [...bentoCards];
            let bentoTriggered = false;

            const bentoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !bentoTriggered) {
                        bentoTriggered = true;
                        // Shuffle the array for random order
                        for (let i = bentoPending.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [bentoPending[i], bentoPending[j]] = [bentoPending[j], bentoPending[i]];
                        }
                        bentoPending.forEach((card, idx) => {
                            const delay = idx * 180 + Math.random() * 120;
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
                                card.classList.add('popped');
                            }, delay);
                        });
                        bentoObserver.disconnect();
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

            bentoCards.forEach(card => bentoObserver.observe(card));
        });

// -------------------------------------------------------------------------------------------------
// =============================== our work section reveal ===============================
document.addEventListener('DOMContentLoaded', function () {
            // Header fade-up
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            document.querySelectorAll('.portfolio-header').forEach(h => headerObserver.observe(h));

            // Project cards staggered reveal
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = Array.from(document.querySelectorAll('.project-card'));
                        const idx = cards.indexOf(entry.target);
                        entry.target.style.transitionDelay = (idx % 2) * 0.15 + 's';
                        entry.target.classList.add('visible');
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

            document.querySelectorAll('.project-card').forEach(card => cardObserver.observe(card));
        });
// -------------------------------------------------------------------------------------------------
 /* ==================== SEQUENTIAL TIMELINE ANIMATION ==================== */
        const steps = document.querySelectorAll('.step');
        const connectors = document.querySelectorAll('.connector');
        const header = document.querySelector('.section-header');
        const hint = document.querySelector('.process-hint');

        const LINE_DURATION = 1100;  // must match CSS animation duration
        const STEP_PAUSE = 350;      // pause after a step lights up

        let sequenceStarted = false;

        function activateStep(index) {
            const step = steps[index];
            if (!step) return;
            step.classList.add('shown');
            // small delay so fade-in starts, then glow highlight
            setTimeout(() => step.classList.add('active'), 150);
        }

        function runSequence() {
            // Step 1 appears first
            activateStep(0);

            let delay = 900; // wait for step 1 to settle

            for (let i = 0; i < connectors.length; i++) {
                // start line animation
                setTimeout(() => {
                    connectors[i].classList.add('animating');
                }, delay);

                // when line reaches the next circle → next step pops in
                setTimeout(() => {
                    connectors[i].classList.remove('animating');
                    connectors[i].classList.add('done');
                    activateStep(i + 1);
                }, delay + LINE_DURATION);

                delay += LINE_DURATION + STEP_PAUSE;
            }

            // show the scroll hint after everything finishes
            setTimeout(() => hint.classList.add('visible'), delay + 600);
        }

        /* Observer: trigger when the section scrolls into view */
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !sequenceStarted) {
                    sequenceStarted = true;
                    header.classList.add('visible');
                    setTimeout(runSequence, 500);
                    sectionObserver.disconnect();
                }
            });
        }, { threshold: 0.25 });

        sectionObserver.observe(document.getElementById('process'));
// -------------------------------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
            /* Header reveal */
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            document.querySelectorAll('.t-header').forEach(h => headerObserver.observe(h));

            /* Cards reveal one by one */
            const cards = Array.from(document.querySelectorAll('[data-reveal]'));
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = cards.indexOf(entry.target);
                        entry.target.style.transitionDelay = (idx % 3) * 0.12 + 's';
                        entry.target.classList.add('reveal-visible');
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
            cards.forEach(card => cardObserver.observe(card));

            /* ===== Horizontal slider with autoplay ===== */
            const track = document.getElementById('tSliderTrack');
            const groups = document.querySelectorAll('.t-slide-group');
            const dots = document.querySelectorAll('.t-dot');
            const prevBtn = document.getElementById('tPrev');
            const nextBtn = document.getElementById('tNext');
            const totalSlides = groups.length;
            let currentIndex = 0;
            let autoplayTimer;

            function goToSlide(index) {
                currentIndex = (index + totalSlides) % totalSlides;
                track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 30}px))`;
                dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
            }

            function nextSlide() { goToSlide(currentIndex + 1); }
            function prevSlide() { goToSlide(currentIndex - 1); }

            function startAutoplay() {
                clearInterval(autoplayTimer);
                autoplayTimer = setInterval(nextSlide, 5000);
            }

            nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
            prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    goToSlide(parseInt(dot.getAttribute('data-index'), 10));
                    startAutoplay();
                });
            });

            // Pause autoplay on hover, resume on mouse leave
            const viewport = document.querySelector('.t-slider-viewport');
            viewport.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
            viewport.addEventListener('mouseleave', startAutoplay);

            goToSlide(0);
            startAutoplay();
        });

       // =================================================================
       

//----------------------------------------------------------------------------
  /* ==================== FLOATING DOTS ==================== */
        (function createDots() {
            const bg = document.getElementById('contactBg');
            for (let i = 0; i < 14; i++) {
                const d = document.createElement('span');
                const size = Math.random() * 4 + 3;
                d.className = 'f-dot';
                d.style.width = size + 'px';
                d.style.height = size + 'px';
                d.style.left = Math.random() * 96 + 2 + '%';
                d.style.top = Math.random() * 90 + 5 + '%';
                d.style.opacity = Math.random() * 0.25 + 0.12;
                d.style.animationDuration = (Math.random() * 4 + 3) + 's';
                d.style.animationDelay = (Math.random() * 3) + 's';
                bg.appendChild(d);
            }
        })();

        /* ==================== FADE-IN ON SCROLL ==================== */
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        /* ==================== FORM HANDLING ==================== */
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // simple validation
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            [form.name, form.email, form.message].forEach(f => f.style.borderColor = '');

            let valid = true;
            if (!name) { form.name.style.borderColor = '#f87171'; valid = false; }
            if (!emailOk) { form.email.style.borderColor = '#f87171'; valid = false; }
            if (!message) { form.message.style.borderColor = '#f87171'; valid = false; }

            if (!valid) return;

            // show success state
            form.style.display = 'none';
            success.classList.add('show');
        });

        // ===================================================
        