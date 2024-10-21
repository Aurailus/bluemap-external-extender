/**
 * Handles updates to various BlueMap settings
 * @param {Object} data - The settings update data
 * @param {string} data.setting - The name of the setting to update
 * @param {*} data.value - The new value for the setting
 * @midnight-external-extender @settingsHandler
 */
function handleSettingsUpdate(data) {
    const { setting, value } = data;

    switch (setting) {
        case 'renderDistance':
            // Updates the hires view distance
            bluemap.mapViewer.data.loadedHiresViewDistance = value;
            bluemap.saveUserSetting("hiresViewDistance", value);                
            bluemap.mapViewer.updateLoadedMapArea();
            break;
        case 'renderDistanceLowDetail':
            // Updates the lowres view distance
            bluemap.mapViewer.data.loadedLowresViewDistance = value;
            bluemap.mapViewer.updateLoadedMapArea();
            bluemap.saveUserSetting("lowresViewDistance", value);
            break;
        case 'fov':
            // Updates the field of view of the camera
            bluemap.mapViewer.camera.fov = value;
            break;
        case 'sunlightStrength':
            // Updates the strength of the sunlight
            bluemap.mapViewer.data.uniforms.sunlightStrength.value = value;
            bluemap.mapViewer.redraw();
            break;
        case 'ambientLight':
            // Updates the strength of the ambient light
            bluemap.mapViewer.data.uniforms.ambientLight.value = value;
            bluemap.mapViewer.redraw();
            break;
        case 'pauseTileLoading':
            // Toggles the pausing of tile loading
            bluemap.appState.controls.pauseTileLoading = value;
            bluemap.saveUserSetting("pauseTileLoading", value);
            break;
        case 'invertMouse':
            // Toggles mouse inversion
            bluemap.appState.controls.invertMouse = value;
            bluemap.updateControlsSettings()
            bluemap.saveUserSetting("invertMouse", value);
            break;
        case 'mouseSensitivity':
            // Updates the mouse sensitivity
            bluemap.appState.controls.mouseSensitivity = value
            bluemap.updateControlsSettings()
            bluemap.saveUserSetting("mouseSensitivity", value);
            break;
        case 'showChunkBorders':
            // Toggles the visibility of chunk borders
            bluemap.setChunkBorders(value)
            bluemap.saveUserSetting("showChunkBorders", value);
            bluemap.mapViewer.redraw();
            break;
        case 'showDebug':
            // Toggles debug information visibility
            bluemap.setDebug(value)
            bluemap.saveUserSetting("showDebug", value);
            break;
        case 'disableOriginalControl':
            // Toggles the visibility of the original control bar
            toggleControlBarVisibility(value === 'true');       
            break;
        case 'superSampling':
            // Updates the super sampling value for improved rendering quality
            bluemap.mapViewer.superSampling = value;
            bluemap.saveUserSetting("superSampling", value);
            break;
        case 'resetSettings':
            // Resets all settings to their default values
            bluemap.resetSettings();
            break;
    }
}
