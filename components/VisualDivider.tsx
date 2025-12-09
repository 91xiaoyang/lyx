import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, Circle, Heart } from 'lucide-react';

interface VisualDividerProps {
  number: number;
  isPrime: boolean;
  autoPlay?: boolean;
}

const VisualDivider: React.FC<VisualDividerProps> = ({ number, isPrime, autoPlay = false }) => {
  const [columns, setColumns] = useState(1);
  const [showExplanation, setShowExplanation] = useState("");
  
  // Calculate grid
  const rows = Math.ceil(number / columns);
  const remainder = number % columns;
  const isCleanDivision = remainder === 0;

  // Attempt different divisions automatically for demo purposes
  useEffect(() => {
    if (!autoPlay) {
      setColumns(1); // Reset
      return;
    }

    let sequence: number[] = [];
    // Create a sequence of divisors to try
    for (let i = 1; i <= Math.ceil(number/2); i++) {
        sequence.push(i);
    }
    // Always end with the number itself if small enough, or just some examples
    if (number > 1) sequence.push(number);
    
    // Remove duplicates and sort
    sequence = Array.from(new Set(sequence)).sort((a,b) => a-b);

    let currentIndex = 0;

    const interval = setInterval(() => {
        const div = sequence[currentIndex];
        setColumns(div);
        
        // Update explanation
        if (div === 1) setShowExplanation("排成 1 列... 每个人都在一队！");
        else if (div === number) setShowExplanation(`排成 ${div} 列... 每个人自己一队！`);
        else if (number % div === 0) setShowExplanation(`✅ 哇！可以平均分成 ${div} 列！是合数！`);
        else setShowExplanation(`❌ 哎呀，分成 ${div} 列会剩下 ${number % div} 个...`);

        currentIndex = (currentIndex + 1) % sequence.length;
    }, 2500);

    return () => clearInterval(interval);
  }, [number, autoPlay]);

  return (
    <div className="flex flex-col items-center bg-white/50 p-6 rounded-2xl border-2 border-slate-200 shadow-inner w-full max-w-md">
      <div className="h-8 mb-4 text-center font-bold text-slate-700">
        {autoPlay && (
           <motion.span
             key={showExplanation}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
           >
             {showExplanation}
           </motion.span>
        )}
        {!autoPlay && (
            <span>试着把它们分组!</span>
        )}
      </div>

      {/* The Grid Visualization */}
      <div 
        className="grid gap-2 mb-6 transition-all duration-500 ease-in-out"
        style={{ 
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: number }).map((_, i) => (
          <motion.div
            key={i}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
               isCleanDivision ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
            }`}
          >
            {i % 2 === 0 ? <Star className="w-6 h-6 fill-current" /> : <Heart className="w-6 h-6 fill-current" />}
          </motion.div>
        ))}
      </div>

      {/* Interactive Controls (Only if not autoplay) */}
      {!autoPlay && (
        <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: Math.min(number, 6) }).map((_, i) => {
                const divisor = i + 1;
                const works = number % divisor === 0;
                return (
                    <button
                        key={divisor}
                        onClick={() => setColumns(divisor)}
                        className={`px-4 py-2 rounded-full font-bold transition-colors ${
                            columns === divisor 
                            ? 'bg-slate-800 text-white' 
                            : 'bg-white border-2 border-slate-200 hover:bg-slate-100 text-slate-600'
                        }`}
                    >
                        分 {divisor} 组
                        {columns === divisor && (works ? ' ✅' : ' ❌')}
                    </button>
                )
            })}
        </div>
      )}
      
      {!autoPlay && columns !== 1 && columns !== number && number % columns === 0 && (
         <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg text-sm font-bold">
            看！除了1和它自己，它还能被 {columns} 整除！
         </div>
      )}
    </div>
  );
};

export default VisualDivider;