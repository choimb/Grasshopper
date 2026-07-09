// =====================================
// Objects
// =====================================

const deskLeft = new Image();
deskLeft.src = "assets/objects/desk_left.png";

export const objects = [

    const OBJECT_SCALE = 64;
    export const objects = [

    {
        type: "desk",
        image: deskLeft,
        x: 300,
        y: 200,
        width: OBJECT_SCALE,
        height: OBJECT_SCALE,
        sortY: 200 + OBJECT_SCALE
    }

];

];

export function drawObjects(ctx){

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