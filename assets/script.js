// Variables called by ID
const start = document.getElementById('startBtn')
const reset = document.getElementById('resetBtn')
const questionsContainElem = document.getElementById('questionsContainer')
const questionElem = document.getElementById('question')
const answerBtnElem = document.getElementById('answerBtns')
const submitScore = document.getElementById('submitScore')

// Stores highscores locally
let scores = JSON.parse(localStorage.getItem('scores')) || []

// Question Array Index variable
let currentQuestionIndex = 0

// Timer variables
let seconds = 21
const timer = document.getElementById('time')

//Score variables
let points = 0
const score = document.getElementById('score')

// Score increase function
function addPoints(){
  points += 10
  score.append(points)
}

// Quiz Questions and Answers array
const quizQuestions = [
  {
    question: "What is 2 +2?",
    answers: [
      { text: '4' },
      { text: '22' },
      { text: '22' },
      { text: '22' }
    ],
    correct: '4'
  },
  {
    question: "What is 10 + 2?",
    answers: [
      { text: '5' },
      { text: '252' },
      { text: '22' },
      { text: '12' }
    ],
    correct: '12'
  },
  {
    question: "What is 22 +2 ?",
    answers: [
      { text: '4' },
      { text: '22' },
      { text: '24' },
      { text: '2552' }
    ],
    correct: '24'
  },
  {
    question: "What is 222 + 22?",
    answers: [
      { text: '2' },
      { text: '244' },
      { text: '22' },
      { text: '22' }
    ],
    correct: '244'
  },
]

// Starts the Quiz and cycles through the Q and A
start.addEventListener('click', startQuiz)
function startQuiz() {
  start.classList.add('hide')
  // reset.classList.remove('hide')
  questionsContainElem.classList.remove('hide')
  startTime = setInterval(incrementSeconds, 1000)
  nextQuestion()
}

// Time counter
function incrementSeconds() {
  if (seconds <= 0 || currentQuestionIndex === quizQuestions.length) {
    clearInterval(startTime)
  } else {
    seconds -= 1
    timer.innerText = "Time: " + seconds
  }
}

// Function for showing questions and answers from array
// Also handles the logic for finding correct answers
function showQuestion(questionIndex) {
  questionElem.innerHTML = quizQuestions[questionIndex].question
  quizQuestions[questionIndex].answers.forEach(answer => {
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
  if (currentQuestionIndex === quizQuestions.length){
    questionElem.innerHTML=""
    endQuiz()
  } else {
    showQuestion(currentQuestionIndex)
  }
}

// End Quiz function for all ending outcomes
function endQuiz() {
  if (seconds <= 0 || currentQuestionIndex === quizQuestions.length) {
    submitScore.classList.remove('hide')
  }

}

// Function for resetting info to default states
function resetInfo() {
  while (answerBtnElem.firstChild) {
    answerBtnElem.removeChild(answerBtnElem.firstChild)
  }
}

// Function for selecting and verifying Answers
function selectAnswer(e) {
  const userChoice = e.target.innerText
  if (userChoice === quizQuestions[currentQuestionIndex].correct) {
    score.innerHTML = "Score: "
    addPoints()
    currentQuestionIndex++
    nextQuestion()
  } else if (userChoice != quizQuestions[currentQuestionIndex].correct) {
      seconds -= 5
      currentQuestionIndex++
      nextQuestion()
  }
}

// Adds class of correct or incorrect to answers
function setAnswerStatus(element, correct) {
  clearAnswerStatus(element)
  if (correct) {
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

// Local Storage
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  const record = {
    name: document.getElementById('name').value,
    score: points
  }
  scores.push(record)
  localStorage.setItem('scores', JSON.stringify(scores))
  document.getElementById('submitScore').classList.add('hide')
  document.getElementById('displayScores').classList.remove('hide')
  scores = scores.sort((a, b) => b.score - a.score)
  scores.forEach(score => {
    let scoreElem = document.createElement('div')
    scoreElem.innerHTML = `<h6>Name: ${score.name} | Score: ${score.score}</h6><hr>`
    document.getElementById('displayScores').append(scoreElem)
  })
})