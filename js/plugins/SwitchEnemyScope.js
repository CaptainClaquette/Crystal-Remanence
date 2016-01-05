//=============================================================================
// SwitchEnemyScope.js
//=============================================================================

var Imported = Imported || {};
Imported.SwitchEnemyScope = true;

var Hakuryo = Hakuryo || {};
Hakuryo.SES = Hakuryo.SES || {};

//=============================================================================
/*:
 * @plugindesc v1.00 Insert your description here
 * @author Your Name
 *
 * @param Parameter
 * @desc Description
 * @default 0
 *
 * @help
 * Type in help information here!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Hakuryo.Parameters = PluginManager.parameters('SwitchEnemyScope');
Hakuryo.Param = Hakuryo.Param || {};

Hakuryo.SES.defaulScope =[];
Hakuryo.SES.newScope;
Hakuryo.SES.skills = [];
Hakuryo.SES.currentskill = 1;

//Hakuryo.Param.Variable = String(Yanfly.Parameters['Variable']);

//=============================================================================
// DataManager
//=============================================================================

Hakuryo.SES.canSwitchScope = function(obj) {
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<MULTIPLE: (\d+)>/i)) {
                                Hakuryo.SES.newScope = parseInt(RegExp.$1);
				return true;
			}
		}
                return false;
};

//=============================================================================
// Plugin Code
//=============================================================================

Window_Selectable.prototype.processHandling = function () {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && this.isOkTriggered()) {
            this.processOk();
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            this.processCancel();
        } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.processPagedown();
        } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.processPageup();
        } else if (this.isSwitchScopeTriggered()) {
            this.processSwitchToggle();
        }
    }
};


Window_Selectable.prototype.isSwitchScopeTriggered = function () {
    return Input.isRepeated('toggleAll');
};


Window_Selectable.prototype.processSwitchToggle = function () {
    if (this.isCurrentItemEnabled() && Hakuryo.SES.canSwitchScope($dataSkills[Hakuryo.SES.currentskill])) {
        if (this.active && this instanceof Window_BattleEnemy) {
            SoundManager.playCursor();
            Hakuryo.SES.defaulScope.push($dataSkills[Hakuryo.SES.currentskill].scope);
            $dataSkills[Hakuryo.SES.currentskill].scope = $dataSkills[Hakuryo.SES.currentskill].scope === 1 ? 2 : 1;
            this.refresh();
            this.reselect();
        }
    } else {
        this.playBuzzerSound();
    }
};

Scene_Battle.prototype.onSkillOk = function() {
    var skill = this._skillWindow.item();
    var action = BattleManager.inputtingAction();
    Hakuryo.SES.skills.push(skill.id);
    Hakuryo.SES.currentskill = skill.id;
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
};

//=============================================================================
// End of File
//=============================================================================
