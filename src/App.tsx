import React from 'react';
import { Logo } from './Logo';

export const App: React.FC = () => {
  return (
    <div className="text-center">
    <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <Logo className="pointer-events-none h-64 text-blue-300 fill-current motion-safe:animate-spin-20" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="text-blue-300"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  );
}
