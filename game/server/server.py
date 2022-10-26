import asyncio
import time
import websockets
from universe import Universe

def makeList(x,y,val):
    list = []
    for i in range(0,x):
        tList=[]
        for j in range(0,y):
            tList.append(val)
        list.append(tList)
    return list

class Server:
    def __init__(self):
        self.universe = Universe()

    async def main(self):
        async with websockets.serve(self.handler, "", 8001):
            await asyncio.Future()  # run forever

    async def handler(self,websocket):
        count = 0
        list = makeList(50,50,"#00f")
        lastTime = time.time()
        async for message in websocket:
            # FPS calc
            dt = time.time() - lastTime
            lastTime = time.time()
            if (dt==0):
                fps = -1
            else:
                fps = int(1/dt)

            # Display
            print(f"[{fps}]({count}) {message}")
            count +=1

            # Reply
            await websocket.send(str(list))
            # await websocket.send("here")

    async def msg(self,websocket,msg):
        if (msg=="get screen"):
            await self.getScreen(websocket,msg)
        elif (msg=="get players"):
            await self.getPlayers(websocket,msg)
        elif (msg=="get stats"):
            await self.getStats(websocket,msg)
        elif (msg=="get controls"):
            await self.getControls(websocket,msg)
        elif (msg=="get leaderboards" | msg =="get lb"):
            await self.getLb(websocket,msg)
        else:
            pass
        
    async def getScreen(self,websocket,msg):
        pass
    
    async def getPlayers(self,websocket,msg):
        pass
    
    async def getStats(self,websocket,msg):
        pass
    
    async def getControls(self,websocket,msg):
        pass
    
    async def getLb(self,websocket,msg):
        pass





if __name__ == "__main__":
    server = Server()
    asyncio.run(server.main())