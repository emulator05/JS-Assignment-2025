var board;
let barVel = 0;
let bar1 = {
    x :10,
    y :250,
    width:10,
    height:50,
    velocityY : barVel
}

let bar2 = {
    x :480,
    y :250,
    width:10,
    height:50,
    velocityY : barVel
}

let ball ={
    x : 250,
    y : 250,
    width : 10,
    height : 10,
    velocityX : 0.5,
    velocityY : 1,

}

let point1 = 0;
let point2 = 0;


window.onload = function() {
     board = document.getElementById("board");
     context = board.getContext("2d");

     context.fillStyle = '#2dbccc';
     context.fillRect(bar1.x , bar1.y , bar1.width, bar1.height);
     
     requestAnimationFrame(play)
     document.addEventListener("keyup",moveBar)
}

function play() {
    requestAnimationFrame(play);
    context.clearRect(0,0,500,500);

    context.fillStyle = '#2dbccc';
    
    let barNew1 = bar1.y + bar1.velocityY;
    if (!constraint(barNew1)){
        bar1.y = barNew1
    }
    context.fillRect(bar1.x , bar1.y , bar1.width, bar1.height); 
    
    let barNew2 = bar2.y + bar2.velocityY;
    if (!constraint(barNew2)){
        bar2.y = barNew2
    }
    
    context.fillRect(bar2.x , bar2.y , bar2.width, bar2.height); 

    
    context.fillStyle = "#FFFFFF" ;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if(ball.y <=0 || ball.y + ball.height >= 500){
        ball.velocityY *= -1;
    }

    if (collide(ball, bar1)){
        if (ball.x <= bar1.x + bar1.width) {
            ball.velocityX *= -1
        }
    }
    else if (collide(ball, bar2)){
        if (ball.x + ball.width >= bar2.x){
            ball.velocityX *= -1
        }
    }

    if (ball.x < 0) {
        point2++;
        reset(0.5);
    }

    else if (ball.x + ball.width > 500){
        point1++;
        reset(-0.5);
    }

    context.font = "40px Times New Roman";
    context.fillText(point1, 100, 40);
    context.fillText(point2, 360, 40);
    
    //context.font = "35px Comic Sans"
    //context.fillText("tHE pONG sHOWDOWN", 66 ,275  );
    //context.fillStyle()
}

function constraint(yPosition){
    return (yPosition < 0 || yPosition + 50 > 500);
}

function moveBar(m) {
    if (m.code == "KeyW"){
        bar1.velocityY = -2;
    }
    else if (m.code == "KeyS"){
        bar1.velocityY = 2;
    }    
    if (m.code == "ArrowUp"){
        bar2.velocityY = -2;
    }
    else if (m.code == "ArrowDown"){
        bar2.velocityY = 2;
    }    

}

function collide(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function reset(direction){
    ball ={
    x : 250,
    y : 250,
    width : 10,
    height : 10,
    velocityX : direction,
    velocityY : 1,
}
}