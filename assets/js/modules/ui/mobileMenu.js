export function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (!mobileMenuToggle || !mobileMenu) return;

    mobileMenuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');

        const icon = this.querySelector('.material-icons-round');
        icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuToggle.querySelector('.material-icons-round');
            icon.textContent = 'menu';
        });
    });
}
