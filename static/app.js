$submitBtn = $('.subBtn')
$guessInput = $('.guess')

$submitBtn.on('click', submitGuess)
$gameResponse = $('.game-response')
$body= $('body')

score = 0

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