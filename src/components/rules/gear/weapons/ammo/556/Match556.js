import Ammo from '../Ammo'
import Match from '../../../attributes/weapon/Match'


const Match556 = new Ammo({
	name: `5.56mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Match,
	]
})

export default Match556