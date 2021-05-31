import Maneuver from '/src/classes/Maneuver.js'

const Duck = new Maneuver({
	name: `Duck`,
	desc: [
		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
		`This is the only way to Dodge a Projectile(Shoot) Attack.`,
		`As part of this Dodge, you may elect to go Prone.`,
		`If the Attack still hits, the Cover Material’s Absorption reduces the Damage.`,
		`You will keep the benefits of Cover as long as it remains between you and the opponent.`
	],
	mode: `Defensive`
})

export default Duck
