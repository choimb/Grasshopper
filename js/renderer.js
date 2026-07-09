// =====================================
// Renderer
// =====================================

export function drawRenderQueue(ctx, renderQueue){
    renderQueue.sort((a,b)=>a.sortY-b.sortY);
    for(const entity of renderQueue){
        entity.draw(ctx);
    }
}