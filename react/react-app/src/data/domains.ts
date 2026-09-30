import type { Project } from './projects';

// One entry per project domain. The homepage filter row is generated from this
// list rather than hardcoded, so counts can never drift from the data. One
// filter per domain, because breadth across domains is what the page has to
// show; a single catch-all 'AI & ML' filter matched 8 of 11 projects and hid
// RL and time series inside it.
//
// Order matters: a project's primary domain (the colour its card carries) is
// the first entry here that its categories match. Each key has a matching
// `--domain-<key>` hue in index.css.
export const DOMAINS: { key: string; label: string; match: string[] }[] = [
  { key: 'nlp',  label: 'NLP & LLMs', match: ['NLP', 'LLM'] },
  // RL has no filter of its own, by the owner's choice: the DRL project sits
  // under Machine Learning and carries its hue.
  { key: 'ml',   label: 'Machine Learning', match: ['ML', 'RL'] },
  { key: 'ts',   label: 'Time Series', match: ['TimeSeries'] },
  { key: 'data', label: 'Data & BI', match: ['DA', 'BI'] },
];

export const primaryDomain = (project: Project) =>
  DOMAINS.find(d => project.category.some(c => d.match.includes(c)));
