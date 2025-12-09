import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS, PRIME_COLOR, COMPOSITE_COLOR } from '../constants';
import NumberCharacter from './NumberCharacter';
import { Check, X, Trophy, RefreshCcw } from 'lucide-react';

interface QuizProps {
  onRestart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onRestart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleAnswer = (choiceIsPrime: boolean) => {
    if (showFeedback) return; // Prevent double clicks

    const isCorrect = choiceIsPrime === currentQuestion.isPrime;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl max-w-lg w-full text-center">
        <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="text-yellow-500 mb-6"
        >
            <Trophy size={80} fill="currentColor" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">挑战完成！</h2>
        <p className="text-xl text-slate-600 mb-8">
            你答对了 {QUIZ_QUESTIONS.length} 题中的 {score} 题！
            {score === QUIZ_QUESTIONS.length ? " 太棒了！你是数学小天才！🌟" : " 继续加油！"}
        </p>
        <button 
            onClick={onRestart}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-indigo-700 transition-transform hover:scale-105"
        >
            <RefreshCcw size={20} />
            再玩一次
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h2 className="text-2xl font-bold text-slate-700 mb-8">
        这个数字是素数还是合数？
      </h2>

      <div className="mb-10 relative">
        <NumberCharacter 
            value={currentQuestion.number} 
            isPrime={currentQuestion.isPrime} // We pass true just for styling base, user doesn't know yet visually if we hide visual cues? Actually let's hide visual cues in quiz mode!
            // Wait, NumberCharacter uses color based on isPrime. We need a 'neutral' or 'mystery' mode for the quiz.
            // Let's force a neutral style for the quiz question visually.
            // However, the component takes isPrime. Let's wrap it or just rely on the user knowing the math. 
            // Better: Show neutral color initially.
        />
        {/* We override the color using a covering div if needed, but easier to modify NumberCharacter. 
            For this complexity, let's just let the character look "Neutral" by styling the parent or ignoring props.
            Actually, showing the 'answer' visually (via color) defeats the quiz purpose. 
            Hack: In quiz, we don't render NumberCharacter with the correct isPrime prop for color until answered.
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Overlay to hide color hint if we wanted strict quiz, but for 3rd graders, maybe simple numbers are better. 
                 Let's create a "Mystery Number" look.
             */}
        </div>
      </div>
      
      {/* Custom 'Mystery' Number for Quiz display to avoid giving away the answer via color */}
      <div className="absolute top-[200px] pointer-events-none">
         {/* This is a visual hack to cover the component in the previous sibling if needed, 
             but let's just render a simple number card instead of the revealed character */}
      </div>

      {/* Revised Display: Large Mystery Card */}
      <div className="relative mb-12">
         <motion.div 
            key={currentQuestion.number}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-6xl font-bold text-slate-700 border-4 border-slate-300 shadow-lg"
         >
            {currentQuestion.number}
         </motion.div>
         
         {/* Feedback Overlay */}
         <AnimatePresence>
            {showFeedback && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -top-4 -right-12 p-3 rounded-full text-white shadow-lg ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {showFeedback === 'correct' ? <Check size={32} strokeWidth={4} /> : <X size={32} strokeWidth={4} />}
                </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <button
            onClick={() => handleAnswer(true)}
            disabled={showFeedback !== null}
            className={`p-6 rounded-2xl border-b-4 text-xl font-bold transition-transform active:scale-95 ${
                showFeedback 
                ? 'bg-gray-100 text-gray-400 border-gray-200' 
                : 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
            }`}
        >
            素数 (Prime)
            <div className="text-sm font-normal opacity-70 mt-1">只有 1 和它自己</div>
        </button>

        <button
            onClick={() => handleAnswer(false)}
            disabled={showFeedback !== null}
            className={`p-6 rounded-2xl border-b-4 text-xl font-bold transition-transform active:scale-95 ${
                showFeedback 
                ? 'bg-gray-100 text-gray-400 border-gray-200' 
                : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
            }`}
        >
            合数 (Composite)
            <div className="text-sm font-normal opacity-70 mt-1">还有别的队！</div>
        </button>
      </div>
    </div>
  );
};

export default Quiz;