# Bluemap External Extender

Bluemap External Extender is a script that enhances the functionality of BlueMap, allowing for external control and extended features.

## Installation

1. Click the "Code" button and select "Download ZIP".
2. Extract the ZIP file to your BlueMap web folder (e.g., `bluemap/web/js/`).
3. Rename the extracted folder to `bluemap-external-extender`.
4. Edit the BlueMap Web configuration file located at `plugins/BlueMap/webapp.conf`.
5. Add the Bluemap External Extender script to the `scripts` array:

```
scripts: [
  "js/bluemap-external-extender/main.js"
]
```

6. Save the configuration file and restart your server.

## API Send

**Set camera position**


Command: `updatePosition`
Data: `x`, `y`, `z` (number) - camera position in blocks

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'updatePosition', 
    x: 0, 
    y: 64, 
    z: 0 
  }, 
  '*'
);
```


**Switch view mode**


Command: `setPerspectiveView`, `setFlatView`, `setFreeFlight`
Options: `transition` (number) - transition time in milliseconds
Transition height: `heightTransition` (number) - transition height in blocks

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'viewMode', 
    command: 'setPerspectiveView', 
    options: { transition: 500, heightTransition: 256 } 
  }, 
  '*'
);
```


**Follow player**


Command: `followPlayer`
Data: `playerId` (string) - player ID

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'followPlayer', 
    playerId: 'playerId' 
  }, 
  '*'
);
```


**Update settings**


Command: `updateSettings`
Options: `setting` (string) - setting name

- `renderDistance` (number) - render distance
- `renderDistanceLowDetail` (number) - low detail render distance
- `sunlightStrength` (number) - sunlight strength
- `ambientLight` (number) - ambient light strength
- `pauseTileLoading` (boolean) - pause tile loading
- `invertMouse` (boolean) - invert mouse
- `mouseSensitivity` (number) - mouse sensitivity
- `showChunkBorders` (boolean) - show chunk borders
- `showDebug` (boolean) - show debug information
- `superSampling` (number) - super sampling value
- `resetSettings` (boolean) - reset all settings
  Value: `value` (any) - setting value

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'updateSettings', 
    setting: 'renderDistance', 
    value: 1000 
  }, 
  '*'
);
```


**Teleport to player**


Command: `teleportToPlayer`
Data: `playerId` (string) - player ID

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'teleportToPlayer', 
    playerId: 'playerId' 
  }, 
  '*'
);
```


**Switch map**


Command: `switchMap`
Data: `mapId` (string) - map ID

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'switchMap', 
    mapId: 'mapId' 
  }, 
  '*'
);
```


**Reset view**


Command: `resetView`

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'resetView' 
  }, 
  '*'
);
```


**Toggle day/night**


Command: `toggleDayNight`
Data: `targetValue` (number) - target value

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'toggleDayNight', 
    targetValue: 1 
  }, 
  '*'
);
```

## API Receive


**Listen to camera position update**


Listener: `positionUpdate`
Data: `x`, `y`, `z` (number) - camera position in blocks

```javascript
window.addEventListener('positionUpdate', (event) => {
  console.log(event.data);
});
```


**Listen to view mode change**


Listener: `viewModeChanged`
Data: `mode` (string) - view mode

```javascript
window.addEventListener('viewModeChanged', (event) => {
  console.log(event.data);
});
```


**Listen to follow player status change**


Listener: `followingPlayerStatus`
Data: `isFollowing` (boolean) - is following

```javascript
window.addEventListener('followingPlayerStatus', (event) => {
  console.log(event.data);
});
```


**Listen to map change**


Listener: `mapChanged`
Data: `mapId` (string) - map ID

```javascript
window.addEventListener('onMapChange', (event) => {
  console.log(event.data);
});
```


**Listen to url update**


Listener: `urlUpdate`
Data: `url` (string) - url

```javascript
window.addEventListener('urlUpdate', (event) => {
  console.log(event.data);
});
```

## Additional notes:

- Getting player list with `(map url)/maps/(map id)/live/players.json`
  Get player list:

```javascript
const mapId = 'map id';
const mapUrl = 'https://example.com';
const fetchPlayers = async () => {
  try {
    const response = await fetch(`${mapUrl}/maps/${mapId}/live/players.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};
```

Response:

```json
{
  "players": [
    {
      "uuid": "playerId",
      "name": "playerName",
      "foreign": playerForeign (boolean),
      "position": {"x":playerX,"y":playerY,"z":playerZ},
      "rotation": {"pitch":playerPitch,"yaw":playerYaw,"roll":playerRoll}
    },
    {
      "uuid": "playerId",
      "name": "playerName",
      "foreign": playerForeign (boolean),
      "position": {"x":playerX,"y":playerY,"z":playerZ},
      "rotation": {"pitch":playerPitch,"yaw":playerYaw,"roll":playerRoll}
    },
    ...
  ]
}
```


## Getting iframeRef Examples

### React Example
```jsx
import React, { useRef, useEffect } from 'react';
function BlueMapComponent() {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (iframeRef.current) {
      // Example: Set camera position
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'updatePosition',
          x: 0,
          y: 64,
          z: 0
        },
        ''
      );
    }
  }, []);
  return (
    <iframe
      ref={iframeRef}
      src="https://example.com"
      title="BlueMap"
      width="100%"
      height="600px"
    />
  );
}

export default BlueMapComponent;
```
### Normal JavaScript HTML Example
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlueMap Example</title>
</head>
<body>
  <iframe id="bluemap-iframe" src="https://example.com" width="100%" height="600px"></iframe>
  <script>
    const iframeRef = document.getElementById('bluemap-iframe');
    // Wait for the iframe to load
    iframeRef.onload = function() {
      // Example: Set camera position
      iframeRef.contentWindow.postMessage(
        {
          type: 'updatePosition',
          x: 0,
          y: 64,
          z: 0
        },
        ''
      );
    };
  </script>
</body>
```
These examples show how to get iframe and send messages to iframe.

Todo:
- get map id list
- get marker list
- get player list
- get Min, Max and Default render distance
- get Min, Max and Default low detail render distance
- Take screenshot
- send update map
- send update theme
- toggle copy screenshot to clipboard
