import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const RecurveBow = new RangedWeapon({
	name: `Recurve Bow`,
	sz: 2,
	dmg: 1,
	rng: 10,
	attr: [
		TwoHanded,
	],
	cap: 1,
	cal: `Arrow`
})

export default RecurveBow