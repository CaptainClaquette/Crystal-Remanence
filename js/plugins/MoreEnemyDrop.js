//=============================================================================
// MoreEnemyDrop.js
//=============================================================================

var Imported = Imported || {};
Imported.MoreEnemyDrop = true;

var Hakuryo = Hakuryo || {};
Hakuryo.MED = Hakuryo.MED || {};

//=============================================================================
/*:
 * @plugindesc v1.00 add more trop to an ennemie
 * @author Hakuryo
 *
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * The main goal of this plugin is to provide the possibility to add more drop 
 *  to an ennemy than the default 3 ones.
 *
 * To add a new drop for an ennemy use the following note tag
 * <ADD DROP: x,y,z> 'x' is the id of the drop, 'y' is the type of drop 
 * (1=item,2=weapon,3=armor) and z the the dividende to calculate the drop rate
 *
 * the drop rate calculation is 1/z.
 *
 * Exemple : 
 * 
 * <add drop: 1,1,10>
 * 
 * this will add the item with id '1' with a drop chance of 1/10 (10%)
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Hakuryo.Parameters = PluginManager.parameters('MoreEnemyDrop');
Hakuryo.Param = Hakuryo.Param || {};

//Hakuryo.Param.Variable = String(Yanfly.Parameters['Variable']);

//=============================================================================
// DataManager
//=============================================================================

Hakuryo.MED.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!Hakuryo.MED.DataManager_isDatabaseLoaded.call(this)) return false;
        console.log("test");
	DataManager.processMEDNotetags($dataEnemies);
	return true;
};

DataManager.processMEDNotetags = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
                        var newdrop = {};
			if (line.match(/<ADD DROP: (\d+),(\d+),(\d+)>/i)) {
                                newdrop.dataId = parseInt(RegExp.$1);
                                newdrop.kind = parseInt(RegExp.$2);
                                newdrop.denominator = parseInt(RegExp.$3);
                                obj.dropItems.push(newdrop);
			}
		}
	}
};
//=============================================================================
// Plugin Code
//=============================================================================

//=============================================================================
// End of File
//=============================================================================
