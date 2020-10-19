import Rounds from './Rounds'
import Actions from './Actions'
import Communication from './Communication'
import Movement from './Movement'
import Attack from './Attack'
import Defense from './Defense'
import Damage from './Damage'


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