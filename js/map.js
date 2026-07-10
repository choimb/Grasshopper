// =====================================
// Map
// =====================================

// 이미지

const classroomFloor = new Image();
classroomFloor.src = "assets/tiles/classroom_floor.png";

const classroomWallFront = new Image();
classroomWallFront.src = "assets/maps/classroom_wall_front.png";

const classroomWallLeft = new Image();
classroomWallLeft.src = "assets/maps/classroom_wall_left.png";

const classroomWallRight = new Image();
classroomWallRight.src = "assets/maps/classroom_wall_right.png";

// 맵 생성 함수
function createMap({
    width,
    height,
    floor,
    walls
}){
    return{
        width,
        height,
        floor,
        walls
    };
}


// 현재 맵
export const currentMap = createMap({
    width:448,
    height:320,

    floor:{
        image:classroomFloor,
        x:64,
        y:96,
        width:320,
        height:224
    },

    walls:{
        front:{
            image:classroomWallFront,
            x:64,
            y:0,
            width:320,
            height:96
        },

        left:{
            image:classroomWallLeft,
            x:0,
            y:0,
            width:86,
            height:320
        },

        right:{
            image:classroomWallRight,
            x:362,
            y:0,
            width:86,
            height:320
        }
    }
});

// 바닥
function drawFloor(ctx){
    const floor = currentMap.floor;
    ctx.drawImage(
        floor.image,
        floor.x,
        floor.y,
        floor.width,
        floor.height
    );
}

// 벽
function drawWalls(ctx){
    const walls = currentMap.walls;
    ctx.drawImage(
        walls.front.image,
        walls.front.x,
        walls.front.y,
        walls.front.width,
        walls.front.height
    );

    ctx.drawImage(
        walls.left.image,
        walls.left.x,
        walls.left.y,
        walls.left.width,
        walls.left.height
    );

    ctx.drawImage(
        walls.right.image,
        walls.right.x,
        walls.right.y,
        walls.right.width,
        walls.right.height
    );
}


// 맵
export function drawMap(ctx){
    drawFloor(ctx);
    drawWalls(ctx);
}
