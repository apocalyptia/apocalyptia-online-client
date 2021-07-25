import Combat from '/src/classes/Combat.js'
import Chase from './subrules/Chase.js'

const Movement = new Combat({
	name: `Movement`,
	description: [
		`You may use only one of your Actions in a Round for Movement.`,
		`The distance you can move for the Round depends on your Speed and the type(s) of Movement you are making.`,
		`Your Movement can be divided around other Actions in whatever order you choose.`,
		`Spend Speed to move in any of the ways listed below in any combination.`,
		` 1) Walk = 1yd / 1 Speed.`,
		` 2) Run = 2 yards / 1 Speed. Unstable.`,
		` 3) Climb = 1yd / 3 Speed.`,
		` 4) Swim = 1yd / 6 Speed. Unstable.`,
		` 5) Stand up = 3 Speed.`,
		` 6) Drop Prone = 1 Speed.`,
	],
})
Movement.subrules = [Chase]

export default Movement
