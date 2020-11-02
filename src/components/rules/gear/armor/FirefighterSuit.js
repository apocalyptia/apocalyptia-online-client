import Gear from 'classes/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'
import Mask from 'attributes/Mask.js'

const FirefighterSuit = new Gear({
	name: `Firefighter Suit`,
	sz: 5,
	attr: [
		ColdResistance,
		FireResistance,
		Mask,
	],
	type: `Armor`
})
FirefighterSuit.dr = 1
FirefighterSuit.loc = `Full Body`

export default FirefighterSuit