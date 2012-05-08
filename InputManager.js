
LightChaser.InputManager = function() {
    var click = [];
    var pageX;
    var pageY;
    $(document).mousemove(function(ev) {
        pageX  = ev.pageX;
        pageY = ev.pageY;
    });
    
    $(document).mousedown(function(ev) {
        click.push({
            'x':ev.pageX,
            'y':ev.pageY
        });
    });

    document.addEventListener('touchend', function(e) {
        e.preventDefault();
        for(var i = 0; i < e.touches.length; i++){
            click.push({
                'x':e.touches[i].pageX,
                'y':e.touches[i].pageY
            });
        }
    }, false);

 
    return {
        /** return mouse co-ordinates*/
        getMouse		:	function()
        {
            return	{
                'x': pageX, 
                'y': pageY
            };
        },
                            
        /** return click co-ordinates, if any*/
        getClickIfAny	:	function()
        {
            if(click.length > 0)
            {
                return	click;
            }
            else
            {
                return null;
            }
        } 
    };
}();
