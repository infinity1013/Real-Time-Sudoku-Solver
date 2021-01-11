from flask import Flask,render_template,request,flash,session,logging,url_for,redirect,jsonify,Response
from flask_mail import Mail,Message 
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from functions.makeup_artist import Makeup_artist
from functions.Generate_random_board import board
from sqlalchemy.orm import scoped_session,sessionmaker
from passlib.hash import sha256_crypt
import os
import logging
from sys import stdout
from flask_socketio import SocketIO, emit
from functions.camera import Camera
from functions.utils import base64_to_pil_image, pil_image_to_base64

app=Flask(__name__)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=587
app.config['MAIL_USE_TLS']=True
app.config['MAIL_USE_SSL']=False
app.config['MAIL_USERNAME']='aadarshgupta875@gmail.com'
app.config['MAIL_PASSWORD']=os.environ.get('PASSWORD')
app.config['MAIL_DEFAULT_SENDER']='aadarshgupta875@gmail.com'

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/db_name
engine = create_engine(os.environ.get('DATABASE_URL'))
db=scoped_session(sessionmaker(bind=engine))

app.logger.addHandler(logging.StreamHandler(stdout))
app.config['DEBUG'] = True
socketio = SocketIO(app)
mail=Mail(app)

global camera

question_grid=[]
solution_grid=[]

@socketio.on('input image', namespace='/test')
def test_message(input):
	global question_grid
	global solution_grid
	input = input.split(",")[1]
	camera.enqueue_input(input)
	question_grid,solution_grid=camera.get_matrix()
	if (len(solution_grid)!=0):
		emit('input image',"True",namespace='/test')
	emit('input image',"False",namespace='/test')

@socketio.on('connect', namespace='/test')
def test_connect():
	app.logger.info("client connected")



@app.route('/',methods=["GET","POST"])
def login():
	if request.method=="POST":
		email=request.form.get("email")
		password=request.form.get("Password")
		emaildata=db.execute("SELECT email FROM users WHERE email=:email",{"email":email}).fetchone()
		passworddata=db.execute("SELECT password FROM users WHERE email=:email",{"email":email}).fetchone()

		if emaildata is None:
			flash("No registerations with this email","danger")
			return render_template("login.html",category="danger")
		else:
			#for passwor in passworddata:
			if sha256_crypt.verify(password, passworddata[0]):
				session["user"]=True
				flash("Successfully logged in","success")
				return render_template("dashboard.html",category="success")
			else:
				flash("incorrect password","danger")
				return render_template("login.html",category="danger")   
	else:          							
		return render_template('login.html')


@app.route('/register',methods=["GET","POST"])
def register():
	if request.method=="POST":
		name=request.form.get("name")
		email=request.form.get("email")
		password=request.form.get("password")
		c_password=request.form.get("c_password")
		secure_password=sha256_crypt.encrypt(str(password))

		emaildata=db.execute("SELECT email FROM users WHERE email=:email",{"email":email}).fetchone()
		passworddata=db.execute("SELECT password FROM users WHERE email=:email",{"email":email}).fetchone()

		if emaildata is None:
			if password==c_password:
				db.execute("INSERT INTO users (name,email,password) VALUES (:name,:email,:password)",{"name":name,"email":email,"password":secure_password})
				db.commit()
				flash("Registered Successfully","success")
				return render_template("login.html",category="success")
			else:
				flash("password does not match","danger")
				return render_template("register.html",category="danger")

		else:
			flash("Already registered with this email id","danger")
			return render_template("login.html",category="danger")
	    	
	return render_template('register.html')

@app.route('/dashboard',methods=["GET","POST"])
def dashboard():
	if "user" in session:
		return render_template('dashboard.html')
	else:
		flash("Please!!! Login First","danger")
		return render_template('login.html',category="danger")

@app.route('/webcam',methods=["GET","POST"])
def webcam():
	global camera
	global question_grid
	global solution_grid
	if "user" in session:
		question_grid=[]
		solution_grid=[]
		camera = Camera(Makeup_artist())
		return render_template('webcam.html')
	else:
		flash("Please!!! Login First","danger")
		return render_template('login.html',category="danger")


@app.route('/sudoku_board',methods=["GET","POST"])
def sudoku_board():
	global question_grid
	global solution_grid
	return render_template('sudoku_solver.html',soln=solution_grid,ques=question_grid)


@app.route('/random_board',methods=["GET","POST"])
def random_board():
	if "user" in session:
		question_grid,solution_grid=board()
		return render_template('sudoku_solver.html',soln=solution_grid,ques=question_grid)
	else:
		flash("Please!!! Login First","danger")
		return render_template('login.html',category="danger")

@app.route('/visualise',methods=["GET","POST"])
def visualise():
	if "user" in session:
		question_grid,solution_grid=board()
		return render_template('visualise.html',soln=solution_grid,ques=question_grid)
	else:
		flash("Please!!! Login First","danger")
		return render_template('login.html',category="danger")

@app.route('/MailMe', methods=['POST', 'GET'])
def MailMe():
	data= request.get_json(force = True)
	name=data.get("name")
	email=data.get("email")
	phone=data.get("phone")
	message=data.get("message")
	try:
		msg=Message(
			subject='Sudoku Solver Website Contact Form: %s'%(name),
			recipients=['aadarshgupta875@gmail.com'],
			body="You have received a new message from your website contact form.\n\n. Here are the details:\n\nName: {}\n\nEmail: {}\n\nPhone: {}\n\nMessage:\n{}".format(name,email,phone,message)
		)
		mail.send(msg)
		return json.dumps({'success':True})
	except Exception:
		return json.dumps({'error':True})


@app.route('/logout')
def logout():
	if "user" in session:
		session.pop("user",None)
		flash("you are now logged out","success")
		return render_template("login.html",category="success")
	else:
		flash("Please!!! Login First","danger")
		return render_template('login.html',category="danger")


app.secret_key=os.environ.get('SECRET')
app.config['SECRET_KEY']=os.environ.get('SECRET')
SECRET_KEY=os.environ.get('SECRET')

if __name__=="__main__":
	socketio.run(app)
