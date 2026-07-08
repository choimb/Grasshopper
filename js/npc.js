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

    image:new Image()

};

npc.image.src = "assets/characters/digitalBread.png";

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