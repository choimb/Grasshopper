// =====================================
// Dialogue System
// =====================================

import { keys } from "./input.js";

export const dialogue = {

    isOpen:false,
    currentNPC:null,
    currentLine:0

};

export function openDialogue(npc){

    dialogue.isOpen = true;
    dialogue.currentNPC = npc;
    dialogue.currentLine = 0;

}

export function nextDialogue(){

    dialogue.currentLine++;

    if(
        dialogue.currentLine >=
        dialogue.currentNPC.dialogue.length
    ){
        closeDialogue();
    }

}

export function closeDialogue(){

    dialogue.isOpen = false;
    dialogue.currentNPC = null;
    dialogue.currentLine = 0;

}

const leftPadding = 80;

export function drawDialogue(ctx, canvas){

    ctx.textAlign = "left";
    if(!dialogue.isOpen) return;

    // 배경
    ctx.fillStyle = "#FFFDF4";
    ctx.beginPath();
    ctx.roundRect(

        20,
        canvas.height - 150,
        canvas.width - 40,
        130,
        18

    );

    ctx.fill();

    // 테두리

    ctx.strokeStyle = "#9FC93C";
    ctx.lineWidth = 4;
    ctx.stroke();

    // 이름

    ctx.fillStyle = "#222";
    ctx.font = "bold 22px sans-serif";

    ctx.fillText(
    dialogue.currentNPC.name,
    leftPadding,
    canvas.height - 110
);

    // 대사

    ctx.font = "20px sans-serif";

    ctx.fillText(
        dialogue.currentNPC.dialogue[dialogue.currentLine],
        leftPadding,
        canvas.height - 70
    );

}