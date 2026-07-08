// =====================================
// NPC
// =====================================

export const npc = {

    x:500,
    y:220,

    width:32,
    height:32,

    spriteWidth:96,
    spriteHeight:96,

    direction:"down",

    frame:1,

    detectDistance:160,

    image:new Image()

};

npc.image.src = "assets/characters/digitalBread.png";

export function updateNPC(player){

    const dx = player.x - npc.x;
    const dy = player.y - npc.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if(distance > npc.detectDistance){

    npc.direction = "down";
    return;

    }

    if(Math.abs(dx) > Math.abs(dy)){

        if(dx > 0){

            npc.direction = "right";

        }else{

            npc.direction = "left";

        }

    }else{

        if(dy > 0){

            npc.direction = "down";

        }else{

            npc.direction = "up";

        }

    }

}

export function drawNPC(ctx){

    const FRAME_SIZE = 32;

    let row = 0;

    switch(npc.direction){

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

    const sx = npc.frame * FRAME_SIZE;
    const sy = row * FRAME_SIZE;

    ctx.drawImage(

        npc.image,

        sx,
        sy,

        FRAME_SIZE,
        FRAME_SIZE,

        npc.x,
        npc.y,

        npc.spriteWidth,
        npc.spriteHeight

    );

}