// =====================================
// Player
// =====================================

import { dialogue } from "./dialogue.js";
import { keys } from "./input.js";
import { checkCollision } from "./collision.js";

export const player = {
    x:600,
    y:200,
    width:32,
    height:32,
    sortY: 0,

    spriteWidth:64,
    spriteHeight:64,

    collision:{
        x:16,
        y:44,
        width:32,
        height:20
    },

    speed:3,
    direction:"down",
    frame:1,

    animationTimer:0,
    animationDirection:1,

    image:new Image()
};

player.image.src = "assets/characters/player.png";

export function updatePlayer(canvas){
    if(dialogue.isOpen) return;
    let moving = false;
    let nextX = player.x;
    let nextY = player.y;

    if(keys["ArrowUp"]){
        nextY -= player.speed;
        player.direction="up";
        moving = true;
    }

    if(keys["ArrowDown"]){
        nextY += player.speed;
        player.direction="down";
        moving = true;
    }

    if(keys["ArrowLeft"]){
        nextX -= player.speed;
        player.direction="left";
        moving = true;
    }

    if(keys["ArrowRight"]){
        nextX += player.speed;
        player.direction="right";
        moving = true;
    }

    if(!checkCollision(nextX, nextY, player)){
    player.x = nextX;
    player.y = nextY;
    }

    if(moving){
        player.animationTimer++;
        if(player.animationTimer >= 12){
            player.animationTimer = 0;
            player.frame += player.animationDirection;

            if(player.frame >= 2){
                player.frame = 2;
                player.animationDirection = -1;
            }

            if(player.frame <= 0){
                player.frame = 0;
                player.animationDirection = 1;
            }
        }
    }else{
        player.frame = 1;
        player.animationTimer = 0;
        player.animationDirection = 1;
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

    player.sortY =
        player.y + player.collision.y + player.collision.height;
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

export function getPlayerEntity(){
    return{
        sortY: player.sortY,
        draw(ctx){
            drawPlayer(ctx);
        }
    };
}
