LightChaser.GameManager	=	function() {
    const TICK = 60.0;
    var gameWidth = 700;
    var gameHeight = 550
    var imgTemp;
    var context;
    var gameGrid;
    var canvasX;
    var canvasY;
    var temp = 0;
    var menu;
    var resourceURL = null;
    function preGameAnim(ctx){
        ctx.drawImage(imgTemp, 150, 233, 210, 44);	
    }
    function processClick(area,click){
        if(click == null){
            return null;
        }
        var clicks = [];
        for(var i = 0; i < click.length; i++){
            var c = click.shift(); 
            c.x -= canvasX;
            c.y -= canvasY;
            if(c.x > area.x && c.x < area.ex && c.y > area.y && c.y < area.ey){
                clicks.push(c);
                
            }
            else{
                click.push(c);
            }
        }
        if(clicks.length > 0){
            return clicks;
        }
        return null;
    }
    return {
        init: function() { 
            var canvas = document.getElementById("gameCanvas"); 
            context = canvas.getContext('2d');
            canvas.addEventListener('selectStart', function(e) {
                e.preventDefault();
                return false;
            },false);

            document.body.addEventListener('touchmove',function(event){
                event.preventDefault();
            },false);
            setTimeout(LightChaser.GameManager.loop, (1/TICK) * 1000);
            imgTemp = new Image();
            
            imgTemp.src = getResourceURI("silabsoft.png");
            console.log(imgTemp.src);
            gameGrid = new LightChaser.GameGrid(5,0,0,500,500);
            canvasX = $('#gameCanvas').offset().left;
            canvasY = $('#gameCanvas').offset().top;
            menu = new LightChaser.Menu();
            menu.init(502,0,198,500);
            //now for some shitty menu creating
            var img = new Image();
            img.src = getResourceURI("new_game_0.png");
            var mi = new LightChaser.MenuItem("New Game",200,50,img,function(){
                LightChaser.GameState.levelReset(gameGrid.getLevelId());
                gameGrid.generateLevel();
                LightChaser.GameState.lastLevelMoveCount = 0;
                LightChaser.GameState.currentState = "INGAME";

            },true);
            menu.pushMenuItem(mi);
            var imgb = new Image();
            imgb.src = getResourceURI("restart_level_0.png");
            mi = new LightChaser.MenuItem("Restart Level",200,50,imgb, function(){
                gameGrid.resetLevel();
                LightChaser.GameState.moveCount = 0;
            },false);
            menu.pushMenuItem(mi);
        },
        loop: function() { 
            LightChaser.GameManager.update();
            LightChaser.GameManager.draw();
            setTimeout(LightChaser.GameManager.loop, (1/TICK) * 1000);
        },
        update: function() {
            var mouse	=   LightChaser.InputManager.getMouse();
            mouse.x -= canvasX;
            mouse.y -= canvasY;
            var click   =   LightChaser.InputManager.getClickIfAny();
            
            switch(LightChaser.GameState.currentState){
                case "PREGAME":
                    temp++;
 
                    
                    if(temp > 200){
                        
                        LightChaser.GameState.currentState = "TITLE";
                    }
                    break;
                case "NEXT_LEVEL":
                    LightChaser.GameState.levelReset(gameGrid.getLevelId());
                    gameGrid.generateLevel();
                    
                    LightChaser.GameState.currentState = "INGAME";
                    break;
                    
                case "SCORING":
                    LightChaser.GameState.currentState = "NEXT_LEVEL";
                    rmi.setEnabled(false);
                    break;
                case "TITLE":
                    menu.update(mouse,processClick(menu.getArea(),click));
                   
                    break;
                case "INGAME":
                    gameGrid.update(mouse,processClick(gameGrid.getArea(),click));
                   var rmi = menu.getMenuItemById("Restart Level");
                   if(!rmi.isEnabled() && LightChaser.GameState.moveCount > 0){
              
                      rmi.setEnabled(true);
                   }
                   if(rmi.isEnabled() && LightChaser.GameState.moveCount == 0){
                       rmi.setEnabled(false);
                   }
                     menu.update(mouse,processClick(menu.getArea(),click));
                    break;
            }
        //   menu.update();
        },
        draw: function(){ 
            context.clearRect(0, 0, gameWidth, gameHeight);
            context.fillStyle="#C0C0C0";
            context.fillRect(0,0,gameWidth,gameHeight);
            
            switch(LightChaser.GameState.currentState){
                case "PREGAME":
                    preGameAnim(context);
                    break;
                case "SCORING":
                case "INGAME":
                    context.fillStyle = "Red";  
                    context.fillText("Level ID: "+gameGrid.getLevelId(), 10, 510);   
                    context.fillText("Move Count: "+LightChaser.GameState.moveCount,10, 520); 
                    context.fillStyle = "Blue";  
                    context.fillText("Last Level ID: "+LightChaser.GameState.lastLevelId, 10, 530);   
                    context.fillText("Last Level Move Count: "+LightChaser.GameState.lastLevelMoveCount, 10, 540);                    
                case "TITLE":
                case "NEXT_LEVEL":
                    
                    gameGrid.draw(context);
                    menu.draw(context);
                    break;
            }	

            
        }
    };
    
    //This function allows me to easily upload my localcopy to the webserver
    function getResourceURI(resourceName){
        return resourceURL == null ? "resources/"+resourceName : resourceURL+resourceName;
    }
}();
	
	