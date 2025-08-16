import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, Variants, useMotionValue, animate } from 'framer-motion';
import { XIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const gearControls = useAnimation();
  const weightControls = useAnimation();
  const leverControls = useAnimation();
  const conveyorItemX = useMotionValue(0);
  const conveyorItemY = useMotionValue(0);
  const pullHandY = useMotionValue(0);
  const sprayOpacity = useMotionValue(0);
  const submitMechanismY = useMotionValue(0);

  useEffect(() => {
    gearControls.start({ rotate: name.length * 30 });
    weightControls.start({ y: name.length > 0 ? 25 : 0 });
  }, [name, gearControls, weightControls]);

  useEffect(() => {
    if (email.length > 0) {
      animate(conveyorItemX, 60, { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' });
      animate(conveyorItemY, -15, { duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' });
    } else {
      animate(conveyorItemX, 0, { duration: 0 });
      animate(conveyorItemY, 0, { duration: 0 });
    }
  }, [email, conveyorItemX, conveyorItemY]);

  useEffect(() => {
    leverControls.start({
      rotate: agreed ? -5 : 0,
      y: agreed ? 5 : 0
    });
  }, [agreed, leverControls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setSubmitted(true);
    
    // Submission animation sequence
    const sequence = async () => {
      await animate(submitMechanismY, 5, { duration: 0.1 });
      await animate(pullHandY, 20, { type: 'spring', stiffness: 200, damping: 15, duration: 0.5 });
      await animate(sprayOpacity, 1, { duration: 0.1 });
      await animate(pullHandY, 0, { type: 'spring', stiffness: 100, damping: 15, duration: 0.4 });
      await animate(submitMechanismY, 0, { duration: 0.1 });
      animate(sprayOpacity, 0, { duration: 0.3, delay: 0.2 });
    };
    sequence();

    setTimeout(() => {
      onClose();
    }, 2500);
  };
  
  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName('');
        setEmail('');
        setAgreed(false);
        setSubmitted(false);
        // Reset motion values
        conveyorItemX.set(0);
        conveyorItemY.set(0);
        pullHandY.set(0);
        sprayOpacity.set(0);
        submitMechanismY.set(0);
      }, 300); // Wait for exit animation
    }
  }, [isOpen, conveyorItemX, conveyorItemY, pullHandY, sprayOpacity, submitMechanismY]);

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };
  
  const machineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-xl mx-auto relative overflow-hidden aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-20 p-1">
              <XIcon className="h-6 w-6" />
            </button>
            
            <AnimatePresence>
              {!submitted ? (
                <motion.div variants={machineVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-0">
                  <div className="absolute w-full h-full top-0 left-0 p-8 z-10">
                    <form onSubmit={handleSubmit} className="relative w-full h-full">
                      <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="absolute top-[17%] left-[34%] w-[35%] bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                      />
                      <input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="absolute top-[28%] left-[34%] w-[35%] bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                      />
                      <div className="absolute top-[40%] left-[34%] flex items-center">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mr-2 h-4 w-4 accent-gray-700 dark:accent-gray-400"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-300 select-none">agree to whatever</label>
                      </div>
                      <motion.div 
                        className="absolute top-[68%] left-[75%] w-[15%]"
                        style={{ y: submitMechanismY, opacity: agreed ? 1 : 0.5 }}
                      >
                         <button
                           type="submit"
                           disabled={!agreed}
                           className="w-full text-sm py-1.5 rounded bg-gray-200 dark:bg-gray-600 border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 transition-all duration-300"
                           style={{ cursor: agreed ? 'pointer' : 'not-allowed' }}
                         >
                            submit
                         </button>
                      </motion.div>
                    </form>
                  </div>

                  <svg viewBox="0 0 500 375" className="w-full h-full text-black dark:text-gray-300" preserveAspectRatio="xMidYMid meet">
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                      {/* Name mechanism: Pulley & Gears */}
                      <motion.g animate={weightControls}>
                        <circle cx="235" cy="80" r="20" />
                        <path d="M235 60 V 40" />
                        <path d="M235 100 V 120" />
                        <rect x="230" y="120" width="10" height="10" fill="currentColor" />
                      </motion.g>
                      <path d="M255 80 H 340" />
                      <motion.g animate={gearControls} style={{ transformOrigin: '350px 80px' }}>
                        <circle cx="350" cy="80" r="10" />
                        <path d="M350 70 V 90 M 340 80 H 360" />
                      </motion.g>
                       <motion.g animate={{ rotate: name.length * -45 }} style={{ transformOrigin: '375px 80px' }}>
                        <circle cx="375" cy="80" r="15" />
                         <circle cx="375" cy="80" r="2" fill="currentColor" />
                      </motion.g>

                      {/* Email mechanism: Conveyor belt */}
                      <path d="M40 250 h 70 a 10 10 0 0 1 0 20 h -70 a 10 10 0 0 1 0 -20" />
                      <path d="M50 240 v 10 M 100 240 v 10" />
                      <motion.g style={{ x: conveyorItemX, y: conveyorItemY }}>
                         <path d="M50 240 L 40 220" />
                         <rect x="35" y="215" width="10" height="5" fill="currentColor" />
                      </motion.g>

                       {/* Lever system */}
                       <motion.g animate={leverControls} style={{ transformOrigin: '200px 300px' }}>
                         <path d="M120 280 L 400 250" />
                         <circle cx="200" cy="300" r="4" fill="currentColor" />
                         <path d="M200 304 V 350" />
                         <path d="M190 350 H 210" />
                       </motion.g>
                      
                       <g>
                          <path d="M 190 300 h -10 v -20 l 10 -5 v 25" />
                          <path d="M 190 300 l 5 15" />
                       </g>

                      {/* Submit mechanism */}
                      <g>
                        <path d="M390 80 V 150" />
                        <motion.g style={{ y: pullHandY }}>
                          <path d="M 380 150 h 20 v -10 l 5 -5 v 15" />
                        </motion.g>
                        <path d="M390 150 V 220" />
                        {/* Spray bottle */}
                        <path d="M380 240 h 20 v -20 h -20 z" />
                        <path d="M385 220 h 10 v -5 h -10 z" />
                        <path d="M390 215 v -5" />
                        {/* Spray */}
                        <motion.g style={{ opacity: sprayOpacity }}>
                           <path d="M 390 210 l -10 -5" />
                           <path d="M 390 210 l -8 -8" />
                           <path d="M 390 210 l -5 -10" />
                        </motion.g>
                      </g>
                    </g>
                  </svg>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-4">Submission Complete!</h2>
                    <p className="text-gray-600 dark:text-gray-300">Thank you.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;