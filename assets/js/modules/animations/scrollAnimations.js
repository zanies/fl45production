export function initScrollAnimations() {
    // Adjust rootMargin based on viewport size for better mobile experience
    const isMobile = window.innerWidth < 768;
    const rootMargin = isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px';

    const observerOptions = {
        threshold: 0.01,
        rootMargin: rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element leaves viewport
                // so it can animate again when scrolling back
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}
