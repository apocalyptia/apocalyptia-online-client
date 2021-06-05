import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'

const FlakJacket = new Armor({
	name: `Flak Jacket`,
	size: 3,
	attributes: [Camo],
	type: `Armor`,
	absorption: 2,
	location: `Torso`
})

export default FlakJacket
