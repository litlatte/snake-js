var points = document.getElementById('game-points')//Gets the label where the points will be showed
var points_record = document.getElementById('game-points-record')//Gets the label where the record points will be showed

var canvas = document.getElementById("game-content")//Gets canvas element where the game will be showed
var buttonsContainer = this.window.innerHeight>this.window.innerWidth?document.getElementById("game-buttons"):null//Gets the element to show the controls for mobile devices, this is optional
var context = canvas.getContext('2d')//Gets the context from the canvas

var cvWidth = 40;//Canvas width expressed in blocks
var cvHeight = Math.floor(cvWidth*(3/4));//Calculates the height of canvas based on cvWidth in this case will be 40

var block_sz = this.window.innerHeight<this.window.innerWidth?(Math.floor((this.window.innerWidth/(2*cvWidth))-(this.window.innerWidth/cvWidth)/12)):Math.floor(this.window.innerWidth/cvWidth)-1;//Calculates block size
//the block size could also be a constant e.g. var block_sz=20 but this will reduce cross platform support

game = new Game(cvWidth, cvHeight, block_sz, Math.floor(block_sz), context, points, points_record, buttonsContainer) // Instance of Game(canvas width in blocks, canvas height in blocks, block size, margin, canvas context, buttonsContainer) "buttonsContainer" is optional
game.setBtnCssClass("btn-primary m-1 p-2")//Sets the class for the directional buttons, optional
game.initialize()//Initializes the instance