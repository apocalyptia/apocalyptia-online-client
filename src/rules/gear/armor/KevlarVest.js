import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const KevlarVest = new Armor({
	name: `Kevlar Vest`,
	size: 3,
	attributes: [ColdResistance, FireResistance],
	type: `Armor`,
	absorption: 2,
	location: `Torso`
})

export default KevlarVest
