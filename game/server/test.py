import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://localhost:8001") as websocket:
        await websocket.send("Hello world!")
        await websocket.send("Hello world!")
        print(await websocket.recv())
        print(await websocket.recv())
        print(await websocket.recv())
        print(await websocket.recv())
        print(await websocket.recv())
        
asyncio.run(hello())