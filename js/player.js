// =====================================
// Player
// =====================================

import { keys } from "./input.js";

export const player = {

    x:100,
    y:100,

    width:32,
    height:32,

    speed:3,

    direction:"down",

    image:new Image()

};

player.image.src = "assets/characters/player.png";

export function updatePlayer(canvas){

    if(keys["ArrowUp"]){

        player.y-=player.speed;
        player.direction="up";

    }

    if(keys["ArrowDown"]){

        player.y+=player.speed;
        player.direction="down";

    }

    if(keys["ArrowLeft"]){

        player.x-=player.speed;
        player.direction="left";

    }

    if(keys["ArrowRight"]){

        player.x+=player.speed;
        player.direction="right";

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

    ctx.drawImage(

        player.image,

        player.x,
        player.y,

        player.width,
        player.height

    );

}