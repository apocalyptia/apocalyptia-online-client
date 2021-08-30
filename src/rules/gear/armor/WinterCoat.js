import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const WinterCoat = new Armor({
	name: `Winter Coat`,
	size: 2,
	attributes: [ ColdResistance],
	type: `Armor`,
	absorption: 1,
	location: `Arms, Torso`,
})

export default WinterCoat
