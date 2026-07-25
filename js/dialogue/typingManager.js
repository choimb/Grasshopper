// =====================================
// Typing Manager
// =====================================

import { parseText } from "./textParser.js";
import { playVoice, playSE, playBGM, playMapBGM } from "../audio/audioManager.js";

export const typing = {

    fullText:"",
    tokens:[],

    visibleText:"",
    visibleTokens:[],

    index:0,
    voice:"default",

    tagBuffer:"",

    timer:0,
    defaultSpeed:4,
    speed:1,

    waitFrame:0,

    finished:true
};


// 새 문장 시작
export function startTyping(text){

    typing.fullText = text;
    typing.tokens = parseText(text);

    typing.visibleText = "";
    typing.visibleTokens = [];

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

    typing.timer ++;

    while(typing.timer >= typing.speed){
        typing.timer -= typing.speed;
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
            typing.visibleTokens.push(token);

            if(
                typing.voice !== "none" &&
                token.value.trim() !== "" &&
                ![
                    ".",
                    ",",
                    "!",
                    "?",
                    "…",
                    "~"
                ].includes(token.value)
            ){
                playVoice(typing.voice);
            }

            typing.index++;
            break;

        case "wait":
            typing.visibleTokens.push(token);
            typing.waitFrame = token.value;
            typing.index++;
            break;

        case "speed":
            typing.visibleTokens.push(token);
            if(token.value > 0){
                typing.speed = token.value;
            }
            typing.index++;
            break;

        case "se":
            playSE(token.value);
            typing.visibleTokens.push(token);
            typing.index++;
            break;

        case "bgm":
            playBGM(token.value);
            typing.visibleTokens.push(token);
            typing.index++;
            break;

        case "mapbgm":
            playMapBGM();
            typing.visibleTokens.push(token);
            typing.index++;
            break;

        default:
            typing.visibleTokens.push(token);
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

    typing.visibleText = removeTags(typing.fullText);

    typing.visibleTokens = [...typing.tokens];

    typing.index = typing.tokens.length;

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

export function getVisibleTokens(){
    return typing.visibleTokens;
}


export function setTypingVoice(name){
    typing.voice = name;
}

export function getTypingVoice(){
    return typing.voice;
}
