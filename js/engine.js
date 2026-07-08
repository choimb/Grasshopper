// =====================================
// Engine
// =====================================

import {
    player,
    updatePlayer,
    drawPlayer
} from "./player.js";

import {
    drawNPC,
    updateNPC,
    drawInteraction
} from "./npc.js";

export function startEngine(canvas, ctx){

    function update(){

        updatePlayer(canvas);
        updateNPC(player);

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

    }

    function gameLoop(){

        update();

        draw();

        requestAnimationFrame(gameLoop);

    }

    gameLoop();

}