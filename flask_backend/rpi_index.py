from flask import Flask, request, abort
from ANPhoto import an_take_photo
from FootPhoto import foot_take_photo
from utils.preprocessing import preprocessing
import tensorflow as tf
from functools import partial
import numpy as np
from sklearn.preprocessing import LabelBinarizer

app = Flask(__name__)

encoder = LabelBinarizer()
y_data_values = np.array(['AN-POSITIVE', 'AN-NEGATIVE'])
encoded = encoder.fit_transform(y_data_values)

@app.route('/take_an_photo')
def an_photo():
  file_name = an_take_photo()
  return file_name

@app.route('/take_foot_photo')
def foot_photo():
  file_name = foot_take_photo()
  return file_name

if __name__ == "__main__":
  app.run(host="localhost", port=5001, debug=True)