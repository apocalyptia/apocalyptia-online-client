import Gear from '../../../classes/Gear.js' 
import FireResistance from '../../gear/attributes/FireResistance.js' 
import Mask from '../../gear/attributes/Mask.js' 

const MotorcycleHelmet = new Gear({
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