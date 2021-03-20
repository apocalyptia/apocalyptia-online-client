import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'

const SW686Snubnose = new Gear({
	id: ``,
	name: `S&W 686 Snubnose Revolver`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
SW686Snubnose.dmg = 2
SW686Snubnose.rng = 5
SW686Snubnose.cap = 5
SW686Snubnose.cal = `.357`

export default SW686Snubnose