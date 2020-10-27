import Gear from 'gear/Gear.js'
import FireResistance from 'attributes/FireResistance.js'
import Mask from 'attributes/Mask.js'

const MotorcycleHelmet = new Gear({
	id: `9b54d7fd-c70c-4b97-b471-eff6477622d3`,
	name: `Motorcycle Helmet`,
	sz: 2,
	attr: [
		FireResistance,
		Mask,
	],
	type: `Armor`
})
MotorcycleHelmet.dr = 1
MotorcycleHelmet.loc = `Head`

export default MotorcycleHelmet