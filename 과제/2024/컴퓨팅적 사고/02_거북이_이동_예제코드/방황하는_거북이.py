import turtle as t
import time
import random 

t.shape('turtle')
t.shapesize(3)

while True :
    t.fd(50)
    angle = random.randint(-90, 90)
    t.rt( angle )
    time.sleep(0.3) 
