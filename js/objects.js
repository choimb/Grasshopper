// =====================================
// Objects
// =====================================

const deskLeft = new Image();
deskLeft.src = "assets/objects/desk_left.png";
const OBJECT_SCALE = 64;
const DESK_COLLISION_HEIGHT = 40;
const DESK_COLLISION_Y = OBJECT_SCALE - DESK_COLLISION_HEIGHT;

export const objects = [
    {
        type: "desk",
        image: deskLeft,
        x: 300,
        y: 200,
        width: OBJECT_SCALE,
        height: OBJECT_SCALE,
        collision: {
            x: 0,
            y: DESK_COLLISION_Y,
            width: OBJECT_SCALE,
            height: DESK_COLLISION_HEIGHT
            }
    }
];

export function drawObjects(ctx){
    for(const object of objects){
        object.sortY =
            object.y +
            object.collision.y +
            object.collision.height;
    }
    objects.sort((a,b)=>a.sortY-b.sortY);

    for(const object of objects){
        ctx.drawImage(
            object.image,
            object.x,
            object.y,
            object.width,
            object.height
        );
    }
}

export function getObjectEntities(){
    return objects.map(object=>({
        sortY: object.sortY,
        draw(ctx){

            ctx.drawImage(
                object.image,
                object.x,
                object.y,
                object.width,
                object.height

            );
        }
    }));
}