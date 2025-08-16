import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { SettingsIcon, SunIcon, MoonIcon, XIcon } from './icons';

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, fontSize, setFontSize, setFontSizePercentage } = useAppContext();
  
  const BASE_FONT_SIZE = 16;
  const currentPercentage = Math.round((fontSize / BASE_FONT_SIZE) * 100);

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[60]">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-primary text-white p-3 rounded-full shadow-lg"
          aria-label="Open settings panel"
        >
          <SettingsIcon className="h-6 w-6" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-[65]"
             />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-[70] p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brand-primary dark:text-white">Settings</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white p-1 rounded-full">
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Theme Toggle */}
              <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Theme</h3>
                  <div className="flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <button
                          onClick={() => theme === 'dark' && toggleTheme()}
                          className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-colors ${theme === 'light' ? 'bg-white text-brand-primary shadow' : 'text-gray-500 dark:text-gray-300'}`}
                      >
                          <SunIcon className="h-5 w-5" /> Light
                      </button>
                      <button
                          onClick={() => theme === 'light' && toggleTheme()}
                          className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-gray-900 text-white shadow' : 'text-gray-500 dark:text-gray-300'}`}
                      >
                          <MoonIcon className="h-5 w-5" /> Dark
                      </button>
                  </div>
              </div>

              {/* Font Size Control */}
              <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Font Size</h3>
                  <div className="grid grid-cols-4 gap-2 text-center mb-4">
                      {[25, 50, 75, 100].map(p => (
                          <button
                              key={p}
                              onClick={() => setFontSizePercentage(p)}
                              className={`p-2 rounded-md text-sm font-medium transition-colors ${currentPercentage === p ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                          >
                              {p}%
                          </button>
                      ))}
                  </div>
                  <div className="mt-4">
                      <label htmlFor="font-size-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custom Size: {currentPercentage}%
                      </label>
                      <input
                          type="range"
                          id="font-size-slider"
                          min="8" // 50% of 16px
                          max="32" // 200% of 16px
                          step="0.1"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                  </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;