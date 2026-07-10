// =====================================
// NPC Database
// =====================================

const digitalBreadImage = new Image();
digitalBreadImage.src =
    "assets/characters/digitalBread.png";

const memodImage = new Image();
memodImage.src =
    "assets/characters/memod.png";

export const npcDatabase = {

    digitalBread:{
        name: "디지털빵",
        image:digitalBreadImage,
        spriteWidth:64,
        spriteHeight:64,

        interactionText:"대화하기",

        dialogue:[
            "안녕!",
            "나는 디지털빵이야.",
            "빵 먹을래?"
        ]

    },
     memod:{
        name: "매머드대공",
        image:memodImage,
        spriteWidth:64,
        spriteHeight:64,

        interactionText:"대화하기",

        dialogue:[
            "아 졸려",
            "피자 먹자 피자"
        ]

    }

};