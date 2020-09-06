import Armor from './Armor'
import Impermeable from '../attributes/armor/Impermeable'
import Mask from '../attributes/armor/Mask'


const HazmatSuit = new Armor({
	id: `6f6e31ff-67fa-4d25-9652-8541c3fabc0c`,
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