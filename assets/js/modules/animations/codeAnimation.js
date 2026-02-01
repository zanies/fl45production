export function initCodeAnimation() {
    const codeLine1 = document.getElementById('codeLine1');
    const codeLine2 = document.getElementById('codeLine2');

    if (!codeLine1 || !codeLine2) return;

    const lines = [
        {
            element: codeLine1,
            parts: [
                { text: 'import', color: 'text-purple-400' },
                { text: ' ', color: '' },
                { text: 'Developer', color: 'text-yellow-300' },
                { text: ' ', color: '' },
                { text: 'from', color: 'text-purple-400' },
                { text: ' ', color: '' },
                { text: "'@fl45/core'", color: 'text-green-400' },
                { text: ';', color: '' }
            ]
        },
        {
            element: codeLine2,
            parts: [
                { text: 'import', color: 'text-purple-400' },
                { text: ' ', color: '' },
                { text: 'Skills', color: 'text-yellow-300' },
                { text: ' ', color: '' },
                { text: 'from', color: 'text-purple-400' },
                { text: ' ', color: '' },
                { text: "'./skills'", color: 'text-green-400' },
                { text: ';', color: '' }
            ]
        }
    ];

    let currentLine = 0;
    let currentPart = 0;
    let currentChar = 0;

    function typeCode() {
        if (currentLine >= lines.length) {
            setTimeout(() => {
                codeLine1.innerHTML = '';
                codeLine2.innerHTML = '';
                currentLine = 0;
                currentPart = 0;
                currentChar = 0;
                setTimeout(typeCode, 500);
            }, 5000);
            return;
        }

        const line = lines[currentLine];
        const part = line.parts[currentPart];

        if (currentChar < part.text.length) {
            line.element.innerHTML = '';

            for (let i = 0; i < currentPart; i++) {
                const prevSpan = document.createElement('span');
                if (line.parts[i].color) prevSpan.className = line.parts[i].color;
                prevSpan.textContent = line.parts[i].text;
                line.element.appendChild(prevSpan);
            }

            const currentSpan = document.createElement('span');
            if (part.color) currentSpan.className = part.color;
            currentSpan.textContent = part.text.substring(0, currentChar + 1);
            line.element.appendChild(currentSpan);

            currentChar++;
            setTimeout(typeCode, 50);
        } else {
            currentChar = 0;
            currentPart++;

            if (currentPart >= line.parts.length) {
                currentPart = 0;
                currentLine++;
                setTimeout(typeCode, 300);
            } else {
                setTimeout(typeCode, 50);
            }
        }
    }

    setTimeout(typeCode, 1000);
}
