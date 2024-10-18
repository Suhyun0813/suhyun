import turtle as t

def goUp() :
    t.setheading(90)
    t.fd(50) 

def goDown() :
    t.setheading(270)
    t.fd(50) 

def goRight() :
    t.setheading(0)
    t.fd(50) 

def goLeft() :
    t.setheading(180)
    t.fd(50) 

t.shape('turtle')
t.shapesize(3)

screen = t.Screen() 
screen.listen()
screen.onkey(goLeft, 'Left')    # 대소문자 구분 
screen.onkey(goRight, 'Right')
screen.onkey(goUp, 'Up')
screen.onkey(goDown, 'Down')

