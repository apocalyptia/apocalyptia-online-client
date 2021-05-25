import Gear from '../../../classes/Gear.js' 
import ColdResistance from '../../gear/attributes/ColdResistance.js' 
import FireResistance from '../../gear/attributes/FireResistance.js' 
import Mask from '../../gear/attributes/Mask.js' 

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