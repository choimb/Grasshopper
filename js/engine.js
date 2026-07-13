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
    getNPCEntities,
    getFocusedNPC
} from "./npc/npc.js";

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
import {buildObjects, getObjectLayers} from "./object/objectManager.js";
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
                const target = getFocusedNPC();
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
            ...objectLayers.normal,
            ...getNPCEntities(),
            getPlayerEntity()
        ];

        // 렌더링
        drawRenderer(
        ctx,
        objectLayers.frontWall,
        objectLayers.below,
        normalQueue,
        objectLayers.above
        );

        // 개발용
        drawCollision(ctx);
        for(const npc of npcs){
            drawInteraction(ctx, npc);
        }
        drawDialogue(ctx, canvas);
    }

    function gameLoop(){
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function loadMap(){
        buildObjects();
        buildNPCs();
    }

    loadMap();
    gameLoop();

}
