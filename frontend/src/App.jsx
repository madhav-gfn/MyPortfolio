import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import About from './pages/About';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';
import SkeletonGameOfLife from './components/SkeletonGameOfLife';
import AmbientBackground from './components/AmbientBackground';
import AskMadhav from './components/AskMadhav';
// Styles
import './App.css';

function App() {
  const [gameOfLifeActive, setGameOfLifeActive] = useState(false);
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative overflow-hidden pr-0 md:pr-20 pb-20 md:pb-0">
        <AmbientBackground />
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
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