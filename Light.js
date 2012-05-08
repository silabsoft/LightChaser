LightChaser.Light = function(gridX,gridY,size) {
    var quad;
    var gridX;
    var gridY;
    var size;
    var state = false;	
    var mouseOver = false;
    this.getState = function(){
        return state;
    },
    
    //if true will also change adjacent states
    this.changeState = function(isInital){
        state = !state;
        if(isInital){
            if(quad != null){
                for (var i = 0; i < quad.length; i++){
                    quad[i].changeState(false);               
                }
            }   
        }
    },
    this.draw = function(ctx,startX,startY){
        ctx.fillStyle= !mouseOver? "#000000" : "#ffffff";
        ctx.fillRect((gridX*size)+startX,(gridY*size)+startY,size,size);
        ctx.fillStyle= !state ? "#585858": "#FF3333";
        ctx.fillRect(((gridX*size)+2)+startX,((gridY*size)+2)+startY,size-4,size-4);
    },
    this.getArea = function(){
        return 	{
            'x': (gridX*size), 
            'y': (gridY*size),
            'ex':((gridX*size)+size),
            'ey':((gridY*size)+size)
        };
    },
    this.setNeighbor = function(lights){
        quad = lights;
    };
    this.getMouseOver = function(){
        return mouseOver;
    }
    this.setMouseOver = function(b){
        mouseOver = b;
    }
    this.gridX = gridX;
    this.gridY = gridY;
    this.size = size;
};
