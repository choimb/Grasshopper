// =====================================
// Renderer
// =====================================

export function drawRenderer(
    ctx,
    belowQueue = [],
    normalQueue = [],
    aboveQueue = []
){

    // 오브젝트 하판
    for(const entity of belowQueue){
        entity.draw(ctx);
    }

    // Y축 정렬
    normalQueue.sort(
        (a,b)=>
            a.sortY - b.sortY
    );

    for(const entity of normalQueue){
        entity.draw(ctx);
    }

    // 오브젝트 상판
    for(const entity of aboveQueue){
        entity.draw(ctx);
    }

}