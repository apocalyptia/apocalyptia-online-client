import Ammo from '../Ammo'
import Pierce from '../../../attributes/weapon/Pierce'


const ArmorPiercing308 = new Ammo({
	name: `.308 Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Pierce,
	]
})

export default ArmorPiercing308