import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const CombatHelmet = new Armor({
	name: `Combat Helmet`,
	sz: 2,
	attr: [Camo, FireResistance],
	type: `Armor`
})
CombatHelmet.dr = 2
CombatHelmet.loc = `Head`

export default CombatHelmet
