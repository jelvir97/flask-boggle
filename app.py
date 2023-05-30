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
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('game-board.html', board=board)

@app.route('/submit',methods=['POST'])
def submit():
    
    req = request.get_json()
    
    isWord = boggle_game.check_valid_word(session['board'], req['guess'])
    # import pdb
    # pdb.set_trace()
    return jsonify({'isWord': isWord})