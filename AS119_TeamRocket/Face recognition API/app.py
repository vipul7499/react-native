#!/usr/bin/env python
# coding: utf-8

import cv2
import os
import numpy as np
from wide_resnet import WideResNet
from tensorflow.keras.utils import get_file
from flask import Flask, request, jsonify,render_template
import base64
from PIL import Image
import io
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def load_model(depth=16, width=8, face_size=64):
    WRN_WEIGHTS_PATH = "https://github.com/Tony607/Keras_age_gender/releases/download/V1.0/weights.18-4.06.hdf5"
    model = WideResNet(face_size, depth=depth, k=width)()
    model_dir = os.getcwd().replace("//", "\\")
    fpath = get_file('weights.18-4.06.hdf5',
                     WRN_WEIGHTS_PATH,
                     cache_subdir=model_dir)
    model.load_weights(fpath)
    print(type(model))
    return model
    
def crop_face(imgarray, section, margin=40, size=64):
        """
        :param imgarray: full image
        :param section: face detected area (x, y, w, h)
        :param margin: add some margin to the face detected area to include a full head
        :param size: the result image resolution with be (size x size)
        :return: resized image in numpy array with shape (size x size x 3)
        """
        img_h, img_w, _ = imgarray.shape
        if section is None:
            section = [0, 0, img_w, img_h]
        (x, y, w, h) = section
        margin = int(min(w,h) * margin / 100)
        x_a = x - margin
        y_a = y - margin
        x_b = x + w + margin
        y_b = y + h + margin
        if x_a < 0:
            x_b = min(x_b - x_a, img_w-1)
            x_a = 0
        if y_a < 0:
            y_b = min(y_b - y_a, img_h-1)
            y_a = 0
        if x_b > img_w:
            x_a = max(x_a - (x_b - img_w), 0)
            x_b = img_w
        if y_b > img_h:
            y_a = max(y_a - (y_b - img_h), 0)
            y_b = img_h
        cropped = imgarray[y_a: y_b, x_a: x_b]
        resized_img = cv2.resize(cropped, (size, size), interpolation=cv2.INTER_AREA)
        resized_img = np.array(resized_img)
        return resized_img, (x_a, y_a, x_b - x_a, y_b - y_a)
@app.route('/detect_face', methods=['GET','POST']) 
@cross_origin()
def detect_face():
    model=load_model(16,8,64)
    depth=16
    width=8
    face_size=64
    CASE_PATH = "haarcascade_frontalface_alt.xml"
    face_cascade = cv2.CascadeClassifier(CASE_PATH)
    text = request.get_json()
    at=text['img']
    at=at[23:]
    ima = base64.b64decode(str(at))
    frame = Image.open(io.BytesIO(ima))
    frame=np.array(frame)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=10,
        minSize=(face_size,face_size)
    )
    # placeholder for cropped faces
    face_imgs = np.empty((len(faces), face_size, face_size, 3))
    print(face_imgs.shape)
    gen=0
    for i, face in enumerate(faces):
        face_img, cropped = crop_face(frame, face, margin=40, size=face_size)
        (x, y, w, h) = cropped
#         print(face_img)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 200, 0), 2)
        face_imgs[i,:,:,:] = face_img
        print(face_imgs.shape)
    if len(face_imgs) > 0:
        results = model.predict(face_imgs)
        predicted_genders = results[0]
        ages = np.arange(0, 101).reshape(101, 1)
        predicted_ages = results[1].dot(ages).flatten()
        if(predicted_genders[0][0] > 0.4):
            gen=1
    ans={"gender":str(gen)}
    return ans

if __name__ == "__main__":
    app.debug=True
#     app.run()


# In[ ]:




