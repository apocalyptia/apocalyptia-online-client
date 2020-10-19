import Ammo from 'gear/weapons/ammo/Ammo.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'


const ArmorPiercing308 = new Ammo({
	id: `08f1864b-66cf-4d61-be54-4139b4242c02`,
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