'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4 float">
            🔥 COOKED 🔥
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-bold">
            Get cooked by knowledge before the test cooks YOU
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🍳 How It Works:</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-2xl mr-3">👨‍🍳</span>
              <span className="font-semibold">Cook ingredients by answering questions correctly. Master the recipe to level up!</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">⚔️</span>
              <span className="font-semibold">Fight bosses in turn-based combat. Throw cooked food to deal damage!</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📈</span>
              <span className="font-semibold">Earn XP, track your cooking status, and prove you're the ultimate chef!</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Link href="/cooking">
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-2xl py-5 rounded-2xl transform hover:scale-105 transition-all shadow-lg">
              🔥 Start Cooking
            </button>
          </Link>
          
          <Link href="/boss">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-2xl py-5 rounded-2xl transform hover:scale-105 transition-all shadow-lg">
              ⚔️ Boss Battle
            </button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Study thermal energy & kinetic energy through cooking metaphors
        </p>
      </div>
    </div>
  );
}
