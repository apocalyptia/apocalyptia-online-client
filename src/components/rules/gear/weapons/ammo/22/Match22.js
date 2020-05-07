import Ammo from '../Ammo'
import Match from '../../../attributes/weapon/Match'


const Match22 = new Ammo({
	name: `.22 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.005,
	cal: `.22`,
	attr: [
		Match,
	],
})

export default Match22