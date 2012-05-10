LightChaser.GameState = function() {
    return {
        currentState: "PREGAME",
        moveCount: 0,
        lastLevelMoveCount: 0,
        lastLevelId: "",
        hardReset: function() {
            var state = LightChaser.GameState;
            state.currentState = "PREGAME";
            state.moveCount = 0;
            state.lastLevelMoveCount = 0;
            state.lastLevelId =""; 
        },
        levelReset: function(level){
            this.lastLevelId = level;
            this.lastLevelMoveCount = this.moveCount;
            this.moveCount = 0;
        }
    };
}();