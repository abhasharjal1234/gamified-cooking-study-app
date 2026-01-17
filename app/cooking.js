'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { questions, checkAnswer } from '@/data/questions';

export default function CookingMode() {
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState([]);

  // Load XP from localStorage
  useEffect(() => {
    const savedXP = localStorage.getItem('cookedXP');
    if (savedXP) setXp(parseInt(savedXP));
  }, []);

  // Get cooking status based on progress
  const getStatus = () => {
    if (progress < 30) return 'Raw';
    if (progress < 60) return 'Cooking...';
    if (progress < 90) return 'Almost Perfect';
    if (progress < 100) return 'Perfect!';
    return 'PERFECTLY COOKED';
  };

  // Start cooking by showing a random question
  const startCooking = () => {
    // Get a question we haven't asked yet if possible
    let availableQuestions = questions.filter(q => !questionsAsked.includes(q.id));
    
    // Reset if we've asked all questions
    if (availableQuestions.length === 0) {
      availableQuestions = questions;
      setQuestionsAsked([]);
    }

    const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(randomQ);
    setQuestionsAsked([...questionsAsked, randomQ.id]);
    setShowExplanation(true);
    setFeedback('');
    setUserAnswer('');
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) {
      setFeedback('⚠️ Please enter an answer!');
      return;
    }

    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);

    if (isCorrect) {
      // Correct answer
      const newProgress = Math.min(100, progress + 15);
      const xpGain = currentQuestion.difficulty === 'hard' ? 30 : currentQuestion.difficulty === 'medium' ? 20 : 10;
      const newXP = xp + xpGain;
      
      setProgress(newProgress);
      setXp(newXP);
      localStorage.setItem('cookedXP', newXP.toString());
      
      const messages = [
        '🔥 Perfect heat! Cooked to perfection!',
        '✨ Chef\'s kiss! That was fire!',
        '👨‍🍳 You\'re cooking with gas now!',
        '💯 That answer was PERFECTLY SEASONED!',
        '🌟 Absolute gas! Keep cooking!',
      ];
      setFeedback(messages[Math.floor(Math.random() * messages.length)] + ` +${xpGain} XP`);
      
      setTimeout(() => {
        setCurrentQuestion(null);
        setShowExplanation(false);
      }, 2000);
    } else {
      // Wrong answer
      const newProgress = Math.max(0, progress - 10);
      setProgress(newProgress);
      
      const messages = [
        '🔥 You overcooked it! That\'s burnt!',
        '💥 The dish is burning! Wrong answer!',
        '😵 Too much heat! That\'s not right!',
        '🚨 Kitchen fire! Wrong seasoning!',
        '❌ That ain\'t it chef!',
      ];
      setFeedback(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-bold">
            ← Back
          </Link>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-3xl font-black text-purple-600">{xp}</p>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            🍳 Energy Physics Recipe
          </h1>
          <p className="text-gray-600">
            <span className="font-bold">Ingredients:</span> Thermal Energy Transfer, Kinetic & Potential Energy
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar progress={progress} status={getStatus()} />
        </div>

        {/* Main Content */}
        {!currentQuestion ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🍲</div>
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              Ready to cook some knowledge?
            </p>
            <button
              onClick={startCooking}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xl py-4 px-12 rounded-2xl transform hover:scale-105 transition-all shadow-lg"
            >
              🔥 Cook Ingredient
            </button>
          </div>
        ) : (
          <div>
            {/* Explanation */}
            {showExplanation && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-blue-900 mb-2 text-lg">📚 Quick Lesson:</h3>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Question */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 text-xl">
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
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 text-lg focus:border-purple-500 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-3 rounded-xl transform hover:scale-105 transition-all"
                >
                  Submit Answer
                </button>
              </form>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`text-center text-xl font-bold p-4 rounded-2xl ${
                feedback.includes('Perfect') || feedback.includes('fire') || feedback.includes('gas') || feedback.includes('SEASONED')
                  ? 'bg-green-100 text-green-800 pulse-success'
                  : 'bg-red-100 text-red-800 shake'
              }`}>
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
