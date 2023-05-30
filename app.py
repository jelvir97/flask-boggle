from boggle import Boggle
from flask import Flask, render_template,session,request,jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY']  = "dogs"
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    """
    Renders board, guess submit form, and highscore/games played
    """
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('game-board.html', board=board, high_score = session.get('high_score',0), games_played=session.get('games_played',0))

@app.route('/submit',methods=['POST'])
def submit():
    """
    Handles guess:
        checks guess with check_valid_word()
        returns json with response whether guess is accepted.
    """
    req = request.get_json()
    
    isWord = boggle_game.check_valid_word(session['board'], req['guess'])
    # import pdb
    # pdb.set_trace()
    return jsonify({'isWord': isWord})

@app.route('/game-over',methods=['POST'])
def game_over():
    """
    -Triggered when timer reaches 0
    -Checks if score is new highscore, 
    -increases games played count in session
    -returns json with new highscore and play count
    """
    req = request.get_json()
    if req['score'] > session['high_score']:
        session['high_score'] = req['score']
    session['games_played'] = session['games_played'] + 1

    return jsonify({'highScore': session['high_score'], 'gamesPlayed': session['games_played']})