import Core from '/src/classes/Core.js'
import Cooperation from './subrules/Cooperation.js'
import RoteActions from './subrules/RoteActions.js'

const Success = new Core({
	name: `Success`,
	description: [
		`Your roll is a Success when the Result is greater than the Difficulty.`
	]
})
Success.subrules = [RoteActions, Cooperation]

export default Success
