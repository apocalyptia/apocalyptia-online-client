import Ammo from '../Ammo'
import Pierce from '../../../attributes/weapon/Pierce'


const ArmorPiercing556 = new Ammo({
	id: `c911b821-137b-4e08-8685-84d82c854b69`,
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