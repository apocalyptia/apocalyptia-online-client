import Core from '$classes/Core.js'
import Cooperation from './subrules/Cooperation.js'
import RoteActions from './subrules/RoteActions.js'

const Success = new Core({
	name: `Success`,
	description: [
		`Your roll is a Success when the Result is greater than the Difficulty.`,
		`For unopposed rolls, a Result that is equal to the Difficulty is also a Success.`,
		`For opposed rolls, equal Results (ties) require a reroll from both sides.`
	],
	subrules: [
		RoteActions,
		Cooperation
	]
})

export default Success
