import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match308 = new Ammo({
	name: `.308 Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.02,
	attr: [Match]
})
Match308.cal = `.308`

export default Match308
