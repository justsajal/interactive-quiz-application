const questions = [
  { question: "Which language is commonly used for data analysis and automation?", options: ["HTML", "Python", "CSS", "SQL only"], answer: 1, explanation: "Python is widely used for automation, scripting, and data analysis." },
  { question: "What does HTML mainly define?", options: ["The structure of a web page", "The database password", "The computer's hardware", "The internet connection"], answer: 0, explanation: "HTML provides the structure and content of a web page." },
  { question: "Which data structure follows LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1, explanation: "A stack follows Last In, First Out (LIFO)." },
  { question: "What is the purpose of Git?", options: ["Edit images only", "Manage version history", "Replace JavaScript", "Increase screen brightness"], answer: 1, explanation: "Git tracks changes and helps manage different versions of code." },
  { question: "Which CSS property changes text colour?", options: ["font-style", "background-image", "color", "text-align"], answer: 2, explanation: "The CSS color property sets the foreground text colour." }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreLabel = document.getElementById("scoreLabel");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

function renderQuestion() {
  answered = false;
  const item = questions[currentIndex];
  questionNumber.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
  questionText.textContent = item.question;
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentIndex === questions.length - 1 ? "See results →" : "Next question →";
  answers.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener("click", () => selectAnswer(index));
    answers.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = questions[currentIndex];
  const buttons = [...answers.querySelectorAll("button")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("wrong");
  });

  if (selectedIndex === item.answer) {
    score++;
    feedback.textContent = `Correct! ${item.explanation}`;
    feedback.style.color = "#198754";
  } else {
    feedback.textContent = `Not quite. ${item.explanation}`;
    feedback.style.color = "#b13d48";
  }
  scoreLabel.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  progressBar.style.width = "100%";
  questionNumber.textContent = "Quiz complete";
  scoreLabel.textContent = `Score: ${score}/${questions.length}`;
  questionText.textContent = score === questions.length ? "Excellent work!" : "Nice effort — keep practising!";
  answers.innerHTML = `<p>You answered <strong>${score} out of ${questions.length}</strong> questions correctly (${Math.round(score / questions.length * 100)}%).</p>`;
  feedback.textContent = "Ready to try again?";
  nextButton.disabled = false;
  nextButton.textContent = "Restart quiz ↻";
  nextButton.onclick = () => {
    currentIndex = 0;
    score = 0;
    nextButton.onclick = null;
    renderQuestion();
  };
}
renderQuestion();
