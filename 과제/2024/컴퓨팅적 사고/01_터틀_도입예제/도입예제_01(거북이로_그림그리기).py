import turtle as t 
import math
import time 

angle = 89
t.bgcolor("black")
t.color("yellow")
t.speed(0)  
for x in range(300) :
    t.forward(x)
    t.left(angle)

# 원형 패턴 그리기 
t.home()
t.clear()
t.color("white") 
for x in range(150) :
    t.circle(x)
    t.left(angle)



# input() 


# n = int( t.textinput("그래프", "간단한 수학그패르를 그려줄께요.") ) 
t.home()
t.clear()
t.bgcolor("white")
t.color("black") 

# 수학 그래프 그리기
t.speed(5) 
t.penup( )
t.goto(0,0);    t.write( " (0,0" ) 
t.goto(0,200);  t.write( "(0,200)" )
t.pendown( ) 
t.goto(0,-200);  t.write( " (0,-200)" )

t.penup( )
t.goto(-200,0); t.write("(-200,0)")
t.pendown( ) 
t.goto(200,0); t.write("(200,0)")
t.penup( )

t.goto(-150,-150);
t.pendown( )
t.color("blue") 
t.goto(150,150);   t.write( "y=x" )
t.goto(0,0)
t.penup( )

t.goto(-70,-180);
t.pendown()
t.color("red") 
t.goto(70,180);   t.write( "y=2x" )
t.goto(0,0)
time.sleep(1)


