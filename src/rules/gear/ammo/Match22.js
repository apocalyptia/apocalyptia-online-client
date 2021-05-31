import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match22 = new Ammo({
	name: `.22 Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.005,
	attr: [Match]
})
Match22.cal = `.22`

export default Match22
