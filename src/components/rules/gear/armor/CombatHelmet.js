import Gear from 'classes/Gear.js'
import Camo from 'attributes/Camo.js'
import FireResistance from 'attributes/FireResistance.js'

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