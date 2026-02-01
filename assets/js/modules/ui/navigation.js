export function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    function updateActiveLink(sectionId) {
        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const sectionId = section.id;
        const hasNavLink = Array.from(navLinks).some(link => link.dataset.section === sectionId);
        if (hasNavLink) {
            sectionObserver.observe(section);
        }
    });
}
