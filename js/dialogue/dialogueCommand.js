// =====================================
// Dialogue Command
// =====================================

import {
    playBGM,
    playSE
} from "../audio/audioManager.js";

export function executeCommand(data){
    switch(data.command){

        case "cg":
            console.log("CG", data.image);
        break;

        case "bgm":
            playBGM(
                data.name,
                data.transition ?? "instant"
            );
        break;

        case "se":
            playSE(data.name);
        break;

        case "shake":
            console.log("Shake");
        break;

        case "theme":
            console.log("Theme", data.name);
        break;

        default:
            console.warn(
                "Unknown command:",
                data.command
            );
    }

}