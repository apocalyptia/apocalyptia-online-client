import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match556mm = new Ammo({
	name: `5.56mm Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.02,
	attr: [Match]
})
Match556mm.cal = `5.56mm`

export default Match556mm
