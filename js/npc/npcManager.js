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
            collision:{
                x:16,
                y:44,
                width:32,
                height:20
            },

            image:base.image,
            name:base.name,
            direction:
                npcData.direction ?? "down",
            frame:1,

            dialogue:
                base.dialogue,
            detectDistance:80,

            canDetect:false,
            isFocused:false,

            interactionIcon:"normal",
            visibleMode:"near"
        });

    }

}