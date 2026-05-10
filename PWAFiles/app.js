let deferredPrompt;

// Capture the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show your custom install button
    document.getElementById('installButton').style.display = 'block';
});

// Handle install button click
document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
        document.getElementById('installButton').style.display = 'none';
    }
});

// Handle successful installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});