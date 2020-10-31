import Gear from 'gear/Gear.js'
import Camo from 'attributes/Camo.js'
import FireResistance from 'attributes/FireResistance.js'

const CombatHelmet = new Gear({
	id: `6b26c241-5fef-463f-bfc6-cadab2281711`,
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