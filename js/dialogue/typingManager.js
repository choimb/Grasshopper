// =====================================
// Typing Manager
// =====================================

import { parseText } from "./textParser.js";

export const typing = {

    fullText:"",
    tokens:[],

    visibleText:"",

    index:0,
    tagBuffer:"",

    timer:0,
    defaultSpeed:1,
    speed:1,

    waitFrame:0,

    finished:true
};


// 새 문장 시작
export function startTyping(text){

    typing.fullText = text;
    typing.tokens = parseText(text);

    typing.visibleText = "";

    typing.timer = 0;
    typing.index = 0;

    typing.speed = typing.defaultSpeed;

    typing.tagBuffer = "";
    typing.waitFrame = 0;

    typing.finished = false;
}


// 매 프레임 호출
export function updateTyping(){

    if(typing.finished) return;

    if(typing.waitFrame > 0){
    typing.waitFrame--;
    return;
    }

    typing.timer += typing.speed;

    while(typing.timer >= 1){
        typing.timer--;
        processNextToken();
        if(typing.finished){
            break;
        }
    }
}

function processNextToken(){
    const token = typing.tokens[typing.index];

    if(!token){
        typing.finished = true;
        return;
    }

    switch(token.type){

        case "text":
            typing.visibleText += token.value;
            typing.index++;
            break;

        case "wait":
            typing.waitFrame = token.value;
            typing.index++;
            break;

        case "speed":
            if(token.value > 0){
                typing.speed = token.value;
            }
            typing.index++;
            break;

        default:
            typing.index++;
            break;
    }

    if(
        typing.index >=
        typing.tokens.length
    ){
        typing.finished = true;
    }

}

function removeTags(text){
    return text.replace(/\[.*?\]/g, "");
}


// 즉시 전부 출력
export function finishTyping(){

    typing.visibleText =
        removeTags(typing.fullText);

    typing.index =
        typing.fullText.length;

    typing.finished = true;
}


// 현재 출력 문자열
export function getTypingText(){

    return typing.visibleText;

}


// 출력 완료 여부
export function isTypingFinished(){

    return typing.finished;

}