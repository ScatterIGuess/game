import asyncio
import time
import websockets

def makeList(x,y,val):
    list = []
    for i in range(0,x):
        tList=[]
        for j in range(0,y):
            tList.append(val)
        list.append(tList)
    return list


async def handler(websocket):
    count = 0
    list = makeList(500,500,0)
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


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())