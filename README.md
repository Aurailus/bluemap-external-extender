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

**Get map list and listen to map list update**

Command: `getMapList`
Response: `mapListUpdate`
Data: `maps` (array) - map list

```javascript
iframeRef.current.contentWindow.postMessage(
  { 
    type: 'getMapList' 
  }, 
  '*'
);
```

Listener: `mapListUpdate`
Data: `maps` (array) - map list
Note: This event is triggered using `getMapList`

```javascript
window.addEventListener('mapListUpdate', (event) => 
  {
  console.log(event.data);
  }
);
```


**Get min hires distance and listen to min hires distance update**

Command: `getMinHiresDistance`
Response: `minHiresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getMinHiresDistance'
  },
''
);
```

Listener: `minHiresDistance`
Data: `value` (number) - min hires distance
```javascript
window.addEventListener('minHiresDistance', (event) => 
  {
  console.log(event.data);
  }
);
```


**Get max hires distance and listen to max hires distance update**

Command: `getMaxHiresDistance`
Response: `maxHiresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getMaxHiresDistance'
  },
''
);
```

Listener: `maxHiresDistance`
Data: `value` (number) - max hires distance
```javascript
window.addEventListener('maxHiresDistance', (event) => 
  {
  console.log(event.data);
  }
);
```


**Get default hires distance and listen to default hires distance update**

Command: `getDefaultHiresDistance`
Response: `defaultHiresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getDefaultHiresDistance'
  },
''
);
```

Listener: `defaultHiresDistance`
Data: `value` (number) - default hires distance
```javascript
window.addEventListener('defaultHiresDistance', (event) => 
  {
  console.log(event.data);
  }
);
```


**Get min lowres distance and listen to min lowres distance update**

Command: `getMinLowresDistance`
Response: `minLowresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getMinLowresDistance'
  },
''
);
```

Listener: `minLowresDistance`
Data: `value` (number) - min lowres distance
```javascript
window.addEventListener('minLowresDistance', (event) => {
  console.log(event.data);
});
```

**Get max lowres distance and listen to max lowres distance update**

Command: `getMaxLowresDistance`
Response: `maxLowresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getMaxLowresDistance'
  },
''
);
```

Listener: `maxLowresDistance`
Data: `value` (number) - max lowres distance
```javascript
window.addEventListener('maxLowresDistance', (event) => {
  console.log(event.data);
});
```

**Get default lowres distance and listen to default lowres distance update**

Command: `getDefaultLowresDistance`
Response: `defaultLowresDistance`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getDefaultLowresDistance'
  },
''
);
```

Listener: `defaultLowresDistance`
Data: `value` (number) - default lowres distance
```javascript
window.addEventListener('defaultLowresDistance', (event) => 
  {
  console.log(event.data);
  }
);
```

**Get default resolution and listen to default resolution update**

Command: `getDefaultResolution`
Response: `defaultResolution`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getDefaultResolution'
  },
''
);
```

Listener: `defaultResolution`
Data: `value` (number) - default resolution
```javascript
window.addEventListener('defaultResolution', (event) => {
  console.log(event.data);
});
```

**Get version and listen to version update**

Command: `getVersion`
Response: `version`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getVersion'
  },
''
);
```

**Get all settings and listen to all settings update**

Command: `getAllSettings`
Response: `allSettings`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getAllSettings'
  },
  '*'
);
```

Listener: `allSettings`
Data: `settings` (object) - all settings
 - `hiresSliderMin` (number) - min hires distance
 - `hiresSliderMax` (number) - max hires distance
 - `hiresSliderDefault` (number) - default hires distance
 - `lowresSliderMin` (number) - min lowres distance
 - `lowresSliderMax` (number) - max lowres distance
 - `lowresSliderDefault` (number) - default lowres distance
 - `resolutionDefault` (number) - default resolution
 - `version` (string) - version
 - `maxZoomDistance` (number) - max zoom distance
 - `minZoomDistance` (number) - min zoom distance
```javascript
window.addEventListener('allSettings', (event) => {
  console.log(event.data);
});
```

**Get localStorage and listen to localStorage update**

Command: `getLocalStorage`
Response: `localStorageData`
```javascript
iframeRef.current.contentWindow.postMessage(
  {
    type: 'getLocalStorage'
  },
  '*'
);
```

Listener: `localStorageData`
Data: `storage` (object) - localStorage data
```javascript
window.addEventListener('localStorageData', (event) => {
  console.log(event.data);
});
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
