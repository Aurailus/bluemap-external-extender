const CHECK_INTERVAL = 300;
let lastViewMode = '';

/**
 * Initializes the controls observer
 * This function sets up an interval to check for changes in view mode and position
 * @midnight-external-extender @observers
 */
function initializeControlsObserver() {
    if (!bluemap?.mapViewer?.controlsManager) {
        setTimeout(initializeControlsObserver, 1000);
        return;
    }

    let lastPosition = null;

    setInterval(() => {
        if (isAnimatingSunlight) return;

        const currentViewMode = bluemap.appState.controls.state;
        const currentPosition = bluemap?.mapViewer?.controlsManager?.data?.position;

        // Check for view mode changes
        if (currentViewMode !== lastViewMode) {
            sendMessage('viewModeChanged', { mode: currentViewMode });
            lastViewMode = currentViewMode;
        }

        // Check for significant position changes
        if (currentPosition && (!lastPosition || 
            Math.abs(currentPosition.x - lastPosition.x) > 1 ||
            Math.abs(currentPosition.y - lastPosition.y) > 1 ||
            Math.abs(currentPosition.z - lastPosition.z) > 1)) {
            sendMessage('positionUpdate', {});
            lastPosition = { ...currentPosition };
        }
    }, CHECK_INTERVAL);
}
