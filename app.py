from flask import Flask, request, send_from_directory, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

DATABASE = 'database.sqlite'

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/save_order', methods=['POST'])
def save_order():
    data = request.get_json()
    with sqlite3.connect(DATABASE) as conn:
        conn.execute(
            "INSERT INTO orders (email, poster, comment) VALUES (?, ?, ?)",
            (data['email'], data['poster'], data.get('comment', ''))
        )
        conn.commit()
    return '', 200

if __name__ == '__main__':
    app.run(debug=True)
