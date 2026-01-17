
export const questions = [
  {
    id: 1,
    question: "What are the three methods of thermal energy transfer?",
    correctAnswer: "conduction convection radiation",
    difficulty: "easy",
    explanation: "Thermal energy transfers through conduction (direct contact), convection (fluid movement), and radiation (electromagnetic waves)."
  },
  {
    id: 2,
    question: "Which method of heat transfer requires direct contact between materials?",
    correctAnswer: "conduction",
    difficulty: "easy",
    explanation: "Conduction is the transfer of thermal energy through direct contact. Heat flows from hot to cold when materials touch."
  },
  {
    id: 3,
    question: "What type of energy does a roller coaster have at the top of a hill?",
    correctAnswer: "potential",
    difficulty: "easy",
    explanation: "At the highest point, a roller coaster has maximum gravitational potential energy due to its height."
  },
  {
    id: 4,
    question: "When you boil water, which heat transfer method moves hot water upward?",
    correctAnswer: "convection",
    difficulty: "medium",
    explanation: "Convection occurs when heated fluid (water) becomes less dense and rises, while cooler fluid sinks, creating a cycle."
  },
  {
    id: 5,
    question: "What happens to potential energy as a ball falls toward the ground?",
    correctAnswer: "decreases",
    difficulty: "medium",
    explanation: "As the ball falls, gravitational potential energy converts to kinetic energy, so potential energy decreases."
  },
  {
    id: 6,
    question: "How does the Sun's energy reach Earth if space is a vacuum?",
    correctAnswer: "radiation",
    difficulty: "medium",
    explanation: "Radiation is the only heat transfer method that doesn't require matter. The Sun's energy travels through space as electromagnetic waves."
  },
  {
    id: 7,
    question: "A 2kg ball at rest has how many joules of kinetic energy?",
    correctAnswer: "0",
    difficulty: "easy",
    explanation: "Kinetic energy requires motion. An object at rest has zero kinetic energy regardless of its mass."
  },
  {
    id: 8,
    question: "What type of material conducts thermal energy poorly?",
    correctAnswer: "insulator",
    difficulty: "medium",
    explanation: "Insulators resist the flow of thermal energy. Examples include wood, plastic, and air."
  },
  {
    id: 9,
    question: "When a stretched rubber band is released, what energy transformation occurs?",
    correctAnswer: "potential to kinetic",
    difficulty: "hard",
    explanation: "The elastic potential energy stored in the stretched rubber band converts to kinetic energy when released."
  },
  {
    id: 10,
    question: "In a thermos, which heat transfer method is blocked by the vacuum layer?",
    correctAnswer: "conduction and convection",
    difficulty: "hard",
    explanation: "A vacuum prevents conduction and convection because both require matter. Only radiation can occur through a vacuum."
  }
];


export function getRandomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}


export function checkAnswer(userAnswer, correctAnswer) {
  const normalized = userAnswer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();
  
 
  if (normalized === correct) return true;
  
 
  const correctWords = correct.split(' ');
  return correctWords.every(word => normalized.includes(word));
}
