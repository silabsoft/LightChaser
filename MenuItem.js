LightChaser.MenuItem = function(id,width,height,images, funct,enabled) {
    var id;
    var images;
    var click;
    var enabled;
    var width;
    var height;
    var currentImage = 0;
    
    this.getId = function(){
        return id;
    }
    this.onMouseOver = function(){
        
    }
    this.onClick = function(){
        
    }
    this.setEnabled = function(enabled){
        enabled = enabled;
    }
    this.isEnabled = function(){
        return enabled;
    }
    this.getCurrentImage = function(){
       return images[currentImage];
    }
    this.getWidth = function(){
        return width;
    }
    this.getHeight = function(){
        return height;
    }
    this.id = id;
    this.images = images;
    this.click = funct;
    this.enabled = enabled;
    this.width = width;
    this.height = height;
    
}