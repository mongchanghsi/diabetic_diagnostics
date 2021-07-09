import tensorflow as tf
import numpy as np

IMAGE_SIZE = 128

def adjustBase64Image(image):
    image = image.replace('+', '-')
    image = image.replace('/', '_')
    return image

def preprocessing(base64_image, width = IMAGE_SIZE, height = IMAGE_SIZE):
    #Decode base64 image
    img = adjustBase64Image(base64_image)
    img = tf.io.decode_base64(img)
    img = tf.io.decode_jpeg(img, channels=3)

    #Normalise the pixel values from 0-255 to 0-1
    img = tf.image.convert_image_dtype(img, tf.float32)

    #Resize the image
    img = tf.image.resize(img, [height, width])
    return img