from flask import Flask, request, abort, jsonify
from ANPhoto import an_take_photo
from FootPhoto import foot_take_photo
from utils.preprocessing import preprocessing
import tensorflow as tf
from functools import partial
import numpy as np
from sklearn.preprocessing import LabelBinarizer
from flask_cors import CORS
import base64
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

encoder = LabelBinarizer()
y_data_values = np.array(['AN-POSITIVE', 'AN-NEGATIVE'])
encoded = encoder.fit_transform(y_data_values)

@app.route('/predict_an', methods = ['POST'])
def predict_an():
  # Load model
  model = tf.keras.models.load_model('models/an_prediction_model.h5')

  # Extract image_file
  base64_image = request.json['image']
  preprocessed_image = preprocessing(base64_image)

  img_array = tf.expand_dims(preprocessed_image, 0)
  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  if encoded[np.argmax(score)] == [0]: classification='positive'
  if encoded[np.argmax(score)] == [1]: classification='negative'

  # Return prediction
  print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(classification, 100 * np.max(score))
  )
  
  return jsonify(result=classification)


@app.route('/predict_foot', methods = ['POST'])
def predict_foot():
  # Load model
  model = tf.keras.models.load_model('models/foot_prediction_model.h5')

# Extract image_file
  base64_image = request.json['image']
  preprocessed_image = preprocessing(base64_image)

  img_array = tf.expand_dims(preprocessed_image, 0)
  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  if encoded[np.argmax(score)] == [0]: classification='positive'
  if encoded[np.argmax(score)] == [1]: classification='negative'

  # Return prediction
  print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(classification, 100 * np.max(score))
  )
  
  return jsonify(result=classification)

if __name__ == "__main__":
  # Alternatively 172.20.10.4
  app.run(host="localhost", port=5000, debug=True)