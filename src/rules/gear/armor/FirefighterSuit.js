import Gear from 'classes/Gear.js'
import ColdResistance from 'rules/gear/attributes/ColdResistance.js'
import FireResistance from 'rules/gear/attributes/FireResistance.js'
import Mask from 'rules/gear/attributes/Mask.js'

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