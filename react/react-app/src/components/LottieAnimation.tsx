import React from 'react';
import type { LottieRefCurrentProps } from 'lottie-react';

// The Lottie player (~300KB of the old single bundle) is its own chunk, loaded
// only when the first animation comes near the screen.
const Lottie = React.lazy(() => import('lottie-react'));

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  /** Shown instead of the animation if its JSON fails to load. */
  fallback?: React.ReactNode;
}

// A card animation that costs nothing until it is needed:
//   - the JSON (25-260KB each) is fetched only when the card is within 300px
//     of the viewport, so the homepage no longer downloads all ten on load;
//   - it plays only while on screen and pauses when scrolled away, so ten
//     animations don't loop off-screen at once;
//   - it keeps playing under reduced motion: like the typing line, the owner
//     chose to exempt these from DESIGN.md's still-frame rule.
const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationPath,
  className = '',
  style,
  loop = true,
  fallback,
}) => {
  const holderRef = React.useRef<HTMLDivElement>(null);
  const lottieRef = React.useRef<LottieRefCurrentProps | null>(null);
  const [near, setNear] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [animationData, setAnimationData] = React.useState<unknown>(null);
  const [error, setError] = React.useState(false);

  // One observer for "near" (start loading) and one for "on screen" (play).
  React.useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    const visibleObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    nearObserver.observe(el);
    visibleObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!near) return;
    let cancelled = false;
    setError(false);
    fetch(animationPath)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load animation');
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch((err) => {
        console.error('Error loading Lottie animation:', err);
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [near, animationPath]);

  // Play only while on screen.
  React.useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;
    if (visible) player.play();
    else player.pause();
  }, [visible, animationData]);

  if (error) {
    if (fallback) return <>{fallback}</>;
    return <div className={`lottie-error ${className}`} style={style} aria-hidden="true" />;
  }

  // Until the data arrives the space is held by an empty frame, not a
  // "Loading..." label: text flashing in every card reads as noise.
  return (
    <div ref={holderRef} className={`lottie-container ${className}`} style={style}>
      {animationData ? (
        <React.Suspense fallback={null}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={loop}
            autoplay={visible}
            onDOMLoaded={() => {
              if (!visible) lottieRef.current?.pause();
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </React.Suspense>
      ) : (
        <div className="lottie-loading" aria-hidden="true" />
      )}
    </div>
  );
};

export default LottieAnimation;
