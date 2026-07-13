// =====================================
// UI Manager
// =====================================

const themes = {

    school: {
        dialogueBox: new Image(),
        normal: new Image(),
        search: new Image(),
        complete: new Image(),
        pressZ: new Image()
    },

    horror: {
        dialogueBox: new Image(),
        normal: new Image(),
        search: new Image(),
        complete: new Image(),
        pressZ: new Image()
    }

};

// ---------- School ----------

themes.school.dialogueBox.src =
    "assets/ui/theme_school/dialogue_box.png";

themes.school.normal.src =
    "assets/ui/theme_school/normal.png";

themes.school.search.src =
    "assets/ui/theme_school/search.png";

themes.school.complete.src =
    "assets/ui/theme_school/complete.png";

themes.school.pressZ.src =
    "assets/ui/theme_school/press_z.png";


// ---------- Horror ----------

themes.horror.dialogueBox.src =
    "assets/ui/theme_horror/dialogue_box.png";

themes.horror.normal.src =
    "assets/ui/theme_horror/normal.png";

themes.horror.search.src =
    "assets/ui/theme_horror/search.png";

themes.horror.complete.src =
    "assets/ui/theme_horror/complete.png";

themes.horror.pressZ.src =
    "assets/ui/theme_horror/press_z.png";

let currentTheme = "school";

export function setUITheme(theme){

    if(themes[theme]){
        currentTheme = theme;
    }

}

export function getUITheme(){

    return themes[currentTheme];

}