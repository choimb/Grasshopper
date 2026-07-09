// =====================================
// Engine
// =====================================

import {
    player,
    updatePlayer,
    drawPlayer,
    getPlayerEntity
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
import {getObjectEntities} from "./objects.js";
import {drawCollision} from "./collision.js";
import { drawRenderQueue } from "./renderer.js";

import { getNPCEntity } from "./npc.js";

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

        const renderQueue = [
            ...getObjectEntities(),
            getNPCEntity(),
            getPlayerEntity()
        ];
        drawRenderQueue(ctx, renderQueue);

        // 개발용
        drawCollision(ctx);
        drawInteraction(ctx, player);
        drawDialogue(ctx, canvas);
    }

    function gameLoop(){
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

}