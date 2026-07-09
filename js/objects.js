// =====================================
// Objects
// =====================================

const deskLeft = new Image();
deskLeft.src = "assets/objects/desk_left.png";

export const objects = [

    {
        type: "desk",
        image: deskLeft,
        x: 300,
        y: 200,
        width: 32,
        height: 32
    }

];

export function drawObjects(ctx){

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