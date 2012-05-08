LightChaser.GameManager	=	function() {
    const TICK = 60.0;
    var gameWidth = 700;
    var gameHeight = 500
    var imgTemp;
    var context;
    var gameGrid;
    var canvasX;
    var canvasY;
    var temp = 0;
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
            imgTemp.src = "resources/silabsoft.png";
            gameGrid = new LightChaser.GameGrid(context,5,0,0,500,500);
            canvasX = $('#gameCanvas').offset().left;
            canvasY = $('#gameCanvas').offset().top;
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
                case "TITLE":
                case "NEXT_LEVEL":
                    gameGrid.draw(context);
                    break;
            }	
            
            
        }
    };
}();
	
	