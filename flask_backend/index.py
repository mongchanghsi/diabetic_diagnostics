from flask import Flask, request, abort;
from ANPhoto import an_take_photo;
from FootPhoto import foot_take_photo;

app = Flask(__name__)

@app.route('/an_photo')
def an_photo():
  result = an_take_photo()
  print(result)
  return 'Success'

@app.route('/foot_photo')
def foot_photo():
  result = foot_take_photo()
  print(result)
  return 'Success'

