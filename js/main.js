


const sleep = ms => new Promise(res => setTimeout(res, ms));

class Snake{
    UP=0;
    height=0
    width=0
    x=[]
    y=[]
    g=null
    lost = false
    constructor(g){
        this.g=g
        this.height=this.g.height
        this.width=this.g.width
        this.x = [this.width/2, this.width/2-1, this.width/2-2]
        this.y = [this.height/2, this.height/2, this.height/2]
    }
    reset(){
        this.x = [this.width/2, this.width/2-1, this.width/2-2]
        this.y = [this.height/2, this.height/2, this.height/2]
        this.lost=false
    }

    controlBodyFaceHit(){
        for(var i=0; i<this.x.length-1; i++){
            for(var j=i+1; j<this.x.length; j++){
                if(this.x[i]==this.x[j] && this.y[i]==this.y[j]){
                    this.lost=true
                }
            }
        }
    }
    down(){
        for(var i=this.x.length-1; i>0; i--){
            this.y[i]=this.y[i-1]
            this.x[i]=this.x[i-1]
        }
        if(this.y[i]+1<this.height){
            this.y[i]++
        }else{
            this.lost = true
        }
    }
    up(){
        for(var i=this.x.length-1; i>0; i--){
            this.x[i]=this.x[i-1]
            this.y[i]=this.y[i-1]
        }
        if(this.y[i]-1>=0){
            this.y[i]--
        }else{
            this.lost = true
        }
        
        
    }
    left(){
        
        for(var i=this.x.length-1; i>0; i--){
            this.x[i]=this.x[i-1]
            this.y[i]=this.y[i-1]
        }
       if(this.x[i]-1>=0){
            this.x[i]--
       }else{
            this.lost = true
       }
       
       
    }
    right(){
        for(var i=this.x.length-1; i>0; i--){
            this.x[i]=this.x[i-1]
            this.y[i]=this.y[i-1]
        }
        if(this.x[i]+1<this.width){
            this.x[i]++
        }else{
            this.lost = true
        }
    }
    add(){
        this.x.push(this.x[this.x.lenght-1])
        this.y.push(this.y[this.y.lenght-1])
    }
}

class Apple{
    g = null
    x = 0
    y = 0
    constructor(g){
        this.g = g
    }
    generate(){
        this.x = Math.floor(Math.random()*this.g.width)
        this.y = Math.floor(Math.random()*this.g.height)
    }
}


class Game{
    /*
        Diretction TABLE:
        0 - UP
        1 - RIGTH
        2 - DOWN
        3 - LEFT
    */

    //Key mapping
    key_up = [87]
    key_right = [68]
    key_down = [83]
    key_left = [65]
    constructor( width, height, block_l, margin, ctx, points_label){
        this.started=false
        this.points=0
        this.height = height
        this.width = width
        this.margin = margin
        this.block_l = block_l
        this.margin = margin
        this.ctx = ctx
        this.ctx.canvas.width = (this.width*block_l) + (margin*2)
        this.ctx.canvas.height = (this.height*block_l) + (margin*2)
        this.current_direction = 1
        this.next_direction = 1
        this.snake = new Snake(this)
        this.apple = new Apple(this)
        this.points_label=points_label
        this.onGame = false
    }
    drawRect(x, y){
        this.ctx.fillRect((x*this.block_l)+this.margin, (y*this.block_l)+this.margin, this.block_l, this.block_l)
    }
    draw(){

        this.ctx.fillStyle = "#F44336" //Margin color
        this.ctx.fillRect(0,0,canvas.width,canvas.height)
        this.ctx.fillStyle = "#333" //Background color
        this.ctx.fillRect(this.margin, this.margin, this.width*this.block_l, this.height*this.block_l)
        this.ctx.fillStyle = "#FF5722" //Apple color
        this.drawRect(this.apple.x, this.apple.y)
        var i = this.snake.x.length-1
        this.ctx.fillStyle = "white"//Snake body color
        for(; i>0 ; i--){
            this.drawRect(this.snake.x[i], this.snake.y[i])
        }
        
        this.ctx.fillStyle = "#FF9800" //Snake head color
        this.drawRect(this.snake.x[i], this.snake.y[i])

    }
    drawRectSlow(x, y){
        this.ctx.fillRect((x*this.block_l/10)+this.margin, (y*this.block_l/10)+this.margin, this.block_l, this.block_l)
    }
    drawSlow(){

        this.ctx.fillStyle = "#F44336" //Margin color
        this.ctx.fillRect(0,0,canvas.width,canvas.height)
        this.ctx.fillStyle = "#333" //Background color
        this.ctx.fillRect(this.margin, this.margin, this.width*this.block_l, this.height*this.block_l)
        this.ctx.fillStyle = "#FF5722" //Apple color
        this.drawRect(this.apple.x, this.apple.y)
        var i = this.snake.x.length-1
        this.ctx.fillStyle = "white"//Snake body color
        for(; i>0 ; i--){
            this.drawRect(this.snake.x[i], this.snake.y[i])
        }
        
        this.ctx.fillStyle = "#FF9800" //Snake head color
        this.drawRect(this.snake.x[i], this.snake.y[i])

    }
    reset(){
        this.points=0
        this.started=false
        this.snake.reset()
        this.onGame=false

        this.current_direction = 1
        this.next_direction = 1
        
        this.initialize()
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    refresh(){
        this.current_direction = this.next_direction
        switch(this.current_direction){
            case 0:
                this.snake.up()
                break
            case 1:
                this.snake.right()
                break
            
            case 2:
                this.snake.down()
                break
            case 3:
                this.snake.left()
                break
        }
        this.controlApple()
        this.snake.controlBodyFaceHit()
        if(!this.snake.lost){
            this.draw()
        }else{
            this.onGame=false
            this.lostScreen()
        }
    }
    controlApple(){
        for(var i=0; i<this.snake.x.length; i++){
            if(this.snake.x[i] == this.apple.x && this.snake.y[i] == this.apple.y){
                this.points++
                this.points_label.innerHTML = "<p>Points: "+ this.points+ "</p>"
                this.apple.generate()
                this.snake.add()
            }
        }
                
    }
    lostScreen(){
        if(!this.onGame){
            this.reset()
        }
    }

    
    changeKeyMapping(up, right, down, left){
        this.key_up = up
        this.key_right = right
        this.key_down = down
        this.key_left = left
    }
    addKeyMapping(up, right, down, left){
        if(!this.key_up.includes(up)){
            this.key_up.push(up)
        }
        
        if(!this.key_right.includes(right)){
            this.key_right.push(right)
        }
        
        if(!this.key_down.includes(down)){
            this.key_down.push(down)
        }
        
        if(!this.key_left.includes(left)){
            this.key_left.push(left)
        }
    }
    keyGamePressed(event){
        if(this.started){
            if(this.key_up.includes(event.keyCode)) {
                if(this.current_direction!== 2){
                    this.next_direction=0
                }
            }

            else if(this.key_right.includes(event.keyCode)) {
                if(this.current_direction!== 3){
                    this.next_direction=1
                }
            }
            else if(this.key_down.includes(event.keyCode)) {
                if(this.current_direction!== 0){
                    this.next_direction=2
                }
            }
            else if(this.key_left.includes(event.keyCode)) {
                if(this.current_direction!== 1){
                    this.next_direction=3
                }
            }
        
        }
    }
    start(evnt){
        if(!this.started && !this.key_left.includes(event.keyCode)){
            this.onGame=true
            this.started=true;
            if(this.key_up.includes(event.keyCode)) {
                this.next_direction=0
            }

            else if(this.key_right.includes(event.keyCode)) {
                this.next_direction=1
            }
            else if(this.key_down.includes(event.keyCode)) {
                this.next_direction=2
            }
            document.addEventListener('keydown', ev=>this.keyGamePressed(ev));
            (async () => {
                var a=0
                while(this.onGame){
                    await sleep(100)
                    this.refresh()
                }
            })();
        }
        
        
    }
    initialize(){
        this.apple.generate()
        this.draw()
        document.addEventListener('keydown', ev=>this.start(ev))
        
        
    }

}


var points = document.getElementById('game-points')
var canvas = document.getElementById("game-content")
var context = canvas.getContext('2d')
game = new Game(40, 30, 20, 10, context, points) // (canvas height in blocks, canvas width in blocks, block size, margin, canvas context)
game.addKeyMapping(38, 39, 40, 37)
game.initialize()




