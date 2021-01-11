import threading
import binascii
from time import sleep
from functions.utils import base64_to_pil_image, pil_image_to_base64
import cv2
import numpy as np
import tensorflow as tf
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K
from keras.models import model_from_json
import functions.RealTimeSudokuSolver
import copy

# Loading model (Load weights and configuration seperately to speed up model.predict)
input_shape = (28, 28, 1)
num_classes = 9
model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3),
                     activation='relu',
                     input_shape=input_shape))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

# Load weights from pre-trained model. This model is trained in digitRecognition.py
model.load_weights("digitRecognition.h5") 

ques_matrix=[]
ans_matrix=[]

class Camera(object):
    def __init__(self, makeup_artist):
        global ques_matrix
        global ans_matrix
        ques_matrix=[]
        ans_matrix=[] 
        self.to_process = []
        self.to_output = []
        self.makeup_artist = makeup_artist
        thread = threading.Thread(target=self.keep_processing, args=())
        thread.daemon = True
        thread.start()

    def process_one(self):
        global ques_matrix
        global ans_matrix
        global model

        if not self.to_process:
            return True

        # input is an ascii string. 
        input_str = self.to_process.pop(0)

        # convert it to a pil image
        pil_image = base64_to_pil_image(input_str)
        image=np.array(pil_image)
        image=image[:,:,::-1].copy()

        old_sudoku=None
        fl=functions.RealTimeSudokuSolver.recognize_and_solve_sudoku(image, model, old_sudoku)

        if(fl==1):
            print("Succesfully Scanned sudoku for solving")
            print(functions.RealTimeSudokuSolver.grid)
            print(functions.RealTimeSudokuSolver.user_grid)

            ans_matrix=copy.deepcopy(functions.RealTimeSudokuSolver.grid)
            ques_matrix=copy.deepcopy(functions.RealTimeSudokuSolver.user_grid)
            return False

        else:
            return True
       

    def keep_processing(self):
        while True:
            if(self.process_one()):
                sleep(0.01)
            else:
                break
            
                

    def get_matrix(self):
        global ques_matrix
        global ans_matrix
        return (ques_matrix,ans_matrix)
                

    def enqueue_input(self, input):
        self.to_process.append(input)
