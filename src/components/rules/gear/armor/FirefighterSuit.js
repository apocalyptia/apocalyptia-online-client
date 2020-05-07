import Armor from './Armor'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'
import Mask from '../attributes/armor/Mask'


const FirefighterSuit = new Armor({
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