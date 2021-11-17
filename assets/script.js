// Variables called by ID
const start = document.getElementById('startBtn')
const reset = document.getElementById('resetBtn')
const questionsContainElem = document.getElementById('questionsContainer')
const questionElem = document.getElementById('question')
const answerBtnElem = document.getElementById('answerBtns')

// Variables for randomized questions and index for it
let quizRandomized, currentQuestionIndex

// Starts the Quiz and cycles through the Q and A
start.addEventListener('click', startQuiz)
function startQuiz() {
  start.classList.add('hide')
  quizRandomized = quizQuestions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  reset.classList.remove('hide')
  questionsContainElem.classList.remove('hide')
  nextQuestion()
}

// Function for showing questions and answers from array
//Also handles the logic for finding correct answers
function showQuestion(question) {
  questionElem.innerHTML = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtnElem.appendChild(button)
  })
}

// Function for getting the next question
function nextQuestion() {
  resetInfo('')
  showQuestion(quizRandomized[currentQuestionIndex])

}

// Function for resetting info to default states
function resetInfo() {
  while (answerBtnElem.firstChild) {
    answerBtnElem.removeChild(answerBtnElem.firstChild)
  }
}

// Function for selecting and verifying Answers
function selectAnswer(e) {
  const userChoice = e.target
  const correct = userChoice.dataset.correct 
  setAnswerStatus(document.body, correct)
  Array.from(answerBtnElem.children).forEach(button => {
    setAnswerStatus(button, button.dataset.correct)
  })
  if (quizRandomized.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
  }
}

// Adds class of correct or incorrect to answers
function setAnswerStatus(element, correct) {
  clearAnswerStatus(element)
  if (correct){
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

// Function for clearing answer status
function clearAnswerStatus(element) {
element.classList.remove('correct')
element.classList.remove('incorrect')
}


// Quiz Questions and Answers array
const quizQuestions = [
  {
    question: "What is 2 +2?",
    answers: [
      { text: '4', correct: true },
      { text: '22', incorrect: false },
      { text: '22', incorrect: false },
      { text: '22', incorrect: false }
    ]
  }, 
  {
    question: "What is 5 + 2?",
    answers: [
      { text: '7', correct: true },
      { text: '22', incorrect: false },
      { text: '22', incorrect: false },
      { text: '22', incorrect: false }
    ]
  },
  {
    question: "What is 5 + 22?",
    answers: [
      { text: '7', correct: true },
      { text: '22', incorrect: false },
      { text: '255', incorrect: false },
      { text: '22', incorrect: false }
    ]
  },
  {
    question: "What is 55 + 22?",
    answers: [
      { text: '7', correct: true },
      { text: '252', incorrect: false },
      { text: '225', incorrect: false },
      { text: '2552', incorrect: false }
    ]
  }
]
