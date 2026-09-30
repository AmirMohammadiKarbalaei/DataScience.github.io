import React from 'react';
import { Link, useViewTransitionState } from 'react-router-dom';
import type { Project } from '../data/projects';
import { primaryDomain } from '../data/domains';
import LottieAnimation from './LottieAnimation';
import ResultReadout from './ResultReadout';
import { trackEvent } from '../utils/analytics';
import { prefersReducedMotion } from '../utils/motion';

// A missing image hides itself rather than showing the browser's broken-image
// icon; the card still reads fine without its media.
const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.hidden = true;
};

// A project card that expands into its project page. Transition names are set
// only while this card's page is the one being navigated to or from (the hook
// is true in both directions, so browser Back shrinks the page back into the
// card). Naming every card all the time would give duplicate names and the
// browser would skip the transition. Under reduced motion nothing is named,
// so nothing travels across the screen; the page only fades in place.
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const to = `/project/${project.id}`;
  const morphing = useViewTransitionState(to);
  const domain = primaryDomain(project);
  const name = (n: string): React.CSSProperties | undefined =>
    morphing && !prefersReducedMotion() ? { viewTransitionName: n } : undefined;

  return (
    <Link
      to={to}
      viewTransition
      className="project-card-link"
      onClick={() => trackEvent('project_click', 'Projects', project.title)}
    >
      <div
        className={`project-card${domain ? ` domain-${domain.key}` : ''}`}
        style={name('project-surface')}
      >
        <div className="project-image-container">
          {project.animation ? (
            <LottieAnimation
              animationPath={project.animation}
              className={`project-animation anim-${project.id}`}
              style={{ width: '100%', height: '100%' }}
              fallback={<img className="project-image" src={project.image} alt="" onError={hideBroken} />}
            />
          ) : (
            <img className="project-image" src={project.image} alt="" onError={hideBroken} />
          )}
        </div>
        <div className="project-content">
          <h3 className="project-title">
            {project.title}
          </h3>
          {domain && (
            <p className="project-domain">{domain.label}</p>
          )}
          {/* The headline result, in the instrument's voice: the proof a
              recruiter can take away without opening the project. */}
          {project.result && (
            <ResultReadout text={project.result} />
          )}
          {/* No tag row: the card summarises, and the project page lists the
              tools. Tags on nine cards were ~35 more coloured objects. */}
          <p className="project-description">{project.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
