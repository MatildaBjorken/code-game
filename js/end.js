
const inputName = document.getElementById('username')
const saveScore = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const condition = document.querySelector("#condition");

const recentScore = localStorage.getItem('recentScore')
const highScores= JSON.parse(localStorage.getItem('highScores')) || []

const maxHighScore = 5

finalScore.innerText = recentScore

inputName.addEventListener('keyup', () => {
     saveScore.disabled = !inputName.value
     condition.textContent = "there u go!";
})

saveHighScore = (e) =>{
     e.preventDefault()

     const score = {
          score: recentScore,
          name: inputName.value
     }

     highScores.push(score)

     //add score, sort it and splice out the extra ones

     //sort the highscores 
     highScores.sort((a,b)=>{
          //return either less than 0 or greater than 0
          //if b score is higher than the a score, put b before a
          return b.score - a.score
     })

     highScores.splice(5)
     console.log(highScores)

     localStorage.setItem('highScores', JSON.stringify(highScores))

     window.location.assign('/')
}