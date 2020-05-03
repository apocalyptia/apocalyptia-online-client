import Ammo from '../../../../../classes/gear/weapons/Ammo'
import Match from '../../../attributes/weapon/Match'


const Match9mm = new Ammo({
	name: `9mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		Match,
	]
})

export default Match9mm