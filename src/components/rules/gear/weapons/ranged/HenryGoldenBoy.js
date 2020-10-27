import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const HenryGoldenBoy = new Gear({
	id: `a0cf85b3-ead3-4460-889a-83e4938c8598`,
	name: `Henry Golden Boy`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
HenryGoldenBoy.dmg = 1
HenryGoldenBoy.rng = 30
HenryGoldenBoy.cap = 16
HenryGoldenBoy.cal = `.22`

export default HenryGoldenBoy