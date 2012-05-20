LightChaser.MenuItem = function(i,w,h,img, funct,en) {
    var enabled;
    var width;
    var height; 
    var mouseOver;
    var x;
    var y;
    
    this.getId = function(){
        return i;
    }
    this.isMouseOver = function(){
        return mouseOver
    }
    this.onClick = funct;
    this.setEnabled = function(e){
        enabled = e;
    }
    this.isEnabled = function(){
        return enabled;
    }
    this.getImage = function(){
        return img;
    }
    this.getWidth = function(){
        return width;
    }
    this.getHeight = function(){
        return height;
    }
    this.setX = function(i){
        x = i;
    }
    this.setY = function(i){
        y = i;
    }
    this.getX = function(){
        return x;
    }
    this.getY = function(){
        return y;
    }
    this.getArea = function(){
        return {
            'x':x,
            'y':y,
            'ex':(x+width),
            'ey':(y+height)
        }
    }
    this.setMouseOver = function(b){
        mouseOver = b;
    }
    this.setWidth = function(i){
        width = i;
    }
    enabled = en;
    width = w;
    height = h;
    mouseOver = false;
}