import Gear from '../../../classes/Gear.js' 
import TwoHanded from '../attributes/TwoHanded.js' 
import Rapid from '../attributes/Rapid.js' 

const Glock19 = new Gear({
	name: `Glock 19 Pistol`,
	type: `Projectile Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
})
Glock19.dmg = 1
Glock19.rng = 10
Glock19.cap = 17
Glock19.cal = `9mm`

export default Glock19