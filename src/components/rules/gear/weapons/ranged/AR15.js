import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const AR15 = new RangedWeapon({
	id: `69cd0033-60ad-4d4c-aac2-d9584e5766a1`,
	name: `AR-15`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 30,
	cal: `5.56`
})

export default AR15