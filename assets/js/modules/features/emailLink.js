export function initEmailLink() {
    const emailLink = document.getElementById('emailLink');

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const encoded = 'bWFyaXVzei56YW5pZXdza2lAZnJlZXh0aW1lLmRl';
            const email = atob(encoded);
            window.location.href = `mailto:${email}`;
        });
    }
}
