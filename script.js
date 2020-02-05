var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
var isPlaying = true;
var hor = true;
var length = 100;
var x = Math.random()*(300);
var y = Math.random()*(300);
var start = {
    "x": x,
    "y": y,
    "dir": "r"
}
var end = {
    "x": x+length,
    "y": y,
    "dir": "r"
}
var lengthDelay = false;
var pivs = [];

var circx = Math.random()*(500-20);
var circy = Math.random()*(500-20);
circx = circx<20?circx+20:circx;
circy = circy<20?circy+20:circy;

play();

function play(){
    setTimeout(function(){
        ctx.clearRect(0, 0, 500, 500);
        createCircle(circx,circy);
        shiftEnd();
        collisions();
        var pivx;
        var pivy;
        if(pivs.length > 0){
            pivx = pivs[0]["x"];
            pivy = pivs[0]["y"];
        } else {
            pivx = -2;
            pivy = -2;
        }
        if(start["x"] == pivx && start["y"] == pivy){
            start["dir"] = pivs[0]["dir"];
            shiftStart();
            pivs.shift();
        } else {
           shiftStart();
        }
        drawLine();
        play();
    }, 300)
}

function shiftStart(){
    if(!lengthDelay){
        
        if(start["dir"] == "r"){
            start["x"] = start["x"]+10;
        } else if(start["dir"] == "l"){
            start["x"] = start["x"]-10;
        } else if(start["dir"] == "u"){
            start["y"] = start["y"]-10;
        } else{
            start["y"] = start["y"]+10;
        }
    }
    lengthDelay = false;
}

function shiftEnd(){
    if(end["dir"] == "u"){
        end["y"]=end["y"]-10;
    } else if(end["dir"] == "d"){
        end["y"]=end["y"]+10;
    } else if(end["dir"] == "l"){
        end["x"]=end["x"]-10;
    } else {
        end["x"]=end["x"]+10;
    }
}

function collisions(){
    if(foodCollision()){
        lengthDelay = true;
        circx = Math.random()*(500-20);
        circy = Math.random()*(500-20);
        circx = circx<20?circx+20:circx;
        circy = circy<20?circy+20:circy;
    }
}

function selfCollision(){
    //Good Luck!
}

function foodCollision(){
    var dist = Math.sqrt(Math.pow((end["x"]-circx), 2) + Math.pow((end["y"]-circy), 2));
    console.log(dist);
    if(dist < 6){
        return true;
    } else {
        return false;
    }
}

function sideCollision(){
    if(end["x"] > 499 || end["y"] > 499){
        return true;
    } else {
        return false;
    }
}

function lineLength(){
    var len = Math.sqrt(Math.pow((end["x"]-start["x"]), 2) + Math.pow((end["y"]-start["y"]), 2));
    return len;
}

function createCircle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawLine(){
    ctx.beginPath();
    ctx.moveTo(start["x"], start["y"]);
    for(i = 0; i < pivs.length; i++){
        ctx.lineTo(pivs[i]["x"], pivs[i]["y"]);
    }
    /*end["x"] = hor?x+length:x;
    end["y"] = hor?y:y+length;*/
    ctx.lineTo(end["x"], end["y"]);
    ctx.stroke();
}

document.addEventListener("keydown", function(event) {
    var key = event.which;
    if(key == 38 && hor){
        end["dir"] = "u";
        hor = false;
    } else if(key == 40 && hor){
        end["dir"] = "d";
        hor = false;
    } else if(key == 37 && !hor){
        end["dir"] = "l";
        hor = true;
    } else if(key == 39 && !hor){
        end["dir"] = "r";
        hor = true;
    }
    pivs.push({"x": end["x"], "y":end["y"], "dir":end["dir"]});
})