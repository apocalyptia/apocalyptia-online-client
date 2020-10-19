import Armor from 'gear/armor/Armor.js'
import Camo from 'gear/attributes/armor/Camo.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'


const CombatHelmet = new Armor({
	id: `6b26c241-5fef-463f-bfc6-cadab2281711`,
	name: `Combat Helmet`,
	sz: 2,
	dr: 3,
	loc: `Head`,
	attr: [
		Camo,
		FireResistance,
	]
})

export default CombatHelmet