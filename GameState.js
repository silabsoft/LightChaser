LightChaser.GameState = function() {
    return {
        currentState: "PREGAME", //the current state
        moveCount: 0,
        hardReset: function() {	//resets all settings
            var state = LightChaser.GameState;
            state.currentState = "PREGAME";
            state.moveCount = 0;
        }
    };
}();