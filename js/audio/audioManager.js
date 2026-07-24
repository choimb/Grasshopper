// =====================================
// Audio Manager
// =====================================

const audioContext = new AudioContext();


// BGM
let currentBGM = null;

// SE Cache
const seBuffers = {};

// Voice Cache
const voiceBuffers = {};

// Volume
let bgmVolume = 1;
let seVolume = 1;
let voiceVolume = 1;


// =====================================
// BGM

export function playBGM(name){
    stopBGM();

    currentBGM = new Audio(
        `assets/audio/bgm/${name}.mp3`
    );

    currentBGM.loop = true;
    currentBGM.volume = bgmVolume;

    currentBGM.play().catch(error=>{
        console.warn("BGM 재생 실패:", error);
    });
}

export function stopBGM(){
    if(!currentBGM) return;

    currentBGM.pause();
    currentBGM.currentTime = 0;

    currentBGM = null;
}

export function pauseBGM(){
    if(!currentBGM) return;
    currentBGM.pause();
}

export function resumeBGM(){
    if(!currentBGM) return;
    currentBGM.play();
}


// =====================================
// Sound Effect

export async function playSE(name){

    if(audioContext.state === "suspended"){
        await audioContext.resume();
    }

    // 캐시에 없으면 로드
    if(!seBuffers[name]){

        seBuffers[name] =
            await loadAudio(
                `assets/audio/se/${name}.mp3`
            );

    }

    const source =
        audioContext.createBufferSource();

    source.buffer = seBuffers[name];

    const gain =
        audioContext.createGain();

    gain.gain.value = seVolume;

    source.connect(gain);
    gain.connect(audioContext.destination);

    source.start();

}


// =====================================
// Voice

export async function playVoice(name){

}


// =====================================
// Volume

export function setBGMVolume(volume){

    bgmVolume = volume;

    if(currentBGM){
        currentBGM.volume = volume;
    }

}

export function setSEVolume(volume){

    seVolume = volume;

}

export function setVoiceVolume(volume){

    voiceVolume = volume;

}


// =====================================
// Internal

async function loadAudio(path){

    const response = await fetch(path);

    const arrayBuffer = await response.arrayBuffer();

    return await audioContext.decodeAudioData(
        arrayBuffer
    );

}