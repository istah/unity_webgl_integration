import React from 'react';

const TopMenu = ({ onPlayClick }) => (
  <header className="bg-white shadow w-full fixed top-0 left-0 z-50">
    <div className="mx-auto px-4 py-4 flex justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Unity WebGL Integration</h1>
      <nav className="space-x-4">
        <button className="px-4 py-2 bg-black text-white font-bold rounded" onClick={onPlayClick}>Play</button>
        <button className="px-4 py-2 bg-black text-white font-bold rounded" onClick={() => document.querySelector('#about-section').scrollIntoView({ behavior: 'smooth' })}>About</button>
        <button className="px-4 py-2 bg-black text-white font-bold rounded" onClick={() => window.open('https://github.com/istah', '_blank')}>Author</button>
      </nav>
    </div>
  </header>
);

export default TopMenu;