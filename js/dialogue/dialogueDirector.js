// =====================================
// Dialogue Director
// =====================================

import {
    showPortrait,
    hidePortrait,
    hideAllPortraits,
    setDimmed,
    hasPortrait
} from "../portrait/portraitManager.js";
import { executeCommand } from "./dialogueCommand.js";


// 현재 출력중인 대사
let currentDialogue = null;


// 대사 시작
export function startDialogue(npc){
    currentDialogue = npc.dialogue;
    updateDialogueLine(
        currentDialogue[0],
        npc
    );
}


// 줄 변경
export function changeDialogue(line, npc){
    updateDialogueLine(
        currentDialogue[line],
        npc
    );
}


// 현재 줄 반환
export function getCurrentDialogue(line){
    return currentDialogue[line];
}


// 종료
export function endDialogue(){
    currentDialogue = null;
    hideAllPortraits();
}


// 한 줄 적용
function updateDialogueLine(data, npc){
    if(!data) return;

    if(data.command){
        executeCommand(data);
        return;
    }

    switch(data.speaker){

        case "npc":
            showPortrait({
                slot:"right",
                character:npc.id,
                emotion:data.emotion
            });

            if(hasPortrait("left")){
                setDimmed("left",true);
            }
            setDimmed("right",false);
        break;

        case "player":
            showPortrait({
                slot:"left",
                character:"player",
                emotion:data.emotion
            });
            if(hasPortrait("right")){
                setDimmed("right",true);
            }
            setDimmed("left",false);
        break;

        case "none":
            hideAllPortraits();
            break;
    }
}

export function prepareConversation(type,npc){
    switch(type){

        case "npc":
            hidePortrait("left");
            showPortrait({
                slot:"right",
                character:npc.id,
                emotion:"normal"
            });
        break;


        case "conversation":
            showPortrait({
                slot:"left",
                character:"player",
                emotion:"normal"
            });
            showPortrait({
                slot:"right",
                character:npc.id,
                emotion:"normal"
            });
            setDimmed("left",true);
            setDimmed("right",false);

        break;
    }

}

export function getDialogueLength(){
    return currentDialogue.length;
}