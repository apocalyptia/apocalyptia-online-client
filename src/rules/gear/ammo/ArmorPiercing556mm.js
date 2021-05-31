import Ammo from '/src/classes/gear/Ammo.js'
import Pierce from '../attributes/Pierce.js'

const ArmorPiercing556mm = new Ammo({
	name: `5.56mm Armor Piercing`,
	type: `Ammo`,
	desc: [`Battlefield ammunition.`],
	sz: 0.02,
	attr: [Pierce]
})
ArmorPiercing556mm.cal = `5.56mm`

export default ArmorPiercing556mm
