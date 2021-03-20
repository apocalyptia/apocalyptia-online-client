import Gear from '/src/classes/Gear.js'
import Camo from '/src/rules/gear/attributes/Camo.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'

const CombatHelmet = new Gear({
	id: ``,
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