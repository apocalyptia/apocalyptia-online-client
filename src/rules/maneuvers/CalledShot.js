import Rule from '../../classes/Rule.js'
import Table from '../../classes/Table.js'

const CalledShot = new Rule({
	name: `Called Shot`,
	desc: [`A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects depending on the Body Part.`],
	type: `Offensive`
})

class CalledShotTarget {
	constructor({ roll, name, penalty, effect }) {
		this.roll = roll
		this.name = name
		this.penalty = penalty
		this.effect = effect
	}
}

CalledShot.table = new Table({
	name: `Called Shot Table`,
	headers: [`d6`, `Part`, `Penalty`, `Effect`],
	contents: [
		new CalledShotTarget({
			roll: 6,
			name: `Head`,
			penalty: `-6 Projectile`,
			health: `Constitution`,
			effect: `Stun 1 round.`
		}),
		new CalledShotTarget({
			roll: 5,
			name: `R Arm`,
			penalty: `-3 Projectile`,
			effect: `Let go of anything held with this hand.`
		}),
		new CalledShotTarget({
			roll: 4,
			name: `L Arm`,
			penalty: `-3 Projectile`,
			effect: `Let go of anything held with this hand.`
		}),
		new CalledShotTarget({
			roll: 3,
			name: `Torso`,
			penalty: `No penalty.`,
			effect: `None.`
		}),
		new CalledShotTarget({
			roll: 2,
			name: `L Leg`,
			penalty: `-1 Projectile`,
			effect: `Fall Prone.`
		}),
		new CalledShotTarget({
			roll: 1,
			name: `R Leg`,
			penalty: `-1 Projectile`,
			effect: `Fall Prone.`
		})
	],
	widths: [5, 15, 20, 50]
})

export default CalledShot
