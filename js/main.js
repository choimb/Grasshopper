// =====================================
// Project Grasshopper
// Main
// =====================================

import "./input.js";

import { startEngine } from "./engine.js";

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

// 게임 내부 해상도

canvas.width = 960;
canvas.height = 544;

// 엔진 시작

startEngine(canvas, ctx);