// Variables called by ID
const start = document.getElementById('startBtn')
const reset = document.getElementById('resetBtn')
const questionsContainElem = document.getElementById('questionsContainer')
const questionElem = document.getElementById('question')
const answerBtnElem = document.getElementById('answerBtns')

let currentQuestionIndex = 0

let seconds = 21
let timer = document.getElementById('time')

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
  reset.classList.remove('hide')
  questionsContainElem.classList.remove('hide')
  startTime = setInterval(incrementSeconds, 1000)
  nextQuestion()
}

// Timer count
function incrementSeconds() {
  if (seconds > 0) {
    seconds -= 1
    timer.innerText = "Time: " + seconds
  } else {
    clearInterval(startTime)
    endQuiz()
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
    // Replace consolelog with end function
    endQuiz()
  } else {
    showQuestion(currentQuestionIndex)
  }
}

function endQuiz() {
  if (seconds <= 0) {
    console.log("Game Over")
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
  console.log(userChoice)
  if (userChoice === quizQuestions[currentQuestionIndex].correct) {
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







