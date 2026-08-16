// =====================================
// Audio Manager
// =====================================

const audioContext = new AudioContext();

const voiceCount = {
    player:3,
    digitalBread:3,
    memod:3,
    busanKAL:3,
    dongtanC:3,
    Parkthunder:3
};


// BGM
let currentBGM = null;
let currentBGMName = "";
let currentMapBGM = "";
let bgmFadeTime = 800; // ms

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

export async function playBGM(name, transition = "instant"){
    currentBGMName = name;

    // =====================================
    // Instant
    if(transition === "instant"){
        stopBGM();
        currentBGM = new Audio(
            `assets/audio/bgm/${name}.mp3`
        );

        currentBGM.loop = true;
        currentBGM.volume = bgmVolume;

        currentBGM.play().catch(error=>{
            console.warn(
                "BGM 재생 실패:",
                error
            );
        });
        return;
    }

    // =====================================
    // Fade / Crossfade
    const oldBGM = currentBGM;
    const newBGM = new Audio(
        `assets/audio/bgm/${name}.mp3`
    );

    newBGM.loop = true;
    newBGM.volume = 0;

    // 사용자 입력 직후 재생 시작
    try{
        await newBGM.play();
    }
    catch(error){
        console.warn(
            `BGM 재생 실패: ${name}`,
            error
        );
        return;
    }

    currentBGM = newBGM;

    if(oldBGM){
        await Promise.all([

            fadeAudio(
                oldBGM,
                oldBGM.volume,
                0,
                bgmFadeTime
            ),

            fadeAudio(
                newBGM,
                0,
                bgmVolume,
                bgmFadeTime
            )

        ]);

        oldBGM.pause();
        oldBGM.currentTime = 0;
    }
    else{
        await fadeAudio(
            newBGM,
            0,
            bgmVolume,
            bgmFadeTime
        );
    }
}

export function stopBGM(){
    if(!currentBGM) return;

    currentBGM.pause();
    currentBGM.currentTime = 0;

    currentBGM = null;
    currentBGMName = "";
}

export function pauseBGM(){
    if(!currentBGM) return;
    currentBGM.pause();
}

export function resumeBGM(){
    if(!currentBGM) return;
    currentBGM.play();
}

export function setMapBGM(name){
    currentMapBGM = name;
}

export function playMapBGM(transition = "instant"){
    if(currentMapBGM){
        playBGM(
            currentMapBGM,
            transition
        );
    }
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

    if(audioContext.state === "suspended"){
        await audioContext.resume();
    }

    // 등록된 샘플 개수
    const count = voiceCount[name] ?? 1;

    // 랜덤 번호 선택
    const index =
        Math.floor(Math.random() * count) + 1;

    // 실제 파일 이름
    const fileName =
        `${name}_${index}`;

    // 캐시에 없으면 로드
    if(!voiceBuffers[fileName]){

        voiceBuffers[fileName] =
            await loadAudio(
                `assets/audio/voice/${fileName}.mp3`
            );

    }

    const source =
        audioContext.createBufferSource();

    source.buffer =
        voiceBuffers[fileName];

    // 랜덤 피치
    source.playbackRate.value =
        0.92 + Math.random() * 0.16;

    const gain =
        audioContext.createGain();

    gain.gain.value = voiceVolume;

    source.connect(gain);
    gain.connect(audioContext.destination);

    source.start();

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

export function setBGMFadeTime(ms){
    bgmFadeTime = ms;
}

function fadeAudio(audio, from, to, duration){
    return new Promise(resolve=>{

        if(!audio){
            resolve();
            return;
        }

        const start = performance.now();
        function update(now){

            const t =
                Math.min(
                    (now - start) / duration,
                    1
                );

            audio.volume =
                from + (to - from) * t;

            if(t < 1){
                requestAnimationFrame(update);
            }
            else{
                resolve();
            }
        }
        requestAnimationFrame(update);
    });
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