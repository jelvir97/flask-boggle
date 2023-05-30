const $submitBtn = $('.subBtn')
const $guessInput = $('.guess')

$submitBtn.on('click', submitGuess)

const $gameResponse = $('.game-response')
const $body= $('body')
const $timer = $('.timer')
const $form = $('form')

let score = 0
let time = 10

async function submitGuess(e){
    e.preventDefault()
    // console.log($guessInput,$submitBtn)
    const response = await axios({
        url: 'submit',
        method: "POST",
        data: {guess : $guessInput.val()}
      });
      score = updateScore(response.data.isWord,$guessInput.val(),score)
      showResponse(response.data.isWord)
}

function showResponse(isWord){  
    $gameResponse.empty()
    $gameResponse.append(`<h3>${isWord} - - - Score: ${score} </h3>`)
}

function updateScore(isWord, guess, new_score){
    if(isWord === 'ok'){
        new_score += guess.length
    }
    return new_score
}

const timeId = setInterval(() => {
    if(time ===0){
        clearInterval(timeId)
        gameOver()
        return
    }
    time -= 1;
    updateTimer()
},1000)

function updateTimer(){
    $timer.empty()
    $timer.append(`<h3>${time}s - - - </h3>`)
}

async function gameOver(){
    $form.hide()
    $timer.empty()
    $timer.append(`<h3>Game Over!</h3>`)
    const response = await axios({
        url: 'submit',
        method: "POST",
        data: {guess : $guessInput.val()}
      });
}