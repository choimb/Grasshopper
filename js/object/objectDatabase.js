// =====================================
// Object Database
// =====================================


// Common
const OBJECT_SIZE = 32;

const DESK_COLLISION = {
    x:1,
    y:12,
    width:29,
    height:20
};

const CHAIR_COLLISION = {
    x:9,
    y:15,
    width:13,
    height:10
};


// Image Loader
function loadImage(path){
    const image = new Image();
    image.src = path;
    return image;
}


// Split Object (상판/하판)
function createSplitObject({
    bottom,
    top,
    collision,

    width = OBJECT_SIZE,
    height = OBJECT_SIZE,
    offsetX = 0,
    offsetY = 0
}){
    return{
        type:"split",
        width,
        height,
        offsetX,
        offsetY,

        bottomImage:
            loadImage(bottom),
        topImage:
            loadImage(top),
        collision
    };
}

// Static Object (벽, TV 등)
function createStaticObject({
    image,
    width = OBJECT_SIZE,
    height = OBJECT_SIZE,
    offsetX = 0,
    offsetY = 0,
    collision = null
}){
    return{
        type:"static",
        width,
        height,
        offsetX,
        offsetY,
        image:
            loadImage(image),
        collision
    };
}

// Normal Object (의자, 휴지통, 화분 등)
function createNormalObject({
    image,
    collision = null,
    width = OBJECT_SIZE,
    height = OBJECT_SIZE,
    offsetX = 0,
    offsetY = 0
}){
    return{
        type:"normal",
        width,
        height,
        offsetX,
        offsetY,
        image:
            loadImage(image),
        collision
    };
}

// =====================================
// Database
export const objectDatabase={

    // 학생 책상
    desk_default_left:
        createSplitObject({

            bottom:
            "assets/objects/desk_default_left.png",
            top:
            "assets/objects/desk_left_top.png",
            collision:DESK_COLLISION

        }),

    desk_default_right:
        createSplitObject({

            bottom:
            "assets/objects/desk_default_right.png",
            top:
            "assets/objects/desk_right_top.png",
            collision:DESK_COLLISION

        }),

    desk_empty_left:
        createSplitObject({

            bottom:
            "assets/objects/desk_empty_left.png",
            top:
            "assets/objects/desk_left_top.png",
            collision:DESK_COLLISION

        }),

    desk_empty_right:
        createSplitObject({

            bottom:
            "assets/objects/desk_empty_right.png",
            top:
            "assets/objects/desk_right_top.png",
            collision:DESK_COLLISION

        }),

    desk_side_left:
        createSplitObject({

            bottom:
            "assets/objects/desk_side_left.png",
            top:
            "assets/objects/desk_left_top.png",
            collision:DESK_COLLISION

        }),

    desk_side_right:
        createSplitObject({

            bottom:
            "assets/objects/desk_side_right.png",
            top:
            "assets/objects/desk_right_top.png",
            collision:DESK_COLLISION

        }),

    // --------------------
    // 교탁
    teacher_desk:
        createSplitObject({
            bottom:
            "assets/objects/teacher_desk_bottom.png",
            top:
            "assets/objects/teacher_desk_top.png",
            width:42,
            height:32,
            collision:{
                x:0,
                y:12,
                width:42,
                height:19
            }
        }),

    // --------------------
    // 학생 의자
    chair_front:
    createNormalObject({
        image:
        "assets/objects/chair_front.png",
        collision:CHAIR_COLLISION
    }),

    chair_back:
    createNormalObject({
        image:
        "assets/objects/chair_back.png",
        collision:CHAIR_COLLISION
    }),

    chair_left:
    createNormalObject({
        image:
        "assets/objects/chair_left.png",
        collision:CHAIR_COLLISION
    }),

    chair_right:
    createNormalObject({
        image:
        "assets/objects/chair_right.png",
        collision:CHAIR_COLLISION
    }),

    // --------------------
    // TV
    tv_off:
        createStaticObject({
            image:
            "assets/objects/tv_off.png",
            width:57,
            height:45
        }),

    // --------------------
    // 책장
    bookshelf:
        createStaticObject({
            image:
            "assets/objects/bookshelf.png",
            width:51,
            height:66,
            collision:{
                x:0,
                y:20,
                width:50,
                height:35
            }
        })


};