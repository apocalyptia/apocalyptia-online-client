import Gear from '/src/classes/Gear.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'
import Mask from '/src/rules/gear/attributes/Mask.js'

const MotorcycleHelmet = new Gear({
	id: ``,
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