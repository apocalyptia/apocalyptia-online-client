import Ammo from '../Ammo'
import Match from '../../../attributes/weapon/Match'


const Match308 = new Ammo({
	name: `.308 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Match,
	]
})

export default Match308