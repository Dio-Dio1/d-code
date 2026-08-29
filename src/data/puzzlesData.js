export const puzzles = [
  {
    id: 1,
    title: "Predict the Output",
    difficulty: "Medium",
    language: "JavaScript",
    code: `const nums = [1, 2, 3];

const result = nums
  .map(n => n * 2)
  .filter(n => n > 3);

console.log(result);`,
    question: "What will be printed?",
    answers: ["[2, 4, 6]", "[4, 6]", "[2, 4]", "[6]"],
    correctAnswer: 1,
    solvedBy: 1243,
    timeLeft: "14h 22m",
    xp: 50,
    attempted: false,
    solved: false,
  },
  {
    id: 2,
    title: "Closure Trap",
    difficulty: "Hard",
    language: "JavaScript",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    question: "What will be logged after 100ms?",
    answers: ["0 1 2", "3 3 3", "2 1 0", "undefined undefined undefined"],
    correctAnswer: 1,
    solvedBy: 892,
    timeLeft: "14h 22m",
    xp: 75,
    attempted: false,
    solved: false,
  },
  {
    id: 3,
    title: "Type Coercion",
    difficulty: "Easy",
    language: "JavaScript",
    code: `console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);`,
    question: "What are the four outputs?",
    answers: [
      "122, 32, NaN2, NaN",
      "122, 122, NaN2, NaN",
      "3, 32, NaN, NaN",
      "122, 32, 2, 2",
    ],
    correctAnswer: 0,
    solvedBy: 2156,
    timeLeft: "14h 22m",
    xp: 40,
    attempted: false,
    solved: false,
  },
  {
    id: 4,
    title: "Promise Resolution",
    difficulty: "Hard",
    language: "JavaScript",
    code: `const p = new Promise((resolve) => {
  console.log("A");
  resolve("B");
  console.log("C");
});

p.then(val => console.log(val));
console.log("D");`,
    question: "What is the order of outputs?",
    answers: ["A, C, D, B", "A, B, C, D", "A, D, C, B", "A, C, B, D"],
    correctAnswer: 0,
    solvedBy: 678,
    timeLeft: "14h 22m",
    xp: 75,
    attempted: false,
    solved: false,
  },
  {
    id: 5,
    title: "Array Methods Chain",
    difficulty: "Medium",
    language: "JavaScript",
    code: `const arr = [1, 2, 3, 4, 5];

const result = arr
  .reduce((acc, n) => n % 2 === 0 ? [...acc, n * 2] : acc, []);

console.log(result);`,
    question: "What will be printed?",
    answers: ["[4, 8]", "[2, 4, 6, 8, 10]", "[1, 3, 5]", "[2, 4]"],
    correctAnswer: 0,
    solvedBy: 1567,
    timeLeft: "14h 22m",
    xp: 50,
    attempted: false,
    solved: false,
  },
  {
    id: 6,
    title: "Spread Operator",
    difficulty: "Easy",
    language: "JavaScript",
    code: `const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = { ...obj1, ...obj2 };

console.log(result);`,
    question: "What will be printed?",
    answers: [
      "{ a: 1, b: 2, c: 4 }",
      "{ a: 1, b: 3, c: 4 }",
      "{ a: 1, b: 2, b: 3, c: 4 }",
      "{ b: 3, c: 4, a: 1 }",
    ],
    correctAnswer: 1,
    solvedBy: 3201,
    timeLeft: "14h 22m",
    xp: 30,
    attempted: false,
    solved: false,
  },
]

export const puzzleStats = {
  totalSolved: 24,
  totalAttempted: 48,
  currentStreak: 3,
  bestStreak: 8,
  totalXP: 1850,
  rank: 45,
}
