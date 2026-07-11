// =====================================
// Collision
// =====================================

import { objects } from "./object/objectManager.js";
import { getMapCollisions } from "./map.js";

// 맵 충돌
function checkMapCollision(nextX, nextY, player){

    const mapCollisions = getMapCollisions();

    const playerBox = {
        x: nextX + player.collision.x,
        y: nextY + player.collision.y,
        width: player.collision.width,
        height: player.collision.height
    };

    for(const wall of mapCollisions){

        const hit =
            playerBox.x < wall.x + wall.width &&
            playerBox.x + playerBox.width > wall.x &&
            playerBox.y < wall.y + wall.height &&
            playerBox.y + playerBox.height > wall.y;

        if(hit){
            return true;
        }
    }
    return false;
}

// 오브젝트 충돌
function checkObjectCollision(nextX, nextY, player){

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

// 최종 충돌
export function checkCollision(nextX, nextY, player){

    if(checkMapCollision(nextX, nextY, player)){
        return true;
    }

    if(checkObjectCollision(nextX, nextY, player)){
        return true;
    }

    return false;
}


// 개발용 표시
export function drawCollision(ctx){
    ctx.strokeStyle = "red";

    // 맵 충돌
    for(const wall of getMapCollisions()){
        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );
    }

    // 오브젝트 충돌
    for(const object of objects){
        ctx.strokeRect(
            object.x + object.collision.x,
            object.y + object.collision.y,
            object.collision.width,
            object.collision.height
        );
    }
}