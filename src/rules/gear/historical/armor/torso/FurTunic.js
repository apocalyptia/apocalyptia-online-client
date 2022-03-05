import Armor from '$classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const FurTunic = new Armor({
	name: `Fur Tunic`,
	size: 2,
	attributes: [
		ColdResistance,
	],
	type: `Armor`,
	absorption: 1,
	location: `Torso`,
})

export default FurTunic
