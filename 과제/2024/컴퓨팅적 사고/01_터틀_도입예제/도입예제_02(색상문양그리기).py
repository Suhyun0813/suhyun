# https://docs.python.org/3.6/library/turtle.html   

import turtle
t = turtle.Turtle()
colors = ['red', 'purple', 'blue', 'green', 'yellow', 'orange'] 

# t.bgcolor('black')
t.pencolor('white')
t.speed(0)
turtle.bgcolor('black') 

for x in range(360) :
    t.pencolor( colors[x%6] )
    t.width( x/100 + 1 ) 
    t.forward( x )
    t.left( 59 )


