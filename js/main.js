const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

// 내부 게임 해상도
canvas.width = 960;
canvas.height = 544;

// 테스트 화면

ctx.fillStyle="#7fc97f";
ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);

ctx.fillStyle="red";

ctx.fillRect(
    100,
    100,
    32,
    32
);
