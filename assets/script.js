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
let seconds = 60
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
    question: "Why do JavaScript and Java have similar names?",
    answers: [
      { text: 'JavaScript is a stripped-down version of Java' },
      { text: `JavaScript's syntax is loosely based on Java's` },
      { text: 'They both originated on the island of Java' },
      { text: 'None of the above' }
    ],
    correct: `JavaScript's syntax is loosely based on Java's`
  },
  {
    question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    answers: [
      {
        text: `The User's machine running a Web browser` },
      { text: 'The Web server' },
      { text: `A central machine deep within Netscape's corporate offices` },
      { text: 'None of the Above' }
    ],
    correct: `The User's machine running a Web browser`
  },
  {
    question: "______ JavaScript is also called client-side JavaScript.",
    answers: [
      { text: 'Microsoft' },
      { text: 'Navigator' },
      { text: 'LiveWire' },
      { text: 'Native' }
    ],
    correct: 'Navigator'
  },
  {
    question: "Which of the following can't be done with client-side JavaScript?",
    answers: [
      { text: 'Validating a form' },
      { text: `Sending a form's contents by email` },
      { text: `Storing the form's contents to a database file on the server` },
      { text: 'None of the above' }
    ],
    correct: `Storing the form's contents to a database file on the server`
  },
]

// Starts the Quiz and cycles through the Q and A
start.addEventListener('click', startQuiz)
function startQuiz() {
  start.classList.add('hide')
  questionsContainElem.classList.remove('hide')
  startTime = setInterval(incrementSeconds, 1000)
  nextQuestion()
}

// Time counter
function incrementSeconds() {
  if (seconds <= 0 || currentQuestionIndex === quizQuestions.length) {
    clearInterval(startTime)
    endQuiz()
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
    questionElem.classList.add('hide')
    answerBtnElem.classList.add('hide')
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
      seconds -= 20
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