import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const NorincoSKS = new Gear({
	id: `3e9ef3f7-ca05-4235-b6e0-6853d8304679`,
	name: `Norinco SKS Rifle`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
	]
})
NorincoSKS.dmg = 4
NorincoSKS.rng = 50
NorincoSKS.cap = 10
NorincoSKS.cal = `7.62`

export default NorincoSKS