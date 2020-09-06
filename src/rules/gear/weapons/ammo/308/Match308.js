import Ammo from '../Ammo'
import Match from '../../../attributes/weapon/Match'


const Match308 = new Ammo({
	id: `fd9887fc-ffa3-4d7d-9984-f9d18eeaa0bf`,
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