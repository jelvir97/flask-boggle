
class BoggleGame{
    constructor(){
        this.time = 60
        this.score = 0
        this.usedWordList = []
        this.startTimer()
    }

    async submitGuess(e){
        e.preventDefault()
        if(boggle.usedWordList.includes($guessInput.val())){
            $guessInput.val('')
            return
        } else{
            boggle.usedWordList.push($guessInput.val())
        }
        const response = await axios({
            url: 'submit',
            method: "POST",
            data: {guess : $guessInput.val()}
          });
        console.log(response.data.isWord,boggle.score)
        boggle.score = updateScore(response.data.isWord,$guessInput.val(),boggle.score)
        showResponse(response.data.isWord, boggle.score)
        $guessInput.val('')
    }

    

    async gameOver(){
        $form.hide()
        $timer.empty()
        $timer.append(`<h3>Game Over!</h3>`)
        const response = await axios({
            url: 'game-over',
            method: "POST",
            data: {score: this.score}
          });
        
        console.log(response)
        const gamesPlayed = response.data.gamesPlayed
        const newHighScore = response.data.highScore
        updateHighScore(newHighScore,gamesPlayed)
        
    }

    startTimer(){
        const timeId = setInterval(() => {
            if(this.time ===0){
                clearInterval(timeId)
                this.gameOver()
                return
            }
            this.time -= 1;
            updateTimer(this.time)
        },1000)
    }
}