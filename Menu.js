LightChaser.Menu = function() {
    var x;
    var y;
    var width;
    var height;
    var menuItem;
    this.init = function(setX,setY,w,h){
        menuItem = [];
        x = setX;
        y = setY;
        width = w;
        height = h;
    };
    this.pushMenuItem = function(item){ 
        if(item.getWidth() > width)
            item.setWidth(width -4);
        item.setX(2);
        var h = 0;
        for(var i = 0; i < menuItem.length; i++){
            h+= menuItem[i].getHeight()+4;
        }
        item.setY(2+h);
        menuItem.push(item);
        
    };
    this.removeMenuItemById = function(id){
        for(var i = 0; i < menuItem.length; i++){
            if(menuItem[i].getId() == id){
                menuItem.remove(menuItem[i])
            }
        }
    };
    this.getMenuItemById = function(id){
        for(var i = 0; i < menuItem.length; i++){
            if(menuItem[i].getId() == id){
                return menuItem[i];
            }
        }    
    return null;
    }
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
this.update = function(mouse,click){
    if(mouse != null){
        for (var i = 0; i < menuItem.length; i++){
            if(!menuItem[i].isEnabled())
                continue;
               
            var area = menuItem[i].getArea();
            if(mouse.x > (area.x+x) && mouse.x < (area.ex+x) && mouse.y > (area.y+y) && mouse.y < (area.ey+y)){
                menuItem[i].setMouseOver(true);
            }
            else{
                if(menuItem[i].isMouseOver())
                    menuItem[i].setMouseOver(false);
            }
        } 
    }
    if(click != null){
        for(var c = 0; c < click.length; c++){
            var button = getButtonForClick(click[c]);
            if(button != null){  
                button.onClick();
            }
        }
    }
};
    
this.draw = function(context){
    //  context.fillStyle="#ff0233";
    //  context.fillRect(this.x,this.y,this.width,this.height);
    for(var i = 0; i < menuItem.length; i++){
        if(!menuItem[i].isEnabled())
            continue;
        if(menuItem[i].isMouseOver()){
            context.fillStyle = "#ffffff";
            context.fillRect((x+menuItem[i].getX()-1),(y+menuItem[i].getY()-1),menuItem[i].getWidth()+2,menuItem[i].getHeight()+2);
        }
          
        context.drawImage(menuItem[i].getImage(),(x+menuItem[i].getX()),(y+menuItem[i].getY()),menuItem[i].getWidth(),menuItem[i].getHeight());
    }
         
};
function getButtonForClick(click){
    for (var i = 0; i < menuItem.length; i++){
        if(!menuItem[i].isEnabled())
            continue;
              
        var area = menuItem[i].getArea();
        if(click.x > (area.x+x) && click.x < (area.ex+x) && click.y > (area.y+y) && click.y < (area.ey+y)){
            return menuItem[i];
        }
           
    }
    return null;
}
}