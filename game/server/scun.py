
from tkinter import _XYScrollCommand


class Scun:
    lastId = 0
    def __init__(self,world,x,y,no=1,glow=0):
        Scun.lastId +=1
        self.id = Scun.lastId
        self.x = x
        self.y = y
        self.atomicNo = no
        self.glow = glow
        self.world = world