import os
from datetime import datetime

def an_take_photo():
  now = datetime.now()
  file_date_time = now.strftime("%m%d%Y-%H%M%S")
  file_name = 'an/an_' + file_date_time + '.jpeg'

  device_input = 'video0'

  input_command = 'fswebcam --device /dev/' + device_input + ' ' + file_name

  os.system(input_command)

  return file_name