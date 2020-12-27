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
