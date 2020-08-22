import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <div id="welcome" className="min-h-screen flex items-center justify-center">
      <h1 className="text-secondary text-2xl md:text-6xl">
        Hello, <span className="text-highlight-darkest">my name is</span>
        <br />
        <i>Matheus Albino</i> <span className="text-highlight-darkest">and I'm a</span>
        <br /> <i>Full Stack Developer</i>.
      </h1>
    </div>
  );
};

export default WelcomeSection;
