// =====================================
// Engine
// =====================================

import {
    player,
    updatePlayer,
    getPlayerEntity
} from "./player.js";

import {
    updateNPCs,
    drawInteraction,
    getNPCEntities
} from "./npc.js";

import {
    npcs,
    buildNPCs
} from "./npc/npcManager.js";

import {
    dialogue,
    drawDialogue,
    openDialogue,
    nextDialogue
} from "./dialogue.js";

import {isKeyPressed} from "./input.js";
import {drawMap} from "./map.js";
import {drawCollision} from "./collision.js";
import {getObjectLayers} from "./objects.js";
import {drawRenderer} from "./renderer.js";

export function startEngine(canvas, ctx){

    function update(){
        updatePlayer(canvas);
        updateNPCs(player);

        if(isKeyPressed("KeyZ")){
            if(dialogue.isOpen){
                nextDialogue();
            }
            else{
                const target =
                    npcs.find(npc=>npc.canInteract);
                if(target){
                    openDialogue(target);
                }
            }
    }
}

    function draw(){

        // 바닥
        drawMap(ctx);

        // 오브젝트 레이어
        const objectLayers = getObjectLayers();

        // Y축 정렬 대상
        const normalQueue = [
            ...getNPCEntities(),
            getPlayerEntity()
        ];

        // 렌더링
        drawRenderer(
            ctx,
            objectLayers.below,
            normalQueue,
            objectLayers.above
        );

        // 개발용
        drawCollision(ctx);
        for(const npc of npcs){
            drawInteraction(ctx, npc, player);
        }
        drawDialogue(ctx, canvas);
    }

    function gameLoop(){
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function loadMap(){
    buildNPCs();
    }

    loadMap();
    gameLoop();

}