import Rule from 'classes/Rule.js'
import Chase from 'combat/Chase.js'

const Movement = new Rule({
	id: `66094467-f795-4c02-49e9-0bf193dacaa6`,
	name: `Movement`, 
	desc: [
		`On your turn, you have an amount of Speed equal to your [Agility x3].`,
		`You can spend Speed to move in any of the ways listed below in any combination.`,
		`Other Actions can be performed while moving according to the Narrator's discretion.`,
		` 1) Walk = 1yd / 1 Speed.`,
		` 2) Run = 2yds / 1 Speed. Unstable.`,
		` 3) Climb = 1yd / 3 Speed.`,
		` 4) Swim = 1yd / 6 Speed. Unstable.`,
		` 5) Stand up = 1 Speed.`,
		` 6) Drop Prone = 0 Speed.`,
	]
})
Movement.subrules = [
	Chase,
]

export default Movement