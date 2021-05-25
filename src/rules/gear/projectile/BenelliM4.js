import Gear from '../../../classes/Gear.js' 
import TwoHanded from '../attributes/TwoHanded.js' 
import Rapid from '../attributes/Rapid.js' 
import Scatter from '../attributes/Scatter.js' 

const BenelliM4 = new Gear({
	name: `Benelli M4 Shotgun`,
	type: `Projectile Weapon`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
BenelliM4.dmg = 5
BenelliM4.rng = 15
BenelliM4.cap = 6
BenelliM4.cal = `12g`

export default BenelliM4