import Ammo from '/src/classes/gear/Ammo.js'
import Pierce from '../attributes/Pierce.js'

const ArmorPiercing308 = new Ammo({
	name: `.308 Armor Piercing`,
	type: `Ammo`,
	desc: [`Battlefield ammunition.`],
	sz: 0.02,
	attr: [Pierce]
})
ArmorPiercing308.cal = `.308`

export default ArmorPiercing308
