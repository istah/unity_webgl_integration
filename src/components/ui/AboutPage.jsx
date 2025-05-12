import React from 'react';

const AboutPage = () => (
  <section id="about-section" className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded shadow">
    <h2 className="text-3xl font-bold mb-4">About This Project</h2>
    <p className="mb-6">
      This is a Unity WebGL Demo Project showcasing basic integration, player movement, and object interactions. Developed by Issatay Massalin.
    </p>
    <button
      className="px-4 py-2 bg-black text-white font-bold rounded"
      onClick={() => window.scrollTo({ top: document.querySelector('#unity-canvas').offsetTop - 80, behavior: 'smooth' })}
    >
      Back to Play
    </button>
  </section>
);

export default AboutPage;