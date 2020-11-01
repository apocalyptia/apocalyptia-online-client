import Rule from 'classes/Rule.js'
import Table from 'classes/Table.js'

const CalledShot = new Rule({
	id: `7b5ac4ec-c58a-48bd-aaed-c0fbf6716874`,
	name: `Called Shot`, 
	desc: [
		`Attacks target the Torso by default.`,
		`A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects depending on the Body Part.`,
	]
})

class CalledShotTarget {
	constructor({
		roll,
		name,
		penalty,
		effect
	}) {
		this.roll = roll
		this.name = name
		this.penalty = penalty
		this.effect = effect
	}
}

CalledShot.table = new Table({
	name: `Called Shot Table`,
	headers: [
		`d6`,
		`Part`,
		`Penalty`,
		`Effect`,
	],
	contents: [
		new CalledShotTarget({
			roll: 6,
			name: `Head`,
			penalty: -3,
			health: `Constitution`,
			effect: `Stun 1 round`
		}),
		new CalledShotTarget({
			roll: 5,
			name: `R Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 4,
			name: `L Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 3,
			name: `Torso`,
			penalty: 0,
			effect: `None`
		}),
		new CalledShotTarget({
			roll: 2,
			name: `L Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
		new CalledShotTarget({
			roll: 1,
			name: `R Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
	],
	widths: [5, 15, 20, 50]
})

export default CalledShot