// =====================================
// Objects
// =====================================

import { getCurrentClassroom } from "./school/schoolManager.js";
import { getFloorInfo } from "./map.js";

// 이미지
const images = {

    desk:{

        default:{

            left:{
                bottom:new Image(),
                top:new Image()
            },

            right:{
                bottom:new Image(),
                top:new Image()
            }

        }

    }

};

images.desk.default.left.bottom.src =
"assets/objects/desk_default_left_bottom.png";

images.desk.default.left.top.src =
"assets/objects/desk_left_top.png";

images.desk.default.right.bottom.src =
"assets/objects/desk_default_right_bottom.png";

images.desk.default.right.top.src =
"assets/objects/desk_right_top.png";


// 설정
const OBJECT_SIZE = 64;
const DESK_COLLISION_HEIGHT = 40;
const DESK_COLLISION_Y =
OBJECT_SIZE - DESK_COLLISION_HEIGHT;


// 오브젝트
export const objects = [];

// 좌표 계산
function gridToPixel(gridX, gridY){
    const floor = getFloorInfo();
    return{
        x: floor.x + gridX * floor.tileSize,
        y: floor.y + gridY * floor.tileSize
    };
}


// 책상 생성
function createDesk({
    variant,
    side,
    gridX,
    gridY
}){

    const pos = gridToPixel(
        gridX,
        gridY
    );

    const image =
        images.desk[variant][side];

    objects.push({
        type:"desk",
        x:pos.x,
        y:pos.y,
        width:OBJECT_SIZE,
        height:OBJECT_SIZE,
        bottomImage:image.bottom,
        topImage:image.top,
        collision:{
            x:0,
            y:DESK_COLLISION_Y,
            width:OBJECT_SIZE,
            height:DESK_COLLISION_HEIGHT
        }
    });
}

// 빌드
function buildObjects(){
    objects.length = 0;
    const classroom = getCurrentClassroom();
    for(const object of classroom.objects){
        switch(object.type){
            case "desk":
                createDesk({
                    variant:object.variant,
                    side:object.side,
                    gridX:object.gridX,
                    gridY:object.gridY
                });
                break;
        }
    }
}

buildObjects();

// 레이어
export function getObjectLayers(){
    const below = [];
    const above = [];

    for(const object of objects){
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
                object.y +
                object.collision.y +
                object.collision.height,

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