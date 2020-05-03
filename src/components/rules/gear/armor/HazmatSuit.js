import Armor from '../../../classes/gear/Armor'
import Impermeable from '../attributes/armor/Impermeable'
import Mask from '../attributes/armor/Mask'


const HazmatSuit = new Armor({
	name: `Hazmat Suit`,
	sz: 2,
	dr: 0,
	loc: `Full Body`,
	attr: [
		Impermeable,
		Mask,
	]
})

export default HazmatSuit