import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const CombatHelmet = new Armor({
	name: `Combat Helmet`,
	size: 2,
	attributes: [Camo, FireResistance],
	type: `Armor`,
	absorption: 2,
	location: `Head`,
})

export default CombatHelmet
