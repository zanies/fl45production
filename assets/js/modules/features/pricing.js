export function selectPackage(packageName) {
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.value = `Dzień dobry, jestem zainteresowany pakietem: ${packageName}.\n\nProszę o więcej informacji.`;

        setTimeout(() => {
            messageField.focus();
        }, 100);
    }
}

window.selectPackage = selectPackage;
