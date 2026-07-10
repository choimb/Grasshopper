// =====================================
// NPC Manager
// =====================================

import { getCurrentClassroom } from "../school/schoolManager.js";
import { npcDatabase } from "./npcDatabase.js";
import { getFloorInfo } from "../map.js";

export const npcs = [];

export function buildNPCs(){
    npcs.length = 0;
    const classroom = getCurrentClassroom();
    const floor = getFloorInfo();

    for(const npcData of classroom.npcs){
        const base = npcDatabase[npcData.id];

        if(!base){
            console.warn(
                `NPC "${npcData.id}"를 찾을 수 없습니다.`
            );
            continue;
        }

        npcs.push({

            id:npcData.id,
            x:
                floor.x +
                npcData.gridX * floor.tileSize,
            y:
                floor.y +
                npcData.gridY * floor.tileSize,
            width:32,
            height:32,

            spriteWidth:base.spriteWidth,
            spriteHeight:base.spriteHeight,

            image:base.image,
            direction:
                npcData.direction ?? "down",
            frame:1,
            interactionText:
                base.interactionText,

            dialogue:
                base.dialogue,

            detectDistance:160,

            canInteract:false

        });

    }

}