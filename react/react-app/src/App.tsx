import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Google Analytics is loaded by the gtag snippet in index.html. initGA() from
// utils/analytics injects a second copy of the same snippet, which double-counts
// every pageview, so it is deliberately not called here.

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
