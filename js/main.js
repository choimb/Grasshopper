// =====================================
// Project Grasshopper
// Main
// =====================================

import "./input.js";

import { startEngine } from "./engine.js";

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

// 게임 내부 해상도
canvas.width = 832;
canvas.height = 576;

// 엔진 시작
startEngine(canvas, ctx);