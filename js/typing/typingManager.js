// =====================================
// Typing Manager
// =====================================

export const typing = {

    fullText:"",
    visibleText:"",

    index:0,

    frame:0,
    speed:2,

    finished:true
};


// 새 문장 시작
export function startTyping(text){

    typing.fullText = text;
    typing.visibleText = "";

    typing.index = 0;
    typing.frame = 0;

    typing.finished = false;
}


// 매 프레임 호출
export function updateTyping(){

    if(typing.finished) return;

    typing.frame++;

    if(typing.frame < typing.speed) return;

    typing.frame = 0;

    typing.index++;

    typing.visibleText =
        typing.fullText.substring(
            0,
            typing.index
        );

    if(
        typing.index >=
        typing.fullText.length
    ){
        typing.finished = true;
    }

}


// 즉시 전부 출력
export function finishTyping(){

    typing.visibleText =
        typing.fullText;

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