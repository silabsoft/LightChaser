LightChaser.GameGrid = function(contex,lightSquared,startX,startY,width,height) {
    var lights = [];
    var lightSquared;
    var width;
    var height;
    var startX;
    var startY;
    function getLightForClick(click){
       
        for (var i = 0; i < lightSquared; i++){
            for (var j = 0; j < lightSquared; j++){
                var area = lights[i][j].getArea();
                if(click.x > (area.x+startX) && click.x < (area.ex+startX) && click.y > (area.y+startY) && click.y < (area.ey+startY)){
                    return lights[i][j];
                }
            }
        }
        return null;
    }
    function isLevelFinished(){
        for (var i = 0; i < lightSquared; i++){
            for (var j = 0; j < lightSquared; j++){
                if(lights[i][j].getState())
                    return false;
            }
        }    
        return true;
    }
    this.buildGrid = function() {
        var size = width/lightSquared;
        for (var i = 0; i < lightSquared; i++) //generate the lights
        {
            lights[i]    =   [];
            for (var j = 0; j < lightSquared; j++)
                lights[i][j]	=	new LightChaser.Light(i,j, size);
        }
		
        for (var i = 0; i < lightSquared; i++) //set the Neighbor
        {
            for (var j = 0; j < lightSquared; j++)
            {
                var neighbor = [];
                var t = 0;
                if((i+1) < lightSquared)
                    neighbor.push(lights[i+1][j]);
                if((j+1) < lightSquared)
                    neighbor.push(lights[i][j+1]);
                if((i-1) >= 0)
                    neighbor.push(lights[i-1][j]);
                if((j-1) >= 0)
                    neighbor.push(lights[i][j-1]);
                lights[i][j].setNeighbor(neighbor);
            }
        }	
        //hard coded test level fuck yeah!
        lights[4][4].changeState(false);	
        lights[4][3].changeState(false);	
        lights[3][4].changeState(false);	 
    };	
    this.draw  =  function(ctx) {
        for (var i = 0; i < lightSquared; i++)
            for (var j = 0; j < lightSquared; j++)
                lights[i][j].draw(ctx,startX,startY);
    };
    this.update = function(mouse,click){
        if(mouse != null){
            for (var i = 0; i < lightSquared; i++){
                for (var j = 0; j < lightSquared; j++){
                    var area = lights[i][j].getArea();
                    if(mouse.x > (area.x+startX) && mouse.x < (area.ex+startX) && mouse.y > (area.y+startY) && mouse.y < (area.ey+startY)){
                        lights[i][j].setMouseOver(true);
                    }
                    else{
                        if(lights[i][j].getMouseOver())
                            lights[i][j].setMouseOver(false);
                    }
                }
            }
        }
        if(click != null){
            for(var c = 0; c < click.length; c++){
                var light = getLightForClick(click[c]);
                if(light != null){
                    light.changeState(true);
                    LightChaser.GameState.moveCount++;
                    if(isLevelFinished()){
                        for (var i = 0; i < lightSquared; i++){
                            for (var j = 0; j < lightSquared; j++){
                                lights[i][j].setMouseOver(false);
                            }
                        }
                        LightChaser.GameState.currentState = "SCORING";
                    }
                }
            }
        }
    }
    this.getArea = function(){
        return 	{
            'x': startX, 
            'y': startY,
            'ex':(startX+width),
            'ey': (startY+height)
        };
    }
    this.generateLevel = function(){
        for (var i = 0; i < lightSquared; i++){
            for (var j = 0; j < lightSquared; j++){
                if(getRandomInt(0,10) > 6){
                    lights[i][j].changeState(false);
                }
            }
        }
    }
    
    function getRandomInt(min, max)
    {
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.lightSquared = lightSquared;
    this.width = width;
    this.height = height;
    this.startX = startX;
    this.startY = startY;
    this.buildGrid();

};
