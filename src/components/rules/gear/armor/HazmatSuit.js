import Armor from 'gear/armor/Armor.js'
import Impermeable from 'gear/attributes/armor/Impermeable.js'
import Mask from 'gear/attributes/armor/Mask.js'


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