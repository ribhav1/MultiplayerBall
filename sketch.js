var ball1,database;
var position;

var edges;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    console.log(database);

    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";

    var ballPosition = database.ref("ball/position");
    ballPosition.on("value",readPosition,showError);

}

function draw(){
   // World.frameRate = 200;
    background("white");
     if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
    }
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y + y,
    })
}

function readPosition(data) {
    position = data.val();
    console.log(position.x);
    ball1.x = position.x;
    ball1.y = position.y;
}

function showError(){
    console.log("Error in writing the position to the datatbase");
}