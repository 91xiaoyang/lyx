import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, NumberData } from './types';
import { INTRO_2, INTRO_4, OTHER_PRIMES, OTHER_COMPOSITES, PRIME_COLOR, COMPOSITE_COLOR } from './constants';
import NumberCharacter from './components/NumberCharacter';
import VisualDivider from './components/VisualDivider';
import Quiz from './components/Quiz';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);

  const nextStep = () => {
    switch (appState) {
      case AppState.WELCOME: setAppState(AppState.INTRO_PRIME_2); break;
      case AppState.INTRO_PRIME_2: setAppState(AppState.INTRO_PRIMES_OTHERS); break;
      case AppState.INTRO_PRIMES_OTHERS: setAppState(AppState.INTRO_COMPOSITE_4); break;
      case AppState.INTRO_COMPOSITE_4: setAppState(AppState.INTRO_COMPOSITES_OTHERS); break;
      case AppState.INTRO_COMPOSITES_OTHERS: setAppState(AppState.COMPARISON); break;
      case AppState.COMPARISON: setAppState(AppState.QUIZ); break;
      default: break;
    }
  };

  const restart = () => setAppState(AppState.WELCOME);

  // Background style changes based on phase
  const getBackground = () => {
    if (appState === AppState.WELCOME) return "bg-gradient-to-br from-indigo-100 to-purple-100";
    if (appState.includes("PRIME")) return "bg-gradient-to-br from-yellow-50 to-orange-50";
    if (appState.includes("COMPOSITE")) return "bg-gradient-to-br from-blue-50 to-cyan-50";
    if (appState === AppState.QUIZ) return "bg-slate-50";
    return "bg-white";
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-1000 ${getBackground()}`}>
      
      {/* Header / Nav */}
      <div className="absolute top-4 left-4 z-50">
        <button onClick={restart} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
            <RotateCcw size={20} className="text-slate-600" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* WELCOME SCREEN */}
        {appState === AppState.WELCOME && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-indigo-600 mb-6 drop-shadow-sm">
              数字大冒险
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12">
              探索 <span className="text-yellow-600 font-bold">素数 (Primes)</span> 和 <span className="text-blue-600 font-bold">合数 (Composites)</span> 的秘密！
            </p>
            
            <div className="flex justify-center gap-8 mb-12">
              <NumberCharacter value={2} isPrime={true} emotion="happy" />
              <NumberCharacter value={4} isPrime={false} emotion="surprised" />
            </div>

            <button 
              onClick={nextStep}
              className="bg-indigo-600 text-white text-2xl font-bold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-3 mx-auto"
            >
              <Play fill="currentColor" />
              开始冒险
            </button>
          </motion.div>
        )}

        {/* INTRO PRIME 2 */}
        {appState === AppState.INTRO_PRIME_2 && (
          <motion.div 
            key="intro2"
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
            className="flex flex-col items-center max-w-4xl text-center"
          >
            <div className="mb-6">
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm">
                    认识主角
                </span>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">这是数字 2</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-lg">
              2 是最小的<span className="font-bold text-yellow-600">素数</span>。它很特别，因为它很"孤独"。
              试着把它分给朋友们？
            </p>

            <div className="flex flex-col md:flex-row items-center gap-12 mb-10">
                <NumberCharacter value={2} isPrime={true} size="xl" />
                <VisualDivider number={2} isPrime={true} autoPlay={true} />
            </div>

            <p className="text-lg bg-white/60 p-4 rounded-xl border border-yellow-200 mb-8">
              看！它只能排成 1 列（整除1），或者排成 2 列（整除自己）。<br/>
              只有<span className="font-bold">2个朋友</span>（因数）的数字叫做 <span className="text-yellow-600 font-bold text-2xl">素数</span>。
            </p>

            <button onClick={nextStep} className="next-btn">
              认识其他素数 <ArrowRight />
            </button>
          </motion.div>
        )}

        {/* OTHER PRIMES */}
        {appState === AppState.INTRO_PRIMES_OTHERS && (
          <motion.div 
            key="otherPrimes"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-8">素数俱乐部</h2>
            <p className="text-xl text-slate-600 mb-8">
                这些数字也只有两个朋友（1和它们自己）：
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                {OTHER_PRIMES.map((num, i) => (
                    <motion.div 
                        key={num}
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <NumberCharacter value={num} isPrime={true} />
                    </motion.div>
                ))}
            </div>
            
            <p className="mb-10 text-slate-500">
                它们很难被平均分组，除了排成一长队！
            </p>

            <button onClick={nextStep} className="next-btn">
              看看另一种数字 <ArrowRight />
            </button>
          </motion.div>
        )}

        {/* INTRO COMPOSITE 4 */}
        {appState === AppState.INTRO_COMPOSITE_4 && (
          <motion.div 
            key="intro4"
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
            className="flex flex-col items-center max-w-4xl text-center"
          >
             <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm">
                    认识团队成员
                </span>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">这是数字 4</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-lg">
              4 是<span className="font-bold text-blue-600">合数</span>。它喜欢交朋友，因为它可以被别的数字整除！
            </p>

            <div className="flex flex-col md:flex-row items-center gap-12 mb-10">
                <NumberCharacter value={4} isPrime={false} size="xl" />
                <VisualDivider number={4} isPrime={false} autoPlay={true} />
            </div>

             <p className="text-lg bg-white/60 p-4 rounded-xl border border-blue-200 mb-8">
              它可以排成 2 列！<br/>
              除了 1 和 4，它还有一个朋友：<span className="font-bold">2</span>。
              <br/>朋友超过2个的数字叫做 <span className="text-blue-600 font-bold text-2xl">合数</span>。
            </p>

            <button onClick={nextStep} className="next-btn-blue">
              还有谁是合数？ <ArrowRight />
            </button>
          </motion.div>
        )}

        {/* OTHER COMPOSITES */}
        {appState === AppState.INTRO_COMPOSITES_OTHERS && (
          <motion.div 
            key="otherComposites"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-8">合数大家庭</h2>
            <p className="text-xl text-slate-600 mb-8">
                这些数字可以排成各种形状的队伍：
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                {OTHER_COMPOSITES.map((num, i) => (
                    <motion.div 
                        key={num}
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <NumberCharacter value={num} isPrime={false} />
                    </motion.div>
                ))}
            </div>

            <button onClick={nextStep} className="next-btn-blue">
              总结一下 <ArrowRight />
            </button>
          </motion.div>
        )}

        {/* COMPARISON / SUMMARY */}
        {appState === AppState.COMPARISON && (
            <motion.div 
                key="comparison"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full max-w-5xl"
            >
                <h2 className="text-4xl font-bold text-slate-800 mb-12">记住区别</h2>
                
                <div className="grid md:grid-cols-2 gap-8 w-full">
                    {/* Prime Card */}
                    <motion.div 
                        className="bg-yellow-50 p-8 rounded-3xl border-4 border-yellow-200 flex flex-col items-center shadow-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-bold text-yellow-800 mb-4">素数 (Prime)</h3>
                        <NumberCharacter value={5} isPrime={true} />
                        <ul className="mt-6 text-left space-y-3 text-yellow-900 text-lg">
                            <li className="flex items-start gap-2">👑 只有两个因数</li>
                            <li className="flex items-start gap-2">☝️ 只能被 1 和它自己整除</li>
                            <li className="flex items-start gap-2">⭐️ 比如: 2, 3, 5, 7, 11</li>
                        </ul>
                    </motion.div>

                    {/* Composite Card */}
                    <motion.div 
                        className="bg-blue-50 p-8 rounded-3xl border-4 border-blue-200 flex flex-col items-center shadow-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">合数 (Composite)</h3>
                        <NumberCharacter value={6} isPrime={false} />
                         <ul className="mt-6 text-left space-y-3 text-blue-900 text-lg">
                            <li className="flex items-start gap-2">🤝 有很多因数 (超过2个)</li>
                            <li className="flex items-start gap-2">🧱 可以被其他数字整除</li>
                            <li className="flex items-start gap-2">🏘️ 比如: 4, 6, 8, 9, 10</li>
                        </ul>
                    </motion.div>
                </div>

                <button 
                    onClick={nextStep} 
                    className="mt-12 bg-green-500 text-white text-2xl font-bold px-12 py-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all flex items-center gap-3"
                >
                    <Play fill="currentColor" />
                    来挑战小测验！
                </button>
            </motion.div>
        )}

        {/* QUIZ */}
        {appState === AppState.QUIZ && (
            <motion.div 
                key="quiz"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="w-full"
            >
                <Quiz onRestart={restart} />
            </motion.div>
        )}

      </AnimatePresence>

      <style>{`
        .next-btn {
            @apply bg-yellow-500 text-white text-xl font-bold px-8 py-3 rounded-full shadow-md hover:bg-yellow-600 hover:scale-105 transition-all flex items-center gap-2;
        }
        .next-btn-blue {
            @apply bg-blue-500 text-white text-xl font-bold px-8 py-3 rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-2;
        }
      `}</style>
    </div>
  );
};

export default App;