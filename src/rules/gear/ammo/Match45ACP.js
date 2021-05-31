import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match45ACP = new Ammo({
	name: `.45ACP Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.01,
	attr: [Match]
})
Match45ACP.cal = `.45ACP`

export default Match45ACP
