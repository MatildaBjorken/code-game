const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))//convert to an array
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')
const loader = document.getElementById('loader')
const game = document.getElementById('game')

//starting values
let currentQuestion = {}
let acceptAnswer = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = []

fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple').then(resp =>{
    return resp.json()
}).then(loadedQuestions => {
    //return loadedquestion, everytime map - format the question 
   questions = loadedQuestions.results.map(loadedQuestion =>{
        const apiQuestion = {
            question: loadedQuestion.question
        }

        const answerChoices = [...loadedQuestion.incorrect_answers]
        apiQuestion.answer = Math.floor(Math.random() * 3 ) + 1 
        //not 0 based so minus 1, dont remove any element with 0
        answerChoices.splice(apiQuestion.answer -1, 0, loadedQuestion.correct_answer)

        //itterate though the answe choices, and put them as answe 1,2,3,4 on the apiquestion 
        answerChoices.forEach((choice, index) => {
            apiQuestion['choice' + (index+1)] = choice
        })

        return apiQuestion
    })
   
    startGame()

}).catch (error => {
    console.error(error)
})

const correctPoints = 10
const maxQuestions = 10

//start the game with
startGame = () =>{
    questionCounter = 0
    score = 0
    // take the array from questions and put them here
    availableQuestions = [...questions]
    getNewQuestion()
    
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}

getNewQuestion = () =>{

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        localStorage.setItem('recentScore', score)
        //ends
        return window.location.assign('./end.html')
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






