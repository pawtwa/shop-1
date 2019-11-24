const appOverlay = document.getElementById('app-overlay');

const appOverlayVisibility = (visible) => {
    if (appOverlay && typeof appOverlay.classList !== 'undefined') {
        if (!visible) {
            appOverlay.classList.remove('show');
        } else {
            appOverlay.classList.add('show');
        }
    } else {
        console.error('App overlay container is not set.');
    }
};

export default appOverlayVisibility;
