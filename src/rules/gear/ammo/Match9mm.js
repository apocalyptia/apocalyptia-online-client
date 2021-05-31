import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match9mm = new Ammo({
	name: `9mm Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.01,
	attr: [Match]
})
Match9mm.cal = `9mm`

export default Match9mm
