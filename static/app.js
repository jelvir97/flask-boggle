const $submitBtn = $('.subBtn')
const $guessInput = $('.guess')



const $gameResponse = $('.game-response')
const $body= $('body')
const $timer = $('.timer')
const $form = $('form')
const $highScore = $('.high-score')

const boggle = new BoggleGame();

$submitBtn.on('click', boggle.submitGuess)


function showResponse(isWord,score){  
    $gameResponse.empty()
    $gameResponse.append(`<h3>${isWord} - - - Score: ${score} </h3>`)
}

function updateScore(isWord, guess, new_score){
    if(isWord === 'ok'){
        new_score += guess.length
    }
    return new_score
}



function updateHighScore(newHighScore, gamesPlayed){
    $highScore.empty()
    $highScore.text(`High Score: ${newHighScore} - - - Games Played: ${gamesPlayed}`)
}



function updateTimer(time){
    $timer.empty()
    $timer.append(`<h3>${time}s - - - </h3>`)
}

