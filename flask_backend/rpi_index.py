from flask import Flask, request, abort, jsonify
from ANPhoto import an_take_photo
from FootPhoto import foot_take_photo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/take_an_photo')
def an_photo():
  file_name = an_take_photo()
  return jsonify(file_name)

@app.route('/take_foot_photo')
def foot_photo():
  file_name = foot_take_photo()
  return jsonify(file_name)

if __name__ == "__main__":
  app.run(host="172.20.10.10", port=5001, debug=True)