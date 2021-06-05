import Armor from '/src/classes/gear/Armor.js'
import FireResistance from '../../gear/attributes/FireResistance.js'
import Mask from '../../gear/attributes/Mask.js'

const MotorcycleHelmet = new Armor({
	name: `Motorcycle Helmet`,
	size: 2,
	attributes: [FireResistance, Mask],
	type: `Armor`,
	absorption: 1,
	location: `Head`
})

export default MotorcycleHelmet
