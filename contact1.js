/* ============================================================
   CONTACT FORM — Web3Forms AJAX submit
   Replaces the old fake-success handler.
   IMPORTANT: Remove the old `contactForm` block from script.js
   so this doesn't run twice.
   ============================================================ */
(function () {
    'use strict';

    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');

    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* ---------- same validation as before ---------- */
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var message = form.message.value.trim();
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        [form.name, form.email, form.message].forEach(function (f) {
            f.style.borderColor = '';
        });

        var valid = true;
        if (!name) { form.name.style.borderColor = '#f87171'; valid = false; }
        if (!emailOk) { form.email.style.borderColor = '#f87171'; valid = false; }
        if (!message) { form.message.style.borderColor = '#f87171'; valid = false; }

        if (!valid) return;

        /* ---------- loading state on the button ---------- */
        var btn = form.querySelector('.submit-btn');
        var originalBtnHTML = btn.innerHTML;
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

        /* ---------- actually send to Web3Forms → your Gmail ---------- */
        var formData = new FormData(form);

        // nice email subject + sender name in your inbox (optional)
        formData.append('subject', 'New Project Inquiry — NextGen Web');
        formData.append('from_name', 'NextGen Web Website');

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                if (data.success) {
                    // email really sent → NOW show the same success UI
                    form.style.display = 'none';
                    success.classList.add('show');
                } else {
                    // API rejected (bad key, spam, etc.)
                    restoreButton();
                    showError(data.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(function () {
                // network error / offline
                restoreButton();
                showError('Network error. Please check your connection and try again.');
            });

        function restoreButton() {
            btn.disabled = false;
            btn.style.opacity = '';
            btn.style.cursor = '';
            btn.innerHTML = originalBtnHTML;
        }

        function showError(msg) {
            // small inline error under the button (created once, reused after)
            var err = form.querySelector('.form-error-msg');
            if (!err) {
                err = document.createElement('p');
                err.className = 'form-error-msg';
                err.style.cssText =
                    'text-align:center;font-size:0.8rem;color:#f87171;margin-top:12px;';
                btn.insertAdjacentElement('afterend', err);
            }
            err.textContent = msg;
        }
    });
})();
