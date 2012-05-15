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
            
            imgTemp.src = resourceURL == null ? "resources/silabsoft.png" : resourceURL+"silabsoft.png";
            console.log(imgTemp.src);
            gameGrid = new LightChaser.GameGrid(5,0,0,500,500);
            canvasX = $('#gameCanvas').offset().left;
            canvasY = $('#gameCanvas').offset().top;
        //    menu = new LightChaser.Menu(502,0,198,500);
         //   menu.init();
            //now for some shitty menu creating
      /*      var img = new Image();
            img.src = "./lightchaser/resources/resources/new_game_0.png";
            var imga = [];
            imga.push(img);
            var mi = new LightChaser.MenuItem(0,200,50,imga,function(){},true);
      //      menu.pushMenuItem(mi);
            imga = [];
            img = new Image();
            img.src = "./lightchaser/resources/restart_level_0.png";
            imga.push(img);           
            mi = new LightChaser.MenuItem(1,200,50,imga,function(){},false);
          //  menu.pushMenuItem(mi);
          */
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
                    break;
                case "TITLE":
                    LightChaser.GameState.currentState = "INGAME";
                    break;
                case "INGAME":
                    gameGrid.update(mouse,processClick(gameGrid.getArea(),click));
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
          //          menu.draw(context);
                    break;
            }	

            
        }
    };
}();
	
	