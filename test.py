from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def setUp(self):
        app.config['TESTING'] = True


    def test_home(self):
        with app.test_client() as client:
            resp = client.get("/")
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))
            self.assertEqual(resp.status_code, 200)

    def test_submit_valid(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['board']= [
                    ['D','O','G','G'],
                    ['D','O','G','G'],
                    ['D','O','G','G'],
                    ['D','O','G','G'],
                ]
            resp = client.post("/submit",json = {'guess': 'dog'})
            print(resp)
            self.assertEqual(resp.json['isWord'], 'ok')
            self.assertEqual(resp.status_code, 200)

    def test_game_over(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['high_score'] = 2
                sess['games_played'] = 5
            resp = client.post("/game-over", json = {'score': 6})
            html = resp.get_data(as_text=True)
            self.assertEqual(session['high_score'], 6)
            self.assertEqual(session['games_played'], 6)
            self.assertEqual(resp.status_code, 200)
