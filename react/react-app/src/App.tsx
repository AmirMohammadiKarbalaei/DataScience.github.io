import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import ScrollToTop from './components/ScrollToTop';
import { initGA } from './utils/analytics';
import './App.css';

function App() {
  // Initialize Google Analytics on app start
  useEffect(() => {
    initGA();
  }, []);

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
