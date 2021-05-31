import Armor from '/src/classes/gear/Armor.js'
import FireResistance from '../../gear/attributes/FireResistance.js'
import Mask from '../../gear/attributes/Mask.js'

const MotorcycleHelmet = new Armor({
	name: `Motorcycle Helmet`,
	sz: 2,
	attr: [FireResistance, Mask],
	type: `Armor`
})
MotorcycleHelmet.dr = 1
MotorcycleHelmet.loc = `Head`

export default MotorcycleHelmet
