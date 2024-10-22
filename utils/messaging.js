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
        sendMessage('sunlightStrengthChanged', { value: sunlightStrength });
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
        sendMessage('mapListUpdate', { maps: mapList });
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
    sendMessage('allSettings', { settings });
}
