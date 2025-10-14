import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="logo-container">
          <div className="logo-text">
            <span className="brand-text">Amir</span>
            <span className="brand-dot">.</span>
            <span className="brand-domain">Data</span>
          </div>
        </div>
        
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div 
              className="loading-progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-text">
            Loading... {Math.round(progress)}%
          </div>
        </div>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;