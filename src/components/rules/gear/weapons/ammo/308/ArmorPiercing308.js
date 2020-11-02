import Gear from 'classes/Gear.js'
import Pierce from 'attributes/Pierce.js'

const ArmorPiercing308 = new Gear({
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