import Gear from '../../../classes/Gear.js'
import Match from '../attributes/Match.js'

const Match22 = new Gear({
	name: `.22 Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.005,
	attr: [Match]
})
Match22.cal = `.22`

export default Match22
