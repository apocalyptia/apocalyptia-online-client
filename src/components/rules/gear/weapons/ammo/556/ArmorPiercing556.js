import Ammo from '../../../../../classes/gear/weapons/Ammo'
import Pierce from '../../../attributes/weapon/Pierce'


const ArmorPiercing556 = new Ammo({
	name: `5.56mm Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Pierce,
	]
})

export default ArmorPiercing556