import Actions from './combat/Actions.js'
import Attack from './combat/Attack.js'
import Communication from './combat/Communication.js'
import Damage from './combat/Damage.js'
import Defense from './combat/Defense.js'
import Movement from './combat/Movement.js'
import Rounds from './combat/Rounds.js'
import Trauma from './combat/Trauma.js'

const Combat = {
	rounds: Rounds,
	actions: Actions,
	communication: Communication,
	movement: Movement,
	attack: Attack,
	defense: Defense,
	damage: Damage,
	trauma: Trauma
	// vehicles: Vehicles
}

export default Combat
