export function initVisitorCounter() {
    const counterElement = document.getElementById('visit-counter');

    if (counterElement) {
        fetch('https://visitor.6developer.com/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                domain: 'fl45.pl',
                page_path: window.location.pathname,
                referrer: document.referrer
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data && typeof data.totalCount !== 'undefined') {
                counterElement.innerText = `${data.totalCount}`;

                const container = counterElement.closest('.opacity-0') || counterElement.parentElement;
                if (container) {
                    setTimeout(() => {
                        container.classList.remove('opacity-0');
                    }, 500);
                }
            }
        })
        .catch(error => {
            console.log('Visitor counter unavailable:', error);
        });
    }
}
