/* ============================================================
   FOOTER + SCROLL-TO-TOP — fully isolated in an IIFE
   No global variables leak out, so it can never collide
   with script.js or any other code on the page.
   ============================================================ */
(function () {
    'use strict';

    /* ==================== FOOTER REVEAL ON SCROLL ==================== */
    var ngwfRevealEls = document.querySelectorAll('.ngwf-reveal');

    if ('IntersectionObserver' in window && ngwfRevealEls.length) {
        var ngwfObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ngwf-visible');
                    ngwfObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        ngwfRevealEls.forEach(function (el) {
            ngwfObserver.observe(el);
        });
    } else {
        // fallback: just show everything
        ngwfRevealEls.forEach(function (el) {
            el.classList.add('ngwf-visible');
        });
    }

    /* ==================== SCROLL-TO-TOP BUTTON ==================== */
    var ngwfTopBtn = document.getElementById('ngwfScrollTop');

    if (ngwfTopBtn) {
        // Shows the INSTANT the user starts scrolling down (threshold: 10px)
        var ngwfToggleBtn = function () {
            if (window.pageYOffset > 10) {
                ngwfTopBtn.classList.add('ngwf-show');
            } else {
                ngwfTopBtn.classList.remove('ngwf-show');
            }
        };

        window.addEventListener('scroll', ngwfToggleBtn, { passive: true });

        // run once on load in case the page is already scrolled
        ngwfToggleBtn();

        ngwfTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
