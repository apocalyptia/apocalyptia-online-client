import Gear from '/src/classes/Gear.js'
import Impermeable from '/src/rules/gear/attributes/Impermeable.js'
import Mask from '/src/rules/gear/attributes/Mask.js'

const HazmatSuit = new Gear({
	id: ``,
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