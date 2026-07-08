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

import {
    isKeyPressed
} from "./input.js";

export function startEngine(canvas, ctx){

    if(isKeyPressed("KeyZ")){

    if(dialogue.isOpen){

        nextDialogue();

    }
    else if(npc.canInteract){

        openDialogue(npc);

    }

}

    function draw(){

        // 배경

        ctx.fillStyle="#7fc97f";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

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