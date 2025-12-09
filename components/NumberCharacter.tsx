import React from 'react';
import { motion } from 'framer-motion';
import { PRIME_COLOR, COMPOSITE_COLOR } from '../constants';

interface NumberCharacterProps {
  value: number;
  isPrime: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emotion?: 'happy' | 'surprised' | 'proud';
}

const NumberCharacter: React.FC<NumberCharacterProps> = ({ value, isPrime, size = 'md', emotion = 'happy' }) => {
  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-24 h-24 text-4xl",
    lg: "w-32 h-32 text-5xl",
    xl: "w-48 h-48 text-7xl"
  };

  const colorClass = isPrime ? PRIME_COLOR : COMPOSITE_COLOR;

  // Eye Animation variants
  const eyeVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { repeat: Infinity, repeatDelay: 3, duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full border-4 shadow-[0_8px_0_rgba(0,0,0,0.2)] font-bold ${sizeClasses[size]} ${colorClass}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
    >
      {/* Face Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Eyes */}
        <div className="flex space-x-2 mb-2 translate-y-[-10px]">
          <motion.div 
            className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full" 
            variants={eyeVariants} 
            animate="blink"
          />
          <motion.div 
            className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"
            variants={eyeVariants} 
            animate="blink"
          />
        </div>
        {/* Mouth */}
        <div className="w-6 h-3 border-b-4 border-black rounded-full translate-y-[-5px]"></div>
      </div>
      
      {/* The Number Text - Pushed down slightly to not overlap face too much if small */}
      <span className="mt-8 z-10">{value}</span>

      {/* Crown for Primes (Optional visual cue) */}
      {isPrime && (
        <motion.div 
            className="absolute -top-6 text-yellow-500 text-4xl filter drop-shadow-md"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
          👑
        </motion.div>
      )}
    </motion.div>
  );
};

export default NumberCharacter;