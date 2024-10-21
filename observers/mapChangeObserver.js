/**
 * Initializes the map change observer
 * This function sets up an interval to check for map changes and send messages accordingly
 * @midnight-external-extender @observers
 */
function initializeMapChangeObserver() {
    let lastMapId = null;
    setInterval(() => {
        const fileUrl = bluemap.playerMarkerManager.fileUrl;
        const currentMapId = fileUrl.split('/')[1]; // Extract map ID from the URL
        if (currentMapId !== lastMapId) {
            sendMessage('onMapChange', { mapId: currentMapId });
            lastMapId = currentMapId;
        }
    }, CHECK_INTERVAL);
}
