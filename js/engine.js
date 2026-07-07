// =====================================
// Engine
// =====================================

import { player, updatePlayer } from "./player.js";

export function startEngine(canvas, ctx){

    function update(){

        updatePlayer(canvas);

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

        // 플레이어

        ctx.fillStyle="red";

        ctx.fillRect(

            player.x,
            player.y,

            player.width,
            player.height

        );

    }

    function gameLoop(){

        update();

        draw();

        requestAnimationFrame(gameLoop);

    }

    gameLoop();

}