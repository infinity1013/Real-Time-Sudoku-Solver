# Real-Time-Sudoku-Solver

## Introduction
Simple Sudoku is Deep learning Web application implemented using Keras and TensorFlow. The main task of the algorithm is divided into two sections: Firstly, it should accurately locate the grid position in the image while taking care of problems of background clutter, scaling, translation, rotation and perspective skew. The second part of the algorithm must then locate those positions in the grid where there are numbers and recognize them with precision. Then application use backtracking algorithm to find solution of the sudoku.


Once we have acquired an image, containing the Sudoku grid we first convert it into a grayscale image, which is then the input to other preprocessing techniques so that the grid can be accurately located. The steps that we took are discussed below:
1) Smoothing the image and Adaptive thresholding.
2) Isolating the grid from background clutter of the image.


In backtracking, we first start with a sub-solution and if this sub-solution doesn't give us a correct final answer, then we just come back and change our sub-solution. We are going to solve our Sudoku in a similar way. The steps which we will follow are:

• If there are no unallocated cells, then the Sudoku is already solved. We will just return true.

• Or else, we will fill an unallocated cell with a digit between 1 to 9 so that there are no conflicts in any of the rows, columns, or the 3x3 sub-matrices.

• Now, we will try to fill the next unallocated cell and if this happens successfully, then we will return true.

• Else, we will come back and change the digit we used to fill the cell. If there is no digit which fulfils the need, then we will just return false as there is no solution of this Sudoku.


## Project Scope
This software system will be web application that help the user to extract handwritten sudoku and make user solve it on mobile application. The purpose is to enhance the experience of the user by giving hints to the user if user stuck at any stage, provides a feedback to tell user if user is solving sudoku with right approach. It also provides immediate solution to sudoku problem if user wants to solve sudoku with traditional way to help user match his/her own answer.


## Methodology 

#### 1) Register:
The user will first register to the website to be a authorized user. He/she will provide the personal information like username, email and password. After creating an account, there will an email verification by which the admin of the webpage will get to know whether the information provided by the user are right or not

#### 2) Login:
The user have to register first before getting login. He/she can’t login without registering. Here the credentials of user are verified with the one when he provided during
the registration. If credentials match, user is given rights to access the web page whereas if user fails, then the wrong information message will be prompted.

#### 3) Scan puzzle: 
To get the puzzle, user has to point webcam at a sudoku puzzle. OpenCV library and deep learning models are used to interpret edges, matrix along with digit recognition. Once the web app recognizes the puzzle, stop the webcam. At end, the scanned sudoku is given to web app for further computation and utility for fulfillment of purpose of the webapp.

![flowchart1](https://user-images.githubusercontent.com/68748614/134051459-25fffded-b549-4f3d-af4f-93686b38d057.jpeg)

#### 4) solve puzzle: 
To solve the puzzle completely, one can use the following functionalities
</br>
• USER INPUT: Here user provides the input to a cell, and  if the entered number is valid then the given digit is shown in black font color and if voilates the condition of sudoku problem to be correct then it is shown in red.</br>
• HINT: If user gets struck in the puzzle and unable to get which cell to enter next and with which value, he/she can use hint functionality to get the value of certain cell in the sudoku.</br>
• SOLUTION: If user wants to see whole solution at once, he/she can use solution functionality.</br>
• CLEAR CELL: It is used to clear the value in certain cell. If user feels that he has filled the incorrect value in the cell then he can clear that cell using this functionality</br>
• RESET: It clears all the values entered by the user. 
![flowchart2](https://user-images.githubusercontent.com/68748614/134051253-a33cb0ea-2c5f-4ffe-851d-6aa99c9260d8.jpeg)

### Reference Video
https://user-images.githubusercontent.com/68748614/134053034-f1a04e51-6f5c-4ff1-a988-67f4bedaf73b.mp4


#### Link
Website- https://real-time-sudoku-solver-api.herokuapp.com/ </br>
LinkedIn- https://www.linkedin.com/posts/aadarsh-gupta-335163184_realtimesudokusolver-opencv-flask-activity-6754825033941696512-FTub

