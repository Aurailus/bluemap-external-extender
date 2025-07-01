const ANIMATION_DURATION = 300;
const ANIMATION_SPEED = 1000;

let isAnimatingSunlight = false;

/**
 * Animates the sunlight strength
 * @param {number} targetValue - The target sunlight strength value
 * @midnight-external-extender @utils
 */
function animateSunlight(targetValue) {
    const sunlightStrengthUniform = bluemap?.mapViewer?.data?.uniforms?.sunlightStrength;
    if (!sunlightStrengthUniform) {
        console.error('BlueMap or its properties are not available');
        return;
    }

    isAnimatingSunlight = true;
    const startValue = sunlightStrengthUniform.value;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const eased = progress * (2 - progress); // easeOutQuad

        sunlightStrengthUniform.value = startValue * (1 - eased) + targetValue * eased;
        bluemap.mapViewer.redraw();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            sendSunlightStrength();
            isAnimatingSunlight = false;
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Animates the camera position
 * @param {number} startX - Starting X coordinate
 * @param {number} startY - Starting Y coordinate
 * @param {number} startZ - Starting Z coordinate
 * @param {number} endX - Ending X coordinate
 * @param {number} endY - Ending Y coordinate
 * @param {number} endZ - Ending Z coordinate
 * @midnight-external-extender @utils
 */
function animatePosition(startX, startY, startZ, endX, endY, endZ) {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / ANIMATION_SPEED, 1);
        
        // Easing function (ease-out-cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const newX = startX + (endX - startX) * eased;
        const newY = startY + (endY - startY) * eased;
        const newZ = startZ + (endZ - startZ) * eased;
        
        updatePosition(newX, newY, newZ);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Updates the camera position
 * @param {number} x - New X coordinate
 * @param {number} y - New Y coordinate
 * @param {number} z - New Z coordinate
 * @midnight-external-extender @utils
 */
function updatePosition(x, y, z) {
    if (bluemap?.mapViewer?.controlsManager?.data?.position) {
        bluemap.mapViewer.controlsManager.data.position.setX(parseFloat(x));
        bluemap.mapViewer.controlsManager.data.position.setY(parseFloat(y));
        bluemap.mapViewer.controlsManager.data.position.setZ(parseFloat(z));
        bluemap.mapViewer.redraw();
    }
}
