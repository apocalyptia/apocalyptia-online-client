import Gear from '../../../classes/Gear.js'
import Impermeable from '../../gear/attributes/Impermeable.js'
import Mask from '../../gear/attributes/Mask.js'

const HazmatSuit = new Gear({
	name: `Hazmat Suit`,
	sz: 2,
	attr: [Impermeable, Mask],
	type: `Armor`
})
HazmatSuit.dr = 0
HazmatSuit.loc = `Full Body`

export default HazmatSuit
