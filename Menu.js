LightChaser.Menu = function(x,y,w,h) {
    var x;
    var y;
    var width;
    var height;
    var menuItem = [];
    this.init = function(){
        menuItem = [];
    };
    this.pushMenuItem = function(item){
        menuItem.push(item);
    };
    this.removeMenuItemById = function(id){
        for(var i = 0; i < menuItem.length(); i++){
            if(menuItem[i].getId() == id){
                menuItem.remove(menuItem[i])
            }
        }
    };
    this.getX = function (){
        return X
    };
    this.getY = function (){
        return y
    };
    this.getWidth= function(){
        return width
    };
    this.getHeight = function(){
        return height
    };
    this.getArea= function(){
        return {
            'x':x,
            'y':y,
            'ex':(x+width),
            'ey':(y+height)
        }
    };
    this.update = function(){
            
    };
    
    this.draw = function(context){
      //  context.fillStyle="#ff0233";
      //  context.fillRect(this.x,this.y,this.width,this.height);
        var y = 1;
        for(var i = 0; i < menuItem.length; i++){
                var iw = menuItem[i].getWidth();
                var ih = menuItem[i].getHeight();;
                context.drawImage(menuItem[i].getCurrentImage(),x+2,y,iw-8,ih);
                y += ih+5;
            }
         
    };

this.x = x;
this.y = y;
this.width = w;
this.height = h;

}