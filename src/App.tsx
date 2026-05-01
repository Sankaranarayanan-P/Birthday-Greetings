/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, PartyPopper, Cake, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const FloatingIcon = ({ icon: Icon, delay, x, duration }: { icon: any, delay: number, x: string, duration: number, key?: any }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
    animate={{ 
      y: '-20vh', 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1.2, 0.8],
      x: [x, `${parseFloat(x) + (Math.random() * 20 - 10)}%`]
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="absolute pointer-events-none text-white/20 select-none z-0"
    style={{ left: x }}
  >
    <Icon size={Math.random() * 24 + 16} />
  </motion.div>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [balloons, setBalloons] = useState<{ id: number, x: number, color: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      const newBalloons = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#FF4D6D', '#7209B7'][Math.floor(Math.random() * 6)]
      }));
      setBalloons(newBalloons);
    }
  }, [isOpen]);

  const floatingIcons = [
    { icon: Heart, x: '10%' },
    { icon: Star, x: '25%' },
    { icon: Sparkles, x: '45%' },
    { icon: Heart, x: '65%' },
    { icon: Star, x: '85%' },
    { icon: Cake, x: '15%' },
    { icon: PartyPopper, x: '75%' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative font-sans selection:bg-pink-500/30">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animae-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        
        {floatingIcons.map((item, idx) => (
          <FloatingIcon 
            key={idx} 
            icon={item.icon} 
            delay={idx * 2} 
            x={item.x} 
            duration={15 + Math.random() * 10} 
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-2xl px-6 text-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(244,63,94,0.5)] border border-white/10"
                >
                  <Gift size={80} className="text-white" />
                </motion.div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transform rotate-12 shadow-lg">
                  Tap Me!
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-white/60 font-mono text-sm uppercase tracking-[0.3em] font-medium">A Special Surprise Awaits</h2>
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Balloon Rain */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {balloons.map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{ y: '100vh', x: `${b.x}vw`, rotate: 0 }}
                    animate={{ 
                      y: '-20vh',
                      rotate: [0, 45, -45, 0],
                      x: [`${b.x}vw`, `${b.x + (Math.random() * 10 - 5)}vw`]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 6,
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                    className="absolute w-8 h-10 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] opacity-80"
                    style={{ backgroundColor: b.color }}
                  >
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[2px] h-8 bg-white/20" />
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="flex justify-center space-x-4 text-yellow-400 mb-8"
                >
                  <PartyPopper size={32} />
                  <Cake size={32} />
                  <PartyPopper size={32} className="scale-x-[-1]" />
                </motion.div>

                <h1 className="flex flex-col space-y-2">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 tracking-tighter"
                  >
                    HAPPy
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  >
                    BIRTHDAY
                  </motion.span>
                </h1>

                <div className="space-y-4 pt-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span className="text-pink-400 font-bold text-2xl md:text-3xl tracking-[0.2em]">ILYSM</span>
                    <div className="h-[1px] w-12 bg-white/20" />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-white/60 text-lg md:text-xl font-light italic"
                  >
                    Take Care Always
                  </motion.p>
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white/60 transition-colors text-sm uppercase tracking-widest pt-12 block mx-auto"
              >
                Reset Surprise
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Corners */}
      <div className="fixed top-0 left-0 p-8 text-white/5 pointer-events-none">
        <Sparkles size={120} />
      </div>
      <div className="fixed bottom-0 right-0 p-8 text-white/5 pointer-events-none">
        <Sparkles size={120} />
      </div>
    </div>
  );
}
