// =====================================
// NPC
// =====================================

import { dialogue } from "../dialogue.js";
import { npcs } from "./npcManager.js";
import { getUITheme } from "../ui/uiManager.js";


// NPC 업데이트
export function updateNPCs(player){

    for(const npc of npcs){
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance > npc.iconDistance){
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

        if(distance > npc.interactDistance) continue;
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
    const ui = getUITheme();
    const image =
        ui[npc.interactionIcon];

    if(!image) return;
    const size = 64;
    ctx.drawImage(
        image,
        x - size / 2,
        y - size / 2,
        size,
        size
    );
}

function drawPressZ(ctx, x, y){
    const size = 64;
    const ui = getUITheme();
    ctx.drawImage(
        ui.pressZ,
        x - size / 2,
        y - size / 2,
        size,
        size
    );
}


export function drawInteraction(ctx, npc){
    if(dialogue.isOpen) return;

    // 항상 표시가 아니면 가까이 왔을 때만
    if(
        npc.visibleMode !== "always" &&
        !npc.canDetect
    ){
        return;
    }

    const x = npc.x + npc.spriteWidth / 2;
    const y = npc.y - 30;
    drawIcon(ctx, npc, x, y);

    if(npc.isFocused){
        drawPressZ(ctx, x, y);
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

export function getFocusedNPC(){
    return npcs.find(npc => npc.isFocused) ?? null;
}