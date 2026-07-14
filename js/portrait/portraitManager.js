// =====================================
// Portrait Manager
// =====================================

import { UILayout } from "../ui/uiLayout.js";

const portraitCache = {};

const slots = {
    left: createSlot(),
    right: createSlot()
};

function getPortrait(character, emotion){

    if(!portraitCache[character]){
        portraitCache[character] = {};
    }

    if(!portraitCache[character][emotion]){
        const img = new Image();
        img.src =
            `assets/portraits/${character}/${emotion}.png`;

        portraitCache[character][emotion] = img;
    }
    return portraitCache[character][emotion];
}

function createSlot(){
    return{
        visible:false,
        character:null,
        emotion:"normal",
        image:null,
        dimmed:false,
        opacity:1
    };
}


// Public
export function showPortrait({
    slot,
    character,
    emotion="normal"
}){
    const target = slots[slot];
    if(!target) return;

    target.visible = true;
    target.character = character;
    target.emotion = emotion;

    target.image =
        getPortrait(character, emotion);
}

export function hidePortrait(slot){
    if(!slots[slot]) return;
    slots[slot].visible = false;
}

export function hideAllPortraits(){
    hidePortrait("left");
    hidePortrait("right");
}

export function setEmotion(slot, emotion){
    const target = slots[slot];
    if(!target) return;
    target.emotion = emotion;

    target.image =
        getPortrait(
            target.character,
            emotion
        );
}

export function setDimmed(slot, value){
    if(!slots[slot]) return;
    slots[slot].dimmed = value;
}

export function getPortraitSlot(slot){
    return slots[slot];
}


// Draw
export function drawPortraits(ctx, canvas){
    drawSlot(ctx, canvas, slots.left, "left");
    drawSlot(ctx, canvas, slots.right, "right");
}

function drawSlot(ctx, canvas, slot, side){
    if(!slot.visible) return;
    if(!slot.image) return;

    const width = UILayout.portrait.width;
    const height = UILayout.portrait.height;

    const x =
    side === "left"
        ? UILayout.portrait.marginX
        : canvas.width - width - UILayout.portrait.marginX;

    const y =
    canvas.height - height - UILayout.portrait.marginBottom;

    ctx.save();
    ctx.globalAlpha = slot.opacity;

    ctx.filter =
        slot.dimmed
        ? "brightness(45%)"
        : "brightness(100%)";

    ctx.drawImage(
        slot.image,
        x,
        y,
        width,
        height
    );

    ctx.restore();

}

export function hasPortrait(slot){
    return slots[slot].visible;
}