const appOverlay = document.getElementById('app-overlay');
const appMain = document.getElementById('app-main');

const appOverlayVisibility = (visible) => {
    if (appOverlay && typeof appOverlay.classList !== 'undefined') {
        if (!visible) {
            setTimeout(() => {
                appMain.style.opacity = "";
            }, 50);
            appOverlay.classList.remove('show');
        } else {
            appOverlay.classList.add('show');
            appMain.style.opacity = "0";
        }
    } else {
        console.error('App overlay container is not set.');
    }
};

export default appOverlayVisibility;
