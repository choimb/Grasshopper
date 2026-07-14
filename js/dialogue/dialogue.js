// =====================================
// Dialogue System
// =====================================

import { keys } from "../input.js";
import { getUITheme } from "../ui/uiManager.js";
import {
    drawPortraits,
    showPortrait,
    hidePortrait,
    hideAllPortraits,
    setDimmed
} from "../portrait/portraitManager.js";
import { UILayout } from "../ui/uiLayout.js";

export const dialogue = {

    isOpen:false,
    currentNPC:null,
    currentLine:0

};

export function openDialogue(npc){

    dialogue.isOpen = true;
    dialogue.currentNPC = npc;
    dialogue.currentLine = 0;

    const currentDialogue =
        npc.dialogue[0];

    if(currentDialogue.speaker === "npc"){
        showPortrait({
            slot:"right",
            character:npc.id,
            emotion:currentDialogue.emotion
        });

        hidePortrait("left");
        setDimmed("right", false);
    }
}

export function nextDialogue(){
    dialogue.currentLine++;

    // 마지막 대사였다면 종료
    if(
        dialogue.currentLine >=
        dialogue.currentNPC.dialogue.length
    ){
        closeDialogue();
        return;
    }

    const currentDialogue =
        dialogue.currentNPC.dialogue[
            dialogue.currentLine
        ];

    if(currentDialogue.speaker === "npc"){
        showPortrait({
            slot:"right",
            character:dialogue.currentNPC.id,
            emotion:currentDialogue.emotion
        });

        hidePortrait("left");
        setDimmed("right", false);
    }
}

export function closeDialogue(){

    dialogue.isOpen = false;
    dialogue.currentNPC = null;
    dialogue.currentLine = 0;

    hideAllPortraits();

}

export function drawDialogue(ctx, canvas){

    ctx.textAlign = "left";
    if(!dialogue.isOpen) return;

    // 배경
    const ui = getUITheme();

    drawPortraits(ctx, canvas);

    const dialogueY = canvas.height - UILayout.dialogue.height - UILayout.dialogue.bottom;

    ctx.drawImage(
        ui.dialogueBox,
        UILayout.dialogue.x,
        dialogueY,
        UILayout.dialogue.width,
        UILayout.dialogue.height
    );

    // 이름
    ctx.fillStyle = "#222";
    ctx.font = "bold 22px sans-serif";

    const currentDialogue =
        dialogue.currentNPC.dialogue[dialogue.currentLine];

    ctx.fillText(
    dialogue.currentNPC.name,
    UILayout.dialogue.textX,
    canvas.height - 110
    );

    // 대사

    ctx.font = "20px sans-serif";

    ctx.fillText(
        currentDialogue.text,
        UILayout.dialogue.textX,
        canvas.height - 70
    );
}