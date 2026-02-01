export function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        html.classList.add('dark');
    }

    function updateThemeIcon() {
        const isDark = html.classList.contains('dark');
        const icon = themeToggle.querySelector('.material-icons-round');
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }

    function toggleTheme() {
        html.classList.toggle('dark');
        updateThemeIcon();
    }

    updateThemeIcon();
    themeToggle.addEventListener('click', toggleTheme);
}
