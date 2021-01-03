import Rounds from 'rules/combat/Rounds.js'
import Actions from 'rules/combat/Actions.js'
import Communication from 'rules/combat/Communication.js'
import Movement from 'rules/combat/Movement.js'
import Attack from 'rules/combat/Attack.js'
import Defense from 'rules/combat/Defense.js'
import Damage from 'rules/combat/Damage.js'
import Trauma from 'rules/combat/Trauma.js'

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
		Trauma,
		// Vehicles,
	]
}