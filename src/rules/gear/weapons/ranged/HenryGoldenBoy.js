import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'

const HenryGoldenBoy = new Gear({
	id: ``,
	name: `Henry Golden Boy Rifle`,
	type: `Ranged Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
HenryGoldenBoy.dmg = 0
HenryGoldenBoy.rng = 30
HenryGoldenBoy.cap = 16
HenryGoldenBoy.cal = `.22`

export default HenryGoldenBoy