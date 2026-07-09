// =====================================
// Engine
// =====================================

import {
    player,
    updatePlayer,
    drawPlayer
} from "./player.js";

import {
    npc,
    drawNPC,
    updateNPC,
    drawInteraction
} from "./npc.js";

import {
    dialogue,
    drawDialogue,
    openDialogue,
    nextDialogue
} from "./dialogue.js";

import {isKeyPressed} from "./input.js";
import {drawMap} from "./map.js";
import {drawObjects} from "./objects.js";

export function startEngine(canvas, ctx){

    function update(){
        updatePlayer(canvas);
        updateNPC(player);

        if(isKeyPressed("KeyZ")){
            if(dialogue.isOpen){
                nextDialogue();
            }
            else if(npc.canInteract){
                openDialogue(npc);
        }
    }
}

    function draw(){

        // 배경
        drawMap(ctx);

        // 오브젝트
        drawObjects(ctx);
        drawCollision(ctx);

        // NPC
        drawNPC(ctx);
        drawInteraction(ctx, player);

        // 플레이어
        drawPlayer(ctx);
        drawDialogue(ctx, canvas);
    }

    function gameLoop(){
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

}