import Armor from './Armor'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'
import Mask from '../attributes/armor/Mask'


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