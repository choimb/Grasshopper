// =====================================
// Classrooms
// =====================================

// 모든 좌표는 바닥 타일 기준(grid)
// (0,0)이 교실 바닥의 좌측 상단

function createClassroom({
    grade,
    className,
    spawn,
    objects = [],
    npcs = []
}){

    return{
        grade,
        className,
        spawn,
        objects,
        npcs
    };
}

// 교실 목록
export const classrooms = {

    "3A":createClassroom({
        grade:3,
        className:"A",
        spawn:{
            gridX:4,
            gridY:6
        },

        objects:[

        // 학생 책상
        {
            id:"desk_default_left",
            gridX:0,
            gridY:2
        },
        {
            id:"desk_default_right",
            gridX:1,
            gridY:2
        },
        {
            id:"desk_default_left",
            gridX:3,
            gridY:2
        },
        {
            id:"desk_default_right",
            gridX:4,
            gridY:2
        },
        {
            id:"desk_default_left",
            gridX:6,
            gridY:2
        },
        {
            id:"desk_default_right",
            gridX:7,
            gridY:2
        },
        {
            id:"desk_default_left",
            gridX:0,
            gridY:4
        },
        {
            id:"desk_default_right",
            gridX:1,
            gridY:4
        }
        ],

        npcs:[

        {
            id:"digitalBread",
            gridX:5,
            gridY:2,
            direction:"down"
        },

        {
            id:"memod",
            gridX:4,
            gridY:0,
            direction:"down"
        }

        ]
    }),

    "3B":createClassroom({
        grade:3,
        className:"B"
    }),

    "3C":createClassroom({
        grade:3,
        className:"C"

    }),

    "2A":createClassroom({
        grade:2,
        className:"A"
    }),

    "2B":createClassroom({
        grade:2,
        className:"B"
    }),

    "2C":createClassroom({
        grade:2,
        className:"C"
    }),

    "1A":createClassroom({
        grade:1,
        className:"A"
    }),

    "1B":createClassroom({
        grade:1,
        className:"B"
    }),

    "1C":createClassroom({
        grade:1,
        className:"C"

    })

};