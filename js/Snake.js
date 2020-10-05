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