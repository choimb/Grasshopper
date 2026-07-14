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
import {
    startDialogue,
    changeDialogue,
    endDialogue,
    getCurrentDialogue,
    getDialogueLength
} from "./dialogueDirector.js";

export const dialogue = {

    isOpen:false,
    currentNPC:null,
    currentLine:0

};

export function openDialogue(npc){

    dialogue.isOpen = true;
    dialogue.currentNPC = npc;
    dialogue.currentLine = 0;

    startDialogue(npc);
}

export function nextDialogue(){
    dialogue.currentLine++;

    // 마지막 대사였다면 종료
    if(
        dialogue.currentLine >=
        getDialogueLength()
    ){
        closeDialogue();
        return;
    }

    changeDialogue(
        dialogue.currentLine,
        dialogue.currentNPC
    );
}

export function closeDialogue(){

    dialogue.isOpen = false;
    dialogue.currentNPC = null;
    dialogue.currentLine = 0;

    endDialogue();

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
        getCurrentDialogue(
            dialogue.currentLine
        );

    ctx.fillText(
        dialogue.currentNPC.name,
        UILayout.dialogue.textX,
        dialogueY + UILayout.dialogue.nameY
    );

    // 대사

    ctx.font = "20px sans-serif";

    ctx.fillText(
        currentDialogue.text,
        UILayout.dialogue.textX,
        dialogueY + UILayout.dialogue.textY
    );
}

export function hasPortrait(slot){
    return slots[slot].visible;
}