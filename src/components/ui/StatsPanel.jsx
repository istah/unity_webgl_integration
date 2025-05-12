import React from 'react';

const StatsPanel = ({ currentSpeed, selectedObject, availableInteractions }) => (
  <div className="flex flex-col items-center space-y-2 mt-6 text-center">
    <div className="text-lg font-semibold">🚀 Current Speed: {currentSpeed}</div>
    <div className="text-lg font-semibold break-words max-w-md">📦 Selected Object: {selectedObject || 'None'}</div>
    <div className="text-lg font-semibold">🎮 Available Interactions: {availableInteractions.length > 0 ? availableInteractions.join(', ') : 'None'}</div>
  </div>
);

export default StatsPanel;