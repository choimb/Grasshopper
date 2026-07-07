const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

ctx.fillStyle = "#7fc97f";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="red";
ctx.fillRect(100,100,32,32);