import Server from "./server.js";


let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let unit = 1;
let lastTime = 0;
let prevDt = 0;
let fpsLimit = 40;

let server = new Server("ip","port");
let token = server.connect()
let screen = [];

let lastWidth = 0;
let lastHeight = 0;


function resize(){
    let size = server.getSize(parseInt(visualViewport.width*9/10),parseInt(visualViewport.height*8/10),unit);
    ctx.canvas.width = size[0];
    ctx.canvas.height = size[1];
    // show the width and height
    console.log("Width:",ctx.canvas.width,"Height:",ctx.canvas.height);
}

function draw(plane){
    let x = 0
    plane.forEach(planeY => {
        let y = 0
        planeY.forEach(element => {
            if(element!=0){
                ctx.fillStyle = element;
                ctx.fillRect(x*unit, y*unit,unit,unit)
            }
            y+=1;
        });
        x+=1;        
    });
}


function gameLoop(timeStamp){
    // console.log(timeStamp);

    // resizing canvas to fit the screen
    if(lastWidth!=visualViewport.width||lastHeight!=visualViewport.height){
        resize();
        lastWidth = visualViewport.width;
        lastHeight = visualViewport.height;
    }

    //caculating deltatime and fps
    if(lastTime==0){lastTime=timeStamp;}
    let deltatime =(timeStamp-lastTime)/1000 + prevDt;
    lastTime=timeStamp;
    prevDt = deltatime;
    let fps = 0;
    if(deltatime==0){fps=-1;}else{fps=1/deltatime;}
    

    // Draw
    if (fps<=fpsLimit){
        prevDt = 0;
        screen = server.getScreen(token);
        ctx.clearRect(0, 0, ctx.canvas.width,ctx.canvas.height);
        // draw(screen);
        console.log("DeltaTime:",deltatime);
        console.log("FPS:",fps);
    }

    // Loop
    requestAnimationFrame(gameLoop);
}


window.addEventListener('load', function () {
    requestAnimationFrame(gameLoop);
  })
