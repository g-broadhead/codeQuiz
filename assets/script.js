// Establishing QnA Array
const qnaArr = [
  {
    question: "What does HTML stand for?",
    answer1: "Correct",
    answer2: "Wrong",
    answer3: "Wrong",
    answer4: "Wrong"
  },
  {
    question: "What does HTML stand for? For reals",
    answer1: "Correct2",
    answer2: "Wrong2",
    answer3: "Wrong2",
    answer4: "Wrong2"
  },
]

let nextQuestion = 0;






// New Quiz functions
const newQuiz =() => {
  document.getElementById('startQuiz').style.display = 'none';
  let quizQuestions = document.createElement('div')
  quizQuestions.innerHTML =`
      <ul class="list-group">
      <li class="list-group-item">${qnaArr[nextQuestion].question}</li>
      <li class="list-group-item">${qnaArr[nextQuestion].answer1}</li>
      <li class="list-group-item">${qnaArr[nextQuestion].answer2}</li>
      <li class="list-group-item">${qnaArr[nextQuestion].answer3}</li>
      <li class="list-group-item">${qnaArr[nextQuestion].answer4}</li>
      </ul> 
      `
  document.getElementById('questions').append(quizQuestions)
}

// Start Quiz
document.getElementById('startQuiz').addEventListener('click', newQuiz);


// Cycles through qnaArr to next question
document.addEventListener('click',event =>{
  if (event.target.classList.contains('list-group-item')){
    console.log("list-group-item")
    nextQuestion ++ 
    questions.innerHTML= ""
    newQuiz()
  }
  
})








