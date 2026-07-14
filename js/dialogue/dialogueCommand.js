// =====================================
// Dialogue Command
// =====================================

export function executeCommand(data){
    switch(data.command){

        case "cg":
            console.log("CG", data.image);
        break;

        case "bgm":
            console.log("BGM", data.name);
        break;

        case "se":
            console.log("SE", data.name);
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