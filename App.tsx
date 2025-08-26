import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAppContext } from './contexts/AppContext';

// Import your components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import SettingsPanel from './components/SettingsPanel';
import AIAssistBot from './components/AIAssistBot';
import NewsTicker from './components/NewsTicker';
import MouseTrail from "./components/MouseTrail";

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Process from './pages/Process';
import SuccessStories from './pages/SuccessStories';
import Blog from './pages/Blog';
import SingleBlogPage from './pages/SingleBlogPage';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const { theme } = useAppContext();

  // ✅ Apply the theme class to <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <HashRouter>
      {/* ✅ Remove theme from div, now handled on <html> */}
      <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <Navbar />
        <NewsTicker />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/process" element={<Process />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<SingleBlogPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <SettingsPanel />
        <AIAssistBot />
        <MouseTrail />
      </div>
    </HashRouter>
  );
};

export default App;