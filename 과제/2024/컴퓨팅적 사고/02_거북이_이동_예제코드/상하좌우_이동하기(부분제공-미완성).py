import turtle as t

def goUp() :
    t.setheading(90)
    t.fd(50) 

def goRight() :
    t.setheading(0)
    t.fd(50) 

t.shape('turtle')
t.shapesize(3)

screen = t.Screen() 
screen.listen()
screen.onkey(goRight, 'Right')   # 대소문자 구분 
screen.onkey(goUp, 'Up') 

