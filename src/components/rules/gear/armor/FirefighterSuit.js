import Gear from 'gear/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'
import Mask from 'attributes/Mask.js'

const FirefighterSuit = new Gear({
	id: `eefc5c02-3139-42cd-b5f9-fe055a915098`,
	name: `Firefighter Suit`,
	sz: 5,
	attr: [
		ColdResistance,
		FireResistance,
		Mask,
	],
	type: `Armor`
})
FirefighterSuit.dr = 2
FirefighterSuit.loc = `Full Body`

export default FirefighterSuit