import Rounds from 'combat/Rounds.js'
import Actions from 'combat/Actions.js'
import Communication from 'combat/Communication.js'
import Movement from 'combat/Movement.js'
import Attack from 'combat/Attack.js'
import Defense from 'combat/Defense.js'
import Damage from 'combat/Damage.js'

export default {
	name: `Combat`,
	list: [
		Rounds,
		Actions,
		Communication,
		Movement,
		Attack,
		Defense,
		Damage,
		// Vehicles,
	]
}