// =====================================
// NPC Database
// =====================================

import { digitalBreadDialogue } from "../data/dialogue/npc/digitalBread.js";
import { memodDialogue } from "../data/dialogue/npc/memod.js";
import { busanKALDialogue } from "../data/dialogue/npc/busanKAL.js";
import { dongtanCDialogue } from "../data/dialogue/npc/dongtanC.js";
import { ParkthunderDialogue } from "../data/dialogue/npc/Parkthunder.js";

const digitalBreadImage = new Image();
digitalBreadImage.src =
    "assets/characters/digitalBread.png";

const memodImage = new Image();
memodImage.src =
    "assets/characters/memod.png";

const busanKALImage = new Image();
busanKALImage.src =
    "assets/characters/busanKAL.png";

const dongtanCImage = new Image();
dongtanCImage.src =
    "assets/characters/dongtanC.png";

const ParkthunderImage = new Image();
ParkthunderImage.src =
    "assets/characters/Parkthunder.png";

export const npcDatabase = {

    digitalBread:{
        name: "디지털빵",
        image:digitalBreadImage,
        spriteWidth:64,
        spriteHeight:64,
        dialogue:digitalBreadDialogue.default
     },
     memod:{
        name: "매머드대공",
        image:memodImage,
        spriteWidth:64,
        spriteHeight:64,
        dialogue:memodDialogue.default
    },
    busanKAL:{
        name: "부산칼잽이",
        image:busanKALImage,
        spriteWidth:64,
        spriteHeight:64,
        dialogue:busanKALDialogue.default
    },
    dongtanC:{
        name: "동탄카사노바",
        image:dongtanCImage,
        spriteWidth:64,
        spriteHeight:64,
        dialogue:dongtanCDialogue.default
    },
    Parkthunder:{
        name: "박썬더키라노스케",
        image:ParkthunderImage,
        spriteWidth:64,
        spriteHeight:64,
        dialogue:ParkthunderDialogue.default
    }

};