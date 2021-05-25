import Gear from '../../../classes/Gear.js' 
import Camo from '../../gear/attributes/Camo.js' 
import FireResistance from '../../gear/attributes/FireResistance.js' 

const CombatHelmet = new Gear({
	name: `Combat Helmet`,
	sz: 2,
	attr: [
		Camo,
		FireResistance,
	],
	type: `Armor`
})
CombatHelmet.dr = 2
CombatHelmet.loc = `Head`

export default CombatHelmet