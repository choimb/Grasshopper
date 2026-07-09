// =====================================
// Collision
// =====================================

import { objects } from "./objects.js";

export function checkObjectCollision(nextX, nextY, player){

    const playerBox = {
        x: nextX + player.collision.x,
        y: nextY + player.collision.y,
        width: player.collision.width,
        height: player.collision.height
    };

    for(const object of objects){
        const objectBox = {
            x: object.x + object.collision.x,
            y: object.y + object.collision.y,
            width: object.collision.width,
            height: object.collision.height
        };

        const hit =
            playerBox.x < objectBox.x + objectBox.width &&
            playerBox.x + playerBox.width > objectBox.x &&
            playerBox.y < objectBox.y + objectBox.height &&
            playerBox.y + playerBox.height > objectBox.y;

        if(hit){
            return true;
        }
    }
    return false;
}

export function drawCollision(ctx){
    ctx.strokeStyle = "red";
    for(const object of objects){
        ctx.strokeRect(
            object.x + object.collision.x,
            object.y + object.collision.y,
            object.collision.width,
            object.collision.height
        );
    }
}