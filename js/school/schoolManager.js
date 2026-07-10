// =====================================
// School Manager
// =====================================

import { classrooms } from "./classrooms.js";

let currentClassroom = classrooms["3A"];

// 현재 교실 가져오기
export function getCurrentClassroom(){
    return currentClassroom;
}

// 교실 변경
export function loadClassroom(classroomId){

    if(classrooms[classroomId]){
        currentClassroom = classrooms[classroomId];
    }
    else{
        console.warn("존재하지 않는 교실 :", classroomId);
    }

}