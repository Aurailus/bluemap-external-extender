/**
 * Toggles the visibility of control bars
 * @param {boolean} hide - Whether to hide (true) or show (false) the control bars
 * @midnight-external-extender @controlBarToggle
 */
function toggleControlBarVisibility(hide) {
    const controlBars = document.querySelectorAll('.control-bar');
    controlBars.forEach(element => {
        element.style.display = hide ? 'none' : 'flex';
    });
}
