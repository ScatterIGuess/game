function makeArray(w, h, val) {
    var arr = [];
    for(let i = 0; i < w; i++) {
        arr[i] = [];
        for(let j = 0; j < h; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}
function walls(array,thick=10,color='#e22'){
    let x = 0;
    let y = 0;
    while(x<50){
        y=0;
        while(y<50){
            // TOP
            if(y<thick||y>=50-thick||x<thick||x>=50-thick){
                array[x][y] = color;
            }
            y+=1;
        }
        x+=1;
    }
    return array;
}
function conList(data){
    let result = []
    data = data.replaceAll("[","").replaceAll("]","").replaceAll("'","").split(",")
    let i = 0;
    let j = 0;
    let t = [];
    data.forEach(element => {
        if(j==0){i++;t =[]}
        if (element == "1"){
            t.push("#f00");
        }else if (element == "0"){
            t.push("#0f8");
        }
        else{
            t.push(element)
        }
        j++;
        if(j==50){j-=50,result.push(t)}
    });
    return result;
}

export default class Server{
    constructor(ip,port){
        this.ip = ip;
        this.port = port;
        this.screen = this.makeScreen();
        this.websocket = new WebSocket("ws://localhost:8001/");
        this.websocket.addEventListener("message", ({ data }) => {
            this.screen = conList(data);
            // console.log("got data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        });
    }
    makeScreen(){
        let screen = makeArray(50,50,"#0f8");
        screen = walls(screen,1,"#f00");
        return screen;
    }
    connect(){
        return "token";
    }
    getScreen(token){
        this.websocket.send("getScreen");
        return this.screen;
    }
    getSize(width,height,unit){
        return [500,500];
    }
}