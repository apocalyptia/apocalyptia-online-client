import Ammo from '/src/classes/gear/Ammo.js'
import Match from '../attributes/Match.js'

const Match22LR = new Ammo({
	name: `.22LR Match`,
	type: `Ammo`,
	desc: [`Competition-grade ammunition.`],
	sz: 0.005,
	attr: [Match]
})
Match22LR.cal = `.22LR`

export default Match22LR
