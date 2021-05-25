import Gear from '../../../classes/Gear.js' 
import TwoHanded from '../attributes/TwoHanded.js' 
import Rapid from '../attributes/Rapid.js' 

const SWMPShield = new Gear({
	name: `S&W M&P Shield Pistol`,
	type: `Projectile Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid
	]
})
SWMPShield.dmg = 1
SWMPShield.rng = 5
SWMPShield.cap = 7
SWMPShield.cal = `9mm`

export default SWMPShield