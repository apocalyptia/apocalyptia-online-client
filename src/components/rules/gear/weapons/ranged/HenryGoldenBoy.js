import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const HenryGoldenBoy = new Gear({
	name: `Henry Golden Boy Rifle`,
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