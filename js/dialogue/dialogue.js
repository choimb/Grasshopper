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
import {
    startTyping,
    updateTyping,
    getTypingText,
    finishTyping,
    isTypingFinished
} from "../typing/typingManager.js";

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
    startTyping(
        getCurrentDialogue(0).text
    );
}

export function nextDialogue(){
    if(!isTypingFinished()){
        finishTyping();
        return;
    }

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
    startTyping(
        getCurrentDialogue(
            dialogue.currentLine
        ).text
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
    updateTyping();

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
    
    let speakerName = "";
    switch(currentDialogue.speaker){

    case "npc":
        speakerName = dialogue.currentNPC.name;
        break;

    case "player":
        speakerName = "대구자전거";
        break;

    case "none":
        speakerName = "";
        break;

}

    ctx.fillText(
        speakerName,
        UILayout.dialogue.textX,
        dialogueY + UILayout.dialogue.nameY
    );

    // 대사

    ctx.font = "20px sans-serif";

    ctx.fillText(
        getTypingText(),
        UILayout.dialogue.textX,
        dialogueY + UILayout.dialogue.textY
    );
}