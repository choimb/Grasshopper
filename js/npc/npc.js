// =====================================
// NPC
// =====================================

import { dialogue } from "../dialogue.js";
import { npcs } from "./npc/npcManager.js";

// NPC 업데이트
export function updateNPCs(player){

    for(const npc of npcs){
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance > npc.detectDistance){
            npc.direction = "down";
            npc.canInteract = false;
            continue;
        }
        npc.canInteract = true;

        if(Math.abs(dx) > Math.abs(dy)){
            if(dx > 0){
                npc.direction = "right";
            }
            else{
                npc.direction = "left";
            }
        }
        else{
            if(dy > 0){
                npc.direction = "down";
            }
            else{
                npc.direction = "up";
            }
        }
    }
}


// NPC 하나 그리기
export function drawNPC(ctx, npc){
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

// 말풍선
export function drawInteraction(ctx, npc, player){
    if(dialogue.isOpen) return;
    if(!npc.canInteract) return;

    const x = npc.x + npc.spriteWidth / 2;
    const y = npc.y - 15;
    const actionText = npc.interactionText;
    ctx.fillStyle = "#FFFDF4";
    ctx.beginPath();
    const padding = 18;
    ctx.font = "bold 14px sans-serif";

    const textWidth = Math.max(
        ctx.measureText("[ Z ]").width,
        ctx.measureText(actionText).width
    );

    const bubbleWidth = textWidth + padding * 2;

    ctx.roundRect(
        x - bubbleWidth / 2,
        y - 40,
        bubbleWidth,
        45,
        10
    );

    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 8, y + 5);
    ctx.lineTo(x + 8, y + 5);
    ctx.lineTo(x, y + 14);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";

    ctx.font = "bold 14px sans-serif";
    ctx.fillText("[ Z ]", x, y - 18);

    ctx.font = "13px sans-serif";
    ctx.fillText(actionText, x, y);
}


// Renderer
export function getNPCEntities(){

    return npcs.map(npc => ({
        sortY:
            npc.y +
            npc.collision.y +
            npc.collision.height,
        draw(ctx){
            drawNPC(ctx, npc);
        }
    }));
}
