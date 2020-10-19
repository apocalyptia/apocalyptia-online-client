import Ammo from 'gear/weapons/ammo/Ammo.js'
import Match from 'gear/attributes/weapon/Match.js'


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