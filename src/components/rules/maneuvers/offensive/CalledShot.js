import Maneuver from '../Maneuver'
import Table from '../../Table'


const CalledShot = new Maneuver({
	cat: `Offensive`,
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
		`Roll`,
		`Body Part`,
		`Penalty`,
		`Health`,
		`Effect`,
	],
	content: [
		new CalledShotTarget({
			roll: 6,
			name: `Head`,
			penalty: -3,
			health: `Constitution`,
			effect: `Stun for 1 round`
		}),
		new CalledShotTarget({
			roll: 5,
			name: `Right Arm`,
			penalty: -1,
			effect: `Target drops held item`
		}),
		new CalledShotTarget({
			roll: 4,
			name: `Left Arm`,
			penalty: -1,
			effect: `Target drops held item`
		}),
		new CalledShotTarget({
			roll: 3,
			name: `Torso`,
			penalty: 0,
			effect: `No additional effect`
		}),
		new CalledShotTarget({
			roll: 2,
			name: `Left Leg`,
			penalty: -1,
			effect: `Target falls Prone`
		}),
		new CalledShotTarget({
			roll: 1,
			name: `Right Leg`,
			penalty: -1,
			effect: `Target falls Prone`
		}),
	]
})

export default CalledShot