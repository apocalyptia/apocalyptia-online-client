import Gear from '$classes/Gear.js'
import TwoHanded from '$rules/gear/attributes/TwoHanded.js'
import Rapid from '$rules/gear/attributes/Rapid.js'

const NorincoSKS = new Gear({
	id: ``,
	name: `Norinco SKS Rifle`,
	type: `Ranged Weapon`,
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