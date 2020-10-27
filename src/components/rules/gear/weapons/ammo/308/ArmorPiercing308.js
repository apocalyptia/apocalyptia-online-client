import Gear from 'gear/Gear.js'
import Pierce from 'attributes/Pierce.js'

const ArmorPiercing308 = new Gear({
	id: `08f1864b-66cf-4d61-be54-4139b4242c02`,
	name: `.308 Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	attr: [
		Pierce,
	]
})
ArmorPiercing308.cal = `.308`

export default ArmorPiercing308