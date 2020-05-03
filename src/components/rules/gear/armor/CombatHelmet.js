import Armor from '../../../classes/gear/Armor'
import Camo from '../attributes/armor/Camo'
import FireResistance from '../attributes/armor/FireResistance'


const CombatHelmet = new Armor({
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