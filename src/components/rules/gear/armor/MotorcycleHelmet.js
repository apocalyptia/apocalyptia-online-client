import Armor from 'gear/armor/Armor.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'
import Mask from 'gear/attributes/armor/Mask.js'


const MotorcycleHelmet = new Armor({
	id: `9b54d7fd-c70c-4b97-b471-eff6477622d3`,
	name: `Motorcycle Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`,
	attr: [
		FireResistance,
		Mask,
	]
})

export default MotorcycleHelmet