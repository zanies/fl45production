export function initTypewriter() {
    const line1 = document.getElementById('line1Text');
    const line2 = document.getElementById('line2Text');
    const line3 = document.getElementById('line3Text');
    const cursor = document.getElementById('typingCursor');

    if (!line1 || !line2 || !line3 || !cursor) return;

    const lines = [
        { element: line1, text: 'Projektuję' },
        { element: line2, text: 'Koduję' },
        { element: line3, text: 'Wdrażam' }
    ];

    let currentLineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let allLinesCompleted = false;

    function moveCursor(lineIndex) {
        cursor.remove();
        const targetLine = lines[lineIndex].element;
        targetLine.parentElement.appendChild(cursor);
    }

    function type() {
        const currentLine = lines[currentLineIndex];
        const currentText = currentLine.text;

        if (!allLinesCompleted) {
            if (charIndex < currentText.length) {
                currentLine.element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 150);
            } else {
                if (currentLineIndex < lines.length - 1) {
                    setTimeout(() => {
                        currentLineIndex++;
                        charIndex = 0;
                        moveCursor(currentLineIndex);
                        type();
                    }, 2000);
                } else {
                    allLinesCompleted = true;
                    setTimeout(() => {
                        isDeleting = true;
                        currentLineIndex = lines.length - 1;
                        charIndex = currentText.length;
                        moveCursor(currentLineIndex);
                        type();
                    }, 2500);
                }
            }
        } else {
            if (isDeleting) {
                currentLine.element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    if (currentLineIndex > 0) {
                        currentLineIndex--;
                        charIndex = lines[currentLineIndex].text.length;
                        moveCursor(currentLineIndex);
                        setTimeout(type, 200);
                    } else {
                        isDeleting = false;
                        allLinesCompleted = false;
                        currentLineIndex = 0;
                        charIndex = 0;
                        moveCursor(0);
                        setTimeout(type, 800);
                    }
                } else {
                    setTimeout(type, 40);
                }
            }
        }
    }

    setTimeout(type, 1000);
}
