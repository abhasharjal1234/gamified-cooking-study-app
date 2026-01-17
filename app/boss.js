'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HPBar from '@/components/HPBar';
import { questions, checkAnswer } from '@/data/questions';

export default function BossBattle() {
  const [playerHP, setPlayerHP] = useState(30);
  const [bossHP, setBossHP] = useState(40);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [battleLog, setBattleLog] = useState([]);
  const [gameState, setGameState] = useState('active'); // active, victory, defeat
  const [questionsAsked, setQuestionsAsked] = useState([]);

  // Start battle with first question
  useEffect(() => {
    if (gameState === 'active' && !currentQuestion) {
      nextTurn();
    }
  }, [gameState, currentQuestion]);

  // Get next question
  const nextTurn = () => {
    let availableQuestions = questions.filter(q => !questionsAsked.includes(q.id));
    
    if (availableQuestions.length === 0) {
      availableQuestions = questions;
      setQuestionsAsked([]);
    }

    const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(randomQ);
    setQuestionsAsked([...questionsAsked, randomQ.id]);
    setUserAnswer('');
    setFeedback('');
  };

  // Handle answer
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) {
      setFeedback('⚠️ Enter an answer to attack!');
      return;
    }

    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);

    if (isCorrect) {
      // Player attacks boss
      const damage = Math.floor(Math.random() * 5) + 8; // 8-12 damage
      const newBossHP = Math.max(0, bossHP - damage);
      setBossHP(newBossHP);
      
      const attacks = [
        `🍕 You threw a perfect pizza! Dealt ${damage} damage!`,
        `🍔 Burger missile incoming! ${damage} damage!`,
        `🌮 Taco strike! Boss took ${damage} damage!`,
        `🍜 Ramen splash! ${damage} damage dealt!`,
        `🥘 Food bomb! ${damage} damage!`,
      ];
      const attackMsg = attacks[Math.floor(Math.random() * attacks.length)];
      setFeedback(attackMsg);
      setBattleLog([attackMsg, ...battleLog]);
      
      // Check for victory
      if (newBossHP <= 0) {
        setGameState('victory');
        return;
      }
      
      // Boss counter-attacks
      setTimeout(() => {
        const newPlayerHP = Math.max(0, playerHP - 5);
        setPlayerHP(newPlayerHP);
        
        const bossAttacks = [
          '🔥 The boss burned you with knowledge! 5 damage!',
          '💥 Boss used confusion ray! You took 5 damage!',
          '⚡ Lightning quiz! 5 damage taken!',
          '🌊 Wave of difficult questions! 5 damage!',
          '❌ Boss landed a critical hit! 5 damage!',
        ];
        const bossMsg = bossAttacks[Math.floor(Math.random() * bossAttacks.length)];
        setBattleLog([bossMsg, ...battleLog.slice(0, 4)]);
        
        // Check for defeat
        if (newPlayerHP <= 0) {
          setGameState('defeat');
        } else {
          setTimeout(nextTurn, 1500);
        }
      }, 1500);
      
    } else {
      // Wrong answer - boss attacks immediately
      const newPlayerHP = Math.max(0, playerHP - 5);
      setPlayerHP(newPlayerHP);
      
      const missAttacks = [
        '❌ Your dish was raw! Boss punished you for 5 damage!',
        '🔥 You burned the food! Boss strikes for 5 damage!',
        '💀 That was undercooked! 5 damage taken!',
        '😵 Wrong seasoning! Boss hit you for 5 damage!',
        '🚨 Kitchen disaster! Boss deals 5 damage!',
      ];
      const missMsg = missAttacks[Math.floor(Math.random() * missAttacks.length)];
      setFeedback(missMsg);
      setBattleLog([missMsg, ...battleLog]);
      
      if (newPlayerHP <= 0) {
        setGameState('defeat');
      } else {
        setTimeout(nextTurn, 2000);
      }
    }
  };

  // Restart battle
  const restart = () => {
    setPlayerHP(30);
    setBossHP(40);
    setGameState('active');
    setCurrentQuestion(null);
    setBattleLog([]);
    setQuestionsAsked([]);
    setFeedback('');
  };

  // Victory screen
  if (gameState === 'victory') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-5xl font-black text-green-600 mb-4">VICTORY!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            You cooked the boss to perfection!
          </p>
          <div className="space-y-4">
            <button
              onClick={restart}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-xl py-4 rounded-2xl transform hover:scale-105 transition-all"
            >
              ⚔️ Fight Again
            </button>
            <Link href="/">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xl py-4 rounded-2xl transform hover:scale-105 transition-all">
                🏠 Back Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Defeat screen
  if (gameState === 'defeat') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-8xl mb-6">💀</div>
          <h1 className="text-5xl font-black text-red-600 mb-4">DEFEATED!</h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            You got cooked by the boss!
          </p>
          <div className="space-y-4">
            <button
              onClick={restart}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-black text-xl py-4 rounded-2xl transform hover:scale-105 transition-all"
            >
              🔄 Try Again
            </button>
            <Link href="/">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xl py-4 rounded-2xl transform hover:scale-105 transition-all">
                🏠 Back Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active battle
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-bold">
            ← Retreat
          </Link>
          <h1 className="text-3xl font-black text-gray-800">⚔️ BOSS BATTLE</h1>
          <div className="w-20"></div>
        </div>

        {/* Boss Info */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-800">🐉 The Final Exam</h2>
              <p className="text-gray-600">A fearsome beast of knowledge</p>
            </div>
            <div className="text-5xl">🐉</div>
          </div>
          <HPBar current={bossHP} max={40} label="Boss" color="red" />
        </div>

        {/* Player Info */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">👨‍🍳</div>
            <div className="text-right">
              <h3 className="text-xl font-black text-gray-800">You</h3>
              <p className="text-gray-600">Master Chef</p>
            </div>
          </div>
          <HPBar current={playerHP} max={30} label="Player" color="green" />
        </div>

        {/* Question Area */}
        {currentQuestion && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-800 text-lg">
                {currentQuestion.question}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentQuestion.difficulty === 'hard' ? 'bg-red-200 text-red-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type answer to attack..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 text-lg focus:border-purple-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg py-3 rounded-xl transform hover:scale-105 transition-all"
              >
                🍕 Throw Food!
              </button>
            </form>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`text-center text-lg font-bold p-4 rounded-2xl mb-6 ${
            feedback.includes('threw') || feedback.includes('damage dealt')
              ? 'bg-green-100 text-green-800 pulse-success'
              : 'bg-red-100 text-red-800 shake'
          }`}>
            {feedback}
          </div>
        )}

        {/* Battle Log */}
        {battleLog.length > 0 && (
          <div className="bg-gray-100 rounded-2xl p-4">
            <h4 className="font-bold text-gray-700 mb-2 text-sm">📜 Battle Log</h4>
            <div className="space-y-1 text-sm text-gray-600 max-h-32 overflow-y-auto">
              {battleLog.slice(0, 5).map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
