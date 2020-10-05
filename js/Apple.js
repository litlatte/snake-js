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