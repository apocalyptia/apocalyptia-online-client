import Rounds from '/src/rules/combat/Rounds.js'
import Actions from '/src/rules/combat/Actions.js'
import Communication from '/src/rules/combat/Communication.js'
import Movement from '/src/rules/combat/Movement.js'
import Attack from '/src/rules/combat/Attack.js'
import Defense from '/src/rules/combat/Defense.js'
import Damage from '/src/rules/combat/Damage.js'
import Trauma from '/src/rules/combat/Trauma.js'

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