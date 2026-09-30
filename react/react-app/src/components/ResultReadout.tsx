import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion';

// The card's headline result as an instrument readout that settles: when the
// card comes into view, every number in the line counts up from zero to its
// real value once (~1.8s, decelerating), then holds. Only the digits move;
// the words stay put, and the monospaced face keeps the line from jittering.
// Screen readers get the final sentence straight away. Under reduced motion
// the final values are shown from the start.

const NUMBER = /\d[\d,]*(?:\.\d+)?/g;
// Long enough to be read as a count, not a flicker.
const DURATION = 1800;

type Part = { text: string } | { value: number; decimals: number; grouped: boolean };

const parse = (line: string): Part[] => {
  const parts: Part[] = [];
  let last = 0;
  for (const m of line.matchAll(NUMBER)) {
    const index = m.index ?? 0;
    if (index > last) parts.push({ text: line.slice(last, index) });
    const raw = m[0];
    parts.push({
      value: Number(raw.replace(/,/g, '')),
      decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
      grouped: raw.includes(','),
    });
    last = index + raw.length;
  }
  if (last < line.length) parts.push({ text: line.slice(last) });
  return parts;
};

const format = (value: number, decimals: number, grouped: boolean) =>
  value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const ResultReadout: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));
  const parts = parse(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || progress === 1) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      // Start only once the line is fully on screen and above the bottom
      // quarter, i.e. when the reader has scrolled to it, not when a card
      // merely peeks in at the foot of the first screen.
      { threshold: 1, rootMargin: '0px 0px -25% 0px' }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // Runs once per mount; progress only starts below 1 when motion is allowed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className="project-result" ref={ref}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {parts.map((part, i) =>
          'text' in part ? (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          ) : (
            <React.Fragment key={i}>
              {format(progress === 1 ? part.value : part.value * progress, part.decimals, part.grouped)}
            </React.Fragment>
          )
        )}
      </span>
    </p>
  );
};

export default ResultReadout;
