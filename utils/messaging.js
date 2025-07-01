/**
 * Sends a message to the parent window
 * @param {string} type - The type of message being sent
 * @param {Object} data - Additional data to be sent with the message
 * @midnight-external-extender @messaging
 */
function sendMessage(type, data) {
    try {
        const position = bluemap?.mapViewer?.controlsManager?.data?.position;
        // Create position data object if position is available
        const positionData = position ? {
            x: Math.floor(position.x),
            y: Math.floor(position.y),
            z: Math.floor(position.z)
        } : null;

        // Send the message to the parent window
        window.parent.postMessage({ type, ...data, position: positionData }, '*');
    } catch (error) {
        console.error(`Error sending ${type}:`, error);
    }
}

/**
 * Sends the current sunlight strength to the parent window
 * @midnight-external-extender @messaging
 */
function sendSunlightStrength() {
    const sunlightStrength = bluemap?.mapViewer?.data?.uniforms?.sunlightStrength?.value;
    if (sunlightStrength !== undefined) {
        sendMessage('onSunlightStrength', { value: sunlightStrength });
    }
}

/**
 * Sends the current map list to the parent window
 * @midnight-external-extender @messaging
 */
function sendMapList() {
    if (bluemap && bluemap.appState && bluemap.appState.maps) {
        const mapList = bluemap.appState.maps.map(map => ({
            id: map.id,
            sorting: map.sorting
        })).sort((a, b) => a.sorting - b.sorting);
        sendMessage('mapListUpdate', { maps: JSON.stringify(mapList) });
    }
}

/**
 * Sends the minimum hires distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMinHiresDistance() {
    sendMessage('minHiresDistance', { value: bluemap.settings.hiresSliderMin });
}

/**
 * Sends the maximum hires distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMaxHiresDistance() {
    sendMessage('maxHiresDistance', { value: bluemap.settings.hiresSliderMax });
}

/**
 * Sends the default hires distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendDefaultHiresDistance() {
    sendMessage('defaultHiresDistance', { value: bluemap.settings.hiresSliderDefault });
}

/**
 * Sends the minimum lowres distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMinLowresDistance() {
    sendMessage('minLowresDistance', { value: bluemap.settings.lowresSliderMin });
}

/**
 * Sends the maximum lowres distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMaxLowresDistance() {
    sendMessage('maxLowresDistance', { value: bluemap.settings.lowresSliderMax });
}

/**
 * Sends the default lowres distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendDefaultLowresDistance() {
    sendMessage('defaultLowresDistance', { value: bluemap.settings.lowresSliderDefault });
}

/**
 * Sends the default resolution setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendDefaultResolution() {
    sendMessage('defaultResolution', { value: bluemap.settings.resolutionDefault });
}

/**
 * Sends the BlueMap version to the parent window
 * @midnight-external-extender @messaging
 */
function sendVersion() {
    sendMessage('version', { value: bluemap.settings.version });
}

/**
 * Sends the maximum zoom distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMaxZoomDistance() {
    sendMessage('maxZoomDistance', { value: bluemap.settings.maxZoomDistance });
}

/**
 * Sends the minimum zoom distance setting to the parent window
 * @midnight-external-extender @messaging
 */
function sendMinZoomDistance() {
    sendMessage('minZoomDistance', { value: bluemap.settings.minZoomDistance });
}

/**
 * Sends all BlueMap settings to the parent window
 * @midnight-external-extender @messaging
 */
function sendAllSettings() {
    const settings = {
        hiresSliderMin: bluemap.settings.hiresSliderMin,
        hiresSliderMax: bluemap.settings.hiresSliderMax,
        hiresSliderDefault: bluemap.settings.hiresSliderDefault,
        lowresSliderMin: bluemap.settings.lowresSliderMin,
        lowresSliderMax: bluemap.settings.lowresSliderMax,
        lowresSliderDefault: bluemap.settings.lowresSliderDefault,
        resolutionDefault: bluemap.settings.resolutionDefault,
        version: bluemap.settings.version,
        maxZoomDistance: bluemap.settings.maxZoomDistance,
        minZoomDistance: bluemap.settings.minZoomDistance
    };
    sendMessage('allSettings', { settings: JSON.stringify(settings) });
}

/**
 * Sends all localStorage items with the prefix "bluemap-" to the parent window as JSON
 * @midnight-external-extender @messaging
 */
function sendLocalStorage() {
    const blueMapStorage = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('bluemap-')) {
            try {
                blueMapStorage[key] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
                // If parsing fails, store the raw string value
                blueMapStorage[key] = localStorage.getItem(key);
            }
        }
    }
    sendMessage('localStorageData', { storage: JSON.stringify(blueMapStorage) });
}

/**
 * Recursively extracts all marker sets and markers from BlueMap
 * @returns {Array} Array of marker sets with their markers and children
 */
function getAllMarkerData() {
    const extractMarkerSet = (markerSet) => {
        return {
            id: markerSet.id,
            label: markerSet.label,
            listed: markerSet.listed,
            visible: markerSet.visible,
            toggleable: markerSet.toggleable,
            markers: markerSet.markers ? markerSet.markers.map(marker => ({
                id: marker.id,
                label: marker.label,
                type: marker.type,
                listed: marker.listed,
                visible: marker.visible,
                position: marker.position ? {
                    x: marker.position.x,
                    y: marker.position.y,
                    z: marker.position.z
                } : null,
                playerUuid: marker.playerUuid,
                name: marker.name,
                foreign: marker.foreign
            })) : [],
            markerSets: markerSet.markerSets ? markerSet.markerSets.map(extractMarkerSet) : []
        };
    };
    if (!bluemap?.mapViewer?.data?.markerSets) return [];
    return bluemap.mapViewer.data.markerSets.map(extractMarkerSet);
}

/**
 * Sends all marker sets and markers to the parent window
 */
function sendMarkers() {
    const markerData = getAllMarkerData();
    sendMessage('markerListUpdate', { markers: JSON.stringify(markerData) });
}

/**
 * Sends a request to follow a player marker by markerId
 */
function followPlayerMarker(markerId) {
    sendMessage('followMarker', { markerId });
}

/**
 * Sends the current player list to the parent window
 */
function sendPlayerList() {
    const playerSet = bluemap?.mapViewer?.markers?.markerSets?.get('bm-players');
    let players = [];
    if (playerSet) {
        players = Array.from(playerSet.markers.values()).map(marker => ({
            uuid: marker.data.playerUuid,
            name: marker.data.name,
            position: marker.position,
            rotation: marker.data.rotation,
            foreign: marker.data.foreign
        }));
    }
    sendMessage('playerListUpdate', { players: JSON.stringify(players) });
}

/**
 * Sends a screenshot of the current map view to the parent window
 */
function sendScreenshot() {
    try {
        const canvas = bluemap?.mapViewer?.renderer?.domElement;
        if (!canvas) throw new Error('Renderer canvas not found');
        const dataUrl = canvas.toDataURL('image/png');
        sendMessage('screenshot', { dataUrl });
    } catch (error) {
        console.error('Error taking screenshot:', error);
        sendMessage('screenshot', { error: error.message });
    }
}
