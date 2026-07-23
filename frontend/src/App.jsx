import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';
import SkeletonGameOfLife from './components/SkeletonGameOfLife';
import AmbientBackground from './components/AmbientBackground';
import AskMadhav from './components/AskMadhav';
import Loader from './components/Loader';
import ThreeDBackground from './components/ThreeDBackground';
import ScrollToTop from './components/ScrollToTop';
// Styles
import './App.css';

function App() {
  const [, setGameOfLifeActive] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  React.useEffect(() => {
    // Force the loader to show for at least a few seconds on initial load
    // so the user can experience the tech vibe
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoad) {
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white relative overflow-hidden pr-0 md:pr-20 pb-20 md:pb-0">
        <AmbientBackground />
        <ThreeDBackground />
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        <SkeletonGameOfLife onActiveChange={setGameOfLifeActive} />
        <Navbar />

        <main className="relative z-10 pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
        <AskMadhav />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(26, 26, 26, 0.9)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;