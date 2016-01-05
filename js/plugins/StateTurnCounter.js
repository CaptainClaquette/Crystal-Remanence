//=============================================================================
// Display State Turns On Icon
// by lolaccount
// Last Updated: 2015.11.4
//=============================================================================

/*:
 * @plugindesc v1.01 Number of turns remaining for states/debuffs/buffs is
 * displayed on the icon.
 * @author lolaccount
 *
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * Patch Notes
 * ============================================================================
 * v1.01 - Added buff and debuffs turns, fixed displaying 1 or 0 for states
 * that don't have turns, moved text up a bit
 * ============================================================================
 * How To Use
 * ============================================================================
 * Plug and play.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with or
 * without credit, as long as you do not claim the script as your own.
 * Credit is appreciated though.
 */
 
(function() {
// alias function
var _Window_Base_drawActorIcons = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    // the default we are making an alias for
    _Window_Base_drawActorIcons.call(this, actor, x, y, width);
    
    // array of turn integers corresponding to each state/debuff/buff
    var turns = [];
    // initialize loop variable
    var i = 0;
    // for each state actor has
    actor.states().forEach(function(state) {
        // check if autoremoval is not 0. If it is not 0 then it is removed
        // automatically after a certain number of turns.
        if (state.autoRemovalTiming != 0) {
            turns.push(actor._stateTurns[actor._states[i]]);
        }
        else {
        // if autoremoval is 0, then it's a state that is not removed by
        // turns, like defeat. add 0 to the array so that it is skipped
        // when we are displaying the text.
            turns.push(0);
        }
        // increment the loop variable
            i++;
    }, this);
    
    // for each possible parameter that can have a
    // buff or debuff
    for (var j = 0; j < actor._buffs.length; j++) {
        // check if the parameter has a buff/debuff
        if (actor._buffs[j] !== 0) {
            // if so add the number of turns the buff/debuff
            // has to the turn array
            turns.push(actor._buffTurns[j]);
        }
    }

    // set font size to 16
    this.contents.fontSize = 16;
    // for each state/debuff/buff, draw text for their turns remaining
    for (var i = 0; i < actor.allIcons().length; i++) {
        // This is a check for whether the turns remaining is 0 or not
        // if we don't check we'll get a 0 displayed for states like death
        if (turns[i] != 0) {
            // draw the text for their turns remaining
            this.drawText(turns[i], x + (Window_Base._iconWidth * i) + (Window_Base._iconWidth / 6), y - (Window_Base._iconWidth / 6), Window_Base._iconWidth, 'center');
        }
    }
    // reset font size so other stuff isn't resized as well
    this.resetFontSettings();
};
})();