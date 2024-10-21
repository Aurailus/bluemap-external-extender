/**
 * Initializes the following player observer
 * This function sets up an interval to check if the camera is following a player
 * @midnight-external-extender @observers
 */
function initializeFollowingPlayerObserver() {
    let lastFollowingStatus = null;
    setInterval(() => {
        const isFollowing = bluemap?.mapViewer?.controlsManager?.data?.controls?.followingPlayer !== null;
        if (isFollowing !== lastFollowingStatus) {
            sendMessage('followingPlayerStatus', { isFollowing });
            lastFollowingStatus = isFollowing;
        }
    }, CHECK_INTERVAL);
}
