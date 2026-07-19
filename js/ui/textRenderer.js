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

    const defaultColor = "#222";
    let currentColor = defaultColor;

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

                if(currentOutline){
                    ctx.strokeStyle = currentOutline;
                    ctx.lineWidth = 3;
                    ctx.strokeText(
                        token.value,
                        currentX,
                        currentY
                    );
                }

                ctx.fillText(
                    token.value,
                    currentX,
                    currentY
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

        }

    }

    ctx.globalAlpha = 1;

}