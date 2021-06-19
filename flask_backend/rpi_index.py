from flask import Flask, request, abort, jsonify
from ANPhoto import an_take_photo
from FootPhoto import foot_take_photo
from flask_cors import CORS
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/take_an_photo')
def an_photo():
  file_name = an_take_photo()
  img = Image.open(file_name)
  im_file = BytesIO()
  img.save(im_file, format="JPEG")
  im_bytes = im_file.getvalue()
  im_b64 = base64.b64encode(im_bytes)
  return jsonify(file_name=file_name, base64_image=im_b64)

@app.route('/take_foot_photo')
def foot_photo():
  file_name = foot_take_photo()
  img = Image.open(file_name)
  im_file = BytesIO()
  img.save(im_file, format="JPEG")
  im_bytes = im_file.getvalue()
  im_b64 = base64.b64encode(im_bytes)
  return jsonify(file_name=file_name, base64_image=im_b64)

if __name__ == "__main__":
  app.run(host="172.20.10.10", port=5001, debug=True)