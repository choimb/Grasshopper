// =====================================
// Renderer
// =====================================

export function drawRenderer(
    ctx,
    belowQueue,
    normalQueue,
    aboveQueue
){
    for(const entity of belowQueue){
        entity.draw(ctx);
    }
    normalQueue.sort(
        (a,b)=>a.sortY-b.sortY
    );

    for(const entity of normalQueue){
        entity.draw(ctx);
    }

    for(const entity of aboveQueue){
        entity.draw(ctx);
    }
}