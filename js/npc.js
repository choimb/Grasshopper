// =====================================
// NPC
// =====================================

export const npc = {

    x:500,
    y:220,

    width:32,
    height:32,

    spriteWidth:80,
    spriteHeight:80,

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

export function drawInteraction(ctx, player){

    const dx = player.x - npc.x;
    const dy = player.y - npc.y;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance > npc.detectDistance) return;

    // -----------------
    // 말풍선 위치
    // -----------------

    const x = npc.x + npc.spriteWidth / 2;
    const y = npc.y - 40;

    // -----------------
    // 말풍선
    // -----------------

    ctx.fillStyle = "#fffdf4";

    ctx.beginPath();

    ctx.roundRect(
        x - 55,
        y - 40,
        110,
        45,
        10
    );

    ctx.fill();

    // -----------------
    // 꼬리
    // -----------------

    ctx.beginPath();

    ctx.moveTo(x - 8, y + 5);
    ctx.lineTo(x + 8, y + 5);
    ctx.lineTo(x, y + 14);

    ctx.closePath();

    ctx.fill();

    // -----------------
    // 테두리
    // -----------------

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    ctx.stroke();

    // -----------------
    // 글씨
    // -----------------

    ctx.fillStyle = "#222";

    ctx.textAlign = "center";

    ctx.font = "bold 14px sans-serif";

    ctx.fillText("[ Z ]", x, y - 18);

    ctx.font = "13px sans-serif";

    ctx.fillText("대화하기", x, y);
}