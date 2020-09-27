import classNames from 'classnames';
import React from 'react';
import { useTheme } from '../../common/Theme';

const WelcomeSection: React.FC = () => {
  const { theme } = useTheme();

  const textHighligtClassName = classNames({
    'text-highlight-darkest': theme.base === 'dark',
    'text-primary-darkest': theme.base === 'light'
  });

  return (
    <div id="welcome" className="min-h-screen flex items-center justify-center">
      <h1 className="text-secondary text-2xl md:text-6xl">
        Hello, <span className={textHighligtClassName}>my name is</span>
        <br />
        <i>Matheus Albino</i> <span className={textHighligtClassName}>and I'm a</span>
        <br /> <i>Full Stack Developer</i>.
      </h1>
    </div>
  );
};

export default WelcomeSection;
