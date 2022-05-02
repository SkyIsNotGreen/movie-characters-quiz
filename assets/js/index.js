//element declarations 
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const quitButton = document.getElementById ('quit-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const highScores = document.getElementById('high_scores_box');
const timerSpan = document.getElementById('timer-span');
const scoreSpan = document.getElementById('score-span');
const scoreForm = document.getElementById("score-submit-form");
const highScoresList = document.getElementById("highScoresList");

//timer and question shuffler functionality
let timer = 31;
let shuffledQuestions, currentQuestionIndex;
let userScore = 0;

//start game
const StartButtonClick = () => {
    //hide start btn on click
  startButton.classList.add('hide')
  //then shuffle question order
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  //then reveal questions box
  questionContainerElement.classList.remove('hide')
  //and get question
  setNextQuestion()

//start timer
  const updateTimerValue = () => {

    // increment timer by -1
    timer -= 1;

    // set text to new timer value
    timerSpan.textContent = timer;

    if (timer === 0) {
        //if timer is 0 stop timer
      clearInterval(timerId);
      // and display high score screen
      quizEnd ()
    }
  };

  const timerId = setInterval(updateTimerValue, 1000);
};



const setNextQuestion = () => {
    // clear page for next question
    resetState()
    // and get the next question
  showQuestion(shuffledQuestions[currentQuestionIndex])
};


const showQuestion = (question) => {
    //show question 
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        //for each answer, make an answer btn and append
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      // if answer is correct, show as correct
      if (answer.correct) {
        button.dataset.correct = answer.correct

      }

      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
};

const resetState = () => {
    //reset page for next Q
    clearStatusClass(document.body)
    //hide next btn
    nextButton.classList.add('hide')
    // if there is a btn, remove btn 
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
};

const selectAnswer = (e) => {
    //is the answer correct? Check dataset to see
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  //if there are more questions, reveal next btn
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
    // else display high scores and restart btn
  } else {
    quitButton.classList.remove('hide');
    quizEnd ()
  }
};

const setStatusClass = (element, correct) => {
    //clear any previous statuses
    clearStatusClass(element)
    //if answer is correct/wrong, add correct/wrong classes
  if (correct) {
    element.classList.add('correct')
    userScore += 100;
    scoreSpan.textContent = userScore
  } else {
    element.classList.add('wrong')
  }
};

const clearStatusClass = (element) => {
    //clear any previous statuses
    element.classList.remove('correct')
    element.classList.remove('wrong')
};

const quizEnd = () => {
    highScores.classList.remove('hide');
}

const readFromLocalStorage = (key, defaultValue) => {
    // get from LS using key name
    const dataFromLS = localStorage.getItem(key);
  
    // parse data from LS
    const parsedData = JSON.parse(dataFromLS);
  
    if (parsedData) {
      return parsedData;
    } else {
      return defaultValue;
    }
  };

const writeToLocalStorage = (key, value) => {
    // convert value to string
    const stringifiedValue = JSON.stringify(value);
  
    // set stringified value to LS for key name
    localStorage.setItem(key, stringifiedValue);
  };
  
  const handleFormSubmission = (event) => {
    event.preventDefault();
  
    // get name
    const name = document.getElementById('name-input').value;
  
    // get score
    const score = document.getElementById('score-span').value;
  
    // create an object with name and score
    const highScore = {
      name: name,
      score: score,
    };
  
    const highScores = readFromLocalStorage('highScores', []);
  
    highScores.push(highScore);
  
    writeToLocalStorage('highScores', highScores);
  };

  const handleOnLoad = () => {
    // read scores from LS
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    highScoresList.innerHTML = highScores
      .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
      })
      .join("");
};


const questions = [
    {
    question: '\nWho said this? \n"YOU SHALL NOT PASS!!"',
    answers: [
      { text: 'Gandalf', correct: true },
      { text: 'Dumbledore', correct: false },
      { text: 'Obi-wan Kenobi', correct: false },
      { text: 'Merlin', correct: false }
    ]
  },
  {
    question: '\nYou talkin to me??',
    answers: [
      { text: 'No!!', correct: true },
      { text: 'Yes?', correct: true },
      { text: 'Robert De Niro', correct: true },
      { text: 'He actually improvised that line', correct: true }
    ]
  },
  {
    question: '\nWhich hand did Luke lose in The Last Jedi?',
    answers: [
      { text: 'Left', correct: false },
      { text: 'Right', correct: true },
      { text: 'Kinda morbid', correct: true },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: '\nWho is the coolest Joker?',
    answers: [
      { text: 'Jared Leto', correct: false },
      { text: 'Heath Ledger', correct: true },
      { text: 'Jack Nicholson', correct: false },
      { text: 'Joaquin Phoenix', correct: true }
    ]
  }
];

//start, next, quit and submit button listeners and functionality
startButton.addEventListener('click', StartButtonClick);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  });

quitButton.addEventListener('click', () => {
    window.location.reload(); //reload the current window
});

scoreForm.addEventListener('submit', handleFormSubmission);
