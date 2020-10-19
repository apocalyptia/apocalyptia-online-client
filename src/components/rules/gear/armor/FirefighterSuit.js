import Armor from 'gear/armor/Armor.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'
import Mask from 'gear/attributes/armor/Mask.js'


const FirefighterSuit = new Armor({
	id: `eefc5c02-3139-42cd-b5f9-fe055a915098`,
	name: `Firefighter Suit`,
	sz: 5,
	dr: 2,
	loc: `Full Body`,
	attr: [
		ColdResistance,
		FireResistance,
		Mask,
	]
})

export default FirefighterSuit