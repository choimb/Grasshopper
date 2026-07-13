// =====================================
// NPC
// =====================================

import { dialogue } from "../dialogue.js";
import { npcs } from "./npcManager.js";


// Interaction UI Images
const interactionIcons = {

    normal: new Image(),
    search: new Image(),
    complete: new Image(),
    quest: new Image(),
    lock: new Image(),
    shop: new Image()

};

interactionIcons.normal.src = "assets/ui/normal.png";
interactionIcons.search.src = "assets/ui/search.png";
interactionIcons.complete.src = "assets/ui/complete.png";
interactionIcons.quest.src = "assets/ui/quest.png";
interactionIcons.lock.src = "assets/ui/lock.png";
interactionIcons.shop.src = "assets/ui/shop.png";

const pressZImage = new Image();
pressZImage.src = "assets/ui/press_z.png";


// NPC 업데이트
export function updateNPCs(player){

    for(const npc of npcs){
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance > npc.detectDistance){
            npc.direction = "down";
            npc.canDetect = false;
            continue;
        }
        npc.canDetect = true;

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
    // 기본값
    npc.isFocused = false;
    }
    let nearest = null;
    let nearestDistance = Infinity;

    for(const npc of npcs){
        if(!npc.canDetect) continue;
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < nearestDistance){
            nearestDistance = distance;
            nearest = npc;
        }
    }
    if(nearest){
        nearest.isFocused = true;
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


function drawIcon(ctx, npc, x, y){
    const image =
        interactionIcons[npc.interactionIcon];

    if(!image) return;
    ctx.drawImage(
        image,
        x - 16,
        y - 16,
        32,
        32
    );
}

function drawPressZ(ctx, x, y){
    ctx.drawImage(
        pressZImage,
        x - 38,
        y - 44,
        76,
        18
    );
}



// 말풍선
export function drawInteraction(ctx, npc){
    if(dialogue.isOpen) return;
    if(!npc.canDetect) return;

    const x = npc.x + npc.spriteWidth / 2;
    const y = npc.y - 15;
    ctx.fillStyle = "#FFFDF4";
    ctx.beginPath();
    const padding = 18;
    ctx.font = "bold 14px sans-serif";

    const bubbleWidth = 56;

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

    ctx.font = "18px sans-serif";
    ctx.fillText("...", x, y - 2);

    if(npc.isFocused){
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("[ Z ]", x, y - 20);
    }
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

export function getNearestNPC(player){
    let nearest = null;
    let nearestDistance = Infinity;

    for(const npc of npcs){

        if(!npc.canDetect) continue;
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < nearestDistance){
            nearestDistance = distance;
            nearest = npc;
        }
    }
    return nearest;
}