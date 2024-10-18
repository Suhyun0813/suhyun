import turtle as t
import math 
t.width( 3 )

while 1: 
    n = int( t.textinput("다각형", "몇 각형을 그려줄까요? ") ) 
    t.goto(-100,350)
    t.clear() 
    for i in range( n ) : 
        t.forward( 400/math.sqrt(n-2) )
        t.right( 360/n )
