// =====================================
// Text Renderer
// =====================================

export function drawDialogueText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight = 30
){

    const paragraphs = text.split("\n");

    let currentY = y;

    for(const paragraph of paragraphs){

        let line = "";

        for(const char of paragraph){

            const testLine = line + char;

            if(
                ctx.measureText(testLine).width > maxWidth &&
                line !== ""
            ){

                ctx.fillText(
                    line,
                    x,
                    currentY
                );

                line = char;
                currentY += lineHeight;

            }else{

                line = testLine;

            }

        }

        ctx.fillText(
            line,
            x,
            currentY
        );

        currentY += lineHeight;

    }

}