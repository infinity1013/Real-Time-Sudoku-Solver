# This is the entry point. Run this file!
# You don't need to run digitRecognition.py to train the Convolutional Neural Network (CNN).
# trained the CNN on my computer and saved the architecture in digitRecognition.h5

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

def showImage(img, name, width, height):
    new_image = np.copy(img)
    new_image = cv2.resize(new_image, (width, height))
    cv2.imshow(name, new_image)

def scan():
    # Load and set up Camera
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    cap.set(3, 1280)    # HD Camera
    cap.set(4, 720)

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

    #creating quit flag
    quit=0
    
    # Let's turn on webcam
    old_sudoku = None
    while(True):
        ret, frame = cap.read() # Read the frame
        if ret == True:
            fl=functions.RealTimeSudokuSolver.recognize_and_solve_sudoku(frame, model, old_sudoku)
            showImage(frame, "Real Time Sudoku Solver", 1066, 600) # Print the 'solved' image
            if(fl==1):
                print("Succesfully Scanned sudoku for solving")
                cap.release()
                #out.release()
                cv2.destroyAllWindows()
            if cv2.waitKey(1) & 0xFF == ord('q'):   # Hit q if you want to stop the camera
                quit=1
                break
        else:
            break
      
    cap.release()
    #out.release()
    cv2.destroyAllWindows()

    question_grid=[]
    solution_grid=[]

    if(quit==1):
        return (question_grid,solution_grid)
    
    print(functions.RealTimeSudokuSolver.grid)
    print(functions.RealTimeSudokuSolver.user_grid)

    solution_grid=copy.deepcopy(functions.RealTimeSudokuSolver.grid)
    question_grid=copy.deepcopy(functions.RealTimeSudokuSolver.user_grid)

    return (question_grid,solution_grid)

if __name__ == "__main__":
    scan()
    print('done')
