import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match45 = new Ammo({
	name: `.45 Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.01,
	attr: [Match]
})
Match45.cal = `.45`

export default Match45
