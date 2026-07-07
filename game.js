// Canvas

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

// 플레이어

const player = {

    x:100,
    y:100,

    width:32,
    height:32,

    speed:3

};

// 입력 상태

const keys = {};

// 키보드 입력

window.addEventListener("keydown",(e)=>{

    keys[e.code]=true;

});

window.addEventListener("keyup",(e)=>{

    keys[e.code]=false;

});

// 모바일 버튼 연결

function bindButton(id,key){

    const button=document.getElementById(id);

    button.addEventListener("touchstart",(e)=>{

        e.preventDefault();

        keys[key]=true;

    });

    button.addEventListener("touchend",(e)=>{

        e.preventDefault();

        keys[key]=false;

    });

}

bindButton("up","ArrowUp");
bindButton("down","ArrowDown");
bindButton("left","ArrowLeft");
bindButton("right","ArrowRight");

bindButton("buttonA","KeyZ");
bindButton("buttonB","KeyX");

// 업데이트

function update(){

    if(keys["ArrowUp"]){

        player.y-=player.speed;

    }

    if(keys["ArrowDown"]){

        player.y+=player.speed;

    }

    if(keys["ArrowLeft"]){

        player.x-=player.speed;

    }

    if(keys["ArrowRight"]){

        player.x+=player.speed;

    }

    // 맵 밖으로 못 나가기

    if(player.x<0){

        player.x=0;

    }

    if(player.y<0){

        player.y=0;

    }

    if(player.x>canvas.width-player.width){

        player.x=canvas.width-player.width;

    }

    if(player.y>canvas.height-player.height){

        player.y=canvas.height-player.height;

    }

}

// 그리기

function draw(){

    ctx.fillStyle="#7fc97f";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="red";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}

// 게임 루프

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();