import React from 'react';

interface ProgressBarProps {
  progress: number; // Percentage between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: progress >= 75 ? 'green' : progress >= 50 ? 'orange' : 'red',
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={progressBarStyle}></div>
    </div>
  );
};

export default ProgressBar;
