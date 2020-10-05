


const sleep = ms => new Promise(res => setTimeout(res, ms));








var points = document.getElementById('game-points')
var points_record = document.getElementById('game-points-record')

var canvas = document.getElementById("game-content")
var context = canvas.getContext('2d')
game = new Game(40, 30, 20, 10, context, points, points_record) // (canvas height in blocks, canvas width in blocks, block size, margin, canvas context)
game.initialize()