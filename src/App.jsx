import React, { useEffect, useRef, useState } from 'react';
import TopMenu from './components/ui/top-menu';
import AboutPage from './components/ui/AboutPage';
import StatsPanel from './components/ui/StatsPanel';

function App() {
  const canvasRef = useRef(null);
  const [unityInstance, setUnityInstance] = useState(null);
  const [sensitivity, setSensitivity] = useState(0.2);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [selectedObject, setSelectedObject] = useState('');
  const [availableInteractions, setAvailableInteractions] = useState([]);

  useEffect(() => {
    const email = window.prompt('Please enter your email to start:');
    if (email) {
      const loadUnity = () => {
        const script = document.createElement('script');
        script.src = '/Build/WebGL.loader.js';
        script.onload = () => {
          const canvas = document.querySelector('#unity-canvas');
          if (!canvas) {
            console.error('Unity canvas not found!');
            return;
          }

          window
            .createUnityInstance(canvas, {
              dataUrl: '/Build/WebGL.data.gz',
              frameworkUrl: '/Build/WebGL.framework.js.gz',
              codeUrl: '/Build/WebGL.wasm.gz',
            })
            .then((instance) => {
              instance.SendMessage('Analytics', 'SetEmail', email);
              setUnityInstance(instance);
              window.unityInstance = instance;
              window.instance = instance;

              let lastReceivedMessage = null;

              window.addEventListener('message', (event) => {
                if (event.data?.type === 'GameItemDescription') {
                  lastReceivedMessage = event.data;
                  const payload = JSON.parse(event.data.payload);
                  setSelectedObject(payload.gameObjectName);
                  setAvailableInteractions(payload.methods);

                  const hasInteractableMethods = payload.methods.includes('Interact') || 
                                                 payload.methods.includes('SetPosition') || 
                                                 payload.methods.includes('Duplicate');

                  if (payload.gameObjectName.includes('Button') && payload.methods.includes('Interact')) {
                    instance.SendMessage(payload.gameObjectName, 'Interact');
                  } else if (hasInteractableMethods) {
                    // You can add more automatic interactions here if needed
                  }
                }
              });

              // --- Custom logic for moving and duplicating Construction objects ---
              let selectedConstruction = null;
              let isDragging = false;
              let objectY = 0;

              const handleMouseDown = (e) => {
                if (!lastReceivedMessage || !lastReceivedMessage.payload) return;

                const payload = JSON.parse(lastReceivedMessage.payload);
                const { gameObjectName, methods, hitPoint } = payload;

                const isConstruction = gameObjectName.startsWith('Construction');
                const isDuplicated = gameObjectName.includes('-');

                // Right-click to duplicate any construction object
                if (e.button === 2 && isConstruction && methods.includes('Duplicate')) {
                  console.log('Duplicating:', gameObjectName);
                  instance.SendMessage(gameObjectName, 'Duplicate');
                  return;
                }

                // Left-click to either select or set position
                if (e.button === 0) {
                  // Select object if it's a Construction and has SetPosition
                  if (isConstruction && methods.includes('SetPosition')) {
                    selectedConstruction = gameObjectName;
                    console.log('Selected object:', selectedConstruction);
                  }

                  // Set position if MainArea is clicked and we have a selected object
                  if (gameObjectName === 'MainArea' && selectedConstruction) {
                    const { x, y, z } = hitPoint;
                    const newPosition = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
                    console.log(`Setting position of ${selectedConstruction} to:`, newPosition);
                    instance.SendMessage(selectedConstruction, 'SetPosition', newPosition);
                    selectedConstruction = null;
                  }
                }
              };

              window.addEventListener('mousedown', handleMouseDown);
              window.addEventListener('contextmenu', (e) => e.preventDefault());

              const pressedKeys = new Set();

              const handleKeyDown = (e) => {
                pressedKeys.add(e.key.toLowerCase());

                if (e.key === '-' && sensitivity > 0.05) {
                  setSensitivity((prev) => Math.max(0.05, prev - 0.05));
                }
                if ((e.key === '+' || e.key === '=') && sensitivity < 2) {
                  setSensitivity((prev) => Math.min(2, prev + 0.05));
                }

                let x = 0;
                let z = 0;

                if (pressedKeys.has('w')) z += 1;
                if (pressedKeys.has('s')) z -= 1;
                if (pressedKeys.has('a')) x -= 1;
                if (pressedKeys.has('d')) x += 1;

                if (x !== 0 && z !== 0) {
                  const magnitude = Math.sqrt(2) / 2;
                  x *= magnitude;
                  z *= magnitude;
                }

                const speed = pressedKeys.has('shift') ? 35 : 4;
                setCurrentSpeed(speed);
                x *= speed;
                z *= speed;

                instance.SendMessage('Player', 'Move', `${x},0,${z},${speed}`);

                if (pressedKeys.has(' ')) {
                  const jumpSpeed = pressedKeys.has('shift') ? 8 : 4;
                  instance.SendMessage('Player', 'Move', `-1,1,0,${jumpSpeed}`);
                }
              };

              const handleKeyUp = (e) => {
                pressedKeys.delete(e.key.toLowerCase());

                let x = 0;
                let z = 0;

                if (pressedKeys.has('w')) z += 1;
                if (pressedKeys.has('s')) z -= 1;
                if (pressedKeys.has('a')) x -= 1;
                if (pressedKeys.has('d')) x += 1;

                if (x !== 0 && z !== 0) {
                  const magnitude = Math.sqrt(2) / 2;
                  x *= magnitude;
                  z *= magnitude;
                }

                const speed = pressedKeys.has('shift') ? 2 : 1;
                setCurrentSpeed(speed);
                x *= speed;
                z *= speed;

                if (pressedKeys.size === 0) {
                  setCurrentSpeed(0);
                  instance.SendMessage('Player', 'Move', '0,0,0,0');
                } else {
                  instance.SendMessage('Player', 'Move', `${x},0,${z},${speed}`);
                }
              };

              window.addEventListener('keydown', handleKeyDown);
              window.addEventListener('keyup', handleKeyUp);

              // Cleanup on unmount
              return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
                window.removeEventListener('mousedown', handleMouseDown);
                // Optionally: remove the mouse event listeners if needed
              };
            })
            .catch((err) => console.error('Unity failed to load:', err));
        };
        document.body.appendChild(script);
      };
      setTimeout(loadUnity, 0);
    } else {
      alert('Email is required to proceed.');
    }
  }, []);

  useEffect(() => {
    // This effect can be used for any logic that depends on sensitivity
    // but does not reload or reinitialize Unity.
    // Currently, no additional logic is needed here.
  }, [sensitivity]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-80">
      <TopMenu />
      <div className="flex flex-col items-center justify-center gap-8 my-8 mt-24">
        <canvas
          id="unity-canvas"
          ref={canvasRef}
          width={960}
          height={600}
          className="bg-black block"
        />
        <StatsPanel 
          currentSpeed={currentSpeed} 
          selectedObject={selectedObject} 
          availableInteractions={availableInteractions} 
        />
      </div>
      <AboutPage />
      <footer className="bg-white shadow w-full py-4 mt-8 text-center">
        <p className="text-gray-600 font-semibold">© 2025 Unity WebGL Integration. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;