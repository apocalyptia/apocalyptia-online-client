import Maneuver from 'rules/maneuvers/Maneuver.js'


const Duck = new Maneuver({
	id: `cac81a46-c688-4b29-a680-502f827987ed`,
	cat: `Defensive`,
	name: `Duck`, 
	desc: [
		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
		`This is the only way to Dodge a Ranged(Shoot) Attack.`,
		`As part of this Dodge, you may elect to go Prone.`,
		`If the Attack still hits, the Cover Material’s Damage Resistance reduces the Damage.`,
		`You will keep the benefits of Cover as long as it remains between you and the opponent.`,
	]
})

export default Duck