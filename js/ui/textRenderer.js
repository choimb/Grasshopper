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

                const width =
                    ctx.measureText(token.value).width;

                if(
                    currentX + width >
                    x + maxWidth
                ){

                    currentX = x;
                    currentY += lineHeight;

                }

                ctx.fillStyle = currentColor;

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

        }

    }

}