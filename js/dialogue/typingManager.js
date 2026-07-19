// =====================================
// Typing Manager
// =====================================

export const typing = {

    fullText:"",
    visibleText:"",

    index:0,
    tagBuffer:"",

    frame:0,
    speed:1,

    waitFrame:0,

    finished:true
};


// 새 문장 시작
export function startTyping(text){

    typing.fullText = text;
    typing.visibleText = "";

    typing.index = 0;
    typing.frame = 0;

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

    typing.frame++;

    if(typing.frame < typing.speed) return;

    typing.frame = 0;

    const char = typing.fullText[typing.index];

    if(char === "["){
        typing.tagBuffer = "";
        typing.index++;

        while(
            typing.index < typing.fullText.length &&
            typing.fullText[typing.index] !== "]"
        ){

            typing.tagBuffer +=
                typing.fullText[typing.index];

            typing.index++;
        }

        // ] 건너뛰기
        typing.index++;

        // wait 처리
        if(typing.tagBuffer.startsWith("wait=")){

            const value =
                Number(
                    typing.tagBuffer.substring(5)
                );

            if(!isNaN(value)){
                typing.waitFrame = value;
            }
        }
    }else{

        typing.visibleText += char;
        typing.index++;

    }

    if(
        typing.index >=
        typing.fullText.length
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