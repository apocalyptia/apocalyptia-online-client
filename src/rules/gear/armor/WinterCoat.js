import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const WinterCoat = new Armor({
	name: `Winter Coat`,
	sz: 2,
	attr: [ColdResistance],
	type: `Armor`
})
WinterCoat.dr = 1
WinterCoat.loc = `Arms, Torso`

export default WinterCoat
