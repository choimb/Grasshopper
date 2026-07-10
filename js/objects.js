// =====================================
// Objects
// =====================================


// 이미지 로드

const deskBottom = new Image();
deskBottom.src = "assets/objects/desk_default_left_bottom.png";

const deskTop = new Image();
deskTop.src = "assets/objects/desk_default_left_top.png";


// 공통 설정
const OBJECT_SCALE = 64;
const DESK_COLLISION_HEIGHT = 40;
const DESK_COLLISION_Y = OBJECT_SCALE - DESK_COLLISION_HEIGHT;


// 오브젝트 생성 함수

function createObject({
    type,
    x,
    y,
    width = OBJECT_SCALE,
    height = OBJECT_SCALE,

    collision,
    bottomImage,
    topImage
}){

    return{
        type,
        x,
        y,
        width,
        height,
        collision,
        bottomImage,
        topImage
    };
}


// 맵에 배치된 오브젝트
export const objects = [
    createObject({
        type:"desk",
        x:300,
        y:200,
        collision:{
            x:0,
            y:DESK_COLLISION_Y,
            width:OBJECT_SCALE,
            height:DESK_COLLISION_HEIGHT
        },
        bottomImage:deskBottom,
        topImage:deskTop
    }),

    createObject({
        type:"desk",
        x:300,
        y:120,
        collision:{
            x:0,
            y:DESK_COLLISION_Y,
            width:OBJECT_SCALE,
            height:DESK_COLLISION_HEIGHT
        },
        bottomImage:deskBottom,
        topImage:deskTop
    })
];


// Renderer가 사용할 레이어 반환
export function getObjectLayers(){
    const below = [];
    const above = [];

    for(const object of objects){
        // 아래 레이어
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

        // 위 레이어
        above.push({

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
    }

    return{
        below,
        above
    };

}