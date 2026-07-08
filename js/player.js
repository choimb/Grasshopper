// =====================================
// Player
// =====================================

import { keys } from "./input.js";

export const player = {

    x:100,
    y:100,

    width:32,
    height:32,

    spriteWidth:80,
    spriteHeight:80,

    speed:3,

    direction:"down",

    frame:1,

    animationTimer:0,

    image:new Image()

};

player.image.src = "assets/characters/player.png";

export function updatePlayer(canvas){

    let moving = false;

    if(keys["ArrowUp"]){

        player.y-=player.speed;
        player.direction="up";
        moving = true;

    }

    if(keys["ArrowDown"]){

        player.y+=player.speed;
        player.direction="down";
        moving = true;

    }

    if(keys["ArrowLeft"]){

        player.x-=player.speed;
        player.direction="left";
        moving = true;

    }

    if(keys["ArrowRight"]){

        player.x+=player.speed;
        player.direction="right";
        moving = true;

    }

if(moving){

    player.animationTimer++;

    if(player.animationTimer >= 12){

        player.animationTimer = 0;

        player.frame++;

        if(player.frame > 2){

            player.frame = 0;

        }

    }

}else{

    player.frame = 1;
    player.animationTimer = 0;

}

    // 맵 밖으로 못 나가기

    player.x = Math.max(
        0,
        Math.min(player.x, canvas.width-player.width)
    );

    player.y = Math.max(
        0,
        Math.min(player.y, canvas.height-player.height)
    );

}

export function drawPlayer(ctx){

    const FRAME_SIZE = 32;
    let row = 0;

    switch(player.direction){

    case "down":
        row = 0;
        break;

    case "left":
        row = 1;
        break;

    case "right":
        row = 2;
        break;

    case "up":
        row = 3;
        break;

    }

    const sx = player.frame * FRAME_SIZE;
    const sy = row * FRAME_SIZE;

    ctx.drawImage(
        player.image,

        sx,
        sy,
        FRAME_SIZE,
        FRAME_SIZE,

        player.x,
        player.y,

        player.spriteWidth,
        player.spriteHeight
    );

}