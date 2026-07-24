// =====================================
// Text Renderer
// =====================================

export function drawDialogueText(
    ctx,
    tokens,
    x,
    y,
    maxWidth,
    lineHeight = 30
    ){

    let currentX = x;
    let currentY = y;

    const defaultColor = "#222";
    const defaultSize = 20;
    const defaultAlpha = 1;

    let currentColor = defaultColor;
    let currentSize = defaultSize;
    let currentAlpha = defaultAlpha;

    let currentOutline = null;
    let currentBold = false;
    let currentShake = false;
    let currentWave = false;

    ctx.fillStyle = currentColor;

    for(const token of tokens){

        switch(token.type){

            case "text":{

                if(token.value === "\n"){
                    currentX = x;
                    currentY += lineHeight;
                    break;
                }

                ctx.font = `${currentSize}px sans-serif`;
                const width = ctx.measureText(token.value).width;

                if(currentX + width > x + maxWidth){
                    currentX = x;
                    currentY += lineHeight;
                }

                ctx.globalAlpha = currentAlpha;
                ctx.fillStyle = currentColor;

                let drawX = currentX;
                let drawY = currentY;

                if(currentShake){
                    drawX += Math.random()*2-1;
                    drawY += Math.random()*2-1;
                }

                if(currentWave){
                    drawY += Math.sin(
                        performance.now()*0.01 +
                        currentX*0.08
                    )*3;
                }

                if(currentOutline){
                    ctx.strokeStyle = currentOutline;
                    ctx.lineWidth = 3;
                    ctx.strokeText(
                        token.value,
                        drawX,
                        drawY
                    );
                }

                if(currentBold){
                    ctx.fillText(
                        token.value,
                        drawX + 1,
                        drawY
                    );
                }

                ctx.fillText(
                    token.value,
                    drawX,
                    drawY
                );
                currentX += width;
                break;
            }

            case "color":

                currentColor = token.value;
                break;

            case "endcolor":

                currentColor = defaultColor;
                break;

            case "size":
                currentSize = token.value;
                break;

            case "endsize":
                currentSize = defaultSize;
                break;

            case "outline":
                currentOutline = token.value;
                break;

            case "endoutline":
                currentOutline = null;
                break;

            case "alpha":
                currentAlpha = token.value;
                break;

            case "endalpha":
                currentAlpha = defaultAlpha;
                break;

            case "bold":
                currentBold = true;
                break;

            case "endbold":
                currentBold = false;
                break;

            case "shake":
                currentShake = true;
                break;

            case "endshake":
                currentShake = false;
                break;

            case "wave":
                currentWave = true;
                break;

            case "endwave":
                currentWave = false;
                break;

        }

    }

    ctx.globalAlpha = 1;

}