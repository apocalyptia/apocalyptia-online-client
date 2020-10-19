import Ammo from 'gear/weapons/ammo/Ammo.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'


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