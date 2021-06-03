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

@app.route('/predict_an', methods = ['POST'])
def predict_an():
  # Load model
  model = tf.keras.models.load_model('models/an_prediction_model.h5')

  # Extract image_file
  file_name = request.json['file_name']
  image_file = tf.data.Dataset.list_files(file_name)

  # Run preprocessing on the image_file
  pf = partial(preprocessing)
  image_ds = image_file.map(pf)

  # Do prediction
  for image in image_ds.take(1):
      img_array = tf.expand_dims(image, 0)
  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  if encoded[np.argmax(score)] == [0]: classification='positive'
  if encoded[np.argmax(score)] == [1]: classification='negative'

  # Return prediction
  print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(classification, 100 * np.max(score))
  )
  return classification

@app.route('/predict_foot', methods = ['POST'])
def predict_foot():
  # Load model
  model = tf.keras.models.load_model('models/foot_prediction_model.h5')

  # Extract image_file
  file_name = request.json['file_name']
  image_file = tf.data.Dataset.list_files(file_name)

  # Run preprocessing on the image_file
  pf = partial(preprocessing)
  image_ds = image_file.map(pf)

  # Do prediction
  for image in image_ds.take(1):
      img_array = tf.expand_dims(image, 0)
  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  if encoded[np.argmax(score)] == [0]: classification='positive'
  if encoded[np.argmax(score)] == [1]: classification='negative'

  # Return prediction
  print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(classification, 100 * np.max(score))
  )
  return classification

if __name__ == "__main__":
  app.run(debug=True)