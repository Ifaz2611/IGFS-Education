import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import SettingsPanel from './components/SettingsPanel';
import AIAssistBot from './components/AIAssistBot';
import NewsTicker from './components/NewsTicker';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Process from './pages/Process';
import SuccessStories from './pages/SuccessStories';
import Blog from './pages/Blog';
import SingleBlogPage from './pages/SingleBlogPage';
import Contact from './pages/Contact';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { theme } = useAppContext();
  
  return (
    <HashRouter>
      <div className={`${theme} font-sans`}>
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
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
        </div>
      </div>
    </HashRouter>
  );
};

export default App;