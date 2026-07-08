// =====================================
// Project Grasshopper
// MeTTook Engine
// Input Manager
// =====================================

// 모든 입력 상태를 저장
export const keys = {};

// -------------------------
// 키보드 입력
// -------------------------

window.addEventListener("keydown", (e) => {

    keys[e.code] = true;

});

window.addEventListener("keyup", (e) => {

    keys[e.code] = false;

});

// -------------------------
// 모바일 버튼
// -------------------------

const touchButtons = [

    ["up", "ArrowUp"],
    ["down", "ArrowDown"],
    ["left", "ArrowLeft"],
    ["right", "ArrowRight"],

    ["buttonA", "KeyZ"],
    ["buttonB", "KeyX"]

];

touchButtons.forEach(([id, key]) => {

    const button = document.getElementById(id);

    if (!button) return;

    const press = (e) => {

        e.preventDefault();
        keys[key] = true;

    };

    const release = (e) => {

        e.preventDefault();
        keys[key] = false;

    };

    button.addEventListener("touchstart", press);
    button.addEventListener("touchend", release);
    button.addEventListener("touchcancel", release);

});

export function isKeyPressed(key){
    if(keys[key]){
        keys[key] = false;
        return true;
    }
    return false;
}