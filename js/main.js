


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
        for(var j=1; j<this.x.length; j++){
            if(this.x[0]==this.x[j] && this.y[0]==this.y[j]){
                this.lost=true
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
    constructor( width, height, block_l, margin, ctx, points_label, points_record_label){
        this.bg_color = "#2f5755"
        this.snake_body_color = "#263238"
        this.snake_head_color = "#263238"
        this.apple_color = "#f65c51"
        this.margin_color = "#e5243f"
        this.totalParts=10
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
        this.record=0
        this.points_record_label=points_record_label
        this.onGame = false
    }

    setFrames(frames){
        this.totalParts=number
    }

    drawRect(x, y){
        this.ctx.fillRect((x*this.block_l)+this.margin, (y*this.block_l)+this.margin, this.block_l, this.block_l)
    }
    draw(){
        this.ctx.fillStyle = this.margin_color //Margin color
        this.ctx.fillRect(0,0,canvas.width,canvas.height)
        this.ctx.fillStyle = this.bg_color
        this.ctx.fillRect(this.margin, this.margin, this.width*this.block_l, this.height*this.block_l)
        this.ctx.fillStyle = this.apple_color //Apple color
        this.drawRect(this.apple.x, this.apple.y)
        var i = this.snake.x.length-1
        this.ctx.fillStyle = this.snake_body_color//Snake body color
        this.drawRect(this.snake.x[i], this.snake.y[i])
        i--
        for(; i>0 ; i--){
            this.drawRect(this.snake.x[i], this.snake.y[i])
        }
        
        this.ctx.fillStyle = this.snake_head_color //Snake head color
        this.drawRect(this.snake.x[i], this.snake.y[i])

    }

    drawTalePart(x, y, part, orientation){
        var pos_x = x*this.block_l
        var pos_y = y*this.block_l
        var block_part = this.block_l /this.totalParts
        switch(orientation){
            case 0:
                pos_y+=block_part*part
                break
            case 1:
                pos_x-=block_part*part
                break
            case 2:
                
                pos_y-=block_part*part
                break
            case 3:
                pos_x+=block_part*part
                break
        }
        
        this.ctx.fillRect(pos_x+this.margin, pos_y+this.margin, this.block_l, this.block_l)
    }
    drawHeadPart(x, y, part, orientation=this.current_direction){
        var pos_x = x*this.block_l
        var pos_y = y*this.block_l
        var block_part = this.block_l /this.totalParts
        switch(orientation){
            case 0:
                pos_y-=block_part*part
                break
            case 1:
                pos_x+=block_part*part
                break
            case 2:
                pos_y+=block_part*part
                break
            case 3:
                pos_x-=block_part*part
                break
        }
        
        this.ctx.fillRect(pos_x+this.margin, pos_y+this.margin, this.block_l, this.block_l)
    }

    drawAnimation(p){
            this.ctx.fillStyle =  this.margin_color//Margin color
            this.ctx.fillRect(0,0,canvas.width,canvas.height)
            this.ctx.fillStyle = this.bg_color //Background color
            this.ctx.fillRect(this.margin, this.margin, this.width*this.block_l, this.height*this.block_l)
            this.ctx.fillStyle = this.apple_color
            this.drawRect(this.apple.x, this.apple.y)
            var i = this.snake.x.length-1
            this.ctx.fillStyle = this.snake_body_color//Snake body color
            
            if(this.snake.y[i-1]>this.snake.y[i]){
                //The snake tale is oriented towards up
                this.drawTalePart(this.snake.x[i], this.snake.y[i], p, 0)

            }else{
                if(this.snake.x[i-1]<this.snake.x[i]){
                    //The snake tale is oriented towards right
                    this.drawTalePart(this.snake.x[i], this.snake.y[i], p, 1)
    
                }else{
                    if(this.snake.y[i-1]<this.snake.y[i]){
                        //The snake tale is oriented towards down
                        this.drawTalePart(this.snake.x[i], this.snake.y[i], p, 2)
        
                    }else{
                        if(this.snake.x[i-1]>this.snake.x[i]){
                            //The snake tale is oriented towards left
                            this.drawTalePart(this.snake.x[i], this.snake.y[i], p, 3)
            
                        }
                    }
                }
            }
            
            i--
            
            for(; i>0 ; i--){
                this.drawRect(this.snake.x[i], this.snake.y[i])
            }
            this.drawRect(this.snake.x[i], this.snake.y[i])
            this.ctx.fillStyle = this.snake_head_color //Snake head color
            this.drawHeadPart(this.snake.x[i], this.snake.y[i], p)

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
            if(this.points>this.record){
                this.record =this.points
                this.points_record_label.innerHTML=`<p>Record: ${this.record}</p>`
            }
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
        if(!this.started && (this.key_up.includes(event.keyCode) | this.key_down.includes(event.keyCode) | this.key_right.includes(event.keyCode) )){
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
                        for(var p=1; p<=this.totalParts; p++){
                            await sleep(10)
                            this.drawAnimation(p)
                        }
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
var points_record = document.getElementById('game-points-record')

var canvas = document.getElementById("game-content")
var context = canvas.getContext('2d')
game = new Game(40, 30, 20, 10, context, points, points_record) // (canvas height in blocks, canvas width in blocks, block size, margin, canvas context)
game.initialize()
