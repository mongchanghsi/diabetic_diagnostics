import tensorflow as tf

IMAGE_SIZE = 128

def preprocessing(filename, width = IMAGE_SIZE, height = IMAGE_SIZE):
    #Retrieve image
    image_string = tf.io.read_file(filename)
    img = tf.image.decode_jpeg(image_string, channels=3) #channels set to 1 as it is greyscale
    #Normalise the pixel values from 0-255 to 0-1
    img = tf.image.convert_image_dtype(img, tf.float32)
    #Resize the image
    img = tf.image.resize(img, [height, width])
    return img