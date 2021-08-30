import Actions from './combat/Actions.js'
import Attack from './combat/Attack.js'
import Communication from './combat/Communication.js'
import Damage from './combat/Damage.js'
import Defense from './combat/Defense.js'
import Movement from './combat/Movement.js'
import Pain from './combat/Pain.js'
import Recovery from './combat/Recovery.js'
import Round from './combat/Round.js'
import Trauma from './combat/Trauma.js'

export default {
	round: Round,
	actions: Actions,
	communication: Communication,
	movement: Movement,
	attack: Attack,
	defense: Defense,
	damage: Damage,
	trauma: Trauma,
	pain: Pain,
	recovery: Recovery,
	// vehicles: Vehicles
}
