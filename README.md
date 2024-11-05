# Bluemap External Extender

Bluemap External Extender is a script that enhances the functionality of BlueMap, allowing for external control and extended features.
## You can create new entire ui on parent site iframe on like example image
![image](https://github.com/user-attachments/assets/e28a2019-cf64-4d5f-9747-265576fb218a)
![image](https://github.com/user-attachments/assets/974386d5-0319-4443-8bea-93a9904a27d5)

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

## Post Messages

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

- `hiresDistance` (number) - set hires distance
- `lowresDistance` (number) - set lowres distance
- `sunlightStrength` (number) - set sunlight strength
- `ambientLight` (number) - set ambient light strength
- `pauseTileLoading` (boolean) - set pause tile loading
- `invertMouse` (boolean) - invert mouse
- `mouseSensitivity` (number) - set mouse sensitivity
- `showChunkBorders` (boolean) - set show chunk borders
- `showDebug` (boolean) - set show debug information
- `superSampling` (number) - set super sampling value
- `resetSettings` (boolean) - reset all settings
  Value: `value` (any) - setting value

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'updateSettings', 
    setting: 'hiresDistance', 
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


**Animate sunlight strength**


Command: `animateSunlightStrength`
Data: `targetValue` (number) - target value

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'animateSunlightStrength', 
    targetValue: 1 
  }, 
  '*'
);
```

## Listen Events

**Listen to camera position update**


Listener: `onPosition`
Data: `x`, `y`, `z` (number) - camera position in blocks

```javascript
window.addEventListener('onPosition', (event) => 
  {
  console.log(event.data);
  }
);
```


**Listen to view mode change**


Listener: `onViewMode`
Data: `mode` (string) - view mode

```javascript
window.addEventListener('onViewMode', (event) => 
  {
  console.log(event.data);
  }
);
```


**Listen to follow player status change**


Listener: `onFollowingPlayerStatus`
Data: `isFollowing` (boolean) - is following

```javascript
window.addEventListener('onFollowingPlayerStatus', (event) => 
  {
  console.log(event.data);
  }
);
```


**Listen to map change**


Listener: `onMapChange`
Data: `mapId` (string) - map ID

```javascript
window.addEventListener('onMapChange', (event) => 
  {
  console.log(event.data);
  }
);
```


**Listen to url update**


Listener: `onUrlChange`
Data: `url` (string) - url

```javascript
window.addEventListener('onUrlChange', (event) => 
  {
  console.log(event.data);
  }
);
```

**Listen to sunlight strength update (FIRST TIME ONLY)**

Listener: `onSunlightStrength`
Data: `value` (number) - sunlight strength

```javascript
window.addEventListener('onSunlightStrength', (event) => {
  console.log(event.data);
});
```

**Listen to map list update (FIRST TIME ONLY)**

Listener: `mapListUpdate`
Data: `mapList` (string) - map list
```javascript
window.addEventListener('mapListUpdate', (event) => {
  console.log(event.data);
});
```

**Listen to all settings update (FIRST TIME ONLY)**

Listener: `allSettings`
Data: `settings` (string) - settings
 - `hiresSliderMin` (number) - hires slider min
 - `hiresSliderMax` (number) - hires slider max
 - `hiresSliderDefault` (number) - hires slider default
 - `lowresSliderMin` (number) - lowres slider min
 - `lowresSliderMax` (number) - lowres slider max
 - `lowresSliderDefault` (number) - lowres slider default
 - `resolutionDefault` (number) - resolution default
 - `version` (string) - version
 - `maxZoomDistance` (number) - max zoom distance
 - `minZoomDistance` (number) - min zoom distance
```javascript
window.addEventListener('allSettings', (event) => {
  console.log(event.data);
});
```

**Listen to localStorage update (FIRST TIME ONLY)**
Listener: `localStorageData`
Data: `storage` (string) - localStorage data
 - `bluemap-superSampling` (number) - super sampling setting
 - `bluemap-mouseSensitivity` (number) - mouse sensitivity setting
 - `bluemap-hiresViewDistance` (number) - high resolution view distance
 - `bluemap-screenshotClipboard` (boolean) - screenshot to clipboard setting
 - `bluemap-pauseTileLoading` (boolean) - pause tile loading setting
 - `bluemap-theme` (string | null) - theme setting
 - `bluemap-lang` (string) - language setting
 - `bluemap-lowresViewDistance` (number) - low resolution view distance
 - `bluemap-tileCacheHash` (number) - tile cache hash
 - `bluemap-chunkBorders` (boolean) - chunk borders display setting
 - `bluemap-resetSettings` (boolean) - reset settings flag
 - `bluemap-debug` (boolean) - debug mode setting
 - `bluemap-showZoomButtons` (boolean) - show zoom buttons setting
 - `bluemap-invertMouse` (boolean) - invert mouse setting
```javascript
window.addEventListener('localStorageData', (event) => {
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
- get marker list
- get player list
- Take screenshot
- send update map
- send update theme
- toggle copy screenshot to clipboard
