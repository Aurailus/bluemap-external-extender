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
