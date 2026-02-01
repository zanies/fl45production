import { getEmail } from '../utils/email.js';

export function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Proszę wypełnić wszystkie pola.');
            return;
        }

        const emailBody = `Imię: ${name}
Email: ${email}

Wiadomość:
${message}`;

        const mailtoLink = `mailto:${getEmail()}?subject=${encodeURIComponent('FL45 - zapytanie o oferte')}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoLink;

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Otwieranie programu pocztowego...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    });
}
