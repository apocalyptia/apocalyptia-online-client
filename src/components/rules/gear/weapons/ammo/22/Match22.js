import Ammo from 'gear/weapons/ammo/Ammo.js'
import Match from 'gear/attributes/weapon/Match.js'


const Match22 = new Ammo({
	id: `abcff657-e505-4981-ad07-8a4d5ff0fcee`,
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