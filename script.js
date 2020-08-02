const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const inputnameElement = document.getElementById('nameuser', 'nameuser1');
const nameElement = document.getElementById('text');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const homeButton = document.getElementById('home-btm');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');
const scoreDiv = document.getElementById('score');



let shuffledQuestions, currentQuestionIndex

let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth/questionTime;

startButton.addEventListener('click', startGame)
/* homeButton.addEventListener('click', clickhome) */ 
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  /* inputnameElement.classList.add('hide') */
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  renderCounter();
  TIMER = setInterval(renderCounter,100);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What scripture tells us not to add anything to the word of God?',
    answers: [
      { text: 'Ephesians 2:20', correct: false },
      { text: 'Revelation 22:18 - 19', correct: true },
      { text: 'Deuteronomy 4:2', correct: false },
      { text: 'Moroni 10:4', correct: false }
    ]
  },
  {
    question: 'What year was the Book of Mormon published?',
    answers: [
      { text: '1828', correct: false },
      { text: '1829', correct: true },
      { text: '1840', correct: false },
      { text: '1828', correct: false }
    ]
  },
  {
    question: 'Who are sons of Mosiah:',
    answers: [
      { text: 'Moroni, Omner, Mormon', correct: false },
      { text: 'Ammon, Omner, Aaron', correct: true },
      { text: 'Alma, Mosiah, Omni', correct: false },
      { text: 'Limhi, Benjamin, Nephi', correct: false }
    ]
  },
  {
    question: 'What is the second principle of faith?',
    answers: [
      { text: 'Faith', correct: false },
      { text: 'Repentance', correct: true },
      { text: 'Priesthood', correct: false },
      { text: 'Baptism', correct: false }
    ]
  }
]

/* function clickhome(){
onclick = "location.href='https://google.com';
}*/

function renderCounter(){
  if(count <= questionTime){
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++
  }else{
    count = 0;
  }

}