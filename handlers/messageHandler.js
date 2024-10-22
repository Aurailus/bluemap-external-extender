/**
 * Handles incoming messages from the parent window
 * @param {MessageEvent} event - The message event containing the data
 * @midnight-external-extender @handlers
 */
function handleMessage(event) {
    const { data } = event;
    if (!data) return;

    switch (data.type) {
        case 'viewMode':
            handleViewMode(data);
            break;
        case 'toggleDayNight':
            animateSunlightStrength(data.targetValue);
            break;
        case 'updatePosition':
            updatePosition(data.x, data.y, data.z);
            break;
        case 'switchMap':
            if (bluemap.switchMap) {
                bluemap.switchMap(data.mapId);
            }
            break;
        case 'resetView':
            if (bluemap.resetCamera) {
                bluemap.resetCamera();
            }
            break;
        case 'followPlayer':
            handleFollowPlayer(data);
            break;
        case 'updateSettings':
            handleSettingsUpdate(data);
            break;
        case 'teleportToPlayer':
            handleTeleportToPlayer(data);
            break;
    }
}

/**
 * Handles view mode changes
 * @param {Object} data - The view mode data
 * @param {string} data.command - The view mode command (e.g., 'setFreeFlight')
 * @param {Object} data.options - The view mode options
 * @param {boolean} data.options.transition - Whether to use transition
 * @param {boolean} data.options.heightTransition - Whether to use height transition
 * @midnight-external-extender @handlers
 */
function handleViewMode(data) {
    const { command, options } = data;
    if (bluemap[command]) {
        bluemap[command](options.transition, options.heightTransition);
        if (command === 'setFreeFlight') {
            bluemap.appState.controls.enableFreeFlight = true;
            bluemap.appState.controls.showZoomButtons = false;
        } else {
            bluemap.appState.controls.enableFreeFlight = false;
        }
    }
}

/**
 * Handles following a player
 * @param {Object} data - The follow player data
 * @param {boolean} data.follow - Whether to follow the player or not
 * @param {string} data.playerId - The ID of the player to follow
 * @midnight-external-extender @handlers
 */
function handleFollowPlayer(data) {
    if (data.follow) {
        const playerMarker = bluemap.playerMarkerManager.getPlayerMarker(data.playerId);
        bluemap.mapViewer.controlsManager.controls.followPlayerMarker(playerMarker);
    } else {
        bluemap.mapViewer.controlsManager.controls.stopFollowingPlayerMarker();
    }
}

/**
 * Handles teleporting to a player
 * @param {Object} data - The teleport data
 * @param {string} data.playerId - The ID of the player to teleport to
 * @midnight-external-extender @handlers
 */
function handleTeleportToPlayer(data) {
    const playerMarker = bluemap.playerMarkerManager.getPlayerMarker(data.playerId);
    if (playerMarker) {
        const position = playerMarker.position;
        const currentPosition = bluemap.mapViewer.controlsManager.data.position;
        
        const distanceThreshold = 10;
        const isDifferentPosition = 
            Math.abs(currentPosition.x - position.x) > distanceThreshold ||
            Math.abs(currentPosition.z - position.z) > distanceThreshold;

        if (isDifferentPosition) {
            animatePosition(
                currentPosition.x, currentPosition.y, currentPosition.z,
                position.x, position.y, position.z
            );
        }
    }
}
