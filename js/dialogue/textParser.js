// =====================================
// Text Parser
// =====================================

export function parseText(text){

    const result = [];
    let i = 0;

    while(i < text.length){

        // 태그
        if(text[i] === "["){

            let tag = "";
            i++;

            while(
                i < text.length &&
                text[i] !== "]"
            ){

                tag += text[i];
                i++;

            }

            // ] 건너뛰기
            i++;

            result.push(parseTag(tag));

            continue;
        }

        // 일반 문자
        result.push({
            type:"text",
            value:text[i]
        });

        i++;
    }
    return result;
}


function parseTag(tag){

    // wait
    if(tag.startsWith("wait=")){

        return{
            type:"wait",
            value:Number(tag.substring(5))
        };

    }

    // speed
    if(tag.startsWith("speed=")){

        return{
            type:"speed",
            value:Number(tag.substring(6))
        };

    }

    // 시작 태그
    if(tag.startsWith("color=")){

        return{
            type:"color",
            value:tag.substring(6)
        };

    }

    // 종료 태그
    if(tag === "/color"){

        return{
            type:"endcolor"
        };

    }

    // 알 수 없는 태그
    return{
        type:"unknown",
        value:tag
    };

}