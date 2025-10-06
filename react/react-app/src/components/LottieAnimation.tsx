import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationPath,
  className = '',
  style,
  loop = true,
  autoplay = true,
}) => {
  const [animationData, setAnimationData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const loadAnimation = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error('Failed to load animation');
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadAnimation();
  }, [animationPath]);

  if (loading) {
    return (
      <div className={`lottie-loading ${className}`} style={style}>
        <div className="loading-placeholder">Loading...</div>
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div className={`lottie-error ${className}`} style={style}>
        <div className="error-placeholder">Animation not available</div>
      </div>
    );
  }

  return (
    <div className={`lottie-container ${className}`} style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;