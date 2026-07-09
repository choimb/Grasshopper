// =====================================
// Objects
// =====================================

const deskLeft = new Image();
deskLeft.src = "assets/objects/desk_left.png";
const OBJECT_SCALE = 64;

export const objects = [
    {
        type: "desk",
        image: deskLeft,
        x: 300,
        y: 200,
        width: OBJECT_SCALE,
        height: OBJECT_SCALE,
    }
];

export function drawObjects(ctx){

    for(const object of objects){
        object.sortY = object.y + object.height;
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