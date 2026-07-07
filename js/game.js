// Canvas 가져오기
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// 게임 화면 크기
canvas.width = 960;
canvas.height = 540;

// 플레이어 정보
const player = {
    x: 100,
    y: 100,
    width: 32,
    height: 32,
    speed: 3
};

// 현재 눌린 키를 저장할 객체
const keys = {};

// 키를 누르면 true
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

// 키를 떼면 false
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// 플레이어 이동 계산
function update() {

    if (keys["ArrowUp"]) {
        player.y -= player.speed;
    }

    if (keys["ArrowDown"]) {
        player.y += player.speed;
    }

    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    if (keys["ArrowRight"]) {
        player.x += player.speed;
    }

}

// 화면 그리기
function draw() {

    // 배경
    ctx.fillStyle = "#7fc97f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 플레이어
    ctx.fillStyle = "red";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}

// 게임 반복
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

// 게임 시작
gameLoop();
