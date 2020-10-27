import Gear from 'gear/Gear.js'
import Impermeable from 'attributes/Impermeable.js'
import Mask from 'attributes/Mask.js'

const HazmatSuit = new Gear({
	id: `6f6e31ff-67fa-4d25-9652-8541c3fabc0c`,
	name: `Hazmat Suit`,
	sz: 2,
	attr: [
		Impermeable,
		Mask,
	],
	type: `Armor`
})
HazmatSuit.dr = 0
HazmatSuit.loc = `Full Body`

export default HazmatSuit