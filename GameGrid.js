LightChaser.GameGrid = function(lightSquared,startX,startY,width,height) {
    var lights = [];
    var width;
    var height;
    var startX;
    var startY;
    var levelId = "";
    const levelKey=["A","B","C","D","E","V","W","X","Y","Z"];
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
    this.getLevelId = function(){
        return levelId;
    }
    this.generateLevel = function(){
        levelId = "";
        do{
            console.log("generating level");
            for (var i = 0; i < lightSquared; i++){
                levelId += levelKey[i];
                for (var j = 0; j < lightSquared; j++){
                    if(getRandomInt(0,10) > 6){
                        lights[i][j].changeState(false);
                        levelId += levelKey[5+j];
                    }
                }
            }
        }while(!solve());
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
    var mat;    
    var cols;   
    var m;      
    var n;     
    var np;     
    var r;     
    var maxr;   

    function solveProblem(goal) {
        var colcount = 5;
        var rowcount = 5;
        var size = colcount * rowcount;
        m = size;
        n = size;
        np = n + 1;
        initMatrix();
        for (var col = 0; col < colcount; col++)
            for (var row = 0; row < rowcount; row++)
                mat[row * colcount + col][n] = modulate(goal - lights[col][row].getState());
        return sweep();
    }
    function sweep() {
        for (r = 0; r < maxr; r++) {
            if (!sweepStep()) return false; // failed in founding a solution
            if (r == maxr) break;
        }
        return true; // successfully found a solution
    }

    function solve() {
        var col;
        var row;
        for (var goal = 0; goal < 2; goal++) {
            if (solveProblem(goal)) { // found an integer solution
                return true;
            }
        }
        // (aborted or) no solution
        return false
    }
    function modulate(x) {
        // returns z such that 0 <= z < imgcount and x == z (mod imgcount)
        if (x >= 0) return x % 2;
        x = (-x) % 2;
        if (x == 0) return 0;
        return 2 - x;
    }

    function a(i,j)   {
        return mat[i][cols[j]];
    }
    function gcd(x, y) { // call when: x >= 0 and y >= 0
        if (y == 0) return x;
        if (x == y) return x;
        if (x > y)  x = x % y; // x < y
        while (x > 0) {
            y = y % x; // y < x
            if (y == 0) return x;
            x = x % y; // x < y
        }
        return y;
    }
    function invert(value) { // call when: 0 <= value < imgcount
        // returns z such that value * z == 1 (mod imgcount), or 0 if no such z
        if (value <= 1) return value;
        var seed = gcd(value,2);
        if (seed != 1) return 0;
        var a = 1, b = 0, x = value;    // invar: a * value + b * imgcount == x
        var c = 0, d = 1, y = 2; // invar: c * value + d * imgcount == y
        while (x > 1) {
            var tmp = Math.floor(y / x);
            y -= x * tmp;
            c -= a * tmp;
            d -= b * tmp;
            tmp = a;
            a = c;
            c = tmp;
            tmp = b;
            b = d;
            d = tmp;
            tmp = x;
            x = y;
            y = tmp;
        }
        return a;
    }
    function sweepStep() {
        var i;
        var j;
        var finished = true;
        for (j = r; j < n; j++) {
            for (i = r; i < m; i++) {
                var aij = a(i,j);
                if (aij != 0)  finished = false;
                var inv = invert(aij);
                if (inv != 0) {
                    for (var jj = r; jj < np; jj++)
                        setmat(i,jj, a(i,jj) * inv);
                    doBasicSweep(i,j);
                    return true;
                }
            }
        }
        if (finished) { // we have: 0x = b (every matrix element is 0)
            maxr = r;   // rank(A) == maxr
            for (j = n; j < np; j++)
                for (i = r; i < m; i++)
                    if (a(i,j) != 0)  return false; // no solution since b != 0
            return true;    // 0x = 0 has solutions including x = 0
        }
        alert("Internal error - contact the author to obtain a full solver");
        return false;   // failed in finding a solution
    }


    function doBasicSweep(pivoti, pivotj) {
        if (r != pivoti) swap(mat,r,pivoti);
        if (r != pivotj) swap(cols,r,pivotj);
        for (var i = 0; i < m; i++) {
            if (i != r) {
                var air = a(i,r);
                if (air != 0)
                    for (var j = r; j < np; j++)
                        setmat(i,j, a(i,j) - a(r,j) * air);
            }
        }
    }

    function swap(array,x,y) {
        var tmp  = array[x];
        array[x] = array[y];
        array[y] = tmp;
    }

    function setmat(i,j,val) {
        mat[i][cols[j]] = modulate(val);
    }

    function modulate(x) {
        // returns z such that 0 <= z < imgcount and x == z (mod imgcount)
        if (x >= 0) return x % 2;
        x = (-x) % 2;
        if (x == 0) return 0;
        return 2 - x;
    }
    function initMatrix() {
        maxr = Math.min(m,n);
        mat = new Array();
        for (var col = 0; col < 5; col++)
            for (var row = 0; row < 5; row++) {
                var i = row * 5 + col;
                var line = new Array();
                mat[i] = line;
                for (var j = 0; j < n; j++) line[j] = 0;
                line[i] = 1;
                if (col > 0)            line[i - 1]        = 1;
                if (row > 0)            line[i - 5] = 1;
                if (col < 5 - 1) line[i + 1]        = 1;
                if (row < 5 - 1) line[i + 5] = 1;
            }
        cols = new Array();
        for (var j = 0; j < np; j++) cols[j] = j;
    }
};
