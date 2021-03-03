const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))//convert to an array
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')

//starting values
let currentQuestion = {}
let acceptAnswer = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

const correctPoints = 10
const maxQuestions = 3

//start the game with
startGame = () =>{
    questionCounter = 0
    score = 0
    // take the array from questions and put them here
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>{

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        //ends
        return window.location.assign('/end.html')
    }
    //incriment by one when starting the game
    questionCounter++
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
  

    const randomQuestion = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[randomQuestion]

    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    //remove question if used
    availableQuestions.splice(randomQuestion, 1)
    acceptAnswer = true


    //progressText.innerText = `${questionCounter}/${maxQuestions}`
    console.log(questionCounter/maxQuestions)
}

choices.forEach( choice =>{
    choice.addEventListener('click', e=>{
        //if we are not ready for them to answer
        if(!acceptAnswer) return

        acceptAnswer = false
        const selecedChoice = e.target
        const selectedAnswer = selecedChoice.dataset['number']

        // default incorrect
        
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        // apply the class
        selecedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selecedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 500)

        if (classToApply === 'correct'){
            addScore(correctPoints)
        }
        
    })
})

addScore = nr => {
    score += nr
    scoreText.innerText = score
}

startGame()





