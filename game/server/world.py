import sqlite3


class World:
    lastId = 0
    conn = sqlite3.connect("world/World.db")
    try:
        conn.execute("""CREATE TABLE objects""")
    except:
        pass
    
    def __init__(self,name):
        World.lastId+=1
        self.id = World.lastId
        self.name = name
        self.scuns = []
        self.lights = []
        self.colors = []
    
    def createDB(self):
        conn = sqlite3.connect(self.name)
        conn.execute("""CREATE TABLE scuns (
            x int,
            y int,
            no int,
            glow int,
            objId int,
            CONSTRAINT cords PRIMARY KEY (x,y)
            )""")
        
