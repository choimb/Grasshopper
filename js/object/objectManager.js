// =====================================
// Object Manager
// =====================================

import { objectDatabase } from "./objectDatabase.js";
import { getFloorInfo } from "../map.js";
import { SCALE } from "../config.js";

import { getCurrentClassroom } from "../school/schoolManager.js";

export const objects = [];

// Grid → Pixel
function gridToPixel(
    gridX,
    gridY,
    offsetX = 0,
    offsetY = 0
){
    const floor = getFloorInfo();
    return{
        x:
            floor.x +
            gridX * floor.tileSize +
            offsetX,
        y:
            floor.y +
            gridY * floor.tileSize +
            offsetY
    };
}


// Build
export function buildObjects(){
    objects.length = 0;
    const classroom =
        getCurrentClassroom();

    for(const data of classroom.objects){
        const base =
            objectDatabase[data.id];

        if(!base){
            console.warn(
                `Object "${data.id}" not found.`
            );
            continue;
        }

        const pos = gridToPixel(
            data.gridX,
            data.gridY,
            data.offsetX ?? 0,
            data.offsetY ?? 0
        );

        objects.push({
            id:data.id,
            type:base.type,

            x:pos.x,
            y:pos.y,
            width:
                base.width * SCALE,
            height:
                base.height * SCALE,

            image:
                base.image,
            bottomImage:
                base.bottomImage,
            topImage:
                base.topImage,

            collision:
                base.collision
                    ? {
                        x:
                            base.collision.x * SCALE,
                        y:
                            base.collision.y * SCALE,
                        width:
                            base.collision.width * SCALE,
                        height:
                            base.collision.height * SCALE
                    }
                    : null
        });
    }
}


// Layers
export function getObjectLayers(){
    const below = [];
    const normal = [];
    const above = [];

    for(const object of objects){
        switch(object.type){
            case "split":
                below.push({
                    draw(ctx){
                        ctx.drawImage(
                            object.bottomImage,
                            object.x,
                            object.y,
                            object.width,
                            object.height
                        );
                    }
                });

                above.push({
                    sortY:
                        object.collision
                        ? object.y +
                          object.collision.y +
                          object.collision.height
                        : object.y,

                    draw(ctx){
                        ctx.drawImage(
                            object.topImage,
                            object.x,
                            object.y,
                            object.width,
                            object.height
                        );
                    }
                });
                break;

            case "normal":
                normal.push({
                    sortY:
                        object.collision
                        ? object.y +
                          object.collision.y +
                          object.collision.height
                        : object.y +
                          object.height,

                    draw(ctx){
                        ctx.drawImage(
                            object.image,
                            object.x,
                            object.y,
                            object.width,
                            object.height
                        );
                    }
                });
                break;

            case "static":
                below.push({
                    draw(ctx){
                        ctx.drawImage(
                            object.image,
                            object.x,
                            object.y,
                            object.width,
                            object.height
                        );
                    }
                });
                break;
        }
    }

    return{
        below,
        normal,
        above
    };
}